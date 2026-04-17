// app/pages/search.vue
<script setup lang="ts">
import type { SearchMultiResult } from '~/types/tmdb'

const meta = useMeta()
const tmdb = useTmdb()
const route = useRoute()
const router = useRouter()

useHead({
	title: () => `${meta.value.siteName} - Search`,
})

const initialQuery = (() => {
	const q = route.query.q
	return typeof q === 'string' ? q : ''
})()

const input = ref(initialQuery)
const query = ref(initialQuery)
const page = ref(1)

const { data, status } = await tmdb.searchMulti(query, page)

let syncTimer: ReturnType<typeof setTimeout> | null = null

watch(input, (value) => {
	if (syncTimer) clearTimeout(syncTimer)
	syncTimer = setTimeout(() => {
		query.value = value
		page.value = 1
		router.replace({ query: value ? { q: value } : {} })
	}, 300)
})

const results = computed<SearchMultiResult[]>(() =>
	(data.value?.results ?? []).filter(
		(r) => r.media_type === 'movie' || r.media_type === 'tv'
	)
)

const totalResults = computed(() => data.value?.total_results ?? 0)
const loading = computed(() => status.value === 'pending')

const resultLink = (r: SearchMultiResult): string =>
	r.media_type === 'tv' ? `/tv/${r.id}` : `/movie/${r.id}`

const resultTitle = (r: SearchMultiResult): string =>
	r.title || r.name || 'Untitled'

const resultYear = (r: SearchMultiResult): string => {
	const date = r.release_date || r.first_air_date || ''
	return date.slice(0, 4)
}

const resultPoster = (r: SearchMultiResult): string =>
	tmdb.posterUrl(r.poster_path)

const resultBadge = (r: SearchMultiResult): string =>
	r.media_type === 'tv' ? 'TV' : 'Movie'
</script>

<template lang="pug">
div(class="pt-28 pb-20 min-h-screen")
	div(class="container")
		h1(class="font-oswald text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white") Search
		p(class="mt-2 text-cinema-muted") Find movies and TV shows
		div(class="mt-8 relative max-w-2xl")
			input(
				v-model="input"
				type="search"
				placeholder="Search for a movie or TV show..."
				class="w-full px-5 py-4 rounded-lg bg-cinema-surface text-white placeholder:text-cinema-muted border border-white/10 focus:border-brand-accent focus:outline-none transition-colors"
				autofocus
			)
		div(class="mt-8")
			template(v-if="!query.trim()")
				p(class="text-cinema-muted") Start typing to search.
			template(v-else-if="loading")
				div(class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4")
					div(
						v-for="n in 10"
						:key="`s-${n}`"
						class="aspect-[2/3] rounded-lg bg-cinema-surface animate-pulse"
					)
			template(v-else-if="results.length")
				p(class="text-cinema-muted mb-4") {{ totalResults }} result{{ totalResults === 1 ? '' : 's' }}
				div(class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4")
					NuxtLink(
						v-for="r in results"
						:key="`${r.media_type}-${r.id}`"
						:to="resultLink(r)"
						class="group block"
					)
						div(class="relative aspect-[2/3] rounded-lg overflow-hidden bg-cinema-elevated")
							img(
								v-if="resultPoster(r)"
								:src="resultPoster(r)"
								:alt="resultTitle(r)"
								loading="lazy"
								class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
							)
							div(
								v-else
								class="absolute inset-0 flex items-center justify-center text-cinema-muted text-sm px-2 text-center"
							) {{ resultTitle(r) }}
							div(class="absolute top-2 left-2 px-2 py-1 rounded-md bg-black/70 backdrop-blur-sm text-xs font-semibold text-white") {{ resultBadge(r) }}
						div(class="mt-3")
							h3(class="text-sm font-semibold line-clamp-1 text-white group-hover:text-brand-accent transition-colors") {{ resultTitle(r) }}
							p(class="text-xs text-cinema-muted mt-1") {{ resultYear(r) }}
			template(v-else)
				p(class="text-cinema-muted") No results for "{{ query }}".
</template>
