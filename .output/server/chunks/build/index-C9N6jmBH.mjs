import { unref, withCtx, createVNode, createBlock, openBlock, Fragment, renderList, defineComponent, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { _ as _export_sfc } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Miniextract",
  __ssrInlineRender: true,
  setup(__props) {
    const points = ref([
      { name: "1", pdv: "Tienda A", lastMonth: 50, won: 200, spent: 100 },
      { name: "2", pdv: "Tienda B", lastMonth: 30, won: 150, spent: 50 }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded p-4 shadow-none" }, _attrs))} data-v-79e82fd0><div class="font-bold text-center text-ml mb-4" data-v-79e82fd0> Actualizaci\xF3n de mis puntos </div><table class="miniextract w-full" data-v-79e82fd0><thead class="primary_color text-center headTable" data-v-79e82fd0><tr data-v-79e82fd0><th class="borderTableLeft p-2" data-v-79e82fd0>Punto de Venta</th><th class="p-2" data-v-79e82fd0><img src="https://storage.googleapis.com/static-content-seed/celima/icons/meses.png" alt="Meses" class="indicatorImg inline-block mr-1" data-v-79e82fd0> Puntos cargados \xFAltima vez </th><th class="p-2" data-v-79e82fd0><img src="https://storage.googleapis.com/static-content-seed/celima/icons/acumulados.png" alt="Acumulados" class="indicatorImg inline-block mr-1" data-v-79e82fd0> Puntos acumulados </th><th class="p-2" data-v-79e82fd0><img src="https://storage.googleapis.com/static-content-seed/celima/icons/canjeados.png" alt="Canjeados" class="indicatorImg inline-block mr-1" data-v-79e82fd0> Puntos cargados </th></tr></thead><tbody data-v-79e82fd0><!--[-->`);
      ssrRenderList(points.value, (item) => {
        _push(`<tr class="text-center secondary_color" data-v-79e82fd0><td class="p-2" data-v-79e82fd0>${ssrInterpolate(item.pdv)}</td><td class="p-2" data-v-79e82fd0>${ssrInterpolate(item.lastMonth)}</td><td class="p-2" data-v-79e82fd0>${ssrInterpolate(item.won)}</td><td class="p-2" data-v-79e82fd0>${ssrInterpolate(item.spent || 0)}</td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Miniextract.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Miniextract = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-79e82fd0"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const slides = [
      { image: "https://storage.googleapis.com/static-content-seed/danec/banners/banner1.png", title: "First Slide" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-03c49eb0>`);
      _push(ssrRenderComponent(unref(Swiper), {
        modules: [unref(Navigation), unref(Pagination), unref(Autoplay)],
        "space-between": 20,
        "slides-per-view": 1,
        loop: true,
        autoplay: { delay: 3e3 },
        pagination: "",
        navigation: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(slides, (slide, index2) => {
              _push2(ssrRenderComponent(unref(SwiperSlide), { key: index2 }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img${ssrRenderAttr("src", slide.image)}${ssrRenderAttr("alt", slide.title)} class="w-full h-auto object-cover rounded-lg" data-v-03c49eb0${_scopeId2}>`);
                  } else {
                    return [
                      createVNode("img", {
                        src: slide.image,
                        alt: slide.title,
                        class: "w-full h-auto object-cover rounded-lg"
                      }, null, 8, ["src", "alt"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(slides, (slide, index2) => {
                return createVNode(unref(SwiperSlide), { key: index2 }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      src: slide.image,
                      alt: slide.title,
                      class: "w-full h-auto object-cover rounded-lg"
                    }, null, 8, ["src", "alt"])
                  ]),
                  _: 2
                }, 1024);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(Miniextract, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-03c49eb0"]]);

export { index as default };
//# sourceMappingURL=index-C9N6jmBH.mjs.map
