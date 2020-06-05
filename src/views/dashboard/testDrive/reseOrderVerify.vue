<template>
    <div class="animated fadeIn order-verify">
        <OrderDetail :orderId="id" @childData="getOrderStatus" />
        <b-row class="change-order-status">
            <b-col sm="6">
                <p>{{$t('m.cloud.order_status_change')}}</p>
                <p class="text-red">{{$t('m.cloud.order_status_tip')}}</p>
                <div class="d-flex justify-content-center">
                    <b-form-select class="select-box" v-model="selected_reason">
                        <option value="">{{ $t('m.add_shop.please_select') }}</option>
                        <option v-for="(val,j) in curReson" :value="val.value" :key="j">
                            {{val.text}}
                        </option>
                    </b-form-select>

                    <button class="btn btn-primary" @click="changeOrderStatus" style="margin-left: 10px">
                        {{ $t('m.common.b_save') }}
                    </button>
                </div>
            </b-col>
            <b-modal ref="my-modal-cancel" v-model="cancelOrder"  :ok-title="$t('m.tip.b_ok')" ok-only
                     @ok="linkToOrderDetail"  class="select-store" >
                <template slot="modal-title">
                    {{ $t('m.vehicle.actions_remind') }}
                </template>
                <div class="text-left">
                    {{ modalContent }}
                </div>
            </b-modal>
        </b-row>
    </div>
</template>

<script>
    import OrderDetail from '../component/orderDetail'
    import httpClient from "@/utils/httpclient"
    export default {
        name: "reseOrderVerify",
        components:{
            OrderDetail
        },
        data(){
            return{
                id:this.$route.params.id,
                modalContent:'',
                selected_reason: '',
                cancelOrder:false,
                submitAuthTime:null,
                reasonList: {
                    "10": this.$t('m.cloud.wait_pick_up'),
                    "20": this.$t('m.cloud.wait_return'),
                    "30": this.$t('m.cloud.had_return')
                },
                curReson: [],
                curOrderStatus: ''
            }
        },
        methods:{
            getOrderStatus(orderStatus) {
                this.curOrderStatus = Number(orderStatus) + 10;
                this.curReson.push({
                    value: orderStatus,
                    text: this.reasonList[String(Number(orderStatus) + 10)]
                });
            },
            linkToOrderDetail() {
                if (this.modalContent == this.$t('m.admin.save_success')) {
                    this.$router.push('/test-drive/reservation-order/detail/' + this.$route.params.id)
                }
            },
            changeOrderStatus(){
                this.cancelOrder = true;
                this.modalContent = 'success';
                let url = this.curOrderStatus == 20 ? "/api/v1/clouddrive/order/unlockusevehicle" : "/api/v1/clouddrive/order/returnvehicle";
                httpClient.post(url, {
                    orderId: this.id,
                }).then(res => {
                    if (res.data.code === 200 && res.data.data.result) {
                        this.cancelOrder = true;
                        this.modalContent = this.$t('m.admin.save_success');
                    } else {
                        this.cancelOrder = true;
                        this.modalContent = res.data.data.content || 'failed'
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .change-order-status{
        width: 100%;
        border-radius: 5px;
        padding: 20px;
        margin: 0 auto 20px;
        background: #fff;
        .text-red{
            color: #cc0000;
        }
    }
</style>
