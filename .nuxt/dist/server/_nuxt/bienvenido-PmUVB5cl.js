import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { u as useRouter } from "../server.mjs";
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
  __name: "bienvenido",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex justify-end items-center sm:p-6 lg:px-24 main-hola" }, _attrs))}><div class="flex flex-col items-end xl:w-1/3 lg:w-1/2 sm:w-auto"><div class="w-full p-12 rounded-3xl text-center"><p class="text-5xl uppercase text-bold py-2">¡Hola!</p><p class="text-2xl uppercase py-2">Nombre Apellido</p><p class="text-xl uppercase font-bold py-2">&quot;Pastelería ABC&quot;</p><button type="button" class="w-full bg-main text-white py-2 rounded-3xl hover:bg-main transition duration-200 uppercase"> Continuar </button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/bienvenido.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=bienvenido-PmUVB5cl.js.map
