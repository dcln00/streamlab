// app/utils/pick-trailer.ts
import type { TmdbVideo } from '~/types/tmdb'

export const pickTrailer = (videos: TmdbVideo[]): TmdbVideo | null => {
	const youtube = videos.filter((v) => v.site === 'YouTube')
	const officialTrailer = youtube.find(
		(v) => v.type === 'Trailer' && v.official
	)
	if (officialTrailer) return officialTrailer
	const anyTrailer = youtube.find((v) => v.type === 'Trailer')
	if (anyTrailer) return anyTrailer
	const teaser = youtube.find((v) => v.type === 'Teaser')
	if (teaser) return teaser
	return youtube[0] ?? null
}
