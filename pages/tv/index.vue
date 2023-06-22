<template lang="pug">
div
	Head
		Title {{`Tv Shows - ${meta.title}`}}

	section#jumbo-page.container-fluid.px-0
		.jumbo-image
			img(:src='`${config.public.imgBackdropBaseUrl}${data?.popularTv.results[Math.floor(Math.random() * data?.popularTv.results.length)].backdrop_path}`' alt='featured movie poster')
		.wrap.container.d-flex.justify-content-center.align-items-center
			.title TV Shows
	
	LazyTvList(:heading="{name: 'Currently Airing', url: '/tv/category/airing'}" :fetch-params="data?.curAirTv.results.slice(0, 10)")
	LazyTvList(:heading="{name: 'Popular TV Shows', url: '/tv/category/popular'}" :fetch-params="data?.popularTv.results.slice(0, 10)")
	LazyTvList(:heading="{name: 'Airing Today', url: '/tv/category/today'}" :fetch-params="data?.onTheAirTv.results.slice(0, 10)")
</template>

<script setup>
import {siteSettings} from '~/store/index'
import { storeToRefs } from 'pinia'
const settings = siteSettings()
const { meta } = storeToRefs(settings)

const config = useRuntimeConfig()
const lists = computed(() => `/api/listings`)
const { data } = await useFetch(lists)
</script>

<style scoped>
#jumbo-page {
	margin-bottom: 4.5rem;
}
</style>