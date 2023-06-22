import { computed, withAsyncContext, unref, useSSRContext, defineAsyncComponent } from 'vue';
import { d as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch.e0daf794.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'defu';
import './vercel.mjs';
import 'node-fetch-native/polyfill';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';

const __nuxt_component_0_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./Jumbotron.4e23614a.mjs').then((m) => m.default || m));
const __nuxt_component_1_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./Trending.417bb544.mjs').then((m) => m.default || m));
const __nuxt_component_2_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./MovieList.924c2c2b.mjs').then((m) => m.default || m));
const __nuxt_component_3_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./TvList.30d9c4b2.mjs').then((m) => m.default || m));
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useRuntimeConfig();
    const lists = computed(() => `/api/listings`);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(lists, "$PslAyef5YX")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_LazyJumbotron = __nuxt_component_0_lazy;
      const _component_LazyTrending = __nuxt_component_1_lazy;
      const _component_LazyMovieList = __nuxt_component_2_lazy;
      const _component_LazyTvList = __nuxt_component_3_lazy;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_LazyJumbotron, null, null, _parent));
      _push(ssrRenderComponent(_component_LazyTrending, null, null, _parent));
      _push(ssrRenderComponent(_component_LazyMovieList, {
        heading: { name: "Popular Movies", url: "/movie/category/popular" },
        show: true,
        "fetch-params": (_a = unref(data)) == null ? void 0 : _a.popularMovies.results.slice(1, 11)
      }, null, _parent));
      _push(ssrRenderComponent(_component_LazyTvList, {
        heading: { name: "Popular TV Shows" },
        "fetch-params": (_b = unref(data)) == null ? void 0 : _b.popularTv.results.slice(0, 10)
      }, null, _parent));
      _push(ssrRenderComponent(_component_LazyMovieList, {
        heading: { name: "Coming Soon", url: "/movie/category/upcoming" },
        show: false,
        "fetch-params": (_c = unref(data)) == null ? void 0 : _c.upcomingMovies.results.slice(0, 10)
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.d8e74f87.mjs.map
