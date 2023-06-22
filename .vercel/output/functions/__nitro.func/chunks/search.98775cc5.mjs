import { _ as _sfc_main$1 } from './AppSearch.1a457065.mjs';
import { a as _export_sfc, s as storeToRefs, d as useRuntimeConfig, _ as __nuxt_component_0$1 } from './server.mjs';
import { computed, withAsyncContext, unref, isRef, withCtx, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { u as useFetch } from './fetch.e0daf794.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { s as siteSettings, a as searchQuery } from './index.75eba556.mjs';
import './Icon.94f694d6.mjs';
import './config.cf183293.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
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
  __name: "search",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const settings = siteSettings();
    const search2 = searchQuery();
    const { term } = storeToRefs(search2);
    storeToRefs(settings);
    const searchTerm = term;
    const config = useRuntimeConfig();
    const url = computed(() => {
      return `api/search?query=${searchTerm.value}`;
    });
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(url, "$yZa2AzOsfR")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_AppSearch = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-d5fc3385><section id="search" data-v-d5fc3385>`);
      if (_ctx.$device.isMobileOrTablet) {
        _push(ssrRenderComponent(_component_AppSearch, {
          modelValue: unref(term),
          "onUpdate:modelValue": ($event) => isRef(term) ? term.value = $event : null,
          modelModifiers: { lazy: true }
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section><section class="container-fluid px-0" id="jumbo-page" data-v-d5fc3385><div class="wrap container d-flex justify-content-center align-items-center" data-v-d5fc3385>`);
      if (unref(searchTerm).length === 0) {
        _push(`<div class="title" data-v-d5fc3385>Search</div>`);
      } else {
        _push(`<div class="title"${ssrRenderAttr("model-value", unref(term))} data-v-d5fc3385>${ssrInterpolate(`Results For: ${unref(searchTerm)}`)}</div>`);
      }
      _push(`</div></section><section class="container" id="listing" data-v-d5fc3385><div class="listing-container" data-v-d5fc3385><!--[-->`);
      ssrRenderList((_a = unref(data)) == null ? void 0 : _a.results, (item, index) => {
        _push(`<div class="list" data-v-d5fc3385>`);
        if (!item.poster_path) {
          _push(`<div class="poster d-flex justify-content-center align-items-center" data-v-d5fc3385>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.title ? `/movie/${item == null ? void 0 : item.id}` : `/tv/${item == null ? void 0 : item.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewbox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" fill="#999" data-v-d5fc3385${_scopeId}><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" data-v-d5fc3385${_scopeId}></path></svg>`);
              } else {
                return [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "40",
                    height: "40",
                    viewbox: "0 0 24 24",
                    "fill-rule": "evenodd",
                    "clip-rule": "evenodd",
                    fill: "#999"
                  }, [
                    createVNode("path", { d: "M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" })
                  ]))
                ];
              }
            }),
            _: 2
          }, _parent));
          if (_ctx.$device.isDesktop) {
            _push(`<div class="play" data-v-d5fc3385><i class="fa fa-play-circle" aria-hidden="true" data-v-d5fc3385></i></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="poster" data-v-d5fc3385>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.title ? `/movie/${item == null ? void 0 : item.id}` : `/tv/${item == null ? void 0 : item.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", `${unref(config).public.imgBaseUrl}${item.poster_path}`)} data-v-d5fc3385${_scopeId}>`);
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
            _push(`<div class="play" data-v-d5fc3385><i class="fa fa-play-circle" aria-hidden="true" data-v-d5fc3385></i></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        }
        _push(`<div class="details" data-v-d5fc3385>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.title ? `/movie/${item == null ? void 0 : item.id}` : `/tv/${item == null ? void 0 : item.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="movie-title" data-v-d5fc3385${_scopeId}>${ssrInterpolate(item.title ? item.title : item.name)}</div>`);
            } else {
              return [
                createVNode("div", { class: "movie-title" }, toDisplayString(item.title ? item.title : item.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></section></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const search = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d5fc3385"]]);

export { search as default };
//# sourceMappingURL=search.98775cc5.mjs.map
