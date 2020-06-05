<template>
    <div class="animated fadeIn shop carbox">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t('m.dashboard.car_box') }}
                <div class="float-right">
                    <button class="btn btn-sm btn-primary " @click="showBindTip = true">
                        <i class="fa fa-wrench"></i>
                        {{ $t('m.vehicle.b_install') }}
                    </button>
                </div>
            </div>
            <b-row>
                <b-col class="col-5">
                    <b-form-group class="search-data">
                        <b-input-group>
                            <b-form-input type="text" :placeholder="$t('m.vehicle.search_mind')" v-model="searchText"></b-form-input>
                            <b-input-group-append>
                                <b-button variant="primary" @click="searchData()"><i class="fa fa-search"></i>{{ $t('m.vehicle.b_search') }}
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>

            <div class="content">
                <b-table class="mb-0 table-outline table-responsive-sm text-center" small striped responsive="sm" :items="table" hover :fields="tableFields">
                    <template slot="vin" slot-scope="data">
                        <span>{{ data.item.year }} {{ data.item.make }} {{ data.item.model }}</span>
                        <template v-if="data.item.vin">
                            <p class="hot-link" @click="$router.push('/inventory/vehicle/detail/' + data.item.id)">{{ data.item.vin }}</p>
                        </template>
                        <template v-else>
                            <p>N/A</p>
                        </template>
                    </template>
                    <template slot="type" slot-scope="data">
                        <template v-if="data.item.type == 1">
                            {{ $t('m.cloud.device_name_nonda') }}
                        </template>
                        <template v-else>
                            {{ $t('m.cloud.device_name_chelian') }}
                        </template>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <template v-if="data.item.vin && data.item.vin != 'N/A'">
                            <div class="btn btn-sm btn-primary placeholder" style="margin-right: 4px" v-b-tooltip.hover :title="$t('m.common.b_unpair')"  @click="checkVehicleStatus(data.item.deviceId,'unpair',data.item.vehicleId)">
                                <i class="fa fa-close"></i>
                            </div>
                        </template>
                        <template v-else>
                            <div class="btn btn-sm btn-primary placeholder" style="margin-right: 4px" v-b-tooltip.hover :title="$t('m.device.b_install')" @click="bindVehicle(data.item.imei)">
                                <i class="fa fa-wrench"></i>
                            </div>
                        </template>
                        <div class="btn btn-sm btn-danger btn-del" @click="checkVehicleStatus(data.item.deviceId,'delete',data.item.vehicleId)" v-b-tooltip.hover :title="$t('m.device.b_del')">
                            <i class="cui cui-trash" ></i>
                        </div>
                    </template>
                </b-table>
            </div>
            <b-row style="margin-top: 10px;">
                <b-col sm="4" lg="4">
                    <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">
                        {{ $t('m.common.show') }} {{10 * (currentPage - 1) + 1 }} {{ $t('m.common.to') }} {{currentPage === totalPages? total :currentPage * 10 }} {{ $t('m.common.of') }} {{total}} {{ $t('m.common.entries') }}
                    </div>
                </b-col>
                <b-col sm="8" lg="8">
                    <b-pagination align="right" :total-rows="total" v-model="currentPage" :per-page="10" @input=" changePage(currentPage)"></b-pagination>
                </b-col>
            </b-row>
        </b-card>
        <b-modal ref="my-modal" :title="$t('m.cloud.install_box')" :ok-disabled="vehicleType === '0' || curImei.length != 15 " :ok-title="$t('m.device.b_install')" :cancel-title="$t('m.tip.b_cancel')" v-model="showBindTip" @ok="bindDeviceData()">
            <p>{{ $t('m.cloud.box_tip1') }}</p>
            <p>{{ $t('m.cloud.box_tip2') }}</p>
            <p style="color: red;margin-bottom: 2px;">{{ $t('m.cloud.box_tip3') }}</p>
            <p style="color: red;">{{ $t('m.tip.check_imei') }}</p>
            <b-form-group class="vehicle-id">
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>{{$t('m.common.imei')}}</b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input v-model="curImei" aria-describedby="input-live-help input-live-feedback" id="input-live" trim="trim"  type="number" :class="!imeiIsVaild ? 'is-invalid' : ''"></b-form-input>
                    <b-form-invalid-feedback id="input-live-feedback" v-if="!imeiIsVaild">
                        {{$t('m.car_box.IMEI_verify')}}
                    </b-form-invalid-feedback>
                </b-input-group>
            </b-form-group>
            <b-form-group>
                <b-input-group>
                    <b-input-group-prepend>
                        <b-input-group-text>{{$t('m.cloud.vehicle_type')}}</b-input-group-text>
                    </b-input-group-prepend>
                    <select class="form-control" name="" v-model="vehicleType">
                        <option selected disabled value="0">{{ $t('m.cloud.vehicle_type_p') }}</option>
                        <option v-for="(item, index) in vehicleList" :key="index" :value="item.vehicleId">{{item.vehicleYear ? item.vehicleYear : 'N/A' }} {{ item.vehicleMake ? item.vehicleMake : 'N/A' }} {{ item.vehicleModel ? item.vehicleModel : 'N/A' }} {{ item.vehicleAlias ? "-" + item.vehicleAlias : 'N/A' }},VIN:{{ item.vin }} </option>
                    </select>
                </b-input-group>
            </b-form-group>
        </b-modal>
        <b-modal ref="unpair-model" :title="$t('m.common.b_unpair')" v-model="showUnpairTip" :ok-title="$t('m.tip.confirm')" :cancel-title="$t('m.tip.b_cancel')"  @ok="unpairVehicle()">
            <p>{{ unpairText }}</p>
        </b-modal>
        <b-modal ref="del-model" :title="$t('m.device.b_del')" v-model="showDelTip" :ok-title="$t('m.tip.confirm')" :cancel-title="$t('m.tip.b_cancel')"  @ok="delIdM()">
            <p>{{ deleteText }}</p>
        </b-modal>
    </div>
