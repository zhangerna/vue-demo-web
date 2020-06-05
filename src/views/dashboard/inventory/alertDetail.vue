<template>
    <div class="animated fadeIn alert-detail">
        <b-card>
            <div slot="header">
                {{ $t('m.alert_detail.title') }}
            </div>
            <div class="content">
                <b-list-group>
                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                        <div class="col-sm-6">
                            {{ $t('m.alert.type') }}
                        </div>
                        <div class="col-sm-6">
                            {{ data.alertTypeName }}
                        </div>
                    </div>
                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                        <div class="col-sm-6">
                            {{ $t('m.alert.desc') }}
                        </div>
                        <div class="col-sm-6">
                            {{ data.description }}
                        </div>
                    </div>
                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                        <div class="col-sm-6">
                            {{ $t('m.alert.time') }}
                        </div>
                        <div class="col-sm-6">
                            {{ filterTime(data.createTime) }}
                        </div>
                    </div>

                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                        <div class="col-sm-6">
                            {{ $t('m.alert.status') }}
                        </div>
                        <div class="col-sm-6">
                            <template v-if="data.alertStatus == 1">
                                <span class="badge badge-pill badge-success">{{ data.alertMarkAction == 'Read' ?  $t('m.alert.read_status')  : $t('m.alert.b_make')}}</span>
                            </template>
                            <template v-else>
                                <span class="badge badge-pill badge-danger">{{ data.alertMarkAction == 'Read' ? $t('m.alert.unread_status') : $t('m.alert.unsolved_status')}}</span>
                            </template>
                        </div>
                    </div>

                    <div v-if="data.alertStatus === 1" class="row list-group-item d-flex justify-content-between align-items-center">
                        <div class="col-sm-6">
                            {{ $t('m.alert.make_by') }}
                        </div>
                        <div class="col-sm-6">
                            {{ data.markedBy ? data.markedBy : 'N/A' }}
                        </div>
                    </div>

                    <div v-if="data.alertStatus === 1" class="row list-group-item d-flex justify-content-between align-items-center">
                        <div class="col-sm-6">
                            {{ $t('m.alert.make_at') }}
                        </div>
                        <div class="col-sm-6">
                            {{ markedAt }}
                        </div>
                    </div>

                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                        <div class="col-sm-6">
                            {{ $t('m.common.stock_num2') }}
                        </div>
                        <div class="col-sm-6">
                            {{ data.stockNum ? data.stockNum : 'N/A' }}
                        </div>
                    </div>
                    <div  class="row list-group-item d-flex justify-content-between align-items-center">
                        <div class="col-sm-6">
                            {{ $t('m.vehicle.vehicle') }}
                        </div>
                        <div class="col-sm-6">
                            <span class="btn btn-sm btn-ghost-info" @click="showM">
                                <i class="cui cui-location-pin"></i>
                            </span>
                            <template v-if="!data.year && !data.make && !data.model">
                                N/A
                            </template>
                            <template v-else>
                                <span class="map-span" @click="$router.push('/inventory/vehicle/detail/' + data.vehicleId)">{{ data.year ? data.year : 'N/A' }} {{ data.make ? data.make : 'N/A' }} {{ data.model ? data.model : 'N/A' }}</span>
                            </template>
                        </div>
                    </div>
                </b-list-group>
                <div class="butt-group">
                    <template v-if="data.alertStatus == 1">
                        <b-button class="btn mt-2 btn-secondary" disabled>
                            {{ $t('m.alert.solved_status') }}
                        </b-button>
                    </template>
                    <template v-else>
                        <b-button class="btn btn-sm mt-2 btn-success" @click="updateStatus">
                            {{ $t('m.alert.solved_status') }}
                        </b-button>
                    </template>
                </div>
            </div>
        </b-card>
        <b-modal ref="my-modal" :title="map.info" v-model="showMap" @ok="showMap = false">
            <myMap :map="map"></myMap>
        </b-modal>
        <model
               :show="show"
               :title="'Warn'"
               :content="updateInfo"
               :buttonText="btnGroup"
               @closeRemindBox="show = false"
        ></model>
    </div>
</template>

<style lang="scss" scoped>
    .alert-detail {
        .map-span {
            cursor: pointer;
            color: #63c2de
        }
        .content {
            max-width: 900px;
            margin: 4% auto;
            .value {
                text-align: right;
            }
            .row {
                margin: 0px;
                border-top: 1px solid #cccccc;
                .col-sm-6 {
                    padding-left: 0px!important;
                }
            }
            .butt-group {
                margin-top: 1%;
            }
        }
        @media (min-width: 576px) {
            .modal-dialog {
                max-width: 80%;
            }
        }
    }
</style>

<script>
    import httpClient from "@/utils/httpclient";
    import { getDateString } from "@/utils/date";
    import myMap from "@/components/map";
    import model from "@/components/model"

    export default {
        name: "alertDetail",
        components: {
            myMap,
            model
        },
        inject: ['reload'],
        data() {
            return {
                data: {},
                showMap: false,
                map:{},
                show: false,
                updateInfo: '',
                btnGroup: {btnFirst:this.$t('m.tip.b_cancel'), btnSecond: this.$t('m.tip.b_ok')},
                markedAt:'',
            }
        },
        mounted() {
            httpClient.post('/api/v1/alert/detail',{
                alertId: this.$route.params.id
            }).then(response => {
                this.data = response.data.data;
                this.markedAt = response.data.data.markedAt? getDateString(response.data.data.markedAt) : 'N/A';
                let year = this.data.year ? this.data.year : 'N/A';
                let make = this.data.make ? this.data.make : 'N/A';
                let model = this.data.model ? this.data.model : 'N/A';
                let info = (year == 'N/A' && make == 'N/A' && model == 'N/A') ? 'N/A' : year + ' ' + make + ' ' + model;
                this.map = {
                    lat: this.data.lat ? this.data.lat : 0,
                    lng: this.data.lng ? this.data.lng : 0,
                    area: this.data.areaCoordinates ? this.data.areaCoordinates : [],
                    vehicleInfo: info
                }
            })
        },
        methods: {
            filterTime (time) {
                return getDateString(time);
            },
            showM() {
                if (this.map.lat && this.map.lng) {
                    this.showMap = true;
                }
            },
            updateStatus() {
                httpClient.post('/api/v1/alert/update/status', {
                    alertId: this.data.id
                }).then(response => {
                    if (response.data.code == 200) {
                        this.reload();
                    } else {
                        this.reload();
                    }
                }).catch(error => {
                })
            }
        }
    }
</script>

