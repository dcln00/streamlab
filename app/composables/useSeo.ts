// app/composables/useSeo.ts
export interface SeoOptions {
	title: string
	description: string
	image?: string
	path: string
	type?: 'website' | 'video.movie' | 'video.tv_show' | 'article'
	noindex?: boolean
}

export default function useSeo(opts: SeoOptions): void {
	const config = useRuntimeConfig()
	const siteUrl = String(config.public.siteUrl || '').replace(/\/$/, '')
	const meta = useMeta()
	const canonical = `${siteUrl}${opts.path}`
	const image = opts.image || `${siteUrl}/og-default.png`

	useSeoMeta({
		title: opts.title,
		description: opts.description,
		ogTitle: opts.title,
		ogDescription: opts.description,
		ogType: opts.type ?? 'website',
		ogImage: image,
		ogUrl: canonical,
		ogSiteName: meta.value.siteName,
		twitterCard: 'summary_large_image',
		twitterTitle: opts.title,
		twitterDescription: opts.description,
		twitterImage: image,
		robots: opts.noindex ? 'noindex, nofollow' : 'index, follow',
	})

	useHead({
		link: [{ rel: 'canonical', href: canonical }],
	})
}
