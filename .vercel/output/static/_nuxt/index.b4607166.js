import{e as y,H as M,y as S,i as w,k as T,o as I,c as b,a as o,w as d,d as a,l as t,b as k,t as A,z as B,A as C,aU as H,aS as V}from"./entry.173e41ed.js";import{H as $,T as j}from"./components.a419fb84.js";import{u as z}from"./fetch.4554c3a5.js";import{s as E}from"./index.54fa7a22.js";const L=B(()=>C(()=>import("./MovieList.4fb70331.js"),["./MovieList.4fb70331.js","./entry.173e41ed.js","./entry.9f55bd47.css","./fetch.4554c3a5.js"],import.meta.url).then(e=>e.default||e)),N=e=>(H("data-v-1efffa4c"),e=e(),V(),e),P={class:"container-fluid px-0",id:"jumbo-page"},R={class:"jumbo-image"},D=["src"],Q=N(()=>a("div",{class:"wrap container d-flex justify-content-center align-items-center"},[a("div",{class:"title"},"Movies")],-1)),U={__name:"index",async setup(e){let n,c;const m=E(),{meta:f}=M(m),h=S(),g=w(()=>"/api/listings"),{data:s}=([n,c]=T(()=>z(g,"$QSA0QSIS7s")),n=await n,c(),n);return(F,O)=>{var r,l,p,_,u;const v=j,x=$,i=L;return I(),b("div",null,[o(x,null,{default:d(()=>[o(v,null,{default:d(()=>[k(A(`Movies - ${t(f).title}`),1)]),_:1})]),_:1}),a("section",P,[a("div",R,[a("img",{src:`${t(h).public.imgBackdropBaseUrl}${(l=t(s))==null?void 0:l.popularMovies.results[Math.floor(Math.random()*((r=t(s))==null?void 0:r.popularMovies.results.length))].backdrop_path}`,alt:"featured movie poster"},null,8,D)]),Q]),o(i,{heading:{name:"Trending Movies",url:"/movie/category/trending"},show:!0,"fetch-params":(p=t(s))==null?void 0:p.trendingMovies.results.slice(0,15)},null,8,["fetch-params"]),o(i,{heading:{name:"Popular Movies",url:"/movie/category/popular"},show:!0,"fetch-params":(_=t(s))==null?void 0:_.popularMovies.results.slice(0,15)},null,8,["fetch-params"]),o(i,{heading:{name:"Coming Soon",url:"/movie/category/upcoming"},show:!1,"fetch-params":(u=t(s))==null?void 0:u.upcomingMovies.results.slice(0,15)},null,8,["fetch-params"])])}}},W=y(U,[["__scopeId","data-v-1efffa4c"]]);export{W as default};