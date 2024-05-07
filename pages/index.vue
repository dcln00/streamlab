<template lang="pug">
div
	LazyJumbotron(:data="data")
	LazyTrending(:data="data")
	LazyList(:heading="{name: 'Popular Movies', url: '/movie/category/popular'}" :show='true' :data="data?.popularMovies.results.slice(1, 11)")
	LazyList(:tv="true" :heading="{name: 'Popular TV Shows', url: '/tv/category/popular'}" :data="data?.popularTv.results.slice(0, 10)")
	LazyList(:heading="{name: 'Coming Soon', url: '/movie/category/upcoming'}" :data="data?.upcomingMovies.results.slice(0, 10)")
</template>

<script setup>
const nuxtApp = useNuxtApp()
const url = computed(() => `/api/listings`)
const { data } = await useFetch(url.value, {
	key: 'list',
	getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key]
})
</script>
