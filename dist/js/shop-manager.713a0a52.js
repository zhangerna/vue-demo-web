(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["shop-manager"],{cf8c:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"animated fadeIn shop"},[e("b-card",[e("div",{attrs:{slot:"header"},slot:"header"},[e("i",{staticClass:"nav-icon fa fa-institution"}),t._v("\n            "+t._s(t.$t("m.shop.shop_manager"))+"\n            "),e("button",{staticClass:"btn btn-sm btn-primary link-bind",staticStyle:{float:"right"},on:{click:function(a){return t.$router.push("/inventory/shop-manager/add")}}},[e("i",{staticClass:"fa fa-institution"}),t._v("\n                "+t._s(t.$t("m.shop.add_shop"))+"\n            ")])]),e("div",{staticClass:"content"},[e("b-table",{staticClass:"mb-0 table-outline table-responsive-sm",attrs:{small:"",striped:"",responsive:"sm",items:t.table,hover:"",fields:t.tableFields},scopedSlots:t._u([{key:"info",fn:function(a){return[a.item.info&&"N/A"!=a.item.info?[e("div",[e("p",{staticStyle:{"margin-bottom":"2px","font-weight":"bolder"}},[t._v(t._s(a.item.info[0].firstName+a.item.info[0].lastName))]),e("p",{staticStyle:{"margin-bottom":"2px"}},[t._v(t._s(a.item.info[0].userEmail)+","+t._s(a.item.info[0].userPhone))]),a.item.info.length>1?e("p",{staticStyle:{color:"#63c2de",cursor:"pointer"},on:{click:function(e){return t.showMore(a.item.name,a.item.info)}}},[t._v(t._s(t.$t("m.shop.more")))]):t._e()])]:[t._v("\n                        N/A\n                    ")]]}},{key:"actions",fn:function(a){return[e("div",{staticClass:"btn btn-sm btn-info",staticStyle:{color:"#ffffff"},on:{click:function(e){return t.$router.push("/inventory/shop-manager/detail/"+a.item.id)}}},[e("i",{staticClass:"fa fa-eye"})]),e("div",{staticClass:"btn btn-sm btn-info",staticStyle:{"margin-left":"2px",color:"#ffffff"},on:{click:function(e){return t.$router.push("/inventory/shop-manager/edit/"+a.item.id)}}},[e("i",{staticClass:"fa fa-edit"})])]}}])})],1)]),e("b-modal",{ref:"my-modal",attrs:{title:t.curName},on:{ok:function(a){t.showTip=!1}},model:{value:t.showTip,callback:function(a){t.showTip=a},expression:"showTip"}},t._l(t.curAdminList,function(a,s){return e("b-row",{key:s},[e("b-col",{attrs:{sm:"12",md:"12"}},[e("p",{staticStyle:{"margin-bottom":"2px","font-weight":"bolder"}},[t._v(t._s(a.firstName+a.lastName))]),e("p",{staticStyle:{"margin-bottom":"2px"}},[t._v(t._s(a.userEmail)+","+t._s(a.userPhone))])])],1)}),1),e("b-row",[e("b-col",{attrs:{sm:"4",lg:"4"}},[e("div",{staticClass:"dataTables_info",attrs:{id:"DataTables0",role:"status","aria-live":"polite"}},[t._v("\n                "+t._s(t.$t("m.common.show"))+" "+t._s(10*(t.currentPage-1)+1)+" "+t._s(t.$t("m.common.to"))+" "+t._s(t.currentPage===t.totalPages?t.total:10*t.currentPage)+" "+t._s(t.$t("m.common.of"))+" "+t._s(t.total)+" "+t._s(t.$t("m.common.entries"))+"\n            ")])]),e("b-col",{attrs:{sm:"8",lg:"8"}},[e("b-pagination",{attrs:{align:"right","total-rows":t.total,"per-page":10},on:{input:function(a){return t.changePage(t.currentPage)}},model:{value:t.currentPage,callback:function(a){t.currentPage=a},expression:"currentPage"}})],1)],1)],1)},n=[],i=e("3159"),o={name:"shopManager",data:function(){return{tableFields:{name:{label:this.$t("m.shop.shop_name"),class:"text-center"},address:{label:this.$t("m.shop.shop_address"),class:"text-center"},info:{label:this.$t("m.shop.manager_info"),class:"text-center"},actions:{label:this.$t("m.vehicle.actions"),class:"Actions"}},table:null,currentPage:1,pageSize:10,total:0,totalPages:0,showTip:!1,curName:"",curAdminList:[]}},mounted:function(){this.initData(this.currentPage,this.pageSize)},methods:{showMore:function(t,a){this.curAdminList=a,this.curName=this.$t("m.add_shop.store_admin",{name:t}),this.showTip=!0},initData:function(t){var a=this;i["a"].get("/api/v1/store/pagelist?pageNo=".concat(t,"&pageSize=").concat(this.pageSize)).then(function(t){a.total=t.data.data.rowCount,a.filterData(t.data.data),a.totalPages=t.data.data.totalPages})},filterData:function(t){var a=this;this.table=t.datas.map(function(t){var e="";return e="en-US"===a.$i18n.locale?"".concat(t.countryEn?t.countryEn:"N/A",",").concat(t.stateEn?t.stateEn:"N/A",",").concat(t.cityEn?t.cityEn:"N/A",", ").concat(t.streetAddress?t.streetAddress:"N/A"):"".concat(t.country?t.country:"N/A",",").concat(t.state?t.state:"N/A",",").concat(t.city?t.city:"N/A",",").concat(t.streetAddress?t.streetAddress:"N/A"),{name:t.storeName,address:e,info:t.userList&&t.userList.length>0?t.userList:"N/A",id:t.id}})}}},r=o,c=e("2877"),l=Object(c["a"])(r,s,n,!1,null,null,null);a["default"]=l.exports}}]);