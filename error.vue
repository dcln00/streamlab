<template lang="pug">
section#warning.container-fluid.d-flex.align-items-center.justify-content-center
	Head
		Title Page Not Found
	.error-message
		.title  Page not found
		.message Looks like you've followed a broken link or entered a URL that doesn't exist on this site.
		.button Back to our #[span(@click="handleError") homepage]
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>