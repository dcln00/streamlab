<template lang="pug">
div
	Head
		Title {{`Tv Shows - ${meta.title}`}}

	section#jumbo-page.container-fluid.px-0
		.jumbo-image
			img(:src='`${config.public.imgBackdropBaseUrl}${data?.popularTv.results[Math.floor(Math.random() * data?.popularTv.results.length)].backdrop_path}`' alt='featured movie poster')
		.wrap.container.d-flex.justify-content-center.align-items-center
			.title TV Shows
	
	LazyList(:tv="true" :heading="{name: 'Currently Airing', url: '/tv/category/airing'}" :data="data?.curAirTv.results.slice(0, 10)")
	LazyList(:tv="true" :heading="{name: 'Popular TV Shows', url: '/tv/category/popular'}" :data="data?.popularTv.results.slice(0, 10)")
	LazyList(:tv="true" :heading="{name: 'Airing Today', url: '/tv/category/today'}" :data="data?.onTheAirTv.results.slice(0, 10)")
</template>

<script setup>
import { siteSettings } from '~/store/index'
import { storeToRefs } from 'pinia'
const settings = siteSettings()
const { meta } = storeToRefs(settings)

const nuxtApp = useNuxtApp()
const config = useRuntimeConfig()
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
