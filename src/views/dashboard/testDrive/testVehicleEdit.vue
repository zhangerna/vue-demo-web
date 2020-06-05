<template>
    <div class="animated fadeIn car-edit">
        <!-- <h6 style="padding:0 0 10px 15px">{{ $t('m.vehicle_edit.title') }}</h6> -->
        <b-card class="custom-header">
            <div slot="header">
                {{ $t("m.common.test_vehicle_edit") }}
                <!-- <button class="btn btn-outline-info btn-block active float-right font-weight-bold"
                            style="width: 50px;font-size: 12px;padding: 0px;color: #fff;margin: 0 5px 0 0"
                            @click="$router.push('/test-drive/test-vehicle/edit/' + $route.params.id)">{{ $t('m.common.edit') }}
                </button>-->
            </div>
            <b-row>
                <b-col sm="6" class="left">
                    <b-col class="col-12 edit-top">
                        <div class="justify-content-between specific-data" style="margin:0 0 40px 0;">
                            <Alert @closeRemindBox="closeBox()" :buttonText="showAlerts.buttonText" :show="showAlerts.show" :title="showAlerts.title" :content="showAlerts.content"></Alert>
                            <div class="d-flex justify-content-between">
                                <span class="col-4" style="padding:0;">{{ $t("m.common.vin") }}</span>
                                <span class="text-left col-8">{{ vin }}</span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="col-4" style="padding:0;">{{ $t("m.common.imei") }}</span>
                                <span class="text-left col-8">
                                    <span v-if="iMei" class="col-6" style="padding:0 15px 0 0;">{{ iMei }}</span>
                                    <span v-else class="online-gray">{{ $t("m.vehicle.unbound") }}</span>
                                    <b-button style="margin-left:10px;" v-if="iMei" pressed block size="sm" variant="danger" aria-pressed="true" class="col-5 button-red" @click="bUnpair = true">{{ $t("m.common.b_unpair") }}</b-button>
                                    <b-button style="margin-left:10px;" v-else pressed block size="sm" variant="primary" aria-pressed="true" class="col-5 button-primary" @click="showBindInfo">{{ $t("m.vehicle.install_device") }}</b-button>
                                    <!-- v-if="iMei && vin"  -->
                                </span>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="col-4" style="padding:0;">{{ $t("m.common.line_status") }}</span>
                                <div style="border-bottom:none;padding:0 0 0 12px;" class="text-left col-8">
                                    <span v-if="isOnline === 1" class="online-success">{{ $t("m.common.online") }}</span>
                                    <span v-if="isOnline === 2" class="online-danger">{{ $t("m.common.offline") }}</span>
                                    <span v-if="isOnline === 3" class="online-gray">{{ $t("m.vehicle.unbound") }}</span>
                                </div>
                            </div>
                            <div class="d-flex justify-content-between">
                                <span class="col-4" style="padding:0;">{{ $t("m.common.parkingName") }}</span>
                                <span class="text-left col-8">{{ parkingName }}</span>
                            </div>
                            <!-- <i class="cui cui-location-pin"></i> -->
                            <!-- <span class="text-left google-maps" @click="showMapTip"></span> -->
                            <div class="d-flex justify-content-between">
                                <span class="col-4" style="padding:0;">{{ $t("m.common.last_update") }}</span>
                                <span class="text-left col-8">{{ lastUpdateTime }}</span>
                            </div>
                            <!-- <div class="d-flex justify-content-between"><span class="col-4" style="padding:0;">Lot{{ $t('m.common.lot') }}</span><span
                            class="text-left col-8">{{lot}}</span></div>-->
                            <div class="d-flex justify-content-between">
                                <span class="col-4" style="padding:0;">{{ $t("m.common.last_location") }}</span>
                                <span class="text-left col-8">{{ lastLocation ? lastLocation : "N/A" }}</span>
                            </div>
                        </div>

                        <form class="form-horizontal needs-validation" method="post" novalidate id="vehicleForm">
                            <div class="row justify-content-center">
                                <input class="form-control" name="id" id="vehicleId" type="hidden" value />
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group">
                                        <label>{{ $t("m.common.year") }}</label> <span class="star-red">*</span>
                                        <input :class="yearE ? 'is-exist' : ''" class="form-control" name="year" id="vehicleyear" type="text" v-model="year" />
                                    </div>
                                </div>
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group">
                                        <label>{{ $t("m.common.make") }}</label> <span class="star-red">*</span>
                                        <input :class="makeE ? 'is-exist' : ''" class="form-control" name="make" id="vehiclemake" type="text" v-model="make" />
                                    </div>
                                </div>
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group">
                                        <label>{{ $t("m.common.model") }}</label> <span class="star-red">*</span>
                                        <input :class="modalE ? 'is-exist' : ''" class="form-control" name="model" id="vehiclemodel" type="text" v-model="modal" />
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group required">
                                        <label>{{ $t("m.common.alias") }}</label>
                                        <input class="form-control" name="alias" id="vehiclealias" type="text" v-model="alias" />
                                    </div>
                                </div>
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group required">
                                        <label>{{ $t("m.common.trim") }}</label>
                                        <input class="form-control" name="trim" id="vehicletrim" type="text" v-model="trim" />
                                    </div>
                                </div>
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group">
                                        <label>{{ $t("m.common.engine") }}</label>
                                        <input class="form-control" name="engineType" id="vehicleengine" type="text" v-model="engineType" />
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group">
                                        <label>{{ $t("m.common.color") }}</label>
                                        <input class="form-control" name="color" id="vehiclecolor" v-model="selectedOption" />
                                    </div>
                                </div>
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group price-dorlar">
                                        <label>{{ $t("m.common.price") }}</label>
                                        <br />
                                        <!--                            <strong><span class="text-muted text-" id="priceUnit" style="float:left;margin-top:6px;">{{priceUnit}}</span></strong>-->
                                        <!--                            <input class="form-control col-11" name="price" id="vehicleprice" type="text"-->
                                        <!--                                   v-model="price">-->
                                        <b-input-group>
                                            <b-input-group-prepend>
                                                <b-input-group-text>{{ priceUnit }}</b-input-group-text>
                                            </b-input-group-prepend>
                                            <b-form-input id="elementsEmail" type="number" v-model="price"></b-form-input>
                                        </b-input-group>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group">
                                        <label>{{ $t("m.common.stock_num") }}</label>
                                        <input class="form-control" name="stockNumber" id="vehiclestock" type="text" v-model="stockNumber" />
                                    </div>
                                </div>
                            </div>
                            <div class="row justify-content-center">
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group">
                                        <label>{{ $t("m.common.inv_date") }}</label>
                                        <input class="form-control" name id="vehicleinventory" type="date" v-model="inventoryDate" />
                                    </div>
                                </div>
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group">
                                        <label>{{ $t("m.cloud.vehicle_type") }}</label>
                                        <select class="form-control" name id="vehicletype" v-model="selectedCondition">
                                            <option v-for="(item, index) in conditionList" :key="index" :value="item.y">{{ item.c }}</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group">
                                        <label>{{ $t("m.common.odometer") }}</label>
                                        <input class="form-control" name="currentMileage" id="vehiclemileage" type="text" v-model="Odometer" />
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6 col-lg-12">
                                    <div class="form-group">
                                        <label>{{ $t("m.common.plate_num") }}</label>
                                        <input class="form-control" name="plat" id="vehicleplat" type="text" v-model="plateNumber" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </b-col>
                </b-col>

                <b-modal class="lock-my-car" ref="my-modal" v-model="bUnpair" :title="$t('m.cloud.confirmUnbundling')" :cancel-title="$t('m.tip.b_cancel')" :ok-title="$t('m.tip.confirm')" @ok="unPairdevice()">
                    <p class="text-center">
                        {{ $t("m.cloud.confirm_Unbund") }}
                    </p>
                </b-modal>

                <b-col sm="6" class="right">
                    <div class="row justify-content-center">
                        <div class="col-12 text-center">
                            <div class="row justify-content-center">
                                <div class="col-sm-12 col-lg-12 text-center" style="position: relative;">
                                    <div class="right-box">
                                        <i v-show="faSpinner" class="fa fa-spinner fa-lg mt-4 i-white"></i>
                                        <i v-show="circleCheck" class=" font-2xl cui-circle-check i-success"></i>
                                        <i v-show="circleX" class=" font-2xl cui-circle-x i-danger"></i>
                                        <img :src="image" alt height="100%" width="100%" style="border:none" />
                                        <input v-show="showInput" class="right-input-one" type="button" id="btn" :value="photoUpload" />
                                        <p class="right-p" v-text="pText">{{ $t("m.tip.uploadText") }}</p>
                                        <input class="right-input-two" type="file" style="opacity: 0;cursor:pointer" id="fileinp" @change="getFile($event)" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <b-col class="col-12 edit-top">
                        <div class="text-center" style="height: 40vh;line-height: 40vh;">
                            <b-col class="show-map" id="modal-1" title="Google Map">
                                <myMap :elementId="'vehicle-edit'" :map="map"></myMap>
                            </b-col>
                        </div>
                    </b-col>
                </b-col>
            </b-row>
            <div class="ol-sm-12 col-lg-12 text-center" style="padding:0px;">
                <button class="btn btn-sm btn-info text-white mx-3 px-3 " type="button" id="updatebtn" @click="saveData">
                    {{ $t("m.common.b_save") }}
                </button>
                <!-- <b-button size="xs" variant="success" block>{{ $t('m.common.b_save') }}</b-button> -->
            </div>
        </b-card>
        <b-modal ref="my-modal-6" v-model="installStatus" @ok="installSuccess ? reloadPage() : ''" :ok-title="$t('m.tip.b_ok')" class="select-store" ok-only>
            <template slot="modal-title">
                {{ $t("m.cloud.vehicle_oper") }}
            </template>
            <div class="text-left">
                <p>{{ installSuccess === true ? $t("m.cloud.insert_succ_title") : $t("m.tip.update_failed") }}</p>
            </div>
        </b-modal>
        <b-modal ref="my-modal-7" v-model="installDeviceStatus" :ok-disabled="!imeiIsVaild" :ok-title="$t('m.tip.b_ok')" @ok="installDevice()" class="select-store" ok-only>
            <template slot="modal-title">
                {{ this.$t("m.vehicle.install_device") }}
            </template>
            <div class="text-left">
                <!--                <p style="color: #cc0000">{{this.$t('m.sold_vehicle.transform_vehicle_to_other_store_content') }}</p>-->
                <div class="select-box">
                    <div class="col-md-3">
                        <p>{{ this.$t("m.vehicle.input_mind") }}</p>
                    </div>
                    <div class="col-md-9">
                        <b-form-input type="text" aria-describedby="input-live-help input-live-feedback" id="input-live" :placeholder="$t('m.vehicle.input_mind')" v-model="inputText" :class="!imeiIsVaild ? 'is-invalid' : ''" maxlength="15"></b-form-input>
                        <b-form-invalid-feedback id="input-live-feedback" v-if="!imeiIsVaild">
                            {{ $t("m.car_box.IMEI_verify") }}
                        </b-form-invalid-feedback>
                    </div>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import httpclient from "@/utils/httpclient";
