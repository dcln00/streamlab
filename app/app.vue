// app/app.vue
<script setup lang="ts">
const meta = useMeta()
const config = useRuntimeConfig()
const route = useRoute()
const siteUrl = String(config.public.siteUrl || '').replace(/\/$/, '')
const defaultImage = `${siteUrl}/og-default.png`
const canonicalUrl = computed(() => `${siteUrl}${route.path}`)

useHead({
	link: [
		{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		{ key: 'canonical', rel: 'canonical', href: () => canonicalUrl.value },
	],
	htmlAttrs: {
		lang: 'en',
	},
})

useSeoMeta({
	titleTemplate: (t) => (t ? `${t} | ${meta.value.siteName}` : meta.value.siteName),
	description: () => meta.value.siteDescription,
	ogType: 'website',
	ogUrl: () => canonicalUrl.value,
	ogImage: defaultImage,
	ogSiteName: () => meta.value.siteName,
	twitterCard: 'summary_large_image',
	robots: 'index, follow',
})
</script>

<template lang="pug">
div(class="body-outlet flex flex-col min-h-screen")
	app-header
	main(class="grow pb-20 md:pb-0")
		NuxtPage
	app-footer
	mobile-nav
List
</template>