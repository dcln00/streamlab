// nuxt.config.ts
export default defineNuxtConfig({
	compatibilityDate: "2025-01-01",
	devtools: { enabled: true },
	modules: [
		"@nuxt/fonts",
		"@nuxt/image",
		"@nuxtjs/tailwindcss",
		"@vueuse/nuxt",
		"@nuxtjs/sitemap",
		"@nuxtjs/robots",
		"@vercel/analytics",
	],
	hooks: {
		"nitro:config"(config) {
			config.imports = config.imports || {}
			config.imports.warn = (msg: string) => {
				if (!msg.includes("Duplicated imports")) console.warn(msg)
			}
		},
	},
	tailwindcss: {
		viewer: false,
	},
	fonts: {
		defaults: {
			weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
		},
	},
	site: {
		url: process.env.NUXT_PUBLIC_SITE_URL || "https://streamlab.vercel.app",
		name: "Streamlab",
	},
	sitemap: {
		sources: ["/api/__sitemap__/urls"],
	},
	robots: {
		disallow: ["/search"],
	},
	runtimeConfig: {
		apiKey: "",
		apiBaseUrl: "",
		public: {
			imgBaseUrl: "",
			imgBackdropBaseUrl: "",
			siteUrl:
				process.env.NUXT_PUBLIC_SITE_URL || "https://streamlab.vercel.app",
		},
	},
	vite: {
		optimizeDeps: {
			include: ["@vue/devtools-core", "@vue/devtools-kit"],
		},
	},
	nitro: {
		preset: "vercel",
	},
})
