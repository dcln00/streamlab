// app/pages/movie/index.vue
<script setup lang="ts">
const meta = useMeta()
const tmdb = useTmdb()

useHead({
	title: () => `${meta.value.siteName} - Movies`,
})

const [trending, popular, topRated, upcoming, nowPlaying] = await Promise.all([
	tmdb.fetchTrending('week'),
	tmdb.fetchPopular(),
	tmdb.fetchTopRated(),
	tmdb.fetchUpcoming(),
	tmdb.fetchNowPlaying(),
])

const heroMovie = computed(() => popular.data.value?.results[0] ?? null)
</script>

<template lang="pug">
div
	MovieHero(:movie="heroMovie")
	MovieRail(
		title="Popular Movies"
		view-all-to="/movie/category/popular"
		:movies="popular.data.value?.results ?? []"
		:loading="popular.status.value === 'pending'"
	)
	MovieRail(
		title="Trending This Week"
		view-all-to="/movie/category/trending"
		:movies="trending.data.value?.results ?? []"
		:loading="trending.status.value === 'pending'"
	)
	MovieRail(
		title="Now Playing"
		view-all-to="/movie/category/now-playing"
		:movies="nowPlaying.data.value?.results ?? []"
		:loading="nowPlaying.status.value === 'pending'"
	)
	MovieRail(
		title="Top Rated"
		view-all-to="/movie/category/top-rated"
		:movies="topRated.data.value?.results ?? []"
		:loading="topRated.status.value === 'pending'"
	)
	MovieRail(
		title="Coming Soon"
		view-all-to="/movie/category/upcoming"
		:movies="upcoming.data.value?.results ?? []"
		:loading="upcoming.status.value === 'pending'"
	)
</template>
