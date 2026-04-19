import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
	scrollBehavior() {
		const nuxtApp = useNuxtApp()
		return new Promise((resolve) => {
			nuxtApp.hooks.hookOnce('page:finish', () => {
				requestAnimationFrame(() => {
					resolve({ top: 0, behavior: 'instant' })
				})
			})
		})
	},
}
