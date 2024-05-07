<script setup>
useHead({
	htmlAttrs: {
		lang: 'en',
	},
	title: `Streamlab - Video Streaming App`,
	meta: [
		{
			name: 'description',
			content: 'Video Streaming App',
		},
	],
	link: [
		{
			rel: 'icon',
			href: '/favicon.svg',
		},
	],
})

useSeoMeta({
	ogTitle: 'Streamlab',
	ogDescription: 'Video Streaming App',
	twitterTitle: 'Streamlab',
	twitterDescription: 'Video Streaming App',
	twitterCard: 'summary',
})
</script>

<template lang="pug">
div
	NuxtLayout
		NuxtLoadingIndicator(:color="'repeating-linear-gradient(to right,#098443 0%,#18be66 100%)'" :throttle="150")
		NuxtPage(:transition="{name: 'page', mode: 'out-in'}")
</template>
