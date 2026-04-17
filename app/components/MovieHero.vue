// app/components/MovieHero.vue
<script setup lang="ts">
import type { Movie } from '~/types/tmdb'

const props = defineProps<{
	movie: Movie | null
}>()

const tmdb = useTmdb()

const backdrop = computed(() =>
	props.movie ? tmdb.backdropUrl(props.movie.backdrop_path) : ''
)
const rating = computed(() => props.movie?.vote_average.toFixed(1) ?? '')
const year = computed(() => props.movie?.release_date?.slice(0, 4) ?? '')

const movieId = computed(() => props.movie?.id ?? null)
const [{ data: images }, { data: details }] = await Promise.all([
	tmdb.fetchMovieImages(movieId),
	tmdb.fetchMovieDetails(movieId),
])

const runtime = computed(() => tmdb.formatRuntime(details.value?.runtime))

const galleryItems = computed(() => {
	const heroPath = props.movie?.backdrop_path
	return (images.value?.backdrops ?? [])
		.filter((img) => img.file_path !== heroPath)
		.slice(0, 3)
})

const trailer = useTrailer()
const handleWatchTrailer = (): void => {
	if (!props.movie) return
	trailer.play('movie', props.movie.id, props.movie.title)
}

const list = useList()
const inList = computed(() =>
	props.movie ? list.has(props.movie.id, 'movie') : false
)

const handleToggleList = (): void => {
	if (!props.movie) return
	const wasIn = inList.value
	list.toggleItem({
		id: props.movie.id,
		type: 'movie',
		title: props.movie.title,
		posterPath: props.movie.poster_path,
	})
	if (!wasIn) list.open()
}
</script>

<template lang="pug">
section(class="relative w-full h-screen overflow-hidden")
	div(v-if="movie" class="absolute inset-0")
		NuxtImg(
			v-if="backdrop"
			:src="backdrop"
			:alt="movie.title"
			class="w-full h-full object-cover"
		)
		div(class="absolute inset-0 bg-linear-to-t from-cinema-bg via-cinema-bg/60 to-transparent")
		div(class="absolute inset-0 bg-linear-to-r from-cinema-bg/90 via-cinema-bg/40 to-transparent")
	div(class="container relative h-full flex items-end md:items-end pb-20")
		div(v-if="movie" class="max-w-3xl")
			div(class="flex items-center gap-4 text-sm text-cinema-muted mb-3")
				span(class="flex items-center gap-1")
					span(class="text-brand-tag") ★
					span(class="text-white font-semibold") {{ rating }}
				span(v-if="year") •
				span(v-if="year") {{ year }}
				span •
				span(class="tracking-wide text-brand-accent font-medium") Featured
			h1(class="font-oswald text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-white leading-none") {{ movie.title }}
			div(
				v-if="runtime"
				class="runtime mt-5 inline-flex items-center gap-2 text-sm text-cinema-muted"
			)
				span {{ runtime }}
			p(class="mt-5 text-white/80 line-clamp-3 max-w-xl") {{ movie.overview }}
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
				) {{ inList ? '✓ Added to Watchlist' : '+ Add to Watchlist' }}
			div(
				v-if="galleryItems.length"
				class="gallery mt-10 grid grid-cols-3 gap-3"
			)
				div(
					v-for="item in galleryItems"
					:key="item.file_path"
					class="relative aspect-video overflow-hidden bg-cinema-elevated group/gallery cursor-pointer transition-all"
				)
					NuxtImg(
						:src="tmdb.backdropUrl(item.file_path)"
						:alt="`${movie.title} still`"
						loading="lazy"
						class="w-full h-full object-cover transition-transform duration-500 group-hover/gallery:scale-105"
					)
					div(class="absolute inset-0 bg-black/20 group-hover/gallery:bg-black/0 transition-colors")
		div(v-else class="w-full max-w-2xl space-y-4 animate-pulse")
			div(class="h-4 w-32 bg-cinema-surface rounded")
			div(class="h-14 w-3/4 bg-cinema-surface rounded")
			div(class="h-4 w-full bg-cinema-surface rounded")
			div(class="h-4 w-5/6 bg-cinema-surface rounded")
</template>
