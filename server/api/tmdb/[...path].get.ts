// server/api/tmdb/[...path].get.ts
export default defineCachedEventHandler(
	async (event) => {
		const { apiKey, apiBaseUrl } = useRuntimeConfig()

		if (!apiKey || !apiBaseUrl) {
			throw createError({
				statusCode: 500,
				statusMessage: 'TMDB credentials are not configured',
			})
		}

		const path = getRouterParam(event, 'path')
		if (!path) {
			throw createError({ statusCode: 400, statusMessage: 'Missing path' })
		}

		const query = getQuery(event)

		try {
			return await $fetch(`${apiBaseUrl}/${path}`, {
				query: { ...query, api_key: apiKey, language: 'en-US' },
			})
		} catch (err) {
			const status = (err as { statusCode?: number }).statusCode ?? 502
			throw createError({
				statusCode: status,
				statusMessage: 'TMDB request failed',
			})
		}
	},
	{
		maxAge: 60 * 5,
		name: 'tmdb',
		getKey: (event) => {
			const path = getRouterParam(event, 'path') ?? ''
			const query = getQuery(event)
			const qs = new URLSearchParams(
				Object.entries(query).map(([k, v]) => [k, String(v)])
			).toString()
			return `${path}?${qs}`
		},
	}
)
