(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["admin"],{3912:function(t,e,s){},d2e4:function(t,e,s){"use strict";var a=s("e357"),n=s.n(a);n.a},da9c:function(t,e,s){"use strict";var a=s("3912"),n=s.n(a);n.a},db4a:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"animated fadeIn"},[s("div",{staticClass:"card"},[s("div",{staticClass:"card-header"},[s("i",{staticClass:"nav-icon cui-people"}),s("strong",[t._v(t._s(t.$t("m.admin.title")))]),s("div",{staticClass:"float-right"},[s("a",{on:{click:function(e){return t.$router.push("/inventory/admin/invite")}}},[s("button",{staticClass:"btn btn-sm btn-primary"},[s("i",{staticClass:"fa fa-user-plus"}),t._v(" "+t._s(t.$t("m.admin.add_user"))+"\n                    ")])])])]),s("Alert",{attrs:{buttonText:t.showAlerts.buttonText,show:t.showAlerts.show,title:t.showAlerts.title,content:t.showAlerts.content},on:{closeRemindBox:t.closeBox}}),s("div",{staticClass:"card-body"},[s("div",[s("b-table",{attrs:{hover:"",items:t.items,fields:t.fields},scopedSlots:t._u([{key:"status",fn:function(e){return[s("span",{class:1===e.item.status?"badge badge-pill badge-success":"badge badge-pill badge-secondary"},[t._v("\n              "+t._s(1===e.item.status?t.$t("m.common.active"):t.$t("m.common.inactive"))+"\n          ")])]}},{key:"action",fn:function(e){return[s("div",{staticClass:"btn btn-sm btn-info",on:{click:function(s){return t.$router.push("/inventory/admin/detail/"+e.item.userId)}}},[s("i",{staticClass:"fa fa-align-justify"})]),s("div",{staticClass:"btn btn-sm btn-info btn-edit",on:{click:function(s){return t.$router.push("/inventory/admin/edit/"+e.item.userId)}}},[s("i",{staticClass:"fa fa-edit"})]),e.item.userId!==t.adminId?s("div",{staticClass:"btn btn-sm btn-danger btn-del",on:{click:function(s){return t.openBox(e.item.userId)}}},[s("i",{staticClass:"cui cui-trash"})]):t._e()]}}])})],1),s("b-row",[s("b-col",{attrs:{sm:"4",lg:"4"}},[s("div",{staticClass:"dataTables_info",attrs:{id:"DataTables0",role:"status","aria-live":"polite"}},[t.totalPages>0?s("span",[t._v(t._s(t.$t("m.common.show"))+" "+t._s(10*(t.currentPage-1)+1)+" "+t._s(t.$t("m.common.to"))+" "+t._s(t.currentPage===t.totalPages?t.rows:10*t.currentPage)+" "+t._s(t.$t("m.common.of"))+" "+t._s(t.rows)+" "+t._s(t.$t("m.common.entries")))]):s("span",[t._v(t._s(t.$t("m.common.show"))+" 0 "+t._s(t.$t("m.common.to"))+" 0 "+t._s(t.$t("m.common.of"))+" "+t._s(t.rows)+" "+t._s(t.$t("m.common.entries")))])])]),s("b-col",{attrs:{sm:"8",lg:"8"}},[s("b-pagination",{attrs:{align:"right","total-rows":t.rows,"per-page":t.perPage},on:{input:function(e){return t.turnToPage(t.currentPage)}},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1)],1)],1)])},n=[],o=s("3159"),i=s("ebd9"),r={name:"user",components:{Alert:i["a"]},data:function(){return{fields:{Username:{key:"Username",label:this.$t("m.login.p_username")},userEmail:{key:"Email",label:this.$t("m.admin.email")},city:{key:"Phone",label:this.$t("m.common.phone")},Role:{key:"Role",label:this.$t("m.common.role")},Dealership:{key:"Dealership",label:this.$t("m.dashboard.store")},status:{label:this.$t("m.admin.active")},action:{label:this.$t("m.vehicle.actions")}},items:null,data:null,currentPage:1,rows:1,perPage:1,totalPages:1,adminId:0,deleteUser:!1,showAlerts:{title:"",content:"",show:!1}}},mounted:function(){this.getList(1),this.adminId=this.$store.state.userInfo.userId},methods:{getList:function(t){var e=this,s="/api/v1/listUserDeatil?pageNo="+t+"&pageSize=10";o["a"].post(s).then(function(t){e.rows=t.data.data.rowCount,e.perPage=t.data.data.pageSize,e.totalPages=t.data.data.totalPages,e.data=t.data.data.datas;var s=t.data.data.datas,a=[];s.map(function(t,s){var n="Dealership Group Administrator"==t.role?e.$t("m.common.root"):"Dealership Manager"==t.role?e.$t("m.common.manager"):e.$t("m.common.user");a.push({Username:t.firstName+" "+t.lastName,Email:t.userEmail,Phone:t.phone,Role:n,userId:t.userId,status:t.status,Dealership:t.storeName,"Active/InActive":1===t.status?"Active":"InActive",Action:""})}),e.items=a})},turnToPage:function(t){this.getList(t)},delData:function(t){var e=this;o["a"].post("/api/v1/user/delete",{userId:t}).then(function(t){!0===t.data.data&&e.getList(1,10),console.log(t)}).catch(function(t){})},openBox:function(t){var e={title:this.$t("m.tip.warn"),show:!0,content:this.$t("m.tip.del_user"),buttonText:{btnFirst:this.$t("m.tip.b_cancel"),btnSecond:this.$t("m.tip.b_ok"),userId:t}};this.closeRemind(e)},closeRemind:function(t){this.showAlerts.show=t.show,this.showAlerts.title=t.title,this.showAlerts.content=t.content,this.showAlerts.buttonText=t.buttonText},closeBox:function(t,e){this.showAlerts.show=!this.showAlerts.show,this.deleteUser="ok"==t,!0===this.deleteUser&&this.delData(e)}}},l=r,c=(s("da9c"),s("2877")),d=Object(c["a"])(l,a,n,!1,null,"0bb41b8c",null);e["default"]=d.exports},e357:function(t,e,s){},ebd9:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("transition",{attrs:{name:"fade"}},[t.show?s("div",{attrs:{id:"popup-edit"}},[s("div",{staticClass:"modal-dialog modal-md popup-content"},[s("div",{staticClass:"modal-content",attrs:{role:"document",id:"__BVID__42___BV_modal_content_","aria-labelledby":"__BVID__42___BV_modal_header_","aria-describedby":"__BVID__42___BV_modal_body_"}},[s("header",{staticClass:"modal-header",attrs:{id:"__BVID__42___BV_modal_header_"}},[s("h5",{staticClass:"modal-title"},[t._v(t._s(t.title))]),s("button",{staticClass:"close",attrs:{type:"button","aria-label":"Close"},on:{click:function(e){return t.closePopup()}}},[t._v("×")])]),s("div",{staticClass:"modal-body",attrs:{id:"__BVID__42___BV_modal_body_"}},[s("div",[t._v(t._s(t.content))])]),s("footer",{staticClass:"modal-footer",attrs:{id:"__BVID__42___BV_modal_footer_"}},[t.buttonText&&t.buttonText.btnFirst?s("button",{staticClass:"btn btn-secondary",attrs:{type:"button"},on:{click:function(e){return t.closePopup(t.buttonText.origin?t.buttonText.origin:"")}}},[t._v(t._s(t.buttonText?t.buttonText.btnFirst:"")+"\n                  ")]):t._e(),t.buttonText&&t.buttonText.btnSecond?s("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){return t.closePopup(t.type="ok",t.buttonText.userId)}}},[t._v(t._s(t.buttonText.btnSecond)+"\n                  ")]):t._e()])])]),s("div",{staticClass:"bg",on:{click:function(e){return t.closePopup()}}})]):t._e()])},n=[],o={name:"modal",props:["show","title","content","buttonText"],methods:{closePopup:function(t,e){this.$emit("closeRemindBox",t,e)}}},i=o,r=(s("d2e4"),s("2877")),l=Object(r["a"])(i,a,n,!1,null,"15db5f6c",null);e["a"]=l.exports}}]);