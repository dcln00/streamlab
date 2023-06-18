import bootstrap from 'bootstrap/dist/js/bootstrap.min.js';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide('bootstrap', bootstrap);
});
