<template lang="pug">
div
	section#warning.container-fluid.d-flex.align-items-center.justify-content-center(v-if='error')
		Error
	section#warning.container-fluid.d-flex.align-items-center.justify-content-center(v-else-if='pending')
		Pending
	div(v-else)
		Head
			Title {{`${query.charAt(0).toUpperCase() + query.slice(1)} TV Shows - ${meta.title}`}}
		section#jumbo-page.container-fluid.px-0
			.jumbo-image
				img(:src='`${config.public.imgBackdropBaseUrl}${data?.results[0].backdrop_path}`' alt='featured TV poster')
			.wrap.container.d-flex.justify-content-center.align-items-center
				.title {{ `${query} TV Shows` }}


		section#listing.container 
			.listing-container 
				.list(v-for='(item, index) in data?.results' :key='index')
					.poster.d-flex.justify-content-center.align-items-center(v-if='!item.poster_path')
						NuxtLink(:to='`/tv/${item?.id}`')
							BrokenIcon
						.play(v-if="$device.isDesktop")
							i(class="fa fa-play-circle" aria-hidden="true")
					.poster(v-else)
						NuxtLink(:to='`/tv/${item?.id}`')
							img(:src='`${config.public.imgBaseUrl}${item.poster_path}`')
						.play(v-if="$device.isDesktop")
							i(class="fa fa-play-circle" aria-hidden="true")
					.details
						NuxtLink(:to='`/tv/${item.id}`')
							.movie-title {{ item.name }}
						.other.d-flex
							.time #[i(class="fa fa-star" aria-hidden="true")] {{`${Math.round(item.vote_average / 10 * 100)}%`}}
</template>

<script setup>
const route = useRoute()
const config = useRuntimeConfig()
const query = computed(() => route.params.query)
const { data, error, pending } = useFetch(`/api/tv/category/${query.value}`)

import {siteSettings} from '~/store/index'
import { storeToRefs } from 'pinia'
const settings = siteSettings()
const { meta } = storeToRefs(settings)
</script>