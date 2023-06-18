<template lang="pug">
div
	LazyAppHeader(v-if="$device.isDesktop")
	LazyMobileNav(v-else-if="$device.isMobileOrTablet")
	main
		slot
	LazyAppFooter(v-if="$device.isDesktop")
	LazyMobileFooter(v-else-if="$device.isMobileOrTablet")
</template>