import { s as storeToRefs, _ as __nuxt_component_0$1, a as _export_sfc } from './server.mjs';
import { ref, mergeProps, withCtx, unref, createVNode, toDisplayString, isRef, useSSRContext, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { s as siteSettings, a as searchQuery } from './index.75eba556.mjs';
import { _ as _sfc_main$3 } from './AppSearch.1a457065.mjs';
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
import './Icon.94f694d6.mjs';
import './config.cf183293.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

function ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "hamburger" }, _attrs))}><span></span></div>`);
}
const _sfc_main$2 = {};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/Hamburger.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", ssrRender]]);
const _sfc_main$1 = {
  __name: "AppNav",
  __ssrInlineRender: true,
  props: {
    show: Boolean
  },
  setup(__props) {
    const settings = siteSettings();
    const { nav } = storeToRefs(settings);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (__props.show) {
        _push(`<nav${ssrRenderAttrs(mergeProps({ class: "d-flex ms-5" }, _attrs))}><!--[-->`);
        ssrRenderList(unref(nav), (item, index) => {
          _push(`<div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: item.path,
            activeClass: "active-link"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></nav>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/AppNav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "AppHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const settings = siteSettings();
    const search = searchQuery();
    const { term } = storeToRefs(search);
    const { meta } = storeToRefs(settings);
    let showNav = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Nuxt_link = __nuxt_component_0$1;
      const _component_Hamburger = __nuxt_component_1;
      const _component_AppNav = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_AppSearch = _sfc_main$3;
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "container-fluid" }, _attrs))}><div class="wrap container d-flex justify-content-center align-items-center">`);
      _push(ssrRenderComponent(_component_Nuxt_link, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="logo pe-5"${_scopeId}>${ssrInterpolate(unref(meta).title)}</div>`);
          } else {
            return [
              createVNode("div", { class: "logo pe-5" }, toDisplayString(unref(meta).title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_Hamburger, {
        onClick: ($event) => isRef(showNav) ? showNav.value = !unref(showNav) : showNav = !unref(showNav)
      }, null, _parent));
      _push(ssrRenderComponent(_component_AppNav, { show: unref(showNav) }, null, _parent));
      _push(`<div class="search ms-auto">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/search" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_AppSearch, {
              modelValue: unref(term),
              "onUpdate:modelValue": ($event) => isRef(term) ? term.value = $event : null,
              modelModifiers: { lazy: true }
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_AppSearch, {
                modelValue: unref(term),
                "onUpdate:modelValue": ($event) => isRef(term) ? term.value = $event : null,
                modelModifiers: { lazy: true }
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></header>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/AppHeader.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AppHeader.5846a574.mjs.map
