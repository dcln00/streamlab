import { defineEventHandler } from 'h3';
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

const _____ = defineEventHandler(async (event) => {
  const id = [...event.node.req.url.split("/")].pop();
  const config = useRuntimeConfig();
  const ids = await $fetch(`${config.apiBaseUrl}/movie/${id}?api_key=${config.apiKey}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${config.apiKey}`
    }
  });
  const credits = await $fetch(`${config.apiBaseUrl}/movie/${id}/credits?api_key=${config.apiKey}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${config.apiKey}`
    }
  });
  const photos = await $fetch(`${config.apiBaseUrl}/movie/${id}/images?api_key=${config.apiKey}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${config.apiKey}`
    }
  });
  const videos = await $fetch(`${config.apiBaseUrl}/movie/${id}/videos?api_key=${config.apiKey}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${config.apiKey}`
    }
  });
  const rec = await $fetch(`${config.apiBaseUrl}/movie/${id}/recommendations?api_key=${config.apiKey}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${config.apiKey}`
    }
  });
  return { ids, credits, photos, videos, rec };
});

export { _____ as default };
//# sourceMappingURL=_..._2.mjs.map
