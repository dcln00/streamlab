import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Pending.6d1154df.mjs';
import { H as Head, T as Title } from './components.c1029914.mjs';
import { f as useRoute, d as useRuntimeConfig, s as storeToRefs, _ as __nuxt_component_0$1 } from './server.mjs';
import { computed, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { u as useFetch } from './fetch.e0daf794.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
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

const _sfc_main = {
  __name: "[query]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const config = useRuntimeConfig();
    const query = computed(() => route.params.query);
    const { data, error, pending } = useFetch(`/api/tv/category/${query.value}`, "$WwS63llRg9");
    const settings = siteSettings();
    const { meta } = storeToRefs(settings);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Error = __nuxt_component_0;
      const _component_Pending = __nuxt_component_1;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(error)) {
        _push(`<section class="container-fluid d-flex align-items-center justify-content-center" id="warning">`);
        _push(ssrRenderComponent(_component_Error, null, null, _parent));
        _push(`</section>`);
      } else if (unref(pending)) {
        _push(`<section class="container-fluid d-flex align-items-center justify-content-center" id="warning">`);
        _push(ssrRenderComponent(_component_Pending, null, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_Head, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Title, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(`${unref(query).charAt(0).toUpperCase() + unref(query).slice(1)} TV Shows - ${unref(meta).title}`)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(`${unref(query).charAt(0).toUpperCase() + unref(query).slice(1)} TV Shows - ${unref(meta).title}`), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Title, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(`${unref(query).charAt(0).toUpperCase() + unref(query).slice(1)} TV Shows - ${unref(meta).title}`), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<section class="container-fluid" id="jumbo-page"><div class="jumbo-image"><img${ssrRenderAttr("src", `${unref(config).public.imgBackdropBaseUrl}${(_a = unref(data)) == null ? void 0 : _a.results[0].backdrop_path}`)} alt="featured TV poster"></div><div class="wrap container d-flex justify-content-center align-items-center"><div class="title">${ssrInterpolate(`${unref(query)} TV Shows`)}</div></div></section><section class="container" id="listing"><div class="listing-container"><!--[-->`);
        ssrRenderList((_b = unref(data)) == null ? void 0 : _b.results, (item, index) => {
          _push(`<div class="list"><div class="poster">`);
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
            to: `/tv/${item.id}`
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
          _push(`<div class="other d-flex"><div class="time"><i class="fa fa-star" aria-hidden="true"></i> ${ssrInterpolate(`${Math.round(item.vote_average / 10 * 100)}%`)}</div></div></div></div>`);
        });
        _push(`<!--]--></div></section></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tv/category/[query].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_query_.edf9f7a2.mjs.map
