// app/pages/movie/[id].vue
<script setup lang="ts">
const meta = useMeta()
const tmdb = useTmdb()
const route = useRoute()

const movieId = computed(() => {
	const raw = route.params.id
	const n = Number(Array.isArray(raw) ? raw[0] : raw)
	return Number.isFinite(n) ? n : null
})

const [
	{ data: details },
	{ data: images },
	{ data: credits, status: creditsStatus },
	{ data: similar, status: similarStatus },
	{ data: videos },
] = await Promise.all([
	tmdb.fetchMovieDetails(movieId),
	tmdb.fetchMovieImages(movieId),
	tmdb.fetchMovieCredits(movieId),
	tmdb.fetchMovieSimilar(movieId),
	tmdb.fetchMovieVideos(movieId),
])

if (!details.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Movie not found',
		fatal: true,
	})
}

const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || '').replace(/\/$/, '')

const seoTitle = details.value.title
const seoDescription = (details.value.overview || meta.value.siteDescription).slice(0, 200)
const seoImage = details.value.backdrop_path
	? tmdb.backdropUrl(details.value.backdrop_path)
	: tmdb.posterUrl(details.value.poster_path)

useSeoMeta({
	title: seoTitle,
	ogTitle: seoTitle,
	description: seoDescription,
	ogDescription: seoDescription,
	ogImage: seoImage,
	ogType: 'video.movie',
})

useHead({
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify(movieSchema(details.value, siteUrl)),
		},
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify(
				breadcrumbSchema(siteUrl, [
					{ name: 'Home', path: '/' },
					{ name: 'Movies', path: '/movie' },
					{ name: details.value.title, path: `/movie/${details.value.id}` },
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
const year = computed(() => details.value?.release_date?.slice(0, 4) ?? '')
const rating = computed(() => details.value?.vote_average.toFixed(1) ?? '')
const runtime = computed(() => tmdb.formatRuntime(details.value?.runtime))
const genres = computed(() => details.value?.genres.map((g) => g.name) ?? [])

const galleryItems = computed(() =>
	(images.value?.backdrops ?? [])
		.filter((img) => img.file_path !== details.value?.backdrop_path)
		.slice(0, 6)
)

const list = useList()
const inList = computed(() =>
	details.value ? list.has(details.value.id, 'movie') : false
)

const handleToggleList = (): void => {
	if (!details.value) return
	const wasIn = inList.value
	list.toggleItem({
		id: details.value.id,
		type: 'movie',
		title: details.value.title,
		posterPath: details.value.poster_path,
	})
	if (!wasIn) list.open()
}

const heroTrailerKey = computed(
	() => pickTrailer(videos.value?.results ?? [])?.key ?? null
)

const streamUrl = ref<string | null>(null)

const handlePlay = (): void => {
	if (!details.value) return
	streamUrl.value = movieStreamUrl(details.value.id)
}
</script>

<template lang="pug">
div(v-if="details")
	section(class="relative w-full min-h-[90vh] overflow-clip")
		template(v-if="streamUrl")
			iframe(
				:src="streamUrl"
				:title="`${details.title} player`"
				allow="autoplay; encrypted-media; fullscreen"
				allowfullscreen
				class="absolute inset-0 w-full h-full"
			)
			button(
				type="button"
				aria-label="Close player"
				class="absolute top-20 right-4 md:right-8 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
				@click="streamUrl = null"
			)
				svg(viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-5")
					path(stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12")
		TrailerBackdrop(
			v-if="!streamUrl"
			:video-key="heroTrailerKey"
			:backdrop="backdrop"
			:title="details.title"
		)
		div(v-if="!streamUrl" class="container relative min-h-[90vh] flex items-end pb-20 pt-32")
			div(class="grid md:grid-cols-[auto_1fr] gap-8 w-full")
				div(
					v-if="poster"
					class="hidden md:block w-56 aspect-[2/3] rounded-lg overflow-hidden bg-cinema-elevated shrink-0"
				)
					NuxtImg(
						:src="poster"
						:alt="details.title"
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
					h1(class="font-oswald text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white leading-none") {{ details.title }}
					div(class="flex items-center gap-4 text-sm text-cinema-muted mt-5")
						span(class="flex items-center gap-1")
							span(class="text-brand-tag") ★
							span(class="text-white font-semibold") {{ rating }}
						span(v-if="year") •
						span(v-if="year") {{ year }}
						span(v-if="runtime") •
						span(v-if="runtime") {{ runtime }}
					p(class="mt-6 text-white/80 max-w-2xl") {{ details.overview }}
					div(class="mt-8 flex flex-wrap gap-3")
						button(
							type="button"
							class="px-6 py-3 rounded-md bg-brand-accent text-cinema-bg font-medium hover:brightness-110 transition-all"
							@click="handlePlay"
						) Play
						button(
							type="button"
							class="px-6 py-3 rounded-md bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium transition-colors"
							@click="handleToggleList"
						) {{ inList ? 'Added to watchlist' : 'Add to Watchlist' }}
	CastRail(
		v-if="credits?.cast?.length"
		title="Cast"
		:cast="credits.cast"
		:loading="creditsStatus === 'pending'"
	)
	MovieRail(
		v-if="similar?.results?.length"
		title="Related Movies"
		:movies="similar.results"
		:loading="similarStatus === 'pending'"
	)
	section(v-if="galleryItems.length" class="hidden md:block py-12")
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
						:alt="`${details.title} still`"
						loading="lazy"
						class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
					)
</template>
