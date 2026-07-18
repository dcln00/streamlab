// app/utils/stream.ts
const STREAM_EMBED_BASE = 'https://vidsrc-embed.ru/embed'

export const movieStreamUrl = (tmdbId: number): string =>
	`${STREAM_EMBED_BASE}/movie?tmdb=${tmdbId}`

export const tvStreamUrl = (
	tmdbId: number,
	season: number,
	episode: number
): string =>
	`${STREAM_EMBED_BASE}/tv?tmdb=${tmdbId}&season=${season}&episode=${episode}`
