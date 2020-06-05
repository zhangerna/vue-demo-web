(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"110e":function(e,t,r){"use strict";var n=r("a228"),a=r.n(n);a.a},"9d74":function(e,t,r){e.exports=r.p+"img/logo.b54517fa.svg"},"9ed6":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"app flex-row align-items-center"},[r("div",{staticClass:"container"},[e._m(0),r("b-row",{staticClass:"justify-content-center"},[r("b-col",{attrs:{md:"8"}},[r("b-card-group",[r("b-card",{staticClass:"p-4",attrs:{"no-body":""}},[r("b-card-body",[r("b-form",[r("h1",[e._v("Login")]),r("p",{staticClass:"text-muted"},[e._v("Sign In to your account")]),r("b-input-group",{staticClass:"mb-3"},[r("b-input-group-prepend",[r("b-input-group-text",[r("i",{staticClass:"icon-user"})])],1),r("b-form-input",{staticClass:"form-control",class:e.errorUsername,attrs:{type:"text",placeholder:"Username",autocomplete:"username email"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}})],1),r("b-input-group",{staticClass:"mb-4"},[r("b-input-group-prepend",[r("b-input-group-text",[r("i",{staticClass:"icon-lock"})])],1),r("b-form-input",{staticClass:"form-control",class:e.errorPass,attrs:{type:"password",placeholder:"Password",autocomplete:"current-password"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),r("b-row",[r("b-col",{attrs:{cols:"6"}},[r("b-button",{staticClass:"px-4",attrs:{variant:"primary"},on:{click:e.handleLogin}},[e._v("Login")])],1),r("b-col",{staticClass:"text-right",attrs:{cols:"6"}},[r("b-button",{staticClass:"px-0",attrs:{variant:"link"},on:{click:function(t){return e.$router.push("/forget-password")}}},[e._v("Forgot password?")])],1)],1)],1)],1)],1),r("b-card",{staticClass:"text-white bg-primary py-5 d-md-down-none",staticStyle:{width:"44%"},attrs:{"no-body":""}},[r("b-card-body",{staticClass:"text-center"},[r("div",[r("h2",[e._v("Sign up")]),r("p",[e._v("Public registration is coming soon. If you are interested, please send your queries to support@zus.ai.")])])])],1)],1)],1)],1)],1)])},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"justify-content-center logo"},[n("img",{attrs:{src:r("9d74"),width:"300px"}}),n("p",[e._v("Increase Efficieny and Profit")])])}],o=r("f499"),s=r.n(o),i=r("3159"),c=r("a78e"),l=r.n(c),u="nonda-saas-token-expire-at",d="nonda-saas-user",p="nonda-saas-userId";function f(e){window.localStorage?localStorage.setItem(u,e):l.a.set(u,e,{expires:7})}function m(e){window.localStorage?localStorage.setItem(d,e):l.a.set(d,e,{expires:365})}function g(e){window.localStorage?localStorage.setItem(p,e):l.a.set(p,e,{expires:365})}var h={name:"Login",data:function(){return{username:"",password:"",errorUsername:"",errorPass:""}},methods:{handleLogin:function(){var e=this;this.errorUsername="",this.errorPass="",!this.username||this.username.indexOf("@")<1?this.errorUsername="is-invalid":!this.password||this.password.length<6?this.errorPass="is-invalid":i["a"].post("/api/v1/login",{username:this.username,password:this.password}).then(function(t){localStorage.setItem("user_info",s()(t.data.data.user)),localStorage.setItem("role",t.data.data.user.roleCode),e.$store.dispatch("user_info",t.data.data.user),f(t.data.data.token.expireAt),m(t.data.data.user.userEmail),g(t.data.data.user.userId),e.$router.push({path:"/index"})}).catch(function(e){alert("Login Failed, Username or Password Incorrect!")})}}},v=h,w=(r("110e"),r("2877")),b=Object(w["a"])(v,n,a,!1,null,"137ae6c1",null);t["default"]=b.exports},a228:function(e,t,r){},a78e:function(e,t,r){var n,a;
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
(function(o){var s=!1;if(n=o,a="function"===typeof n?n.call(t,r,t,e):n,void 0===a||(e.exports=a),s=!0,e.exports=o(),s=!0,!s){var i=window.Cookies,c=window.Cookies=o();c.noConflict=function(){return window.Cookies=i,c}}})(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var r=arguments[e];for(var n in r)t[n]=r[n]}return t}function t(r){function n(t,a,o){var s;if("undefined"!==typeof document){if(arguments.length>1){if(o=e({path:"/"},n.defaults,o),"number"===typeof o.expires){var i=new Date;i.setMilliseconds(i.getMilliseconds()+864e5*o.expires),o.expires=i}o.expires=o.expires?o.expires.toUTCString():"";try{s=JSON.stringify(a),/^[\{\[]/.test(s)&&(a=s)}catch(t){}a=r.write?r.write(a,t):encodeURIComponent(String(a)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape);var c="";for(var l in o)o[l]&&(c+="; "+l,!0!==o[l]&&(c+="="+o[l]));return document.cookie=t+"="+a+c}t||(s={});for(var u=document.cookie?document.cookie.split("; "):[],d=/(%[0-9A-Z]{2})+/g,p=0;p<u.length;p++){var f=u[p].split("="),m=f.slice(1).join("=");this.json||'"'!==m.charAt(0)||(m=m.slice(1,-1));try{var g=f[0].replace(d,decodeURIComponent);if(m=r.read?r.read(m,g):r(m,g)||m.replace(d,decodeURIComponent),this.json)try{m=JSON.parse(m)}catch(t){}if(t===g){s=m;break}t||(s[g]=m)}catch(t){}}return s}}return n.set=n,n.get=function(e){return n.call(n,e)},n.getJSON=function(){return n.apply({json:!0},[].slice.call(arguments))},n.defaults={},n.remove=function(t,r){n(t,"",e(r,{expires:-1}))},n.withConverter=t,n}return t(function(){})})}}]);