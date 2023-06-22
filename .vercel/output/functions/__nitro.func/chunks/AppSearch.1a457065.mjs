import __nuxt_component_1 from './Icon.94f694d6.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main = {
  __name: "AppSearch",
  __ssrInlineRender: true,
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      if (_ctx.$device.isDesktop) {
        _push(`<input${ssrRenderAttrs(mergeProps({
          placeholder: "Search",
          type: "text",
          value: __props.modelValue
        }, _attrs))}>`);
      } else if (_ctx.$device.isMobileOrTablet) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "input-group" }, _attrs))}><span class="input-group-text" id="input-group-left-example">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:outline-search",
          size: "1.2rem"
        }, null, _parent));
        _push(`</span><input placeholder="Search" type="text"${ssrRenderAttr("value", __props.modelValue)}></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/search/AppSearch.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=AppSearch.1a457065.mjs.map
