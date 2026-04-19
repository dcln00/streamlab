// app/composables/useMeta.ts
export default function () {
	const meta = useState("meta", () => ({
		siteName: 'Streamlab',
		siteDescription:
			'Watch trailers and browse movies and TV shows on Streamlab, a TMDB-powered streaming catalog.',
		siteUrl: 'https://streamlab.vercel.app',
		ogSiteName: 'Video Streaming App',
	}))

	return meta
}
