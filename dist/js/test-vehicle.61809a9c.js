(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["test-vehicle"],{"32a2":function(t,e,a){"use strict";var i=a("5dd6"),n=a.n(i);n.a},"3a23":function(t,e,a){t.exports=a.p+"img/placeholder.7b8f4dc4.svg"},"5dd6":function(t,e,a){},"9dd5":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"animated fadeIn shop"},[a("b-card",[a("div",{attrs:{slot:"header"},slot:"header"},[a("i",{staticClass:"nav-icon fa fa-automobile"}),t._v("\n            "+t._s(t.$t("m.dashboard.test_vehicle"))+"\n\n            "),a("select",{directives:[{name:"model",rawName:"v-model",value:t.curStatus,expression:"curStatus"}],staticClass:" form-control",staticStyle:{display:"inline-block",width:"150px","margin-left":"20px"},on:{change:[function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.curStatus=e.target.multiple?a:a[0]},function(e){return t.searchStatus()}]}},[a("option",{attrs:{value:"all",selected:""}},[t._v(t._s(t.$t("m.cloud.all_status")))]),t._l(t.allStatus,function(e,i){return a("option",{key:i,domProps:{value:e.id}},[t._v(t._s(e.name))])})],2)]),a("div",{staticClass:"content"},[a("b-table",{staticClass:"mb-0 table-outline table-responsive-sm",attrs:{small:"",striped:"",responsive:"sm",items:t.table,hover:"",fields:t.tableFields},scopedSlots:t._u([{key:"photo",fn:function(t){return[a("img",{staticStyle:{"object-fit":"cover","border-radius":"4px"},attrs:{src:t.item.photo+"?width=300&height=300",width:"100px",height:"100px"}})]}},{key:"info",fn:function(e){return[a("p",{staticStyle:{"font-weight":"bolder","margin-bottom":"1px","text-decoration":"underline",color:"#63c2de"},on:{click:function(a){return t.$router.push("/test-drive/test-vehicle/detail/"+e.item.vehicleId)}}},[t._v(t._s(e.item.year?e.item.year:"N/A")+" "+t._s(e.item.make?e.item.make:"N/A")+" "+t._s(e.item.model?e.item.model:"N/A")+" "+t._s(e.item.alias?"-"+e.item.alias:""))]),a("p",{staticStyle:{"margin-bottom":"1px"}},[t._v(t._s(e.item.color?e.item.color:"N/A")+", "+t._s(e.item.trim?e.item.trim:"N/A"))]),a("p",{staticStyle:{"margin-bottom":"1px"}},[t._v(t._s(e.item.stock?e.item.stock:"N/A")+"\n                        "),e.item.plat?[a("span",{staticClass:"plat"},[t._v(t._s(e.item.plat))])]:t._e()],2)]}},{key:"point",fn:function(e){return[e.item.point?[a("p",{staticStyle:{"margin-bottom":"4px"}},[t._v(t._s(e.item.point))])]:[a("p",{staticStyle:{"margin-bottom":"4px"}},[t._v("未分配")])],a("p",{staticStyle:{color:"#63c2de",cursor:"pointer"},on:{click:function(a){return t.showChangePoint(e.item.vehicleId,e.item.parkingId)}}},[t._v(t._s(t.$t("m.cloud.change_point")))])]}},{key:"status",fn:function(e){return[10==e.item.vehicleStatus?[a("p",[t._v(t._s(t.$t("m.cloud.ready")))])]:t._e(),20==e.item.vehicleStatus?[a("span",{staticClass:"state-card-green"},[t._v(t._s(t.$t("m.cloud.test_drive")))]),a("p",{staticStyle:{color:"rgb(99, 194, 222)","margin-bottom":"4px"}},[t._v(t._s(t.$t("m.cloud.order")+":")+" "+t._s(e.item.orderId))])]:t._e(),30==e.item.vehicleStatus?[a("span",{staticClass:"state-card"},[t._v(t._s(t.$t("m.cloud.w_accept")))]),a("p",{staticStyle:{color:"rgb(99, 194, 222)","margin-bottom":"4px"}},[t._v(t._s(t.$t("m.cloud.order")+":")+" "+t._s(e.item.orderId))]),a("p",{staticStyle:{color:"rgb(99, 194, 222)","margin-bottom":"4px",cursor:"pointer"},on:{click:function(a){return t.verifyCar(e.item.orderId)}}},[t._v(t._s(t.$t("m.cloud.vehicle_accept")))])]:t._e()]}},{key:"actions",fn:function(e){return[a("div",{staticStyle:{display:"inline-block","margin-left":"4px"}},[a("i",{staticClass:"cui cui-location-pin btn btn-sm btn-secondary",class:e.item.lat?"btn-success":"",on:{click:function(a){return t.openMap(e.item.lat,e.item.lng)}}})]),a("div",{staticClass:"btn btn-sm btn-info vehicledetail",staticStyle:{"margin-left":"4px"},on:{click:function(a){return t.$router.push("/test-drive/test-vehicle/detail/"+e.item.vehicleId)}}},[a("i",{staticClass:"fa fa-eye"})]),a("div",{staticClass:"btn btn-sm btn-info vehicleedit",staticStyle:{"margin-left":"4px"},on:{click:function(a){return t.$router.push("/test-drive/test-vehicle/edit/"+e.item.vehicleId)}}},[a("i",{staticClass:"fa fa-edit"})])]}}])})],1)]),a("b-row",[a("b-col",{attrs:{sm:"4",lg:"4"}},[a("div",{staticClass:"dataTables_info",attrs:{id:"DataTables0",role:"status","aria-live":"polite"}},[t._v("\n                "+t._s(t.$t("m.common.show"))+" "+t._s(10*(t.currentPage-1)+1)+" "+t._s(t.$t("m.common.to"))+" "+t._s(t.currentPage===t.totalPages?t.total:10*t.currentPage)+" "+t._s(t.$t("m.common.of"))+" "+t._s(t.total)+" "+t._s(t.$t("m.common.entries"))+"\n            ")])]),a("b-col",{attrs:{sm:"8",lg:"8"}},[a("b-pagination",{attrs:{align:"right","total-rows":t.total,"per-page":10},on:{input:function(e){return t.changePage(t.currentPage)}},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1),a("b-modal",{ref:"my-modal",attrs:{title:t.$t("m.cloud.change_tip_title"),"ok-title":t.$t("m.tip.b_ok"),"cancel-title":t.$t("m.tip.b_cancel")},on:{ok:t.changePoint},model:{value:t.showChangeTip,callback:function(e){t.showChangeTip=e},expression:"showChangeTip"}},[a("p",{staticClass:"text-center",staticStyle:{"margin-bottom":"2px"}},[t._v(t._s(t.$t("m.cloud.change_tip_content")))]),a("p",{staticClass:"text-center",staticStyle:{"margin-bottom":"2px"}},[t._v(t._s(t.$t("m.cloud.change_tip_content1")))]),a("select",{directives:[{name:"model",rawName:"v-model",value:t.curLot,expression:"curLot"}],staticClass:" form-control",staticStyle:{width:"90%",margin:"0 auto","margin-top":"40px"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.curLot=e.target.multiple?a:a[0]}}},[a("option",{attrs:{value:"all",selected:""}},[t._v(t._s(t.$t("m.cloud.choice_point")))]),a("option",{attrs:{value:"remove"}},[t._v(t._s(t.$t("m.cloud.remove_point")))]),t._l(t.lotList,function(e,i){return a("option",{key:i,domProps:{value:e.id}},[t._v(t._s(e.parkingName))])})],2)]),a("b-modal",{ref:"my-modal",attrs:{title:t.$t("m.cloud.cant_change_point"),"ok-title":t.$t("m.tip.b_ok"),"cancel-title":t.$t("m.tip.b_cancel"),"ok-only":""},model:{value:t.changeErrorTip,callback:function(e){t.changeErrorTip=e},expression:"changeErrorTip"}},[t._v("\n        "+t._s(t.$t("m.cloud.cant_change_vehicle_status"))+"\n    ")]),a("b-modal",{ref:"my-modal",staticClass:"show-map",attrs:{"ok-title":t.$t("m.tip.b_ok"),"ok-only":""},on:{ok:function(e){t.showMap=!1}},model:{value:t.showMap,callback:function(e){t.showMap=e},expression:"showMap"}},[a("myMap",{attrs:{map:t.map}})],1)],1)},n=[],o=a("3159"),s=a("ccb6"),c={name:"shopManager",components:{myMap:s["a"]},inject:["reload"],data:function(){return{map:{},showMap:!1,tableFields:{photo:{label:this.$t("m.vehicle.photo"),class:"text-center"},info:{label:this.$t("m.sold_vehicle.info"),class:"text-center"},point:{label:this.$t("m.cloud.point"),class:"text-center"},status:{label:this.$t("m.cloud.status"),class:"text-center"},actions:{label:this.$t("m.vehicle.actions"),class:"Actions"}},table:null,currentPage:1,pageSize:10,total:0,totalPages:0,showChangeTip:!1,curStatus:"all",curVehicleId:"",curLot:"all",curParkId:"",changeErrorTip:!1,lotList:[],allStatus:[{id:"10",name:this.$t("m.cloud.ready")},{id:"20",name:this.$t("m.cloud.test_drive")},{id:"30",name:this.$t("m.cloud.w_accept")}]}},mounted:function(){this.initData(this.currentPage)},methods:{initData:function(t){var e=this;o["a"].get("/api/v1/clouddrive/vehicle/pagelist?pageNo=".concat(t,"&pageSize=").concat(this.pageSize).concat(this.curStatus&&"all"!=this.curStatus?"&drivingStatus="+this.curStatus:"")).then(function(t){200==t.data.code&&t.data.data.datas?(e.total=t.data.data.rowCount,e.filterData(t.data.data),e.totalPages=t.data.data.totalPages):e.table=[]}),o["a"].get("/api/v1/clouddrive/parkinglot/list").then(function(t){200==t.data.code&&(e.lotList=t.data.data)})},changePoint:function(){var t=this;this.curLot&&"all"!=this.curLot&&o["a"].post("/api/v1/clouddrive/vehicle/transferparking",{isRemove:"remove"==this.curLot?1:"",receiveParkingId:"remove"==this.curLot?"":this.curLot,vehicleId:this.curVehicleId,orgParkingid:this.curParkId}).then(function(e){200==e.data.code&&e.data.data.result?window.location.reload():t.changeErrorTip=!0})},openMap:function(t,e){t&&(this.map={lat:t,lng:e,area:[],vehicleInfo:{}},this.showMap=!0)},showChangePoint:function(t,e){this.curParkId=e,this.curVehicleId=t,this.showChangeTip=!0},filterData:function(t){this.table=t.datas.map(function(t){return{photo:t.photoPath?t.photoPath:a("3a23"),year:t.year,make:t.make,model:t.model,alias:t.alias,color:t.color,trim:t.trim,stock:t.stockNumber,plat:t.plat,point:t.parkingName,status:t.orderStatus,vehicleId:t.vehicleId,vehicleStatus:t.testDrivingStatus,parkingId:t.parkingLotId,orderId:t.orderId,id:t.id,lat:t.lastLocationLat,lng:t.lastLocationLng}})},searchStatus:function(){this.initData(this.currentPage)},prevPage:function(){this.initData(this.currentPage>1?this.currentPage-1:1)},nextPage:function(){this.initData(this.currentPage>=this.pageCount?this.currentPage:this.currentPage+1)},changePage:function(t){this.initData(t)},verifyCar:function(t){var e=this;o["a"].get("/api/v1/clouddrive/order/check?orderId=".concat(t)).then(function(t){200==t.data.code&&t.data.data.result?e.reload():alert(t.data.data.content)})}}},r=c,l=(a("32a2"),a("2877")),u=Object(l["a"])(r,i,n,!1,null,"0a12f354",null);e["default"]=u.exports},ccb6:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.$store.getters.userInfo.country&&"China"==t.$store.getters.userInfo.country?a("a-map",{attrs:{elId:t.elementId,map:t.map}}):t._e(),t.$store.getters.userInfo.country&&"China"==t.$store.getters.userInfo.country?t._e():a("g-map",{attrs:{map:t.map}})],1)},n=[],o={name:"myMap",props:["map","elementId"],components:{gMap:function(t){a.e("chunk-09751b77").then(function(){var e=[a("ab2d")];t.apply(null,e)}.bind(this)).catch(a.oe)},aMap:function(t){a.e("chunk-84c80646").then(function(){var e=[a("9078")];t.apply(null,e)}.bind(this)).catch(a.oe)}}},s=o,c=(a("f88d"),a("2877")),r=Object(c["a"])(s,i,n,!1,null,null,null);e["a"]=r.exports},ea6f:function(t,e,a){},f88d:function(t,e,a){"use strict";var i=a("ea6f"),n=a.n(i);n.a}}]);