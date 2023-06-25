<template lang="pug">
div
	NuxtLayout
		NuxtLoadingIndicator(:color="'repeating-linear-gradient(to right,#098443 0%,#18be66 100%)'" :throttle="150")
		NuxtPage(:transition="{name: 'page', mode: 'out-in'}")
</template>