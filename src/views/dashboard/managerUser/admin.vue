<template>
    <div class="animated fadeIn">
        <div class="card custom-header">
            <div class="card-header">
                {{ $t('m.dashboard.user_info') }}
                <div class="float-right">
                    <a @click="$router.push('/manager-user/user-info/invite')">
                        <button class="btn btn-sm btn-primary">
                            <i class="fa fa-plus-square"></i> {{ $t('m.admin.add_user') }}
                        </button>
                    </a>
                </div>
            </div>
            <Alert @closeRemindBox='closeBox' :buttonText="showAlerts.buttonText" :show="showAlerts.show"
                   :title="showAlerts.title" :content="showAlerts.content"></Alert>
            <div class="card-body">
                <div>
                    <b-table class="mb-0 table-outline table-responsive-sm"   striped responsive="sm" hover :items="items" :fields="fields">
                        <template slot="status" slot-scope="data">
                          <span :class="data.item.status === 1 ? 'badge badge-pill badge-success' : 'badge badge-pill badge-secondary'">
                              {{ data.item.status === 1 ? $t('m.common.active') : $t('m.common.inactive') }}
                          </span>
                        </template>
                        <template slot="action" slot-scope="data">
                            <div v-b-tooltip.hover :title="$t('m.tooltip.check_detail')" class="btn btn-sm btn-info" @click="$router.push('/manager-user/user-info/detail/' + data.item.userId)">
                                <i class="fa fa-eye"></i></div>
                            <div v-b-tooltip.hover :title="$t('m.common.edit')" class="btn btn-sm btn-info btn-edit"
                                 @click="$router.push('/manager-user/user-info/edit/' + data.item.userId)"><i
                                    class="fa fa-edit"></i></div>
                            <div v-b-tooltip.hover :title="$t('m.detail_shop.del_b')" v-if="data.item.userId !== adminId" class="btn btn-sm btn-danger btn-del"
                                 @click="openBox(data.item.userId)"><i
                                    class="cui cui-trash"></i></div>
                        </template>
                    </b-table>
                </div>

                <b-row>
                    <b-col sm="4" lg="4">
                        <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">
                            <span v-if="totalPages > 0 ">{{ $t('m.common.show') }} {{10 * (currentPage - 1) + 1 }} {{ $t('m.common.to') }} {{currentPage === totalPages? rows :currentPage * 10 }} {{ $t('m.common.of') }} {{rows}} {{ $t('m.common.entries') }}</span>
                            <span v-else>{{ $t('m.common.show') }} 0 {{ $t('m.common.to') }} 0 {{ $t('m.common.of') }} {{rows}} {{ $t('m.common.entries') }}</span>
                        </div>
                    </b-col>
                    <b-col sm="8" lg="8">
                        <b-pagination align="right" :total-rows="rows" v-model="currentPage" :per-page="perPage"
                                      @input=" turnToPage(currentPage)"></b-pagination>
                    </b-col>
                </b-row>

            </div>
        </div>
    </div>
</template>
<script>
    import httpClient from '@/utils/httpclient';
    import Alert from '@components/model'

    export default {
        name: 'user',
        components: {
            Alert
        },
        data() {
            return {
                fields: {
                    Username: {
                        key: 'Username',
                        label: this.$t('m.login.p_username'),
                        class: "text-center"
                    },
                    userEmail: {
                        key: 'Email',
                        label: this.$t('m.admin.email'),
                        class: "text-center"
                    },
                    city: {
                        key: 'Phone',
                        label: this.$t('m.common.contact_phone'),
                        class: "text-center"
                    },
                    Role: {
                        key: 'Role',
                        label: this.$t('m.common.role'),
                        class: "text-center"
                    },
                    Dealership: {
                        key: 'Dealership',
                        label: this.$t('m.dashboard.store'),
                        class: "text-center"
                    },
                    status: {
                        label: this.$t('m.admin.active'),
                        class: "text-center"
                    },
                    action: {
                        label: this.$t('m.vehicle.actions'),
                        class: "text-center"
                    },
                },
                items: null,
                data: null,
                currentPage: 1,
                rows: 1,
                perPage: 1,
                totalPages: 1,
                adminId: 0,
                deleteUser: false,
                showAlerts: {
                    title: '',
                    content: '',
                    show: false
                }
            }
        },
        mounted() {
            this.getList(1);
            this.adminId = this.$store.state.userInfo.userId;
        },
        methods: {
            getList(num) {
                let url = '/api/v1/listUserDeatil?pageNo=' + num + '&pageSize=10';
                httpClient.post(url).then((res) => {
                    this.rows = res.data.data.rowCount;
                    this.perPage = res.data.data.pageSize;
                    this.totalPages = res.data.data.totalPages;
                    this.data = res.data.data.datas;
                    let myData = res.data.data.datas;
                    let myItems = [];
                    myData.map((item, i) => {
                        let role = item.role == "Dealership Group Administrator" ? this.$t('m.common.root') : (item.role == "Dealership Manager" ? this.$t('m.common.manager') : this.$t('m.common.user'))
                        myItems.push({
                            Username: item.firstName + ' ' + item.lastName,
                            Email: item.userEmail,
                            Phone: item.phone,
                            Role: role,
                            userId: item.userId,
                            status: item.status,
                            Dealership: item.storeName,
                            "Active/InActive": item.status === 1 ? 'Active' : 'InActive',
                            Action: ''
                        })
                    });
                    this.items = myItems
                })
            },
            turnToPage(p) {
                this.getList(p);
            },
            delData(userid) {
                httpClient.post('/api/v1/user/delete', {userId: userid}).then((res) => {
                    if (res.data.data === true) {
                        this.getList(1, 10)
                    }
                }).catch((err) => {
                });
            },
            openBox(clickId) {
                let passData = {
                    title: this.$t('m.tip.warn'),
                    show: true,
                    content: this.$t('m.tip.del_user'),
                    buttonText: {
                        btnFirst: this.$t('m.tip.b_cancel'),
                        btnSecond: this.$t('m.tip.b_ok'),
                        userId: clickId
                    }
                };
                this.closeRemind(passData);
            },
            closeRemind(data) {
                this.showAlerts.show = data.show;
                this.showAlerts.title = data.title;
                this.showAlerts.content = data.content;
                this.showAlerts.buttonText = data.buttonText;
            },
            closeBox(data, ids) {
                this.showAlerts.show = !this.showAlerts.show;
                this.deleteUser = data == 'ok';
                if (this.deleteUser === true) {
                    this.delData(ids)
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .card {
        width: 100%;
    }
    .btn {
        color: #ffffff;
    }

    .btn-edit {
        margin: 0 5px;
    }
</style>
