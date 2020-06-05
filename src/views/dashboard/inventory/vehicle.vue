<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="animated fadeIn vehicle">
        <b-card>
            <div slot="header">
                {{ $t("m.dashboard.vehicles") }}
                <div class="float-right">
                    <button class="btn btn-sm btn-primary" @click="openChainTip()">
                        <i class="fa fa-plus-square"></i>
                        {{ $t("m.cloud.insert_vehicle") }}
                    </button>
                    <button class="btn btn-sm btn-primary" @click="$router.push('/inventory/vehicle/add')">
                        <i class="fa fa-plus-square"></i>
                        {{ $t("m.vehicle.b_add") }}
                    </button>
                    <button class="btn btn-sm btn-primary" @click="$router.push('/inventory/vehicle/bind')">
                        <i class="fa fa-wrench"></i>
                        {{ $t("m.vehicle.b_install") }}
                    </button>
                </div>
            </div>
            <b-row>
                <b-col sm="12">
                    <b-form-group label-for="elementsAppendButton" class="search-group" style="float:left">
                        <b-input-group>
                            <b-form-input class="search-input" type="text" :placeholder="$t('m.vehicle.search_placeholder')" v-model="search"></b-form-input>
                            <b-input-group-append>
                                <b-button style="border:1px solid transparent;box-sizing:border-box" variant="primary" @click="showList === 'false' ? letChildGetMap() : searchData()"><i class="fa fa-search"></i>{{ $t("m.vehicle.b_search") }} </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                    <div style="float:right;">
                        <button v-b-tooltip.hover :title="$t('m.vehicle.list_module')" :class="showList !== 'false' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary'" @click="toggleMapList('true')">
                            <i class="cui icon-menu"></i>
                        </button>
                        <button v-b-tooltip.hover :title="$t('m.vehicle.map_module')" :class="showList === 'false' ? 'btn btn-sm btn-primary font-white' : 'btn btn-sm btn-secondary font-white'" @click="toggleMapList('false')">
                            <i class="cui icon-map"></i>
                        </button>
                    </div>
                </b-col>
                <!-- <b-col sm="2" style="display:inline-block">
                    <button v-b-tooltip.hover :title="$t('m.vehicle.list_module')" :class="showList !== 'false' ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-secondary'" @click="toggleMapList('true')">
                        <i class="cui icon-menu"></i>
                    </button>
                    <button v-b-tooltip.hover :title="$t('m.vehicle.map_module')" :class="showList === 'false' ? 'btn btn-sm btn-primary font-white' : 'btn btn-sm btn-secondary font-white'" @click="toggleMapList('false')">
                        <i class="cui icon-map"></i>
                    </button>
                </b-col> -->
            </b-row>
            <b-row>
                <b-col class="col-md-3">
                    <span>{{ $t("m.lots.title") }}</span>
                    <b-form-select class="select-box" v-model="selected_parking" :options="parking_list.list" @change="searchData">
                        <template v-slot:first>
                            <option :value="null">{{ $t("m.sold_vehicle.transform_vehicle_to_other_store_options") }}</option>
                        </template>
                    </b-form-select>
                </b-col>
                <b-col class="col-md-3">
                    <span>{{ $t("m.vehicle.battery_voltage") }}</span>
                    <i v-b-popover.hover.top="$t('m.vehicle.vehicle_battery_tip')" class="fa fa-question my-icon"></i>
                    <b-form-select class="select-box" v-model="selected_battery" :options="battery_list.list" @change="searchData">
                        <template v-slot:first>
                            <option :value="null">{{ $t("m.sold_vehicle.transform_vehicle_to_other_store_options") }}</option>
                        </template>
                    </b-form-select>
                </b-col>
                <b-col class="col-md-3">
                    <span>{{ $t("m.common.line_status2") }}</span>
                    <i v-b-popover.hover.top="$t('m.vehicle.vehicle_online_tip')" class="fa fa-question my-icon"></i>
                    <b-form-select class="select-box" v-model="selected_offline" :options="offline_list.list" @change="searchData">
                        <template v-slot:first>
                            <option :value="null">{{ $t("m.sold_vehicle.transform_vehicle_to_other_store_options") }}</option>
                        </template>
                    </b-form-select>
                </b-col>
                <b-col class="col-md-3">
                    <span>{{ $t("m.common.ava_test_drive") }}</span>
                    <b-form-select class="select-box" v-model="selected_drive" :options="drive_list.list" @change="searchData">
                        <template v-slot:first>
                            <option :value="null">{{ $t("m.sold_vehicle.transform_vehicle_to_other_store_options") }}</option>
                        </template>
                    </b-form-select>
                </b-col>
            </b-row>

            <div v-show="showList === 'true'" class="list-vehicle">
                <b-table class="mb-0 table-outline"  large striped responsive="sm" :items="table" hover :fields="tableFields" head-variant="light">
                    <template slot="vehicleNum" slot-scope="data">
                        <span>{{ data.item.vehicleNum }}</span>
                    </template>
                    <template slot="photoUrl" slot-scope="data">
                        <div class="photo-url" @click="$router.push('/inventory/vehicle/detail/' + data.item.vehicleId)">
                            <span v-if="data.item.unboundStatus">{{ data.item.unboundStatus }}</span>
                            <img :src="data.item.photoUrl + '?width=300&height=300'" width="100px" height="100px" />
                        </div>
                    </template>
                    <template slot="battery" slot-scope="data">
                        <span class="badge badge-pill" :class="data.item.batteryClass ? data.item.batteryClass : ''">{{ data.item.battery }}</span>
                    </template>
                    <template slot="vehicle" slot-scope="data">
                        <div>
                            <div @click="$router.push(`/inventory/vehicle/detail/${data.item.vehicleId}`)">
                                <strong class="link-to-detail">{{ data.item.vehicle }}</strong>
                            </div>
                            <div>{{ data.item.colorTrim }}</div>
                            <div>{{ data.item.stock }}</div>
                        </div>
                    </template>
                    <template slot="online" slot-scope="data">
                        <span v-if="data.item.online === 1" class="online-success">{{ $t("m.common.online") }}</span>
                        <span v-if="data.item.online === 2" class="online-danger">{{ $t("m.common.offline") }}</span>
                        <span v-if="data.item.online === 3" class="online-gray">{{ $t("m.vehicle.unbound") }}</span>
                        <!-- <span class="badge badge-pill" :class="data.item.online == 'Online' ? 'badge-success' : 'btn-secondary'">{{ data.item.online == "Online" ? $t("m.common.online") : data.item.online == "Offline" ? $t("m.common.offline") : data.item.online }}</span> -->
                    </template>
                    <template slot="use" slot-scope="data">
                        <span class="badge badge-pill" :class="data.item.use == 'Available' ? 'badge-success' : 'btn-danger'">{{ data.item.use == "Available" ? $t("m.common.avaliable") : $t("m.common.in_use") }}</span>
                    </template>
                    <template slot="action" slot-scope="data">
                        <div class="mapLocation" v-b-tooltip.hover :title="$t('m.common.position_detail')" @click="showMapTip(data.item.lat, data.item.lng, data.item.area, data.item.info)"><i class="cui cui-location-pin btn btn-sm btn-secondary" :class="data.item.lat || data.item.area.length ? 'btn-success' : ''"></i></div>
                        <div class="btn btn-sm btn-info font-white" v-b-tooltip.hover :title="$t('m.tooltip.check_detail')" @click="$router.push('/inventory/vehicle/detail/' + data.item.vehicleId)"><i class="fa fa-eye"></i></div>
                        <div class="btn btn-sm btn-info font-white" v-b-tooltip.hover :title="$t('m.common.edit')" @click="$router.push('/inventory/vehicle/edit/' + data.item.vehicleId)"><i class="fa fa-edit"></i></div>
                        <div v-b-modal.del-1 class="btn btn-sm btn-danger btn-del" @click="delData(data.item.vehicleId)" v-b-tooltip.hover :title="$t('m.cloud.delete')"><i class="cui cui-trash"></i></div>
                    </template>
                </b-table>
                <b-row class="top-holder">
                    <b-col sm="4" lg="4">
                        <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">
                            <span v-if="total > 0"> {{ $t("m.common.show") }} {{ 10 * (currentPage - 1) + 1 }} {{ $t("m.common.to") }} {{ currentPage === pageCount ? total : currentPage * 10 }} {{ $t("m.common.of") }} {{ total }} {{ $t("m.common.entries") }} </span>
                            <span v-else> {{ $t("m.common.show") }} 0 {{ $t("m.common.to") }} 0 {{ $t("m.common.of") }} {{ total }} {{ $t("m.common.entries") }} </span>
                        </div>
                    </b-col>
                    <b-col sm="8" lg="8">
                        <b-pagination align="right" :total-rows="total" v-model="currentPage" :per-page="perPage" @input="changePage(currentPage)"></b-pagination>
                    </b-col>
                </b-row>
                <div class="del-tip">
                    <b-modal ref="my-modal" hide-footer :title="$t('m.tip.d_vehicle')" v-model="showDelMap" @ok="showDelMap = false">
                        <div class="text-right">
                            <b-button @click="hideModal">{{ $t("m.tip.b_cancel") }}</b-button>
                            <button class="btn btn-primary" @click="apiDel">{{ $t("m.tip.b_ok") }}</button>
                        </div>
                    </b-modal>
                </div>
                <b-modal ref="my-modal" v-model="showMap" :ok-title="$t('m.tip.b_ok')" @ok="showMap = false" class="show-map show-google-gaode" ok-only>
                    <myMap :map="map" type="model"></myMap>
                </b-modal>
            </div>
            <div v-show="showList === 'false'" class="map-vehicle">
                <p>{{ $t("m.vehicle.filter_map_tip") }}</p>
                <search-map :map="searchGaodeMap"></search-map>
            </div>
            <div class="insert-vehicle">
                <b-modal ref="my-modal" :title="$t('m.cloud.insert_vehicle')" :ok-title="$t('m.tip.b_ok')" v-model="showChainTip" @ok="insertVehicleData()" ok-only>
                    <p>{{ $t("m.cloud.insert_p") }}</p>
                    <b-form-group class="vehicle-id">
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-input-group-text>{{ $t("m.cloud.vehicle_id") }}</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input v-model="vehicleInsertId" type="number"></b-form-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="vehicle-id">
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-input-group-text>{{ $t("m.cloud.vehicle_c") }}</b-input-group-text>
                            </b-input-group-prepend>
                            <b-form-input v-model="vehicleColor" type="text"></b-form-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group>
                        <b-input-group>
                            <b-input-group-prepend>
                                <b-input-group-text>{{ $t("m.cloud.vehicle_type") }}</b-input-group-text>
                            </b-input-group-prepend>
                            <select class="form-control" name="" v-model="vehicleType">
                                <option value="0">{{ $t("m.cloud.vehicle_type_p") }}</option>
                                <option v-for="(item, index) in vehicleTypeList" :key="index" :value="item.y">{{ item.c }}</option>
                            </select>
                        </b-input-group>
                    </b-form-group>
                </b-modal>
            </div>
        </b-card>
        <b-modal ref="my-modal" v-model="insertTip" :title="insertStatus" :ok-title="$t('m.tip.b_ok')" @ok="reloadPage()" ok-only>
            <div>{{ insertTipContent }}</div>
        </b-modal>

        <b-modal ref="my-modal" v-model="showDelError" :title="$t('m.tip.warn')" :ok-title="$t('m.tip.b_ok')" @ok="showDelError = false" ok-only>
            <div>{{ delErrContent }}</div>
        </b-modal>
    </div>
