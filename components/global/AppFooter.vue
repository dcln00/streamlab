<template lang='pug'>
footer.container-fluid.px-5.d-flex.align-items-center
	NuxtLink(to='/')
		.title {{ meta.title }}
	.powered.ms-5 Powered by #[a(href='https://www.themoviedb.org/documentation/api') Tmdb API]
	.copyright.ms-auto Designed and Developed by Nii Aryeh x Ayvas dev.
</template>

<script setup>
import {siteSettings} from '~/store/index'
import { storeToRefs } from 'pinia'

const settings = siteSettings()
const { meta } = storeToRefs(settings)
</script>