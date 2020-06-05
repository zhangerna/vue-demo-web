<template>
    <div class="animated fadeIn shop">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t('m.dashboard.appoint_order') }}
            </div>
            <div class="content">
                <b-form-group class="search-data">
                    <b-input-group>
                        <b-form-input type="text" :placeholder="$t('m.test_order.placeholder')" v-model="searchText"></b-form-input>
                        <b-input-group-append>
                            <b-button variant="primary" @click="searchData()"><i class="fa fa-search"></i>{{ $t('m.vehicle.b_search') }}
                            </b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>

                <div class="select-status">
                    <p>{{$t('m.cloud.appoint_order_status')}}</p>
                    <select class="search-input form-control" v-model="curStatus" @change="searchData()">
                        <option value="all" selected>{{ $t('m.cloud.all_status') }}</option>
                        <option v-for="(item, key) in statusList" :key="key" :value="item.orderCode">{{ item.content }}</option>
                    </select>
                </div>

                <b-table class="mb-0 table-outline table-responsive-sm" small striped responsive="sm" :items="table" hover :fields="tableFields">
                    <template slot="orderNo" slot-scope="data">
                        <span>{{ data.item.orderId }}</span>
                    </template>
                    <template slot="userInfo" slot-scope="data">
                        <div >
                            <p class="name-link">
                                <router-link target="_blank" :to="{path:'/test-drive/test-user/detail/'+ data.item.userId}">{{ data.item.username }}</router-link>
                            </p>
                            <p class="phone-link name-link">
                                <router-link target="_blank" :to="{path:'/test-drive/test-user/detail/'+ data.item.userId}">{{ data.item.phone }}</router-link>
                            </p>
                        </div>
                    </template>
                    <template slot="vehicleInfo" slot-scope="data">
                        <p class="name-link">
                            <router-link target="_blank" :to="{path:'/test-drive/test-vehicle/detail/' + data.item.vehicleId}">
                                {{ data.item.year ? data.item.year : 'N/A' }} {{ data.item.make ? data.item.make : 'N/A' }} {{ data.item.model ? data.item.model : 'N/A' }}
                                {{ data.item.alias ? '-' + data.item.alias : '' }}
                            </router-link>
                        </p>
                        <p class="margin-b-1">{{ data.item.color ? data.item.color : 'N/A' }}, {{ data.item.trim ? data.item.trim : 'N/A' }}</p>
                        <p class="margin-b-1">{{ data.item.stock ? data.item.stock : 'N/A' }}
                            <template v-if="data.item.plat">
                                <span class="plat">{{data.item.plat}}</span>
                            </template>
                        </p>
                    </template>
                    <template slot="testInfo" slot-scope="data">
                        <p class="name-link font-weight-bold" >
                            <router-link target="_blank" :to="{path:'/test-drive/test-point/detail/' + data.item.parkingId}">
                                {{ data.item.testInfo }}
                            </router-link>
                        </p>
                    </template>

                    <template slot="pointTimeWeek" slot-scope="data">
                        <p v-html="data.item.pointTimeWeek"></p>
                    </template>
                    <template slot="status" slot-scope="data">
                        <template v-if="data.item.status == 0">
                            <span class="badge badge-secondary text-black">
                                    {{ $t('m.cloud.wait_accomplish_order') }}
                            </span>
                        </template>
                        <template v-if="data.item.status == 10">
                            <span class="badge badge-info text-white">
                                {{ $t('m.cloud.wait_pick_up') }}
                            </span>

                        </template>
                        <template v-if="data.item.status == 20">
                            <span class="badge badge-success text-white">
                                {{ $t('m.cloud.wait_return') }}
                            </span>
                        </template>
                        <template v-if="data.item.status == 30">
                            <span class="badge badge-warning text-white">
                                <span class="margin-b-1">{{ $t('m.cloud.returned_vehicle') }}</span>
                            </span>
                            <p class="vehicle-accept" @click="ShowAlert(data.item.id)">{{ $t('m.cloud.vehicle_accept') }}</p>
                        </template>
                        <template v-if="data.item.status == 40">
                            <span class="badge badge-secondary text-black">{{ $t('m.cloud.finished') }}</span>
                        </template>
                        <template v-if="data.item.status == 50">
                            <span class="badge badge-secondary text-black">{{ $t('m.cloud.canceled') }}</span>
                        </template>
                    </template>
                    <template slot="question" slot-scope="data">
                        <template v-if="data.item.question">
                            <span class="badge badge-success text-white">{{$t('m.cloud.complete')}}</span>
                        </template>
                        <template v-else>
                            <span class="badge badge-secondary text-black">{{ $t('m.cloud.no_complete')  }}</span>
                        </template>
                    </template>

                    <template slot="actions" slot-scope="data">
                        <div v-b-tooltip.hover :title="$t('m.tooltip.check_detail')" class="btn btn-sm btn-info color-white margin-r-4"
                             @click="$router.push('/test-drive/reservation-order/detail/' + data.item.id)"><i class="fa fa-eye"></i></div>
                        <div v-b-tooltip.hover :title="$t('m.common.cancel_order')" v-if="data.item.status === 10 || data.item.status === 0" class="btn btn-sm btn-danger color-white"
                             @click="openOrderTip(data.item.id, data.item.orderId)"><i class="cui cui-trash"></i></div>
                        <div v-b-tooltip.hover :title="$t('m.cloud.change_status')" v-if="data.item.status == 10 || data.item.status == 20 || data.item.status === 20"  class="btn btn-sm btn-info color-white margin-l-4"
                             @click="$router.push('/test-drive/reservation-order/verify/' + data.item.id)"><i class="fa fa-search-plus"></i></div>
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
        <b-modal ref="my-modal-6" v-model="cancelTip" :cancel-title="$t('m.cloud.cancel_think_again')" :ok-title="$t('m.tip.confirm')"
                 @ok="cancelOrder()"  class="select-store" >
            <template slot="modal-title">
                {{ $t('m.cloud.can_order') }}
            </template>
            <div class="text-left">
                {{ $t('m.cloud.can_order_content') }}
            </div>
        </b-modal>

        <b-modal ref="my-modal-6" v-model="tipStatus" :ok-title="$t('m.tip.b_ok')"
                   class="select-store" ok-only>
            <template slot="modal-title">
                {{ canStatus.title }}
            </template>
            <div class="text-left">
                {{ canStatus.content }}
            </div>
        </b-modal>

        <b-modal :title="$t('m.cloud.vehicle_accept')" ref="my-modal-verify-car" v-model="verifyCarStatuss" :ok-title="$t('m.tip.confirm')" :cancel-title="$t('m.tip.b_cancel')"  @ok="acceptVehicle()">
            <p class="text-center" style="float:left;">{{verifyCarText}}</p>
        </b-modal>
    </div>
