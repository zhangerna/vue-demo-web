(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["register-acc-succ"],{"1a8b":function(t,n,s){"use strict";s.r(n);var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"animated fadeIn"},[s("succ",{attrs:{succInfo:t.succInfo,btnGroup:t.btnGroup}})],1)},c=[],o=s("9d64"),i={name:"registerAccessSucc",components:{succ:o["a"]},data:function(){return{succInfo:"Congratulations, you have joined the store: Auto 3 Group. Log in or download the App to use the functions.",btnGroup:{btnFirst:"login",btnSecond:"index"}}}},r=i,a=s("2877"),u=Object(a["a"])(r,e,c,!1,null,null,null);n["default"]=u.exports},"9d64":function(t,n,s){"use strict";var e=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"app flex-row align-items-center"},[s("div",{staticClass:"container"},[t._m(0),s("br"),s("h2",{staticClass:"text-center text-muted"},[t._v("Increase Efficiency and Profitability")]),s("div",{staticClass:"row justify-content-center"},[s("div",{staticClass:"col-md-8 col-lg-6"},[s("div",{staticClass:" mx-4"},[s("div",{staticClass:" px-4 align-items-center text-center"},[s("p",{class:t.errInfo?"text-danger":"",staticStyle:{"font-size":"144px"}},[t.icon?[s("i",{class:t.icon})]:[s("i",{class:t.errInfo?"fa fa-close":"cui cui-check"})]],2),s("p",{staticClass:"text-muted"},[t._v(t._s(t.errInfo?t.errInfo:t.succInfo))]),t.btnGroup&&t.btnGroup.btnFirst&&t.btnGroup.btnSecond?[s("div",{staticClass:"row"},[s("div",{staticClass:"col-6"},[s("button",{staticClass:"btn btn-block btn-outline-primary",attrs:{type:"button"},on:{click:function(n){return t.$router.push("/login")}}},[t._v("Login")])]),s("div",{staticClass:"col-6"},[s("button",{staticClass:"btn btn-block btn-outline-primary",attrs:{type:"button"},on:{click:function(n){return t.$router.push("/index")}}},[t._v("Homepage")])])])]:t.btnGroup&&t.btnGroup.btnFirst&&!t.btnGroup.btnSecond?[s("button",{staticClass:"btn btn-block btn-outline-primary",attrs:{type:"button"},on:{click:function(n){return t.$router.push("/login")}}},[t._v("Login")])]:t._e()],2)])])])])])},c=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"row justify-content-center"},[e("img",{attrs:{src:s("9d74"),width:"50%"}})])}],o={name:"registStatus",props:["errInfo","btnGroup","succInfo","icon"]},i=o,r=s("2877"),a=Object(r["a"])(i,e,c,!1,null,null,null);n["a"]=a.exports},"9d74":function(t,n,s){t.exports=s.p+"img/logo.b54517fa.svg"}}]);