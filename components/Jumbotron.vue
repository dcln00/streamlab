<template lang="pug">
section#jumbotron.container-fluid.px-0
	.jumbo-image
		img(:src='`${config.public.imgBackdropBaseUrl}${data?.popularMovies.results[0].backdrop_path}`' alt='featured movie poster')
	.wrap.container 
		.row 
			.col-sm-6.movie-details
				.score.d-flex.align-items-center(v-if="$device.isDesktop") 
					.score-tag.me-3 TMDb
					.score-number {{data?.popularMovies.results[0].vote_average}}
				.title {{data.popularMovies.results[0].title}}
				.details.d-flex.align-items-center
					.ratings.d-flex.justify-content-center.align-items-center.me-3(v-if="$device.isDesktop") {{data?.popularMovies.results[0].adult ? 'PG' : 'G'}}
					.year.me-3(v-if="$device.isDesktop") {{data?.popularMovies.results[0].release_date.split('-')[0]}}
					.time.me-3(v-if="$device.isDesktop") {{ `${Math.floor(single?.ids.runtime / 60)} hr ${single?.ids.runtime % 60} mins` }}
					.genre(v-for='(item, index) in data?.popularMovies.results[0].genre_ids' :key='index')
						div(v-for='n in data?.movieGenres.genres') {{ item === n.id ? n.name : null }}
				.description(v-if="$device.isDesktop") {{data?.popularMovies.results[0].overview}}
				.description(v-else-if="$device.isMobileOrTablet") {{data?.popularMovies.results[0].overview.slice(0, 120) + '...'}}
				NuxtLink(:to='`/movie/${data?.popularMovies.results[0].id}`')
					.button(v-if="$device.isDesktop") Watch now
			.col-sm-6.trailer-details.d-flex.justify-content-center.align-items-center(v-if="$device.isDesktop")
				.playbutton.d-flex.justify-content-center.align-items-center(@click="openCustom(1)")
					.trailer-icon
						svg(xmlns='http://www.w3.org/2000/svg' width='55' height='55' viewbox='0 0 55 55')
								circle(cx='27.5' cy='27.5' r='26.75' fill='none' stroke='#fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5')
								path(fill='none' stroke='#fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M20.97 40.81L40.64 27.5 20.97 14.19v26.62z')
					.trailer-text
						| watch trailer
			.col-sm-6.trailer-details.d-flex.justify-content-center.align-items-center(v-else-if="$device.isMobileOrTablet") 
				NuxtLink(:to='`/movie/${data.popularMovies?.results[0].id}`')
					.trailer-icon
						svg(xmlns='http://www.w3.org/2000/svg' width='55' height='55' viewbox='0 0 55 55')
							circle(cx='27.5' cy='27.5' r='26.75' fill='none' stroke='#fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5')
							path(fill='none' stroke='#fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M20.97 40.81L40.64 27.5 20.97 14.19v26.62z')
	ClientOnly
		FsLightbox(
			:toggler="toggler"
			:slide='slide'
			:sources="videoArr()"
			)
</template>

<script setup>
import FsLightbox from 'fslightbox-vue/v3'
const toggler = ref(false)
const slide = ref(1)
const config = useRuntimeConfig()
const popular = computed(() => `/api/listings`)

const { data } = await useFetch(popular)

const id = data.value?.popularMovies.results[0].id

const { data: single } = await useFetch(`/api/movies/${id}`)

function videoArr() {
	let youtubeKey = []

	for(let i=0; i < single.value.videos.results.length; i++) {

		if(single.value.videos.results[i].type === "Trailer" || single.value.videos.results[i].type === "Teaser") {
			youtubeKey[i] = `https://www.youtube.com/watch?v=${single.value.videos.results[i].key}`
		}
	}
	return youtubeKey.flat().slice(0,1)
}

function openCustom(number) {
	slide.value = number
	toggler.value = !toggler.value
}
</script>