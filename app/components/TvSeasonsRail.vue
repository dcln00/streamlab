// app/components/TvSeasonsRail.vue
<script setup lang="ts">
import type { TvEpisode, TvSeasonSummary } from '~/types/tmdb'

defineProps<{
	seasons: TvSeasonSummary[]
	episodes: TvEpisode[]
	loading?: boolean
}>()

const emit = defineEmits<{
	select: [episode: TvEpisode]
}>()

const season = defineModel<number>({ required: true })

const tmdb = useTmdb()
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
		h2(class="font-oswald text-2xl md:text-3xl uppercase tracking-tight font-medium text-white") Seasons & Episodes
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
	div(class="container mb-6 flex items-center gap-3")
		label(
			for="season-select"
			class="text-xs uppercase tracking-widest text-cinema-muted"
		) Season
		div(class="relative")
			select#season-select(
				v-model.number="season"
				class="appearance-none rounded-lg border border-white/15 bg-cinema-surface py-2.5 ps-4 pe-10 text-sm text-white transition-colors hover:border-white/30 focus:border-brand-accent focus:outline-none"
			)
				option(
					v-for="s in seasons"
					:key="s.id"
					:value="s.season_number"
				) {{ s.name }} ({{ s.episode_count }} eps)
			svg(
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				class="pointer-events-none absolute end-3 top-1/2 size-4 -translate-y-1/2 text-cinema-muted"
			)
				path(stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5")
	div(
		ref="railRef"
		class="container hide-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 pb-4"
	)
		template(v-if="loading")
			div(
				v-for="n in 4"
				:key="`episode-skeleton-${n}`"
				class="shrink-0 w-72 md:w-80"
			)
				div(class="aspect-video rounded-lg bg-cinema-surface animate-pulse")
		template(v-else)
			button(
				v-for="episode in episodes"
				:key="episode.id"
				type="button"
				:aria-label="`Play episode ${episode.episode_number}: ${episode.name}`"
				class="group snap-start shrink-0 w-72 md:w-80 text-left"
				@click="emit('select', episode)"
			)
				div(class="relative aspect-video rounded-lg overflow-hidden bg-cinema-elevated")
					img(
						v-if="tmdb.posterUrl(episode.still_path)"
						:src="tmdb.posterUrl(episode.still_path)"
						:alt="episode.name"
						loading="lazy"
						class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
					)
					div(
						v-else
						class="absolute inset-0 flex items-center justify-center text-cinema-muted text-sm"
					) No image
					span(class="absolute top-2 left-2 flex h-8 w-8 items-center justify-center rounded-md bg-black/70 text-sm font-semibold text-white") {{ episode.episode_number }}
				h3(class="mt-3 font-semibold text-white line-clamp-1 group-hover:text-brand-accent transition-colors") {{ episode.name }}
				p(v-if="episode.air_date" class="mt-1 text-sm text-cinema-muted") {{ episode.air_date }}
				p(v-if="episode.overview" class="mt-2 text-sm text-white/70 line-clamp-2") {{ episode.overview }}
</template>
