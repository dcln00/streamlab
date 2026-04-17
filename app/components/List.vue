// app/components/List.vue
<script setup lang="ts">
import type { ListItem } from '~/composables/useList'

const list = useList()
const tmdb = useTmdb()

const itemLink = (item: ListItem): string =>
	item.type === 'tv' ? `/tv/${item.id}` : `/movie/${item.id}`

const itemBadge = (item: ListItem): string =>
	item.type === 'tv' ? 'TV' : 'Movie'
</script>

<template lang="pug">
aside(
	:class="list.isOpen.value ? 'translate-x-0' : 'translate-x-full'"
	class="fixed top-0 right-0 z-50 h-screen w-full sm:w-80 bg-cinema-surface border-l border-white/10 transition-transform duration-300 flex flex-col"
)
	div(class="flex items-center justify-between px-5 py-4 border-b border-white/10")
		h2(class="font-oswald text-xl uppercase tracking-tight text-white") WatchList
		button(
			type="button"
			aria-label="Close list"
			class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
			@click="list.close()"
		) ×
	div(class="flex-1 overflow-y-auto")
		template(v-if="list.items.value.length")
			ul(class="divide-y divide-white/5")
				li(
					v-for="item in list.items.value"
					:key="`${item.type}-${item.id}`"
					class="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors"
				)
					NuxtLink(
						:to="itemLink(item)"
						class="flex items-center gap-3 flex-1 min-w-0"
						@click="list.close()"
					)
						div(class="shrink-0 w-12 aspect-2/3 rounded overflow-hidden bg-cinema-elevated")
							img(
								v-if="tmdb.posterUrl(item.posterPath)"
								:src="tmdb.posterUrl(item.posterPath)"
								:alt="item.title"
								loading="lazy"
								class="w-full h-full object-cover"
							)
						div(class="min-w-0")
							p(class="text-sm font-medium text-white line-clamp-1") {{ item.title }}
							p(class="text-xs text-cinema-muted mt-0.5") {{ itemBadge(item) }}
					button(
						type="button"
						:aria-label="`Remove ${item.title}`"
						class="shrink-0 w-7 h-7 rounded-full bg-white/5 hover:bg-brand-accent hover:text-cinema-bg text-white/70 flex items-center justify-center transition-colors"
						@click="list.remove(item.id, item.type)"
					) ×
		template(v-else)
			div(class="px-5 py-10 text-center")
				p(class="text-cinema-muted text-sm") Your list is empty.
				p(class="text-cinema-muted text-xs mt-2") Add movies and TV shows to watch later.
</template>
