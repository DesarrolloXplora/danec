import { u as useFetch, H as Head, T as Title } from "./fetch-BoKU0195.js";
import { mergeProps, useSSRContext, withAsyncContext, withCtx, unref, createTextVNode, toDisplayString, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc, a as useRoute, c as createError } from "../server.mjs";
import "@unhead/shared";
import "ohash";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
const _sfc_main$1 = {
  __name: "ProductDetails",
  __ssrInlineRender: true,
  props: ["product"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "card" }, _attrs))} data-v-39751338><div class="grid grid-cols-2 gap-10" data-v-39751338><div class="p-7" data-v-39751338><img${ssrRenderAttr("src", __props.product.image)} alt="product thumb" class="mx-auto my-7" data-v-39751338></div><div class="p-7" data-v-39751338><h2 class="text-4xl my-7" data-v-39751338>${ssrInterpolate(__props.product.title)}</h2><p class="text-xl my-7" data-v-39751338>Precio: $${ssrInterpolate(__props.product.price)}</p><h3 class="font-bold border-b-2 mb-4 pb-2" data-v-39751338>Detalles:</h3><p class="mb-7" data-v-39751338>${ssrInterpolate(__props.product.description)}</p><button class="btn flex" data-v-39751338><i class="material-icons mr-2" data-v-39751338>add_shopping_cart</i><span data-v-39751338>Añadir al carrito</span></button></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductDetails.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-39751338"]]);
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { id } = useRoute().params;
    const uri = "https://fakestoreapi.com/products/" + id;
    const { data: product } = ([__temp, __restore] = withAsyncContext(() => useFetch(uri, { key: id }, "$BWTRPCdvxE")), __temp = await __temp, __restore(), __temp);
    if (!product.value) {
      throw createError({ statusCode: 404, statusMessage: "Producto no encontrado", fatal: true });
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_ProductDetails = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_Head, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Title, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Programa | ${ssrInterpolate(unref(product).title)}`);
                } else {
                  return [
                    createTextVNode("Programa | " + toDisplayString(unref(product).title), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_Title, null, {
                default: withCtx(() => [
                  createTextVNode("Programa | " + toDisplayString(unref(product).title), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ProductDetails, { product: unref(product) }, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/catalogo/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=_id_-B4N0Vrw2.js.map
