// app/pages/tv/category/[slug].vue
<script setup lang="ts">
const meta = useMeta()
const tmdb = useTmdb()
const route = useRoute()
const router = useRouter()

const slug = computed(() => String(route.params.slug ?? ''))
const category = computed(() => tmdb.getTvCategory(slug.value))

if (!category.value) {
	throw createError({
		statusCode: 404,
		statusMessage: 'Category not found',
		fatal: true,
	})
}

const page = computed(() => {
	const n = Number(route.query.page ?? 1)
	return Number.isFinite(n) && n > 0 ? n : 1
})

const { data, status } = await tmdb.fetchTvCategory(slug, page)

useHead({
	title: () => `${meta.value.siteName} - ${category.value?.title ?? 'TV Shows'}`,
})

const totalPages = computed(() => Math.min(data.value?.total_pages ?? 1, 500))
const loading = computed(() => status.value === 'pending')

const goToPage = (next: number): void => {
	if (next < 1 || next > totalPages.value) return
	router.push({ query: { ...route.query, page: next } })
}

const heroBackdrop = ref<string>('')

onMounted(() => {
	const pool = (data.value?.results ?? [])
		.slice(0, 5)
		.filter((s) => s.backdrop_path)
	const pick = pool[Math.floor(Math.random() * pool.length)]
	if (!pick) return
	heroBackdrop.value = tmdb.backdropUrl(pick.backdrop_path)
})
</script>

<template lang="pug">
div(class="pb-16")
	section(class="relative w-full h-[50vh] overflow-hidden")
		NuxtImg(
			v-if="heroBackdrop"
			:src="heroBackdrop"
			:alt="category?.title"
			class="absolute inset-0 w-full h-full object-cover"
		)
		div(class="absolute inset-0 bg-linear-to-t from-cinema-bg via-cinema-bg/60 to-cinema-bg/40")
		div(class="relative h-full flex items-center justify-center")
			h1(class="font-oswald text-4xl lg:text-5xl uppercase tracking-tight font-bold text-white text-center px-4") {{ category?.title }}
	div(class="container mt-10")
		div(
			v-if="loading"
			class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
		)
			div(
				v-for="n in 20"
				:key="`skeleton-${n}`"
				class="aspect-2/3 rounded-lg bg-cinema-surface animate-pulse"
			)
		div(
			v-else
			class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
		)
			TvCard(
				v-for="show in data?.results ?? []"
				:key="show.id"
				:show="show"
			)
		div(
			v-if="totalPages > 1"
			class="mt-10 flex items-center justify-center gap-4"
		)
			button(
				type="button"
				class="px-4 py-2 rounded-md bg-cinema-surface hover:bg-cinema-elevated text-white text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
				:disabled="page <= 1"
				@click="goToPage(page - 1)"
			) Previous
			span(class="text-sm text-cinema-muted") Page {{ page }} of {{ totalPages }}
			button(
				type="button"
				class="px-4 py-2 rounded-md bg-cinema-surface hover:bg-cinema-elevated text-white text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
				:disabled="page >= totalPages"
				@click="goToPage(page + 1)"
			) Next
</template>
