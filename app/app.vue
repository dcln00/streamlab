// app/app.vue
<script setup lang="ts">
const meta = useMeta()
const config = useRuntimeConfig()
const siteUrl = String(config.public.siteUrl || '').replace(/\/$/, '')
const defaultImage = `${siteUrl}/og-default.png`

useHead({
	link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	htmlAttrs: {
		lang: 'en',
	},
})

useSeoMeta({
	titleTemplate: (t) => (t ? `${t} | ${meta.value.siteName}` : meta.value.siteName),
	ogType: 'website',
	ogImage: defaultImage,
	ogSiteName: () => meta.value.siteName,
	twitterCard: 'summary_large_image',
	twitterImage: defaultImage,
})
</script>

<template lang="pug">
div(class="body-outlet flex flex-col min-h-screen")
	app-header
	main(class="grow")
		NuxtPage
	app-footer
List
TrailerModal
</template>
