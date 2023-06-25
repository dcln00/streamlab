<template lang="pug">
div
	LazyJumbotron
	LazyTrending
	LazyMovieList(:heading="{name: 'Popular Movies', url: '/movie/category/popular'}" :show='true' :fetch-params="data?.popularMovies.results.slice(1, 11)")
	LazyTvList(:heading="{name: 'Popular TV Shows', url: '/tv/category/popular'}" :fetch-params="data?.popularTv.results.slice(0, 10)")
	LazyMovieList(:heading="{name: 'Coming Soon', url: '/movie/category/upcoming'}" :show='false' :fetch-params="data?.upcomingMovies.results.slice(0, 10)")
</template>

<script setup>
const config = useRuntimeConfig()
const lists = computed(() => `/api/listings`)
const { data } = await useFetch(lists)
</script>