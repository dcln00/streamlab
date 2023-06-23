import FsLightbox from "fslightbox-vue/v3"

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(FsLightbox.default)
  });