<template lang="pug">
div
	Head
		Title {{`Movies - ${meta.title}`}}

	section#jumbo-page.container-fluid.px-0
		.jumbo-image
			img(:src='`${config.public.imgBackdropBaseUrl}${data?.popularMovies.results[Math.floor(Math.random() * data?.popularMovies.results.length)].backdrop_path}`' alt='featured movie poster')
		.wrap.container.d-flex.justify-content-center.align-items-center
			.title Movies

	LazyMovieList(:heading="{name:'Trending Movies', url: '/movie/category/trending'}" :show='true' :fetch-params='data.trendingMovies?.results.slice(0, 15)')
	LazyMovieList(:heading="{name:'Popular Movies', url: '/movie/category/popular'}" :show='true' :fetch-params='data.popularMovies?.results.slice(0, 15)')
	LazyMovieList(:heading="{name:'Coming Soon', url: '/movie/category/upcoming'}" :show='false' :fetch-params='data.upcomingMovies?.results.slice(0, 15)')
</template>

<script setup>
import {siteSettings} from '~/store/index'
import { storeToRefs } from 'pinia'
const settings = siteSettings()
const { meta } = storeToRefs(settings)

const config = useRuntimeConfig()
const lists = computed(() => `api/listings`)
const { data } = await useFetch(lists)


// const list = [
// 	{name: 'Trending Movies', url: '/movie/category/trending', show: true, params: data.value.trendingMovies?.results.slice(0, 15)},
// 	{name: 'Popular Movies', url: '/movie/category/popular', show: true, params: data.value.popularMovies?.results.slice(0, 15)},
// 	{name: 'Coming Soon', url: '/movie/category/upcoming', show: false, params: data.value.upcomingMovies?.results.slice(0, 15)},
// ]
</script>

<style scoped>
#jumbo-page {
	margin-bottom: 4.5rem;
}
</style>