<template>
    <div class="animated fadeIn rese-order-detail">
        <OrderDetail :orderId="id" v-on:childData="getDataFromChild" />
        <div class="text-center margin-b-10" v-if="orderStatus == 0 || orderStatus == 10">
            <button class="btn btn-danger color-white active" @click="deleteOrder">{{ $t('m.cloud.delete') }}</button>
        </div>
        <b-modal ref="my-modal-6" v-model="cancelTip" :cancel-title="$t('m.cloud.cancel_think_again')" :ok-title="$t('m.tip.confirm')"
                 @ok="cancelOrder()"  class="select-store" >
            <template slot="modal-title">
                {{ $t('m.cloud.can_order') }}
            </template>
            <div class="text-left">
                {{ $t('m.cloud.can_order_content') }}
            </div>
        </b-modal>
    </div>
</template>

<script>
    import OrderDetail from '../component/orderDetail'
    import httpClient from "@/utils/httpclient";
    export default {
        name: "reseOrderVerify",
        components:{
            OrderDetail
        },
        data(){
            return{
                id:this.$route.params.id,
                cancelTip: false,
                orderStatus:null
            }
        },
        methods:{
            getDataFromChild(status){//详情页把orderStatus传过来了
                this.orderStatus = status;
            },
            deleteOrder() {
                this.cancelTip = true;
            },
            cancelOrder() {
                httpClient.post(`/api/v1/clouddrive/order/cancel`, {
                    orderId: this.orderId
                }).then(response => {
                    if (response.data.code == 200 && response.data.data.result) {
                        this.$router.push('/test-drive/reservation-order/list')
                    } else {
                        alert(this.$t('m.tip.delete_err'));
                    }
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .rese-order-detail {
        .margin-b-10 {
            margin-bottom: 10px;
        }
    }
</style>



