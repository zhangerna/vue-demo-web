<template>
    <div class="animated fadeIn shop">
        <b-card class="custom-header">
            <div slot="header">
<!--                <i class="nav-icon icons cui-user"></i>-->
                {{ $t('m.dashboard.test_user') }}
            </div>
            <b-row>
                <b-col class="col-5">
                    <b-form-group class="search-data">
                        <b-input-group>
                            <b-form-input type="text" :placeholder="$t('m.cloud.search_user_advice')" v-model="searchText"></b-form-input>
                            <b-input-group-append>
                                <b-button variant="primary" @click="searchData()"><i class="fa fa-search"></i>{{ $t('m.vehicle.b_search') }}
                                </b-button>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                </b-col>
            </b-row>
            <div class="content">
                <b-table style="margin-bottom: 0" class="mb-0 user-list-custom table-outline-user-list text-center table-outline table-responsive-sm" small striped responsive="sm" :items="table" hover :fields="tableFields">
                    <template slot="userName" slot-scope="data">
                        <p v-if="data.item.checkStatus != 50 || data.item.idcardAuthStatus == 10">
                            N/A
                        </p>
                        <p v-else>{{ data.item.userName ? data.item.userName : 'N/A' }}</p>
                    </template>
                    <template slot="phone" slot-scope="data">
                        <p >{{ data.item.phone ? data.item.phone : 'N/A' }}</p>
                    </template>

                    <template slot="idcard" slot-scope="data">
                        <template v-if="data.item.idcardAuthStatus == 10">
                            <span class="badge  btn-secondary">{{$t('m.cloud.unsubmit')}}</span>
                        </template>
                        <template v-if="data.item.idcardAuthStatus == 20">
                            <span class="badge  btn-danger">{{$t('m.cloud.resubmit')}}</span>
                        </template>
                        <template v-if="data.item.idcardAuthStatus == 30">
                            <span class="badge badge-success">{{$t('m.cloud.submitted')}}</span>
                        </template>
                    </template>

                    <template slot="driveCheck" slot-scope="data">
                        <template v-if="data.item.driverAuthStatus == 10">
                            <span class="badge badge-pill btn-secondary">{{$t('m.cloud.unsubmit')}}</span>
                        </template>
                        <template v-if="data.item.driverAuthStatus == 20 || data.item.driverAuthStatus == 25">
                            <span class="badge badge-pill btn-danger" >{{$t('m.cloud.resubmit')}}</span>
                        </template>
                        <template v-if="data.item.driverAuthStatus == 30">
                            <span class="badge badge-success">{{$t('m.cloud.submitted')}}</span>
                        </template>
                    </template>

                    <template slot="statusCheck" slot-scope="data">
                        <template v-if="data.item.checkStatus == 10">
                            <span class="badge badge-pill btn-secondary">{{$t('m.cloud.unsubmit_verify')}}</span>
                        </template>
                        <template v-if="data.item.checkStatus == 20">
                            <span class="badge badge-pill btn-secondary">{{$t('m.cloud.verify_in_process')}}</span>
                        </template>
                        <template v-if="data.item.checkStatus == 30 || data.item.checkStatus == 40">
                            <span class="badge badge-danger">{{$t('m.cloud.verify_failed')}}</span>
                        </template>
                        <template v-if="data.item.checkStatus == 50">
                            <span class="badge badge-success">{{$t('m.cloud.verify_success')}}</span>
                        </template>
                    </template>
                    <template slot="dealership" slot-scope="data">
                        <span>{{ data.item.dealership ? data.item.dealership : 'N/A' }}</span>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <div v-b-tooltip.hover :title="$t('m.vehicle_bind.detail')" style="margin-left:4px;" class="btn btn-sm btn-info vehicledetail text-white" @click="$router.push('/test-drive/test-user/detail/' + data.item.userId)"><i class="fa fa-eye"></i></div>
                        <template v-if="data.item.checkStatus == 20 || data.item.checkStatus == 30">
                            <div v-b-tooltip.hover :title="$t('m.cloud.admin_verify')" style="margin-left:4px;" class="btn btn-sm btn-info text-white vehicledetail" @click="$router.push('/test-drive/test-user/verify/' + data.item.userId)"><i class="fa fa-search-plus"></i></div>
                        </template>
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
    export default {
        name: "shopManager",
        data () {
            return {
                tableFields: {
                    // userId: {
                    //     label: this.$t('m.report.userId'),
                    //     class: "text-center"
                    // },
                    userNum:{
                        label: this.$t('m.report.userId'),
                        class: "text-center"
                    },
                    userName: {
                        label: this.$t('m.report.userName'),
                        class: "text-center"
                    },
                    phone: {
                        label: this.$t('m.cloud.user_phone'),
                        class: "text-center"
                    },
                    idcard: {
                        label: this.$t('m.cloud.id_card_name'),
                        class: "text-center"
                    },
                    driveCheck: {
                        label: this.$t('m.cloud.drive_type'),
                        class: "text-center"
                    },
                    statusCheck: {
                        label: this.$t('m.cloud.verify_status'),
                        class: "text-center"
                    },
                    // dealership: {
                    //     label: this.$t('m.common.dealership'),
                    //     class: "text-center"
                    // },
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
                showTip: false,
                curName: '',
                searchText:'',
                curAdminList: []
            }
        },
        mounted() {
            this.initData(this.currentPage, this.pageSize);
        },
        methods: {
            searchData(){
                this.initData(1)
            },
            initData(page) {
                httpClient.get(`/api/v1/clouddrive/user/list?searchtext=${this.searchText}&pageNo=${page}&pageSize=${this.pageSize}`).then(response => {
                    this.total = response.data.data.rowCount;
                    this.filterData(response.data.data);
                    this.pageCount = response.data.data.totalPages;
                })
            },
            filterData(data) {
                this.table = data.datas.map(item => {
                    return {
                        userName: item.userName,
                        phone: item.phone,
                        idcardAuthStatus: item.idcardAuthStatus,
                        driverAuthStatus: item.driverAuthStatus,
                        checkStatus:item.checkStatus,
                        dealership: item.tenantName,
                        point:item.appointmentStatus,
                        userId:item.userId,
                        userNum:item.userServiceNum || 'N/A'
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
            }
        }
    }
</script>
<style lang="scss">
    .content{
        .table{
            margin-bottom: 0;
        }
    }
    .table-outline-user-list{
        table{
            margin-bottom: 0;
        }

        p{
            margin: 10px 0;
        }
    }
    .user-list-custom{
        .fa-eye{
            color: #fff;
        }
        thead{
            tr{
                th:last-child{
                    text-align: center;
                }
            }
        }
        tbody{
            tr{
                td:last-child{
                    text-align: center;
                }
            }
        }
    }
</style>
