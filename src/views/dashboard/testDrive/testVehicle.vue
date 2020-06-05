<template>
    <div class="animated fadeIn shop">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t("m.dashboard.test_vehicle") }}
            </div>
            <div class="content">
                <b-form-group class="search-data">
                    <b-input-group>
                        <b-form-input type="text" :placeholder="$t('m.test_vehicle.placeholder')" v-model="searchText"></b-form-input>
                        <b-input-group-append>
                            <b-button variant="primary" @click="searchStatus()"><i class="fa fa-search"></i>{{ $t("m.vehicle.b_search") }} </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>

                <div class="select-status">
                    <p>{{ $t("m.cloud.vehicle_status") }}</p>
                    <select style="display: inline-block;width: 150px;" class=" form-control" v-model="curStatus" @change="searchStatus()">
                        <option value="all" selected>{{ $t("m.cloud.all_status") }}</option>
                        <option v-for="(item, key) in allStatus" :key="key" :value="item.id">{{ item.name }}</option>
                    </select>
                </div>

                <b-table class="mb-0 table-outline table-responsive-sm" small striped responsive="sm" :items="table" hover :fields="tableFields">
                    <template slot="photo" slot-scope="data">
                        <img :src="data.item.photo + '?width=300&height=300'" style="object-fit: cover;border-radius: 4px;" width="100px" height="100px" />
                    </template>
                    <template slot="info" slot-scope="data">
                        <p style="font-weight: bolder;margin-bottom: 1px;text-decoration: underline;color: #63c2de;cursor: pointer" @click="$router.push('/test-drive/test-vehicle/detail/' + data.item.vehicleId)">{{ data.item.year ? data.item.year : "N/A" }} {{ data.item.make ? data.item.make : "N/A" }} {{ data.item.model ? data.item.model : "N/A" }} {{ data.item.alias ? "-" + data.item.alias : "" }}</p>
                        <p style="margin-bottom: 1px;">{{ data.item.color ? data.item.color : "N/A" }}, {{ data.item.trim ? data.item.trim : "N/A" }}</p>
                        <p style="margin-bottom: 1px;">
                            {{ data.item.stock ? data.item.stock : "N/A" }}
                            <template v-if="data.item.plat">
                                <span class="plat">{{ data.item.plat }}</span>
                            </template>
                        </p>
                    </template>
                    <template slot="point" slot-scope="data">
                        <template v-if="data.item.point">
                            <p @click="$router.push('/test-drive/test-point/detail/' + data.item.parkingId)" style="margin-bottom: 4px;font-weight: bolder;margin-bottom: 1px;text-decoration: underline;color: #63c2de;cursor: pointer">{{ data.item.point }}</p>
                        </template>
                        <template v-else>
                            <p style="margin-bottom: 4px;">{{ $t("m.cloud.undistribute") }}</p>
                        </template>
                        <p style="color:#63c2de;cursor: pointer;margin-bottom: 0;text-decoration: underline" @click="showChangePoint(data.item.vehicleId, data.item.parkingId)">{{ $t("m.cloud.change_point") }}</p>
                    </template>
                    <template slot="status" slot-scope="data">
                        <template v-if="data.item.superComputingDevice">
                            <div class="bind-device">{{ $t("m.vehicle.has_bound") }}</div>
                        </template>
                        <template v-else>
                            <div class="unbind-device">{{ $t("m.vehicle.unbound") }}</div>
                        </template>
                        <template v-if="data.item.vehicleStatus == 10">
                            <p style="margin-bottom: 0">
                                <span class="badge badge-primary">{{ $t("m.cloud.ready") }}</span>
                            </p>
                        </template>
                        <template v-if="data.item.vehicleStatus == 20">
                            <span class="badge badge-success">{{ $t("m.cloud.test_drive") }}</span>
                            <p @click="$router.push('/test-drive/test-vehicle/detail/' + data.item.vehicleId)" style="color: rgb(99, 194, 222);margin-bottom: 4px;cursor: pointer;text-decoration: underline">{{ $t("m.report.orderNo") + ":" }} {{ data.item.orderServiceNum }}</p>
                        </template>
                        <template v-if="data.item.vehicleStatus == 30">
                            <span class="badge badge-warning">{{ $t("m.cloud.w_accept") }}</span>
                            <p @click="$router.push('/test-drive/test-vehicle/detail/' + data.item.vehicleId)" style="color: rgb(99, 194, 222);margin-bottom: 4px;cursor: pointer;text-decoration: underline">{{ $t("m.report.orderNo") + ":" }} {{ data.item.orderServiceNum }}</p>
                            <p style="color: rgb(99, 194, 222);margin-bottom: 4px;cursor: pointer;text-decoration: underline" @click="showVerifyModel(data.item.orderId)">{{ $t("m.cloud.vehicle_accept") }}</p>
                        </template>
                    </template>
                    <template slot="actions" slot-scope="data" class="d-inline-block" style="margin: 2px">
                        <div v-b-tooltip.hover :title="$t('m.common.position_detail')"><i class="cui cui-location-pin btn btn-sm btn-secondary" :class="data.item.lat ? 'btn-success' : ''" @click="openMap(data.item.lat, data.item.lng, data.item)"></i></div>
                        <div v-b-tooltip.hover :title="$t('m.vehicle_bind.detail')" style="margin: 2px" class="vehicledetail d-inline-block" @click="$router.push('/test-drive/test-vehicle/detail/' + data.item.vehicleId)">
                            <i class="btn btn-info text-white btn-sm fa fa-eye"></i>
                        </div>
                        <div v-b-tooltip.hover :title="$t('m.common.edit')" style="margin: 2px" class="vehicleedit d-inline-block" @click="$router.push('/test-drive/test-vehicle/edit/' + data.item.vehicleId)">
                            <i class="fa fa-edit btn btn-sm btn-info text-white"></i>
                        </div>
                        <div v-b-tooltip.hover :title="$t('m.cloud.delete')" class="btn btn-sm btn-danger" style="color: #ffffff;" @click="showDelVehicle(data.item.vehicleId)"><i class="cui cui-trash"></i></div>
                    </template>
                </b-table>
            </div>
        </b-card>
        <b-row>
            <b-col sm="4" lg="4">
                <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">{{ $t("m.common.show") }} {{ 10 * (currentPage - 1) + 1 }} {{ $t("m.common.to") }} {{ currentPage === totalPages ? total : currentPage * 10 }} {{ $t("m.common.of") }} {{ total }} {{ $t("m.common.entries") }}</div>
            </b-col>
            <b-col sm="8" lg="8">
                <b-pagination align="right" :total-rows="total" v-model="currentPage" :per-page="10" @input="changePage(currentPage)"></b-pagination>
            </b-col>
        </b-row>
        <b-modal class="show-map-modal" ref="my-modal" v-model="showChangeTip" :title="$t('m.cloud.change_tip_title')" :ok-title="$t('m.tip.confirm')" :cancel-title="$t('m.tip.b_cancel')" @ok="changePoint">
            <p class="text-left" style="margin-bottom: 2px;">{{ $t("m.cloud.change_tip_content") }}</p>
            <p class="text-left" style="margin-bottom: 2px;">{{ $t("m.cloud.change_tip_content1") }}</p>
            <select style="width: 90%;margin: 0 auto;margin-top: 40px;" class=" form-control" v-model="curLot">
                <option value="all" selected>{{ $t("m.cloud.choice_point") }}</option>
                <option value="remove" :class="colorRed">{{ $t("m.cloud.remove_point") }}</option>
                <option v-for="(item, key) in lotList" :key="key" :value="item.id">{{ item.parkingName }}</option>
            </select>
        </b-modal>
        <b-modal ref="my-modal" v-model="changeErrorTip" :title="$t('m.cloud.cant_change_point')" :ok-title="$t('m.tip.b_ok')" :cancel-title="$t('m.tip.b_cancel')" ok-only>
            {{ changeErrorMsg }}
        </b-modal>

        <b-modal :title="mapModalData" ref="my-modal" v-model="showMap" :ok-title="$t('m.cloud.close_modal')" class="show-map map-test-list" @ok="showMap = false" ok-only>
            <myMap :map="map"></myMap>
        </b-modal>

        <b-modal :title="$t('m.cloud.vehicle_accept')" ref="my-modal-verify-car" v-model="verifyCarStatus" :ok-title="$t('m.tip.confirm')" :cancel-title="$t('m.tip.b_cancel')" @ok="verifyCar">
            <p class="text-center">{{ verifyCarText }}</p>
        </b-modal>
        <model :show="showModel" :title="modelTitle" :content="modelContent" :buttonText="btnGroup" @closeRemindBox="clickButton"></model>
        <model :show="showModel2" :title="modelTitle2" :content="modelContent2" :buttonText="btnGroup2" @closeRemindBox="clickButton2"></model>
    </div>
