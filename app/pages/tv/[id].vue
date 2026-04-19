// app/pages/tv/[id].vue
<script setup lang="ts">
const meta = useMeta()
const tmdb = useTmdb()
const route = useRoute()

const tvId = computed(() => {
	const raw = route.params.id
	const n = Number(Array.isArray(raw) ? raw[0] : raw)
	return Number.isFinite(n) ? n : null
})

const [
	{ data: details },
	{ data: images },
	{ data: credits, status: creditsStatus },
	{ data: similar, status: similarStatus },
] = await Promise.all([
	tmdb.fetchTvDetails(tvId),
	tmdb.fetchTvImages(tvId),
	tmdb.fetchTvCredits(tvId),
	tmdb.fetchTvSimilar(tvId),
])

if (!details.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'TV show not found',
		fatal: true,
	})
}

const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || '').replace(/\/$/, '')

useSeo({
	title: details.value.name,
	description: (details.value.overview || meta.value.siteDescription).slice(0, 200),
	image: details.value.backdrop_path
		? tmdb.backdropUrl(details.value.backdrop_path)
		: tmdb.posterUrl(details.value.poster_path),
	path: `/tv/${details.value.id}`,
	type: 'video.tv_show',
})

useHead({
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify(tvSchema(details.value, siteUrl)),
		},
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify(
				breadcrumbSchema(siteUrl, [
					{ name: 'Home', path: '/' },
					{ name: 'TV Shows', path: '/tv' },
					{ name: details.value.name, path: `/tv/${details.value.id}` },
				])
			),
		},
	],
})

const backdrop = computed(() =>
	details.value ? tmdb.backdropUrl(details.value.backdrop_path) : ''
)
const poster = computed(() =>
	details.value ? tmdb.posterUrl(details.value.poster_path) : ''
)
const year = computed(() => details.value?.first_air_date?.slice(0, 4) ?? '')
const rating = computed(() => details.value?.vote_average.toFixed(1) ?? '')
const seasons = computed(() => details.value?.number_of_seasons ?? 0)
const episodes = computed(() => details.value?.number_of_episodes ?? 0)
const genres = computed(() => details.value?.genres.map((g) => g.name) ?? [])

const galleryItems = computed(() =>
	(images.value?.backdrops ?? [])
		.filter((img) => img.file_path !== details.value?.backdrop_path)
		.slice(0, 6)
)

const list = useList()
const inList = computed(() =>
	details.value ? list.has(details.value.id, 'tv') : false
)

const handleToggleList = (): void => {
	if (!details.value) return
	const wasIn = inList.value
	list.toggleItem({
		id: details.value.id,
		type: 'tv',
		title: details.value.name,
		posterPath: details.value.poster_path,
	})
	if (!wasIn) list.open()
}

const trailer = useTrailer()
const handleWatchTrailer = (): void => {
	if (!details.value) return
	trailer.play('tv', details.value.id, details.value.name)
}
</script>

<template lang="pug">
div(v-if="details")
	section(class="relative w-full min-h-[90vh] overflow-hidden")
		div(class="absolute inset-0")
			NuxtImg(
				v-if="backdrop"
				:src="backdrop"
				:alt="details.name"
				class="w-full h-full object-cover"
			)
			div(class="absolute inset-0 bg-linear-to-t from-cinema-bg via-cinema-bg/60 to-transparent")
			div(class="absolute inset-0 bg-linear-to-r from-cinema-bg/90 via-cinema-bg/40 to-transparent")
		div(class="container relative min-h-[90vh] flex items-end pb-20 pt-32")
			div(class="grid md:grid-cols-[auto_1fr] gap-8 w-full")
				div(
					v-if="poster"
					class="hidden md:block w-56 aspect-[2/3] rounded-lg overflow-hidden bg-cinema-elevated shrink-0"
				)
					NuxtImg(
						:src="poster"
						:alt="details.name"
						class="w-full h-full object-cover"
					)
				div(class="max-w-3xl")
					div(
						v-if="genres.length"
						class="mb-3 flex flex-wrap gap-2"
					)
						span(
							v-for="g in genres"
							:key="g"
							class="px-3 py-1 text-xs rounded-full bg-white/10 text-white/80"
						) {{ g }}
					h1(class="font-oswald text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white leading-none") {{ details.name }}
					div(class="flex items-center gap-4 text-sm text-cinema-muted mt-5")
						span(class="flex items-center gap-1")
							span(class="text-brand-tag") ★
							span(class="text-white font-semibold") {{ rating }}
						span(v-if="year") •
						span(v-if="year") {{ year }}
						span(v-if="seasons") •
						span(v-if="seasons") {{ seasons }} Season{{ seasons > 1 ? 's' : '' }}
						span(v-if="episodes") •
						span(v-if="episodes") {{ episodes }} Episodes
					//- p(v-if="details.tagline" class="mt-4 italic text-brand-accent") {{ details.tagline }}
					p(class="mt-6 text-white/80 max-w-2xl") {{ details.overview }}
					div(class="mt-8 flex flex-wrap gap-3")
						button(
							type="button"
							class="px-6 py-3 rounded-md bg-brand-accent text-cinema-bg font-medium hover:brightness-110 transition-all"
							@click="handleWatchTrailer"
						) ▶ Watch Trailer
						button(
							type="button"
							class="px-6 py-3 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium transition-colors"
							@click="handleToggleList"
						) {{ inList ? '✓ In My List' : '+ My List' }}
	CastRail(
		v-if="credits?.cast?.length"
		title="Cast"
		:cast="credits.cast"
		:loading="creditsStatus === 'pending'"
	)
	TvRail(
		v-if="similar?.results?.length"
		title="Related TV Shows"
		:shows="similar.results"
		:loading="similarStatus === 'pending'"
	)
	section(v-if="galleryItems.length" class="py-12")
		div(class="container")
			h2(class="font-oswald text-2xl md:text-3xl uppercase tracking-tight font-medium text-white mb-6") Gallery
			div(class="grid grid-cols-2 md:grid-cols-3 gap-4")
				div(
					v-for="item in galleryItems"
					:key="item.file_path"
					class="relative aspect-video overflow-hidden rounded-lg bg-cinema-elevated"
				)
					NuxtImg(
						:src="tmdb.backdropUrl(item.file_path)"
						:alt="`${details.name} still`"
						loading="lazy"
						class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
					)
</template>
