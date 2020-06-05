<template>
    <div class="animated fadeIn lots">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t('m.dashboard.lots') }}
                <span class="float-right">
                      <button class="btn btn-sm btn-primary" @click="$router.push('/inventory/lots/add')">
                        <i class="fa fa-plus-square"></i>
                        {{ $t('m.lots.b_add') }}
                    </button>
                </span>
            </div>
            <div class="content">
                <b-table class="mb-0 table-outline my-table" small striped responsive="sm" :items="table" hover :fields="tableFields">
                    <template slot="parkingNum" slot-scope="data">
                        {{ data.item.parkingNum ? data.item.parkingNum : 'N/A' }}
                    </template>
                    <template slot="address" slot-scope="data">
                        {{ data.item.country ? data.item.country : 'N/A' }},{{ data.item.state ? data.item.state : 'N/A' }},{{ data.item.city ? data.item.city : 'N/A' }},{{ data.item.area ? data.item.area : 'N/A' }},{{ data.item.address ? data.item.address : 'N/A' }}
                    </template>
                    <template slot="vehicles" slot-scope="data">
                        <span class="btn btn-sm btn-block btn-outline-success" @click="linkVehicles(data.item.id)">{{ data.item.vehicles }}</span>
                    </template>
                    <template slot="battery" slot-scope="data">
                        <span class="btn btn-sm btn-block btn-outline-danger" @click="linkBattery(data.item.id)">{{ data.item.battery }}</span>
                    </template>
                    <template slot="offline" slot-scope="data">
                        <span class="btn btn-sm btn-block btn-outline-secondary" @click="linkSecondary(data.item.id)">{{ data.item.offline }}</span>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <button v-b-tooltip.hover :title="$t('m.common.position_detail')" class="btn btn-sm btn-success m-1 cursor" @click="mapInfo(data.item.id)">
                            <i class="cui cui-location-pin"></i>
                        </button>
                        <button v-b-tooltip.hover :title="$t('m.tooltip.check_detail')" class="btn btn-sm btn-info cursor" @click="$router.push('/inventory/lots/detail/' + data.item.id)">
                            <i class="fa fa-eye"></i>
                        </button>
                        <button v-b-tooltip.hover :title="$t('m.common.edit')" class="btn btn-sm btn-info  m-1" @click="$router.push('/inventory/lots/edit/' + data.item.id)">
                            <i class="fa fa-edit"></i>
                        </button>
                        <button v-b-tooltip.hover :title="$t('m.detail_shop.del_b')" class="btn btn-sm btn-danger btn-del" @click="delId(data.item.id)">
                            <i class="cui cui-trash"></i>
                        </button>
                    </template>
                </b-table>
            </div>
            <b-row v-if="total > 0" class="margin2">
                <b-col sm="4" lg="4">
                    <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">
                        {{ $t('m.common.show') }} {{10 * (currentPage - 1) + 1 }} {{ $t('m.common.to') }} {{currentPage === totalPages? total :currentPage * 10 }} {{ $t('m.common.of') }} {{total}} {{ $t('m.common.entries') }}
                    </div>
                </b-col>
                <b-col sm="8" lg="8">
                    <b-pagination align="right" :total-rows="total" v-model="currentPage" :per-page="pageSize" @input=" changePage(currentPage)"></b-pagination>
                </b-col>
            </b-row>
        </b-card>

        <b-modal ref="my-modal" :title="tipTitle" :ok-title="$t('m.tip.b_ok')" v-model="showMap" @ok="showMap = false" class="show-map" ok-only>
            <myMap :map="map" type="model"></myMap>
        </b-modal>
        <model
               :show="show"
               :title="$t('m.vehicle.actions_remind')"
               :content="$t('m.tip.confirm_del_lot')"
               :buttonText="btnGroup"
               @closeRemindBox="hideTip"
        ></model>
        <model
               :show="show2"
               :title="$t('m.vehicle.actions_remind')"
               :content="$t('m.vehicle.file_remind')"
               :buttonText="btnGroup2"
               @closeRemindBox="hideTip2"
        ></model>
    </div>
</template>