import { getDateString, getYMDString } from "@/utils/date";
import httpClient from "@/utils/httpclient";
import myMap from "@components/map";
import Alert from "@components/model";

export default {
    name: "edit",
    components: {
        myMap,
        Alert
    },
    data() {
        return {
            id: this.$router.currentRoute.params.id,
            updateDetail: null,
            showMap: true,
            bUnpair: false,
            OperTitle: "",
            OperContent: "",
            image: "",
            year: "",
            lot: "",
            vin: "",
            priceUnit: "",
            iMei: "",
            price: "",
            make: "",
            alias: "",
            color: "",
            Odometer: "",
            modal: "",
            trim: "",
            isOnline: "",
            parkingName: "",
            lastUpdateTime: "",
            lastLocation: "",
            engineType: "",
            stockNumber: "",
            plateNumber: "",
            inventoryDate: "",
            condition: "",
            inventoryTime: "",
            currentMileage: "",
            selectedOption: "",
            selectedCondition: "",
            file: "",
            boxOne: "",
            lastLocationLat: "",
            installDeviceStatus: false,
            inputText: "",
            installSuccess: false,
            imeiIsVaild: true,
            installStatus: false,
            showAlerts: {
                title: "",
                show: false,
                content: "",
                buttonText: ""
            },
            colorList: [
                { c: this.$t("m.colors.black"), y: "Black" },
                { c: this.$t("m.colors.white"), y: "White" },
                { c: this.$t("m.colors.silver"), y: "Silver" },
                { c: this.$t("m.colors.blue"), y: "Blue" },
                { c: this.$t("m.colors.red"), y: "Red" },
                { c: this.$t("m.colors.brown"), y: "Brown" },
                { c: this.$t("m.colors.gold"), y: "Gold" },
                { c: this.$t("m.colors.orange"), y: "Orange" },
                { c: this.$t("m.colors.yellow"), y: "Yellow" },
                { c: this.$t("m.colors.purple"), y: "Purple" },
                { c: this.$t("m.colors.green"), y: "Green" },
                { c: this.$t("m.colors.pink"), y: "Pink" },
                { c: this.$t("m.colors.others"), y: "Others" }
            ],
            conditionList: [
                { c: this.$t("m.common.c_new"), y: "1" },
                { c: this.$t("m.common.c_used"), y: "3" },
                { c: this.$t("m.common.c_demo"), y: "2" },
                { c: this.$t("m.common.c_test"), y: "4" }
            ],
            map: {},
            changedLanguage: false,
            photoUpload: this.$t("m.common.upload_img"),
            faSpinner: false,
            circleCheck: false,
            circleX: false,
            pText: "",
            showInput: true,
            yearE: false,
            makeE: false,
            modalE: false
        };
    },
    watch: {
        year() {
            this.checkData();
        },
        make() {
            this.checkData();
        },
        modal() {
            this.checkData();
        }
    },
    mounted() {
        //初始化各项数据

        if (this.$i18n.locale === "en-US") {
            this.changedLanguage = "English";
        } else {
            this.changedLanguage = "Chinese";
        }

        let that = this;
        let url = "/api/v1/clouddrive/vehicle/detail/id?vehicleId=" + that.id;
        httpClient.get(url).then(res => {
            let myData = res.data.data;
            that.image = myData.photoPath;
            that.year = myData.year;
            that.vin = myData.vin;
            that.inventoryTime = myData.inventoryTime;

            let _mileage = null; //距离单位转换
            if (myData.currentMileage) {
                if (that.changedLanguage === "English") {
                    _mileage = (myData.currentMileage * 0.0006214).toFixed(0);
                } else {
                    _mileage = (myData.currentMileage / 1000).toFixed(0);
                }
            } else {
                _mileage = "N/A";
            }

            that.currentMileage = _mileage;
            that.lot = myData.parkingLot;
            that.iMei = myData.deviceMac;
            that.price = myData.price;
            that.priceUnit = that.$t("m.common.moneyType");
            that.color = myData.color;
            that.Odometer = _mileage;
            that.make = myData.make;
            that.parkingName = myData.parkingName;
            that.alias = myData.alias;
            that.lastLocationLat = myData.lastLocationLat;
            that.modal = myData.model;
            that.trim = myData.trim;
            that.engineType = myData.engineType;
            that.condition = myData.vehicleType;
            that.stockNumber = myData.stockNumber;
            that.plateNumber = myData.plate;
            that.selectedOption = myData.color;
            that.selectedCondition = myData.vehicleTypeCode;
            that.lastLocation = myData.lastLocation;
            that.isOnline = myData.isOnline;
            myData.lastUpdateTime !== null ? (that.lastUpdateTime = getDateString(myData.lastUpdateTime)) : (that.lastUpdateTime = "N/A");
            myData.inventoryTime !== null ? (that.inventoryDate = getYMDString(myData.inventoryTime)) : "";
            that.map = {
                lat: myData.lastLocationLat === null ? 0 : myData.lastLocationLat,
                lng: myData.lastLocationLng === null ? 0 : myData.lastLocationLng,
                area: myData.areaCoordinates === null ? [] : myData.areaCoordinates,
                vehicleInfo: "info"
            };
        });
    },
    methods: {
        format_number(nStr) {
            nStr += "";
            let x = nStr.split(".");
            let x1 = x[0];
            let x2 = x.length > 1 ? "." + x[1] : "";
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, "$1" + "," + "$2");
            }
            return x1 + x2;
        },
        showMapTip() {
            if (this.map.lat || this.map.area.length > 0) {
                this.showMap = true;
            }
        },
        
        getFile(event) {
            //图片上传
            this.file = event.target.files[0];
            let formData = new FormData();
            formData.append("file", this.file); //‘file’是後台接收文件名
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            };
            let self = this;
            this.faSpinner = true;
            this.pText = this.$t("m.tip.upload_img");
            this.showInput = false;
            httpClient
                .post("/api/v1/uploadFile", formData, config)
                .then(res => {
                    if (res.data.code === 200) {
                        // let passData = {
                        //     title: self.$t("m.tip.info"),
                        //     show: true,
                        //     content: self.$t("m.tip.upload"),
                        //     buttonText: {
                        //         btnFirst: "",
                        //         btnSecond: self.$t("m.tip.b_ok")
                        //     }
                        // };
                        // self.image = res.data.data.path;
                        // self.closeRemind(passData);
                        self.image = res.data.data.path;
                        this.faSpinner = false;
                        this.circleCheck = true;
                        this.pText = this.$t("m.tip.upload_success");
                        this.showInput = true;
                        this.photoUpload = this.$t("m.common.re_upload");
                    }

                    // console.log(res.data.data.path)
                    // console.log(self.image)
                })
                .catch(function(err) {
                    if (err) {
                        this.faSpinner = false;
                        this.circleX = true;
                        this.pText = this.$t("m.tip.upload_fail");
                        this.showInput = true;
                        this.photoUpload = this.$t("m.common.re_upload");
                    }
                });
        },
        checkData() {
            this.yearE = this.year ? false : true;
            this.makeE = this.make ? false : true;
            this.modalE = this.modal ? false : true;
        },
        saveData() {
            //设备参数更新，保存

            function convertDateToTime(strtime) {
                var date = new Date(strtime);
                return date.getTime();
            }

            function isInteger(obj) {
                return typeof obj === "number" && obj % 1 === 0;
            }

            let _time = convertDateToTime(this.inventoryDate);
            let dataTime;
            if (_time && isInteger(_time)) {
                dataTime = _time;
            }

            let _mileage = null;
            if (this.Odometer) {
                if (this.changedLanguage === "English") {
                    _mileage = (this.Odometer / 0.0006214).toFixed(0);
                } else {
                    _mileage = (this.Odometer * 1000).toFixed(0);
                }
            } else {
                _mileage = 0;
            }

            let _data = {
                color: this.selectedOption,
                currentMileage: _mileage,
                engineType: this.engineType,
                id: this.$router.currentRoute.params.id,
                inventoryTime: dataTime,
                make: this.make,
                model: this.modal,
                alias: this.alias,
                photoPath: this.image,
                plat: this.plateNumber,
                price: this.price,
                stockNumber: this.stockNumber,
                trim: this.trim,
                vehicleTypeCode: this.selectedCondition,
                year: this.year
            };

            let link = "/api/v1/clouddrive/vehicle/update";
            let self = this;
            this.checkData();
            if (!this.yearE && !this.makeE && !this.modelE){
                httpClient
                .post(link, _data)
                .then(function(res) {
                    if (res.data.data && res.data.data.result) {
                        self.updateDetail = "update";
                        let passData = {
                            title: self.$t("m.tip.info"),
                            show: true,
                            content: self.$t("m.tip.vehicle_upsucc"),
                            buttonText: {
                                btnFirst: "",
                                btnSecond: self.$t("m.tip.b_ok")
                            }
                        };
                        self.closeRemind(passData);
                    } else {
                        alert(res.data.data.content);
                    }
                })
                .catch(function(err) {
                    if (err) {
                        let passData = {
                            title: self.$t("m.tip.info"),
                            show: true,
                            content: self.$t("m.tip.vehicle_upfail"),
                            buttonText: {
                                btnFirst: "",
                                btnSecond: self.$t("m.tip.b_ok")
                            }
                        };
                        self.closeRemind(passData);
                    }
                });
            }
            
        },
        showLock() {
            this.OperContent = this.$t("m.cloud.confirm_Unbund");
            this.OperTitle = this.$t("m.cloud.confirmUnbundling");
        },
        unPairdevice() {
            //设备解绑，未绑定的设备，按钮不显示
            let link = "/api/v1/vehicle/unbind/device";
            let self = this;
            let data = {
                deviceMac: this.iMei,
                vin: this.vin
            };
            httpClient
                .post(link, data)
                .then(function(res) {
                    if (res.data.code === 200) {
                        let passData = {
                            title: self.$t("m.tip.info"),
                            show: true,
                            content: self.$t("m.tip.vehicle_unpair_success"),
                            buttonText: {
                                btnFirst: "",
                                btnSecond: self.$t("m.tip.b_ok")
                            }
                        };
                        self.closeRemind(passData);
                        // window.location.reload()
                    }
                })
                .catch(function(err) {
                    if (err) {
                        let passData = {
                            title: self.$t("m.tip.info"),
                            show: true,
                            content: self.$t("m.tip.vehicle_unpair_failed"),
                            buttonText: {
                                btnFirst: "",
                                btnSecond: self.$t("m.tip.b_ok")
                            }
                        };
                        self.closeRemind(passData);
                    }
                });
        },
        closeRemind(data) {
            this.showAlerts.show = data.show;
            this.showAlerts.title = data.title;
            this.showAlerts.content = data.content;
            this.showAlerts.buttonText = data.buttonText;
            // window.location.reload()
        },
        closeBox() {
            //子组件来请求父组件关闭弹窗
            this.showAlerts.show = !this.showAlerts.show;
            // window.location.reload();
            if (this.updateDetail === "update") {
                //如果是update车辆信息，成功后到详情页面
                this.$router.push("/test-drive/test-vehicle/detail/" + this.id);
            }
        },
        showBindInfo() {
            this.installDeviceStatus = !this.installDeviceStatus;
        },
        installDevice() {
            httpclient
                .post("/api/v1/clouddrive/device/box/bind", {
                    deviceImei: this.inputText,
                    vehicleId: this.$route.params.id,
                    deviceType: 1
                })
                .then(res => {
                    if (res.data.code === 200 && res.data.data.result) {
                        this.installStatus = true;
                        this.installSuccess = true;
                        // window.location.reload();
                    } else {
                        this.installStatus = false;
                        this.installSuccess = true;
                    }
                });
        },
        reloadPage() {
            window.location.reload();
        }
    }
};
</script>
<style lang="scss" scoped>
.online-box {
    .online-success {
        background: #4dbd74;
        padding: 0 10px;
        border-radius: 5px;
        font-weight: bold;
    }
}
.btn1 {
    width: 45px;
    height: 20px;
    line-height: 10px;
    border-radius: 10px;
}

