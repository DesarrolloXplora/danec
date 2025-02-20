import { _ as __nuxt_component_0 } from "./nuxt-link-B6Q1TRD6.js";
import { defineComponent, ref, computed, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "mi-cuenta",
  __ssrInlineRender: true,
  setup(__props) {
    const dialog = ref(false);
    const user = ref({
      avatar: "",
      terms: false
    });
    const barSkill = ref(50);
    const check = ref(false);
    const fields = ref([
      { index: 1, type: "text", value: "", name: "Nombre", disabled: false },
      { index: 2, type: "email", value: "", name: "Correo", disabled: false }
      // Add additional fields as necessary
    ]);
    const filled = computed(() => fields.value.every((field) => field.value && !field.disabled));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-bg" }, _attrs))}><div class="container mx-auto px-4"><div class="flex flex-col md:flex-row justify-center items-start"><div class="w-full md:w-1/3 p-4"><div class="mx-auto"><div class="text-center font-extrabold text-2xl text-primary_color"> Apunta <br> tus datos </div><div class="text-center my-6"><div class="cursor-pointer mx-auto border border-secondary_color rounded-full w-48 h-48 overflow-hidden"><img${ssrRenderAttr("src", user.value.avatar || "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light")} alt="Avatar" class="object-cover w-full h-full"></div><div class="relative mt-8 mx-auto" style="${ssrRenderStyle({ "width": "35%", "height": "25px", "border-radius": "20px", "background-color": "#e5e7eb" })}"><div style="${ssrRenderStyle({ width: Math.ceil(barSkill.value) + "%", backgroundColor: "#2bb8d9" })}" class="h-full rounded"></div><div class="absolute inset-0 flex justify-center items-center"><strong>${ssrInterpolate(Math.ceil(barSkill.value))}%</strong></div></div><p class="mt-6 mx-10 text-sm text-secondary_color"> *Debes cumplir el <span class="font-bold">100%</span> para ver el contenido </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/password",
        class: "bg-secondary_color mb-4 font-bold uppercase inline-block py-2 px-4 rounded"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cambiar contraseña `);
          } else {
            return [
              createTextVNode(" Cambiar contraseña ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="w-full md:w-2/3 p-4 text-secondary_color"><p class="text-left text-sm mb-4"><span class="text-primary_color">*</span> Campos Obligatorios </p><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
      ssrRenderList(fields.value, (r) => {
        _push(`<div class="py-1">`);
        if (r.type !== "button") {
          _push(`<div><label class="block text-sm font-medium mb-1">${ssrInterpolate(r.name)} * </label><input${ssrRenderDynamicModel(r.type, r.value, null)}${ssrRenderAttr("type", r.type)}${ssrIncludeBooleanAttr(r.disabled) ? " readonly" : ""} class="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="mt-4"><label class="flex items-center text-sm"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(check.value) ? ssrLooseContain(check.value, null) : check.value) ? " checked" : ""} required class="mr-2"><span> Autorizo el <a target="_blank" href="https://storage.googleapis.com/static-content-seed/celima/personales.pdf" class="underline ml-1" title="Ver documento"> uso de datos </a> y envío de comunicación por correo electrónico y celular </span></label></div><div class="mt-4"><label class="flex items-center text-sm"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(user.value.terms) ? ssrLooseContain(user.value.terms, null) : user.value.terms) ? " checked" : ""} required class="mr-2"><span> Acepto <a target="_blank" href="https://storage.googleapis.com/static-content-seed/danec/terms.pdf" class="underline ml-1" title="Ver documento"> Términos y Condiciones </a></span></label></div><div class="mt-6 text-center"><button class="bg-primary_color text-white px-6 py-2 rounded">${ssrInterpolate(filled.value ? "Actualizar" : "Actualizar y continuar")}</button></div></div></div></div>`);
      if (dialog.value) {
        _push(`<div class="fixed inset-0 flex items-center justify-center z-50"><div class="absolute inset-0 bg-black opacity-50"></div><div class="bg-white rounded shadow-lg z-10 max-w-lg w-full p-6"><div><label class="block mb-2 font-medium">Avatar</label><input type="file" accept="image/png, image/jpeg, image/jpg, image/bmp" class="block w-full"></div><div class="mt-4 flex justify-end"><button class="bg-blue-700 text-white px-4 py-2 rounded"> Guardar </button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/mi-cuenta.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=mi-cuenta-DHSpZ4rs.js.map
