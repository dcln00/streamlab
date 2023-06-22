import { defineEventHandler, getQuery } from 'h3';
import { u as useRuntimeConfig } from './vercel.mjs';
import 'node-fetch-native/polyfill';
import 'ufo';
import 'ofetch';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'defu';
import 'radix3';

const search = defineEventHandler((event) => {
  const { query } = getQuery(event);
  const config = useRuntimeConfig();
  return $fetch(`${config.apiBaseUrl}/search/multi?query=${query}&api_key=${config.apiKey}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${config.apiKey}`
    }
  });
});

export { search as default };
//# sourceMappingURL=search.mjs.map
