<template>
    <div class="animated fadeIn">
        <div class="row available-list">
            <div class="col-12">
                <div class="card custom-header">
                    <div class="card-header">
                        {{ $t('m.admin.detail_title') }}

                        <span class="float-right">
                               <button class="btn btn-sm btn-primary "
                                       @click="$router.push('/manager-user/edit/' + $route.params.id)">
                            {{ $t('m.common.edit') }}
                        </button>
                        </span>

                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm-3" v-for="(item, index) in userInfo" :key="index">
                                <div class="callout callout-secondary">
                                    <small class="text-muted">{{item.title}}</small>
                                    <br>
                                    <strong class="h5" id="name-text">{{item.value}} </strong>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <b-table class="user-table-list" hover :items="data" :fields="fields">
                                <template slot="operation" slot-scope="data">
                                    <span>{{ data.item.type}}</span>
                                </template>
                                <template slot="vehicle" slot-scope="data">
                                    <a class="btn-md link-detail"
                                       @click="$router.push('/inventory/vehicle/detail/' + data.item.vehicleId)">
                                        {{data.item.vehicle}}
                                    </a>
                                </template>
                                <template slot="time" slot-scope="data">
                                    <div class="btn-md">{{data.item.time}}</div>
                                </template>
                            </b-table>
                        </div>

                        <div class="row">
                            <div class="col-sm-12 col-md-5">
                                <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">
                                    <span v-if="totalPages > 0 ">{{ $t('m.common.show') }} {{10 * (currentPage - 1) + 1 }} {{ $t('m.common.to') }} {{currentPage === totalPages? rows :currentPage * 10 }} {{ $t('m.common.of') }} {{rows}} {{ $t('m.common.entries') }}</span>
                                    <span v-else>{{ $t('m.common.show') }} 0 {{ $t('m.common.to') }} 0 {{ $t('m.common.of') }} {{rows}} {{ $t('m.common.entries') }}</span>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-7">
                                <b-pagination align="right" :total-rows="rows" v-model="currentPage" :per-page="perPage"
                                              @input=" turnToPage(currentPage)"></b-pagination>
                            </div>
                        </div>
                        <div class="text-center">
                            <button class="btn btn-sm btn-danger btn-del btn-bottom-detail" @click="showDelData">
                                {{$t('m.cloud.delete')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <model
                :show="showModel"
                :title="showModelTitle"
                :content="showModelContent"
                :buttonText="btnGroup"
                @closeRemindBox="hideTip"
        ></model>
    </div>
</template>
<script>
    import httpClient from '@/utils/httpclient';
    import {getDateString} from '@/utils/date';
    import model from "@/components/model";

    export default {
        name: 'adminDetail',
        components: {
            model
        },
        data() {
            return {
                showModel: false,
                showModelTitle: '',
                showModelContent: '',
                btnGroup: {
                    btnFirst: this.$t('m.tip.b_cancel'),
                    btnSecond: this.$t('m.tip.b_ok')
                },
                fields: {
                    operation: {
                        key: 'operationType',
                        label: this.$t('m.common.action')
                    },
                    vehicle: {
                        key: 'vehicle',
                        label: this.$t('m.common.vehicle')
                    },
                    time: {
                        key: 'time',
                        label: this.$t('m.common.time')
                    },
                },
                items: null,
                data: [],
                id: this.$route.params.id,
                currentPage: 1,
                rows: 1,
                perPage: 1,
                totalPages: 1,
                name: '',
                phone: '',
                email: '',
                status: '',
                userInfo: [
                    {
                        title: this.$t('m.admin.name'),
                        value: ''
                    },
                    {
                        title: this.$t('m.common.contact_phone'),
                        value: ''
                    },
                    {
                        title: this.$t('m.admin.email'),
                        value: ''
                    },
                    {
                        title: this.$t('m.common.status'),
                        value: ''
                    },
                ]
            }
        },
        mounted() {
            let userInfoLink = '/api/v1/getUserById';
            httpClient.post(userInfoLink, {userId: this.id}).then((res) => {
                if (res.data.code === 200) {
                    let myData = res.data.data;
                    this.userInfo[0].value = myData.firstName + ' ' + myData.lastName;
                    this.userInfo[1].value = myData.phone;
                    this.userInfo[2].value = myData.userEmail;
                    this.userInfo[3].value = myData.status === 1 ? 'Active' : 'InActive';
                }
            });

            this.getList(1)
        },
        methods: {
            showDelData() {
                this.showModelTitle = this.$t('m.tip.warn');
                this.showModelContent = this.$t('m.tip.del_user');
                this.showModel = true;
            },
            hideTip(type) {
                if (type) {
                    httpClient.post('/api/v1/user/delete', {
                        userId: this.$route.params.id
                    }).then((res) => {
                        if (res.data.data) {
                            this.$router.push('/manager-user/list');
                        }
                    }).catch((err) => {
                    });
                }
                this.showModel = false;
            },
            getList(num) {
                let userCarListLink = '/api/v1/operationlog/listbyuserid?userId=' + this.id + '&pageNo=' + num;
                httpClient.get(userCarListLink).then((res) => {
                    let myData = res.data.data.datas;
                    this.items = myData;
                    this.currentPage = res.data.data.pageNo;
                    this.perPage = res.data.data.pageSize;
                    this.totalPages = res.data.data.totalPages;
                    this.rows = res.data.data.rowCount;
                    let myArr = [];
                    myData.map((item, i) => {
                        item.year = item.year ? item.year : 'N/A';
                        item.make = item.make ? item.make : 'N/A';
                        item.model = item.model ? item.model : 'N/A';
                        let operation = item.operationType == 'DeviceInstalled' ? this.$t('m.common.device_install') : (item.operationType == 'device_unplugged' ? this.$t('m.common.device_unplugged') : (item.operationType == 'Check In' ? this.$t('m.common.check_in') : this.$t('m.common.check_out')))
                        myArr.push({
                            operationType: operation,
                            vehicle: item.year + ' ' + item.make + ' ' + item.model,
                            time: getDateString(item.createTime),
                            userId: item.userId,
                            vehicleId: item.vehicleId
                        });
                    });
                    this.data = myArr;
                })
            },
            turnToPage(p) {
                this.getList(p);
            }
        }
    }
</script>
<style lang="scss" scoped>
    .user-table-list {
        .link-detail {
            color: #20a8d8;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
                color: #167495;
            }
        }
    }

</style>
