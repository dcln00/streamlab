<template lang="pug">
section#popular.container 
	.heading.d-flex.align-items-center
		.title {{heading.name}}
		.explore.ms-auto #[NuxtLink(:to='heading.url') Explore More]
	.popular-container
		.popular(v-for='(item, index) in fetchParams' :key='index')
			.poster
				NuxtLink(:to='`/movie/${item?.id}`')
					img(:src='`${config.public.imgBaseUrl}${item.poster_path}`')
				.play(v-if="$device.isDesktop")
					i(class="fa fa-play-circle" aria-hidden="true")
			.details
				NuxtLink(:to='`/movie/${item.id}`')
					.movie-title {{ item.title }}
				.other.d-flex(v-if="show")
					.year {{item.release_date.split('-')[0]}}
					.time #[i(class="fa fa-star" aria-hidden="true")] {{`${Math.round(item.vote_average / 10 * 100)}%`}}
				.other.d-flex(v-else)
					.year {{new Date(item.release_date).toUTCString().slice(5, 16) }}
					.time #[i(class="fa fa-star" aria-hidden="true")] {{ item.vote_average }}
</template>

<script setup>
defineProps({
	heading: Object,
	show: Boolean,
	fetchParams: Object
})

const config = useRuntimeConfig()
const lists = computed(() => `/api/listings`)
const { data } = await useFetch(lists)
</script>