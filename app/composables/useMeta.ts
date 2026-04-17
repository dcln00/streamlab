// app/composables/useMeta.ts
export default function () {
	const meta = useState("meta", () => ({
		siteName: 'Streamlab',
		siteDescription:
			'Streamlab — a streaming lab for modern media experiences.',
		siteUrl: 'https://streamlab.app',
		ogSiteName:
			'Video Streaming App'
	}))

	return meta
}