.car-edit {
    padding-bottom: 20px;
    .bv-example-row {
        width: 100%;
    }
}
.edit-top {
    margin-bottom: 20px;
}
.price-dorlar {
    .input-group-text {
        background: #515b65;
    }
}
.google-maps {
    cursor: pointer;
    color: #63c2de;

    i {
        font-size: 20px;
    }
}

.online {
    background: #f63c3a;
    padding: 0 10px;
    border-radius: 5px;
    font-weight: bold;
    color: #fff;
}
.default {
    background: #515b65;
    padding: 0 10px;
    border-radius: 5px;
    font-weight: bold;
}
.lock-my-car {
    .modal-header {
        .modal-title {
            width: 100%;
            text-align: center;
        }
    }
    .modal-footer {
        justify-content: center;
    }
}

.specific-data {
    border: 1px solid #23282c;
    border-bottom: none;

    div {
        padding: 10px;
        border-bottom: 1px solid #23282c;
    }
}
.button-red {
    display: inline-block;
    width: 50px;
    height: 20px;
    line-height: 10px;
    border-radius: 5px;
}
.button-primary {
    display: inline-block;
    width: 80px;
    height: 20px;
    line-height: 10px;
    background-color: #63c2de !important;
    color: #fff;
    border: none;
    border-radius: 5px;
}
.online-success {
    background: #4dbd74;
    padding: 0 10px;
    border-radius: 10px;
    font-weight: bold;
    color: #ffffff;
}
.online-danger {
    background-color: #f86c6b;
    padding: 0 10px;
    border-radius: 10px;
    font-weight: bold;
    color: #ffffff;
}
.online-gray {
    background-color: #c8ced3;
    padding: 0 10px;
    border-radius: 10px;
    font-weight: bold;
    color: #23282c;
}
.right-box {
    height: 500px;
    border: 1px solid #e4e7ea;
    margin-top: 30px;
    position: relative;
    .right-input-one {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 150px;
    }
    .right-p {
        position: absolute;
        left: 50%;
        top: 60%;
        transform: translate(-50%, -60%);
    }
    .right-input-two {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 150px;
    }
    i {
        position: absolute;
        left: 50%;
        top: 42%;
        transform: translate(-50%, -50%);
    }
    .i-white {
        color: #b3bfca;
        top: 38%;
    }
    .i-success {
        color: #4dbd74;
    }
    .i-danger {
        color: #f86c6b;
    }
}
.star-red {
    color: #f86c6b;
}
.is-exist {
    border: 1px solid #f86c6b;
}
</style>
