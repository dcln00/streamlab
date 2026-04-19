// server/api/__sitemap__/urls.ts
import { movieCategories, tvCategories } from '~/utils/categories'
import type { MovieListResponse, TvListResponse } from '~/types/tmdb'

interface SitemapUrl {
	loc: string
	lastmod?: string
	changefreq?: 'hourly' | 'daily' | 'weekly' | 'monthly'
	priority?: number
}

const TV_ORIGIN_ALLOWLIST = ['US', 'GB', 'CA']
const PAGES_PER_FEED = 3

export default defineSitemapEventHandler(async () => {
	const { apiKey, apiBaseUrl } = useRuntimeConfig()
	if (!apiKey || !apiBaseUrl) return []

	const urls: SitemapUrl[] = []

	for (const slug of Object.keys(movieCategories)) {
		urls.push({
			loc: `/movie/category/${slug}`,
			changefreq: 'daily',
			priority: 0.7,
		})
	}
	for (const slug of Object.keys(tvCategories)) {
		urls.push({
			loc: `/tv/category/${slug}`,
			changefreq: 'daily',
			priority: 0.7,
		})
	}

	const fetchPages = async <T>(path: string, pages: number): Promise<T[]> => {
		const results: T[] = []
		for (let page = 1; page <= pages; page++) {
			try {
				const res = await $fetch<T>(`${apiBaseUrl}/${path}`, {
					query: { api_key: apiKey, language: 'en-US', page },
				})
				results.push(res)
			} catch {
				break
			}
		}
		return results
	}

	const moviePages = await fetchPages<MovieListResponse>(
		'movie/popular',
		PAGES_PER_FEED
	)
	for (const res of moviePages) {
		for (const m of res.results) {
			urls.push({
				loc: `/movie/${m.id}`,
				changefreq: 'weekly',
				priority: 0.8,
			})
		}
	}

	const tvPages = await fetchPages<TvListResponse>('tv/popular', PAGES_PER_FEED)
	for (const res of tvPages) {
		for (const s of res.results) {
			if (!s.origin_country?.some((c) => TV_ORIGIN_ALLOWLIST.includes(c))) {
				continue
			}
			urls.push({
				loc: `/tv/${s.id}`,
				changefreq: 'weekly',
				priority: 0.8,
			})
		}
	}

	return urls
})
