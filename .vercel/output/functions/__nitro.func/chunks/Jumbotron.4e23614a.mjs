import { d as useRuntimeConfig, e as createError, _ as __nuxt_component_0$1 } from './server.mjs';
import { ref, computed, withAsyncContext, mergeProps, unref, withCtx, openBlock, createBlock, createCommentVNode, createVNode, useSSRContext } from 'vue';
import { u as useFetch } from './fetch.e0daf794.mjs';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import FsLightbox from 'fslightbox-vue/v3';
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
  __name: "Jumbotron",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const toggler = ref(false);
    const slide = ref(1);
    const config = useRuntimeConfig();
    const popular = computed(() => `/api/listings`);
    const { data, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(popular, {
      cache: 1e3 * 60 * 5,
      lazy: true
    }, "$0yRA7Z4W43")), __temp = await __temp, __restore(), __temp);
    if (error.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "Page Not Found",
        fatal: true
      });
    }
    const id = (_a = data.value) == null ? void 0 : _a.popularMovies.results[0].id;
    const { data: single } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/movies/${id}`, {
      immediate: true
    }, "$SsoFJfFBe6")), __temp = await __temp, __restore(), __temp);
    function videoArr() {
      let youtubeKey = [];
      for (let i = 0; i < single.value.videos.results.length; i++) {
        if (single.value.videos.results[i].type === "Trailer" || single.value.videos.results[i].type === "Teaser") {
          youtubeKey[i] = `https://www.youtube.com/watch?v=${single.value.videos.results[i].key}`;
        }
      }
      return youtubeKey.flat().slice(0, 1);
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: "container-fluid px-0",
        id: "jumbotron"
      }, _attrs))}><div class="jumbo-image"><img${ssrRenderAttr("src", `${unref(config).public.imgBackdropBaseUrl}${(_a2 = unref(data)) == null ? void 0 : _a2.popularMovies.results[0].backdrop_path}`)} alt="featured movie poster"></div><div class="wrap container"><div class="row"><div class="col-sm-6 movie-details">`);
      if (_ctx.$device.isDesktop) {
        _push(`<div class="score d-flex align-items-center"><div class="score-tag me-3">TMDb</div><div class="score-number">${ssrInterpolate((_b = unref(data)) == null ? void 0 : _b.popularMovies.results[0].vote_average)}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="title">${ssrInterpolate(unref(data).popularMovies.results[0].title)}</div><div class="details d-flex align-items-center">`);
      if (_ctx.$device.isDesktop) {
        _push(`<div class="ratings d-flex justify-content-center align-items-center me-3">${ssrInterpolate(((_c = unref(data)) == null ? void 0 : _c.popularMovies.results[0].adult) ? "PG" : "G")}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$device.isDesktop) {
        _push(`<div class="year me-3">${ssrInterpolate((_d = unref(data)) == null ? void 0 : _d.popularMovies.results[0].release_date.split("-")[0])}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (_ctx.$device.isDesktop) {
        _push(`<div class="time me-3">${ssrInterpolate(`${Math.floor(((_e = unref(single)) == null ? void 0 : _e.ids.runtime) / 60)} hr ${((_f = unref(single)) == null ? void 0 : _f.ids.runtime) % 60} mins`)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList((_g = unref(data)) == null ? void 0 : _g.popularMovies.results[0].genre_ids, (item, index) => {
        var _a3;
        _push(`<div class="genre"><!--[-->`);
        ssrRenderList((_a3 = unref(data)) == null ? void 0 : _a3.movieGenres.genres, (n) => {
          _push(`<div>${ssrInterpolate(item === n.id ? n.name : null)}</div>`);
        });
        _push(`<!--]--></div>`);
      });
      _push(`<!--]--></div>`);
      if (_ctx.$device.isDesktop) {
        _push(`<div class="description">${ssrInterpolate((_h = unref(data)) == null ? void 0 : _h.popularMovies.results[0].overview)}</div>`);
      } else if (_ctx.$device.isMobileOrTablet) {
        _push(`<div class="description">${ssrInterpolate(((_i = unref(data)) == null ? void 0 : _i.popularMovies.results[0].overview.slice(0, 120)) + "...")}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/movie/${(_j = unref(data)) == null ? void 0 : _j.popularMovies.results[0].id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.$device.isDesktop) {
              _push2(`<div class="button"${_scopeId}>Watch now</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              _ctx.$device.isDesktop ? (openBlock(), createBlock("div", {
                key: 0,
                class: "button"
              }, "Watch now")) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (_ctx.$device.isDesktop) {
        _push(`<div class="col-sm-6 trailer-details d-flex justify-content-center align-items-center"><div class="playbutton d-flex justify-content-center align-items-center"><div class="trailer-icon"><svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewbox="0 0 55 55"><circle cx="27.5" cy="27.5" r="26.75" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"></path></svg></div><div class="trailer-text">watch trailer</div></div></div>`);
      } else if (_ctx.$device.isMobileOrTablet) {
        _push(`<div class="col-sm-6 trailer-details d-flex justify-content-center align-items-center">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/movie/${(_k = unref(data).popularMovies) == null ? void 0 : _k.results[0].id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="trailer-icon"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewbox="0 0 55 55"${_scopeId}><circle cx="27.5" cy="27.5" r="26.75" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"${_scopeId}></circle><path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"${_scopeId}></path></svg></div>`);
            } else {
              return [
                createVNode("div", { class: "trailer-icon" }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "55",
                    height: "55",
                    viewbox: "0 0 55 55"
                  }, [
                    createVNode("circle", {
                      cx: "27.5",
                      cy: "27.5",
                      r: "26.75",
                      fill: "none",
                      stroke: "#fff",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "1.5"
                    }),
                    createVNode("path", {
                      fill: "none",
                      stroke: "#fff",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "1.5",
                      d: "M20.97 40.81L40.64 27.5 20.97 14.19v26.62z"
                    })
                  ]))
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(unref(FsLightbox), {
        toggler: unref(toggler),
        slide: unref(slide),
        sources: videoArr()
      }, null, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Jumbotron.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=Jumbotron.4e23614a.mjs.map
