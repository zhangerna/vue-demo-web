(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["carbox"],{1063:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"animated fadeIn shop carbox"},[i("b-card",[i("div",{attrs:{slot:"header"},slot:"header"},[i("i",{staticClass:"nav-icon cui-tablet"}),t._v("\n            "+t._s(t.$t("m.dashboard.devices"))+"\n            "),i("button",{staticClass:"btn btn-sm btn-primary link-bind",staticStyle:{float:"right"},on:{click:t.installTip}},[i("i",{staticClass:"fa fa-wrench"}),t._v("\n                "+t._s(t.$t("m.vehicle.b_install"))+"\n            ")])]),i("div",{staticClass:"content"},[i("b-table",{staticClass:"mb-0 table-outline table-responsive-sm",attrs:{small:"",striped:"",responsive:"sm",items:t.table,hover:"",fields:t.tableFields},scopedSlots:t._u([{key:"actions",fn:function(e){return["N/A"!=e.item.vin?[i("div",{staticClass:"btn btn-sm btn-danger placeholder",staticStyle:{"margin-right":"4px"},on:{click:function(i){return t.unpairVehicle(e.item.deviceId)}}},[i("i",{staticClass:"fa fa-close"}),t._v(" "+t._s(t.$t("m.common.b_unpair"))+"\n                        ")])]:[i("div",{staticClass:"btn btn-sm btn-primary placeholder",staticStyle:{"margin-right":"4px"},on:{click:function(i){return t.bindVehicle(e.item.imei)}}},[i("i",{staticClass:"fa fa-wrench"}),t._v(t._s(t.$t("m.device.b_install"))+"\n                        ")])],i("div",{staticClass:"btn btn-sm btn-danger btn-del",on:{click:function(i){return t.delIdM(e.item.deviceId)}}},[i("i",{staticClass:"cui cui-trash"}),t._v(t._s(t.$t("m.device.b_del"))+"\n                    ")])]}}])})],1),i("b-row",{staticStyle:{"margin-top":"10px"}},[i("b-col",{attrs:{sm:"4",lg:"4"}},[i("div",{staticClass:"dataTables_info",attrs:{id:"DataTables0",role:"status","aria-live":"polite"}},[t._v("\n                    "+t._s(t.$t("m.common.show"))+" "+t._s(10*(t.currentPage-1)+1)+" "+t._s(t.$t("m.common.to"))+" "+t._s(t.currentPage===t.totalPages?t.total:10*t.currentPage)+" "+t._s(t.$t("m.common.of"))+" "+t._s(t.total)+" "+t._s(t.$t("m.common.entries"))+"\n                ")])]),i("b-col",{attrs:{sm:"8",lg:"8"}},[i("b-pagination",{attrs:{align:"right","total-rows":t.total,"per-page":10},on:{input:function(e){return t.changePage(t.currentPage)}},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1)],1),i("b-modal",{ref:"my-modal",attrs:{title:t.$t("m.cloud.install_box"),"ok-title":t.$t("m.tip.b_ok"),"ok-only":""},on:{ok:function(e){return t.bindDeviceData()}},model:{value:t.showBindTip,callback:function(e){t.showBindTip=e},expression:"showBindTip"}},[i("p",[t._v(t._s(t.$t("m.cloud.box_tip1")))]),i("p",[t._v(t._s(t.$t("m.cloud.box_tip2")))]),i("p",{staticStyle:{color:"red"}},[t._v(t._s(t.$t("m.cloud.box_tip3")))]),i("b-form-group",{staticClass:"vehicle-id"},[i("b-input-group",[i("b-input-group-prepend",[i("b-input-group-text",[t._v(t._s(t.$t("m.common.imei2")))])],1),i("b-form-input",{class:t.imeiIsVaild?"":"is-invalid",attrs:{type:"number",maxlength:"15",minlength:"15"},model:{value:t.curImei,callback:function(e){t.curImei=e},expression:"curImei"}})],1)],1),i("b-form-group",[i("b-input-group",[i("b-input-group-prepend",[i("b-input-group-text",[t._v(t._s(t.$t("m.cloud.vehicle_type")))])],1),i("select",{directives:[{name:"model",rawName:"v-model",value:t.vehicleType,expression:"vehicleType"}],staticClass:"form-control",attrs:{name:""},on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){var e="_value"in t?t._value:t.value;return e});t.vehicleType=e.target.multiple?i:i[0]}}},[i("option",{attrs:{value:"0"}},[t._v(t._s(t.$t("m.cloud.vehicle_type_p")))]),t._l(t.vehicleList,function(e,a){return i("option",{key:a,domProps:{value:e.vehicleId}},[t._v(t._s(e.vehicleYear?e.vehicleYear:"N/A")+" "+t._s(e.vehicleMake?e.vehicleMake:"N/A")+" "+t._s(e.vehicleModel?e.vehicleModel:"N/A")+" "+t._s(e.vehicleAlias?"-"+e.vehicleAlias:"N/A")+",VIN:"+t._s(e.vin)+" ")])})],2)],1)],1)],1)],1)},n=[],s=i("3159"),c={name:"shopManager",inject:["reload"],watch:{curImei:function(t){15==t.length?this.imeiIsVaild=!0:this.imeiIsVaild=!1}},data:function(){return{imeiIsVaild:!0,tableFields:{imei:{label:this.$t("m.common.imei2"),class:"text-center"},vin:{label:this.$t("m.common.vin2"),class:"text-center"},actions:{label:this.$t("m.vehicle.actions"),class:"Actions"}},curImei:"",table:null,showBindTip:!1,currentPage:1,pageSize:10,total:0,totalPages:0,showTip:!1,curName:"",vehicleList:[],vehicleType:""}},mounted:function(){this.initData(this.currentPage,this.pageSize)},methods:{initData:function(t){var e=this;s["a"].get("/api/v1/clouddrive/device/box/pagelist?pageNo=".concat(t,"&pageSize=").concat(this.pageSize)).then(function(t){200==t.data.code&&t.data.data.datas&&(e.total=t.data.data.rowCount,e.pageCount=t.data.data.totalPages,e.filterData(t.data.data.datas?t.data.data.datas:[]))})},installTip:function(){var t=this;s["a"].get("/api/v1/clouddrive/vehicle/unbindlist").then(function(e){200==e.data.code&&(t.vehicleList=e.data.data,t.showBindTip=!0)})},bindVehicle:function(t){this.curImei=t,this.showBindTip=!0},unpairVehicle:function(t){var e=this;s["a"].post("/api/v1/clouddrive/device/box/unbind",{deviceId:t}).then(function(t){200==t.data.code&&t.data.data.result?e.reload():alert("解绑失败")})},delIdM:function(t){var e=this;s["a"].post("/api/v1/clouddrive/device/box/delete",{deviceId:t}).then(function(t){200==t.data.code&&t.data.data.result?e.reload():alert("删除失败")})},filterData:function(t){this.table=t.map(function(t){return{imei:t.deviceImei,vin:t.vin?t.vin:"N/A",id:t.vehicleId,deviceType:t.deviceType?t.deviceType:"N/A",deviceId:t.deviceId}})},bindDeviceData:function(){var t=this;this.vehicleType&&this.curImei&&s["a"].post("/api/v1/clouddrive/device/box/bind",{deviceImei:this.curImei,vehicleId:this.vehicleType}).then(function(e){200==e.data.code&&e.data.data.result?t.reload():alert(e.data.data.content)})},prevPage:function(){this.initData(this.currentPage>1?this.currentPage-1:1)},nextPage:function(){this.initData(this.currentPage>=this.pageCount?this.currentPage:this.currentPage+1)},changePage:function(t){this.initData(t)}}},l=c,o=(i("4c10"),i("2877")),r=Object(o["a"])(l,a,n,!1,null,"64be1594",null);e["default"]=r.exports},"4c10":function(t,e,i){"use strict";var a=i("8e82"),n=i.n(a);n.a},"8e82":function(t,e,i){}}]);