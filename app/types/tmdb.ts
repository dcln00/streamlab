// app/types/tmdb.ts
export interface Movie {
	id: number
	title: string
	original_title: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null
	release_date: string
	vote_average: number
	vote_count: number
	genre_ids: number[]
	popularity: number
	adult: boolean
	original_language: string
}

export interface MovieListResponse {
	page: number
	results: Movie[]
	total_pages: number
	total_results: number
}

export interface Genre {
	id: number
	name: string
}

export interface GenreListResponse {
	genres: Genre[]
}

export type TrendingPeriod = 'day' | 'week'

export interface TmdbImage {
	aspect_ratio: number
	file_path: string
	height: number
	width: number
	iso_639_1: string | null
	vote_average: number
	vote_count: number
}

export interface MovieImagesResponse {
	id: number
	backdrops: TmdbImage[]
	posters: TmdbImage[]
	logos: TmdbImage[]
}

export interface MovieDetails extends Movie {
	runtime: number | null
	genres: Genre[]
	tagline: string
	status: string
	homepage: string | null
	imdb_id: string | null
}

export interface TvShow {
	id: number
	name: string
	original_name: string
	overview: string
	poster_path: string | null
	backdrop_path: string | null
	first_air_date: string
	vote_average: number
	vote_count: number
	genre_ids: number[]
	popularity: number
	origin_country: string[]
	original_language: string
}

export interface TvListResponse {
	page: number
	results: TvShow[]
	total_pages: number
	total_results: number
}

export interface TvShowDetails extends TvShow {
	episode_run_time: number[]
	genres: Genre[]
	number_of_seasons: number
	number_of_episodes: number
	tagline: string
	status: string
	homepage: string | null
	last_air_date: string | null
}

export interface CastMember {
	id: number
	name: string
	character: string
	profile_path: string | null
	order: number
}

export interface CreditsResponse {
	id: number
	cast: CastMember[]
}

export interface TmdbVideo {
	id: string
	key: string
	name: string
	site: string
	type: string
	official: boolean
	published_at: string
	size: number
}

export interface VideosResponse {
	id: number
	results: TmdbVideo[]
}

export type MediaType = 'movie' | 'tv'

export interface SearchMultiResult {
	id: number
	media_type: MediaType | 'person'
	title?: string
	name?: string
	overview?: string
	poster_path: string | null
	backdrop_path: string | null
	profile_path?: string | null
	release_date?: string
	first_air_date?: string
	vote_average?: number
}

export interface SearchMultiResponse {
	page: number
	results: SearchMultiResult[]
	total_pages: number
	total_results: number
}
