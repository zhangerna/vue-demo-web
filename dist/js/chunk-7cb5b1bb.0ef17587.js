(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7cb5b1bb"],{"11e9":function(t,a,n){var e=n("52a7"),o=n("4630"),r=n("6821"),i=n("6a99"),c=n("69a8"),s=n("c69a"),l=Object.getOwnPropertyDescriptor;a.f=n("9e1e")?l:function(a,n){if(a=r(a),n=i(n,!0),s)try{return l(a,n)}catch(t){}if(c(a,n))return o(!e.f.call(a,n),a[n])}},"28c1":function(t,a,n){},"34b1":function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"searchGaode"},[n("div",{staticClass:"map-btn-group"},[n("ul",[n("li",{on:{click:function(a){return t.changeMapType("default")}}},[t._v("地图 |")]),n("li",{on:{click:function(a){return t.changeMapType("sate")}}},[t._v(" 卫星图像")])])]),n("div",{staticClass:"amap",attrs:{id:"gaode-map"}})])},o=[],r=(n("c5f6"),n("28a5"),n("aa86")),i=n("3159"),c=n("024c"),s=n.n(c),l={name:"SearchMapForGaode",props:["map","from"],data:function(){return{mapInfo:{lots:[],lat:0,lng:0,vehicleInfo:[],showMult:!0},lat:"",lng:"",myMap:{},myInfoWindow:null,safeLayer:null,roadLayer:null,source:null}},watch:{map:function(t){this.mapInfo.lots=t.lots,this.mapInfo.vehicleInfo=t.vehicles,this.getMyMap()},from:function(t){this.source=t}},mounted:function(){this.getMyMap()},methods:{changeMapType:function(t){"default"==t?(this.roadLayer.hide(),this.safeLayer.hide()):(this.roadLayer.show(),this.safeLayer.show())},getMyMap:function(){var t,a=this,n=[];this.mapInfo.vehicleInfo.length>0&&(this.mapInfo.vehicleInfo.map(function(t){t.lastLocationLat&&t.lastLocationLng&&n.push({lng:t.lastLocationLng,lat:t.lastLocationLat})}),t=Object(r["a"])(n)),this.myMap=new s.a.Map("gaode-map",{zoom:12,viewMode:"3D",center:t}),this.roadLayer=new s.a.TileLayer.RoadNet({}),this.myMap.addControl(new s.a.ControlBar),this.myMap.addControl(new s.a.Scale({visible:!0})),this.myMap.add(this.roadLayer);var e=[];this.mapInfo.lots.length>0&&this.mapInfo.lots.map(function(t){var a=[];t.areaCoordinate.map(function(t){var n=t.split(",");a.push(Object(r["c"])(Number(n[0]),Number(n[1])))}),e.push(a)});var o=new s.a.Polygon({path:e,strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35});this.myMap.add(o),this.myInfoWindow=new s.a.InfoWindow({offset:new s.a.Pixel(0,0)}),this.mapInfo.showMult&&(this.mapInfo.vehicleInfo.map(function(t){t.lastLocationLat&&t.lastLocationLng&&a.addMarkers(t)}),this.myMap.setFitView()),this.myMap.setFitView()},addMarkers:function(t){console.log(t);var a=Object(r["c"])(t.lastLocationLng,t.lastLocationLat),n=new s.a.Marker({position:a,map:this.myMap,icon:new s.a.Icon({image:t.currentVoltage&&t.currentVoltage.toFixed(1)<11.7?"https://cdn2.shopify.com/s/files/1/0703/1149/files/Location_03580bd1-f466-4803-a69e-720a098b08a5.svg?828688":"https://pic.zus.ai/saas/vehicle_normal.svg",size:new s.a.Size(20,30),imageSize:new s.a.Size(20,30)})});n.content="",n.item=t,n.on("click",this.markerClick)},markerClick:function(t){var a=this,n="";n="zh-CN"===this.$i18n.locale?"China":"US";var e=t.target.item,o="/api/v1/getlastLocation?lastlocationlat="+e.lastLocationLat+"&lastlocationlng="+e.lastLocationLng+"&country="+n;i["a"].get(o).then(function(n){if(200===n.data.code){var o=e.currentVoltage<11.7?'<p style="margin-bottom:6px;font-size: 12px;">'.concat(a.$t("m.common.voltage"),': <span style="color:red"><i class="fa fa-exclamation-triangle"></i>').concat(e.currentVoltage?e.currentVoltage.toFixed(1)+"V":"","</span></p>"):'<p style="margin-bottom:6px;font-size: 12px;">'.concat(a.$t("m.common.voltage"),":").concat(e.currentVoltage?e.currentVoltage.toFixed(1)+"V":"","</p>"),r='<div>\n                            <img style="background: #3a4149" src="'.concat(e.photoUrl?e.photoUrl:"/img/placeholder.5367544d.svg",'" width="100%" alt="">\n                        <a target="_blank" href=\'/').concat(1===e.saleStatus?"vehicle":"sold-manager","/detail/").concat(e.vehicleId,'\'><h5 id="firstHeading" class="firstHeading">').concat(e.year?e.year:"N/A"," ").concat(e.make?e.make:"N/A"," ").concat(e.model?e.model:"N/A"," ").concat(e.alias?"-"+e.alias:"",'</h5></a>\n                        <p style="margin-bottom:6px;font-size: 12px">VIN:').concat(e.vin,"</p>\n                        ").concat(o,'\n                        <p style="margin-bottom:6px;font-size: 12px">').concat(a.$t("m.common.last_location"),":").concat(n.data.data.locationName,'</p>\n                        <p style="margin-bottom:6px;font-size: 12px">').concat(a.$t("m.common.last_update"),":").concat(a.getYMDString(e.locationTime),"</p>\n                        </div>");a.myInfoWindow.setContent(r),a.myInfoWindow.open(a.myMap,t.target.getPosition())}})},getYMDString:function(t){if(t){var a=new Date(t),n=a.getFullYear()+" ",e=a.getMonth()+1<10?"0"+(a.getMonth()+1):a.getMonth()+1,o=a.getDate()<10?"0"+a.getDate():a.getDate(),r=a.getHours()<10?"0"+a.getHours():a.getHours(),i=a.getMinutes()<10?"0"+a.getMinutes():a.getMinutes();return e+"/"+o+"/"+n+" "+r+":"+i+" "}return""}}},f=l,u=(n("91e6"),n("2877")),p=Object(u["a"])(f,e,o,!1,null,null,null);a["default"]=p.exports},"469f":function(t,a,n){n("6c1c"),n("1654"),t.exports=n("7d7b")},"5d73":function(t,a,n){t.exports=n("469f")},"5dbc":function(t,a,n){var e=n("d3f4"),o=n("8b97").set;t.exports=function(t,a,n){var r,i=a.constructor;return i!==n&&"function"==typeof i&&(r=i.prototype)!==n.prototype&&e(r)&&o&&o(t,r),t}},"7d7b":function(t,a,n){var e=n("e4ae"),o=n("7cd6");t.exports=n("584a").getIterator=function(t){var a=o(t);if("function"!=typeof a)throw TypeError(t+" is not iterable!");return e(a.call(t))}},"8b97":function(t,a,n){var e=n("d3f4"),o=n("cb7c"),r=function(t,a){if(o(t),!e(a)&&null!==a)throw TypeError(a+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,a,e){try{e=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),e(t,[]),a=!(t instanceof Array)}catch(t){a=!0}return function(t,n){return r(t,n),a?t.__proto__=n:e(t,n),t}}({},!1):void 0),check:r}},9093:function(t,a,n){var e=n("ce10"),o=n("e11e").concat("length","prototype");a.f=Object.getOwnPropertyNames||function(t){return e(t,o)}},"91e6":function(t,a,n){"use strict";var e=n("28c1"),o=n.n(e);o.a},aa77:function(t,a,n){var e=n("5ca1"),o=n("be13"),r=n("79e5"),i=n("fdef"),c="["+i+"]",s="​",l=RegExp("^"+c+c+"*"),f=RegExp(c+c+"*$"),u=function(t,a,n){var o={},c=r(function(){return!!i[t]()||s[t]()!=s}),l=o[t]=c?a(p):i[t];n&&(o[n]=l),e(e.P+e.F*c,"String",o)},p=u.trim=function(t,a){return t=String(o(t)),1&a&&(t=t.replace(l,"")),2&a&&(t=t.replace(f,"")),t};t.exports=u},aa86:function(t,a,n){"use strict";n.d(a,"c",function(){return u}),n.d(a,"b",function(){return p}),n.d(a,"a",function(){return h});var e=n("5d73"),o=n.n(e),r=3.141592653589793,i=.006693421622965943,c=6378245,s=function(t,a){a=+a,t=+t;var n=2*t-100+3*a+.2*a*a+.1*t*a+.2*Math.sqrt(Math.abs(t));return n+=2*(20*Math.sin(6*t*r)+20*Math.sin(2*t*r))/3,n+=2*(20*Math.sin(a*r)+40*Math.sin(a/3*r))/3,n+=2*(160*Math.sin(a/12*r)+320*Math.sin(a*r/30))/3,n},l=function(t,a){return a=+a,t=+t,!(t>73.66&&t<135.05&&a>3.86&&a<53.55)},f=function(t,a){a=+a,t=+t;var n=300+t+2*a+.1*t*t+.1*t*a+.1*Math.sqrt(Math.abs(t));return n+=2*(20*Math.sin(6*t*r)+20*Math.sin(2*t*r))/3,n+=2*(20*Math.sin(t*r)+40*Math.sin(t/3*r))/3,n+=2*(150*Math.sin(t/12*r)+300*Math.sin(t/30*r))/3,n};function u(t,a){if(a=+a,t=+t,l(t,a))return[t,a];var n=s(t-105,a-35),e=f(t-105,a-35),o=a/180*r,u=Math.sin(o);u=1-i*u*u;var p=Math.sqrt(u);n=180*n/(c*(1-i)/(u*p)*r),e=180*e/(c/p*Math.cos(o)*r);var h=a+n,g=t+e;return[g,h]}function p(t,a){if(a=+a,t=+t,l(t,a))return{};var n=s(t-105,a-35),e=f(t-105,a-35),o=a/180*r,u=Math.sin(o);u=1-i*u*u;var p=Math.sqrt(u);n=180*n/(c*(1-i)/(u*p)*r),e=180*e/(c/p*Math.cos(o)*r);var h=a+n,g=t+e;return{lng:2*t-g,lat:2*a-h}}function h(t){var a=t.length,n=0,e=0,r=0,i=!0,c=!1,s=void 0;try{for(var l,f=o()(t);!(i=(l=f.next()).done);i=!0){var u,p,h,g=l.value,d=g.lng*Math.PI/180,m=g.lat*Math.PI/180;u=Math.cos(m)*Math.cos(d),p=Math.cos(m)*Math.sin(d),h=Math.sin(m),n+=u,e+=p,r+=h}}catch(t){c=!0,s=t}finally{try{i||null==f.return||f.return()}finally{if(c)throw s}}n/=a,e/=a,r/=a;var v=Math.atan2(e,n),M=Math.sqrt(n*n+e*e),y=Math.atan2(r,M);return[v,y]}},c5f6:function(t,a,n){"use strict";var e=n("7726"),o=n("69a8"),r=n("2d95"),i=n("5dbc"),c=n("6a99"),s=n("79e5"),l=n("9093").f,f=n("11e9").f,u=n("86cc").f,p=n("aa77").trim,h="Number",g=e[h],d=g,m=g.prototype,v=r(n("2aeb")(m))==h,M="trim"in String.prototype,y=function(t){var a=c(t,!1);if("string"==typeof a&&a.length>2){a=M?a.trim():p(a,3);var n,e,o,r=a.charCodeAt(0);if(43===r||45===r){if(n=a.charCodeAt(2),88===n||120===n)return NaN}else if(48===r){switch(a.charCodeAt(1)){case 66:case 98:e=2,o=49;break;case 79:case 111:e=8,o=55;break;default:return+a}for(var i,s=a.slice(2),l=0,f=s.length;l<f;l++)if(i=s.charCodeAt(l),i<48||i>o)return NaN;return parseInt(s,e)}}return+a};if(!g(" 0o1")||!g("0b1")||g("+0x1")){g=function(t){var a=arguments.length<1?0:t,n=this;return n instanceof g&&(v?s(function(){m.valueOf.call(n)}):r(n)!=h)?i(new d(y(a)),n,g):y(a)};for(var b,I=n("9e1e")?l(d):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;I.length>w;w++)o(d,b=I[w])&&!o(g,b)&&u(g,b,f(d,b));g.prototype=m,m.constructor=g,n("2aba")(e,h,g)}},fdef:function(t,a){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);