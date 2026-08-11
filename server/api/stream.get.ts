// server/api/stream.get.ts
interface StreamUrlResponse {
	url: string
}

const parseInteger = (value: unknown, min: number): number | null => {
	const n = Number(value)
	return Number.isInteger(n) && n >= min ? n : null
}

export default defineEventHandler((event): StreamUrlResponse => {
	const { streamEmbedBaseUrl } = useRuntimeConfig()

	if (!streamEmbedBaseUrl) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Stream embed base URL is not configured',
		})
	}

	const base = streamEmbedBaseUrl.replace(/\/$/, '')
	const query = getQuery(event)
	const tmdbId = parseInteger(query.id, 1)

	if (!tmdbId) {
		throw createError({ statusCode: 400, statusMessage: 'Invalid id' })
	}

	if (query.type === 'movie') {
		return { url: `${base}/movie?tmdb=${tmdbId}` }
	}

	if (query.type === 'tv') {
		// Season 0 is TMDB's "Specials" bucket, so it's a valid lower bound.
		const season = parseInteger(query.season, 0)
		const episode = parseInteger(query.episode, 1)
		if (season === null || episode === null) {
			throw createError({
				statusCode: 400,
				statusMessage: 'Invalid season or episode',
			})
		}
		return {
			url: `${base}/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`,
		}
	}

	throw createError({ statusCode: 400, statusMessage: 'Invalid type' })
})
