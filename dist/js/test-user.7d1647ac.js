(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["test-user"],{"2f76":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"animated fadeIn user-detail"},[a("b-card",[a("div",{attrs:{slot:"header"},slot:"header"},[e._v("\n            "+e._s(e.$t("m.index.user"))+e._s(e.data.phone?e.data.phone:"")+"\n            "),a("span",{staticClass:"text-right badge float-right badge-success"},[e._v("\n                "+e._s(e.$t("m.cloud.submitted_time"))+":"+e._s(0===e.submitAuthTime?"":e.submitAuthTime)+"\n            ")])]),a("div",{staticClass:"content"},[a("b-card",[a("div",{attrs:{slot:"header"},slot:"header"},[e._v("\n                    "+e._s(e.$t("m.cloud.idcrad_title"))+"\n                    "),e.data.authMessageCode&&1===e.data.authMessageCode?a("span",{staticClass:"text-right badge badge-danger"},[e._v("\n                        "+e._s(e.$t("m.cloud.idcard_verify_failed"))+"\n                    ")]):e._e(),e.data.authMessageCode&&2===e.data.authMessageCode?a("span",{staticClass:"text-right badge badge-danger"},[e._v("\n                        "+e._s(e.$t("m.cloud.idcard_auth_fail"))+"\n                    ")]):e._e(),e.data.authMessageCode&&3===e.data.authMessageCode?a("span",{staticClass:"text-right badge badge-danger"},[e._v("\n                        "+e._s(e.$t("m.cloud.idcard_used_others"))+"\n                    ")]):e._e()]),a("div",{staticClass:"content"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-6"},[a("b-list-group",[a("div",{staticClass:"row list-group-item "},[a("b-row",[a("b-col",{attrs:{sm:"6"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.admin.name"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.idcardName,callback:function(t){e.idcardName=t},expression:"idcardName"}})],1)],1),a("b-col",{attrs:{sm:"2"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.gender"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.idcardGender,callback:function(t){e.idcardGender=t},expression:"idcardGender"}})],1)],1),a("b-col",{attrs:{sm:"4"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.nation"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.idcardNation,callback:function(t){e.idcardNation=t},expression:"idcardNation"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.birth_day"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.idcardBirthDate,callback:function(t){e.idcardBirthDate=t},expression:"idcardBirthDate"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.address"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.idcardAddress,callback:function(t){e.idcardAddress=t},expression:"idcardAddress"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.id_number"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.idcardNumber,callback:function(t){e.idcardNumber=t},expression:"idcardNumber"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.issure_auth"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.idcardOrganization,callback:function(t){e.idcardOrganization=t},expression:"idcardOrganization"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.valid_day"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.idcardExpireDate,callback:function(t){e.idcardExpireDate=t},expression:"idcardExpireDate"}})],1)],1)],1)],1)])],1),a("div",{staticClass:"col-sm-6"},[a("div",{staticClass:"col-sm-12 text-center"},[e.data.idCardResponse?e._e():a("img",{attrs:{src:s("3a23"),width:"50%"}}),e.data.idCardResponse?a("img",{attrs:{src:e.data.idCardResponse.idcardFrontUrl,width:"100%",alt:""}}):e._e()]),a("div",{staticClass:"col-sm-12 text-center"},[e.data.idCardResponse?e._e():a("img",{attrs:{src:s("3a23"),width:"50%"}}),e.data.idCardResponse?a("img",{attrs:{src:e.data.idCardResponse.idcardBackUrl,width:"100%",alt:""}}):e._e()])])])])]),a("b-card",[a("div",{attrs:{slot:"header"},slot:"header"},[e._v("\n                    "+e._s(e.$t("m.cloud.license_title"))+"\n                    "),e.data.authMessageCode&&4===e.data.authMessageCode?a("span",{staticClass:"text-right badge badge-danger"},[e._v("\n                        "+e._s(e.$t("m.cloud.license_verify_failed"))+"\n                    ")]):e._e(),e.data.authMessageCode&&5===e.data.authMessageCode?a("span",{staticClass:"text-right badge badge-danger"},[e._v("\n                        "+e._s(e.$t("m.cloud.difference_idcard_license"))+"\n                    ")]):e._e(),e.data.authMessageCode&&6===e.data.authMessageCode?a("span",{staticClass:"text-right badge badge-danger"},[e._v("\n                        "+e._s(e.$t("m.cloud.driver_used_others"))+"\n                    ")]):e._e()]),a("div",{staticClass:"content"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-sm-6"},[a("b-list-group",[a("div",{staticClass:"row list-group-item"},[a("b-row",[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.id_number"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.licenseNumber,callback:function(t){e.licenseNumber=t},expression:"licenseNumber"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"6"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.admin.name"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.licenseName,callback:function(t){e.licenseName=t},expression:"licenseName"}})],1)],1),a("b-col",{attrs:{sm:"2"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.gender"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.licenseGender,callback:function(t){e.licenseGender=t},expression:"licenseGender"}})],1)],1),a("b-col",{attrs:{sm:"4"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.country"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.licenseCountry,callback:function(t){e.licenseCountry=t},expression:"licenseCountry"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.address"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.licenseAddress,callback:function(t){e.licenseAddress=t},expression:"licenseAddress"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.birth_day"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.licenseBirthDate,callback:function(t){e.licenseBirthDate=t},expression:"licenseBirthDate"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.init_driving_license"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.licenseInitDate,callback:function(t){e.licenseInitDate=t},expression:"licenseInitDate"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.vehicle_class"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.licenseCarClass,callback:function(t){e.licenseCarClass=t},expression:"licenseCarClass"}})],1)],1)],1),a("b-row",{staticClass:"margin-top-20"},[a("b-col",{attrs:{sm:"12"}},[a("b-form-group",{staticClass:"mb-0",attrs:{label:e.$t("m.cloud.valid_day"),"label-align-sm":"top"}},[a("b-input",{model:{value:e.licenseExpireDate,callback:function(t){e.licenseExpireDate=t},expression:"licenseExpireDate"}})],1)],1)],1)],1)])],1),a("div",{staticClass:"col-sm-6"},[a("div",{staticClass:"col-sm-12 text-center"},[e.data.driveLicenseResponse?e._e():a("img",{attrs:{src:s("3a23"),width:"50%"}}),e.data.driveLicenseResponse?a("img",{attrs:{src:e.data.driveLicenseResponse.driveLicensePrimeUrl,width:"100%",alt:""}}):e._e()]),a("div",{staticClass:"col-sm-12 text-center"},[e.data.driveLicenseResponse?e._e():a("img",{attrs:{src:s("3a23"),width:"50%"}}),e.data.driveLicenseResponse?a("img",{attrs:{src:e.data.driveLicenseResponse.driveLicenseAuxiUrl,width:"100%",alt:""}}):e._e()])])])])]),a("b-row",[a("b-col",{attrs:{sm:"7"}},[a("p",{staticStyle:{"margin-bottom":"10px"}},[e._v(e._s(e.$t("m.cloud.verify_result")))]),a("div",{staticClass:"d-flex justify-content-center"},[a("b-form-select",{staticClass:"select-box",model:{value:e.selected_reason,callback:function(t){e.selected_reason=t},expression:"selected_reason"}},e._l(e.reasonList,function(t,s){return a("option",{key:s,attrs:{disabled:0===s},domProps:{value:t.value}},[e._v("\n                                "+e._s(t.text)+"\n                            ")])}),0),a("button",{staticClass:"btn btn-primary",staticStyle:{"margin-left":"10px"},attrs:{disabled:"null"===e.selected_reason},on:{click:e.saveUserInfo}},[e._v("\n                            "+e._s(e.$t("m.common.submit"))+"\n                        ")])],1)])],1),a("b-modal",{ref:"my-modal",attrs:{title:e.$t("m.common.action"),"ok-title":e.$t("m.tip.b_ok"),"ok-only":""},on:{ok:function(t){e.updateUserStatus=!1}},model:{value:e.updateUserStatus,callback:function(t){e.updateUserStatus=t},expression:"updateUserStatus"}},[a("div",[e._v(e._s(e.updateUserText))])])],1)])],1)},i=[],n=s("3159"),r=s("c466"),d={name:"testUserVerify",inject:["reload"],data:function(){return{data:{},showMap:!1,updateUserStatus:!1,updateUserText:"",map:{},show:!1,updateInfo:"",markedAt:"",table:null,idcardVerifyTime:null,driverLicenseverifyTime:null,idcardName:"N/A",idcardGender:"N/A",idcardNation:"N/A",idcardBirthDate:"N/A",idcardAddress:"N/A",idcardNumber:"N/A",idcardOrganization:"N/A",idcardExpireDate:"N/A",licenseNumber:"N/A",licenseName:"N/A",licenseGender:"N/A",licenseCountry:"N/A",licenseAddress:"N/A",licenseBirthDate:"N/A",licenseInitDate:"N/A",licenseCarClass:"N/A",licenseExpireDate:"N/A",selected_reason:"null",submitAuthTime:null,reasonList:[{value:"null",text:this.$t("m.add_shop.please_select")},{value:1,text:this.$t("m.cloud.verify_success")},{value:2,text:this.$t("m.cloud.idcard_verify_failed")},{value:3,text:this.$t("m.cloud.license_verify_failed")},{value:4,text:this.$t("m.cloud.difference_idcard_license")}]}},mounted:function(){var e=this;n["a"].get("/api/v1/clouddrive/user/detail?userId="+this.$route.params.id).then(function(t){if(200==t.data.code){if(e.data=t.data.data,e.idcardVerifyTime=Object(r["d"])(e.data.idCardResponse.certificationTime),e.driverLicenseverifyTime=Object(r["d"])(e.data.driveLicenseResponse.certificationTime),e.submitAuthTime=e.data.submitAuthTime?Object(r["d"])(e.data.submitAuthTime):0,t.data.data.idCardResponse){var s=t.data.data.idCardResponse;e.idcardName=s.userName,e.idcardGender=s.gender?1===s.gender?e.$t("m.common.boy"):2===s.gender?e.$t("m.common.girl"):"N/A":"",e.idcardNation=s.ethnicGroup,e.idcardBirthDate=s.birthDate,e.idcardAddress=s.address,e.idcardNumber=s.idcardNumber,e.idcardOrganization=s.issuingOrganization,e.idcardExpireDate=s.expireDate}if(t.data.data.driveLicenseResponse){var a=t.data.data.driveLicenseResponse;e.licenseNumber=a.drivingLicenseNumber,e.licenseName=a.userName,e.licenseGender=a.gender?1===a.gender?e.$t("m.common.boy"):e.$t("m.common.girl"):"",e.licenseCountry=a.nationality,e.licenseAddress=a.address,e.licenseBirthDate=a.birthDate,e.licenseInitDate=a.initialDrivingLicenseDate,e.licenseCarClass=a.quasiDrivingModel,e.licenseExpireDate=a.expireDate}}})},methods:{filterData:function(e){this.table=e.map(function(e){return{orderId:e.orderServiceNum,id:e.orderId,phone:e.phone,year:e.vehicleYear,make:e.vehicleMake,model:e.vehicleModel,color:e.vehicleColor,alias:e.vehicleAlias,trim:e.vehicleTrim,plat:e.vehiclePlate,num:e.vehiclePlate,testInfo:e.parkingName,pointTime:e.appointmentStartTime+"~"+e.appointmentEndTime,status:e.orderStatus}})},saveUserInfo:function(){var e=this,t={address:this.licenseAddress,birthDate:this.licenseBirthDate,drivingLicenseNumber:this.licenseNumber,userName:this.licenseName,gender:"男"===this.licenseGender?1:2,nationality:this.licenseCountry,initialDrivingLicenseDate:this.licenseInitDate,quasiDrivingModel:this.licenseCarClass,expireDate:this.licenseExpireDate},s={userName:this.idcardName,gender:"男"===this.idcardGender?1:2,ethnicGroup:this.idcardNation,birthDate:this.idcardBirthDate,address:this.idcardAddress,idcardNumber:this.idcardNumber,issuingOrganization:this.idcardOrganization,expireDate:this.idcardExpireDate},a=this.selected_reason,i={idCardResponse:s,driveLicenseResponse:t,check:a,dUserId:this.$route.params.id};console.log(i),n["a"].post("/api/v1/clouddrive/user/checkcard",i).then(function(t){200===t.data.code&&!0===t.data.data.result?(e.updateUserStatus=!0,e.updateUserText=e.$t("m.tip.update_succ")):(e.updateUserStatus=!0,e.updateUserText=e.$t("m.tip.update_failed"))}).catch(function(e){console.log(e)})}}},c=d,l=(s("997d"),s("2877")),o=Object(l["a"])(c,a,i,!1,null,null,null);t["default"]=o.exports},"3a23":function(e,t,s){e.exports=s.p+"img/placeholder.7b8f4dc4.svg"},"86da":function(e,t,s){"use strict";var a=s("deb5"),i=s.n(a);i.a},"997d":function(e,t,s){"use strict";var a=s("d701"),i=s.n(a);i.a},af75:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"animated fadeIn shop"},[s("b-card",[s("div",{attrs:{slot:"header"},slot:"header"},[s("i",{staticClass:"nav-icon icons cui-user"}),e._v("\n                "+e._s(e.$t("m.dashboard.test_user"))+"\n            ")]),s("div",{staticClass:"content"},[s("b-table",{staticClass:"mb-0 table-outline-user-list table-outline table-responsive-sm",staticStyle:{"margin-bottom":"0"},attrs:{small:"",striped:"",responsive:"sm",items:e.table,hover:"",fields:e.tableFields},scopedSlots:e._u([{key:"phone",fn:function(t){return[s("p",[e._v(e._s(t.item.phone?t.item.phone:"N/A"))])]}},{key:"idcard",fn:function(t){return[10==t.item.idcardAuthStatus?[s("span",{staticClass:"badge badge-pill btn-secondary"},[e._v(e._s(e.$t("m.cloud.unsubmit")))])]:e._e(),20==t.item.idcardAuthStatus?[s("span",{staticClass:"badge badge-pill btn-secondary"},[e._v(e._s(e.$t("m.cloud.resubmit")))])]:e._e(),30==t.item.idcardAuthStatus?[s("span",{staticClass:"badge badge-success"},[e._v(e._s(e.$t("m.cloud.submitted")))])]:e._e()]}},{key:"driveCheck",fn:function(t){return[10==t.item.driverAuthStatus?[s("span",{staticClass:"badge badge-pill btn-secondary"},[e._v(e._s(e.$t("m.cloud.unsubmit")))])]:e._e(),20==t.item.driverAuthStatus||25==t.item.driverAuthStatus?[s("span",{staticClass:"badge badge-pill btn-secondary"},[e._v(e._s(e.$t("m.cloud.resubmit")))])]:e._e(),30==t.item.driverAuthStatus?[s("span",{staticClass:"badge badge-success"},[e._v(e._s(e.$t("m.cloud.submitted")))])]:e._e()]}},{key:"statusCheck",fn:function(t){return[10==t.item.checkStatus?[s("span",{staticClass:"badge badge-pill btn-secondary"},[e._v(e._s(e.$t("m.cloud.unsubmit_verify")))])]:e._e(),20==t.item.checkStatus||30==t.item.checkStatus?[s("span",{staticClass:"badge badge-warning"},[e._v(e._s(e.$t("m.cloud.wait_verify")))])]:e._e(),40==t.item.checkStatus?[s("span",{staticClass:"badge badge-danger"},[e._v(e._s(e.$t("m.cloud.verify_failed")))])]:e._e(),50==t.item.checkStatus?[s("span",{staticClass:"badge badge-success"},[e._v(e._s(e.$t("m.cloud.verify_success")))])]:e._e()]}},{key:"dealership",fn:function(t){return[s("span",[e._v(e._s(t.item.dealership?t.item.dealership:"N/A"))])]}},{key:"actions",fn:function(t){return[s("div",{staticClass:"btn btn-sm btn-info vehicledetail",staticStyle:{"margin-left":"4px"},on:{click:function(s){return e.$router.push("/test-drive/test-user/detail/"+t.item.userId)}}},[s("i",{staticClass:"fa fa-eye"})]),20==t.item.checkStatus||30==t.item.checkStatus?[s("div",{staticClass:"btn btn-sm btn-info vehicledetail",staticStyle:{"margin-left":"4px"},on:{click:function(s){return e.$router.push("/test-drive/test-user/verify/"+t.item.userId)}}},[s("i",{staticClass:"fa fa-search-plus"})])]:e._e()]}}])})],1)]),s("b-row",[s("b-col",{attrs:{sm:"4",lg:"4"}},[s("div",{staticClass:"dataTables_info",attrs:{id:"DataTables0",role:"status","aria-live":"polite"}},[e._v("\n                    "+e._s(e.$t("m.common.show"))+" "+e._s(10*(e.currentPage-1)+1)+" "+e._s(e.$t("m.common.to"))+" "+e._s(e.currentPage===e.totalPages?e.total:10*e.currentPage)+" "+e._s(e.$t("m.common.of"))+" "+e._s(e.total)+" "+e._s(e.$t("m.common.entries"))+"\n                ")])]),s("b-col",{attrs:{sm:"8",lg:"8"}},[s("b-pagination",{attrs:{align:"right","total-rows":e.total,"per-page":10},on:{input:function(t){return e.changePage(e.currentPage)}},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)],1)],1)},i=[],n=s("3159"),r={name:"shopManager",data:function(){return{tableFields:{phone:{label:this.$t("m.common.phone"),class:"text-center"},idcard:{label:this.$t("m.cloud.id_card"),class:"text-center"},driveCheck:{label:this.$t("m.cloud.drive_check"),class:"text-center"},statusCheck:{label:this.$t("m.cloud.verify_status"),class:"text-center"},dealership:{label:this.$t("m.common.dealership"),class:"text-center"},actions:{label:this.$t("m.vehicle.actions"),class:"Actions"}},table:null,currentPage:1,pageSize:10,total:0,totalPages:0,showTip:!1,curName:"",curAdminList:[]}},mounted:function(){this.initData(this.currentPage,this.pageSize)},methods:{initData:function(e){var t=this;n["a"].get("/api/v1/clouddrive/user/list?pageNo=".concat(e,"&pageSize=").concat(this.pageSize)).then(function(e){t.total=e.data.data.rowCount,t.filterData(e.data.data),t.pageCount=e.data.data.totalPages})},filterData:function(e){this.table=e.datas.map(function(e){return{phone:e.phone,idcardAuthStatus:e.idcardAuthStatus,driverAuthStatus:e.driverAuthStatus,checkStatus:e.checkStatus,dealership:e.tenantName,point:e.appointmentStatus,userId:e.userId}})},prevPage:function(){this.initData(this.currentPage>1?this.currentPage-1:1)},nextPage:function(){this.initData(this.currentPage>=this.pageCount?this.currentPage:this.currentPage+1)},changePage:function(e){this.initData(e)}}},d=r,c=(s("f4fb"),s("2877")),l=Object(c["a"])(d,a,i,!1,null,null,null);t["default"]=l.exports},c466:function(e,t,s){"use strict";function a(e){var t=new Date(e),s=t.getFullYear()+" ",a=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,i=t.getDate()<10?"0"+t.getDate():t.getDate(),n=t.getHours()<10?"0"+t.getHours():t.getHours(),r=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes();return a+"/"+i+"/"+s+" "+n+":"+r}function i(e){var t=new Date(e),s=t.getFullYear(),a=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,i=t.getDate()<10?"0"+t.getDate():t.getDate();return s+"-"+a+"-"+i}function n(e,t){return Math.ceil((t-e)/1e3/3600/24)}function r(e){var t=new Date(e),s=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Spt","Oct","Nov","Dec"),a=new Array("Sun","Mon","Tus","Wed","Thu","Fri","Sat"),i=t.getMonth(),n=t.getDay(),r=t.getDate();return a[n]+" , "+s[i]+" "+r+" , "+t.getFullYear()}function d(e){if(8===e.length){var t=e.slice(0,4),s=e.slice(4,6),a=e.slice(6,8);return t+"/"+s+"/"+a}if(17===e.length){var i=e.slice(0,4),n=e.slice(4,6),r=e.slice(6,8),d=e.slice(9,13),c=e.slice(13,15),l=e.slice(15,17);return i+"/"+n+"/"+r+" - "+d+"/"+c+"/"+l}}function c(e){var t=e.slice(0,4),s=(new Date).getFullYear();return s-t}function l(e){var t=new Date(e.slice(0,4),e.slice(4,5),e.slice(5,6)).getTime(),s=(new Date).getTime(),a=s-t,i=Math.floor(a/31536e6),n=Math.floor(a-i/2592e6)%12;return{year:i,month:n}}function o(e){var t=new Date(e),s=t.getFullYear(),a=t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1,i=t.getDate()<10?"0"+t.getDate():t.getDate();return a+"/"+i+"/"+s}function u(e,t){var s=new Date(e),a=(s.getFullYear(),s.getMonth()+1<10?s.getMonth():s.getMonth(),s.getDate()<10?s.getDate():s.getDate(),s.getHours()<10?"0"+s.getHours():s.getHours()),i=s.getMinutes()<10?"0"+s.getMinutes():s.getMinutes(),n=new Date(t),r=(n.getFullYear(),n.getMonth()+1<10?n.getMonth():n.getMonth(),n.getDate()<10?n.getDate():n.getDate(),n.getHours()<10?"0"+n.getHours():n.getHours()),d=n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes();return"".concat(a,":").concat(i,"-").concat(r,":").concat(d)}function m(e){var t=new Date(e),s=(t.getFullYear(),t.getMonth()+1<10?t.getMonth():t.getMonth(),t.getDate()<10?t.getDate():t.getDate(),t.getHours()<10?"0"+t.getHours():t.getHours()),a=t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes(),i=t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds();return s+":"+a+":"+i}s.d(t,"d",function(){return a}),s.d(t,"i",function(){return i}),s.d(t,"g",function(){return n}),s.d(t,"h",function(){return r}),s.d(t,"c",function(){return d}),s.d(t,"a",function(){return c}),s.d(t,"b",function(){return l}),s.d(t,"e",function(){return o}),s.d(t,"j",function(){return u}),s.d(t,"f",function(){return m})},d701:function(e,t,s){},deb5:function(e,t,s){},e4bb:function(e,t,s){},e99b:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"animated fadeIn user-detail"},[s("b-card",[s("div",{attrs:{slot:"header"},slot:"header"},[e._v("\n            "+e._s(e.$t("m.index.user"))+e._s(e.data.phone?e.data.phone:"")+"\n            "),e.data.checkStatus&&50===e.data.checkStatus?s("span",{staticClass:"text-right float-right"},[s("span",{staticClass:"badge badge-success"},[e._v(e._s(e.$t("m.cloud.verify_success")))])]):e._e(),e.data.checkStatus&&40===e.data.checkStatus?s("span",{staticClass:"text-right float-right"},[s("span",{staticClass:"badge badge-danger"},[e._v(e._s(e.$t("m.cloud.verify_failed")))])]):e._e(),!e.data.checkStatus||20!==e.data.checkStatus&&30!==e.data.checkStatus?e._e():s("span",{staticClass:"text-right float-right"},[s("span",{staticClass:"badge badge-warning"},[e._v(e._s(e.$t("m.cloud.wait_verify")))])]),e.data.checkStatus&&10===e.data.checkStatus?s("span",{staticClass:"text-right float-right"},[s("span",{staticClass:"badge badge-pill btn-secondary"},[e._v(e._s(e.$t("m.cloud.unsubmit_verify")))])]):e._e()]),s("div",{staticClass:"content"},[s("b-card",[s("div",{attrs:{slot:"header"},slot:"header"},[e._v("\n                    "+e._s(e.$t("m.cloud.idcheck_info"))+"\n                ")]),s("div",{staticClass:"content"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm-6"},[s("b-list-group",[s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.admin.name"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.idCardResponse?e.data.idCardResponse.userName:"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.gender"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.idCardResponse&&e.data.idCardResponse.gender?1===e.data.idCardResponse.gender?e.$t("m.common.boy"):e.$t("m.common.girl"):"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.nation"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.idCardResponse&&e.data.idCardResponse.ethnicGroup?e.data.idCardResponse.ethnicGroup:"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.birth_day"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.idcardBirthDate)+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.address"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.idCardResponse&&e.data.idCardResponse.address?e.data.idCardResponse.address:"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.id_type"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.idCard"))+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.id_number"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.idCardResponse&&e.data.idCardResponse.idcardNumber?e.data.idCardResponse.idcardNumber:"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.issure_auth"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.idCardResponse&&e.data.idCardResponse.issuingOrganization?e.data.idCardResponse.issuingOrganization:"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.valid_day"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.idcardExpireDate)+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.verify_time"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.idcardVerifyTime)+"\n                                    ")])])])],1),s("div",{staticClass:"col-sm-6"},[s("div",{staticClass:"col-sm-12 text-center"},[s("img",{attrs:{src:e.data.idCardResponse?e.data.idCardResponse.idcardFrontUrl:"@/assets/pages-img/placeholder.svg",width:"100%"}})]),s("div",{staticClass:"col-sm-12 text-center"},[s("img",{attrs:{src:e.data.idCardResponse?e.data.idCardResponse.idcardBackUrl:"@/assets/pages-img/placeholder.svg",width:"100%"}})])])])])]),s("b-card",[s("div",{attrs:{slot:"header"},slot:"header"},[e._v("\n                    "+e._s(e.$t("m.cloud.real_name"))+"\n                ")]),s("div",{staticClass:"content"},[s("div",{staticClass:"row"},[s("div",{staticClass:"col-sm-6"},[s("b-list-group",[s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.admin.name"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.driveLicenseResponse?e.data.driveLicenseResponse.userName:"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.gender"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.driveLicenseResponse&&e.data.driveLicenseResponse.gender?1===e.data.driveLicenseResponse.gender?e.$t("m.common.boy"):e.$t("m.common.girl"):"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.country"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.driveLicenseResponse&&e.data.driveLicenseResponse.nationality?e.data.driveLicenseResponse.nationality:"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.address"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.driveLicenseResponse&&e.data.driveLicenseResponse.address?e.data.driveLicenseResponse.address:"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.birth_day"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.licenseBirthDate)+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.init_driving_license"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.licenceFristGetTime)+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.vehicle_class"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.driveLicenseResponse&&e.data.driveLicenseResponse.quasiDrivingModel?e.data.driveLicenseResponse.quasiDrivingModel:"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.id_type"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.drive_type"))+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.id_number"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.data.driveLicenseResponse&&e.data.driveLicenseResponse.drivingLicenseNumber?e.data.driveLicenseResponse.drivingLicenseNumber:"N/A")+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.valid_day"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.licenseExpireDate)+"\n                                    ")])]),s("div",{staticClass:"row list-group-item d-flex justify-content-between align-items-center"},[s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.$t("m.cloud.verify_time"))+"\n                                    ")]),s("div",{staticClass:"col-sm-6"},[e._v("\n                                        "+e._s(e.driverLicenseverifyTime)+"\n                                    ")])])])],1),s("div",{staticClass:"col-sm-6"},[s("div",{staticClass:"col-sm-12 text-center"},[s("img",{attrs:{src:e.data.driveLicenseResponse?e.data.driveLicenseResponse.driveLicensePrimeUrl:"@/assets/pages-img/placeholder.svg",width:"100%",alt:""}})]),s("div",{staticClass:"col-sm-12 text-center"},[s("img",{attrs:{src:e.data.driveLicenseResponse?e.data.driveLicenseResponse.driveLicenseAuxiUrl:"@/assets/pages-img/placeholder.svg",width:"100%",alt:""}})])])])])]),s("b-card",[s("div",{attrs:{slot:"header"},slot:"header"},[e._v("\n                    "+e._s(e.$t("m.cloud.appoint_history"))+"\n                ")]),s("div",{staticClass:"content"},[s("b-table",{staticClass:"mb-0 table-outline table-responsive-sm",attrs:{small:"",striped:"",responsive:"sm",items:e.table,hover:"",fields:e.tableFields},scopedSlots:e._u([{key:"orderId",fn:function(t){return[s("div",{staticStyle:{cursor:"pointer",color:"#20a8d8"},on:{click:function(s){return e.$router.push("/test-drive/reservation-order/detail/"+t.item.id)}}},[e._v(e._s(t.item.orderId))])]}}])})],1),s("b-row",{staticStyle:{"margin-top":"20px"}},[s("b-col",{attrs:{sm:"4",lg:"4"}},[s("div",{staticClass:"dataTables_info",attrs:{id:"DataTables0",role:"status","aria-live":"polite"}},[e._v("\n                            "+e._s(e.$t("m.common.show"))+" "+e._s(10*(e.currentPage-1)+1)+" "+e._s(e.$t("m.common.to"))+" "+e._s(e.currentPage===e.totalPages?e.total:10*e.currentPage)+" "+e._s(e.$t("m.common.of"))+" "+e._s(e.total)+" "+e._s(e.$t("m.common.entries"))+"\n                        ")])]),s("b-col",{attrs:{sm:"8",lg:"8"}},[s("b-pagination",{attrs:{align:"right","total-rows":e.total,"per-page":10},on:{input:function(t){return e.getUserOrderList(e.currentPage)}},model:{value:e.currentPage,callback:function(t){e.currentPage=t},expression:"currentPage"}})],1)],1)],1)],1)])],1)},i=[],n=s("3159"),r=s("c466"),d={name:"testUserDetail",inject:["reload"],data:function(){return{data:{},showMap:!1,map:{},show:!1,updateInfo:"",markedAt:"",table:null,tableFields:{orderId:{label:this.$t("m.cloud.order_id"),class:"text-center"},vehicleInfo:{label:this.$t("m.cloud.vehicle_info"),class:"text-center"},testInfo:{label:this.$t("m.dashboard.test_point"),class:"text-center"},pointTime:{label:this.$t("m.cloud.rese_test_drive"),class:"text-center"},status:{label:this.$t("m.cloud.status"),class:"text-center"}},idcardVerifyTime:null,driverLicenseverifyTime:null,currentPage:1,totalPages:0,total:0,idcardBirthDate:null,idcardExpireDate:null,licenseBirthDate:null,licenceFristGetTime:null,licenseExpireDate:null}},mounted:function(){var e=this;n["a"].get("/api/v1/clouddrive/user/detail?userId="+this.$route.params.id).then(function(t){if(200==t.data.code){e.data=t.data.data;var s=t.data.data;e.idcardVerifyTime=s.idCardResponse.certificationTime?Object(r["d"])(s.idCardResponse.certificationTime):"",e.driverLicenseverifyTime=s.driveLicenseResponse.certificationTime?Object(r["d"])(s.driveLicenseResponse.certificationTime):"",e.idcardBirthDate=s.idCardResponse.birthDate?Object(r["c"])(s.idCardResponse.birthDate):"N/A",e.idcardExpireDate=s.idCardResponse.expireDate?Object(r["c"])(s.idCardResponse.expireDate):"N/A",e.licenseBirthDate=s.driveLicenseResponse.birthDate?Object(r["c"])(s.driveLicenseResponse.birthDate):"N/A",e.licenceFristGetTime=s.driveLicenseResponse.initialDrivingLicenseDate?Object(r["c"])(s.driveLicenseResponse.initialDrivingLicenseDate):"N/A",e.licenseExpireDate=s.driveLicenseResponse.expireDate?Object(r["c"])(s.driveLicenseResponse.expireDate):"N/A"}}),this.getUserOrderList(1)},methods:{getUserOrderList:function(e){var t=this,s=e||1;n["a"].get("/api/v1/clouddrive/order/pagelistbyuser?duserid="+this.$route.params.id+"&pageNo="+s).then(function(e){200==e.data.code&&(t.filterData(e.data.data.datas?e.data.data.datas:[]),t.total=e.data.data.rowCount,t.totalPages=e.data.data.totalPages)})},filterData:function(e){var t=this;this.table=e.map(function(e){var s;return e.orderStatus&&(10===e.orderStatus?s=t.$t("m.cloud.wait_pick_up"):20===e.orderStatus?s=t.$t("m.cloud.wait_return"):30===e.orderStatus?s=t.$t("m.cloud.returned_vehicle"):40===e.orderStatus?s=t.$t("m.cloud.complete"):50===e.orderStatus&&(s=t.$t("m.cloud.canceled"))),{orderId:e.orderServiceNum,vehicleInfo:e.vehicleYear+" "+e.vehicleMake+" "+e.vehicleModel+" "+e.vehicleStockNum+" "+e.vehiclePlate,id:e.orderId,phone:e.phone,color:e.vehicleColor,alias:e.vehicleAlias,trim:e.vehicleTrim,plat:e.vehiclePlate,num:e.vehicleStockNum,testInfo:e.parkingName,pointTime:Object(r["d"])(e.appointmentStartTime),status:s}})}}},c=d,l=(s("86da"),s("2877")),o=Object(l["a"])(c,a,i,!1,null,null,null);t["default"]=o.exports},f4fb:function(e,t,s){"use strict";var a=s("e4bb"),i=s.n(a);i.a}}]);