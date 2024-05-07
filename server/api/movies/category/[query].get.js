export default defineEventHandler(async (event) => {
	try {
		const { query } = getRouterParams(event)
		const config = useRuntimeConfig()

		function futureDate() {
			let future = new Date()
			future.setDate(future.getDate('') + 30)

			return future.toISOString().slice(0, 10).toString()
		}

		function currentDate() {
			let current = new Date()

			return current.toISOString().slice(0, 10).toString()
		}

		if (query === 'popular') {
			return await $fetch(
				`${config.apiBaseUrl}/discover/movie?api_key=${
					config.apiKey
				}&region=US&language=en-US&page=1&sort_by=popularity.desc&primary_release_date.lte=${currentDate()}`,
				{
					headers: {
						Authorization: `Bearer ${config.apiKey}`,
					},
				}
			)
		}
		
		if (query === 'trending') {
			return await $fetch(
				`${config.apiBaseUrl}/${query}/movie/day?api_key=${config.apiKey}`,
				{
					headers: {
						Authorization: `Bearer ${config.apiKey}`,
					},
				}
			)
		}
		
		if (query === 'upcoming') {
			return await $fetch(
				`${config.apiBaseUrl}/discover/movie?api_key=${
					config.apiKey
				}&include_adult=true&region=US&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&primary_release_date.gte=${currentDate()}&primary_release_date.lte=${futureDate()}`,
				{
					headers: {
						Authorization: `Bearer ${config.apiKey}`,
					},
				}
			)
		}
		
	} catch (e) {
		throw createError({
			statusCode: 404,
			statusMessage: e.statusMessage,
		})
	}
})
