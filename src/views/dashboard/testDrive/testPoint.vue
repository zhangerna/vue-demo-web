<template>
    <div class="animated fadeIn alerts">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t("m.dashboard.test_point") }}

                <span class="text-right float-right">
                    <button class="btn btn-sm btn-primary" @click="$router.push('/test-drive/test-point/add')">
                        <i class="fa fa-plus-square"></i>
                        {{ $t("m.cloud.add_test_point") }}
                    </button>
                </span>
            </div>
            <b-table class="table-outline" small striped responsive="sm" :items="table" hover :fields="tableFields" head-variant="light">
                <template slot-scope="data" slot="addressInfo">
                    <p style="margin: 4px 0 2px 0;">{{ data.item.country ? data.item.country : "N/A" }},{{ data.item.state ? data.item.state : "N/A" }},{{ data.item.city ? data.item.city : "N/A" }},{{ data.item.area ? data.item.area : "N/A" }},{{ data.item.address ? data.item.address : "N/A" }}</p>
                </template>
                <template slot="action" slot-scope="data">
                    <div class="btn btn-sm btn-info point-eye text-white" v-b-tooltip.hover :title="$t('m.vehicle_bind.detail')" style="margin-right: 4px;" @click="$router.push('/test-drive/test-point/detail/' + data.item.id)"><i class="fa fa-eye"></i></div>
                    <div v-b-tooltip.hover :title="$t('m.common.edit')" class="btn btn-sm btn-info point-edit text-white" style="margin-right: 4px;" @click="$router.push('/test-drive/test-point/edit/' + data.item.id)"><i class="fa fa-edit"></i></div>
                    <div v-b-tooltip.hover :title="$t('m.cloud.delete')" class="btn btn-sm btn-danger" @click="showDelPoint(data.item.id)"><i class="cui cui-trash"></i></div>
                </template>
            </b-table>

            <b-row v-if="total > 0" class="paginate-alert" style="margin-top: 20px;">
                <b-col sm="4" lg="4">
                    <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">{{ $t("m.common.show") }} {{ 10 * (currentPage - 1) + 1 }} {{ $t("m.common.to") }} {{ currentPage === pageCount ? total : currentPage * 10 }} {{ $t("m.common.of") }} {{ total }} {{ $t("m.common.entries") }}</div>
                </b-col>
                <b-col sm="8" lg="8">
                    <b-pagination align="right" :total-rows="total" v-model="currentPage" :per-page="pageSize" aria-controls="my-table" @input="changePage(currentPage)"></b-pagination>
                </b-col>
            </b-row>
        </b-card>
        <model :show="showModel" :title="modelTitle" :content="modelContent" :buttonText="btnGroup" @closeRemindBox="clickButton"></model>
        <model :show="showModel2" :title="modelTitle2" :content="modelContent2" :buttonText="btnGroup2" @closeRemindBox="clickButton2"></model>
    </div>
</template>

<script>
import httpClient from "@/utils/httpclient";
import model from "@/components/model";
export default {
    name: "testPoint",
    components: {
        model
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            total: 0,
            data: null,
            table: null,
            pageCount: 0,
            showModel: false,
            modelTitle: "",
            modelContent: "",
            showModel2: false,
            modelTitle2: "",
            modelContent2: "",
            curPoint: "",
            btnGroup: {
                btnFirst: this.$t("m.tip.b_cancel"),
                btnSecond: this.$t("m.tip.b_ok")
            },
            btnGroup2: {
                btnFirst: this.$t("m.tip.b_cancel"),
                btnSecond: this.$t("m.tip.b_ok")
            },
            tableFields: {
                pointNum: {
                    label: this.$t("m.cloud.drive_point_num"),
                    class: "text-center"
                },
                point: {
                    label: this.$t("m.cloud.test_store_name"),
                    class: "text-center"
                },
                addressInfo: {
                    label: this.$t("m.add_shop.label_address"),
                    class: "text-center"
                },
                userName: {
                    label: this.$t("m.common.contact_person"),
                    class: "text-center"
                },
                userPhone: {
                    label: this.$t("m.common.contact_phone"),
                    class: "text-center"
                },
                storeName: {
                    label: this.$t("m.cloud.vehicle_store_name"),
                    class: "text-center"
                },
                tenantName: {
                    label: this.$t("m.cloud.drive_dealership"),
                    class: "text-center"
                },
                action: {
                    label: this.$t("m.common.action"),
                    class: "text-center"
                }
            }
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            httpClient.get("/api/v1/clouddrive/parkinglot/pagelist").then(res => {
                if (res.data.code == 200) {
                    this.total = res.data.data.rowCount;
                    this.data = res.data.data;
                    this.pageCount = res.data.data.totalPages;
                    this.filterData(res.data.data.datas || []);
                }
            });
        },
        showDelPoint(id) {
            this.curPoint = id;
            this.modelTitle = this.$t("m.vehicle.actions_remind");
            this.modelContent = this.$t("m.tip.confirm_del_vehicle");
            this.showModel = true;
            this.btnGroup = {
                btnFirst: this.$t("m.tip.b_cancel"),
                btnSecond: this.$t("m.tip.confirm")
            };
        },
        clickButton(type) {
            if (type) {
                httpClient
                    .post("/api/v1/lot/delete", {
                        id: this.curPoint
                    })
                    .then(response => {
                        if (response.data.code == 200) {
                            window.location.reload();
                        }
                    }).catch(err => {
                        err;
                        this.modelTitle2 = this.$t("m.vehicle.actions_remind");
                        this.modelContent2 = this.$t("m.vehicle.file_remind");
                        this.showModel2 = true;
                        this.btnGroup2 = {
                            btnFirst: "",
                            btnSecond: this.$t("m.tip.b_ok")
                            
                        };
                    });
                        this.showModel = false;

            }else {
                this.showModel = false;
            }
        },
        clickButton2 () {
            this.showModel2 = false;
        },
        filterData(data) {
            this.table = data.map(item => {
                return {
                    point: item.parkingName,
                    address: item.address,
                    desc: item.parkingAddressDesc,
                    userName: item.parkingContactName,
                    userPhone: item.parkingContactPhone,
                    tenantName: item.tenantName,
                    storeName: item.storeName,
                    country: item.parkingCountryName,
                    state: item.parkingStateName,
                    city: item.parkingCityName,
                    area: item.parkingAreaName,
                    id: item.id,
                    pointNum: item.parkingServiceNum || "N/A"
                };
            });
        },
        changePage(page) {
            this.initData(page);
        }
    }
};
</script>
