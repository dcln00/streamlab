// app/composables/useTmdb.ts
import type {
	CreditsResponse,
	MovieDetails,
	MovieImagesResponse,
	MovieListResponse,
	SearchMultiResponse,
	TrendingPeriod,
	TvListResponse,
	TvShowDetails,
} from '~/types/tmdb'

export default function () {
	const config = useRuntimeConfig()
	const posterBase = config.public.imgBaseUrl
	const backdropBase = config.public.imgBackdropBaseUrl

	const emptyMovieList = (): MovieListResponse => ({
		page: 0,
		results: [],
		total_pages: 0,
		total_results: 0,
	})

	const emptyTvList = (): TvListResponse => ({
		page: 0,
		results: [],
		total_pages: 0,
		total_results: 0,
	})

	const fetchMovieList = (endpoint: string, key: string) =>
		useFetch<MovieListResponse>(`/api/tmdb/${endpoint}`, {
			key,
			default: emptyMovieList,
		})

	const fetchTvList = (endpoint: string, key: string) =>
		useFetch<TvListResponse>(`/api/tmdb/${endpoint}`, {
			key,
			default: emptyTvList,
		})

	const fetchTrending = (period: TrendingPeriod = 'week') =>
		fetchMovieList(`trending/movie/${period}`, `tmdb-trending-${period}`)

	const fetchPopular = () => fetchMovieList('movie/popular', 'tmdb-popular')
	const fetchTopRated = () => fetchMovieList('movie/top_rated', 'tmdb-top-rated')
	const fetchUpcoming = () => fetchMovieList('movie/upcoming', 'tmdb-upcoming')
	const fetchNowPlaying = () => fetchMovieList('movie/now_playing', 'tmdb-now-playing')

	const fetchTrendingTv = (period: TrendingPeriod = 'week') =>
		fetchTvList(`trending/tv/${period}`, `tmdb-tv-trending-${period}`)

	const fetchPopularTv = () => fetchTvList('tv/popular', 'tmdb-tv-popular')
	const fetchTopRatedTv = () => fetchTvList('tv/top_rated', 'tmdb-tv-top-rated')
	const fetchOnTheAirTv = () => fetchTvList('tv/on_the_air', 'tmdb-tv-on-the-air')
	const fetchAiringTodayTv = () => fetchTvList('tv/airing_today', 'tmdb-tv-airing-today')

	const fetchMovieImages = (movieId: Ref<number | null | undefined>) =>
		useAsyncData<MovieImagesResponse>(
			`tmdb-movie-images-${movieId.value ?? 'none'}`,
			() => {
				if (!movieId.value) {
					return Promise.resolve({
						id: 0,
						backdrops: [],
						posters: [],
						logos: [],
					})
				}
				return $fetch<MovieImagesResponse>(
					`/api/tmdb/movie/${movieId.value}/images`,
					{ query: { include_image_language: 'en,null' } }
				)
			},
			{
				watch: [movieId],
				default: () => ({ id: 0, backdrops: [], posters: [], logos: [] }),
			}
		)

	const fetchMovieDetails = (movieId: Ref<number | null | undefined>) =>
		useAsyncData<MovieDetails | null>(
			`tmdb-movie-details-${movieId.value ?? 'none'}`,
			() => {
				if (!movieId.value) return Promise.resolve(null)
				return $fetch<MovieDetails>(`/api/tmdb/movie/${movieId.value}`)
			},
			{
				watch: [movieId],
				default: () => null,
			}
		)

	const fetchTvImages = (tvId: Ref<number | null | undefined>) =>
		useAsyncData<MovieImagesResponse>(
			`tmdb-tv-images-${tvId.value ?? 'none'}`,
			() => {
				if (!tvId.value) {
					return Promise.resolve({
						id: 0,
						backdrops: [],
						posters: [],
						logos: [],
					})
				}
				return $fetch<MovieImagesResponse>(
					`/api/tmdb/tv/${tvId.value}/images`,
					{ query: { include_image_language: 'en,null' } }
				)
			},
			{
				watch: [tvId],
				default: () => ({ id: 0, backdrops: [], posters: [], logos: [] }),
			}
		)

	const fetchTvDetails = (tvId: Ref<number | null | undefined>) =>
		useAsyncData<TvShowDetails | null>(
			`tmdb-tv-details-${tvId.value ?? 'none'}`,
			() => {
				if (!tvId.value) return Promise.resolve(null)
				return $fetch<TvShowDetails>(`/api/tmdb/tv/${tvId.value}`)
			},
			{
				watch: [tvId],
				default: () => null,
			}
		)

	const fetchMovieCredits = (movieId: Ref<number | null | undefined>) =>
		useAsyncData<CreditsResponse>(
			`tmdb-movie-credits-${movieId.value ?? 'none'}`,
			() => {
				if (!movieId.value) return Promise.resolve({ id: 0, cast: [] })
				return $fetch<CreditsResponse>(
					`/api/tmdb/movie/${movieId.value}/credits`
				)
			},
			{
				watch: [movieId],
				default: () => ({ id: 0, cast: [] }),
			}
		)

	const fetchTvCredits = (tvId: Ref<number | null | undefined>) =>
		useAsyncData<CreditsResponse>(
			`tmdb-tv-credits-${tvId.value ?? 'none'}`,
			() => {
				if (!tvId.value) return Promise.resolve({ id: 0, cast: [] })
				return $fetch<CreditsResponse>(`/api/tmdb/tv/${tvId.value}/credits`)
			},
			{
				watch: [tvId],
				default: () => ({ id: 0, cast: [] }),
			}
		)

	const fetchMovieSimilar = (movieId: Ref<number | null | undefined>) =>
		useAsyncData<MovieListResponse>(
			`tmdb-movie-similar-${movieId.value ?? 'none'}`,
			() => {
				if (!movieId.value) return Promise.resolve(emptyMovieList())
				return $fetch<MovieListResponse>(
					`/api/tmdb/movie/${movieId.value}/recommendations`
				)
			},
			{
				watch: [movieId],
				default: emptyMovieList,
			}
		)

	const fetchTvSimilar = (tvId: Ref<number | null | undefined>) =>
		useAsyncData<TvListResponse>(
			`tmdb-tv-similar-${tvId.value ?? 'none'}`,
			() => {
				if (!tvId.value) return Promise.resolve(emptyTvList())
				return $fetch<TvListResponse>(
					`/api/tmdb/tv/${tvId.value}/recommendations`
				)
			},
			{
				watch: [tvId],
				default: emptyTvList,
			}
		)

	const searchMulti = (
		query: Ref<string>,
		page: Ref<number> = ref(1)
	) =>
		useAsyncData<SearchMultiResponse>(
			'tmdb-search-multi',
			() => {
				const q = query.value.trim()
				if (!q) {
					return Promise.resolve({
						page: 1,
						results: [],
						total_pages: 0,
						total_results: 0,
					})
				}
				return $fetch<SearchMultiResponse>('/api/tmdb/search/multi', {
					query: { query: q, page: page.value, include_adult: false },
				})
			},
			{
				watch: [query, page],
				default: () => ({
					page: 1,
					results: [],
					total_pages: 0,
					total_results: 0,
				}),
			}
		)

	const posterUrl = (path: string | null): string =>
		path ? `${posterBase}${path}` : ''

	const backdropUrl = (path: string | null): string =>
		path ? `${backdropBase}${path}` : ''

	const formatRuntime = (minutes: number | null | undefined): string => {
		if (!minutes) return ''
		const h = Math.floor(minutes / 60)
		const m = minutes % 60
		if (h && m) return `${h} Hours ${m} Minutes`
		if (h) return `${h} Hours`
		return `${m} Minutes`
	}

	return {
		fetchTrending,
		fetchPopular,
		fetchTopRated,
		fetchUpcoming,
		fetchNowPlaying,
		fetchTrendingTv,
		fetchPopularTv,
		fetchTopRatedTv,
		fetchOnTheAirTv,
		fetchAiringTodayTv,
		fetchMovieImages,
		fetchMovieDetails,
		fetchMovieCredits,
		fetchMovieSimilar,
		fetchTvImages,
		fetchTvDetails,
		fetchTvCredits,
		fetchTvSimilar,
		searchMulti,
		posterUrl,
		backdropUrl,
		formatRuntime,
	}
}
