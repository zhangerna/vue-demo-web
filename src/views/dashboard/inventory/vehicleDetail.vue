<template>
    <div class="animated fadeIn vehicle-detail">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t("m.common.detail") }}
                <div class="float-right">
                    <b-button class="btn btn-sm btn-info mr-2 text-white" @click="$router.push('/inventory/vehicle/edit/' + $route.params.id)">
                        {{ $t("m.common.edit") }}
                    </b-button>
                    <template v-if="$store.state.userInfo.roleCode === 'manager' || $store.state.userInfo.roleCode === 'root'">
                        <b-button @click="showTransformVehicle()" class="btn btn-sm btn-info mr-2 text-white">
                            {{ $t("m.sold_vehicle.v_trans") }}
                        </b-button>
                    </template>
                </div>
            </div>
            <b-row>
                <b-col sm="6" class="left">
                    <div class="border-dark border" v-if="data">
                        <b-row>
                            <b-col sm="12" lg="12" class="title">
                                {{ data.year && data.year != "null" ? data.year : "N/A" }}
                                {{ data.make && data.make != "null" ? data.make : "N/A" }}
                                {{ data.model && data.model != "null" ? data.model : "N/A" }}{{ data.alias && data.alias != "null" ? " - " + data.alias : "" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.last_location") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.lastLocation ? data.lastLocation : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.last_update") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.lastUpdateTime ? getDateString(data.lastUpdateTime) : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.lot") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.outStatus == 2 ? $t("m.vehicle_detail.off_lot") : data.parkingLot ? data.parkingLot : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row v-if="data.checkedInBy">
                            <b-col sm="4" lg="4">
                                {{ $t("m.vehicle_detail.check_by") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.checkedInBy }}
                            </b-col>
                        </b-row>
                        <b-row v-if="data.checkedInAt">
                            <b-col sm="4" lg="4">
                                {{ $t("m.vehicle_detail.check_at") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ this.getDateString(data.checkedInAt) }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.line_status") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                <span v-if="isOnline === 1" class="online-success">{{ $t("m.common.online") }}</span>
                                <span v-if="isOnline === 2" class="online-danger">{{ $t("m.common.offline") }}</span>
                                <span v-if="isOnline === 3" class="online-gray">{{ $t("m.vehicle.unbound") }}</span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.voltage") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                <template v-if="data.currentVoltage">
                                    <span v-if="data.currentVoltage && Number(data.currentVoltage.toFixed(1)) <= 11.7" class=" badge-red badge-pill currentVoltage">
                                        {{ data.currentVoltage.toFixed(1) + "V" }}
                                    </span>
                                    <span v-else-if="data.currentVoltage && Number(data.currentVoltage.toFixed(1)) > 11.7 && Number(data.currentVoltage.toFixed(1)) <= 12.1" class="badge-red badge-pill">
                                        {{ data.currentVoltage.toFixed(1) + "V" }}
                                    </span>
                                    <span v-else class="badge-success badge-pill ">
                                        {{ data.currentVoltage.toFixed(1) + "V" }}
                                    </span>
                                </template>
                                <template v-else>
                                    <span class=" badge badge-pill badge-secondary">N/A</span>
                                </template>
                            </b-col>
                        </b-row>
                        <b-row v-if="data.available === 1">
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.use_status") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                <span class="mx-2 badge badge-pill btn-danger">{{ $t("m.common.in_use") }}</span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.imei") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                <span v-if="data.deviceMac">{{ data.deviceMac }}</span>
                                <span v-else class="online-gray">{{ $t("m.vehicle.unbound") }}</span>
                                <b-button style="margin-left:10px;" v-if="!data.deviceMac" pressed size="sm" variant="primary" aria-pressed="true" class="button-primary" @click="showBindInfo">{{ $t("m.vehicle.install_device") }}</b-button>
                                <b-button style="margin-left:10px;" v-else pressed size="sm"  aria-pressed="true" class="button-red" @click="bUnpair = true">{{ $t("m.common.b_unpair") }}</b-button>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.vin") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.vin ? data.vin : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.year") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.year ? data.year : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.make") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.make ? data.make : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.model") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.model ? data.model : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.alias") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.alias ? data.alias : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.trim") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.trim ? data.trim : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.engine") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.engineType ? data.engineType : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.color") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.color ? data.color : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.price") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.thousandsPrice ? $t("m.common.moneyType") + data.thousandsPrice : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.stock_num") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.stockNumber ? data.stockNumber : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.inv_age") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.inventoryTime ? getDaysBetweenDate(data.inventoryTime, new Date().getTime()) + $t("m.common.days") : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.cloud.vehicle_type") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                <template v-if="!data.vehicleTypeCode">
                                    N/A
                                </template>
                                <template v-else>
                                    {{ data.vehicleTypeCode == 1 ? $t("m.common.c_new") : data.vehicleTypeCode == 2 ? $t("m.common.c_demo") : data.vehicleTypeCode == 3 ? $t("m.common.c_used") : $t("m.common.c_test") }}
                                </template>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.odometer") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ myCurrentMileage }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.common.remain_oil") }}
                            </b-col>
                            <b-col sm="4" lg="4">
                                <template v-if="data.residualOil">
                                    <template v-if="data.residualOil < 10">
                                        <span style="color: red">{{ data.residualOil + $t("m.report.ltre") }}</span>
                                    </template>
                                    <template v-else>
                                        <span>{{ data.residualOil + $t("m.report.ltre") }}</span>
                                    </template>
                                </template>
                                <template v-else>
                                    <span>N/A</span>
                                </template>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.vehicle_detail.plat") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.plate ? data.plate : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.vehicle_detail.vehicle_store") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.storeName ? data.storeName : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.vehicle_detail.notes") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.notes ? data.notes : "N/A" }}
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
                <b-col sm="6" class="right">
                    <div class="text-center img-box">
                        <viewer>
                            <img :src="data.photoPath ? data.photoPath : '/img/placeholder.5367544d.svg'" style="border-radius: 5px 5px 5px 5px;box-shadow: 0px 0px 4px 1px #000;margin-bottom: 10px;" width="100%" alt="" />
                        </viewer>
                    </div>
                    <div class="map" style="position: relative">
                        <myMap :elementId="'map-1'" :map="map" :class="map && (map.lat != 0 || map.area.length > 0) ? '' : 'hidden'"></myMap>
                        <div class="img text-center" v-if="map && map.lat == 0 && map.area == 0" style="height: 40vh;margin-top: 15vh;">
                            <img src="@/assets/pages-img/Location_not_available.svg" width="100px" />
                            <p style="margin-top: 14px">
                                {{ $t("m.vehicle_detail.no_map") }}
                            </p>
                        </div>
                    </div>
                </b-col>
            </b-row>
            <b-row style="border-bottom: 0px;">
                <b-table class="user-table-list mb-0 table-outline table-responsive-sm"  striped hover fixed :items="items" :fields="fields">
                    <template slot="operation" slot-scope="items">
                        <span>{{ items.item.type }}</span>
                    </template>
                    <template slot="vehicle" slot-scope="items">
                        <a v-if="items.item.operator" class="btn-md link-detail" @click="$router.push('/inventory/admin/detail/' + items.item.userId)">
                            {{ items.item.operator }}
                        </a>
                        <span v-else>N/A</span>
                    </template>
                    <template slot="time" slot-scope="items">
                        <div class="btn-md">{{ items.item.time }}</div>
                    </template>
                </b-table>
            </b-row>

            <b-pagination align="right" :total-rows="rows" v-model="currentPage" :per-page="perPage" @input="turnToPage(currentPage)"></b-pagination>
            <div class="dataTables_info text-right" id="DataTables0" role="status" aria-live="polite">
                <span v-if="totalPages > 0"
                    >{{ $t("m.common.show") }}
                    {{ 10 * (currentPage - 1) + 1 }}
                    {{ $t("m.common.to") }}
                    {{ currentPage === totalPages ? rows : currentPage * 10 }}
                    {{ $t("m.common.of") }} {{ rows }} {{ $t("m.common.entries") }}</span
                >
                <span v-else>{{ $t("m.common.show") }} 0 {{ $t("m.common.to") }} 0 {{ $t("m.common.of") }} {{ rows }} {{ $t("m.common.entries") }}</span>
            </div>
            <b-row class="text-center">
                <b-col>
                    <div class="btn btn-sm btn-danger btn-del btn-bottom-detail" @click="delData">
                        {{ $t("m.cloud.delete") }}
                    </div>
                </b-col>
            </b-row>
        </b-card>

        <b-modal ref="my-modal-2" v-model="showSoldVehicle" :ok-title="$t('m.tip.b_ok')" @ok="registerSold()" class="" ok-only>
            <template slot="modal-title"> {{ $t("m.sold_vehicle.sold_tt") }}{{ soldStatus }} </template>
            <div class="d-block text-left">
                <p>{{ soldOutC }}</p>
            </div>
        </b-modal>

        <b-modal ref="my-modal-3" v-model="soldVehicleStatus" :ok-title="$t('m.tip.b_ok')" @ok="goBackToList()" class="" ok-only>
            <template slot="modal-title">
                {{ data.soldVehicleHeader }}
            </template>
            <div class="d-block text-left">
                <p>{{ data.soldVehicleContent }}</p>
            </div>
        </b-modal>

        <b-modal ref="my-modal-4" v-model="soldVehicleTransform" :cancel-title="$t('m.tip.b_cancel')" :ok-title="$t('m.tip.b_ok')" @ok="confirmTransformVehicle()" class="select-store" ok-only>
            <template slot="modal-title">
                {{ this.$t("m.sold_vehicle.transform_vehicle_to_other_store_header") }}
            </template>
            <div class="text-left">
                <p style="color: #cc0000">
                    {{ this.$t("m.sold_vehicle.transform_vehicle_to_other_store_content") }}
                </p>
                <div class="select-box">
                    <div class="col-md-3">
                        <p>
                            {{ this.$t("m.sold_vehicle.transform_vehicle_to_other_store_content_title") }}
                        </p>
                    </div>
                    <div class="col-md-9">
                        <b-form-select v-model="selected" :options="options"></b-form-select>
                    </div>
                </div>
            </div>
        </b-modal>

        <b-modal ref="my-modal-5" v-model="transferStatus" :ok-title="$t('m.tip.b_ok')" @ok="afterTransfer()" class="select-store" ok-only>
            <template slot="modal-title">
                {{ transferTitle }}
            </template>
            <div class="text-left">
                <p>{{ transferContents }}</p>
            </div>
        </b-modal>

        <b-modal ref="my-modal-6" v-model="installStatus" @ok="installSuccess ? reloadPage() : ''" :ok-title="$t('m.tip.b_ok')" class="select-store" ok-only>
            <template slot="modal-title">
                {{ $t("m.cloud.vehicle_oper") }}
            </template>
            <div class="text-left">
                <p>
                    {{ installSuccess === true ? $t("m.cloud.insert_succ_title") : $t("m.tip.update_failed") }}
                </p>
            </div>
        </b-modal>
        <b-modal ref="my-modal-7" v-model="installDeviceStatus" :ok-disabled="!imeiIsVaild" :ok-title="$t('m.tip.b_ok')" @ok="installDevice()" class="select-store" ok-only>
            <template slot="modal-title">
                {{ this.$t("m.vehicle.install_device") }}
            </template>
            <div class="text-left">
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

        <div class="del-tip">
            <b-modal ref="my-modal-bottom" :cancel-title="$t('m.tip.b_cancel')" :ok-title="$t('m.tip.b_ok')" :title="$t('m.tip.d_vehicle')" v-model="showDelMap" @ok="apiDel"> </b-modal>
        </div>
        <b-modal class="lock-my-car" ref="my-modal" v-model="bUnpair" :title="$t('m.cloud.confirmUnbundling')" :cancel-title="$t('m.tip.b_cancel')" :ok-title="$t('m.tip.confirm')" @ok="unPairdevice()">
            <p class="text-center">
                {{ $t("m.cloud.confirm_Unbund") }}
            </p>
        </b-modal>
        <Alert @closeRemindBox="closeBox()" :buttonText="showAlerts.buttonText" :show="showAlerts.show" :title="showAlerts.title" :content="showAlerts.content"></Alert>
    </div>
