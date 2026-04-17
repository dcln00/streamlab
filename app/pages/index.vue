// app/pages/index.vue
<script setup lang="ts">
const meta = useMeta()
const tmdb = useTmdb()

useHead({
	title: () => `${meta.value.siteName} - ${meta.value.ogSiteName}`,
})

const [trending, popular, topRated, upcoming, nowPlaying] = await Promise.all([
	tmdb.fetchTrending('week'),
	tmdb.fetchPopular(),
	tmdb.fetchTopRated(),
	tmdb.fetchUpcoming(),
	tmdb.fetchNowPlaying(),
])

const heroMovie = computed(() => trending.data.value?.results[0] ?? null)
</script>

<template lang="pug">
div
	MovieHero(:movie="heroMovie")
	MovieRail(
		title="Trending This Week"
		:movies="trending.data.value?.results ?? []"
		:loading="trending.status.value === 'pending'"
	)
	MovieRail(
		title="Now Playing"
		:movies="nowPlaying.data.value?.results ?? []"
		:loading="nowPlaying.status.value === 'pending'"
	)
	MovieRail(
		title="Popular"
		:movies="popular.data.value?.results ?? []"
		:loading="popular.status.value === 'pending'"
	)
	//- MovieRail(
	//- 	title="Top Rated"
	//- 	:movies="topRated.data.value?.results ?? []"
	//- 	:loading="topRated.status.value === 'pending'"
	//- )
	MovieRail(
		title="Coming Soon"
		:movies="upcoming.data.value?.results ?? []"
		:loading="upcoming.status.value === 'pending'"
	)
</template>
