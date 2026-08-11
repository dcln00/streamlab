// app/composables/useStream.ts
interface StreamUrlResponse {
	url: string
}

export default function () {
	const movieStreamUrl = async (tmdbId: number): Promise<string> => {
		const { url } = await $fetch<StreamUrlResponse>('/api/stream', {
			query: { type: 'movie', id: tmdbId },
		})
		return url
	}

	const tvStreamUrl = async (
		tmdbId: number,
		season: number,
		episode: number
	): Promise<string> => {
		const { url } = await $fetch<StreamUrlResponse>('/api/stream', {
			query: { type: 'tv', id: tmdbId, season, episode },
		})
		return url
	}

	return {
		movieStreamUrl,
		tvStreamUrl,
	}
}
