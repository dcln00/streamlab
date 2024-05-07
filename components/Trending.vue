<template lang="pug">
section#trending(:class="$device.isDesktop ? 'container-fluid px-5' : 'container'")
	.heading.d-flex.align-items-center(:class="$device.isDesktop ? 'container' : ''")
		.title Trending
		.explore.ms-auto #[NuxtLink(:to='`/movie/category/trending`') Explore More]
	.trending-container
		Swiper(
			:modules="[SwiperAutoplay, SwiperPagination]"
			:slides-per-view="$device.isDesktop ? 3 : 1"
			:space-between="25"
			:pagination="{enabled: true}"
			:autoplay="{delay: 3000, disableOnInteraction: true}"
		)
			SwiperSlide(v-for='(item, index) in data?.trendingMovies.results.slice(0, 5)' :key='index')
				.trending
					.poster
						NuxtLink(:to='`/movie/${item?.id}`')
							img(:src='`${config.public.imgBaseUrl}${item.poster_path}`')
						.play
							Icon(name="material-symbols-light:play-circle-outline-rounded" size="4.5em")
						.details
							.movie-title {{ item.title }}
</template>

<script setup>
defineProps(['data'])
const config = useRuntimeConfig()
</script>

<style lang="scss">
.swiper {
	overflow-y: visible;
}

.swiper-pagination-horizontal {
	bottom: -25px !important;
	transform: scale(0.6, 0.6);

	.swiper-pagination-bullet-active {
		background-color: #fff !important;
	}

	.swiper-pagination-bullet {
		background-color: #fff !important;
		width: 50px;
		border-radius: 0;
		height: 3px;

	}
}

</style>