import { s as storeToRefs, _ as __nuxt_component_0$1 } from './server.mjs';
import { mergeProps, withCtx, unref, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "AppFooter",
  __ssrInlineRender: true,
  setup(__props) {
    const settings = siteSettings();
    const { meta } = storeToRefs(settings);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "container-fluid px-5 d-flex align-items-center" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="title"${_scopeId}>${ssrInterpolate(unref(meta).title)}</div>`);
          } else {
            return [
              createVNode("div", { class: "title" }, toDisplayString(unref(meta).title), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="powered ms-5">Powered by <a href="https://www.themoviedb.org/documentation/api">Tmdb API</a></div><div class="copyright ms-auto">Designed and Developed by Nii Aryeh x Ayvas dev.</div></footer>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/global/AppFooter.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=AppFooter.21665c08.mjs.map