<script>
    import httpClient from "@/utils/httpclient";
    import myMap from '@/components/map';
    import model from "@/components/model";
    export default {
        name: 'lots',
        inject: ['reload'],
        components: {
            myMap,
            model,
        },
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                table: null,
                curDel: null,
                show: false,
                show2: false,
                btnGroup: {
                    btnFirst: this.$t('m.tip.b_cancel'),
                    btnSecond: this.$t('m.tip.confirm')
                },
                btnGroup2: {
                    btnFirst: '',
                    btnSecond: this.$t('m.tip.b_ok')
                },
                tableFields: {
                    parkingNum: {
                        label: this.$t('m.lots.parkingNum'),
                        class: "text-center"
                    },
                    name: {
                        label: this.$t('m.lots.name'),
                        class: "text-center"
                    },
                    address: {
                        label: this.$t('m.lots.address'),
                        class: "text-center"
                    },
                    storeName: {
                        label: this.$t('m.lots.store_name'),
                        class: "text-center"
                    },
                    dealership: {
                        label: this.$t('m.common.dealership'),
                        class: "text-center"
                    },
                    vehicles: {
                        label: this.$t('m.lots.all_vehicle'),
                        class: "text-center"
                    },
                    battery: {
                        label: this.$t('m.index.low'),
                        class: "text-center"
                    },
                    offline: {
                        label: this.$t('m.index.offline'),
                        class: "text-center"
                    },
                    actions: {
                        label: this.$t('m.vehicle.actions'),
                        class: "text-center"
                    }
                },
                total: 0,
                totalPages:0,
                tipTitle: '',
                showMap: false,
                map: {}

            }
        },
        mounted() {
            this.initData(this.currentPage);
        },
        methods: {
            initData(page) {
                httpClient.get(`/api/v1/lot/page?pageNo=${page}`).then(response => {
                    if (response.data.data) {
                        this.total = response.data.data ? response.data.data.rowCount : 0;
                        this.filterData(response.data.data);
                        this.totalPages = response.data.data.totalPages;
                    }
                })
            },
            filterData(data){
                this.table = data.datas.map(item => {
                    return {
                        name: item.parkingName,
                        address: item.address,
                        storeName: item.storeName,
                        dealership: item.tenantName,
                        vehicles: item.vehicleFilter.num,
                        battery: item.lowBatteryFilter.num,
                        offline: item.offLineFilter.num,
                        country: item.parkingCountryName,
                        state: item.parkingStateName,
                        city: item.parkingCityName,
                        area: item.parkingAreaName,
                        id: item.id,
                        parkingNum: item.parkingServiceNum
                    }
                });
            },
            delId(id) {
                this.curDel = id;
                this.show = true;
            },
            hideTip(type) {
                if (type) {
                    httpClient.post('/api/v1/lot/delete', {
                        id: this.curDel
                    }).then(() => {
                        window.location.reload();
                    }).catch(()=>{
                        this.show = false;
                        this.show2 = true;
                    })
                   
                }else {
                    this.show = false;
                }
                // this.show = false;
            },
            hideTip2 () {
                this.show2 = false;
            },
            linkVehicles(id) {
                let filter = `[{"key":"parking","value":["${id}"]}]`;
                this.$router.push({name: 'VehicleList', query: {filters: filter}});
            },
            linkBattery(id) {
                this.$router.push({name: 'VehicleList', query: {
                    filters: `[{"key":"parking","value":["${id}"]},{"key":"battery","value":["1"]}]`
                }});
            },
            linkSecondary(id) {
                this.$router.push({name: 'VehicleList', query: {
                    filters: `[{"key":"parking","value":["${id}"]},{"key":"online","value":["2"]}]`
                }});
            },
            prevPage(){
                this.initData(this.currentPage > 1  ? this.currentPage - 1 : 1)
            },
            nextPage(){
                this.initData(this.currentPage >= this.pageCount  ? this.currentPage : this.currentPage + 1)
            },
            changePage(page) {
                this.initData(page);
            },
            getVehicleList(id, area, centerCoor, packingName) {
                httpClient.get('/api/v1/inlotvehiclelist', {
                    params: {
                        parkingId: id
                    }
                }).then(response => {
                    let latlng = centerCoor.split(" ");
                    this.map = {
                        lat: Number(latlng[1]),
                        lng: Number(latlng[0]),
                        area: area,
                        vehicleInfo: response.data.data,
                        showMult: true
                    };
                    this.tipTitle = packingName;
                    this.showMap = true;
                })
            },
            mapInfo(id) {
                httpClient.get("/api/v1/lot/detail", {
                    params: {
                        id: id
                    }
                }).then(response => {
                    let data = response.data.data;
                    this.getVehicleList(id, data.areaCoordinate, data.centerCoordinate, data.parkingName);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .margin2 {
        margin-top: 2%;
    }
    .card {
        width: 100%;
    }
    .my-table{
        margin-bottom: 0;
    }
    .show-map {
        .modal-dialog {
            max-width: 80%;
        }
    }
    .lots {
        .card-header span {
            margin-left: 10px;
        }
        .card-header {

        }
        th, td {
            height: 44px;
            line-height: 20px;
        }
    }
</style>
