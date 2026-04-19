// app/utils/jsonLd.ts
import type { MovieDetails, TvShowDetails } from '~/types/tmdb'

const TMDB_IMAGE_ORIGINAL = 'https://image.tmdb.org/t/p/original'

const absoluteImage = (path: string | null | undefined): string | undefined =>
	path ? `${TMDB_IMAGE_ORIGINAL}${path}` : undefined

export interface BreadcrumbItem {
	name: string
	path: string
}

export const websiteSchema = (siteUrl: string, siteName: string) => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: siteName,
	url: siteUrl,
	potentialAction: {
		'@type': 'SearchAction',
		target: `${siteUrl}/search?q={search_term_string}`,
		'query-input': 'required name=search_term_string',
	},
})

export const breadcrumbSchema = (siteUrl: string, items: BreadcrumbItem[]) => ({
	'@context': 'https://schema.org',
	'@type': 'BreadcrumbList',
	itemListElement: items.map((item, i) => ({
		'@type': 'ListItem',
		position: i + 1,
		name: item.name,
		item: `${siteUrl}${item.path}`,
	})),
})

export const movieSchema = (
	details: MovieDetails,
	siteUrl: string
): Record<string, unknown> => ({
	'@context': 'https://schema.org',
	'@type': 'Movie',
	name: details.title,
	url: `${siteUrl}/movie/${details.id}`,
	description: details.overview,
	image: absoluteImage(details.backdrop_path ?? details.poster_path),
	datePublished: details.release_date || undefined,
	genre: details.genres.map((g) => g.name),
	duration: details.runtime ? `PT${details.runtime}M` : undefined,
	aggregateRating:
		details.vote_count > 0
			? {
					'@type': 'AggregateRating',
					ratingValue: details.vote_average.toFixed(1),
					bestRating: 10,
					worstRating: 0,
					ratingCount: details.vote_count,
				}
			: undefined,
})

export const tvSchema = (
	details: TvShowDetails,
	siteUrl: string
): Record<string, unknown> => {
	const episodeRuntime = details.episode_run_time?.[0]
	return {
		'@context': 'https://schema.org',
		'@type': 'TVSeries',
		name: details.name,
		url: `${siteUrl}/tv/${details.id}`,
		description: details.overview,
		image: absoluteImage(details.backdrop_path ?? details.poster_path),
		datePublished: details.first_air_date || undefined,
		genre: details.genres.map((g) => g.name),
		numberOfSeasons: details.number_of_seasons,
		numberOfEpisodes: details.number_of_episodes,
		timeRequired: episodeRuntime ? `PT${episodeRuntime}M` : undefined,
		aggregateRating:
			details.vote_count > 0
				? {
						'@type': 'AggregateRating',
						ratingValue: details.vote_average.toFixed(1),
						bestRating: 10,
						worstRating: 0,
						ratingCount: details.vote_count,
					}
				: undefined,
	}
}
