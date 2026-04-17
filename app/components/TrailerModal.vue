// app/components/TrailerModal.vue
<script setup lang="ts">
const trailer = useTrailer()

const embedUrl = computed(() =>
	trailer.state.value.videoKey
		? `https://www.youtube.com/embed/${trailer.state.value.videoKey}?autoplay=1&rel=0`
		: ''
)

const onKeydown = (e: KeyboardEvent): void => {
	if (e.key === 'Escape') trailer.close()
}

watch(
	() => trailer.isOpen.value,
	(open) => {
		if (typeof document === 'undefined') return
		if (open) {
			document.body.style.overflow = 'hidden'
			window.addEventListener('keydown', onKeydown)
		} else {
			document.body.style.overflow = ''
			window.removeEventListener('keydown', onKeydown)
		}
	}
)

onBeforeUnmount(() => {
	if (typeof document !== 'undefined') {
		document.body.style.overflow = ''
		window.removeEventListener('keydown', onKeydown)
	}
})
</script>

<template lang="pug">
Teleport(to="body")
	Transition(name="trailer")
		div(
			v-if="trailer.isOpen.value"
			class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
			@click.self="trailer.close()"
		)
			div(class="relative w-full max-w-5xl")
				button(
					type="button"
					aria-label="Close trailer"
					class="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
					@click="trailer.close()"
				) ×
				div(class="relative aspect-video rounded-lg overflow-hidden bg-cinema-elevated shadow-2xl")
					template(v-if="trailer.state.value.loading")
						div(class="absolute inset-0 flex items-center justify-center")
							div(class="w-10 h-10 border-2 border-white/20 border-t-brand-accent rounded-full animate-spin")
					template(v-else-if="trailer.state.value.error")
						div(class="absolute inset-0 flex items-center justify-center text-center px-6")
							p(class="text-cinema-muted") {{ trailer.state.value.error }}
					template(v-else-if="embedUrl")
						iframe(
							:src="embedUrl"
							:title="trailer.state.value.title || 'Trailer'"
							class="w-full h-full"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
						)
</template>

<style scoped>
.trailer-enter-active,
.trailer-leave-active {
	transition: opacity 200ms ease-out;
}

.trailer-enter-from,
.trailer-leave-to {
	opacity: 0;
}

.trailer-enter-to,
.trailer-leave-from {
	opacity: 1;
}
</style>
