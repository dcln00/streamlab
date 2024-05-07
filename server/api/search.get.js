export default defineEventHandler((event)=> {
	const {query} = getQuery(event)
	const config = useRuntimeConfig()

	return $fetch(`${config.apiBaseUrl}/search/multi?query=${query}&api_key=${config.apiKey}`, {
		headers: {
			'Authorization': `Bearer ${config.apiKey}`
		}
	})
})