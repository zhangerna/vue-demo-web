<template>
    <div class="animated fadeIn vehicle-detail">
        <b-card>
            <div slot="header">
                {{ $t('m.common.detail') }}
            </div>
            <b-row style="padding-left: 0.6rem;">
                <b-col sm="6" class="left">
                    <div class="border-dark border" v-if="data">
                        <b-row>
                            <b-col sm="12" lg="12" class="title">
                                {{ data.year && data.year != 'null' ? data.year : "N/A" }} {{ data.make && data.make !=
                                'null' ? data.make :
                                'N/A' }} {{ data.model && data.model != 'null' ? data.model : 'N/A' }}{{ data.alias
                                && data.alias != 'null' ? " - " + data.alias : '' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.last_location') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.lastLocation ? data.lastLocation : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.last_update') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.lastUpdateTime ? getDateString(data.lastUpdateTime ) : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.lot') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.outStatus == 2 ? $t('m.vehicle_detail.off_lot')  : (data.parkingLot ? data.parkingLot : 'N/A') }}
                            </b-col>
                        </b-row>
                        <b-row v-if="data.checkedInBy">
                            <b-col sm="4" lg="4">
                                {{ $t('m.vehicle_detail.check_by') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{data.checkedInBy}}
                            </b-col>
                        </b-row>
                        <b-row v-if="data.checkedInAt">
                            <b-col sm="4" lg="4">
                                {{ $t('m.vehicle_detail.check_at') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{getDateString(data.checkedInAt)}}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.line_status') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                <span class="badge badge-pill"
                      :class="data.adapter === 'Online' ? 'badge-success' : (data.adapter === 'Offline' ?'badge-secondary' :'')">
                  {{ data.isOnline == 1 ? $t('m.common.online') : (data.isOnline == 2 ? $t('m.common.offline') : 'N/A') }}
                </span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.voltage') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                <template v-if="data.currentVoltage">
                      <span v-if="data.currentVoltage && Number(data.currentVoltage.toFixed(1)) <= 11.7"
                            class=" badge-danger badge-pill currentVoltage">
                      {{ data.currentVoltage.toFixed(1) + 'V'}}
                    </span>
                                    <span v-else-if="data.currentVoltage && Number(data.currentVoltage.toFixed(1)) > 11.7 && Number(data.currentVoltage.toFixed(1)) <= 12.1"
                                          class="badge-warning badge-pill">
                      {{ data.currentVoltage.toFixed(1) + 'V'}}
                    </span>
                                    <span v-else class="badge-success badge-pill ">
                      {{ data.currentVoltage.toFixed(1) + 'V'}}
                    </span>
                                </template>
                                <template v-else>
                                    <span class=" badge badge-pill badge-secondary">N/A</span>
                                </template>
                            </b-col>
                        </b-row>
                        <b-row v-if="data.available === 1">
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.use_status') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                <span class="mx-2 badge badge-pill btn-danger">In Use</span>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.imei') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.deviceMac && data.deviceMac != 'null' ? data.deviceMac : "N/A" }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.vin') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.vin ? data.vin : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.year') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.year ? data.year : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.make') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.make ? data.make : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.model') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.model ? data.model : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.alias') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.alias ? data.alias : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.trim') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.trim ? data.trim : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.engine') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.engineType ? data.engineType : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.color') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.color ? data.color : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.price') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.thousandsPrice ? $t('m.common.moneyType') + data.thousandsPrice : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.stock_num') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.stockNumber ? data.stockNumber : 'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.inv_age') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.inventoryTime ? getDaysBetweenDate(data.inventoryTime, new Date().getTime()) +
                                $t('m.common.days') :
                                'N/A' }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.condition') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                <template v-if="!data.vehicleTypeCode">
                                    N/A
                                </template>
                                <template v-else>
                                    {{ data.vehicleTypeCode == 1 ? $t('m.common.c_new') : (data.vehicleTypeCode == 2 ? $t('m.common.c_demo') : $t('m.common.c_used') ) }}
                                </template>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.common.odometer') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ myCurrentMileage }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.vehicle_detail.plat') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.plate ? data.plate : 'N/A' }}
                            </b-col>
                        </b-row>



                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.sold_vehicle.sale_status') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{data.saleStatus? data.saleStatus :'N/A'}}
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.sold_vehicle.sale_time') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{data.saleTime ? getDateString(data.saleTime):'N/A'}}
                            </b-col>
                        </b-row>

                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.sold_vehicle.operator_p') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{data.userName? data.userName:'N/A'}}
                            </b-col>
                        </b-row>


                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.vehicle_detail.notes') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{data.notes? data.notes :'N/A'}}
                            </b-col>
                        </b-row>
                    </div>

                </b-col>
                <b-col sm="6" class="right">
                    <div class="text-center img-box">
                        <img v-if="data.vin" :src="data.photoPath ? data.photoPath : '/img/placeholder.5367544d.svg' "
                             style="border-radius: 5px 5px 5px 5px;box-shadow: 0px 0px 4px 1px #000;margin-bottom: 10px;"
                             width="100%" alt="">
                    </div>
                    <div class="map" style="position: relative">
                        <div class="gaode-fullscreen"
                             @click="showMapTip" v-if="map && (map.lat != 0 || map.area.length > 0) && $store.getters.userInfo.country && $store.getters.userInfo.country == 'China'">
                            <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%20018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                                 style="height: 18px;width: 18px">
                        </div>
                        <myMap :elementId="'map-1'" :map="map"
                               :class="map && (map.lat != 0 || map.area.length > 0) ? '': 'hidden'"></myMap>
                        <div class="img text-center" v-if="map && (map.lat == 0 && map.area == 0)"
                             style="height: 40vh;margin-top: 15vh;">
                            <img src="@/assets/pages-img/Location_not_available.svg" width="100px">
                            <p style="margin-top: 14px">{{ $t('m.vehicle_detail.no_map') }}</p>
                        </div>
                    </div>
                    <b-row style="border-bottom: 0px;">
                        <b-table class="user-table-list" hover :items="items" :fields="fields">
                            <template slot="operation" slot-scope="items">
                                <span>{{ items.item.type}}</span>
                            </template>
                            <template slot="vehicle" slot-scope="items">
                                <a v-if="items.item.operator" class="btn-md link-detail"
                                   @click="$router.push('/admin/detail/' + items.item.userId)">
                                    {{items.item.operator}}
                                </a>
                                <span v-else>N/A</span>
                            </template>
                            <template slot="time" slot-scope="items">
                                <div class="btn-md">{{items.item.time}}</div>
                            </template>
                        </b-table>
                    </b-row>

                    <b-pagination align="right" :total-rows="rows" v-model="currentPage" :per-page="perPage"
                                  @input=" turnToPage(currentPage)"></b-pagination>
                    <div class="dataTables_info text-right" id="DataTables0" role="status" aria-live="polite">
                        <span v-if="totalPages > 0 ">{{ $t('m.common.show') }} {{10 * (currentPage - 1) + 1 }} {{ $t('m.common.to') }} {{currentPage === totalPages? rows :currentPage * 10 }} {{ $t('m.common.of') }} {{rows}} {{ $t('m.common.entries') }}</span>
                        <span v-else>{{ $t('m.common.show') }} 0 {{ $t('m.common.to') }} 0 {{ $t('m.common.of') }} {{rows}} {{ $t('m.common.entries') }}</span>
                    </div>
                </b-col>
            </b-row>

        </b-card>

        <b-modal ref="my-modal" v-model="showMap" :cancel-title="$t('m.tip.b_cancel')" :ok-title="$t('m.tip.b_ok')"
                 @ok="showMap = false" class="show-map show-google-gaode">
            <myMap :map="map" :elementId="'map-2'"
                   :class="map && (map.lat != 0 || map.area.length > 0) ? '': 'hidden'"></myMap>
        </b-modal>

    </div>
