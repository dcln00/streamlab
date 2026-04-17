// app/app.vue
<script setup lang="ts">
const meta = useMeta()
const list = useList()

useHead({
  title: () => `${meta.value.siteName} - ${meta.value.ogSiteName}`,
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
})

useSeoMeta({
  title: () => `${meta.value.siteName} | ${meta.value.ogSiteName}`,
  ogTitle: () => `${meta.value.siteName} | ${meta.value.ogSiteName}`,
  description: () => meta.value.siteDescription,
  ogDescription: () => meta.value.siteDescription,
  ogType: 'website',
  ogImage: '',
  ogSiteName: () => `${meta.value.siteName} | ${meta.value.ogSiteName}`,
  ogUrl: () => meta.value.siteUrl,
  twitterCard: 'summary',
  twitterTitle: () => `${meta.value.siteName} | ${meta.value.ogSiteName}`,
  twitterImage: '',
  twitterDescription: () => meta.value.siteDescription
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