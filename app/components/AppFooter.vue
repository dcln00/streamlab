// app/components/AppFooter.vue
<script setup lang="ts">
const meta = useMeta()
const year = new Date().getFullYear()
</script>

<template lang="pug">
footer(class="bg-cinema-surface py-6")
	div(class="container flex items-center text-xs text-cinema-muted")
		svg-logo(class="h-5 w-auto")
		div(class="ms-auto flex items-center gap-6")
			span © {{ year }} {{ meta.siteName }}. All rights reserved.
			span Data provided by
				a(href="https://www.themoviedb.org/" target="_blank" rel="noopener" class="ml-1 text-white hover:text-brand-accent transition-colors") TMDB
</template>
