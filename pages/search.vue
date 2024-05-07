<template lang="pug">
div
	section#search
		AppSearch(v-model.lazy="term" v-if='$device.isMobileOrTablet')
	section#jumbo-page.container-fluid.px-0
		.wrap.container.d-flex.justify-content-center.align-items-center
			.title(v-if='!searchTerm') Search
			.title(:model-value='term' v-else) {{ `Results For: ${searchTerm}` }}

	section#listing.container
		.listing-container 
			.list(v-for='(item, index) in data?.results' :key='index' v-show="!item.known_for")
				.poster.d-flex.justify-content-center.align-items-center(v-if='!item.poster_path')
					NuxtLink(:to='item.title ? `/movie/${item?.id}` : `/tv/${item?.id}`')
						BrokenIcon
					.play(v-if="$device.isDesktop")
						Icon(name="material-symbols-light:play-circle-outline-rounded" size="4.5em")
				.poster(v-else)
					.tag {{ item.title ? "movie" : "tv" }}
					NuxtLink(:to='item.title ? `/movie/${item?.id}` : `/tv/${item?.id}`')
						img(:src='`${config.public.imgBaseUrl}${item.poster_path}`')
					.play(v-if="$device.isDesktop")
						Icon(name="material-symbols-light:play-circle-outline-rounded" size="4.5em")
				.details
					NuxtLink(:to='item.title ? `/movie/${item?.id}` : `/tv/${item?.id}`')
						.movie-title {{ item.title ? item.title : item.name }}
					.other.d-flex
						.year(v-if='item.release_date') {{ item.release_date.split('-')[0] }}
						.year(v-else-if='item.first_air_date') {{ item.first_air_date.slice(0,4) }}
						.time.d-flex.align-items.center #[Icon(name="material-symbols:star-rate-rounded" size="1.2em")] {{`${Math.round(item.vote_average / 10 * 100)}%`}}
</template>

<script setup>
import {siteSettings, searchQuery} from '~/store/index'
const settings = siteSettings()
const search = searchQuery()
const { term } = storeToRefs(search)
const { meta } = storeToRefs(settings)

const searchTerm = refDebounced(term, 1000)
const config = useRuntimeConfig()
const url = computed(() => `/api/search?query=${searchTerm.value}`)

const {data} = await useFetch(url)
</script>

<style scoped>
#search {
	padding-top: 8.5rem;
}
</style>