</template>

<script>
    import httpClient from "@/utils/httpclient";
    import {getDateString,getDateStringWeek} from "@/utils/date";
    export default {
        name: "shopManager",
        inject: ['reload'],
        data () {
            return {
                tableFields: {

                    orderNo: {
                        label: this.$t('m.report.orderNo'),
                        class: "text-center"
                    },
                    userInfo: {
                        label: this.$t('m.cloud.user_info'),
                        class: "text-center"
                    },
                    vehicleInfo: {
                        label: this.$t('m.cloud.vehicle_info'),
                        class: "text-center"
                    },
                    testInfo: {
                        label: this.$t('m.dashboard.test_point'),
                        class: "text-center"
                    },
                    pointTimeWeek: {
                        label: this.$t('m.cloud.rese_test_drive'),
                        class: "text-center"
                    },
                    status: {
                        label: this.$t('m.cloud.status'),
                        class: "text-center"
                    },
                    question: {
                        label: this.$t('m.cloud.check_question'),
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
                searchText: '',
                totalPages:0,
                showTip: false,
                curName: '',
                statusList: [],
                cancelTip: false,
                curOrder: null,
                curOrderNum: null,
                tipStatus: false,
                currentId: '',
                verifyCarStatuss: false,
                verifyCarText:this.$t('m.cloud.verify_car_list'),
                canStatus: {
                    title: "",
                    content: ""
                },
                curStatus: "all"
            }
        },
        mounted() {
            httpClient.get('/api/v1/clouddrive/order/orderstatuslist').then(res => {
                if (res.data.code == 200) {
                    this.statusList = res.data.data.statusList;
                    this.statusList.map(item => {
                        switch (item.orderCode) {
                            case 0:
                                item['content'] = this.$t('m.cloud.wait_accomplish_order');
                                break;
                            case 10:
                                item['content'] = this.$t('m.cloud.wait_pick_up');
                                break;
                            case 20:
                                item['content'] = this.$t('m.cloud.wait_return');
                                break;
                            case 30:
                                item['content'] = this.$t('m.cloud.returned_vehicle');
                                break;
                            case 40:
                                item['content'] = this.$t('m.cloud.finished');
                                break;
                            case 50:
                                item['content'] = this.$t('m.cloud.canceled');
                                break;
                        }
                    });
                }
            });
            this.initData(this.currentPage);
        },
        methods: {
            searchData() {
                this.currentPage = 1;
                this.initData(1);
            },
            initData(page) {
                let orderStatus = this.curStatus == 'all' ? '' : `&orderStatus=${this.curStatus}`;
                httpClient.get(`/api/v1/clouddrive/order/pagelist?searchtext=${this.searchText}&pageNo=${page}&pageSize=${this.pageSize}${orderStatus}`).then(response => {
                    if (response.data.code == 200) {
                        this.total = response.data.data.rowCount;
                        this.data = response.data.data;
                        this.pageCount = response.data.data.totalPages;
                        this.filterData();
                    }
                });
            },
            acceptVehicle() {
                httpClient.get(`/api/v1/clouddrive/order/check?orderId=${this.currentId}`).then(res => {
                    if (res.data.code == 200 && res.data.data.result) {
                        window.location.reload();
                    } else {
                        alert("车辆异常");
                    }
                });
            },
            filterData() {
                this.table = this.data.datas.map((item) => {
                    return {
                        orderId: item.orderServiceNum,
                        orderDetailId:item.orderId,
                        id: item.orderId,
                        username: item.userName,
                        phone: item.phone,
                        year: item.vehicleYear,
                        make: item.vehicleMake,
                        model: item.vehicleModel,
                        color: item.vehicleColor,
                        alias: item.vehicleAlias,
                        trim: item.vehicleTrim,
                        plat: item.vehiclePlate,
                        vehicleId: item.vehicleId,
                        parkingId:item.parkingId,
                        userId: item.userId,
                        num: item.vehiclePlate, // 库存编号
                        testInfo: item.parkingName,
                        pointTime: getDateString(item.appointmentStartTime) + "~" + getDateString(item.appointmentEndTime).split("  ")[1],
                        pointTimeWeek:`<div>${getDateStringWeek(item.appointmentStartTime)}</div><div>${getDateString(item.appointmentStartTime).split("  ")[1] + "~" + getDateString(item.appointmentEndTime).split("  ")[1]}</div>`,
                        status: item.orderStatus,
                        question: item.questionnaireStatus
                    }
                });
            },
            openOrderTip(id, orderId) {
                this.curOrder = id;
                this.curOrderNum = orderId;
                this.cancelTip = true;
            },
            cancelOrder() {
                httpClient.post(`/api/v1/clouddrive/order/cancel`, {
                    orderId: this.curOrder
                }).then(response => {
                    if (response.data.code == 200 && response.data.data.result) {
                        this.canStatus = {
                            title: this.$t('m.cloud.can_order_suc'),
                            content: this.$t('m.cloud.can_order_suc_c', {order: this.curOrderNum})
                        };
                        this.reload();
                    } else {
                        this.canStatus = {
                            title: this.$t('m.cloud.can_order_fail'),
                            content: this.$t('m.cloud.can_order_fail_c')
                        }
                    }
                    this.tipStatus = true;
                })
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
            ShowAlert(id){
                this.currentId = id;
                this.verifyCarStatuss = true;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .vehicle-accept {
        color:#63c2de;
        cursor: pointer;
    }
    .search-input {
        display: inline-block;
        width: 150px;
    }
    .margin-b-1 {
        margin-bottom: 1px;
    }
    .margin-r-4 {
        margin-right: 4px;
    }
    .margin-l-4 {
        margin-left: 4px;
    }
    .name-link {
        cursor:pointer;
        margin-bottom: 4px;
        color: #63c2de;
        text-decoration: underline;
    }
    .plat {
        color:white;
        background:#63c2de;
        padding: 2px;
        border-radius: 8px;
    }
    .search-data {
        width: 40%;
    }
    .select-status{
        margin-bottom: 20px;
        p{
            margin-bottom: 5px;
        }
    }
</style>
