import { useSSRContext, defineAsyncComponent } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { a as _export_sfc } from './server.mjs';
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

const __nuxt_component_0_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./AppHeader.5846a574.mjs').then((m) => m.default || m));
const __nuxt_component_1_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./MobileNav.59164c3a.mjs').then((m) => m.default || m));
const __nuxt_component_2_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./AppFooter.21665c08.mjs').then((m) => m.default || m));
const __nuxt_component_3_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./MobileFooter.d2b24c87.mjs').then((m) => m.default || m));
function ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_LazyAppHeader = __nuxt_component_0_lazy;
  const _component_LazyMobileNav = __nuxt_component_1_lazy;
  const _component_LazyAppFooter = __nuxt_component_2_lazy;
  const _component_LazyMobileFooter = __nuxt_component_3_lazy;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  if (_ctx.$device.isDesktop) {
    _push(ssrRenderComponent(_component_LazyAppHeader, null, null, _parent));
  } else if (_ctx.$device.isMobileOrTablet) {
    _push(ssrRenderComponent(_component_LazyMobileNav, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`<main>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</main>`);
  if (_ctx.$device.isDesktop) {
    _push(ssrRenderComponent(_component_LazyAppFooter, null, null, _parent));
  } else if (_ctx.$device.isMobileOrTablet) {
    _push(ssrRenderComponent(_component_LazyMobileFooter, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_main = {};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", ssrRender]]);

export { _default as default };
//# sourceMappingURL=default.7a04bfb1.mjs.map