</template>

<script>
import httpclient from "@/utils/httpclient";
import myMap from "@components/map";
import searchMap from "@components/searchMap";

export default {
    name: "vehicle",
    components: {
        myMap,
        searchMap
    },
    inject: ["reload"],
    data() {
        return {
            selected_parking: null,
            selected_battery: null,
            selected_offline: null,
            selected_drive: null,
            showDelError: false,
            delErrContent: "",
            parking_list: {
                label: "",
                type: "",
                key: "",
                list: []
            },
            battery_list: {
                label: "",
                type: "",
                key: "",
                list: []
            },
            offline_list: {
                label: "",
                type: "",
                key: "",
                list: []
            },
            drive_list: {
                label: "",
                type: "",
                key: "",
                list: []
            },
            vehicleInsertId: null,
            vehicleColor: null,
            vehicleType: 0,
            insertTip: false,
            insertStatus: "",
            insertTipContent: "",
            vehicleTypeList: [
                { c: this.$t("m.common.c_new"), y: "1" },
                { c: this.$t("m.common.c_used"), y: "3" },
                { c: this.$t("m.common.c_demo"), y: "2" },
                { c: this.$t("m.common.test_drive"), y: "4" }
            ],
            showList: "true",
            searchGoogleMap: {},
            searchGaodeMap: {},
            tableFields: {
                vehicleNum: {
                    label: this.$t("m.cloud.vehicle_num"),
                    class: "text-center"
                },
                photoUrl: {
                    label: this.$t("m.vehicle.photo"),
                    class: "text-center"
                },
                vehicle: {
                    label: this.$t("m.vehicle.vehicle"),
                    class: "text-center"
                },
                battery: {
                    label: this.$t("m.common.voltage"),
                    class: "text-center"
                },
                online: {
                    label: this.$t("m.common.line_status"),
                    class: "text-center"
                },
                use: {
                    label: this.$t("m.common.use_status"),
                    class: "text-center"
                },
                park: {
                    label: this.$t("m.common.lot"),
                    class: "text-center"
                },
                price: {
                    label: this.$t("m.common.price") + this.$t("m.common.mon_type"),
                    class: "text-center"
                },
                mileage: {
                    label: this.$t("m.vehicle.mileage") + this.$t("m.common.m_type"),
                    class: "text-center"
                },
                inventory: {
                    label: this.$t("m.vehicle.inv_age"),
                    class: "text-center"
                },
                daysIdle: {
                    label: this.$t("m.vehicle.day_idle"),
                    class: "text-center"
                },
                action: {
                    label: this.$t("m.common.action"),
                    class: "text-center"
                }
            },
            countList: [20, 50, 100, 200],
            countSize: 20,
            data: null,
            table: null,
            showMap: false,
            map: {},
            rows: 0,
            currentPage: 1,
            total: 0,
            perPage: 10,
            showDelMap: false,
            delId: "",
            showEtip: false,
            pageCount: 0,
            gFData: [],
            search: "",
            queryData: {},
            changedLanguage: false,
            showChainTip: false,
            delErrorMsg: {
                "101": this.$t("m.err_message.vehicle_null"),
                "102": this.$t("m.err_message.vehicle_in_point"),
                "103": this.$t("m.err_message.vehicle_unbind_fail"),
                "104": this.$t("m.err_message.vehicle_del_fail"),
                "105": this.$t("m.err_message.vehicle_param_error")
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
            ]
        };
    },
    mounted() {
        let self = this;
        this.axiosApi(self, 1, this.$route.query.filters ? JSON.parse(this.$route.query.filters) : []);
        this.getFilter();

        if (this.$i18n.locale === "en-US") {
            this.changedLanguage = "English";
        } else {
            this.changedLanguage = "Chinese";
        }
    },
    methods: {
        reloadPage() {
            window.location.reload();
        },
        openChainTip() {
            this.showChainTip = true;
        },
        insertVehicleData() {
            if (this.vehicleInsertId && this.vehicleColor && this.vehicleType && this.vehicleType != 0) {
                httpclient
                    .post("/api/v1/clouddrive/vehicle/insert", {
                        carchainVehicleId: this.vehicleInsertId,
                        color: this.vehicleColor,
                        vehicleType: this.vehicleType
                    })
                    .then(res => {
                        if (res.data.code == 200 && res.data.data.result) {
                            this.insertStatus = this.$t("m.cloud.insert_succ_title");
                            this.insertTipContent = this.$t("m.cloud.insert_succ_content");
                            this.insertTip = true;
                        } else {
                            alert(res.data.data.content);
                        }
                    });
            } else {
                alert("请检查输入参数");
            }
        },
        letChildGetMap() {
            //让子组件请求接口展示多点地图
            let _search = [];
            if (this.selected_parking) {
                _search.push({
                    key: "parking",
                    value: [this.selected_parking]
                });
            }
            if (this.selected_battery) {
                _search.push({
                    key: "battery",
                    value: [this.selected_battery]
                });
            }
            if (this.selected_offline) {
                _search.push({
                    key: "online",
                    value: [this.selected_offline]
                });
            }
            if (this.selected_drive) {
                _search.push({
                    key: "inUse",
                    value: [this.selected_drive]
                });
            }

            let link = "/api/v1/vehiclesearch/searchnewmap?searchText=" + this.search + "&source=&pageNo=1&pageSize=" + this.countSize;
            httpclient.post(link, { filters: _search }).then(res => {
                this.searchGaodeMap = res.data.data;
                this.searchGoogleMap = res.data.data;
            });
        },
        toggleMapList(shows) {
            this.letChildGetMap();
            this.showList = shows;
            // if (!shows) {
            //     this.letChildGetMap();
            // }
        },
        getFilter() {
            httpclient
                .post("/api/v1/vehiclesearch/filter")
                .then(response => {
                    this.gFData = response.data.data;
                    let _data = response.data.data;

                    let parking_arr = [];
                    _data[0].filters.map(item => {
                        parking_arr.push({
                            text: item.key,
                            value: item.value
                        });
                    });
                    this.parking_list = {
                        label: _data[0].label,
                        type: _data[0].type,
                        key: _data[0].key,
                        list: parking_arr
                    };

                    let battery_arr = [];
                    _data[1].filters.map(item => {
                        battery_arr.push({
                            text: item.key,
                            value: item.value
                        });
                    });
                    this.battery_list = {
                        label: _data[1].label,
                        type: _data[1].type,
                        key: _data[1].key,
                        list: battery_arr
                    };

                    let offline_arr = [];
                    _data[2].filters.map(item => {
                        offline_arr.push({
                            text: item.key,
                            value: item.value
                        });
                    });
                    this.offline_list = {
                        label: _data[2].label,
                        type: _data[2].type,
                        key: _data[2].key,
                        list: offline_arr
                    };

                    let drive_arr = [];
                    _data[3].filters.map(item => {
                        drive_arr.push({
                            text: item.key,
                            value: item.value
                        });
                    });
                    this.drive_list = {
                        label: _data[3].label,
                        type: _data[3].type,
                        key: _data[3].key,
                        list: drive_arr
                    };
                })
                .catch(err => {
                    // console.log(err);
                    err;
                });
        },
        searchData() {
            let _search = [];
            if (this.selected_parking) {
                _search.push({
                    key: "parking",
                    value: [this.selected_parking]
                });
            }
            if (this.selected_battery) {
                _search.push({
                    key: "battery",
                    value: [this.selected_battery]
                });
            }
            if (this.selected_offline) {
                _search.push({
                    key: "online",
                    value: [this.selected_offline]
                });
            }
            if (this.selected_drive) {
                _search.push({
                    key: "inUse",
                    value: [this.selected_drive]
                });
            }
            this.axiosApi(this, 1, _search);
        },
        axiosApi(self, page, obj) {
            httpclient
                .post(`/api/v1/vehiclesearch/searchnew?searchText=${this.search}&source=&pageNo=${page}&pageSize=10`, {
                    filters: obj
                })
                .then(response => {
                    self.data = response.data.data;
                    if (self.data) {
                        self.total = response.data.data.rowCount ? response.data.data.rowCount : 0;
                        self.currentPage = response.data.data.pageNo ? response.data.data.pageNo : 0;
                        this.filterData(self.data.vehicles);
                    } else {
                        self.total = 0;
                        self.currentPage = 0;
                        this.filterData([]);
                    }
                })
                .catch(err => {
                    alert(err);
                });
        },
        formatNumber(nStr) {
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
        changePage(page) {
            let self = this;
            this.axiosApi(self, page, []);
        },
        apiDel() {
            httpclient
                .post("/api/v1/vehicle/delete", {
                    vehicleId: this.delId
                })
                .then(response => {
                    if (response.data.data.errCode == 100) {
                        this.reload();
                    } else {
                        this.delErrContent = this.delErrorMsg[response.data.data.errCode];
                        this.showDelError = true;
                    }
                    this.showDelMap = false;
                })
                .catch(() => {
                    this.delErrContent = this.$t("m.err_message.vehicle_param_error");
                    this.showDelError = true;
                });
        },
        showMapTip(lat, lng, area, info) {
            if (lat || area.length) {
                this.map = {
                    lat: lat,
                    lng: lng,
                    area: area,
                    vehicleInfo: info
                };
                this.showMap = true;
            }
        },
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
        hideModal() {
            this.showDelMap = !this.showDelMap;
        },
        delData(id) {
            this.delId = id;
            this.showDelMap = true;
        },
        filterData(data) {
            let self = this;
            this.table = data.map(function(item) {
                let pack = item.outStatus ? (item.outStatus == 1 ? item.parkingName : self.$t("m.vehicle_detail.off_lot")) : "N/A";

                let battery = null;
                let batteryClass = null;
                if (item.currentVoltage) {
                    let numBat = item.currentVoltage.toFixed(1);
                    battery = item.currentVoltage.toFixed(1) + " V";
                    batteryClass = numBat <= 11.7 ? "badge-danger" : numBat > 11.7 && numBat <= 12.1 ? "badge-warning" : "badge-success";
                } else {
                    battery = "N/A";
                    batteryClass = "badge-secondary";
                }

                let color = null;
                self.colorList.map(value => {
                    //手动翻译车辆的颜色
                    if (item.color) {
                        if (item.color === value.y) {
                            color = value.c;
                        } else {
                            color = item.color;
                        }
                    } else {
                        color = "N/A";
                    }
                });

                let onlineStatus = item.isOnline 
                let year = item.year ? item.year : "N/A";
                let make = item.make ? item.make : "N/A";
                let model = item.model ? item.model : "N/A";
                let alias = item.alias ? "- " + item.alias : "";
                let info = year == "N/A" && make == "N/A" && model == "N/A" && alias == "" ? "N/A" : year + " " + make + " " + model + " " + alias;
                let trim = item.trim ? item.trim : "N/A";
                let colorTrim = color == "N/A" && trim == "N/A" ? "N/A" : color + " , " + trim;
                let lastFlameoutDay = null;
                if (item.lastFlameoutDay || item.lastFlameoutDay == 0) {
                    lastFlameoutDay = item.lastFlameoutDay + self.$t("m.common.days");
                } else {
                    lastFlameoutDay = "N/A";
                }

                let _mileage = null; //距离单位转换
                if (item.currentMileage) {
                    if (self.changedLanguage === "English") {
                        _mileage = self.format_number((item.currentMileage * 0.0006214).toFixed(0));
                    } else {
                        _mileage = self.format_number((item.currentMileage / 1000).toFixed(0));
                    }
                } else {
                    _mileage = "N/A";
                }

                return {
                    vehicleNum: item.vehicleServiceNum ? item.vehicleServiceNum : "N/A",
                    photoUrl: item.photoUrl ? item.photoUrl : require("@/assets/pages-img/placeholder.svg"),
                    vehicle: info,
                    colorTrim: colorTrim,
                    stock: item.stockNumber ? item.stockNumber : "N/A",
                    park: pack,
                    battery: battery,
                    batteryClass: batteryClass,
                    online: onlineStatus,
                    use: item.available == 0 ? "Available" : "In Use",
                    price: item.price ? self.formatNumber(item.price) : "N/A",
                    mileage: _mileage,
                    inventory: item.inventoryDays ? item.inventoryDays + self.$t("m.common.days") : "N/A",
                    daysIdle: lastFlameoutDay,
                    action: "<span>action</span>",
                    vehicleId: item.vehicleId,
                    unboundStatus: item.isOnline == 3 ? self.$t("m.vehicle.unbound") : "",
                    info: info,
                    lat: item.lastLocationLat,
                    lng: item.lastLocationLng,
                    area: item.areaCoordinates ? item.areaCoordinates : []
                };
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.top-holder {
    margin-top: 12px;
}
.font-white {
    color: white;
}
.vehicle {
    .select-box {
        margin-top: 6px;
    }
    .link-to-detail {
        cursor: pointer;
        color: #20a8d8;

        &:hover {
            text-decoration: underline;
        }
    }

    .search-group {
        width: 42%;
        // margin-top: 2%;
        display: inline-block;

        input {
            height: 40px;
        }

        button {
            margin-left: 0px;
            height: 36px;
        }

        a {
            margin-left: 10%;
        }
    }

    .table-outline {
        margin-top: 2%;
    }
}
.btn {
    margin: 2px;
}

.photo-url {
    img {
        border-radius: 4px;
        object-fit: cover;
    }
    span {
        position: absolute;
        background-color: #73818f;
        border-radius: 4px;
        padding: 0.25rem;
        font-size: 12px;
    }
}
.show-map {
    .modal-dialog {
        max-width: 80%;
    }
}
.my-icon {
    background: #000;
    margin-left: 3px;
    color: #fff;
    width: 15px;
    height: 15px;
    font-size: 15px;
    text-align: center;
    border-radius: 50%;
}

/*删除和导入两个弹窗的宽度*/
.del-tip,
.insert-vehicle {
    .modal {
        .modal-dialog {
            width: 50%;
            max-width: 500px;
        }
    }
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
