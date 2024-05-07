export default defineEventHandler(async (event) => {
	const { id } = getRouterParams(event)
	const config = useRuntimeConfig()

		const ids = await $fetch(`${config.apiBaseUrl}/tv/${id}?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		const credits = await $fetch(`${config.apiBaseUrl}/tv/${id}/credits?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		const ratings = await $fetch(`${config.apiBaseUrl}/tv/${id}/content_ratings?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		const photos = await $fetch(`${config.apiBaseUrl}/tv/${id}/images?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		const videos = await $fetch(`${config.apiBaseUrl}/tv/${id}/videos?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		const rec = await $fetch(`${config.apiBaseUrl}/tv/${id}/recommendations?api_key=${config.apiKey}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${config.apiKey}`
			}
		})

		// const seasons = await $fetch(`${config.apiBaseUrl}/tv/${id}/season/${number}?api_key=${config.apiKey}`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Authorization': `Bearer ${config.apiKey}`
		// 	}
		// })

		return {ids, credits, ratings, photos, videos, rec}
})