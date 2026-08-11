// app/components/TrailerBackdrop.vue
<script setup lang="ts">
const props = defineProps<{
	videoKey: string | null
	backdrop: string
	title: string
	paused?: boolean
}>()

const PLAYER_STATE_PLAYING = 1

const src = computed(() =>
	props.videoKey
		? `https://www.youtube.com/embed/${props.videoKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${props.videoKey}&playsinline=1&rel=0&enablejsapi=1&iv_load_policy=3`
		: ''
)

const frame = ref<HTMLIFrameElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(true)

const postToPlayer = (func: string, args: unknown[] = []): void => {
	frame.value?.contentWindow?.postMessage(
		JSON.stringify({ event: 'command', func, args }),
		'*'
	)
}

// YouTube force-enables captions on muted autoplay; there is no URL param to
// prevent it, so the captions module has to be unloaded through the player API.
const hideCaptions = (): void => {
	postToPlayer('unloadModule', ['captions'])
	postToPlayer('unloadModule', ['cc'])
}

const onFrameLoad = (): void => {
	frame.value?.contentWindow?.postMessage(
		JSON.stringify({ event: 'listening', id: 'trailer-backdrop', channel: 'widget' }),
		'*'
	)
	hideCaptions()
}

const onPlayerMessage = (event: MessageEvent): void => {
	if (event.source !== frame.value?.contentWindow) return
	if (typeof event.data !== 'string') return
	let payload: { info?: { playerState?: number } }
	try {
		payload = JSON.parse(event.data)
	} catch {
		return
	}
	const state = payload.info?.playerState
	if (state === undefined) return
	const playing = state === PLAYER_STATE_PLAYING
	// pauseVideo is async, so YouTube can still report "playing" just after the
	// trailer is pre-empted by the stream player. Ignore those late reports so
	// the backdrop cover stays up, but keep handling non-playing states.
	if (playing && props.paused) return
	if (playing && !isPlaying.value) hideCaptions()
	isPlaying.value = playing
}

const togglePlay = (): void => {
	if (isPlaying.value) {
		postToPlayer('pauseVideo')
		isPlaying.value = false
		return
	}
	// Don't flip the state optimistically: the backdrop cover stays up until
	// the player actually reports playback, hiding YouTube's buffering UI.
	postToPlayer('playVideo')
}

const toggleMute = (): void => {
	postToPlayer(isMuted.value ? 'unMute' : 'mute')
	isMuted.value = !isMuted.value
}

// The stream player takes over the screen, so the trailer has to stop —
// otherwise its audio keeps running underneath. Playback is only restored on
// resume if the trailer was actually playing when it got pre-empted.
const shouldResume = ref(false)

watch(
	() => props.paused,
	(paused) => {
		if (paused) {
			shouldResume.value = isPlaying.value
			if (isPlaying.value) postToPlayer('pauseVideo')
			isPlaying.value = false
			return
		}
		if (shouldResume.value) postToPlayer('playVideo')
		shouldResume.value = false
	}
)

onMounted(() => window.addEventListener('message', onPlayerMessage))
onBeforeUnmount(() => window.removeEventListener('message', onPlayerMessage))
</script>

<template lang="pug">
div(class="absolute inset-0")
	iframe(
		v-if="src"
		ref="frame"
		:src="src"
		:title="`${title} trailer`"
		allow="autoplay; encrypted-media"
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full pointer-events-none"
		@load="onFrameLoad"
	)
	//- Covers the iframe whenever the trailer isn't playing, so YouTube's
	//- paused-state overlay (big play / prev / next buttons) never shows.
	NuxtImg(
		v-if="backdrop && (!src || !isPlaying)"
		:src="backdrop"
		:alt="title"
		class="absolute inset-0 w-full h-full object-cover"
	)
	div(class="absolute inset-0 bg-linear-to-t from-cinema-bg via-cinema-bg/60 to-transparent")
	div(class="absolute inset-0 bg-linear-to-r from-cinema-bg/90 via-cinema-bg/40 to-transparent")
	div(v-if="src" class="absolute bottom-6 right-4 md:right-8 z-10 flex gap-3")
		button(
			type="button"
			:aria-label="isPlaying ? 'Pause trailer' : 'Play trailer'"
			class="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
			@click="togglePlay"
		)
			svg(viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-5")
				path(
					v-if="isPlaying"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M15.75 5.25v13.5m-7.5-13.5v13.5"
				)
				path(
					v-else
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
				)
		button(
			type="button"
			:aria-label="isMuted ? 'Unmute trailer' : 'Mute trailer'"
			class="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-colors"
			@click="toggleMute"
		)
			svg(viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-5")
				path(
					v-if="isMuted"
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
				)
				path(
					v-else
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
				)
</template>
