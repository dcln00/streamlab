<template lang="pug">
div
	Head
		Title {{`Movies - ${meta.title}`}}

	section#jumbo-page.container-fluid.px-0
		.jumbo-image
			img(:src='`${config.public.imgBackdropBaseUrl}${data?.popularMovies.results[Math.floor(Math.random() * data?.popularMovies.results.length)].backdrop_path}`' alt='featured movie poster')
		.wrap.container.d-flex.justify-content-center.align-items-center
			.title Movies

	LazyList(:heading="{name:'Trending Movies', url: '/movie/category/trending'}" :show='true' :data='data?.trendingMovies.results.slice(0, 15)')
	LazyList(:heading="{name:'Popular Movies', url: '/movie/category/popular'}" :show='true' :data='data?.popularMovies.results.slice(0, 15)')
	LazyList(:heading="{name:'Coming Soon', url: '/movie/category/upcoming'}" :data='data?.upcomingMovies.results.slice(0, 15)')
</template>

<script setup>
import {siteSettings} from '~/store/index'
import { storeToRefs } from 'pinia'
const settings = siteSettings()
const { meta } = storeToRefs(settings)
const config = useRuntimeConfig()

const nuxtApp = useNuxtApp()
const url = computed(() => `/api/listings`)
const { data } = await useFetch(url, {
	key: 'list',
	getCachedData: (key) => nuxtApp.payload.data[key] || nuxtApp.static.data[key]
})
</script>

<style scoped>
#jumbo-page {
	margin-bottom: 4.5rem;
}
</style>