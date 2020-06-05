<template>
    <div class="animated fadeIn device">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t('m.dashboard.devices') }}
                <span class="header-right float-right">
                    <button class="btn btn-sm btn-primary" @click="$router.push('/inventory/vehicle/bind')">
                        <i class="fa fa-wrench"></i>
                        {{ $t('m.vehicle.b_install') }}
                    </button>
                </span>
            </div>

            <b-row>
                <b-col sm="6">
                    <b-form-group label-for="elementsAppendButton" class="search-group">
                        <b-input-group>
                            <b-form-input type="text" :placeholder=" $t('m.vehicle.search_mind') " v-model="searchText"></b-form-input>
                            <b-input-group-append>
                                <b-button variant="primary" @click="searchResult"><i class="fa fa-search"></i>{{ $t('m.vehicle.b_search') }}
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>

            <div class="content">
                <b-table class="mb-0 table-outline table-responsive-sm" small striped responsive="sm" :items="table" hover :fields="tableFields">
                    <template slot="deviceNumber" slot-scope="data">
                        {{ data.item.deviceNumber }}
                    </template>
                    <template slot="vin" slot-scope="data">
                        <span v-if="data.item.vin != 'N/A'" class="vin-class" @click="$router.push('/inventory/vehicle/detail/' + data.item.id)">{{ data.item.vin }}</span>
                        <span v-else class="vin-class">{{ data.item.vin }}</span>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <template v-if="data.item.vin != 'N/A'">
                            <div class="btn btn-sm btn-primary placeholder" v-b-tooltip.hover :title="$t('m.common.b_unpair')" @click="unpairVehicle(data.item.vin, data.item.imei)">
                                <i class="fa fa-close"></i>
                            </div>
                        </template>
                        <template v-else>
                            <div class="btn btn-sm btn-primary placeholder" v-b-tooltip.hover :title="$t('m.device.b_install')" @click="$router.push('/inventory/vehicle/bind')">
                                <i class="fa fa-wrench"></i>
                            </div>
                        </template>
                        <div class="btn btn-sm btn-danger btn-del" v-b-tooltip.hover :title="$t('m.device.b_del')" @click="delIdM(data.item.deviceId)">
                            <i class="cui cui-trash" ></i>
                        </div>
                    </template>
                </b-table>
            </div>
        </b-card>
        <b-row>
            <b-col sm="4" lg="4">
                <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">
                    {{ $t('m.common.show') }} {{10 * (currentPage - 1) + 1 }} {{ $t('m.common.to') }} {{currentPage === totalPages? total :currentPage * 10 }} {{ $t('m.common.of') }} {{total}} {{ $t('m.common.entries') }}
                </div>
            </b-col>
            <b-col sm="8" lg="8">
                <b-pagination align="right" :total-rows="total" v-model="currentPage" :per-page="10" @input=" changePage(currentPage)"></b-pagination>
            </b-col>
        </b-row>
        <model
                :show="show"
                :title="title"
                :content="content"
                :buttonText="btnGroup"
                @closeRemindBox="closeBox"
            ></model>
    </div>
</template>

<script>
    import httpClient from "@/utils/httpclient";
    import model from "@/components/model";
    import {getDateString} from "@/utils/date";
    export default {
        name: "device",
        inject: ['reload'],
        components: {
            model
        },
        data(){
            return {
                tableFields: {
                    deviceNumber: {
                        label: this.$t('m.common.device_number'),
                        class: "text-center"
                    },
                    imei: {
                        label: this.$t('m.common.imei'),
                        class: "text-center"
                    },
                    deviceType: {
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
                        class: "text-center"
                    }
                },
                table: null,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                totalPages:0,
                show: false,
                unpairVin: '',
                title: '',
                content: '',
                btnGroup: {btnFirst: this.$t('m.tip.b_cancel'), btnSecond: this.$t('m.tip.b_ok')},
                delId: '',
                currentOpa: false,
                searchText:''

            }
        },
        mounted() {
            this.initData(this.currentPage, this.pageSize);
        },
        methods: {
            initData(page) {
                httpClient.post(`/api/v1/vehicle/listBindDevice?pageNo=${page}&pageSize=${this.pageSize}`).
                then(response => {
                    this.total = response.data.data.rowCount;
                    this.filterData(response.data.data);
                    this.totalPages = response.data.data.totalPages
                })
            },
            filterData(data) {
                this.table = data.datas.map((item) => {
                    return {
                        deviceNumber: item.deviceServiceNum,
                        imei: item.deviceMac,
                        vin: item.vin ? item.vin : 'N/A',
                        id: item.vehicleId,
                        deviceType: item.deviceType ? ([1].includes(item.deviceType) ? this.$t('m.cloud.device_name_nonda') : ( [2].includes(item.deviceType) ?  this.$t('m.cloud.device_name_chelian') : this.$t('m.common.chelian_device') ) ) : 'N/A',
                        deviceId: item.deviceId,
                        updateTime:getDateString(item.updateTime)
                    }
                });

            },
            changePage(page) {
                this.initData(page, this.pageSize);
            },
            unpairVehicle(id, imei){
                this.unpairVin = {
                    vin: id,
                    deviceMac: imei
                };
                this.currentOpa = 'unpair';
                this.show = true;
                this.title = this.$t('m.tip.confirm');
                this.content = this.$t('m.tip.unpair');
            },
            unbindVIn() {
                httpClient.post('/api/v1/vehicle/unbind/device', {
                    deviceMac: this.unpairVin.deviceMac,
                    vin: this.unpairVin.vin
                }).then(response => {
                    if (response.data.code == 200) {
                        this.reload();
                    } else {
                        this.show = true;
                        this.title = this.$t('m.tip.error');
                        this.content = this.$t('m.tip.unbind_err');
                        this.btnGroup.btnSecond = '';
                    }
                })
            },
            delDevice() {
                httpClient.post('/api/v1/device/delete', {
                    deviceId: this.delId
                }).then(response => {
                    if (response.data.code == 200) {
                        this.reload();
                    } else {
                        this.show = true;
                        this.title = this.$t('m.tip.error');
                        this.content = this.$t('m.tip.delete_err');
                        this.btnGroup.btnSecond = '';
                    }
                })
            },
            closeBox(type) {
                if (type) {
                    this.currentOpa == "del" ? this.delDevice() : this.unbindVIn();
                } else {
                    this.show = false;
                }
            },
            delIdM(id) {
                this.delId = id;
                this.currentOpa = 'del';
                this.show = true;
                this.title = this.$t('m.tip.warn');
                this.content = this.$t('m.tip.del_device');
            },
            searchResult(){
                httpClient.post(`/api/v1/vehicle/listBindDevice`,{imei:this.searchText}).then(res=>{
                    this.total = res.data.data.rowCount;
                    this.filterData(res.data.data);
                    this.totalPages = res.data.data.totalPages;
                })
            }
        }
    }
</script>


<style lang="scss" scoped>
    .device {
        .link-bind {
            float: right;
        }
        td {
            height: 44px;
            line-height: 44px;
        }
        .vin-class {
            color: #20a8d8;
            cursor: pointer;
            &:hover{
                text-decoration: underline;
            }
        }
        .placeholder {
            margin-right: 4px;
        }
    }
</style>
