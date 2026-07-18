// server/utils/tmdb-region.ts
const EUROPEAN_COUNTRIES = [
	'AD', 'AL', 'AT', 'BA', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE',
	'ES', 'FI', 'FR', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU',
	'LV', 'MC', 'MD', 'ME', 'MK', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'RS',
	'SE', 'SI', 'SK', 'SM', 'UA',
]

const ALLOWED_ORIGIN_COUNTRIES = ['US', 'GB', 'CA', 'AU', ...EUROPEAN_COUNTRIES]

const ORIGIN_FILTER = ALLOWED_ORIGIN_COUNTRIES.join('|')
const NOW_PLAYING_WINDOW_DAYS = 42
const ON_THE_AIR_WINDOW_DAYS = 7
const MIN_TOP_RATED_VOTE_COUNT = 200
const MS_PER_DAY = 24 * 60 * 60 * 1000

interface TmdbRewrite {
	path: string
	query: Record<string, string>
}

const isoDate = (offsetDays: number): string =>
	new Date(Date.now() + offsetDays * MS_PER_DAY).toISOString().slice(0, 10)

// TMDB's curated list endpoints (popular, trending, …) don't accept a country
// filter, so region-restricted browsing has to go through /discover instead.
// Each rewrite approximates the original list's ordering.
export function rewriteTmdbListPath(path: string): TmdbRewrite | null {
	const today = isoDate(0)
	const popularMovies: TmdbRewrite = {
		path: 'discover/movie',
		query: { sort_by: 'popularity.desc' },
	}
	const popularTv: TmdbRewrite = {
		path: 'discover/tv',
		query: { sort_by: 'popularity.desc' },
	}

	const rewrites: Record<string, TmdbRewrite> = {
		'movie/popular': popularMovies,
		'trending/movie/day': popularMovies,
		'trending/movie/week': popularMovies,
		'movie/top_rated': {
			path: 'discover/movie',
			query: {
				sort_by: 'vote_average.desc',
				'vote_count.gte': String(MIN_TOP_RATED_VOTE_COUNT),
			},
		},
		'movie/upcoming': {
			path: 'discover/movie',
			query: {
				sort_by: 'popularity.desc',
				'primary_release_date.gte': isoDate(1),
			},
		},
		'movie/now_playing': {
			path: 'discover/movie',
			query: {
				sort_by: 'popularity.desc',
				'primary_release_date.gte': isoDate(-NOW_PLAYING_WINDOW_DAYS),
				'primary_release_date.lte': today,
			},
		},
		'tv/popular': popularTv,
		'trending/tv/day': popularTv,
		'trending/tv/week': popularTv,
		'tv/top_rated': {
			path: 'discover/tv',
			query: {
				sort_by: 'vote_average.desc',
				'vote_count.gte': String(MIN_TOP_RATED_VOTE_COUNT),
			},
		},
		'tv/on_the_air': {
			path: 'discover/tv',
			query: {
				sort_by: 'popularity.desc',
				'air_date.gte': today,
				'air_date.lte': isoDate(ON_THE_AIR_WINDOW_DAYS),
			},
		},
		'tv/airing_today': {
			path: 'discover/tv',
			query: {
				sort_by: 'popularity.desc',
				'air_date.gte': today,
				'air_date.lte': today,
			},
		},
	}

	const rewrite = rewrites[path]
	if (!rewrite) return null

	return {
		path: rewrite.path,
		query: { ...rewrite.query, with_origin_country: ORIGIN_FILTER },
	}
}
