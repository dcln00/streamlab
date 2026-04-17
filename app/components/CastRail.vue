// app/components/CastRail.vue
<script setup lang="ts">
import type { CastMember } from '~/types/tmdb'

const props = defineProps<{
	title?: string
	cast: CastMember[]
	loading?: boolean
	limit?: number
}>()

const tmdb = useTmdb()
const railRef = ref<HTMLElement | null>(null)

const visibleCast = computed(() => {
	const max = props.limit ?? 20
	return [...props.cast]
		.sort((a, b) => a.order - b.order)
		.slice(0, max)
})

const scrollBy = (direction: 1 | -1): void => {
	const el = railRef.value
	if (!el) return
	const amount = el.clientWidth * 0.8 * direction
	el.scrollBy({ left: amount, behavior: 'smooth' })
}

const googleSearchUrl = (name: string): string =>
	`https://www.google.com/search?q=${encodeURIComponent(name)}`
</script>

<template lang="pug">
section(class="py-8")
	div(class="container flex items-center justify-between mb-4")
		h2(class="font-oswald text-2xl md:text-3xl uppercase tracking-tight font-medium text-white") {{ title ?? 'Cast' }}
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
				:key="`cast-skeleton-${n}`"
				class="shrink-0 w-40 md:w-48 aspect-2/3 rounded-lg bg-cinema-surface animate-pulse"
			)
		template(v-else)
			div(
				v-for="member in visibleCast"
				:key="member.id"
				class="snap-start"
			)
				a(
					:href="googleSearchUrl(member.name)"
					target="_blank"
					rel="noopener noreferrer"
					:aria-label="`Search Google for ${member.name}`"
					class="group shrink-0 w-40 md:w-48 cursor-pointer block"
				)
					div(class="relative aspect-2/3 rounded-lg overflow-hidden bg-cinema-elevated")
						img(
							v-if="tmdb.posterUrl(member.profile_path)"
							:src="tmdb.posterUrl(member.profile_path)"
							:alt="member.name"
							loading="lazy"
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
						)
						div(
							v-else
							class="absolute inset-0 flex items-center justify-center text-cinema-muted text-sm px-2 text-center"
						) {{ member.name }}
					div(class="mt-3")
						h3(class="text-sm font-semibold line-clamp-1 text-white group-hover:text-brand-accent transition-colors") {{ member.name }}
						p(class="text-xs text-cinema-muted mt-1 line-clamp-1") {{ member.character }}
</template>
