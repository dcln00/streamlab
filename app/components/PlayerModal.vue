// app/components/PlayerModal.vue
<script setup lang="ts">
const props = defineProps<{
	src: string | null
	title: string
}>()

const emit = defineEmits<{
	close: []
}>()

const isOpen = computed(() => Boolean(props.src))
const isLocked = useScrollLock(import.meta.client ? document.body : null)
const closeButton = ref<HTMLButtonElement | null>(null)
const lastFocused = ref<HTMLElement | null>(null)

// Fullscreen is requested on our own dialog root, which keeps the request
// same-origin with the top-level document so the browser shows its plain
// "Press Esc to exit" hint. The overlay is the target rather than the player box
// because a fullscreen element hides everything outside itself — targeting the
// player box would make the controls below disappear on entering fullscreen.
const dialog = ref<HTMLElement | null>(null)
const { isFullscreen, toggle: toggleFullscreen, exit: exitFullscreen } =
	useFullscreen(dialog)

const close = (): void => {
	if (isFullscreen.value) void exitFullscreen()
	emit('close')
}

watch(isOpen, async (open) => {
	isLocked.value = open
	if (open) {
		lastFocused.value = document.activeElement as HTMLElement | null
		await nextTick()
		closeButton.value?.focus()
		return
	}
	lastFocused.value?.focus()
	lastFocused.value = null
})

onKeyStroke('Escape', () => {
	if (!isOpen.value) return
	// While fullscreen, Escape is the browser's exit gesture. Without this the
	// same keypress would exit fullscreen and tear down the modal at once.
	if (document.fullscreenElement) return
	close()
})

onBeforeUnmount(() => {
	isLocked.value = false
})
</script>

<template lang="pug">
Teleport(to="body")
	Transition(
		enter-active-class="transition-opacity duration-200"
		enter-from-class="opacity-0"
		leave-active-class="transition-opacity duration-200"
		leave-to-class="opacity-0"
	)
		div(
			v-if="isOpen"
			ref="dialog"
			role="dialog"
			aria-modal="true"
			:aria-label="`${title} player`"
			:class="isFullscreen ? '' : 'p-4 pt-16 md:p-8 md:pt-20'"
			class="fixed inset-0 z-60 flex items-center justify-center bg-black/90"
			@click.self="close"
		)
			div(class="absolute top-4 right-4 md:top-8 md:right-8 flex gap-2")
				button(
					type="button"
					:aria-label="isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'"
					class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
					@click="toggleFullscreen"
				)
					svg(viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-5")
						path(
							v-if="isFullscreen"
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"
						)
						path(
							v-else
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
						)
				button(
					ref="closeButton"
					type="button"
					aria-label="Close player"
					class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
					@click="close"
				)
					svg(viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-5")
						path(stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12")
			div(
				:class="isFullscreen ? 'w-full h-full max-w-none rounded-none' : 'w-full max-w-6xl aspect-video rounded-lg'"
				class="relative overflow-hidden bg-black"
			)
				iframe(
					:src="src"
					:title="`${title} player`"
					allow="autoplay *; encrypted-media *"
					class="absolute inset-0 w-full h-full"
				)
</template>
