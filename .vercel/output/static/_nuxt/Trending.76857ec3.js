import{y as v,i as y,k,o,c as n,d as e,a as r,w as l,b as x,I as B,J as C,K as N,l as d,t as S,_ as $}from"./entry.173e41ed.js";import{u as w}from"./fetch.4554c3a5.js";const V={class:"container",id:"trending"},b={class:"heading d-flex align-items-center"},T=e("div",{class:"title"},"Trending",-1),q={class:"explore ms-auto"},D={key:0,class:"controls"},E=e("i",{class:"fa fa-angle-left","aria-hidden":"true"},null,-1),F=[E],K=e("i",{class:"fa fa-angle-right","aria-hidden":"true"},null,-1),L=[K],M={class:"trending-container"},z={class:"poster"},A=["src"],H=e("div",{class:"play"},[e("i",{class:"fa fa-play-circle","aria-hidden":"true"})],-1),I={class:"details"},J={class:"movie-title"},O={__name:"Trending",async setup(R){let s,i;const _=v(),u=y(()=>"/api/listings"),{data:h}=([s,i]=k(()=>w(u,"$gidHolKbzo")),s=await s,i(),s);function g(){document.querySelector(".trending-container").scrollBy(-600,0)}function p(){document.querySelector(".trending-container").scrollBy(600,0)}return(f,U)=>{var c;const a=$;return o(),n("section",V,[e("div",b,[T,e("div",q,[r(a,{to:"/movie/category/trending"},{default:l(()=>[x("Explore More")]),_:1})])]),f.$device.isDesktop?(o(),n("div",D,[e("div",{class:"left",onClick:g},F),e("div",{class:"right",onClick:p},L)])):B("",!0),e("div",M,[(o(!0),n(C,null,N((c=d(h))==null?void 0:c.trendingMovies.results.slice(0,5),(t,m)=>(o(),n("div",{class:"trending",key:m},[e("div",z,[r(a,{to:`/movie/${t==null?void 0:t.id}`},{default:l(()=>[e("img",{src:`${d(_).public.imgBaseUrl}${t.poster_path}`},null,8,A)]),_:2},1032,["to"]),H,e("div",I,[e("div",J,S(t.title),1)])])]))),128))])])}}};export{O as default};
