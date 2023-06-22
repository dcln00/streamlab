import { d as useRuntimeConfig, _ as __nuxt_component_0$1 } from './server.mjs';
import { computed, withAsyncContext, mergeProps, withCtx, createTextVNode, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { u as useFetch } from './fetch.e0daf794.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "TvList",
  __ssrInlineRender: true,
  props: {
    heading: Object,
    fetchParams: Object
  },
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const lists = computed(() => `/api/listings`);
    [__temp, __restore] = withAsyncContext(() => useFetch(lists, "$bGXmx8naQP")), __temp = await __temp, __restore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "container",
        id: "upcoming"
      }, _attrs))}><div class="heading d-flex align-items-center"><div class="title">${ssrInterpolate(__props.heading.name)}</div><div class="explore ms-auto">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: __props.heading.url
      }, {
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
      _push(`</div></div><div class="upcoming-container"><!--[-->`);
      ssrRenderList(__props.fetchParams, (item, index) => {
        _push(`<div class="upcoming"><div class="poster">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/tv/${item == null ? void 0 : item.id}`
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
        if (_ctx.$device.isDesktop) {
          _push(`<div class="play"><i class="fa fa-play-circle" aria-hidden="true"></i></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="details">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/tv/${item == null ? void 0 : item.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="movie-title"${_scopeId}>${ssrInterpolate(item.name)}</div>`);
            } else {
              return [
                createVNode("div", { class: "movie-title" }, toDisplayString(item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`<div class="other"><div class="rating"><i class="fa fa-star" aria-hidden="true"></i> ${ssrInterpolate(`${Math.round(item.vote_average / 10 * 100)}%`)}</div></div></div></div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TvList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=TvList.30d9c4b2.mjs.map