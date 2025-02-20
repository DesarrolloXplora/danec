import { mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import Flipbook from "flipbook-vue";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
const _sfc_main = {
  __name: "como-funciona",
  __ssrInlineRender: true,
  setup(__props) {
    const pages = [
      "https://storage.googleapis.com/static-content-seed/danec/hola.png",
      "https://storage.googleapis.com/static-content-seed/danec/hola.png",
      "https://storage.googleapis.com/static-content-seed/danec/hola.png"
    ];
    const flipOptions = {
      width: 550,
      height: 733,
      showCover: true
      // you can include additional options as documented by flipbook-vue
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flipbook-wrapper" }, _attrs))} data-v-90a88f32>`);
      _push(ssrRenderComponent(unref(Flipbook), {
        pages,
        options: flipOptions
      }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/como-funciona.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const comoFunciona = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-90a88f32"]]);
export {
  comoFunciona as default
};
//# sourceMappingURL=como-funciona-GkFR6oKU.js.map
