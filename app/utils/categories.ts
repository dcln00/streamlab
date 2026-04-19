// app/utils/categories.ts
export interface Category {
	endpoint: string
	title: string
	description: string
}

export const movieCategories: Record<string, Category> = {
	popular: {
		endpoint: 'movie/popular',
		title: 'Popular Movies',
		description: 'The most popular movies right now on Streamlab.',
	},
	trending: {
		endpoint: 'trending/movie/week',
		title: 'Trending This Week',
		description: 'Movies trending across the world this week.',
	},
	'top-rated': {
		endpoint: 'movie/top_rated',
		title: 'Top Rated Movies',
		description: 'The highest-rated movies of all time.',
	},
	upcoming: {
		endpoint: 'movie/upcoming',
		title: 'Coming Soon',
		description: 'Upcoming movies heading to theatres.',
	},
	'now-playing': {
		endpoint: 'movie/now_playing',
		title: 'Now Playing',
		description: 'Movies currently playing in theatres.',
	},
}

export const tvCategories: Record<string, Category> = {
	popular: {
		endpoint: 'tv/popular',
		title: 'Popular TV Shows',
		description: 'The most popular TV shows right now on Streamlab.',
	},
	trending: {
		endpoint: 'trending/tv/week',
		title: 'Trending This Week',
		description: 'TV shows trending this week.',
	},
	'top-rated': {
		endpoint: 'tv/top_rated',
		title: 'Top Rated TV Shows',
		description: 'The highest-rated TV shows of all time.',
	},
	'on-the-air': {
		endpoint: 'tv/on_the_air',
		title: 'On The Air',
		description: 'TV shows currently on the air.',
	},
	'airing-today': {
		endpoint: 'tv/airing_today',
		title: 'Airing Today',
		description: 'TV shows airing today.',
	},
}
