<template lang="pug">
nav.container-fluid.px-0.d-flex.justify-content-around.align-items-center.mobile
	div(v-for="(item, index) in mobileNav" :key="index")
		NuxtLink(:to='item.path' activeClass='active-link') 
			Icon(:name="item.icon" :size='"1.5em"')
	
</template>

<script setup>
import {siteSettings} from '~/store/index'
import { storeToRefs } from 'pinia'
const settings = siteSettings()
const { mobileNav } = storeToRefs(settings)
</script>