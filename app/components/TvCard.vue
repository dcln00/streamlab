// app/components/TvCard.vue
<script setup lang="ts">
import type { TvShow } from '~/types/tmdb'

const props = defineProps<{
	show: TvShow
}>()

const tmdb = useTmdb()

const poster = computed(() => tmdb.posterUrl(props.show.poster_path))
const year = computed(() => props.show.first_air_date?.slice(0, 4) ?? '')
const rating = computed(() => props.show.vote_average.toFixed(1))
</script>

<template lang="pug">
NuxtLink(
	:to="`/tv/${show.id}`"
	class="group shrink-0 w-40 md:w-48 cursor-pointer block"
)
	div(class="relative aspect-[2/3] rounded-lg overflow-hidden bg-cinema-elevated")
		img(
			v-if="poster"
			:src="poster"
			:alt="show.name"
			loading="lazy"
			class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
		)
		div(
			v-else
			class="absolute inset-0 flex items-center justify-center text-cinema-muted text-sm px-2 text-center"
		) {{ show.name }}
		div(class="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-xs font-semibold")
			span(class="text-brand-tag") ★
			span {{ rating }}
	div(class="mt-3")
		h3(class="text-sm font-semibold line-clamp-1 text-white group-hover:text-brand-accent transition-colors") {{ show.name }}
		p(class="text-xs text-cinema-muted mt-1") {{ year }}
</template>
