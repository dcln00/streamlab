<template lang="pug">
section#trending.container
	.heading.d-flex.align-items-center
		.title Trending
		.explore.ms-auto #[NuxtLink(:to='`/movie/category/trending`') Explore More]
	.controls(v-if="$device.isDesktop")
		.left(@click="leftScroll") #[i(class="fa fa-angle-left" aria-hidden="true")]
		.right(@click="rightScroll") #[i(class="fa fa-angle-right" aria-hidden="true")]
	.trending-container
		.trending(v-for='(item, index) in data.trendingMovies?.results.slice(0, 5)' :key='index') 
			.poster
				NuxtLink(:to='`/movie/${item?.id}`')
					img(:src='`${config.public.imgBaseUrl}${item.poster_path}`')
				.play
					i(class="fa fa-play-circle" aria-hidden="true")
				.details
					.movie-title {{ item.title }}
</template>

<script setup>
const config = useRuntimeConfig()

const trending = computed(() => `api/listings`)

const { data } = await useFetch(trending)

// import { movieListing } from '~/store/movielisting'
// const listings = movieListing()
// const {lists, fetchListing} = listings

// console.log(lists)
// await fetchListing()

function leftScroll() {
        document.querySelector(".trending-container").scrollBy(-600, 0)
      }

function rightScroll() {
        document.querySelector(".trending-container").scrollBy(600, 0)
	}
</script>