<template lang="pug">
div
	section#warning.container-fluid.d-flex.align-items-center.justify-content-center(v-if='error')
		Error
	section#warning.container-fluid.d-flex.align-items-center.justify-content-center(v-else-if='pending')
		Pending
	div(v-else)
		Head
			Title {{`${data?.ids.title} - ${meta.title}`}}
		section#jumbotron-movie.container-fluid.px-0
			.back-btn(v-if='$device.isMobileOrTablet')
				Icon(name='ic:round-keyboard-arrow-left' @click='router.back()' :size="'1.5rem'")
			.jumbo-image
				img(:src='`${config.public.imgBackdropBaseUrl}${data?.ids.backdrop_path}`' alt='movie backdrop photo' v-if='data?.ids.backdrop_path')
			.wrap.container
				ClientOnly
					FsLightbox(
					:toggler="toggler"
					:slide='slide'
					:sources="videoArr()"
					)
				.row.align-items-center
					.col-sm-4.movie-img.gs-5(v-if='data?.ids.poster_path && $device.isDesktop')
						img(:src='`${config.public.imgBaseUrl}${data?.ids.poster_path}`')
					.col-sm-8.movie-details.gx-5
						.score.d-flex.align-items-center
							.score-tag.me-3 TMDb
							.score-number {{ data?.ids.vote_average }}
						.title {{ data?.ids.title }}
						.details.d-flex.align-items-center
							.ratings.d-flex.justify-content-center.align-items-center.me-3 {{data?.ids.adult ? 'R' : 'PG'}}
							.year.me-3 {{new Date(data?.ids.release_date).toUTCString().slice(5, 16) }}
							.time.me-3 {{ `${Math.floor(data?.ids.runtime / 60)} hr ${data?.ids.runtime % 60} mins` }}
							.genre(v-for='(item, index) in data?.ids.genres'  :key='index' v-if="$device.isDesktop") {{ item.name }}
						.genre(v-for='(item, index) in data?.ids.genres.slice(0, 3)'  :key='index' v-if="$device.isMobileOrTablet") {{ item.name }}
						.description {{ data?.ids.overview }}
						.button(@click="openCustom(1)") #[i(class="fa fa-play" aria-hidden="true")] Watch Trailer

		
		section#credits.container
			nav#pills-tab.nav.nav-pills(role='tablist')
				a.nav-link.bg-transparent.px-0(v-for='(item, index) in options' :key='index' :id='`#${item.name}-tab`' :class='item.active ? "active" : null, item.style' data-bs-toggle='pill' :href='`#${item.name}`' role='tab' :aria-controls='item.name' aria-selected='true') {{item.title}}
				

			#pills-tabContent.tab-content
				#cast.tab-pane.fade.show.active(role='tabpanel' aria-labelledby='cast-tab')
					.controls(v-show="data?.credits.cast.length > 5" v-if="$device.isDesktop")
							.left(@click="leftScroll") #[i(class="fa fa-angle-left" aria-hidden="true")]
							.right(@click="rightScroll") #[i(class="fa fa-angle-right" aria-hidden="true")]
					.credits-container 
						.credits(v-for='(item, index) in data?.credits.cast.slice(0, 10)' :key='index')
							.actor.d-flex.justify-content-center.align-items-center(v-if='!item.profile_path')
								NuxtLink(:to='`https://www.google.com/search?q=${item.name}`' target="_blank")
									BrokenIcon
							.actor(v-else)
								NuxtLink(:to='`https://www.google.com/search?q=${item.name}`' target="_blank")
									img(:src='`${config.public.imgBaseUrl}${item.profile_path}`')
							.details
								.actor-name
									NuxtLink(:to='`https://www.google.com/search?q=${item.name}`' target="_blank") {{ item.name }}
								.actor-character {{ item.character }}

					
				#backdrops.tab-pane.fade(role='tabpanel' aria-labelledby='backdrops-tab')
					.backdrops-container
						.backdrop(v-for='(item, index) in data?.photos.backdrops.slice(0, 12)' :key='index') 
							img(:src='`${config.public.imgBaseUrl}${item.file_path}`')
							

				#videos.tab-pane.fade(role='tabpanel' aria-labelledby='videos-tab')
					//- .videos-title
						nav#pills-tab.nav.nav-pills(role='tablist')
							a.nav-link.bg-transparent(v-for='(item, index) in videoOptions' :key='index' :id='`#${item}-tab`' :class='item[0] === "a" ? "active" : null ' data-bs-toggle='pill' :href='`#${item}`' role='tab' :aria-controls='item' aria-selected='true') {{ item }}

						#pills-tabContent.tab-content
							.tab-pane.fade.show.active(v-for='(item, index) in videoOptions' :id='item' role='tabpanel' :aria-labelledby='`${item}-tab`')
						
					.videos-container
						.videos(v-if='!data?.videos.results')
							| No videos available
						.videos(v-for='(item, index) in data?.videos.results' :key='index' v-show='item.type === "Trailer" || item.type === "Teaser"' v-else) 
							img(:src='`https://img.youtube.com/vi/${item.key}/hqdefault.jpg`' @click="openCustom(videoArr().indexOf(`https://www.youtube.com/watch?v=${item.key}`) + 1)")
							.play(@click="toggler = !toggler")
								i(class="fa fa-youtube-play" aria-hidden="true")
							//- iframe(width='100%', height='100%', :src="`https://www.youtube.com/embed/${item.key}?controls=0`", title="YouTube video player", frameborder="0", allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", allowfullscreen)

		section#rec.container(v-show='data?.rec.results.length != 0')
			.title More like this
			.controls(v-show="data?.rec.results.length > 5" v-if="$device.isDesktop")
				.left(@click="recLeft") #[i(class="fa fa-angle-left" aria-hidden="true")]
				.right(@click="recRight") #[i(class="fa fa-angle-right" aria-hidden="true")]
			.rec-container 
				.rec(v-for='(item, index) in data?.rec.results.slice(0, 10)' :key='index')
					.poster.d-flex.justify-content-center.align-items-center(v-if='!item.poster_path')
						NuxtLink(:to='`/movie/${item?.id}`')
							BrokenIcon
						.play(v-if="$device.isDesktop")
							i(class="fa fa-play-circle" aria-hidden="true")
					.poster(v-else)
						NuxtLink(:to='`/movie/${item?.id}`')
							img(:src='`${config.public.imgBaseUrl}${item.poster_path}`')
						.play(v-if="$device.isDesktop")
							i(class="fa fa-play-circle" aria-hidden="true")
					.details
						NuxtLink(:to='`/movie/${item?.id}`')
							.movie-title {{ item.title }}
						.other
							.time #[i(class="fa fa-star" aria-hidden="true")] {{ `${Math.round(item.vote_average / 10 * 100)}%` }}

