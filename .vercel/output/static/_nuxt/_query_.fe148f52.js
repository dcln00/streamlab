import{_ as B,a as N}from"./Pending.276c053c.js";import{H as T,T as V}from"./components.a419fb84.js";import{F as C,y as H,i as M,H as q,o as t,c as o,l as n,a as i,w as a,d as s,t as c,J as D,K as F,b as v,I as f,_ as R}from"./entry.173e41ed.js";import{u as U}from"./fetch.4554c3a5.js";import{s as E}from"./index.54fa7a22.js";const I={key:0,class:"container-fluid d-flex align-items-center justify-content-center",id:"warning"},J={key:1,class:"container-fluid d-flex align-items-center justify-content-center",id:"warning"},L={key:2},S={class:"container-fluid px-0",id:"jumbo-page"},A={class:"jumbo-image"},K=["src"],O={class:"wrap container d-flex justify-content-center align-items-center"},P={class:"title"},X={class:"container",id:"listing"},G={class:"listing-container"},Q={key:0,class:"poster d-flex justify-content-center align-items-center"},W=s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",height:"40",viewbox:"0 0 24 24","fill-rule":"evenodd","clip-rule":"evenodd",fill:"#999"},[s("path",{d:"M24 22h-24v-20h24v20zm-1-19h-22v18h22v-18zm-1 16h-19l4-7.492 3 3.048 5.013-7.556 6.987 12zm-11.848-2.865l-2.91-2.956-2.574 4.821h15.593l-5.303-9.108-4.806 7.243zm-4.652-11.135c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5-2.5-1.12-2.5-2.5 1.12-2.5 2.5-2.5zm0 1c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z"})],-1),Y={key:0,class:"play"},Z=s("i",{class:"fa fa-play-circle","aria-hidden":"true"},null,-1),ss=[Z],es={key:1,class:"poster"},ts=["src"],os={key:0,class:"play"},ns=s("i",{class:"fa fa-play-circle","aria-hidden":"true"},null,-1),is=[ns],as={class:"details"},cs={class:"movie-title"},ls={class:"other d-flex"},rs={class:"year"},ds={class:"time"},_s=s("i",{class:"fa fa-star","aria-hidden":"true"},null,-1),ys={__name:"[query]",setup(us){const m=C(),d=H(),l=M(()=>m.params.query),{data:_,error:g,pending:y}=U(`/api/movies/category/${l.value}`,"$IV5XxJ2Oul"),$=E(),{meta:k}=q($);return(u,ps)=>{var p,h;const x=B,w=N,b=V,j=T,r=R;return t(),o("div",null,[n(g)?(t(),o("section",I,[i(x)])):n(y)?(t(),o("section",J,[i(w)])):(t(),o("div",L,[i(j,null,{default:a(()=>[i(b,null,{default:a(()=>[v(c(`${n(l).charAt(0).toUpperCase()+n(l).slice(1)} Movies - ${n(k).title}`),1)]),_:1})]),_:1}),s("section",S,[s("div",A,[s("img",{src:`${n(d).public.imgBackdropBaseUrl}${(p=n(_))==null?void 0:p.results[0].backdrop_path}`,alt:"featured movie poster"},null,8,K)]),s("div",O,[s("div",P,c(`${n(l)} Movies`),1)])]),s("section",X,[s("div",G,[(t(!0),o(D,null,F((h=n(_))==null?void 0:h.results,(e,z)=>(t(),o("div",{class:"list",key:z},[e.poster_path?(t(),o("div",es,[i(r,{to:`/movie/${e==null?void 0:e.id}`},{default:a(()=>[s("img",{src:`${n(d).public.imgBaseUrl}${e.poster_path}`},null,8,ts)]),_:2},1032,["to"]),u.$device.isDesktop?(t(),o("div",os,is)):f("",!0)])):(t(),o("div",Q,[i(r,{to:`/movie/${e==null?void 0:e.id}`},{default:a(()=>[W]),_:2},1032,["to"]),u.$device.isDesktop?(t(),o("div",Y,ss)):f("",!0)])),s("div",as,[i(r,{to:`/movie/${e.id}`},{default:a(()=>[s("div",cs,c(e.title),1)]),_:2},1032,["to"]),s("div",ls,[s("div",rs,c(e.release_date.split("-")[0]),1),s("div",ds,[_s,v(" "+c(`${Math.round(e.vote_average/10*100)}%`),1)])])])]))),128))])])]))])}}};export{ys as default};
