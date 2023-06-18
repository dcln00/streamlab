<template lang="pug">
header.container-fluid
	.wrap.container.d-flex.justify-content-center.align-items-center
		Nuxt-link(to='/')
			.logo.pe-5 {{meta.title}}
		Hamburger(@click='showNav = !showNav')
		AppNav(:show='showNav')
		.search.ms-auto
			NuxtLink(to='/search')
				AppSearch(v-model.lazy="term")
</template>

<script setup>
import {siteSettings, searchQuery} from '~/store/index'
const settings = siteSettings()
const search = searchQuery()
const { term } = storeToRefs(search)
const { meta } = storeToRefs(settings)

let showNav = ref(false)
</script>