</template>

<style lang="scss" scoped>
    .carbox {
        .is-invalid {
            border: 1px solid red;
        }
    }
</style>

<script>
    import httpClient from "@/utils/httpclient";
    import { getDateString4 } from "@/utils/date";
    export default {
        name: "shopManager",
        inject: ["reload"],
        watch: {
            curImei (newV) {
                if (newV.length == 15) {
                    this.imeiIsVaild = true;
                } else {
                    this.imeiIsVaild = false;
                }
            }
        },
        data () {
            return {
                imeiIsVaild: true,
                showUnpairTip: false,
                searchText:'',
                unpairText:this.$t('m.car_box.unpair_tip_content'),
                deleteText:this.$t('m.car_box.del_tip_content'),
                showDelTip: false,
                tableFields: {
                    super_number: {
                        label: this.$t('m.common.super_number'),
                        class: "text-center"
                    },
                    imei: {
                        label: this.$t('m.common.imei'),
                        class: "text-center"
                    },
                    type: {
                        label: this.$t('m.cloud.device_type'),
                        class: "text-center"
                    },
                    vin: {
                        label: this.$t('m.common.vin2'),
                        class: "text-center"
                    },
                    updateTime: {
                        label: this.$t('m.cloud.last_update_time'),
                        class: "text-center"
                    },
                    actions: {
                        label: this.$t('m.vehicle.actions'),
                        class: "Actions"
                    }
                },
                curImei: '',
                table: null,
                showBindTip: false,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                totalPages:0,
                showTip: false,
                curName: '',
                vehicleList: [],
                vehicleType: '0',
                curDeviceId: '',
                curVehicleId: ''
            }
        },
        mounted() {
            this.initData(this.currentPage, this.pageSize);
            this.installTip();
        },
        methods: {
            checkVehicleStatus(id,type,vehicleId){//参数：第一个是deviceid,第二个是点击按钮类型，第三个是vehicleid
                httpClient.get('/api/v1/clouddrive/vehicle/checkdrivestatus?vehicleId='+vehicleId).then(res=>{
                    if(res.data.code === 200 && res.data.data.result){
                        if(type === 'unpair'){//解绑
                            this.unpairText = this.$t('m.car_box.unpair_tip_content');
                            this.curDeviceId = id;
                            this.showUnpairTip = true;
                        }else if(type === 'delete'){//删除
                            this.deleteText = this.$t('m.car_box.del_tip_content');
                            this.curDeviceId = id;
                            this.showDelTip = true;
                        }
                    }else{
                        if(type === 'unpair'){
                            this.unpairText = this.$t('m.car_box.unpair_text_warn');
                            this.curDeviceId = id;
                            this.showUnpairTip = true;
                        }else if(type === 'delete'){
                            this.deleteText = this.$t('m.car_box.delete_text_warn');
                            this.curDeviceId = id;
                            this.showDelTip = true;
                        }

                    }
                })
            },
            searchData(){
                this.initData(1)
            },
            initData(page) {
                httpClient.get(`/api/v1/clouddrive/device/box/pagelist?searchtext=${this.searchText}&pageNo=${page}&pageSize=${this.pageSize}`).then(response => {
                    if (response.data.code == 200 && response.data.data.datas) {
                        this.total = response.data.data.rowCount;
                        this.pageCount = response.data.data.totalPages;
                        this.filterData(response.data.data.datas ? response.data.data.datas : []);
                    }
                })
            },
            installTip() {
                httpClient.get('/api/v1/clouddrive/vehicle/unbindlist').then(res => {
                    if (res.data.code == 200) {
                        this.vehicleList = res.data.data;
                    }
                });
            },
            getDateString4(time) {
                return getDateString4(time);
            },
            bindVehicle(imei){
                this.curImei = imei;
                this.showBindTip = true;
            },
            unpairVehicle() {
                httpClient.post('/api/v1/clouddrive/device/box/unbind', {
                    deviceId: this.curDeviceId
                }).then(res => {
                    if (res.data.code == 200 && res.data.data.result) {
                        this.reload();
                    } else {
                        alert("解绑失败");
                    }
                });
            },
            delIdM() {
                httpClient.post('/api/v1/clouddrive/device/box/delete', {
                    deviceId: this.curDeviceId
                }).then(res => {
                    if (res.data.code == 200 && res.data.data.result) {
                        this.reload();
                    } else {
                        alert("删除失败");
                    }
                });
            },
            filterData(data) {
                this.table = data.map(item => {
                    return {
                        super_number: item.deviceServiceNum,
                        imei: item.deviceImei,
                        vin: item.vin,
                        id: item.vehicleId,
                        deviceType: item.deviceType,
                        deviceId: item.deviceId,
                        make: item.make ? item.make : 'N/A',
                        year: item.year ? item.year : 'N/A',
                        model: item.model ? item.model : 'N/A',
                        updateTime: item.updateTime ? this.getDateString4(item.updateTime) : 'N/A'
                    }
                });
            },
            bindDeviceData() {
                if (this.vehicleType && this.curImei) {
                    httpClient.post('/api/v1/clouddrive/device/box/bind', {
                        deviceImei: this.curImei,
                        vehicleId: this.vehicleType
                    }).then(res => {
                        if (res.data.code == 200 && res.data.data.result) {
                            this.reload();
                        } else {
                            alert(res.data.data.content);
                        }
                    });
                }
            },
            prevPage(){
                this.initData(this.currentPage > 1  ? this.currentPage - 1 : 1)
            },
            nextPage(){
                this.initData(this.currentPage >= this.pageCount  ? this.currentPage : this.currentPage + 1)
            },
            changePage(page) {
                this.initData(page);
            }
        }
    }
</script>
