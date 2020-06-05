<template>
    <div class="animated fadeIn alerts">
        <b-card>
            <div slot="header">
                {{ $t('m.dashboard.alerts') }}
            </div>
            <b-table class="table-outline" small striped responsive="sm" :items="table" hover :fields="tableFields" head-variant="light">
                <template slot="status" slot-scope="data">
                    <span class="badge badge-pill" :class="data.item.status == 1 ? 'badge-success' : 'badge-danger'">
                        {{ data.item.status == 1 ? (data.item.alertAction == 'Read' ? $t('m.alert.read_status') : $t('m.alert.solved_status')) : (data.item.alertAction == 'Read' ? $t('m.alert.unread_status') : $t('m.alert.unsolved_status')) }}
                    </span>
                </template>
                <template slot="action" slot-scope="data">
                    <div class="btn btn-sm btn-info m-1" v-b-tooltip.hover :title="$t('m.tooltip.check_detail')" @click="$router.push('/inventory/alerts/detail/' + data.item.id)">
                        <i class="fa fa-eye"></i>
                    </div>
                    <template v-if="data.item.status == 1">
                        <div class="btn btn-sm btn-update btn-secondary" v-b-tooltip.hover :title="$t('m.alert.solved_status')" >
                            <i class="icons cui-check"></i>
                        </div>
                    </template>
                    <template v-else>
                        <div class="btn btn-sm btn-update btn-success" v-b-tooltip.hover :title="$t('m.alert.solved_status')" @click="updateVehicle(data.item.id)">
                            <i class="icons cui-check"></i>
                        </div>
                    </template>
                </template>
            </b-table>

            <b-row v-if="total > 0" class="paginate-alert">
                <b-col sm="4" lg="4">
                    <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">
                        {{ $t('m.common.show') }} {{10 * (currentPage - 1) + 1 }} {{ $t('m.common.to') }} {{currentPage === pageCount? total :currentPage * 10 }} {{ $t('m.common.of') }} {{total}} {{ $t('m.common.entries') }}
                    </div>
                </b-col>
                <b-col sm="8" lg="8">
                    <b-pagination align="right" :total-rows="total" v-model="currentPage" :per-page="pageSize" aria-controls="my-table" @input="changePage(currentPage)"></b-pagination>
                </b-col>
            </b-row>
        </b-card>
        <b-modal ref="my-modal" hide-footer :title="$t('m.tip.info')" v-model="show" @ok="show = false">
            <div>{{ updateInfo }} </div>
            <b-button class="btn btn-primary float-right" @click="reload()">{{ $t('m.tip.b_ok') }}</b-button>
        </b-modal>
    </div>
</template>

<style lang="scss" scoped>
    .paginate-alert{
        margin-top: 20px;
    }
    .card-header span{
        margin-left: 10px;
    }
    .table {
        margin-bottom: 0;
    }
    .alerts {
        .btn {
            color: #ffffff;
        }
        .bv-d-xs-down-none {
            display: none;
        }
        .modal {
            .modal-body button {
                color: #fff;
                background-color: #20a8d8;
                border-color: #20a8d8;
            }
        }
    }
</style>

<script>
    import httpclient from '@/utils/httpclient';
    import { getDateString } from "../../../utils/date";

    export default {
        name: "alerts",
        data() {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 0,
                show: false,
                tableFields: {
                    alertNumber: {
                        label: this.$t('m.alert.alert_number'),
                        class: "text-center"
                    },
                    alertType: {
                        label: this.$t('m.alert.type'),
                        class: "text-center"
                    },
                    vehicle: {
                        label: this.$t('m.common.vehicle'),
                        class: "text-center"
                    },
                    stockNo: {
                        label: this.$t('m.common.stock_num2'),
                        class: "text-center"
                    },
                    time: {
                        label: this.$t('m.common.time'),
                        class: "text-center"
                    },
                    status: {
                        label: this.$t('m.common.status'),
                        class: "text-center"
                    },
                    action: {
                        label: this.$t('m.common.action'),
                        class: "text-center"
                    }
                },
                data: null,
                table: null,
                pageCount: 0,
                updateInfo: ''
            }
        },
        mounted(){
            this.axiosData(this.currentPage);
        },
        methods: {
            axiosData(pageNo) {
                httpclient.post(`/api/v1/alert/list?pageNo=${pageNo}&pageSize=10`)
                    .then(response => {
                        this.total = response.data.data.rowCount;
                        this.data = response.data.data;
                        this.pageCount = response.data.data.totalPages;
                        this.filterData();
                    })
            },
            filterData() {
                this.table = this.data.datas.map((item) => {
                   let year = item.year ? item.year : 'N/A';
                   let make = item.make ? item.make : 'N/A';
                   let model = item.model ? item.model : 'N/A';
                   console.log(item)
                    let alertTypeText=null;
                    if(item.alertType === 1){
                        alertTypeText = this.$t('m.alert.alert_type_1')
                    }else if(item.alertType === 2){
                        alertTypeText = this.$t('m.alert.alert_type_2')
                    }else if(item.alertType === 3){
                        alertTypeText = this.$t('m.alert.alert_type_3')
                    }else if(item.alertType === 4){
                        alertTypeText = this.$t('m.alert.alert_type_4')
                    }else if(item.alertType === 5){
                        alertTypeText = this.$t('m.alert.alert_type_5')
                    }

                    return {
                        "alertNumber" : item.alertServiceNum,
                        "alertType" : alertTypeText,
                        "vehicle": `${year} ${make} ${model}`,
                        "stockNo": item.stockNum ? item.stockNum : 'N/A',
                        "time": item.createTime ? getDateString(item.createTime) : 'N/A',
                        "status": item.alertStatus,
                        'id': item.id,
                        "alertAction": item.alertMarkAction
                    }
                });
            },
            prevPage(){
                this.axiosData(this.currentPage > 1  ? this.currentPage - 1 : 1)
            },
            nextPage(){
                this.axiosData(this.currentPage >= this.pageCount  ? this.currentPage : this.currentPage + 1)
            },
            changePage(page) {
                this.axiosData(page);
            },
            reload() {
                window.location.reload();
            },
            updateVehicle(id) {
                let self = this;
                httpclient.post('/api/v1/alert/update/status', {
                    alertId: id
                }).then(response => {
                    if (response.data.code == 200) {
                        self.updateInfo = self.$t('m.tip.edit_succ');
                        self.show = true;
                    } else {
                        self.updateInfo = self.$t('m.tip.update_failed');
                        self.show = true;
                    }
                }).catch(error => {
                })
            }
        }
    }
</script>
