// app/pages/index.vue
<script setup lang="ts">
const meta = useMeta()
const tmdb = useTmdb()
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || '').replace(/\/$/, '')

useSeoMeta({
	title: meta.value.ogSiteName,
	ogTitle: meta.value.ogSiteName,
	description: meta.value.siteDescription,
	ogDescription: meta.value.siteDescription,
})

useHead({
	script: [
		{
			type: 'application/ld+json',
			innerHTML: JSON.stringify(websiteSchema(siteUrl, meta.value.siteName)),
		},
	],
})

const [trendingMovies, trendingShows] = await Promise.all([
	tmdb.fetchTrending('week'),
	tmdb.fetchTrendingTv('week'),
])

const heroMovie = computed(() => trendingMovies.data.value?.results[0] ?? null)
</script>

<template lang="pug">
div
	MovieHero(:movie="heroMovie")
	MovieRail(
		title="Trending Movies"
		:movies="trendingMovies.data.value?.results ?? []"
		:loading="trendingMovies.status.value === 'pending'"
	)
	TvRail(
		title="Trending Shows"
		:shows="trendingShows.data.value?.results ?? []"
		:loading="trendingShows.status.value === 'pending'"
	)
</template>
