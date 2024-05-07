export default defineEventHandler(async (event) => {
	const { id } = getRouterParams(event)
	const config = useRuntimeConfig()
	
		const ids = await $fetch(`${config.apiBaseUrl}/movie/${id}?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		const credits = await $fetch(`${config.apiBaseUrl}/movie/${id}/credits?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		const photos = await $fetch(`${config.apiBaseUrl}/movie/${id}/images?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		const videos = await $fetch(`${config.apiBaseUrl}/movie/${id}/videos?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		const rec = await $fetch(`${config.apiBaseUrl}/movie/${id}/recommendations?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		return {ids, credits, photos, videos, rec}
})