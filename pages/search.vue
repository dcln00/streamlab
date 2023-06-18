<template lang="pug">
div
	section#search
		AppSearch(v-model.lazy="term" v-if='$device.isMobileOrTablet')
	section#jumbo-page.container-fluid.px-0
		.wrap.container.d-flex.justify-content-center.align-items-center
			.title(v-if='searchTerm.length === 0') Search
			.title(:model-value='term' v-else) {{ `Results For: ${searchTerm}` }}

	section#listing.container
		.listing-container 
			.list(v-for='(item, index) in data?.results' :key='index')
				.poster.d-flex.justify-content-center.align-items-center(v-if='!item.poster_path')
					NuxtLink(:to='item.title ? `/movie/${item?.id}` : `/tv/${item?.id}`')
						svg(xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewbox='0 0 24 24' fill-rule='evenodd' clip-rule='evenodd' fill='#999')
							path(d='M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z')
					.play(v-if="$device.isDesktop")
						i(class="fa fa-play-circle" aria-hidden="true")
				.poster(v-else)
					NuxtLink(:to='item.title ? `/movie/${item?.id}` : `/tv/${item?.id}`')
						img(:src='`${config.public.imgBaseUrl}${item.poster_path}`')
					.play(v-if="$device.isDesktop")
						i(class="fa fa-play-circle" aria-hidden="true")
				.details
					NuxtLink(:to='item.title ? `/movie/${item?.id}` : `/tv/${item?.id}`')
						.movie-title {{ item.title ? item.title : item.name }}
					//- .other.d-flex
						//- .year {{item.release_date ? item.release_date.split('-')[0] : item.first_air_date.slice(0,4)}}
						//- .time #[i(class="fa fa-star" aria-hidden="true")] {{`${Math.round(item.vote_average / 10 * 100)}%`}}
</template>

<script setup>
import {siteSettings, searchQuery} from '~/store/index'
const settings = siteSettings()
const search = searchQuery()
const { term } = storeToRefs(search)
const { meta } = storeToRefs(settings)

const searchTerm = term
const config = useRuntimeConfig()
const url = computed(() => {
	return `api/search?query=${searchTerm.value}`
})

const {data} = await useFetch(url)
</script>

<style scoped>
#search {
	padding-top: 8.5rem;
}
</style>