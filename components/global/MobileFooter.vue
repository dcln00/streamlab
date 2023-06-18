<template lang="pug">
footer.container-fluid.d-flex.align-items-center.mobile
	div
		NuxtLink(to='/')
			.title.pb-2 {{ meta.title }}
		.copyright.pb-4 Designed and Developed by Nii Aryeh x Ayvas dev.
		.powered Powered by #[a(href='https://www.themoviedb.org/documentation/api') Tmdb API]
</template>

<script setup>
import {siteSettings} from '~/store/index'
import { storeToRefs } from 'pinia'

const settings = siteSettings()
const { meta } = storeToRefs(settings)
</script>