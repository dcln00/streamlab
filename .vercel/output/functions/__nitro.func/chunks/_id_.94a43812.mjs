import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './Pending.6d1154df.mjs';
import { H as Head, T as Title } from './components.c1029914.mjs';
import __nuxt_component_1$1 from './Icon.94f694d6.mjs';
import { f as useRoute, g as useRouter, d as useRuntimeConfig, s as storeToRefs, _ as __nuxt_component_0$1 } from './server.mjs';
import { ref, computed, withAsyncContext, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { u as useFetch } from './fetch.e0daf794.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import FsLightbox from 'fslightbox-vue/v3';
import { s as siteSettings } from './index.75eba556.mjs';
import './config.cf183293.mjs';
import '@iconify/vue/dist/offline';
import '@iconify/vue';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const toggler = ref(false);
    const slide = ref(1);
    const route = useRoute();
    const router = useRouter();
    const config = useRuntimeConfig();
    const tvId = computed(() => route.params.id);
    const { data, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`/api/tv/${tvId.value}`, {
      lazy: true
    }, "$nylVLzPp9m")), __temp = await __temp, __restore(), __temp);
    const settings = siteSettings();
    const { meta } = storeToRefs(settings);
    function videoArr() {
      let youtubeKey = [];
      for (let i = 0; i < data.value.videos.results.length; i++) {
        if (data.value.videos.results[i].type === "Trailer" || data.value.videos.results[i].type === "Teaser") {
          youtubeKey[i] = `https://www.youtube.com/watch?v=${data.value.videos.results[i].key}`;
        }
      }
      return youtubeKey.flat();
    }
    const options = [
      {
        name: "cast",
        title: "cast",
        active: true,
        style: "px-0"
      },
      {
        name: "videos",
        title: "videos",
        style: "px-4"
      },
      {
        name: "photos",
        title: "photos"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
      const _component_Error = __nuxt_component_0;
      const _component_Pending = __nuxt_component_1;
      const _component_Head = Head;
      const _component_Title = Title;
      const _component_Icon = __nuxt_component_1$1;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(error)) {
        _push(`<section class="container-fluid d-flex align-items-center justify-content-center" id="warning">`);
        _push(ssrRenderComponent(_component_Error, null, null, _parent));
        _push(`</section>`);
      } else if (unref(pending)) {
        _push(`<section class="container-fluid d-flex align-items-center justify-content-center" id="warning">`);
        _push(ssrRenderComponent(_component_Pending, null, null, _parent));
        _push(`</section>`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_Head, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_Title, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2;
                  if (_push3) {
                    _push3(`${ssrInterpolate(`${(_a2 = unref(data)) == null ? void 0 : _a2.ids.name} - ${unref(meta).title}`)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(`${(_b2 = unref(data)) == null ? void 0 : _b2.ids.name} - ${unref(meta).title}`), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_Title, null, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      createTextVNode(toDisplayString(`${(_a2 = unref(data)) == null ? void 0 : _a2.ids.name} - ${unref(meta).title}`), 1)
                    ];
                  }),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<section class="container-fluid px-0" id="jumbotron-tv">`);
        if (_ctx.$device.isMobileOrTablet) {
          _push(`<div class="back-btn">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "ic:round-keyboard-arrow-left",
            onClick: ($event) => unref(router).back(),
            size: "1.5rem"
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="jumbo-image">`);
        if ((_a = unref(data)) == null ? void 0 : _a.ids.backdrop_path) {
          _push(`<img${ssrRenderAttr("src", `${unref(config).public.imgBackdropBaseUrl}${(_b = unref(data)) == null ? void 0 : _b.ids.backdrop_path}`)} alt="movie backdrop photo">`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="wrap container">`);
        _push(ssrRenderComponent(unref(FsLightbox), {
          toggler: unref(toggler),
          slide: unref(slide),
          sources: videoArr()
        }, null, _parent));
        _push(`<div class="row align-items-center">`);
        if ((_c = unref(data)) == null ? void 0 : _c.ids.poster_path, _ctx.$device.isDesktop) {
          _push(`<div class="col-sm-4 movie-img gs-5"><img${ssrRenderAttr("src", `${unref(config).public.imgBaseUrl}${(_d = unref(data)) == null ? void 0 : _d.ids.poster_path}`)}></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="col-sm-8 movie-details gx-5"><div class="score d-flex align-items-center"><div class="score-tag me-3">TMDb</div><div class="score-number">${ssrInterpolate(`${(_e = unref(data)) == null ? void 0 : _e.ids.vote_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} Reviews`)}</div></div><div class="title">${ssrInterpolate((_f = unref(data)) == null ? void 0 : _f.ids.name)}</div><div class="details d-flex align-items-center"><div class="ratingstv d-flex justify-content-center align-items-center me-3">${ssrInterpolate(((_g = unref(data)) == null ? void 0 : _g.ratings.results.length) > 3 ? (_h = unref(data)) == null ? void 0 : _h.ratings.results[1].rating : "N/A")}</div><div class="year me-3">${ssrInterpolate((_i = unref(data)) == null ? void 0 : _i.ids.first_air_date.slice(0, 4))}</div><div class="time me-3">${ssrInterpolate(`season ${(_j = unref(data)) == null ? void 0 : _j.ids.number_of_seasons}`)}</div>`);
        if (_ctx.$device.isDesktop) {
          _push(`<!--[-->`);
          ssrRenderList((_k = unref(data)) == null ? void 0 : _k.ids.genres, (item, index) => {
            _push(`<div class="genre">${ssrInterpolate(item.name)}</div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (_ctx.$device.isMobileOrTablet) {
          _push(`<!--[-->`);
          ssrRenderList((_l = unref(data)) == null ? void 0 : _l.ids.genres.slice(0, 3), (item, index) => {
            _push(`<div class="genre">${ssrInterpolate(item.name)}</div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="description">${ssrInterpolate((_m = unref(data)) == null ? void 0 : _m.ids.overview)}</div><div class="button"><i class="fa fa-play" aria-hidden="true"></i> Watch Trailer</div></div></div></div></section><section class="container" id="credits"><nav class="nav nav-pills" id="pills-tab" role="tablist"><!--[-->`);
        ssrRenderList(options, (item, index) => {
          _push(`<a${ssrRenderAttr("id", `#${item.name}-tab`)} class="${ssrRenderClass([item.active ? "active" : null, item.style, "nav-link bg-transparent px-0"])}" data-bs-toggle="pill"${ssrRenderAttr("href", `#${item.name}`)} role="tab"${ssrRenderAttr("aria-controls", item.name)} aria-selected="true">${ssrInterpolate(item.title)}</a>`);
        });
        _push(`<!--]--></nav><div class="tab-content" id="pills-tabContent"><div class="tab-pane fade show active" id="cast" role="tabpanel" aria-labelledby="cast-tab">`);
        if (_ctx.$device.isDesktop) {
          _push(`<div class="controls" style="${ssrRenderStyle(((_n = unref(data)) == null ? void 0 : _n.credits.cast.length) > 5 ? null : { display: "none" })}"><div class="left"><i class="fa fa-angle-left" aria-hidden="true"></i></div><div class="right"><i class="fa fa-angle-right" aria-hidden="true"></i></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="credits-container"><!--[-->`);
        ssrRenderList((_o = unref(data)) == null ? void 0 : _o.credits.cast, (item, index) => {
          _push(`<div class="credits">`);
          if (!item.profile_path) {
            _push(`<div class="actor d-flex justify-content-center align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewbox="0 0 24 24" fill-rule="evenodd" clip-rule="evenodd" fill="#999"><path d="M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"></path></svg></div>`);
          } else {
            _push(`<div class="actor"><img${ssrRenderAttr("src", `${unref(config).public.imgBaseUrl}${item.profile_path}`)}></div>`);
          }
          _push(`<div class="details"><div class="actor-name">${ssrInterpolate(item.name)}</div><div class="actor-character">${ssrInterpolate(item.character)}</div></div></div>`);
        });
        _push(`<!--]--></div></div><div class="tab-pane fade" id="videos" role="tabpanel" aria-labelledby="videos-tab"><div class="videos-container">`);
        if (!((_p = unref(data)) == null ? void 0 : _p.videos.results)) {
          _push(`<div class="videos">No videos available</div>`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList((_q = unref(data).videos) == null ? void 0 : _q.results, (item, index) => {
            _push(`<div class="videos" style="${ssrRenderStyle(item.type === "Trailer" || item.type === "Teaser" ? null : { display: "none" })}"><img${ssrRenderAttr("src", `https://img.youtube.com/vi/${item.key}/hqdefault.jpg`)}><div class="play"><i class="fa fa-youtube-play" aria-hidden="true"></i></div></div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div></div><div class="tab-pane fade" id="photos" role="tabpanel" aria-labelledby="photos-tab"><div class="backdrops-container"><!--[-->`);
        ssrRenderList((_r = unref(data)) == null ? void 0 : _r.photos.backdrops.slice(0, 12), (item, index) => {
          _push(`<div class="backdrop"><img${ssrRenderAttr("src", `${unref(config).public.imgBaseUrl}${item.file_path}`)}></div>`);
        });
        _push(`<!--]--></div></div></div></section><section class="container" id="rec" style="${ssrRenderStyle(((_s = unref(data)) == null ? void 0 : _s.rec.results.length) != 0 ? null : { display: "none" })}"><div class="title">More like this</div>`);
        if (_ctx.$device.isDesktop) {
          _push(`<div class="controls" style="${ssrRenderStyle(((_t = unref(data)) == null ? void 0 : _t.rec.results.length) > 5 ? null : { display: "none" })}"><div class="left"><i class="fa fa-angle-left" aria-hidden="true"></i></div><div class="right"><i class="fa fa-angle-right" aria-hidden="true"></i></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="rec-container"><!--[-->`);
        ssrRenderList((_u = unref(data)) == null ? void 0 : _u.rec.results.slice(0, 10), (item, index) => {
          _push(`<div class="rec"><div class="poster">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/tv/${item == null ? void 0 : item.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", `${unref(config).public.imgBaseUrl}${item.poster_path}`)}${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: `${unref(config).public.imgBaseUrl}${item.poster_path}`
                  }, null, 8, ["src"])
                ];
              }
            }),
            _: 2
          }, _parent));
          if (_ctx.$device.isDesktop) {
            _push(`<div class="play"><i class="fa fa-play-circle" aria-hidden="true"></i></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><div class="details">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/tv/${item == null ? void 0 : item.id}`
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="movie-title"${_scopeId}>${ssrInterpolate(item.name)}</div>`);
              } else {
                return [
                  createVNode("div", { class: "movie-title" }, toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="other"><div class="time"><i class="fa fa-star" aria-hidden="true"></i> ${ssrInterpolate(`${Math.round(item.vote_average / 10 * 100)}%`)}</div></div></div></div>`);
        });
        _push(`<!--]--></div></section></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tv/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_.94a43812.mjs.map
