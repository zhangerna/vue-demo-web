(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-21047ace"],{"11e9":function(t,a,e){var n=e("52a7"),o=e("4630"),r=e("6821"),i=e("6a99"),s=e("69a8"),c=e("c69a"),l=Object.getOwnPropertyDescriptor;a.f=e("9e1e")?l:function(a,e){if(a=r(a),e=i(e,!0),c)try{return l(a,e)}catch(t){}if(s(a,e))return o(!n.f.call(a,e),a[e])}},"469f":function(t,a,e){e("6c1c"),e("1654"),t.exports=e("7d7b")},"5d73":function(t,a,e){t.exports=e("469f")},"5dbc":function(t,a,e){var n=e("d3f4"),o=e("8b97").set;t.exports=function(t,a,e){var r,i=a.constructor;return i!==e&&"function"==typeof i&&(r=i.prototype)!==e.prototype&&n(r)&&o&&o(t,r),t}},"70f8":function(t,a,e){"use strict";var n=e("96f3"),o=e.n(n);o.a},"7d7b":function(t,a,e){var n=e("e4ae"),o=e("7cd6");t.exports=e("584a").getIterator=function(t){var a=o(t);if("function"!=typeof a)throw TypeError(t+" is not iterable!");return n(a.call(t))}},"8b97":function(t,a,e){var n=e("d3f4"),o=e("cb7c"),r=function(t,a){if(o(t),!n(a)&&null!==a)throw TypeError(a+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,a,n){try{n=e("9b43")(Function.call,e("11e9").f(Object.prototype,"__proto__").set,2),n(t,[]),a=!(t instanceof Array)}catch(t){a=!0}return function(t,e){return r(t,e),a?t.__proto__=e:n(t,e),t}}({},!1):void 0),check:r}},9093:function(t,a,e){var n=e("ce10"),o=e("e11e").concat("length","prototype");a.f=Object.getOwnPropertyNames||function(t){return n(t,o)}},"96f3":function(t,a,e){},aa77:function(t,a,e){var n=e("5ca1"),o=e("be13"),r=e("79e5"),i=e("fdef"),s="["+i+"]",c="​",l=RegExp("^"+s+s+"*"),u=RegExp(s+s+"*$"),d=function(t,a,e){var o={},s=r(function(){return!!i[t]()||c[t]()!=c}),l=o[t]=s?a(p):i[t];e&&(o[e]=l),n(n.P+n.F*s,"String",o)},p=d.trim=function(t,a){return t=String(o(t)),1&a&&(t=t.replace(l,"")),2&a&&(t=t.replace(u,"")),t};t.exports=d},aa86:function(t,a,e){"use strict";e.d(a,"c",function(){return d}),e.d(a,"b",function(){return p}),e.d(a,"a",function(){return h});var n=e("5d73"),o=e.n(n),r=3.141592653589793,i=.006693421622965943,s=6378245,c=function(t,a){a=+a,t=+t;var e=2*t-100+3*a+.2*a*a+.1*t*a+.2*Math.sqrt(Math.abs(t));return e+=2*(20*Math.sin(6*t*r)+20*Math.sin(2*t*r))/3,e+=2*(20*Math.sin(a*r)+40*Math.sin(a/3*r))/3,e+=2*(160*Math.sin(a/12*r)+320*Math.sin(a*r/30))/3,e},l=function(t,a){return a=+a,t=+t,!(t>73.66&&t<135.05&&a>3.86&&a<53.55)},u=function(t,a){a=+a,t=+t;var e=300+t+2*a+.1*t*t+.1*t*a+.1*Math.sqrt(Math.abs(t));return e+=2*(20*Math.sin(6*t*r)+20*Math.sin(2*t*r))/3,e+=2*(20*Math.sin(t*r)+40*Math.sin(t/3*r))/3,e+=2*(150*Math.sin(t/12*r)+300*Math.sin(t/30*r))/3,e};function d(t,a){if(a=+a,t=+t,l(t,a))return[t,a];var e=c(t-105,a-35),n=u(t-105,a-35),o=a/180*r,d=Math.sin(o);d=1-i*d*d;var p=Math.sqrt(d);e=180*e/(s*(1-i)/(d*p)*r),n=180*n/(s/p*Math.cos(o)*r);var h=a+e,m=t+n;return[m,h]}function p(t,a){if(a=+a,t=+t,l(t,a))return{};var e=c(t-105,a-35),n=u(t-105,a-35),o=a/180*r,d=Math.sin(o);d=1-i*d*d;var p=Math.sqrt(d);e=180*e/(s*(1-i)/(d*p)*r),n=180*n/(s/p*Math.cos(o)*r);var h=a+e,m=t+n;return{lng:2*t-m,lat:2*a-h}}function h(t){var a=t.length,e=0,n=0,r=0,i=!0,s=!1,c=void 0;try{for(var l,u=o()(t);!(i=(l=u.next()).done);i=!0){var d,p,h,m=l.value,f=m.lng*Math.PI/180,b=m.lat*Math.PI/180;d=Math.cos(b)*Math.cos(f),p=Math.cos(b)*Math.sin(f),h=Math.sin(b),e+=d,n+=p,r+=h}}catch(t){s=!0,c=t}finally{try{i||null==u.return||u.return()}finally{if(s)throw c}}e/=a,n/=a,r/=a;var _=Math.atan2(n,e),g=Math.sqrt(e*e+n*n),v=Math.atan2(r,g);return[_,v]}},b75a:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"draw-map"},[e("b-row",[e("b-col",{attrs:{sm:"6"}},[e("b-form-group",[e("label",[t._v(t._s(t.$t("m.cloud.test_store_name")))]),e("b-form-input",{attrs:{type:"text",maxlength:"30"},model:{value:t.parkingName,callback:function(a){t.parkingName=a},expression:"parkingName"}})],1),e("b-form-group",[e("label",[t._v(t._s(t.$t("m.common.contact_person")))]),e("b-form-input",{attrs:{type:"text",maxlength:"30"},model:{value:t.user,callback:function(a){t.user=a},expression:"user"}})],1),e("b-form-group",[e("label",[t._v(t._s(t.$t("m.common.contact_phone")))]),e("b-form-input",{attrs:{type:"number",maxlength:"15"},model:{value:t.phone,callback:function(a){t.phone=a},expression:"phone"}})],1),e("b-form-group",[e("label",[t._v(t._s(t.$t("m.lots.address")))]),e("b-input-group",[e("b-form-input",{attrs:{type:"text",maxlength:"100"},model:{value:t.address,callback:function(a){t.address=a},expression:"address"}}),e("b-input-group-append",[e("b-button",{attrs:{variant:"secondary",id:"locate"},on:{click:function(a){return t.getLocate()}}},[t._v(t._s(t.$t("m.lots.b_locate")))])],1)],1)],1),e("b-form-group",[e("label",[t._v(t._s(t.$t("m.common.address_des")))]),e("b-form-input",{attrs:{type:"text",maxlength:"200"},model:{value:t.parkingDes,callback:function(a){t.parkingDes=a},expression:"parkingDes"}})],1)],1),e("b-col",{attrs:{sm:"6"}},[e("div",[t._v(t._s(t.$t("m.lots.add_lot_p")))]),e("div",{staticStyle:{"margin-bottom":"10px"}},[t._v(t._s(t.$t("m.map.double_tip")))]),e("div",{staticClass:"drawbutton left-button",on:{click:function(a){return t.drawPolygon()}}},[t._v("\n                 "+t._s(t.drawButton)+" \n            ")]),e("div",{staticClass:"map-btn-group"},[e("ul",[e("li",{on:{click:function(a){return t.changeMapType("default")}}},[t._v(t._s(t.$t("m.map.map"))+" |")]),e("li",{on:{click:function(a){return t.changeMapType("sate")}}},[t._v(" "+t._s(t.$t("m.map.satellite")))])])]),e("div",{attrs:{id:"map-canvas"}})])],1),e("model",{attrs:{show:t.show,title:t.$t("m.tip.warn"),content:t.content,buttonText:t.btnGroup},on:{closeRemindBox:t.hideTip}}),e("b-button",{staticClass:"btn btn-primary submit",staticStyle:{"margin-top":"12px",color:"#ffffff"},attrs:{disabled:t.disable},on:{click:function(a){return t.submitData()}}},[t._v(t._s(t.$t("m.common.submit")))])],1)},o=[],r=(e("a481"),e("c5f6"),e("28a5"),e("3159")),i=e("aa86"),s=e("024c"),c=e.n(s),l=e("ebd9"),u={name:"drawMap",props:["data"],components:{model:l["a"]},watch:{data:function(t){this.parkingName=t.parkingName,this.address=t.address,this.areaCoord=t.areaCoordinate,this.centerCoordinate=t.centerCoordinate,this.user=t.parkingContactName,this.phone=t.parkingContactPhone,this.parkingDes=t.parkingAddressDesc,this.initEdit()},parkingName:function(t){this.parkingName=this.trim(t),this.checkInput()},address:function(t){this.address=this.trim(t),this.checkInput()}},mounted:function(){this.$route.params.id||this.initialize()},data:function(){return{user:"",disable:!0,mapObj:null,infoWindow:null,geocoders:null,parkingDes:"",drawManager:null,polygonCompete:[],locations:[],parkingName:"",centerCoordinate:null,address:"",show:!1,content:"",btnGroup:{btnSecond:this.$t("m.tip.b_ok")},areaCoord:null,bermudaTriangle:null,isMapChanged:!1,drawButton:this.$t("m.map.start_draw"),markers:[],roadLayer:null,phone:""}},methods:{changeMapType:function(t){"default"==t?this.roadLayer.hide():this.roadLayer.show()},initEdit:function(){this.drawButton=this.$t("m.map.redraw");var t=this.centerCoordinate.split(" "),a=Object(i["c"])(t[0],t[1]);this.mapObj=new c.a.Map("map-canvas",{center:a,viewMode:"3D",zoom:17}),this.roadLayer=new c.a.TileLayer.RoadNet({}),this.mapObj.addControl(new c.a.ControlBar),this.mapObj.addControl(new c.a.Scale({visible:!0})),this.mapObj.add(this.roadLayer);var e=[];this.areaCoord.map(function(t){var a=t.split(",");e.push(Object(i["c"])(Number(a[0]),Number(a[1])))}),this.initPolygon(e)},initPolygon:function(t){this.polygonCompete=new c.a.Polygon({path:t,strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35}),this.mapObj.add(this.polygonCompete)},drawPolygon:function(){var t=this;window.mouseTool&&(this.mapObj.remove(this.polygonCompete),this.polygonCompete=[],window.mouseTool.close(!0)),window.mouseTool=new c.a.MouseTool(this.mapObj),window.mouseTool.polygon({strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35,editable:!0}),window.mouseTool.on("draw",function(a){t.drawButton=t.$t("m.map.redraw");var e=a.obj.getPath();t.showLonLat(e),window.mouseTool.close(!0)})},showLonLat:function(t){var a=this;console.log(t);var e=[],n=!1;if(t.map(function(t){Object(i["b"])(t.lng,t.lat).lng?e.push(Object(i["b"])(t.lng,t.lat)):n=!0}),n)return this.content=this.$t("m.map.out_china"),void(this.show=!0);e[t.length]=e[0],this.initPolygon(t),this.areaCoord=e,r["a"].post("/api/v1/lot/isRepeated",{parkingName:this.parkingName,address:this.address,areaCoordinate:e,id:this.$route.params.id,lotType:2}).then(function(t){null!=t.data.data?(a.isMapChanged=!0,a.showTip(t.data.data)):(a.checkInput(),a.isMapChanged=!0)})},hideTip:function(){this.show=!1,this.disable=!0},initialize:function(){this.mapObj=new c.a.Map("map-canvas",{zoom:15}),this.roadLayer=new c.a.TileLayer.RoadNet({}),this.mapObj.addControl(new c.a.ControlBar),this.mapObj.addControl(new c.a.Scale({visible:!0})),this.mapObj.add(this.roadLayer)},getLocate:function(){var t=this;this.checkInput(),this.address&&(this.mapObj.remove(this.markers),this.geocoders=new c.a.Geocoder,this.geocoders.getLocation(this.address,function(a,e){"complete"===a&&e.geocodes.length&&(t.markers=new c.a.Marker({position:e.geocodes[0].location,icon:new c.a.Icon({image:"https://cdn2.shopify.com/s/files/1/0703/1149/files/Location_03580bd1-f466-4803-a69e-720a098b08a5.svg?828688",size:new c.a.Size(60,60),imageSize:new c.a.Size(20,30)})}),t.mapObj.add(t.markers),t.mapObj.setFitView(t.markers))}))},showTip:function(t){this.show=!0,this.content=this.$t("m.map.warn_repeat",{data:t})},trim:function(t){return t.replace(/(^\s*)|(\s*$)/g,"")},checkInput:function(){this.parkingName&&this.user&&this.phone&&this.address?this.disable=!1:this.disable=!0},submitData:function(){var t=this;this.checkInput();var a="";if(a=this.data?"/api/v1/clouddrive/parkinglot/update":"/api/v1/clouddrive/parkinglot/insert",!this.isMapChanged&&this.areaCoord){var e=this.areaCoord.map(function(t){return{lng:t.split(",")[0],lat:t.split(",")[1]}});this.areaCoord=e}r["a"].post(a,{parkingName:this.parkingName,address:this.address,areaCoordinate:this.areaCoord,id:this.$route.params.id?this.$route.params.id:"",parkingAddressDesc:this.parkingDes,parkingContactName:this.user,parkingContactPhone:this.phone}).then(function(a){200==a.data.code?t.$router.push("/test-drive/test-point"):(t.show=!0,t.content="Lot Name: ".concat(a.data.data," Existed."))})}}},d=u,p=(e("70f8"),e("2877")),h=Object(p["a"])(d,n,o,!1,null,null,null);a["default"]=h.exports},c5f6:function(t,a,e){"use strict";var n=e("7726"),o=e("69a8"),r=e("2d95"),i=e("5dbc"),s=e("6a99"),c=e("79e5"),l=e("9093").f,u=e("11e9").f,d=e("86cc").f,p=e("aa77").trim,h="Number",m=n[h],f=m,b=m.prototype,_=r(e("2aeb")(b))==h,g="trim"in String.prototype,v=function(t){var a=s(t,!1);if("string"==typeof a&&a.length>2){a=g?a.trim():p(a,3);var e,n,o,r=a.charCodeAt(0);if(43===r||45===r){if(e=a.charCodeAt(2),88===e||120===e)return NaN}else if(48===r){switch(a.charCodeAt(1)){case 66:case 98:n=2,o=49;break;case 79:case 111:n=8,o=55;break;default:return+a}for(var i,c=a.slice(2),l=0,u=c.length;l<u;l++)if(i=c.charCodeAt(l),i<48||i>o)return NaN;return parseInt(c,n)}}return+a};if(!m(" 0o1")||!m("0b1")||m("+0x1")){m=function(t){var a=arguments.length<1?0:t,e=this;return e instanceof m&&(_?c(function(){b.valueOf.call(e)}):r(e)!=h)?i(new f(v(a)),e,m):v(a)};for(var w,y=e("9e1e")?l(f):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),k=0;y.length>k;k++)o(f,w=y[k])&&!o(m,w)&&d(m,w,u(f,w));m.prototype=b,b.constructor=m,e("2aba")(n,h,m)}},d2e4:function(t,a,e){"use strict";var n=e("e357"),o=e.n(n);o.a},e357:function(t,a,e){},ebd9:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("transition",{attrs:{name:"fade"}},[t.show?e("div",{attrs:{id:"popup-edit"}},[e("div",{staticClass:"modal-dialog modal-md popup-content"},[e("div",{staticClass:"modal-content",attrs:{role:"document",id:"__BVID__42___BV_modal_content_","aria-labelledby":"__BVID__42___BV_modal_header_","aria-describedby":"__BVID__42___BV_modal_body_"}},[e("header",{staticClass:"modal-header",attrs:{id:"__BVID__42___BV_modal_header_"}},[e("h5",{staticClass:"modal-title"},[t._v(t._s(t.title))]),e("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(a){return t.closePopup()}}},[t._v("×")])]),e("div",{staticClass:"modal-body",attrs:{id:"__BVID__42___BV_modal_body_"}},[e("div",[t._v(t._s(t.content))])]),e("footer",{staticClass:"modal-footer",attrs:{id:"__BVID__42___BV_modal_footer_"}},[t.buttonText&&t.buttonText.btnFirst?e("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:function(a){return t.closePopup(t.buttonText.origin?t.buttonText.origin:"")}}},[t._v(t._s(t.buttonText?t.buttonText.btnFirst:"")+"\n                  ")]):t._e(),t.buttonText&&t.buttonText.btnSecond?e("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(a){return t.closePopup(t.type="ok",t.buttonText.userId)}}},[t._v(t._s(t.buttonText.btnSecond)+"\n                  ")]):t._e()])])]),e("div",{staticClass:"bg",on:{click:function(a){return t.closePopup()}}})]):t._e()])},o=[],r={name:"modal",props:["show","title","content","buttonText"],methods:{closePopup:function(t,a){this.$emit("closeRemindBox",t,a)}}},i=r,s=(e("d2e4"),e("2877")),c=Object(s["a"])(i,n,o,!1,null,"15db5f6c",null);a["a"]=c.exports},fdef:function(t,a){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);