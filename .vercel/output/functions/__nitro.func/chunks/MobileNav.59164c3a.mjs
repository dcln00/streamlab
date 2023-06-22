import { s as storeToRefs, _ as __nuxt_component_0$1 } from './server.mjs';
import __nuxt_component_1 from './Icon.94f694d6.mjs';
import { mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
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
import './config.cf183293.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';

const _sfc_main = {
  __name: "MobileNav",
  __ssrInlineRender: true,
  setup(__props) {
    const settings = siteSettings();
    const { mobileNav } = storeToRefs(settings);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "container-fluid px-0 d-flex justify-content-around align-items-center mobile" }, _attrs))}><!--[-->`);
      ssrRenderList(unref(mobileNav), (item, index) => {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: item.path,
          activeClass: "active-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Icon, {
                name: item.icon,
                size: "1.5em"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Icon, {
                  name: item.icon,
                  size: "1.5em"
                }, null, 8, ["name", "size"])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></nav>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/MobileNav.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=MobileNav.59164c3a.mjs.map
