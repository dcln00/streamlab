// app/pages/tv/index.vue
<script setup lang="ts">
import type { Movie } from '~/types/tmdb'

const meta = useMeta()
const tmdb = useTmdb()

useSeo({
	title: 'TV Shows',
	description: 'Browse popular, trending, and top-rated TV shows on Streamlab.',
	path: '/tv',
})

const [trending, popular, topRated, onTheAir, airingToday] = await Promise.all([
	tmdb.fetchTrendingTv('week'),
	tmdb.fetchPopularTv(),
	tmdb.fetchTopRatedTv(),
	tmdb.fetchOnTheAirTv(),
	tmdb.fetchAiringTodayTv(),
])

const heroShow = computed(() => popular.data.value?.results[0] ?? null)

const heroAsMovie = computed<Movie | null>(() => {
	const s = heroShow.value
	if (!s) return null
	return {
		id: s.id,
		title: s.name,
		original_title: s.original_name,
		overview: s.overview,
		poster_path: s.poster_path,
		backdrop_path: s.backdrop_path,
		release_date: s.first_air_date,
		vote_average: s.vote_average,
		vote_count: s.vote_count,
		genre_ids: s.genre_ids,
		popularity: s.popularity,
		adult: false,
		original_language: s.original_language,
	}
})
</script>

<template lang="pug">
div
	MovieHero(:movie="heroAsMovie")
	TvRail(
		title="Popular TV Shows"
		view-all-to="/tv/category/popular"
		:shows="popular.data.value?.results ?? []"
		:loading="popular.status.value === 'pending'"
	)
	TvRail(
		title="Trending This Week"
		view-all-to="/tv/category/trending"
		:shows="trending.data.value?.results ?? []"
		:loading="trending.status.value === 'pending'"
	)
	TvRail(
		title="On The Air"
		view-all-to="/tv/category/on-the-air"
		:shows="onTheAir.data.value?.results ?? []"
		:loading="onTheAir.status.value === 'pending'"
	)
	TvRail(
		title="Airing Today"
		view-all-to="/tv/category/airing-today"
		:shows="airingToday.data.value?.results ?? []"
		:loading="airingToday.status.value === 'pending'"
	)
	//- TvRail(
	//- 	title="Top Rated"
	//- 	view-all-to="/tv/category/top-rated"
	//- 	:shows="topRated.data.value?.results ?? []"
	//- 	:loading="topRated.status.value === 'pending'"
	//- )
</template>