</template>

<script setup>
import FsLightbox from "fslightbox-vue/v3"
const toggler = ref(false)
const slide = ref(1)
const route = useRoute()
const router = useRouter()
const config = useRuntimeConfig()
const movieId = computed(() => route.params.id)
const { data, pending, error } = await useFetch(`/api/movies/${movieId.value}`, {
	lazy: true,
})

import {siteSettings} from '~/store/index'
import { storeToRefs } from 'pinia'
const settings = siteSettings()
const { meta } = storeToRefs(settings)

function videoArr() {
	let youtubeKey = []
	for(let i=0; i < data.value.videos.results.length; i++) {

		if(data.value.videos.results[i].type === "Trailer" || data.value.videos.results[i].type === "Teaser") {
			youtubeKey[i] = `https://www.youtube.com/watch?v=${data.value.videos.results[i].key}`
		}
	}
	return youtubeKey.flat()
}

function openCustom(number) {
	slide.value = number
	toggler.value = !toggler.value
}

const options = [
	{
		name: 'cast',
		title: 'Cast',
		active: true,
		style: 'px-0'
	},
	{
		name: 'backdrops',
		title: 'Backdrops',
		style: 'px-4'
	},
	{
		name: 'videos',
		title: 'Videos',
	},
]

const videoOptions = ['all', 'trailer', 'teaser', 'clip', 'featurette', 'behind the scenes']


function leftScroll() {
        document.querySelector(".credits-container").scrollBy(-400, 0)
      }

function rightScroll() {
        document.querySelector(".credits-container").scrollBy(400, 0)
	}

function recLeft() {
	document.querySelector(".rec-container").scrollBy(-400, 0)
}

function recRight() {
	document.querySelector(".rec-container").scrollBy(400, 0)	
}
</script>