</template>

<style lang="scss" scoped>
.state-card {
    background: yellow;
    color: #000000;
    display: inline-block;
    padding: 4px;
    border-radius: 4px;
    margin-bottom: 8px;
}
.select-status {
    margin-bottom: 20px;
    p {
        margin-bottom: 5px;
    }
}
.search-data {
    width: 40%;
}
.plat {
    color: white;
    background: #63c2de;
    padding: 2px;
    border-radius: 8px;
}
.state-card-green {
    background: #4dbd74;
    color: #ffffff;
}
.unbind-device {
    color: red;
}
.color-red {
    color: #c00 !important;
}
</style>

<script>
import httpClient from "@/utils/httpclient";
import myMap from "@components/map";
import model from "@/components/model";

export default {
    name: "shopManager",
    components: {
        myMap,
        model
    },
    inject: ["reload"],
    data() {
        return {
            showModel: false,
            modelTitle: "",
            modelContent: "",
            btnGroup: {
                btnFirst: this.$t("m.tip.b_cancel"),
                btnSecond: this.$t("m.tip.confirm")
            },
            showModel2: false,
            modelTitle2: "",
            modelContent2: "",
            btnGroup2: {
                btnFirst: "",
                btnSecond: this.$t("m.tip.b_ok")
            },
            map: {},
            showMap: false,
            verifyCarStatus: false,
            verifyCarText: this.$t("m.cloud.verify_car_list"),
            verifyCarId: 0,
            mapModalData: null,
            searchText: "",
            tableFields: {
                vehicleServiceNum: {
                    label: this.$t("m.cloud.drive_vehicle_num"),
                    class: "text-center"
                },
                photo: {
                    label: this.$t("m.vehicle.photo"),
                    class: "text-center"
                },
                info: {
                    label: this.$t("m.sold_vehicle.info"),
                    class: "text-center"
                },
                point: {
                    label: this.$t("m.cloud.point"),
                    class: "text-center"
                },
                status: {
                    label: this.$t("m.cloud.status"),
                    class: "text-center"
                },
                actions: {
                    label: this.$t("m.vehicle.actions"),
                    class: "text-center"
                }
            },
            table: null,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            totalPages: 0,
            showChangeTip: false,
            curStatus: "all",
            curVehicleId: "",
            curLot: "all",
            curParkId: "",
            changeErrorTip: false,
            changeErrorMsg: "",
            lotList: [],
            allStatus: [
                {
                    id: "10",
                    name: this.$t("m.cloud.ready")
                },
                {
                    id: "20",
                    name: this.$t("m.cloud.test_drive")
                },
                {
                    id: "30",
                    name: this.$t("m.cloud.w_accept")
                }
            ],
            colorRed: "color-red"
        };
    },
    mounted() {
        this.$route.query.type ? (this.curStatus = this.$route.query.type) : "all";
        this.initData(this.currentPage);
    },
    methods: {
        showDelVehicle(id) {
            this.curVehicleId = id;
            this.modelTitle = this.$t("m.vehicle.actions_remind");
            this.modelContent = this.$t("m.tip.confirm_del_lot");
            this.showModel = true;
        },
        clickButton(type) {
            if (type) {
                this.delVehicle();
            } else {
                this.showModel = false;
            }
            this.showModel = false;
        },
        delVehicle() {
            httpClient
                .post("/api/v1/clouddrive/vehicle/delete", {
                    vehicleId: this.curVehicleId
                })
                .then(res => {
                    if (res.data.code == 200 && res.data.data.result) {
                        window.location.reload();
                    } else {
                        this.modelTitle2 = this.$t("m.vehicle.actions_remind");
                        this.modelContent2 = this.$t("m.tip.unfinished_order");
                        this.showModel2 = true;
                    }
                });
        },
        clickButton2 () {
            this.showModel2 = false;
        },
        initData(page) {
            httpClient.get(`/api/v1/clouddrive/vehicle/pagelist?searchText=${this.searchText}&pageNo=${page}&pageSize=${this.pageSize}${this.curStatus == "all" ? "" : "&drivingStatus=" + this.curStatus}`).then(response => {
                if (response.data.code == 200 && response.data.data.datas) {
                    this.total = response.data.data.rowCount;
                    this.filterData(response.data.data);
                    this.totalPages = response.data.data.totalPages;
                } else {
                    this.table = [];
                }
            });
            httpClient.get(`/api/v1/clouddrive/parkinglot/list`).then(res => {
                if (res.data.code == 200) {
                    this.lotList = res.data.data;
                }
            });
        },
        changePoint() {
            if (this.curLot && this.curLot != "all") {
                httpClient
                    .post(`/api/v1/clouddrive/vehicle/transferparking`, {
                        isRemove: this.curLot == "remove" ? 1 : "",
                        receiveParkingId: this.curLot == "remove" ? "" : this.curLot,
                        vehicleId: this.curVehicleId,
                        orgParkingid: this.curParkId
                    })
                    .then(res => {
                        if (res.data.code == 200 && res.data.data.result) {
                            window.location.reload();
                        } else {
                            this.changeErrorMsg = res.data.data.content;
                            this.changeErrorTip = true;
                        }
                    });
            }
        },
        openMap(lat, lng, datas) {
            if (lat) {
                this.map = {
                    lat: lat,
                    lng: lng,
                    area: [],
                    vehicleInfo: {}
                };
                this.mapModalData = `${datas.year}${datas.make}${datas.model}${datas.alias ? -datas.alias : ""} | <span class="badge badge-success">${datas.plat}</span>${datas.lastLocation ? datas.lastLocation : ""}`;
                this.showMap = true;
            }
        },
        showChangePoint(vehicleId, parkId) {
            this.curParkId = parkId;
            this.curVehicleId = vehicleId;
            this.showChangeTip = true;
        },
        filterData(data) {
            this.table = data.datas.map(item => {
                return {
                    photo: item.photoPath ? item.photoPath : require("@/assets/pages-img/placeholder.svg"),
                    year: item.year,
                    make: item.make,
                    model: item.model,
                    alias: item.alias,
                    color: item.color,
                    trim: item.trim,
                    stock: item.stockNumber,
                    plat: item.plat,
                    orderServiceNum: item.orderServiceNum,
                    point: item.parkingName,
                    status: item.orderStatus,
                    vehicleId: item.vehicleId,
                    vehicleStatus: item.testDrivingStatus,
                    parkingId: item.parkingLotId,
                    orderId: item.orderId,
                    id: item.id,
                    lat: item.lastLocationLat,
                    lng: item.lastLocationLng,
                    superComputingDevice: item.superComputingDevice,
                    vehicleServiceNum: item.vehicleServiceNum || "N/A"
                };
            });
        },
        searchStatus() {
            this.currentPage = 1;
            this.initData(this.currentPage);
        },
        prevPage() {
            this.initData(this.currentPage > 1 ? this.currentPage - 1 : 1);
        },
        nextPage() {
            this.initData(this.currentPage >= this.pageCount ? this.currentPage : this.currentPage + 1);
        },
        changePage(page) {
            this.initData(page);
        },
        showVerifyModel(id) {
            //点击时取出order-id,赋值给data，验收接口调用时使用该id
            this.verifyCarId = id;
            this.verifyCarStatus = true;
            console.log(this.verifyCarId);
        },
        verifyCar() {
            httpClient.get(`/api/v1/clouddrive/order/check?orderId=${this.verifyCarId}`).then(res => {
                this.verifyCarStatus = false;
                if (res.data.code == 200 && res.data.data.result) {
                    this.reload();
                } else {
                    alert(res.data.data.content);
                }
            });
        }
    }
};
</script>
