// app/pages/movie/[id].vue
<script setup lang="ts">
const meta = useMeta()
const tmdb = useTmdb()
const stream = useStream()
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
const streamError = ref<string | null>(null)

const closePlayer = (): void => {
	streamUrl.value = null
	streamError.value = null
}

const handlePlay = async (): Promise<void> => {
	if (!details.value) return
	streamError.value = null
	try {
		streamUrl.value = await stream.movieStreamUrl(details.value.id)
	} catch {
		streamError.value = 'This title is unavailable right now.'
	}
}
</script>

<template lang="pug">
div(v-if="details")
	section(class="relative w-full min-h-[90vh] overflow-clip")
		TrailerBackdrop(
			:video-key="heroTrailerKey"
			:backdrop="backdrop"
			:title="details.title"
			:paused="Boolean(streamUrl)"
		)
		div(class="container relative min-h-[90vh] flex items-end pb-20 pt-32")
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
					p(v-if="streamError" class="mt-4 text-sm text-brand-tag") {{ streamError }}
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
	PlayerModal(
		:src="streamUrl"
		:title="details.title"
		@close="closePlayer"
	)
</template>
