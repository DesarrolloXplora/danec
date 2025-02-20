import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr } from "vue/server-renderer";
import "hookable";
import { u as useRouter } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
const _sfc_main = {
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useRouter();
    const email = ref("");
    const password = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex justify-end items-center px-8" }, _attrs))}><div class="flex flex-col items-end lg:w-1/3 sm:w-auto"><div class="mb-6 w-full flex justify-center"><img src="https://storage.googleapis.com/static-content-seed/danec/logo-white.png" alt="Logo" class="w-72"></div><div class="w-full bg-white p-12 rounded-3xl shadow-lg text-center"><span class="text-4xl font-bold">¡Bienvenido!</span><form class="my-5"><div class="mb-4"><input type="text" id="email"${ssrRenderAttr("value", email.value)} required placeholder="Usuario" class="mt-1 w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring focus:border-red-400"></div><div class="mb-6"><input type="password" id="password"${ssrRenderAttr("value", password.value)} required placeholder="Contraseña" class="mt-1 w-full px-3 py-2 border rounded-3xl focus:outline-none focus:ring focus:border-red-400"></div><button type="submit" class="w-full bg-main text-white py-2 rounded-3xl hover:bg-main transition duration-200"> Entrar </button><a href=""></a></form></div><div class="self-center mt-4 flex flex-col items-center"><span class="text-sm text-white flex items-center gap-1"> click aquí <span class="material-icons text-sm">keyboard_arrow_down</span></span><div class="mt-0"><img src="https://storage.googleapis.com/static-content-seed/danec/logo-home.png" alt="Logo" class="w-24"></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-DRFv-sr-.js.map
