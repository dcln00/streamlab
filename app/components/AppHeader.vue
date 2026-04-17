// app/components/AppHeader.vue
<script setup lang="ts">
const meta = useMeta()
const list = useList()

const navLinks = [
	{ label: 'Home', to: '/' },
	{ label: 'Movies', to: '/movie' },
	{ label: 'TV Shows', to: '/tv' },
	{ label: 'Search', to: '/search' },
]

const show = ref(false)

const scrolled = ref(false)

const onScroll = (): void => {
	scrolled.value = window.scrollY > 20
}

onMounted(() => {
	window.addEventListener('scroll', onScroll, { passive: true })
	onScroll()
})

onBeforeUnmount(() => {
	window.removeEventListener('scroll', onScroll)
})
</script>

<template lang="pug">
header(
	:class="[scrolled ? 'bg-cinema-bg/90 backdrop-blur-md' : 'bg-transparent']"
	class="fixed inset-x-0 top-0 z-50 transition-colors duration-300 py-4"
)
	div(class="container flex items-center")
		NuxtLink(to="/" class="font-oswald text-3xl font-bold uppercase tracking-tight text-white")
			svg-logo(class="h-6 w-auto fill-current")
		svg-hamburger(class="ms-6 size-6" @click="show = !show")
		Transition(name="nav")
			nav(v-if="show" class="ms-6 hidden md:flex items-center gap-8")
				NuxtLink(
					v-for="link in navLinks"
					:key="link.to"
					:to="link.to"
					class="text-sm font-medium text-white/80 hover:text-white transition-colors"
				) {{ link.label }}
		div(class="ms-auto flex items-center gap-3")
			button(
				type="button"
				class="hidden sm:block px-4 py-2 rounded-md bg-brand-accent text-white text-sm hover:brightness-110 transition-all"
				@click="list.toggle()"
			) Watchlist
</template>

<style scoped>
.nav-enter-active {
	transition: opacity 300ms ease-out, transform 300ms ease-out;
}

.nav-leave-active {
	transition: opacity 200ms ease-in, transform 200ms ease-in;
}

.nav-enter-from,
.nav-leave-to {
	opacity: 0;
	transform: translateX(-1.5rem);
}

.nav-enter-to,
.nav-leave-from {
	opacity: 1;
	transform: translateX(0);
}
</style>
