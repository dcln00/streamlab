<template lang="pug">
div
	section#warning.container-fluid.d-flex.align-items-center.justify-content-center(v-if='error')
		Error
	section#warning.container-fluid.d-flex.align-items-center.justify-content-center(v-else-if='pending')
		Pending
	div(v-else)
		Head
			Title {{`${query.charAt(0).toUpperCase() + query.slice(1)} Movies - ${meta.title}`}}
		section#jumbo-page.container-fluid.px-0
			.jumbo-image
				img(:src='`${config.public.imgBackdropBaseUrl}${data?.results[0].backdrop_path}`' alt='featured movie poster')
			.wrap.container.d-flex.justify-content-center.align-items-center
				.title {{ `${query} Movies` }}

		section#listing.container
			.listing-container 
				.list(v-for='(item, index) in data?.results' :key='index')
					.poster.d-flex.justify-content-center.align-items-center(v-if='!item.poster_path')
						NuxtLink(:to='`/movie/${item?.id}`')
							BrokenIcon
						.play(v-if="$device.isDesktop")
							Icon(name="material-symbols-light:play-circle-outline-rounded" size="4.5em")
					.poster(v-else)
						NuxtLink(:to='`/movie/${item?.id}`')
							img(:src='`${config.public.imgBaseUrl}${item.poster_path}`')
						.play(v-if="$device.isDesktop")
							Icon(name="material-symbols-light:play-circle-outline-rounded" size="4.5em")
					.details
						NuxtLink(:to='`/movie/${item.id}`')
							.movie-title {{ item.title }}
						.other.d-flex
							.year {{item.release_date.split('-')[0]}}
							.time.d-flex.align-items.center #[Icon(name="material-symbols:star-rate-rounded" size="1.2em")] {{`${Math.round(item.vote_average / 10 * 100)}%`}}
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const nuxtApp = useNuxtApp()
const query = route.params.query
const { data, error, pending } = useFetch(`/api/movies/category/${query}`, {
	key: `${query}-movies`,
	getCachedData: (key) => {
		if (!nuxtApp.isHydrating && nuxtApp.payload.data[key]) {
			return nuxtApp.payload.data[key]
		}

		if (nuxtApp.static.data[key]) {
			return nuxtApp.static.data[key]
		}

		return null
	}
})

import {siteSettings} from '~/store/index'
import { storeToRefs } from 'pinia'
const settings = siteSettings()
const { meta } = storeToRefs(settings)
</script>