</template>


<script>
    import httpclient from '@/utils/httpclient';
    import {getDateString, getDaysBetweenDate} from "@/utils/date";
    import myMap from '@/components/map';

    export default {
        name: "vehicleDetail",
        components: {
            myMap
        },
        data() {
            return {
                data: {},
                showMap: false,
                showSoldVehicle:false,
                map: null,
                searchGoogleMap: {},
                mapPopup: null,
                tipTitle: '',
                fields: {
                    operation: {
                        key: 'operationType',
                        label: this.$t('m.common.action')
                    },
                    vehicle: {
                        key: 'vehicle',
                        label: this.$t('m.vehicle_detail.operator')
                    },
                    time: {
                        key: 'time',
                        label: this.$t('m.common.time')
                    },
                },
                items: [],
                totalPages: 1,
                currentPage: 1,
                perPage: 10,
                rows: 1,
                myCurrentMileage: null
            }
        },
        mounted() {
            if (this.$i18n.locale === 'en-US') {
                this.changedLanguage = "English";
            } else {
                this.changedLanguage = 'Chinese';
            }
            let self = this;
            httpclient.get("/api/v1/saledvehicle/detail?id=" + this.$route.params.id, {}).then((response) => {
                self.data = response.data.data;
                let saleStatus;
                if(self.data.saleStatus === 1){
                    saleStatus = this.$t('m.sold_vehicle.sale')
                }else if(self.data.saleStatus === 2){
                    saleStatus = this.$t('m.sold_vehicle.sold')
                }else if(self.data.saleStatus === 3){
                    saleStatus = 'N/A'
                }else{
                    saleStatus = 'N/A'
                }
                self.data.saleStatus = saleStatus;

                let year = self.data.year ? self.data.year : 'N/A';
                let make = self.data.make ? self.data.make : 'N/A';
                let model = self.data.model ? self.data.model : 'N/A';
                let info = (year == 'N/A' && make == 'N/A' && model == 'N/A') ? 'N/A' : year + ' ' + make + ' ' + model;
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
                    if (self.changedLanguage === 'English') {
                        _mileage = ((response.data.data.currentMileage * 0.0006214).toFixed(0))
                    } else {
                        _mileage = ((response.data.data.currentMileage / 1000).toFixed(0))
                    }
                } else {
                    _mileage = 'N/A'
                }
                self.myCurrentMileage = _mileage

            }).catch((err) => {
                console.log(err);
            });

            this.getVehicleOperatorList(1)

        },
        methods: {
            getDateString(data) {
                return getDateString(data)
            },
            getDaysBetweenDate(data, time) {
                return getDaysBetweenDate(data, time)
            },
            getVehicleOperatorList(page) {
                let myVehicleId = this.$route.params.id;
                let myLink = '/api/v1/operationlog/listbyvehicleid?pageNo=' + page + '&vehicleId=' + myVehicleId;
                httpclient.get(myLink).then((res) => {
                    let myData = res.data.data.datas;
                    this.items = myData;
                    this.searchGoogleMap = myData;
                    // this.currentPage = res.data.data.pageNo;
                    this.perPage = res.data.data.pageSize;
                    this.totalPages = res.data.data.totalPages;
                    this.rows = res.data.data.rowCount;
                    let myArr = [];
                    myData.map((item) => {
                        myArr.push({
                            operationType: item.operationType,
                            operator: item.userName,
                            time: this.getDateString(item.createTime),
                            userId: item.userId
                        });
                    });
                    this.items = myArr;
                })
            },
            turnToPage(p) {
                this.getVehicleOperatorList(p ? p : 1);
            },
            showMapTip() {
                this.showMap = true;
            },
        }
    }
</script>

<style lang="scss">
    .vehicle-detail {
        .row {
            border-bottom: 1px solid #23282c;
            padding: .75rem 1.25rem;

            .img-box {
                width: 100%;
            }
        }
        .gaode-fullscreen{
            background: #ffffff; width: 30px;height: 30px;text-align: center;line-height: 30px;
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
</style>
