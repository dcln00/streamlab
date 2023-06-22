<template lang="pug">
section#upcoming.container
	.heading.d-flex.align-items-center
			.title {{heading.name}}
			.explore.ms-auto #[NuxtLink(:to='heading.url') Explore More]
	.upcoming-container 
		.upcoming(v-for='(item, index) in fetchParams' :key='index')
			.poster
				NuxtLink(:to='`/tv/${item?.id}`')
					img(:src='`${config.public.imgBaseUrl}${item.poster_path}`')
				.play(v-if="$device.isDesktop")
					i(class="fa fa-play-circle" aria-hidden="true")
			.details
				NuxtLink(:to='`/tv/${item?.id}`')
					.movie-title {{ item.name }}
				.other
					.rating #[i(class="fa fa-star" aria-hidden="true")] {{ `${Math.round(item.vote_average / 10 * 100)}%` }}
</template>

<script setup>
defineProps({
	heading: Object,
	fetchParams: Object
})

const config = useRuntimeConfig()
const lists = computed(() => `/api/listings`)
const { data } = await useFetch(lists)
</script>