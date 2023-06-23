export default defineNuxtConfig({
	ssr: true,
	app: {
		head: {
			title: 'Streamlab - Video Streaming App',
			meta: [
				  {
					name: 'description',
					content: 'Streamlab - Video Streaming App'
				  },
				  {
					name: 'viewport',
					content: 'width=device-width, initial-scale=1, maximum-scale=1',
					},
				//og
					{ property: 'og:title', content: 'Streamlab - Video Streaming App' },
					{
						property: 'og:description',
						content: 'Streamlab - Video Streaming App',
					  },
					  { property: 'og:site_name', content: 'Streamlab - Video Streaming App' },
				//tc
					{
						property: 'twitter:title',
						content: 'Streamlab - Video Streaming App',
					},
					{
						property: 'twitter:description',
						content: 'Streamlab - Video Streaming App',
					},
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.svg' }],
			script: [{ src: 'https://use.fontawesome.com/7e475b8521.js' }],
		},
	},
	css: [
		'bootstrap/dist/css/bootstrap.min.css',
		'~/assets/style/style.scss',
	],
	modules: [
		'@pinia/nuxt',
		'@nuxtjs/device',
		'nuxt-icon',
		'@nuxt/devtools',
	],
	components: [
		{ path: '~/components/global' },
		{ path: '~/components/movie' },
		{ path: '~/components/person' },
		{ path: '~/components/search' },
		{ path: '~/components/tv' },
		'~/components'
	],
	pinia: {
		autoImports: [
			'defineStore', 'storeToRefs'
		]
	},
	runtimeConfig: {
		apiKey: '',
		apiBaseUrl: '',
		public: {
			imgBaseUrl: '',
			imgBackdropBaseUrl: ''
		}
	},
	devtools: {
		enabled: false,
	  },
	nitro:{
		preset:'vercel'
	  }
})
