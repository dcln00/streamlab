// app/components/MobileNav.vue
<script setup lang="ts">
const NuxtLink = resolveComponent('NuxtLink')
const route = useRoute()
const list = useList()

interface MobileNavItem {
	label: string
	icon: string
	to?: string
	action?: () => void
}

const items: MobileNavItem[] = [
	{
		label: 'Home',
		to: '/',
		icon: 'm2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25',
	},
	{
		label: 'Search',
		to: '/search',
		icon: 'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
	},
	{
		label: 'Watchlist',
		action: (): void => list.toggle(),
		icon: 'M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z',
	},
]

const isActive = (item: MobileNavItem): boolean => {
	if (!item.to) return false
	return item.to === '/' ? route.path === '/' : route.path.startsWith(item.to)
}
</script>

<template lang="pug">
nav(class="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-cinema-bg/95 backdrop-blur-md pb-[env(safe-area-inset-bottom)] md:hidden")
	div(class="flex")
		component(
			v-for="item in items"
			:key="item.label"
			:is="item.to ? NuxtLink : 'button'"
			:to="item.to"
			:class="[isActive(item) ? 'text-brand-accent' : 'text-cinema-muted']"
			class="flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors hover:text-white"
			@click="item.action?.()"
		)
			svg(viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="size-6")
				path(stroke-linecap="round" stroke-linejoin="round" :d="item.icon")
			span(class="text-xs") {{ item.label }}
</template>
