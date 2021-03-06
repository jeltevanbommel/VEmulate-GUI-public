(this["webpackJsonpvemulate-gui"]=this["webpackJsonpvemulate-gui"]||[]).push([[0],{119:function(e,t,n){},120:function(e,t,n){},408:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),s=n(16),r=n.n(s),i=(n(119),n(120),n(42)),l=n(106),o=n.p+"static/media/logo-min.f9110c34.png",j=n(2),d=function(e){return Object(j.jsxs)("header",{className:"d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-body border-bottom shadow-sm",children:[Object(j.jsx)("p",{className:"h5 my-0 me-md-auto fw-normal",children:Object(j.jsx)("img",{src:o,alt:"",height:"80"})}),Object(j.jsx)(i.b,{to:"/",children:Object(j.jsxs)(l.a,{outline:!0,color:"primary",className:"px-2 mx-1",children:[Object(j.jsx)("i",{className:"fas fa-home"})," Dashboard"]})}),Object(j.jsx)(i.b,{to:"/scenariogen",children:Object(j.jsxs)(l.a,{outline:!0,color:"primary",className:"px-2 mx-1",children:[Object(j.jsx)("i",{className:"fas fa-hammer"}),"Configuration Builder"]})})]})},u=n(14),b=n(23),m=n(11),O=n(7),h=n(113),x=n(418),p=n(419),f=n(432),g=n(433),v=n(434),y=n(420),N=n(421),C=n(422),k=n(423),_=n(424),w=n(107),S=n.n(w),I=n(48),F=n.n(I),T=n(35),P=n(429),z=n(435),D=n(431),M=n(412),L=n(413),E=n(414),B=n(415),V=n(416),A=n(417),R=function(e){var t=Object(c.useState)(e.persistentConfig),n=Object(m.a)(t,2),a=n[0],s=n[1];return Object(c.useEffect)((function(){s(e.persistentConfig)}),[e.persistentConfig]),Object(j.jsxs)(D.a,{isOpen:e.settingsOpen,toggle:e.closeSettings,children:[Object(j.jsx)(M.a,{toggle:e.closeSettings,children:"VEmulate Persistent Settings"}),Object(j.jsxs)(L.a,{children:[Object(j.jsxs)(E.a,{children:[Object(j.jsx)(B.a,{for:"inputType",children:"Input Type"}),Object(j.jsxs)(V.a,{type:"select",name:"select",id:"inputType",onChange:function(e){return s(Object(O.a)(Object(O.a)({},a),{},{input_type:e.target.value}))},value:a.input_type,children:[Object(j.jsx)("option",{value:"file",children:"File"}),Object(j.jsx)("option",{value:"serial",children:"Serial"})]})]}),Object(j.jsxs)(E.a,{children:[Object(j.jsx)(B.a,{for:"inputPath",children:"Input Location (e.g. COM01, or /dev/usb1)"}),Object(j.jsx)(V.a,{type:"text",id:"inputPath",onChange:function(e){return s(Object(O.a)(Object(O.a)({},a),{},{input_path:e.target.value}))},value:a.input_path})]}),Object(j.jsxs)(E.a,{children:[Object(j.jsx)(B.a,{for:"outputType",children:"Output Type"}),Object(j.jsxs)(V.a,{type:"select",name:"select",id:"outputType",onChange:function(e){return s(Object(O.a)(Object(O.a)({},a),{},{output_type:e.target.value}))},value:a.output_type,children:[Object(j.jsx)("option",{value:"standard",children:"Standard"}),Object(j.jsx)("option",{value:"file",children:"File"}),Object(j.jsx)("option",{value:"serial",children:"Serial"})]})]}),"standard"===a.output_type?null:Object(j.jsxs)(E.a,{children:[Object(j.jsx)(B.a,{for:"outputPath",children:"Output Location (e.g. COM01, or /dev/usb1)"}),Object(j.jsx)(V.a,{type:"text",id:"outputPath",onChange:function(e){return s(Object(O.a)(Object(O.a)({},a),{},{output_path:e.target.value}))},value:a.output_path})]}),Object(j.jsxs)(E.a,{children:[Object(j.jsx)(B.a,{for:"ber",children:"Bit error rate (between 0.0 and 1.0)"}),Object(j.jsx)(V.a,{id:"ber",min:0,max:1,type:"number",onChange:function(e){var t=Number(e.target.value);s(Object(O.a)(Object(O.a)({},a),{},{bit_error_rate:t>1?1:t<0?0:t}))},value:a.bit_error_rate})]}),Object(j.jsx)(E.a,{check:!0,children:Object(j.jsxs)(B.a,{check:!0,children:[Object(j.jsx)(V.a,{type:"checkbox",onChange:function(e){return s(Object(O.a)(Object(O.a)({},a),{},{bit_error_checksum:e.target.checked}))},checked:a.bit_error_checksum})," ","Allow bit errors in checksum"]})}),Object(j.jsxs)(E.a,{children:[Object(j.jsx)(B.a,{for:"delay",children:"Delay in seconds between text messages"}),Object(j.jsx)(V.a,{id:"delay",min:0,max:1e3,type:"number",onChange:function(e){var t=Number(e.target.value);s(Object(O.a)(Object(O.a)({},a),{},{delay:t<0?0:t}))},value:a.delay})]}),Object(j.jsx)(E.a,{check:!0,children:Object(j.jsxs)(B.a,{check:!0,children:[Object(j.jsx)(V.a,{type:"checkbox",onChange:function(e){return s(Object(O.a)(Object(O.a)({},a),{},{timed:e.target.checked}))},checked:a.timed})," ","Configuration uses timed/interval fields."]})}),Object(j.jsxs)(E.a,{children:[Object(j.jsx)(B.a,{for:"stopCondition",children:"Stopping condition"}),Object(j.jsxs)(V.a,{type:"select",name:"select",id:"stopCondition",onChange:function(e){return s(Object(O.a)(Object(O.a)({},a),{},{stop_condition:e.target.value}))},value:a.stop_condition,children:[Object(j.jsx)("option",{value:"none",children:"None"}),Object(j.jsx)("option",{value:"text",children:"When text scenarios are done"}),Object(j.jsx)("option",{value:"hex",children:"When hex scenarios are done"}),Object(j.jsx)("option",{value:"text-hex",children:"When hex and text scenarios are done"})]})]})]}),Object(j.jsxs)(A.a,{children:[Object(j.jsx)(l.a,{color:"primary",onClick:function(t){return e.sendConfig(a)},children:"Save"})," ",Object(j.jsx)(l.a,{color:"secondary",onClick:e.closeSettings,children:"Cancel"})]})]})},G=function(e){var t=Object(c.useState)(null!=e.signed&&e.signed),n=Object(m.a)(t,2),a=n[0],s=n[1],r=Object(c.useState)(null==e.bits?32:e.bits),i=Object(m.a)(r,2),o=i[0],d=i[1],u=Object(c.useState)(1),b=Object(m.a)(u,2),O=b[0],h=b[1],x=Object(c.useState)(null==e.value?0:e.value),p=Object(m.a)(x,2),f=p[0],g=p[1],v=Object(c.useState)(!1),y=Object(m.a)(v,2),N=y[0],C=y[1],k=[2,10,16],_=[/[^0-1]+/g,/[^-,0-9]+/g,/[^0-9a-fA-F]+/g];return Object(j.jsxs)("div",{className:"intInput",children:[Object(j.jsx)("div",{children:null!==e.signed?Object(j.jsx)(l.a,{outline:!0,color:"primary",onClick:function(){return function(){var t,n=!a;s(n),g(t=n?f<<o>>o:f>>>0),e.onChange({target:{value:t,signed:a,bits:o}})}()},children:a?"\xb1":"+"}):null}),Object(j.jsx)("div",{children:Object(j.jsxs)("div",{className:"input-group",children:[Object(j.jsx)("input",{type:"text",className:N?"form-control error":"form-control",value:function(){switch(k[O]){case 2:return(f>>>0).toString(2).padStart(o,"0");case 10:return f;case 16:return(f>>>0).toString(16).padStart(Math.ceil(o/4),"0");default:return"err"}}(),onChange:function(t){return function(t){var n=t.target.value.replace(_[O],"");if(!a&&n.indexOf("-")>-1)g(n.replace("-",""));else{var c=parseInt(n,k[O]);if(Object.is(NaN,c))return g(n),void C(!0);C(!1),a&&c<-Math.pow(2,o-1)?(console.log("err 1"),C(!0)):a&&c>Math.pow(2,o-1)-1?(console.log("err 2"),C(!0)):!a&&c>Math.pow(2,o)-1?(console.log("err 3"),C(!0)):!a&&c<0&&(console.log("err 4"),C(!0)),g(c),e.onChange({target:{value:c,signed:a,bits:o}})}}(t)}}),Object(j.jsx)("input",{type:"numeric",className:N?"form-control error":"form-control",value:o,onChange:function(t){return function(t){t.target.value>32?d(32):d(t.target.value),C(!1),a&&f<-Math.pow(2,t.target.value-1)?(console.log("err 1"),C(!0)):a&&f>Math.pow(2,t.target.value-1)-1?(console.log("err 2"),C(!0)):!a&&f>Math.pow(2,t.target.value)-1?(console.log("err 3"),C(!0)):!a&&f<0&&(console.log("err 4"),C(!0)),e.onChange({target:{value:f,signed:a,bits:t.target.value}})}(t)},placeholder:"bits",style:{width:"30px"}}),Object(j.jsx)(l.a,{outline:!0,color:"primary",onClick:function(){return h((O+1)%3)},children:k[O]})]})})]})},H=function(e){var t=Object(c.useState)(e.item.controls.length>2?2:0),n=Object(m.a)(t,2),a=n[0],s=n[1];return Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("td",{className:"flex",children:e.item.controls.map((function(t,n){switch(t.type){case"intInput":return Object(j.jsx)("div",{className:a===n?"mt-2 mb-2":"hidden mt-2 mb-2",children:Object(j.jsx)(G,{signed:e.item.signed,bits:e.item.bits,value:a===n&&e.overridden?e.overrideValue:e.item.default,onChange:function(t){return e.onChangInput(e.item.key,t,e.item.text,t.target.bits,t.target.signed)}})},"c"+e.item.key+"-"+n);case"dropdown":return Object(j.jsx)("div",{className:a===n?"mt-2 mb-2":"hidden mt-2 mb-2",children:Object(j.jsxs)(V.a,{type:"select",name:"select",className:"emphasized_selector",onChange:function(t){return e.onChangInput(e.item.key,t,e.item.text,e.item.bits,e.item.signed)},children:[Object(j.jsx)("option",{value:"",children:" "}),Object.keys(t.values).map((function(e){return Object(j.jsxs)("option",{value:t.values[e],children:[t.values[e],": ",e]},e)}))]})},"c"+e.item.key+"-"+n);case"stringInput":return Object(j.jsx)("div",{className:a===n?"mt-2 mb-2":"hidden mt-2 mb-2",children:Object(j.jsx)("input",{onChange:function(t){return e.onChangInput(e.item.key,t,e.item.text,e.item.bits,e.item.signed)},type:"text",className:"form-control",value:a===n&&e.overridden?e.overrideValue:e.item.default})},"c"+e.item.key+"-"+n);case"range":return Object(j.jsxs)("div",{className:a===n?"mt-2":"hidden mt-2",children:[Object(j.jsx)("input",{type:"range",className:"form-range",min:t.min,max:t.max,onChange:function(t){return e.onChangInput(e.item.key,t,e.item.text,e.item.bits,e.item.signed)},step:"1",value:a===n&&e.overridden?e.overrideValue:e.item.default}),Object(j.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(j.jsx)("small",{className:"text-muted",children:t.min}),Object(j.jsx)("small",{children:e.overrideValue}),Object(j.jsx)("small",{className:"text-muted",children:t.max})]})]},"c"+e.item.key+"-"+n);default:return null}}))}),Object(j.jsx)("td",{children:Object(j.jsx)("span",{"data-abc":"true",style:{cursor:"pointer"},children:Object(j.jsx)("span",{className:"badge bg-primary-lt text-uppercase",onClick:function(){return t=e.item.controls.length,void s((a+1)%t);var t},children:Object(j.jsx)("i",{className:"fas fa-retweet"})})})})]})},W=function(e){var t=e.children,n=Object(h.a)(e,["children"]);return Object(j.jsx)(P.a,Object(O.a)(Object(O.a)({},n),{},{timeout:200,classNames:"fade",unmountOnExit:!0,children:t}))},J=function(){var e=Object(c.useState)("stopped"),t=Object(m.a)(e,2),n=t[0],a=t[1],s=Object(c.useState)([]),r=Object(m.a)(s,2),i=r[0],o=r[1],d=Object(c.useState)([]),h=Object(m.a)(d,2),w=h[0],I=h[1],P=Object(c.useState)("---"),D=Object(m.a)(P,2),M=D[0],L=D[1],E=Object(c.useState)([]),B=Object(m.a)(E,2),V=B[0],A=B[1],G=Object(c.useState)({}),J=Object(m.a)(G,2),U=J[0],q=J[1],K=Object(c.useState)({}),X=Object(m.a)(K,2),Q=X[0],Y=X[1],Z=Object(c.useState)(""),$=Object(m.a)(Z,2),ee=$[0],te=$[1],ne=Object(c.useState)([]),ce=Object(m.a)(ne,2),ae=ce[0],se=ce[1],re=Object(c.useState)(!1),ie=Object(m.a)(re,2),le=ie[0],oe=ie[1],je=Object(c.useState)({}),de=Object(m.a)(je,2),ue=de[0],be=de[1],me=Object(c.useState)(void 0),Oe=Object(m.a)(me,2),he=Oe[0],xe=Oe[1];Object(c.useEffect)((function(){var e=F()(":3030/"),t=new TextDecoder("utf-8");e.on("emulator_out",(function(e){se((function(n){return[{type:"output",datetime:(new Date).toLocaleString(),content:t.decode(e.data)}].concat(Object(b.a)(n))}))})),e.on("emulator_in",(function(e){se((function(n){return[{type:"input",datetime:(new Date).toLocaleString(),content:t.decode(e.data)}].concat(Object(b.a)(n))}))})),e.on("configs",(function(e){o(e.data)})),e.on("settings",(function(e){be(e)})),e.on("hard_reset",(function(){window.location.reload(!1)})),e.on("emulator_status",(function(e){a(e.data)})),e.on("current_overrides",(function(e){A(e.data),Y(e.values)})),e.on("loaded_config",(function(e){L(e.name),I(e.fields)})),e.emit("connected"),xe(e)}),[]);var pe=function(e,t,n,c,a){q(Object(O.a)(Object(O.a)({},U),{},Object(u.a)({},e,t.target.value))),V.includes(e)&&he.emit("override",{key:e,text:n,value:fe(t.target.value,n,e,c,a),stored_val:t.target.value})},fe=function(e,t,n,c,a){var s=Number.isInteger(Number(e));return[{type:s?"IntFixed":"StringFixed",protocol:t,key:n,bits:c,signed:a,value:s?Number(e):e}]};return Object(j.jsxs)("main",{className:"px-md-5",children:[Object(j.jsx)(R,{settingsOpen:le,closeSettings:function(){return oe(!1)},sendConfig:function(e){he.emit("set_settings",e),oe(!1)},persistentConfig:ue}),Object(j.jsxs)("div",{className:"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom",children:[Object(j.jsxs)("h2",{children:["Emulating:"," ",Object(j.jsx)("strong",{children:Object(j.jsx)(T.a,{text:M,springConfig:T.b.wobbly})})]}),Object(j.jsxs)(x.a,{className:"mb-2 mb-md-0",children:[Object(j.jsxs)(p.a,{className:"me-2",children:["running"===n?Object(j.jsx)(l.a,{outline:!0,color:"warning",size:"sm",onClick:function(){he.emit("pause")},children:Object(j.jsx)("i",{className:"fas fa-pause"})}):Object(j.jsx)(l.a,{outline:!0,color:"success",size:"sm",onClick:function(){he.emit("run")},children:Object(j.jsx)("i",{className:"fas fa-play"})}),"paused"===n||"running"===n?Object(j.jsx)(l.a,{outline:!0,color:"danger",size:"sm",onClick:function(){he.emit("stop")},children:Object(j.jsx)("i",{className:"fas fa-stop"})}):null]}),Object(j.jsx)(l.a,{className:"me-2",outline:!0,color:"info",size:"sm",onClick:function(){return he.emit("get_settings"),void oe(!0)},children:Object(j.jsx)("i",{className:"fas fa-cog"})}),Object(j.jsxs)(f.a,{size:"sm",color:"secondary",children:[Object(j.jsxs)(g.a,{caret:!0,children:[Object(j.jsx)("i",{className:"fas fa-sliders-h"}),"\xa0 Load Device Configuration"]}),Object(j.jsx)(v.a,{right:!0,children:i.map((function(e,t){return Object(j.jsx)(y.a,{onClick:function(){return t=e,void he.emit("load_config",t);var t},children:e},e+t)}))})]})]})]}),Object(j.jsxs)(N.a,{children:[Object(j.jsxs)(C.a,{md:"8",children:[" ",Object(j.jsx)("input",{onChange:function(e){return te(e.target.value.toUpperCase())},type:"text",className:"form-control",placeholder:"Search",value:ee}),Object(j.jsxs)(k.a,{responsive:!0,className:"table-theme table-row v-middle",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{className:"text-muted",style:{width:"60px"},children:"Name / Key"}),Object(j.jsx)("th",{className:"text-muted",style:{width:"60%"}}),Object(j.jsx)("td",{style:{width:"5px"}}),Object(j.jsx)("td",{}),Object(j.jsx)("th",{className:"text-muted",style:{width:"50px"},children:"Override Value"}),Object(j.jsx)("th",{className:"text-muted",style:{width:"110px"},children:"Overridde status"}),Object(j.jsx)("th",{className:"text-muted",style:{width:"30px"},children:"Text protocol"})]})}),Object(j.jsx)(z.a,{className:"controls-list",component:"tbody",children:w.map((function(e){return Object(j.jsx)(W,{children:Object(j.jsxs)("tr",{className:(e.key+" "+e.name).toUpperCase().indexOf(ee)>-1?"v-middle":"hidden v-middle",children:[Object(j.jsxs)("td",{children:[Object(j.jsx)(_.a,{color:"primary",className:"text-uppercase",children:e.name}),Object(j.jsx)(_.a,{color:"secondary",className:"text-uppercase",style:{display:"block"},children:e.key})]}),Object(j.jsx)(H,{item:e,overridden:e.key in U,overrideValue:U[e.key],onChangInput:pe}),Object(j.jsx)("td",{}),Object(j.jsx)("td",{className:"flex",children:Object(j.jsx)("span",{className:"badge bg-primary-lt",children:Q[e.key]})}),Object(j.jsx)("td",{children:Object(j.jsx)(S.a,{onClick:function(t){return n=e.key,c=t,a=e.text,s=e.bits,r=e.signed,i=e.default,A(V.filter((function(e){return e!==n}))),void(c?he.emit("override",{key:n,text:a,value:fe(n in U?U[n]:i,a,n,s,r),stored_val:U[n]}):he.emit("remove_override",{key:n,text:a}));var n,c,a,s,r,i},on:"Overridden",off:"Generated",size:"xs",active:V.includes(e.key)})}),Object(j.jsx)("td",{children:e.text&&!0===e.text?Object(j.jsx)("span",{className:"badge badge-circle xs text-primary"}):null})]})},M+"-"+e.key)}))})]})]}),Object(j.jsx)(C.a,{md:"4",children:Object(j.jsxs)(k.a,{responsive:!0,className:"table table-theme table-row v-middle restrict-height",children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{style:{width:"16.66%"}}),Object(j.jsx)("td",{style:{width:"60%"}}),Object(j.jsx)("td",{style:{width:"23.33%"},children:Object(j.jsx)(l.a,{outline:!0,color:"secondary",size:"sm",onClick:function(){return se([])},children:Object(j.jsx)("i",{className:"fas fa-trash"})})})]})}),Object(j.jsx)("tbody",{id:"log",children:ae.map((function(e){return Object(j.jsxs)("tr",{className:"v-middle slide",children:[Object(j.jsx)("td",{children:Object(j.jsx)("span",{"data-abc":"true",children:"output"===e.type?Object(j.jsx)("span",{className:"badge bg-success-lt text-uppercase",children:"Output"}):Object(j.jsx)("span",{className:"badge bg-info-lt text-uppercase",children:"Input"})})}),Object(j.jsx)("td",{className:"flex",children:Object(j.jsx)("pre",{className:"mb-0 align-left",children:e.content})}),Object(j.jsx)("td",{children:e.datetime})]})}))})]})})]})]})},U=n(109),q=n.n(U),K=n(425),X=n(426),Q=n(427),Y=n(430),Z=n(428),$={Loop:{type:"Loop",amount:"",seed:"",values:[]},IntFixed:{type:"IntFixed",amount:"",value:""},StringFixed:{type:"StringFixed",amount:"",value:""},RandomInt:{type:"RandomInt",amount:"",seed:"",min:"",max:""}},ee=function(){var e=Object(c.useState)([]),t=Object(m.a)(e,2),a=t[0],s=t[1],r=Object(c.useState)({}),i=Object(m.a)(r,2),o=i[0],d=i[1],h=Object(c.useState)(""),x=Object(m.a)(h,2),p=x[0],f=x[1],g=Object(c.useState)({key:"",description:""}),v=Object(m.a)(g,2),y=v[0],k=v[1],_=Object(c.useState)({preset:"",preset_fields:{}}),w=Object(m.a)(_,2),S=w[0],I=w[1],P=Object(c.useState)(!1),z=Object(m.a)(P,2),R=z[0],G=z[1],H=Object(c.useState)(""),W=Object(m.a)(H,2),J=W[0],U=W[1],ee=function(){return G(!R)};Object(c.useEffect)((function(){var e=F()(":3030/");e.on("presets",(function(e){d(e.data)})),e.emit("get_presets")}),[]);var te=function e(t){Object.keys(t).forEach((function(n){var c=t[n],a=typeof c;"id"===n&&delete t[n],Number.isInteger(Number(c))&&(t[n]=Number(c)),"object"===a?(e(c),Object.keys(c).length||delete t[n]):"undefined"===a&&delete t[n]}))},ne=function(){var e=Object.assign({},S);e.fields={name:"Test",key:"T",units:"T",values:a},te(e);var t=n(204);U(t.dump(e)),ee()},ce=function e(t,n,c){var a;return Object.keys(t).some((function(s){if("id"===s&&t[s]===n)return a=c,!0;if(t[s]&&"object"===typeof t[s]){var r=c.slice();return"values"!==s&&r.push(s),void 0!==(a=e(t[s],n,r))}return!1})),a},ae=function(e,t,n){for(var c=ce(a,e,[]),r=a.slice(),i=a,l=0;l<c.length-1;l++)i=i[c[l]].values;i[c[c.length-1]][t]=n,s(r)};return Object(j.jsxs)("main",{className:"px-md-5",children:[Object(j.jsx)("div",{className:"d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom",children:Object(j.jsxs)("h2",{children:["Creating Config:"," ",Object(j.jsx)(l.a,{onClick:function(e){return ne()},children:"Generate config"}),Object(j.jsx)("strong",{children:Object(j.jsx)(T.a,{text:"name"in S&&void 0!==S.name?S.name:"---",springConfig:T.b.wobbly})})]})}),Object(j.jsxs)(N.a,{children:[Object(j.jsxs)(D.a,{isOpen:R,toggle:ee,children:[Object(j.jsx)(M.a,{toggle:ee,children:"Generated Config"}),Object(j.jsx)(L.a,{children:Object(j.jsx)(Y.a,{language:"yaml",style:Z.a,children:J})}),Object(j.jsxs)(A.a,{children:[Object(j.jsx)(l.a,{color:"primary",onClick:function(e){return navigator.clipboard.writeText(J)},children:"Copy"})," ",Object(j.jsx)(l.a,{color:"secondary",onClick:ee,children:"Cancel"})]})]}),Object(j.jsx)("div",{className:"col md-4 justify-content-center",children:Object(j.jsxs)("div",{className:"card",style:{width:"100%"},children:[Object(j.jsx)("h5",{className:"card-header",children:"Base Information"}),Object(j.jsxs)("div",{className:"card-body",children:[Object(j.jsx)("h5",{className:"card-title ",children:"Test Name"}),Object(j.jsx)("p",{className:"card-text",children:"The name that is used to describe this specific test. This will only be used for visual purposes and is not used in the protocol."}),Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)("input",{type:"text",className:"form-control",id:"exampleFormControlInput1",placeholder:"MPPT Fuzzing",onChange:function(e){return I(Object(O.a)(Object(O.a)({},S),{},{name:e.target.value}))}})}),Object(j.jsx)("h5",{className:"card-title mt-3",children:"Device Name"}),Object(j.jsx)("p",{className:"card-text",children:"The name that is used to describe the device. This will only be used for visual purposes and is not used in the protocol."}),Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)("input",{type:"name",className:"form-control",id:"exampleFormControlInput1",placeholder:"MPPT BlueSolar",onChange:function(e){return I(Object(O.a)(Object(O.a)({},S),{},{device:e.target.value}))}})}),Object(j.jsx)("h5",{className:"card-title mt-3",children:"Hex Version"}),Object(j.jsx)("p",{className:"card-text",children:"Firmware version, optional if not using hex protocol."}),Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)("input",{type:"text",className:"form-control",id:"exampleFormControlInput1",placeholder:"0x00",onChange:function(e){return I(Object(O.a)(Object(O.a)({},S),{},{version:e.target.value}))}})}),Object(j.jsx)("h5",{className:"card-title mt-3",children:"Product ID"}),Object(j.jsx)("p",{className:"card-text",children:"Product ID, optional if not using hex protocol"}),Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)("input",{type:"text",className:"form-control",id:"exampleFormControlInput1",placeholder:"0x00",onChange:function(e){return I(Object(O.a)(Object(O.a)({},S),{},{product_id:e.target.value}))}})}),Object(j.jsx)("h5",{className:"card-title mt-3",children:"Bootloader"}),Object(j.jsx)("p",{className:"card-text",children:"Payload required to enter boot mode, false by default to disable 'boot' command"}),Object(j.jsx)("div",{className:"form-group",children:Object(j.jsx)("input",{type:"text",className:"form-control",id:"exampleFormControlInput1",placeholder:"false",onChange:function(e){return I(Object(O.a)(Object(O.a)({},S),{},{bootloader:e.target.value}))}})}),Object(j.jsx)("h5",{className:"card-title mt-3",children:"Emulation type"}),Object(j.jsx)("p",{className:"card-text",children:"Does the device emulation involve text emulation, hex emulation, or both."}),Object(j.jsxs)("select",{className:"form-control emphasized_selector",onChange:function(e){return I(Object(O.a)(Object(O.a)({},S),{},{protocol:e.target.value}))},children:[Object(j.jsx)("option",{value:"text",children:"Text"}),Object(j.jsx)("option",{value:"hex",children:"Hex"}),Object(j.jsx)("option",{value:"text_hex",children:"Text + Hex"})]})]})]})}),Object(j.jsxs)(C.a,{md:4,children:[Object(j.jsxs)("div",{className:"card",children:[Object(j.jsx)("h5",{className:"card-header",children:"Preset Protocol fields"}),Object(j.jsxs)("div",{className:"card-body",children:[Object(j.jsx)("h5",{className:"card-title",children:"Load Preset"}),Object(j.jsx)("p",{className:"card-text",children:"If the device is fully adhering the VE.Direct protocol, the fields can be selected from a preset, to ease configuration. Select the correct preset for the device below."}),Object(j.jsx)("select",{className:"form-control",disabled:"preset_fields"in S&&null!=S.preset_fields&&Object.keys(S.preset_fields).length>0,onChange:function(e){f(e.target.value),k(o[e.target.value].length>0?o[e.target.value][0]:{key:"",description:""}),I(Object(O.a)(Object(O.a)({},S),{},{preset_fields:void 0,preset:void 0}))},children:Object.keys(o).map((function(e){return Object(j.jsx)("option",{children:e})}))}),""!==p?Object(j.jsx)("select",{className:"form-control",onChange:function(e){k(o[p][e.target.value])},children:o[p].map((function(e,t){return Object(j.jsx)("option",{value:t,children:e.key})}))}):null,y.description,Object(j.jsx)("br",{}),""!==y.key?Object(j.jsxs)("button",{type:"button",className:"btn btn-sm btn-outline-primary",onClick:function(){return e=y.key,void I(Object(O.a)(Object(O.a)({},S),{},{preset:p,preset_fields:Object(O.a)(Object(O.a)({},S.preset_fields),{},Object(u.a)({},e,"default"))}));var e},children:["Add ",y.key]}):null]})]}),"preset_fields"in S&&"object"===typeof S.preset_fields?Object.keys(S.preset_fields).map((function(e,t){return Object(j.jsxs)("div",{className:"card text-white bg-dark mb-3 mt-3",children:[Object(j.jsxs)("div",{className:"card-header",children:[e,Object(j.jsx)("button",{type:"button",className:"btn btn-sm btn-outline-light",style:{right:"20px",position:"absolute"},onClick:function(){var t=Object.assign({},S);delete t.preset_fields[e],I(t)},children:"X"})]}),Object(j.jsxs)("div",{className:"card-body",children:[Object(j.jsx)("button",{type:"button",className:"random"===S.preset_fields[e]?"btn btn-sm btn-primary mr-1":"btn btn-sm btn-outline-light mr-1",onClick:function(){return I(Object(O.a)(Object(O.a)({},S),{},{preset_fields:Object(O.a)(Object(O.a)({},S.preset_fields),{},Object(u.a)({},e,"random"))}))},children:"Random"}),Object(j.jsx)("button",{type:"button",className:"fuzzing"===S.preset_fields[e]?"btn btn-sm btn-primary mr-1":"btn btn-sm btn-outline-light mr-1",onClick:function(){return I(Object(O.a)(Object(O.a)({},S),{},{preset_fields:Object(O.a)(Object(O.a)({},S.preset_fields),{},Object(u.a)({},e,"fuzzing"))}))},children:"Fuzzing"}),Object(j.jsx)("button",{type:"button",className:"default"===S.preset_fields[e]?"btn btn-sm btn-primary mr-1":"btn btn-sm btn-outline-light mr-1",onClick:function(){return I(Object(O.a)(Object(O.a)({},S),{},{preset_fields:Object(O.a)(Object(O.a)({},S.preset_fields),{},Object(u.a)({},e,"default"))}))},children:"Default"})]})]})})):null]}),Object(j.jsxs)(C.a,{md:4,children:[Object(j.jsxs)("h3",{children:["Scenario's:",Object(j.jsx)("select",{className:"form-control",onChange:function(e){!function(e){var t=Object.assign({},$[e]);t.id="_"+Math.random().toString(36).substr(2,9),s([].concat(Object(b.a)(a),[t]))}(e.target.value)},children:Object.keys($).map((function(e){return Object(j.jsx)("option",{children:e})}))})]}),Object(j.jsx)(q.a,{items:a,renderItem:function(e){var t=e.item;return Object(j.jsxs)(K.a,{children:[Object(j.jsx)(X.a,{children:t.type}),Object(j.jsx)(Q.a,{children:Object.keys(t).map((function(e){return"values"===e||"id"===e||"type"===e?Object(j.jsx)(j.Fragment,{}):Object(j.jsxs)(E.a,{children:[Object(j.jsx)(B.a,{for:"examplePassword",children:e}),Object(j.jsx)(V.a,{type:"text",value:t[e],onChange:function(n){ae(t.id,e,n.target.value)}})]})}))})]})},childrenProp:"values",confirmChange:function(e,t){return null==t||("BitBuffer"===t.type||"Loop"===t.type||"SelectRandom"===t.type)},onChange:function(e){return s(e)}})]})]})]})},te=n(13);var ne=function(){return Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)(i.a,{children:[Object(j.jsx)(d,{}),Object(j.jsxs)(te.c,{children:[Object(j.jsx)(te.a,{exact:!0,path:"/scenariogen",component:ee}),Object(j.jsx)(te.a,{path:"/",component:J})]})]})})},ce=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,436)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),s(e),r(e)}))};r.a.render(Object(j.jsx)(a.a.StrictMode,{children:Object(j.jsx)(ne,{})}),document.getElementById("root")),ce()}},[[408,1,2]]]);
//# sourceMappingURL=main.0e5f1b56.chunk.js.map