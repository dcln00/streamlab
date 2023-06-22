import { d as useRuntimeConfig, _ as __nuxt_component_0$1 } from './server.mjs';
import { computed, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, createVNode, useSSRContext } from 'vue';
import { u as useFetch } from './fetch.e0daf794.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "Trending",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const trending = computed(() => `/api/listings`);
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(trending, "$gidHolKbzo")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "container",
        id: "trending"
      }, _attrs))}><div class="heading d-flex align-items-center"><div class="title">Trending</div><div class="explore ms-auto">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: `/movie/category/trending` }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Explore More`);
          } else {
            return [
              createTextVNode("Explore More")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      if (_ctx.$device.isDesktop) {
        _push(`<div class="controls"><div class="left"><i class="fa fa-angle-left" aria-hidden="true"></i></div><div class="right"><i class="fa fa-angle-right" aria-hidden="true"></i></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="trending-container"><!--[-->`);
      ssrRenderList((_a = unref(data)) == null ? void 0 : _a.trendingMovies.results.slice(0, 5), (item, index) => {
        _push(`<div class="trending"><div class="poster">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/movie/${item == null ? void 0 : item.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", `${unref(config).public.imgBaseUrl}${item.poster_path}`)}${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: `${unref(config).public.imgBaseUrl}${item.poster_path}`
                }, null, 8, ["src"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="play"><i class="fa fa-play-circle" aria-hidden="true"></i></div><div class="details"><div class="movie-title">${ssrInterpolate(item.title)}</div></div></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Trending.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Trending.417bb544.mjs.map
