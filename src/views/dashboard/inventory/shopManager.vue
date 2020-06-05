<template>
    <div class="animated fadeIn shop">
        <b-card>
            <div slot="header">
                {{ $t('m.dashboard.store') }}
                <button class="btn btn-sm btn-primary link-bind float-right" @click="$router.push('/inventory/shop-manager/add')">
                    <i class="fa fa-plus-square"></i>
                    {{ $t('m.shop.add_shop') }}
                </button>
            </div>
            <div class="content">
                <b-table class="mb-0 table-outline table-responsive-sm" small striped responsive="sm" :items="table" hover :fields="tableFields">
                    <template slot="storeServiceNum" slot-scope="data">
                        {{ data.item.storeServiceNum ? data.item.storeServiceNum : 'N/A'}}
                    </template>
                    <template slot="info" slot-scope="data">
                        <template v-if="data.item.info && data.item.info != 'N/A'">
                            <div>
                                <p class="font-weight-bold margin-b-2">{{ data.item.info[0].firstName + data.item.info[0].lastName }}</p>
                                <p class="margin-b-2">{{ data.item.info[0].userEmail }},{{ data.item.info[0].userPhone }}</p>
                                <p v-if="data.item.info.length > 1" class="blue-point" @click="showMore(data.item.name, data.item.info)">{{ $t('m.shop.more') }}</p>
                            </div>
                        </template>
                        <template v-else>
                            N/A
                        </template>
                    </template>
                    <template slot="actions" slot-scope="data">
                        <div class="btn btn-sm btn-info color-white" v-b-tooltip.hover :title="$t('m.tooltip.check_detail')"
                             @click="$router.push('/inventory/shop-manager/detail/' + data.item.id)"><i class="fa fa-eye"></i></div>
                        <div class="btn btn-sm btn-info color-white margin-left-2" v-b-tooltip.hover :title="$t('m.tooltip.edit')"
                             @click="$router.push('/inventory/shop-manager/edit/' + data.item.id)"><i class="fa fa-edit"></i></div>
                        <div class="btn btn-sm btn-danger btn-del margin-left-2" @click="delData(data.item.id)"
                             v-b-tooltip.hover :title="$t('m.cloud.delete')"><i
                                class="cui cui-trash"></i></div>
                    </template>
                </b-table>
            </div>
        </b-card>
        <b-modal ref="my-modal" v-model="showTip" @ok="showTip = false" :title="curName">
            <b-row v-for="(item, key) in curAdminList" :key="key">
                <b-col sm="12" md="12">
                    <p class="font-weight-bold margin-b-2">{{ item.firstName + item.lastName }}</p>
                    <p class="margin-b-2">{{ item.userEmail }},{{ item.userPhone }}</p>
                </b-col>
            </b-row>
        </b-modal>
        <b-row>
            <b-col sm="4" lg="4">
                <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">
                    {{ $t('m.common.show') }} {{10 * (currentPage - 1) + 1 }} {{ $t('m.common.to') }} {{currentPage === totalPages? total :currentPage * 10 }} {{ $t('m.common.of') }} {{total}} {{ $t('m.common.entries') }}
                </div>
            </b-col>
            <b-col sm="8" lg="8">
                <b-pagination align="right" :total-rows="total" v-model="currentPage" :per-page="10" @input="changePage(currentPage)"></b-pagination>
            </b-col>
        </b-row>
        <model
                :show="showDelTip"
                :title="$t('m.tip.warn')"
                :content="$t('m.detail_shop.del1')"
                :buttonText="{btnFirst: this.$t('m.tip.b_cancel'), btnSecond: this.$t('m.tip.b_ok')}"
                @closeRemindBox="closeBox"
        ></model>
    </div>
</template>

<script>
    import httpClient from "@/utils/httpclient";
    import model from "@/components/model";
    export default {
        name: "shopManager",
        components: {
            model
        },
        data () {
            return {
                tableFields: {
                    storeServiceNum: {
                        label: this.$t('m.shop.shop_num'),
                        class: "text-center"
                    },
                    name: {
                        label: this.$t('m.shop.shop_name'),
                        class: "text-center"
                    },
                    address: {
                        label: this.$t('m.shop.shop_address'),
                        class: "text-center"
                    },
                    info: {
                        label: this.$t('m.shop.manager_info'),
                        class: "text-center"
                    },
                    actions: {
                        label: this.$t('m.vehicle.actions'),
                        class: "text-center"
                    }
                },
                table: null,
                showDelTip: false,
                currentPage: 1,
                pageSize: 10,
                total: 0,
                totalPages:0,
                showTip: false,
                curName: '',
                curAdminList: [],
                curId: ''
            }
        },
        mounted() {
            this.initData(this.currentPage, this.pageSize);
        },
        methods: {
            showMore(name, data) {
                this.curAdminList = data;
                this.curName = this.$t('m.add_shop.store_admin',{name: name});
                this.showTip = true;
            },
            initData(page) {
                httpClient.get(`/api/v1/store/pagelist?pageNo=${page}&pageSize=${this.pageSize}`).then(response => {
                    this.total = response.data.data.rowCount;
                    this.filterData(response.data.data);
                    this.totalPages = response.data.data.totalPages
                })
            },
            delData(id) {
                this.curId = id;
                this.showDelTip = true;
            },
            closeBox(type) {
                if (type) {
                    httpClient.post("/api/v1/store/delete", {
                        storeId: this.curId
                    }).then((res) => {
                        if (res.data.code == 200 && res.data.data.result) {
                            window.location.reload();
                        } else {
                            alert("删除失败");
                        }
                    })
                }
                this.showDelTip = false
            },
            filterData(data) {
                let self = this;
                this.table = data.datas.map((item) => {
                    let address = "";
                    if (self.$i18n.locale === "en-US" ) {
                        address = `${item.countryEn ? item.countryEn : 'N/A'},${item.stateEn ? item.stateEn : 'N/A'},${item.cityEn ? item.cityEn : 'N/A'}, ${item.streetAddress ? item.streetAddress : 'N/A'}`
                    } else {
                        address = `${item.country ? item.country : 'N/A'},${item.state ? item.state : 'N/A'},${item.city ? item.city : 'N/A'},${item.area ? item.area : 'N/A'},${ item.streetAddress ? item.streetAddress : 'N/A'}`
                    }
                    return {
                        storeServiceNum: item.storeServiceNum,
                        name: item.storeName,
                        address: address,
                        info: item.userList && item.userList.length > 0 ? item.userList : 'N/A',
                        id: item.id,
                    }
                });

            }
        }
    }
</script>

<style lang="scss" scoped>
    .shop {
        .margin-b-2 {
            margin-bottom: 2px;
        }
        .blue-point {
            color: #63c2de;
            cursor: pointer;
        }
        .margin-left-2 {
            margin-left: 2px;
        }
    }
</style>
