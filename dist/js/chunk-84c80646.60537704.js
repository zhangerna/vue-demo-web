(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-84c80646"],{"11e9":function(t,a,n){var e=n("52a7"),r=n("4630"),i=n("6821"),o=n("6a99"),c=n("69a8"),s=n("c69a"),f=Object.getOwnPropertyDescriptor;a.f=n("9e1e")?f:function(a,n){if(a=i(a),n=o(n,!0),s)try{return f(a,n)}catch(t){}if(c(a,n))return r(!e.f.call(a,n),a[n])}},"469f":function(t,a,n){n("6c1c"),n("1654"),t.exports=n("7d7b")},5767:function(t,a,n){},"5d73":function(t,a,n){t.exports=n("469f")},"5dbc":function(t,a,n){var e=n("d3f4"),r=n("8b97").set;t.exports=function(t,a,n){var i,o=a.constructor;return o!==n&&"function"==typeof o&&(i=o.prototype)!==n.prototype&&e(i)&&r&&r(t,i),t}},"6b68":function(t,a,n){"use strict";var e=n("5767"),r=n.n(e);r.a},"7d7b":function(t,a,n){var e=n("e4ae"),r=n("7cd6");t.exports=n("584a").getIterator=function(t){var a=r(t);if("function"!=typeof a)throw TypeError(t+" is not iterable!");return e(a.call(t))}},"8b97":function(t,a,n){var e=n("d3f4"),r=n("cb7c"),i=function(t,a){if(r(t),!e(a)&&null!==a)throw TypeError(a+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,a,e){try{e=n("9b43")(Function.call,n("11e9").f(Object.prototype,"__proto__").set,2),e(t,[]),a=!(t instanceof Array)}catch(t){a=!0}return function(t,n){return i(t,n),a?t.__proto__=n:e(t,n),t}}({},!1):void 0),check:i}},9078:function(t,a,n){"use strict";n.r(a);var e=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"maps"},[n("div",{staticClass:"map-btn-group"},[n("ul",[n("li",{on:{click:function(a){return t.changeMapType("default")}}},[t._v("地图 |")]),n("li",{on:{click:function(a){return t.changeMapType("sate")}}},[t._v(" 卫星图像")])])]),n("div",{staticClass:"amap my-map",attrs:{id:t.elId?t.elId:"map"}})])},r=[],i=(n("c5f6"),n("28a5"),n("aa86")),o=n("024c"),c=n.n(o),s={name:"amap",props:["map","elId"],data:function(){return{mapInfo:null,mapObj:null,marker:null,polygon:null,markers:[],lat:"",lng:"",infoWindow:null,safeLayer:null,roadLayer:null}},watch:{map:function(t){this.mapInfo=t,this.initMap()}},methods:{addMarker:function(t,a,n){var e=new c.a.Marker({position:t,map:this.mapObj,icon:new c.a.Icon({image:"https://cdn2.shopify.com/s/files/1/0703/1149/files/Location_03580bd1-f466-4803-a69e-720a098b08a5.svg?828688",size:new c.a.Size(60,60),imageSize:new c.a.Size(20,30)})});if(n){var r=new c.a.InfoWindow({isCustom:!0,content:n,offset:new c.a.Pixel(16,-45)});e.on("click",function(t){r.open(window.mapObj,t.target.getPosition())})}},changeMapType:function(t){"default"==t?(this.roadLayer.hide(),this.safeLayer.hide()):(this.roadLayer.show(),this.safeLayer.show())},initMap:function(){var t=this,a=Object(i["c"])(this.mapInfo.lng,this.mapInfo.lat);this.mapObj=new c.a.Map(this.elId?this.elId:"map",{center:a,zoom:17}),this.safeLayer=new c.a.TileLayer.Satellite({}),this.roadLayer=new c.a.TileLayer.RoadNet({}),this.mapObj.add(this.safeLayer),this.mapObj.add(this.roadLayer),window.mapObj=this.mapObj;var n=[];this.mapInfo["area"]&&this.mapInfo["area"].map(function(t){var a=t.split(",");n.push(Object(i["c"])(Number(a[0]),Number(a[1])))});var e=new c.a.Polygon({path:n,strokeColor:"#FF0000",strokeOpacity:.8,strokeWeight:2,fillColor:"#FF0000",fillOpacity:.35});this.mapObj.add(e),this.mapInfo.showMult?this.mapInfo.vehicleInfo.map(function(a){var n=Object(i["c"])(a.lastLocationLng,a.lastLocationLat),e="".concat(a.year?a.year:"N/A"," ").concat(a.make?a.make:"N/A"," ").concat(a.model?a.model:"N/A"),r="<a href='/vehicle/detail/".concat(a.vehicleId,'\'>\n                        <img style="background: #3a4149" src="').concat(a.photoPath?a.photoPath:"/img/placeholder.5367544d.svg",'" width="100%">\n                        <h5 id="firstHeading" class="firstHeading">').concat(a.year?a.year:"N/A"," ").concat(a.make?a.make:"N/A"," ").concat(a.model?a.model:"N/A","</h5>\n                        </a>");t.addMarker(n,e,r)}):this.addMarker(a,this.mapInfo.vehicleInfo,null),this.mapObj.setFitView()}}},f=s,u=(n("6b68"),n("2877")),l=Object(u["a"])(f,e,r,!1,null,null,null);a["default"]=l.exports},9093:function(t,a,n){var e=n("ce10"),r=n("e11e").concat("length","prototype");a.f=Object.getOwnPropertyNames||function(t){return e(t,r)}},aa77:function(t,a,n){var e=n("5ca1"),r=n("be13"),i=n("79e5"),o=n("fdef"),c="["+o+"]",s="​",f=RegExp("^"+c+c+"*"),u=RegExp(c+c+"*$"),l=function(t,a,n){var r={},c=i(function(){return!!o[t]()||s[t]()!=s}),f=r[t]=c?a(h):o[t];n&&(r[n]=f),e(e.P+e.F*c,"String",r)},h=l.trim=function(t,a){return t=String(r(t)),1&a&&(t=t.replace(f,"")),2&a&&(t=t.replace(u,"")),t};t.exports=l},aa86:function(t,a,n){"use strict";n.d(a,"c",function(){return l}),n.d(a,"b",function(){return h}),n.d(a,"a",function(){return p});var e=n("5d73"),r=n.n(e),i=3.141592653589793,o=.006693421622965943,c=6378245,s=function(t,a){a=+a,t=+t;var n=2*t-100+3*a+.2*a*a+.1*t*a+.2*Math.sqrt(Math.abs(t));return n+=2*(20*Math.sin(6*t*i)+20*Math.sin(2*t*i))/3,n+=2*(20*Math.sin(a*i)+40*Math.sin(a/3*i))/3,n+=2*(160*Math.sin(a/12*i)+320*Math.sin(a*i/30))/3,n},f=function(t,a){return a=+a,t=+t,!(t>73.66&&t<135.05&&a>3.86&&a<53.55)},u=function(t,a){a=+a,t=+t;var n=300+t+2*a+.1*t*t+.1*t*a+.1*Math.sqrt(Math.abs(t));return n+=2*(20*Math.sin(6*t*i)+20*Math.sin(2*t*i))/3,n+=2*(20*Math.sin(t*i)+40*Math.sin(t/3*i))/3,n+=2*(150*Math.sin(t/12*i)+300*Math.sin(t/30*i))/3,n};function l(t,a){if(a=+a,t=+t,f(t,a))return[t,a];var n=s(t-105,a-35),e=u(t-105,a-35),r=a/180*i,l=Math.sin(r);l=1-o*l*l;var h=Math.sqrt(l);n=180*n/(c*(1-o)/(l*h)*i),e=180*e/(c/h*Math.cos(r)*i);var p=a+n,d=t+e;return[d,p]}function h(t,a){if(a=+a,t=+t,f(t,a))return{};var n=s(t-105,a-35),e=u(t-105,a-35),r=a/180*i,l=Math.sin(r);l=1-o*l*l;var h=Math.sqrt(l);n=180*n/(c*(1-o)/(l*h)*i),e=180*e/(c/h*Math.cos(r)*i);var p=a+n,d=t+e;return{lng:2*t-d,lat:2*a-p}}function p(t){var a=t.length,n=0,e=0,i=0,o=!0,c=!1,s=void 0;try{for(var f,u=r()(t);!(o=(f=u.next()).done);o=!0){var l,h,p,d=f.value,m=d.lng*Math.PI/180,v=d.lat*Math.PI/180;l=Math.cos(v)*Math.cos(m),h=Math.cos(v)*Math.sin(m),p=Math.sin(v),n+=l,e+=h,i+=p}}catch(t){c=!0,s=t}finally{try{o||null==u.return||u.return()}finally{if(c)throw s}}n/=a,e/=a,i/=a;var y=Math.atan2(e,n),b=Math.sqrt(n*n+e*e),M=Math.atan2(i,b);return[y,M]}},c5f6:function(t,a,n){"use strict";var e=n("7726"),r=n("69a8"),i=n("2d95"),o=n("5dbc"),c=n("6a99"),s=n("79e5"),f=n("9093").f,u=n("11e9").f,l=n("86cc").f,h=n("aa77").trim,p="Number",d=e[p],m=d,v=d.prototype,y=i(n("2aeb")(v))==p,b="trim"in String.prototype,M=function(t){var a=c(t,!1);if("string"==typeof a&&a.length>2){a=b?a.trim():h(a,3);var n,e,r,i=a.charCodeAt(0);if(43===i||45===i){if(n=a.charCodeAt(2),88===n||120===n)return NaN}else if(48===i){switch(a.charCodeAt(1)){case 66:case 98:e=2,r=49;break;case 79:case 111:e=8,r=55;break;default:return+a}for(var o,s=a.slice(2),f=0,u=s.length;f<u;f++)if(o=s.charCodeAt(f),o<48||o>r)return NaN;return parseInt(s,e)}}return+a};if(!d(" 0o1")||!d("0b1")||d("+0x1")){d=function(t){var a=arguments.length<1?0:t,n=this;return n instanceof d&&(y?s(function(){v.valueOf.call(n)}):i(n)!=p)?o(new m(M(a)),n,d):M(a)};for(var g,I=n("9e1e")?f(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),w=0;I.length>w;w++)r(m,g=I[w])&&!r(d,g)&&l(d,g,u(m,g));d.prototype=v,v.constructor=d,n("2aba")(e,p,d)}},fdef:function(t,a){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);