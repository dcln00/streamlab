// app/error.vue
<script setup lang="ts">
import type { NuxtError } from '#app'
const meta = useMeta()

defineProps<{
	error: NuxtError
}>()

useHead({
  title: () => `Page Not Found - ${meta.value.siteName}`,
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
})

const tmdb = useTmdb()
const { data: trending } = await tmdb.fetchTrending('week')

const featured = computed(() => trending.value?.results[0] ?? null)
const backdrop = computed(() =>
	featured.value ? tmdb.backdropUrl(featured.value.backdrop_path) : ''
)

const handleHome = () => clearError({ redirect: '/' })
</script>

<template lang="pug">
section(class="relative w-full min-h-screen overflow-hidden bg-cinema-bg/")
	div(v-if="featured" class="wrapper absolute inset-0 -z-10 after:content-[''] after:absolute after:inset-0 after:z-10 after:bg-black/50 overflow-hidden")
		NuxtImg(
			v-if="backdrop"
			:src="backdrop"
			:alt="featured.title"
			class="w-full h-full object-cover grayscale"
		)
	div(class="container relative min-h-screen flex items-center")
		div(class="max-w-2xl")
			p(class="text-xs tracking-widest uppercase text-brand-accent font-medium mb-4") Error {{ error.statusCode }}
			h1(class="font-oswald text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white leading-none")
				| Something
				br
				| Went Wrong
			p(class="mt-6 text-white/80 max-w-xl") {{ error.message || 'The page you are looking for could not be loaded.' }}
			div(class="mt-8 flex flex-wrap gap-3")
				button(
					type="button"
					class="px-6 py-3 rounded-md bg-brand-accent text-cinema-bg font-medium hover:brightness-110 transition-all"
					@click="handleHome"
				) Back to Home
</template>
