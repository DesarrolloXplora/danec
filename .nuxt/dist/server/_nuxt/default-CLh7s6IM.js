import { _ as __nuxt_component_0 } from "./nuxt-link-B6Q1TRD6.js";
import { ref, withCtx, createVNode, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import "ufo";
import "../server.mjs";
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
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}><header class="shadow-sm bg-white"><nav class="container mx-auto p-4 flex justify-between items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "font-bold"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="main-logo" src="https://storage.googleapis.com/static-content-seed/danec/logo-red.png" alt="logo"${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                class: "main-logo",
                src: "https://storage.googleapis.com/static-content-seed/danec/logo-red.png",
                alt: "logo"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<ul class="flex gap-4"><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/bienvenido" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Inicio`);
          } else {
            return [
              createTextVNode("Inicio")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/como-funciona" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Cómo funciona`);
          } else {
            return [
              createTextVNode("Cómo funciona")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/mis-puntos" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mis Puntos`);
          } else {
            return [
              createTextVNode("Mis Puntos")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/catalogo" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Catálogo`);
          } else {
            return [
              createTextVNode("Catálogo")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li><li>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/mis-canjes" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Mis Canjes`);
          } else {
            return [
              createTextVNode("Mis Canjes")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul><div class="relative main-dropdown"><button class="focus:outline-none flex items-center bg-main p-2 text-white"${ssrRenderAttr("aria-expanded", isOpen.value.toString())}><span class="material-icons text-2xl">account_circle</span><span class="material-icons text-2xl">keyboard_arrow_down</span></button>`);
      if (isOpen.value) {
        _push(`<div class="absolute right-0 mt-2 w-48 bg-white shadow-lg border rounded">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/mi-cuenta",
          class: "block px-4 py-2 hover:bg-gray-100"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Mi Cuenta `);
            } else {
              return [
                createTextVNode(" Mi Cuenta ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "block px-4 py-2 hover:bg-gray-100"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Salir `);
            } else {
              return [
                createTextVNode(" Salir ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></nav></header>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=default-CLh7s6IM.js.map
