// app/composables/useTrailer.ts
import type { MediaType, TmdbVideo, VideosResponse } from '~/types/tmdb'

interface TrailerState {
	videoKey: string | null
	title: string
	loading: boolean
	error: string | null
}

const pickTrailer = (videos: TmdbVideo[]): TmdbVideo | null => {
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

export default function () {
	const isOpen = useState<boolean>('trailer-open', () => false)
	const state = useState<TrailerState>('trailer-state', () => ({
		videoKey: null,
		title: '',
		loading: false,
		error: null,
	}))

	const close = (): void => {
		isOpen.value = false
		state.value = {
			videoKey: null,
			title: '',
			loading: false,
			error: null,
		}
	}

	const play = async (
		type: MediaType,
		id: number,
		title = ''
	): Promise<void> => {
		state.value = {
			videoKey: null,
			title,
			loading: true,
			error: null,
		}
		isOpen.value = true

		try {
			const res = await $fetch<VideosResponse>(
				`/api/tmdb/${type}/${id}/videos`
			)
			const trailer = pickTrailer(res.results)
			if (!trailer) {
				state.value = {
					videoKey: null,
					title,
					loading: false,
					error: 'No trailer available for this title.',
				}
				return
			}
			state.value = {
				videoKey: trailer.key,
				title: title || trailer.name,
				loading: false,
				error: null,
			}
		} catch {
			state.value = {
				videoKey: null,
				title,
				loading: false,
				error: 'Failed to load trailer.',
			}
		}
	}

	return { isOpen, state, play, close }
}