</template>

<script>
import httpclient from "@/utils/httpclient";
import { getDateString, getDaysBetweenDate } from "@/utils/date";
import myMap from "@/components/map";
import Alert from "@components/model";
import "@/utils/viewer"; //该组件的js是预览图片组件，按需引用即可

export default {
    name: "vehicleDetail",
    components: {
        myMap,
        Alert
    },
    data() {
        return {
            btnGroup: {
                btnFirst: "Cancel",
                btnSecond: "OK"
            },
            data: {},
            map: null,
            searchGoogleMap: {},
            mapPopup: null,
            tipTitle: "",
            showSoldVehicle: false,
            soldVehicleStatus: false,
            soldVehicleSuccess: false,
            soldVehicleTransform: false,
            installDeviceStatus: false,
            installSuccess: false,
            installStatus: false,
            inputText: "",
            soldVehicleContent: "",
            soldVehicleHeader: "",
            transferStatus: false,
            transferContents: "",
            transferTitle: "",
            soldStatus: "",
            soldOutC: "",
            fields: {
                operation: {
                    key: "operationType",
                    label: this.$t("m.common.action")
                },
                vehicle: {
                    key: "vehicle",
                    label: this.$t("m.vehicle_detail.operator")
                },
                time: {
                    key: "time",
                    label: this.$t("m.common.time")
                }
            },
            options: [],
            selected: null,
            items: [],
            totalPages: 1,
            currentPage: 1,
            perPage: 10,
            showDelMap: false,
            rows: 1,
            myCurrentMileage: null,
            imeiIsVaild: false,
            bUnpair: false,
            showAlerts: {
                title: "",
                show: false,
                content: "",
                buttonText: ""
            },
            deviceMac: "",
            vin: "",
            isOnline: ""
        };
    },
    watch: {
        inputText(newV) {
            if (newV.length === 15) {
                this.imeiIsVaild = true;
            } else {
                this.imeiIsVaild = false;
            }
        }
    },
    mounted() {
        if (this.$i18n.locale === "en-US") {
            this.changedLanguage = "English";
        } else {
            this.changedLanguage = "Chinese";
        }
        let self = this;
        httpclient
            .get("/api/v1/vehicle/detail/id?vehicleId=" + this.$route.params.id, {})
            .then(response => {
                self.data = response.data.data;
                this.isOnline = response.data.data.isOnline;
                this.deviceMac = response.data.data.deviceMac;
                this.vin = response.data.data.vin;
                let year = self.data.year ? self.data.year : "N/A";
                let make = self.data.make ? self.data.make : "N/A";
                let model = self.data.model ? self.data.model : "N/A";
                let info = year == "N/A" && make == "N/A" && model == "N/A" ? "N/A" : year + " " + make + " " + model;
                self.tipTitle = info;
                self.map = {
                    lat: self.data.lastLocationLat ? self.data.lastLocationLat : 0,
                    lng: self.data.lastLocationLng ? self.data.lastLocationLng : 0,
                    area: self.data.areaCoordinates ? self.data.areaCoordinates : [],
                    vehicleInfo: info
                };
                self.mapPopup = {
                    lat: self.data.lastLocationLat ? self.data.lastLocationLat : 0,
                    lng: self.data.lastLocationLng ? self.data.lastLocationLng : 0,
                    area: self.data.areaCoordinates ? self.data.areaCoordinates : [],
                    vehicleInfo: info
                };
                let _mileage = null;
                if (response.data.data.currentMileage) {
                    if (self.changedLanguage === "English") {
                        _mileage = (response.data.data.currentMileage * 0.0006214).toFixed(0);
                    } else {
                        _mileage = (response.data.data.currentMileage / 1000).toFixed(0);
                    }
                } else {
                    _mileage = "N/A";
                }
                self.myCurrentMileage = _mileage;
            })
            .catch(err => {
                // console.dir(err);
                err;
            });
        this.getVehicleOperatorList(1);
    },
    methods: {
        reloadPage() {
            window.location.reload();
        },
        getDateString(data) {
            return getDateString(data);
        },
        getDaysBetweenDate(data, time) {
            return getDaysBetweenDate(data, time);
        },
        getVehicleOperatorList(page) {
            let myVehicleId = this.$route.params.id;
            let myLink = "/api/v1/operationlog/listbyvehicleid?pageNo=" + page + "&vehicleId=" + myVehicleId;
            httpclient.get(myLink).then(res => {
                let myData = res.data.data.datas;
                this.items = myData;
                this.searchGoogleMap = myData;
                // this.currentPage = res.data.data.pageNo;
                this.perPage = res.data.data.pageSize;
                this.totalPages = res.data.data.totalPages;
                this.rows = res.data.data.rowCount;
                let myArr = [];
                myData.map(item => {
                    myArr.push({
                        operationType: item.operationType,
                        operator: item.userName,
                        time: this.getDateString(item.createTime),
                        userId: item.userId
                    });
                });
                this.items = myArr;
            });
        },
        turnToPage(p) {
            this.getVehicleOperatorList(p ? p : 1);
        },
        showRegisterSold() {
            this.soldOutC = this.$t("m.sold_vehicle.sold_content", {
                year: this.data.year ? this.data.year : "N/A",
                make: this.data.make ? this.data.make : "N/A",
                model: this.data.model ? this.data.model : "N/A",
                alias: this.data.alias ? this.data.alias : "N/A",
                stock: this.data.stockNumber ? this.data.stockNumber : "N/A"
            });
            this.showSoldVehicle = true;
        },
        delData() {
            this.showDelMap = true;
        },
        apiDel() {
            //删除车辆
            httpclient
                .post("/api/v1/vehicle/delete", {
                    vehicleId: this.$route.params.id
                })
                .then(response => {
                    if (response.data.code == 200) {
                        this.showDelMap = !this.showDelMap;
                        // this.reload();
                        this.$router.push("/inventory/vehicle/list");
                    }
                });
        },
        registerSold() {
            //确认登记售出
            let vehicleId = this.$route.params.id;
            httpclient.post("/api/v1/vehicle/sale", { vehicleId: vehicleId }).then(res => {
                if (res.data.code === 200 && res.data.data.result) {
                    this.soldVehicleSuccess = true;
                    this.soldVehicleStatus = true;
                    this.data.soldVehicleContent = this.$t("m.sold_vehicle.sold_content_success", {
                        year: this.data.year ? this.data.year : "N/A",
                        make: this.data.make ? this.data.make : "N/A",
                        model: this.data.model ? this.data.model : "N/A",
                        alias: this.data.alias ? this.data.alias : "N/A",
                        stock: this.data.stockNumber ? this.data.stockNumber : "N/A"
                    });
                    this.data.soldVehicleHeader = this.$t("m.sold_vehicle.sold_header_success");
                } else {
                    this.soldVehicleSuccess = false;
                    this.soldVehicleStatus = true;
                    this.data.soldVehicleContent = this.$t("m.sold_vehicle.sold_content_fail", {
                        year: this.data.year ? this.data.year : "N/A",
                        make: this.data.make ? this.data.make : "N/A",
                        model: this.data.model ? this.data.model : "N/A",
                        alias: this.data.alias ? this.data.alias : "N/A",
                        stock: this.data.stockNumber ? this.data.stockNumber : "N/A"
                    });
                    this.data.soldVehicleHeader = this.$t("m.sold_vehicle.sold_header_fail");
                }
            });
        },
        goBackToList() {
            //回到列表
            if (this.soldVehicleSuccess) {
                this.$router.push("/inventory/vehicle/list");
            }
        },
        confirmTransformVehicle() {
            //车辆转移确认
            if (this.selected !== null) {
                let _name = "";
                this.options.map(item => {
                    if (item.value === this.selected) {
                        _name = item.text;
                    }
                });
                let data = {
                    vehicleId: this.$route.params.id,
                    transferStoreId: this.selected
                };
                httpclient.post("/api/v1/vehicle/transfer", data).then(res => {
                    this.transferStatus = true;
                    if (res.data.code === 200 && res.data.data.result === true) {
                        this.transferTitle = this.$t("m.sold_vehicle.transform_vehicle_to_other_store_header_success");
                        this.transferContents = this.$t("m.sold_vehicle.transform_vehicle_to_other_store_content_success", {
                            year: this.data.year ? this.data.year : "N/A",
                            make: this.data.make ? this.data.make : "N/A",
                            model: this.data.model ? this.data.model : "N/A",
                            alias: this.data.alias ? this.data.alias : "N/A",
                            storeName: _name,
                            stock: this.data.stockNumber ? this.data.stockNumber : "N/A"
                        });
                    } else {
                        this.transferTitle = this.$t("m.sold_vehicle.transform_vehicle_to_other_store_header_fail");
                        this.transferContents = this.$t("m.sold_vehicle.transform_vehicle_to_other_store_content_fail");
                    }
                });
            }
        },
        showTransformVehicle() {
            //弹出车辆转移的弹窗，获取门店列表
            this.soldVehicleTransform = true;
            httpclient.get("/api/v1/store/listbyself?vehicleid=" + this.$route.params.id).then(res => {
                if (res.data.code === 200 && res.data.data.length) {
                    this.options.length = 0;
                    this.options.push({
                        value: null,
                        text: this.$t("m.sold_vehicle.transform_vehicle_to_other_store_options"),
                        disabled: true
                    });
                    res.data.data.map(item => {
                        this.options.push({
                            value: item.storeId,
                            text: item.storeName
                        });
                    });
                }
            });
        },
        afterTransfer() {
            //转移成功，跳转到vehicle-list
            if (this.transferStatus) {
                this.$router.push("/inventory/vehicle/list");
            }
        },
        hideModal() {
            this.showDelMap = !this.showDelMap;
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
        unPairdevice() {
            //设备解绑，未绑定的设备，按钮不显示
            let link = "/api/v1/vehicle/unbind/device";
            let self = this;
            let data = {
                deviceMac: this.deviceMac,
                vin: this.vin
            };
            httpclient
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
            window.location.reload();
            if (this.updateDetail === "update") {
                //如果是update车辆信息，成功后到详情页面
                this.$router.push("/test-drive/test-vehicle/detail/" + this.id);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.vehicle-detail {
    .is-invalid {
        border: 1px solid red;
    }

    .select-store {
        .modal-dialog {
            max-width: 800px;
        }
        .select-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .col-md-4 {
                padding-left: 0;
            }
            .col-md-8 {
                padding-right: 0;
            }
            p {
                margin-bottom: 0;
            }
        }
    }
    .row {
        border-bottom: 1px solid #23282c;
        padding: 0.75rem 1.25rem;
        .img-box {
            width: 100%;
        }
    }
    .show-map .modal-dialog {
        width: 80%;
        max-width: 1200px;
    }
    .user-table-list {
        margin-top: 20px;
        .link-detail {
            color: #20a8d8 !important;
            cursor: pointer;
            &:hover {
                text-decoration: underline !important;
                color: #167495 !important;
            }
        }
    }
}
.vehicle-detail {
    .card-body {
        padding: 0 1.25rem;
    }
    .title {
        font-size: 18px;
        color: #63c2de;
    }
    .card {
        margin: 0 auto;
    }
    .hidden {
        display: none;
    }
    .left {
        padding: 10px;
        padding-top: 0;
        .row {
            margin: 0px;
            border-bottom: 1px solid #23282c;
            padding: 10px;
        }
        .row > div {
            padding-left: 4px;
        }
    }
    .right {
        .table thead th {
            color: grey;
        }
        #map {
            height: 40vh;
        }
    }
}
.button-red {
    display: inline-block;
    width: 50px;
    height: 20px;
    line-height: 10px;
    background-color: #f86c6b !important;
    color:#ffffff !important;
    border-radius: 5px;
    border: none;
    padding: 0;
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
.btn-bottom-detail {
    display: inline-block;
    // margin: 20px auto;
}
.badge-red {
    background-color: #f63c3a;
    color: #fff;
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
    color: #23282c;
    font-weight: bold;
}
</style>
