(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register-acc-fail"],{"9d64":function(t,n,e){"use strict";var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"app flex-row align-items-center"},[e("div",{staticClass:"container"},[t._m(0),e("br"),e("h2",{staticClass:"text-center text-muted"},[t._v("Increase Efficiency and Profitability")]),e("div",{staticClass:"row justify-content-center"},[e("div",{staticClass:"col-md-8 col-lg-6"},[e("div",{staticClass:" mx-4"},[e("div",{staticClass:" px-4 align-items-center text-center"},[e("p",{class:t.errInfo?"text-danger":"",staticStyle:{"font-size":"144px"}},[t.icon?[e("i",{class:t.icon})]:[e("i",{class:t.errInfo?"fa fa-close":"cui cui-check"})]],2),e("p",{staticClass:"text-muted"},[t._v(t._s(t.errInfo?t.errInfo:t.succInfo))]),t.btnGroup&&t.btnGroup.btnFirst&&t.btnGroup.btnSecond?[e("div",{staticClass:"row"},[e("div",{staticClass:"col-6"},[e("button",{staticClass:"btn btn-block btn-outline-primary",attrs:{type:"button"},on:{click:function(n){return t.$router.push("/login")}}},[t._v("Login")])]),e("div",{staticClass:"col-6"},[e("button",{staticClass:"btn btn-block btn-outline-primary",attrs:{type:"button"},on:{click:function(n){return t.$router.push("/index")}}},[t._v("Homepage")])])])]:t.btnGroup&&t.btnGroup.btnFirst&&!t.btnGroup.btnSecond?[e("button",{staticClass:"btn btn-block btn-outline-primary",attrs:{type:"button"},on:{click:function(n){return t.$router.push("/login")}}},[t._v("Login")])]:t._e()],2)])])])])])},r=[function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"row justify-content-center"},[s("img",{attrs:{src:e("9d74"),width:"50%"}})])}],i={name:"registStatus",props:["errInfo","btnGroup","succInfo","icon"]},o=i,a=e("2877"),c=Object(a["a"])(o,s,r,!1,null,null,null);n["a"]=c.exports},"9d74":function(t,n,e){t.exports=e.p+"img/logo.b54517fa.svg"},f711:function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"animated fadeIn"},[e("fail",{attrs:{errInfo:t.errInfo,btnGroup:t.btnGroup}})],1)},r=[],i=e("9d64"),o={name:"registerAccessFail",components:{fail:i["a"]},data:function(){return{errInfo:"Sorry , you have already been the user of ZUS.ai",btnGroup:{btnFirst:"login",btnSecond:"index"}}}},a=o,c=e("2877"),l=Object(c["a"])(a,s,r,!1,null,null,null);n["default"]=l.exports}}]);