export const movieListing = defineStore('listings', () => {
	const config = useRuntimeConfig()
	const trending = computed(() => `api/listings`)

	const lists = ref([])

	const fetchListing = async () => {
		const { data } = await useFetch(trending)
		if(data.value) {
			lists.value = data.value
		}
	}

	return {lists, fetchListing}
})