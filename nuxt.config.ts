export default defineNuxtConfig({
	app: {
		head: {
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1, maximum-scale=1',
				},
			],
		},
	},
	css: ['bootstrap/dist/css/bootstrap.min.css', '~/assets/style/style.scss'],
	modules: [
		'@pinia/nuxt',
		'@nuxtjs/device',
		'nuxt-icon',
		'dayjs-nuxt',
		'nuxt-swiper',
		'@vueuse/nuxt',
	],
	components: [
		{ path: '~/components/global' },
		{ path: '~/components/movie' },
		{ path: '~/components/person' },
		{ path: '~/components/search' },
		{ path: '~/components/tv' },
		'~/components',
	],
	pinia: {
		autoImports: ['defineStore', 'storeToRefs'],
	},
	runtimeConfig: {
		apiKey: '',
		apiBaseUrl: '',
		public: {
			imgBaseUrl: '',
			imgBackdropBaseUrl: '',
		},
	},
	devtools: {
		enabled: true,
	},
	nitro: {
		preset: 'vercel',
	},
})
