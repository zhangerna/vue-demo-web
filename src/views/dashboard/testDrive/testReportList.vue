<template>
    <div class="animated fadeIn shop">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t('m.dashboard.report_manager') }}
            </div>
            <b-row>
                <b-col class="col-5">
                    <b-form-group class="search-data">
                        <b-input-group>
                            <b-form-input type="text" :placeholder="$t('m.vehicle.search_text_report_list')" v-model="searchText"></b-form-input>
                            <b-input-group-append>
                                <b-button variant="primary" @click="searchData()"><i class="fa fa-search"></i>{{ $t('m.vehicle.b_search') }}
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <div class="content">
                <b-table class="mb-0 table-outline table-responsive-sm" small striped responsive="sm" :items="table" hover :fields="tableFields">
                    <template slot="reportId" slot-scope="data">
                        <span >{{ data.item.reportId }}</span>
                    </template>
                    <template slot="orderId" slot-scope="data">
                        <span class="hot-link" @click="$router.push('/test-drive/reservation-order/detail/' + data.item.id)">{{ data.item.orderId }}</span>
                    </template>
                    <template slot="userInfo" slot-scope="data">
                        <div @click="$router.push('/test-drive/test-user/detail/' + data.item.userId)">
                            <p class="hot-link">{{ data.item.phone }}</p>
                            <p class="hot-link">{{ data.item.userName }}</p>
                        </div>
                    </template>
                    <template slot="testPoint" slot-scope="data">
                        <p class="hot-link" @click="$router.push('/test-drive/test-point/detail/' + data.item.parkingId)">{{ data.item.testPoint }}</p>
                    </template>
                    <template slot="vehicleInfo" slot-scope="data">
                        <p class="hot-link" @click="$router.push('/test-drive/test-vehicle/detail/' + data.item.vehicleId)">{{ data.item.vehicleInfo1 }}</p>
                        <p class="space0">{{ data.item.vehicleInfo2 }}</p>
                        <p class="space0" v-html="data.item.vehicleInfo3"></p>
                    </template>
                    <template slot="question" slot-scope="data">
                        <template v-if="data.item.question == 1">
                            <span class="badge badge-success">{{ $t('m.cloud.complete') }}</span>
                        </template>
                        <template v-else>
                            <span class="badge badge-secondary">{{ $t('m.cloud.no_complete') }}</span>
                        </template>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <div class="btn btn-sm btn-info" v-b-tooltip.hover :title="$t('m.vehicle_bind.detail')" style="color: #ffffff;margin-right: 4px;"
                             @click="$router.push('/test-drive/test-report/detail/' + data.item.id)"><i class="fa fa-eye"></i></div>
                        <div v-if="data.item.status == 10" class="btn btn-sm btn-info" style="color: #ffffff;"
                             @click="openOrderTip(data.item.id, data.item.orderId)"><i class="fa fa-rotate-left"></i></div>
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
    </div>
</template>

<script>
    import httpClient from "@/utils/httpclient";
    import { getDateString } from "@/utils/date";

    export default {
        name: "shopManager",
        inject: ['reload'],
        data () {
            return {
                tableFields: {
                    reportId: {
                        label: this.$t('m.report_list.report_id'),
                        class: "text-center"
                    },
                    orderId: {
                        label:  this.$t('m.report_list.order_id'),
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
                    testPoint: {
                        label: this.$t('m.dashboard.test_point'),
                        class: "text-center"
                    },
                    createTime: {
                        label: this.$t('m.report_list.createTime'),
                        class: "text-center"
                    },
                    question: {
                        label: this.$t('m.cloud.check_question'),
                        class: "text-center"
                    },
                    actions: {
                        label: this.$t('m.vehicle.actions'),
                        class: "Actions"
                    }
                },
                table: null,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                totalPages:0,
                searchText:'',
            }
        },
        mounted() {
            this.initData(this.currentPage);
        },

        methods: {
            searchData(){
                this.initData(1)
            },
            initData(page) {
                httpClient.get(`/api/v1/clouddrive/report/reportlist?searchtext=${this.searchText}&pageNo=${page}&pageSize=${this.pageSize}`).then(response => {
                    if (response.data.code == 200) {
                        this.total = response.data.data.rowCount;
                        this.data = response.data.data;
                        this.pageCount = response.data.data.totalPages;
                        response.data.data.datas ?
                            this.filterData(response.data.data) : '';
                    }
                });
            },
            filterData(data) {
                this.table = data.datas.map(item => {
                    return {
                        id: item.orderId,
                        reportId: item.testDriveId,
                        orderId: item.orderServiceNum,
                        userInfo: item.phone,
                        userName: item.userName,
                        vehicleId: item.vehicleId,
                        phone: item.phone,
                        vehicleInfo1: `${item.vehicleYear} ${item.vehicleMake} ${item.vehicleModel}`,
                        vehicleInfo2: `${item.vehicleColor} ${item.vehicleTrim}`,
                        vehicleInfo3: `${item.vehicleStockNum},<span style="border: 0px;padding: 2px;border-radius: 6px;background:#63c2de;color: white ">${item.vehiclePlate}</span>`,
                        testPoint: item.parkingName,
                        testPointId: item.parkingId,
                        createTime: getDateString(item.reportFinishTime),
                        question: item.questionnaireStatus,
                        userId: item.userId,
                        parkingId: item.parkingId
                    }
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .hot-link {
        color: #63c2de;
        text-decoration: underline;
        margin-bottom: 4px;
        font-weight: bolder;
        cursor: pointer;
    }
    .space0 {
        margin-bottom: 4px;
    }
    .plat-info {
        border: 1px solid grey;
        padding: 2px;
    }
    .has-complete {
        color: rgb(255, 255, 255);
        border-radius: 6px;
        background: rgb(77, 189, 116);
        padding: 4px;
    }
    .no-complete {
        background: rgb(209, 219, 225);
        border-radius: 6px;
        padding: 4px;
    }
    .link-noUnderline {
        margin-bottom: 4px;
    }
</style>
