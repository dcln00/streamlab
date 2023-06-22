import { H as Head, T as Title } from './components.c1029914.mjs';
import { computed, withAsyncContext, withCtx, unref, createTextVNode, toDisplayString, createVNode, useSSRContext, defineAsyncComponent } from 'vue';
import { a as _export_sfc, s as storeToRefs, d as useRuntimeConfig } from './server.mjs';
import { u as useFetch } from './fetch.e0daf794.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { s as siteSettings } from './index.75eba556.mjs';
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

const __nuxt_component_2_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./MovieList.924c2c2b.mjs').then((m) => m.default || m));
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const settings = siteSettings();
    const { meta } = storeToRefs(settings);
    const config = useRuntimeConfig();
    const lists = computed(() => `/api/listings`);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(lists, "$QSA0QSIS7s")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_LazyMovieList = __nuxt_component_2_lazy;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-1efffa4c>`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(`Movies - ${unref(meta).title}`)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(`Movies - ${unref(meta).title}`), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Title, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(`Movies - ${unref(meta).title}`), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="container-fluid px-0" id="jumbo-page" data-v-1efffa4c><div class="jumbo-image" data-v-1efffa4c><img${ssrRenderAttr("src", `${unref(config).public.imgBackdropBaseUrl}${(_b = unref(data)) == null ? void 0 : _b.popularMovies.results[Math.floor(Math.random() * ((_a = unref(data)) == null ? void 0 : _a.popularMovies.results.length))].backdrop_path}`)} alt="featured movie poster" data-v-1efffa4c></div><div class="wrap container d-flex justify-content-center align-items-center" data-v-1efffa4c><div class="title" data-v-1efffa4c>Movies</div></div></section>`);
      _push(ssrRenderComponent(_component_LazyMovieList, {
        heading: { name: "Trending Movies", url: "/movie/category/trending" },
        show: true,
        "fetch-params": (_c = unref(data)) == null ? void 0 : _c.trendingMovies.results.slice(0, 15)
      }, null, _parent));
      _push(ssrRenderComponent(_component_LazyMovieList, {
        heading: { name: "Popular Movies", url: "/movie/category/popular" },
        show: true,
        "fetch-params": (_d = unref(data)) == null ? void 0 : _d.popularMovies.results.slice(0, 15)
      }, null, _parent));
      _push(ssrRenderComponent(_component_LazyMovieList, {
        heading: { name: "Coming Soon", url: "/movie/category/upcoming" },
        show: false,
        "fetch-params": (_e = unref(data)) == null ? void 0 : _e.upcomingMovies.results.slice(0, 15)
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/movie/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1efffa4c"]]);

export { index as default };
//# sourceMappingURL=index.d7819f2a.mjs.map
