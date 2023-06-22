import { reactive } from 'vue';
import { u as useNuxtApp, c as __appConfig } from './server.mjs';

function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = reactive(__appConfig);
  }
  return nuxtApp._appConfig;
}

export { useAppConfig as u };
//# sourceMappingURL=config.cf183293.mjs.map
