<template lang="pug">
Transition(name='nav')
	nav.d-flex.ms-5(v-if="show") 
		div(v-for="(item, index) in nav" :key="index") 
			NuxtLink(:to='item.path' activeClass='active-link') {{ item.name }}
</template>

<script setup>
import {siteSettings} from '~/store/index'
import { storeToRefs } from 'pinia'
const settings = siteSettings()
const { nav } = storeToRefs(settings)

defineProps({
  show: Boolean
})
</script>