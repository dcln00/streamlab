<template lang="pug">
input(placeholder="Search" type="text" :value='modelValue' @input="$emit('update:modelValue', $event.target.value)" v-if='$device.isDesktop')
.input-group(v-else-if='$device.isMobileOrTablet')
	span#input-group-left-example.input-group-text #[Icon(name="ic:outline-search" :size='"1.2rem"')]
	input(placeholder="Search" type="text" :value='modelValue' @input="$emit('update:modelValue', $event.target.value)")
</template>

<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>