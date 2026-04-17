// app/components/TvRail.vue
<script setup lang="ts">
import type { TvShow } from '~/types/tmdb'

defineProps<{
	title: string
	shows: TvShow[]
	loading?: boolean
}>()

const railRef = ref<HTMLElement | null>(null)

const scrollBy = (direction: 1 | -1): void => {
	const el = railRef.value
	if (!el) return
	const amount = el.clientWidth * 0.8 * direction
	el.scrollBy({ left: amount, behavior: 'smooth' })
}
</script>

<template lang="pug">
section(class="py-8")
	div(class="container flex items-center justify-between mb-4")
		h2(class="font-oswald text-2xl md:text-3xl uppercase tracking-tight font-medium text-white") {{ title }}
		div(class="hidden md:flex gap-2")
			button(
				type="button"
				aria-label="Scroll left"
				class="w-9 h-9 rounded-full bg-cinema-surface hover:bg-cinema-elevated transition-colors flex items-center justify-center text-white"
				@click="scrollBy(-1)"
			) ‹
			button(
				type="button"
				aria-label="Scroll right"
				class="w-9 h-9 rounded-full bg-cinema-surface hover:bg-cinema-elevated transition-colors flex items-center justify-center text-white"
				@click="scrollBy(1)"
			) ›
	div(
		ref="railRef"
		class="container hide-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4"
	)
		template(v-if="loading")
			div(
				v-for="n in 6"
				:key="`skeleton-${n}`"
				class="shrink-0 w-40 md:w-48 aspect-2/3 rounded-lg bg-cinema-surface animate-pulse"
			)
		template(v-else)
			div(
				v-for="show in shows"
				:key="show.id"
				class="snap-start"
			)
				TvCard(:show="show")
</template>
