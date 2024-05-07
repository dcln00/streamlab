<template lang="pug">
section#popular.container 
	.heading.d-flex.align-items-center
		.title {{heading.name}}
		.explore.ms-auto #[NuxtLink(:to='heading.url') Explore More]
	.popular-container
		.popular(v-for='(item, index) in data' :key='index')
			.poster.d-flex.justify-content-center.align-items-center(v-if='!item.poster_path')
				NuxtLink(:to='!tv ? `/movie/${item?.id}` : `/tv/${item?.id}`')
					BrokenIcon
				.play(v-if="$device.isDesktop")
					Icon(name="material-symbols-light:play-circle-outline-rounded" size="4.5em")
			.poster(v-else)
				NuxtLink(:to='!tv ? `/movie/${item?.id}` : `/tv/${item?.id}`')
					img(:src='`${config.public.imgBaseUrl}${item.poster_path}`')
				.play(v-if="$device.isDesktop")
					Icon(name="material-symbols-light:play-circle-outline-rounded" size="4.5em")
			.details
				NuxtLink(:to='!tv ? `/movie/${item?.id}` : `/tv/${item?.id}`')
					.movie-title(v-if="!tv") {{ item.title }}
					.movie-title(v-else) {{ item.name }}
				.other.d-flex(v-if="show")
					.year {{item.release_date.split('-')[0]}}
					.time.d-flex.align-items.center #[Icon(name="material-symbols:star-rate-rounded" size="1.2em")] {{`${Math.round(item.vote_average / 10 * 100)}%`}}
				.other.d-flex(v-else)
					.year(v-if="!tv") {{new Date(item.release_date).toUTCString().slice(5, 16) }}
					.time.d-flex.align-items.center #[Icon(name="material-symbols:star-rate-rounded" size="1.2em")] {{ item.vote_average }}
</template>

<script setup>
defineProps(['heading', 'show', 'data', 'tv'])

const config = useRuntimeConfig()
</script>