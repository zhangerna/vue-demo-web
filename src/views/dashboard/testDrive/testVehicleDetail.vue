<template>
    <div class="animated fadeIn vehicle-detail">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t("m.common.test_vehicle_detail") }}
                <div class="float-right">
                    <b-button class="btn btn-sm btn-info" style="color: #fff" @click="showLock(1)">{{ $t("m.cloud.lock_vehicle") }} </b-button>
                    <b-button class="btn btn-sm btn-info m-1" style="color: #fff" @click="showLock(0)">{{ $t("m.cloud.unlock_vehicle") }} </b-button>
                    <button class="btn btn-sm btn-info " style="color: #fff" @click="$router.push('/test-drive/test-vehicle/edit/' + $route.params.id)">
                        {{ $t("m.common.edit") }}
                    </button>
                </div>
            </div>
            <b-row style="padding-left: 0.6rem;">
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
                                {{ data.parkingLot ? data.parkingLot : "N/A" }}
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
                                    <span v-if="data.currentVoltage && Number(data.currentVoltage.toFixed(1)) <= 11.7" class=" badge-danger badge-pill currentVoltage">
                                        {{ data.currentVoltage.toFixed(1) + "V" }}
                                    </span>
                                    <span v-else-if="data.currentVoltage && Number(data.currentVoltage.toFixed(1)) > 11.7 && Number(data.currentVoltage.toFixed(1)) <= 12.1" class="badge-warning badge-pill">
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
                                <span class="mx-2 badge badge-pill btn-danger">In Use</span>
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
                                <b-button style="margin-left:10px;" v-else pressed size="sm" variant="danger" aria-pressed="true" class="button-red" @click="bUnpair = true">{{ $t("m.common.b_unpair") }}</b-button>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4"> {{ $t("m.cloud.device_name_chelian") }}IMEI </b-col>
                            <b-col sm="8" lg="8" v-if="data.superComputingDevice">
                                {{ data.superComputingDevice && data.superComputingDevice != "null" ? data.superComputingDevice : "N/A" }}
                            </b-col>
                            <b-col sm="8" lg="8" v-else>
                                <span class="badge badge-secondary">{{ $t("m.vehicle.unbound") }}</span>
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
                                {{ $t("m.cloud.vehicle_store_name") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.storeName ? data.storeName : "N/A" }}
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t("m.cloud.drive_store") }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.parkingName ? data.parkingName : "N/A" }}
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
                        <div class="gaode-fullscreen" @click="showMapTip" v-if="map && (map.lat != 0 || map.area.length > 0) && $store.getters.userInfo.country && $store.getters.userInfo.country == 'China'">
                            <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%20018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A" style="height: 18px;width: 18px" />
                        </div>
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
        </b-card>
        <b-card style="margin-top: 20px;">
            <div slot="header">
                {{ $t("m.cloud.vehicle_oper") }}
            </div>
            <template v-if="rows !== 0">
                <b-row style="border-bottom: 0px;">
                    <b-table class="user-table-list mb-0 table-outline table-responsive-sm" striped hover :items="items" :fields="fields">
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
                <div class="dataTables_info text-right" id="DataTables0" style="display: inline-block;position: absolute;margin-top: -46px;" role="status" aria-live="polite">
                    <span v-if="totalPages > 0"
                        >{{ $t("m.common.show") }}
                        {{ 10 * (currentPage - 1) + 1 }}
                        {{ $t("m.common.to") }}
                        {{ currentPage === totalPages ? rows : currentPage * 10 }}
                        {{ $t("m.common.of") }} {{ rows }} {{ $t("m.common.entries") }}</span
                    >
                    <span v-else>{{ $t("m.common.show") }} 0 {{ $t("m.common.to") }} 0 {{ $t("m.common.of") }} {{ rows }} {{ $t("m.common.entries") }}</span>
                </div>
            </template>
            <template v-else>
                <b-row style="border-bottom: none">
                    <b-col class="col-12 text-center">
                        <span>{{ $t("m.cloud.un_operation_record") }}</span>
                    </b-col>
                </b-row>
            </template>
        </b-card>
        <b-card style="margin-top: 20px;">
            <div slot="header">
                {{ $t("m.cloud.test_record") }}
            </div>
            <template v-if="orderRows !== 0">
                <b-row style="border-bottom: 0px;">
                    <b-table class="mb-0 table-outline table-responsive-sm user-table-list" striped hover :items="historyData" :fields="history">
                        <template slot="orderId" slot-scope="data">
                            <div class="has-link-detail" @click="$router.push('/test-drive/reservation-order/detail/' + data.item.orderId)">
                                {{ data.item.orderNum }}
                            </div>
                        </template>
                        <template slot="user" slot-scope="data">
                            <div v-if="!data.item.name">
                                <div class="has-link-detail" @click="$router.push('/test-drive/test-user/detail/' + data.item.dUserId)">
                                    {{ data.item.phone }}
                                </div>
                                <div>{{ $t("m.cloud.name_un_get") }}</div>
                            </div>
                            <div v-else class="has-link-detail" @click="$router.push('/test-drive/test-user/detail/' + data.item.dUserId)">
                                <div>{{ data.item.phone }}</div>
                                <div>{{ data.item.name }}</div>
                            </div>
                        </template>
                        <template slot="point" slot-scope="data">
                            <div class="has-link-detail" @click="$router.push('/test-drive/test-point/detail/' + data.item.pointId)">
                                {{ data.item.point }}
                            </div>
                        </template>
                        <template slot="time" slot-scope="data">
                            <div>
                                {{ data.item.startTime }}
                                {{ "~" + data.item.endTime }}
                            </div>
                        </template>
                    </b-table>
                </b-row>
                <b-pagination align="right" :total-rows="orderRows" v-model="orderCurrentPage" :per-page="orderPerPage" @input="turnToOrderPage(currentPage)"></b-pagination>
                <div class="dataTables_info text-right" style="display: inline-block;position: absolute;margin-top: -46px;" role="status" aria-live="polite">
                    <span v-if="orderTotalPages > 0"
                        >{{ $t("m.common.show") }}
                        {{ 10 * (orderCurrentPage - 1) + 1 }}
                        {{ $t("m.common.to") }}
                        {{ orderCurrentPage === orderTotalPages ? orderRows : orderCurrentPage * 10 }}
                        {{ $t("m.common.of") }} {{ orderRows }} {{ $t("m.common.entries") }}</span
                    >
                    <span v-else>{{ $t("m.common.show") }} 0 {{ $t("m.common.to") }} 0 {{ $t("m.common.of") }} {{ orderRows }} {{ $t("m.common.entries") }}</span>
                </div>
            </template>
            <template v-else>
                <b-row style="border-bottom: none">
                    <b-col class="col-12 text-center">
                        <span>{{ $t("m.cloud.un_drive_record") }}</span>
                    </b-col>
                </b-row>
            </template>
        </b-card>
        <p class="text-center" style="margin: 20px 0 4px 0;">
            {{ $t("m.cloud.drive_vehicle_delete") }}
        </p>
        <p class="text-center">
            {{ $t("m.cloud.before_delete_vehicle") }}
        </p>

        <div class="text-center" style="margin-bottom: 10px;">
            <button class="btn btn-danger active" @click="showDeleteVehicle()">
                {{ $t("m.cloud.delete") }}
            </button>
        </div>

        <b-modal ref="my-modal" v-model="showMap" :cancel-title="$t('m.tip.b_cancel')" :ok-title="$t('m.tip.b_ok')" @ok="showMap = false" class="show-map show-google-gaode">
            <myMap :map="map" :elementId="'map-2'" :class="map && (map.lat != 0 || map.area.length > 0) ? '' : 'hidden'"></myMap>
        </b-modal>

        <b-modal ref="my-modal" v-model="deleteErrorTip" :title="$t('m.tip.warn')" @ok="delVehicle" :ok-title="$t('m.tip.confirm')" :cancel-title="$t('m.tip.b_cancel')" ok-only>
            {{ $t("m.tip.confirm_del_vehicle") }}
        </b-modal>
        <b-modal class="lock-my-car" ref="my-modal" v-model="showLockModel" :title="lockOperTitle" :cancel-title="$t('m.tip.b_cancel')" :ok-title="$t('m.tip.confirm')" @ok="confirmLockOper()">
            <p class="text-center">{{ lockOperContent }}</p>
        </b-modal>

        <b-modal class="lock-my-car remind-modal" @ok="showOperation === false" v-model="showOperation" id="modal-operation-remind" :title="lockOperTitle" :ok-title="$t('m.tip.confirm')" ok-only>
            <p class="my-4 text-center">{{ showOperationText }}</p>
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
            showOperation: false,
            showOperationText: "",
            deleteErrorTip: false,
            data: {},
            showMap: false,
            map: null,
            showLockModel: false,
            searchGoogleMap: {},
            tipTitle: "",
            transferStatus: false,
            transferContents: "",
            transferTitle: "",
            soldStatus: "",
            soldOutC: "",
            lockOperContent: "",
            lockOperTitle: "",
            fields: {
                operation: {
                    key: "operationType",
                    label: this.$t("m.common.action"),
                    class: "text-center"
                },
                vehicle: {
                    key: "vehicle",
                    label: this.$t("m.vehicle_detail.operator"),
                    class: "text-center"
                },
                time: {
                    key: "time",
                    label: this.$t("m.common.time"),
                    class: "text-center"
                }
            },
            history: {
                orderId: {
                    key: "orderId",
                    label: this.$t("m.cloud.appoint_order"),
                    class: "text-center"
                },
                user: {
                    key: "user",
                    label: this.$t("m.dashboard.test_user_info"),
                    class: "text-center"
                },
                point: {
                    key: "point",
                    label: this.$t("m.dashboard.test_point_info"),
                    class: "text-center"
                },
                time: {
                    key: "time",
                    label: this.$t("m.cloud.rese_test_drive"),
                    class: "text-center"
                },
                status: {
                    key: "status",
                    label: this.$t("m.cloud.appoint_order_status"),
                    class: "text-center"
                }
            },
            options: [],
            selected: null,
            items: [],
            totalPages: 1,
            currentPage: 1,
            perPage: 10,
            rows: 1,
            orderTotalPages: 1,
            orderCurrentPage: 1,
            orderPerPage: 10,
            orderRows: 1,
            myCurrentMileage: null,
            historyData: [],
            curOperLockStatus: null,
            deviceMac: "",
            vin: "",
            bUnpair: false,
            installDeviceStatus: false,
            imeiIsVaild: true,
            showAlerts: {
                title: "",
                show: false,
                content: "",
                buttonText: ""
            },
            inputText: "",
            installSuccess: false,
            installStatus: false,
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
            .get("/api/v1/clouddrive/vehicle/detail/id?vehicleId=" + this.$route.params.id, {})
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
                // console.log(err);
                err;
            });

        this.getVehicleOperatorList(1);
        this.getOrderList();
    },
    methods: {
        showMapTip() {
            this.showMap = true;
        },
        confirmLockOper() {
            if (this.curOperLockStatus) {
                httpclient
                    .post("/api/v1/clouddrive/vehicle/controllock", {
                        vehicleId: this.$route.params.id,
                        controlType: this.curOperLockStatus == "lock" ? 0 : 1
                    })
                    .then(res => {
                        if (res.data.code == 200 && res.data.data.result) {
                            this.showOperation = true;
                            this.showOperationText = this.$t("m.cloud.lock_succ_content");
                        } else {
                            this.showOperation = true;
                            this.showOperationText = this.$t("m.cloud.lock_fail_content");
                        }
                    });
            }
        },
        showLock(type) {
            this.curOperLockStatus = type ? "lock" : "unlock";
            this.lockOperContent = type ? this.$t("m.cloud.confirm_lock") : this.$t("m.cloud.confirm_unlock");
            this.lockOperTitle = type ? this.$t("m.cloud.confirm_lock_title") : this.$t("m.cloud.confirm_unlock_title");
            this.showLockModel = true;
        },
        getOrderList() {
            httpclient.get("/api/v1/clouddrive/order/pagelistbyvehicle?vehicleid=" + this.$route.params.id).then(res => {
                if (res.data.code == 200) {
                    this.orderPerPage = res.data.data.pageSize;
                    this.orderTotalPages = res.data.data.totalPages;
                    this.orderRows = res.data.data.rowCount;
                    this.insertOrderList(res.data.data.datas);
                }
            });
        },
        insertOrderList(data) {
            this.historyData = data.map(item => {
                return {
                    orderNum: item.orderServiceNum,
                    orderId: item.orderId,
                    dUserId: item.dUserId,
                    name: item.usedName,
                    checkStatus: item.checkStatus ? item.checkStatus : null,
                    phone: item.phone,
                    point: item.parkingName ? item.parkingName : "N/A",
                    pointId: item.parkingId,
                    startTime: this.getDateString(item.appointmentStartTime),
                    endTime: this.getDateString(item.appointmentEndTime).split("  ")[1],
                    status: item.orderStatus == 10 ? this.$t("m.cloud.wait_pick_up") : item.orderStatus == 20 ? this.$t("m.cloud.wait_return") : item.orderStatus == 30 ? this.$t("m.cloud.returned_vehicle") : this.$t("m.cloud.canceled")
                };
            });
        },
        getDateString(data) {
            return getDateString(data);
        },
        getDaysBetweenDate(data, time) {
            return getDaysBetweenDate(data, time);
        },
        showDeleteVehicle() {
            this.deleteErrorTip = true;
        },
        delVehicle() {
            httpclient
                .post("/api/v1/clouddrive/vehicle/delete", {
                    vehicleId: this.$route.params.id
                })
                .then(res => {
                    if (res.data.code == 200 && res.data.data.result) {
                        this.$router.push("/test-drive/test-vehicle/list");
                    } else {
                        alert(res.data.data.msg);
                    }
                });
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
        turnToOrderPage(p) {
            this.getOrderList(p ? p : 1);
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
                })
                .catch(err => {
                    err;
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
        },
        reloadPage() {
            window.location.reload();
        }
    }
};
</script>

<style lang="scss">
.vehicle-detail {
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
    .gaode-fullscreen {
        background: #ffffff;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        position: absolute;
        z-index: 1;
        right: 6px;
        top: 6px;
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

.modal-dialog {
    max-width: 50% !important;
    width: 50% !important;
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
.remind-modal {
    .modal-footer {
        .btn {
            margin: 0 auto;
        }
    }
}
.has-link-detail {
    cursor: pointer;
    font-weight: bolder;
    margin-bottom: 1px;
    color: #63c2de;
    text-decoration: underline;
}
.button-red {
    display: inline-block;
    width: 50px;
    height: 20px;
    background-color: #f86c6b !important;
    color: #fff;
    line-height: 10px;
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
    color: #fff !important;
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
    color: #23282c;
    font-weight: bold;
}
</style>
