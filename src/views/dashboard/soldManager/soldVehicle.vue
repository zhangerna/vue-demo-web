<template>
    <div class="animated fadeIn lots">
        <b-card>
            <div slot="header">
                {{ $t('m.dashboard.vehicles') }}
            </div>
            <div class="content">
                <b-table class="mb-0 table-outline" small striped responsive="sm" :items="table" hover :fields="tableFields" style="margin-top: 20px;">
                    <template slot="photo" slot-scope="data">
                        <img :src="data.item.photo + '?width=300&height=300'" style="object-fit: cover;border-radius: 4px;" width="100px" height="100px">
                    </template>
                    <template slot-scope="data" slot="info">
                        <div style="cursor: pointer;" @click="$router.push('/sold-manager/detail/' + data.item.id)" v-html="data.item.info"></div>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <div class="mapLocation"
                             @click="showMapTip(data.item.lat, data.item.lng)"><i
                                class="cui cui-location-pin btn btn-sm btn-secondary" style="color: white"
                                :class="data.item.lat || data.item.lng ? 'btn-success' : '' "></i></div>
                        <div class="btn btn-sm btn-info vehicledetail"
                             @click="$router.push('/sold-manager/detail/' + data.item.id)" style="color: white"><i class="fa fa-eye"></i></div>
                    </template>
                </b-table>
            </div>
            <b-row v-if="total > 0" style="margin-top: 2%">
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
            <myMap :map="map"></myMap>
        </b-modal>
    </div>
</template>

<style lang="scss">
    .card {
        width: 100%;
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
            .add-lot {
                float: right;
            }
        }
        th, td {
            height: 44px;
            line-height: 44px;
        }
    }
</style>

<script>
    import httpClient from "@/utils/httpclient";
    import myMap from '@/components/map';
    export default {
        name: 'lots',
        inject: ['reload'],
        components: {
            myMap,
        },
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                table: null,
                curDel: null,
                show: false,
                btnGroup: {
                    btnFirst: this.$t('m.tip.b_cancel'),
                    btnSecond: this.$t('m.tip.b_ok')
                },
                tableFields: {
                    photo: {
                        label: this.$t('m.vehicle.photo'),
                        class: "text-center"
                    },
                    info: {
                        label: this.$t('m.sold_vehicle.info'),
                        class: "text-center"
                    },
                    mileage: {
                        label: this.$t('m.sold_vehicle.mileage'),
                        class: "text-center"
                    },
                    days: {
                        label: this.$t('m.sold_vehicle.sold_days'),
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
                httpClient.get(`/api/v1/saledvehicle/list?pageNo=${page}`).then(response => {
                    if (response.data.data && response.data.code == 200) {
                        this.total = response.data.data ? response.data.data.rowCount : 0;
                        this.filterData(response.data.data);
                        this.totalPages = response.data.data.totalPages;
                    }
                })
            },
            filterData(data){
                this.table = data.datas.map(item => {
                    let year = item.vehicleYear ? item.vehicleYear : 'N/A';
                    let make = item.vehicleMake ? item.vehicleMake : 'N/A';
                    let model = item.vehicleModel ? item.vehicleModel : 'N/A';
                    let alias = item.alias ? "-" + item.alias : '';
                    let color = item.color ? item.color : 'N/A';
                    let trim = item.trim ? item.trim : 'N/A';
                    let stock = item.stockNumber ? item.stockNumber : 'N/A';
                    let mile = "N/A";
                    if (this.$i18n.locale === 'en-US') {
                        mile = (item.odbmeter * 0.0006214).toFixed(0)
                    } else {
                        mile = (item.odbmeter / 1000).toFixed(0)
                    }
                    return {
                        photo: item.vehicleUrl ? item.vehicleUrl : require("@/assets/pages-img/placeholder.svg"),
                        info: `<p style="margin-bottom: 0px;line-height: 32px;"><span style="color:rgb(32, 168, 216);font-weight: bolder; ">${year} ${make} ${model} ${alias}</span></p><p style="line-height: 14px;margin-bottom: 6px;">${color}、${trim}</p> <p style="line-height: 14px;margin-bottom: 6px;"> ${stock}</p> `,
                        stock: item.stockNumber,
                        mileage: mile,
                        lat: item.lastLocationLat,
                        lng: item.lastLocationLng,
                        days: item.saledDays ? item.saledDays : 0,
                        id: item.id,
                    }
                });
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
            showMapTip(lat, lng) {
                if (lat) {
                    this.map = {
                        lat: lat,
                        lng: lng,
                        area: [],
                        info: ""
                    };
                    this.showMap = true;
                }
            },
        }
    }
</script>
