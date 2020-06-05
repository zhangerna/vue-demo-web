<template>
    <div class="animated fadeIn order-detail">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t('m.report.orderNo') + ":" }}{{ data.orderServiceNum ? data.orderServiceNum : '' }}
                <div class="order-status">
                    <button v-if="data.testReportStatus" style="margin-right: 10px" class="btn btn-primary" @click="$router.push('/test-drive/test-report/detail/' + data.orderId )">
                        {{ $t('m.report.see_report_btn') }}
                    </button>
                    <template v-if="data.orderStatus == 0">
                        <span class="badge badge-secondary">{{ $t('m.cloud.wait_accomplish_order') }}</span>
                    </template>
                    <template v-if="data.orderStatus == 10">
                        <span class="badge badge-info">{{ $t('m.cloud.wait_pick_up') }}</span>
                    </template>
                    <template v-if="data.orderStatus == 20">
                        <span class="badge badge-success">{{ $t('m.cloud.wait_return') }}</span>
                    </template>
                    <template v-if="data.orderStatus == 30">
                        <span class="badge badge-warning">{{ $t('m.cloud.returned_vehicle') }}</span>
                    </template>
                    <template v-if="data.orderStatus == 40">
                        <span class="badge badge-secondary">{{ $t('m.cloud.finished') }}</span>
                    </template>
                    <template v-if="data.orderStatus == 50">
                        <span class="badge badge-secondary">{{ $t('m.cloud.canceled') }}</span>
                    </template>
                </div>
            </div>
            <div class="content">
                <b-card>
                    <div slot="header">
                        {{ $t('m.cloud.user_info') }}
                        <span class="float-right" v-if="data.userId" @click="$router.push('/test-drive/test-user/detail/' + data.userId)" style="color: #63c2de;text-decoration: underline;margin-left: 10px;cursor: pointer">查看更多</span>
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="col-sm-6">
                                <b-list-group>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.common.contact_phone') }}
                                        </div>
                                        <div>{{ data && data.phone ?  data.phone : $t('m.cloud.un_get_info') }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.verify_status') }}
                                        </div>
                                        <div>
                                            <template v-if="data.userCheckStatus == 10">
                                                {{$t('m.cloud.unsubmit_verify')}}
                                            </template>
                                            <template v-if="data.userCheckStatus == 20 || data.userCheckStatus == 30">
                                                {{$t('m.cloud.wait_verify')}}
                                            </template>
                                            <template v-if="data.userCheckStatus == 40">
                                                {{$t('m.cloud.verify_failed')}}
                                            </template>
                                            <template v-if="data.userCheckStatus == 50">
                                                {{$t('m.cloud.verify_success')}}
                                            </template>
                                            <template v-if="!data.userCheckStatus || data.userCheckStatus ==0" >
                                                {{$t('m.cloud.un_get_info')}}
                                            </template>
                                        </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.admin.name') }}
                                        </div>
                                        <div>{{ data && data.usedName ?  data.usedName : $t('m.cloud.un_get_info') }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.gender') }}
                                        </div>
                                        <div>
                                            <template v-if="data.usedGender && data.usedGender == 2">
                                                {{ $t('m.common.girl') }}
                                            </template>
                                            <template v-else-if="data.usedGender && data.usedGender == 1">
                                                {{ $t('m.common.boy') }}
                                            </template>
                                            <template v-else>
                                                {{$t('m.cloud.un_get_info')}}
                                            </template>
                                        </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.report.age') }}
                                        </div>
                                        <div>{{ data.age ? data.age : $t('m.cloud.un_get_info')}}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.id_card_name') }}
                                        </div>
                                        <div>{{ data.idCardNum ? data.idCardNum : $t('m.cloud.un_get_info')}}</div>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.birth_day') }}
                                        </div>
                                        <div>{{ data.birthDate ? data.birthDate : $t('m.cloud.un_get_info')}}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.drive_type') }}
                                        </div>
                                        <div>{{ data.driveLicenseNum ? data.driveLicenseNum : $t('m.cloud.un_get_info')}}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.init_driving_license') }}
                                        </div>
                                        <div>{{ data.initialDrivingLicenseDate ? data.initialDrivingLicenseDate + (data.driveAge === 0 ? '（'+$t('m.cloud.not_one_year')+'）' : ""): $t('m.cloud.un_get_info')}}</div>
                                    </b-list-group-item>
                                </b-list-group>
                            </div>
                            <div class="col-sm-6">
                                <div class="row">
                                    <!-- 旋转图片组件 -->
                                    <div class="col-sm-6">
                                        <template v-if="data.idcardFrontUrl">
                                            <viewer>
                                                <img class="table-image" :src="data.idcardFrontUrl" alt="" width="100%">
                                            </viewer>
                                        </template>
                                        <template v-else>
                                            <div class="border-grey">
                                                {{$t('m.cloud.idcard_image_unload')}}
                                            </div>
                                        </template>
                                    </div>
                                    <div class="col-sm-6">
                                        <template v-if="data.rotateFaceRecognitionUrl || data.faceRecognitionUrl">
                                            <viewer>
                                                <img class="table-image" :src="data.rotateFaceRecognitionUrl ? data.rotateFaceRecognitionUrl : data.faceRecognitionUrl" alt="" width="100%">
                                            </viewer>
                                        </template>
                                        <template v-else>
                                            <div class="border-grey">
                                                {{$t('m.cloud.faceid_iamge_unload')}}
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-card>
                <b-card>
                    <div slot="header">
                        {{ $t('m.cloud.vehicle_info') }}
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="col-sm-6">
                                <b-list-group>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.common.vehicle') }}
                                        </div>
                                        <template v-if="!data.vehicleYear && !data.vehicleMake && !data.vehicleModel">
                                            <div>{{$t('m.cloud.un_get_info')}} {{ data.vehicleAlias ? "-" + data.vehicleAlias : '' }}</div>
                                        </template>
                                        <template v-else>
                                            <div>{{ data.vehicleYear ?  data.vehicleYear : $t('m.cloud.un_get_info') }}{{ data.vehicleMake ?  data.vehicleMake : $t('m.cloud.un_get_info') }}{{ data.vehicleModel ?  data.vehicleModel : $t('m.cloud.un_get_info') }}{{ data.vehicleAlias ? "-" + data.vehicleAlias : '' }}</div>
                                        </template>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.common.color') }}
                                        </div>
                                        <div>{{ data && data.vehicleColor ?  data.vehicleColor : $t('m.cloud.un_get_info') }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.common.alias') }}
                                        </div>
                                        <div>{{ data && data.vehicleAlias ?  data.vehicleAlias : $t('m.cloud.un_get_info') }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.common.stock_num2') }}
                                        </div>
                                        <div>{{ data.vehicleStockNum ? data.vehicleStockNum : $t('m.cloud.un_get_info') }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.plat_number') }}
                                        </div>
                                        <div>
                                            <template v-if="data.vehiclePlate">
                                                <span style="">{{ data.vehiclePlate }}</span>
                                            </template>
                                            <template v-else>
                                                {{$t('m.cloud.un_get_info')}}
                                            </template>
                                        </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.vehicle_store_name') }}
                                        </div>
                                        <div>{{ data.storeName ? data.storeName : $t('m.cloud.un_get_info') }}</div>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.point') }}
                                        </div>
                                        <div>{{ data.parkingName ? data.parkingName : $t('m.cloud.un_get_info')}}</div>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.last_update_time') }}
                                        </div>
                                        <div>{{ data.lastLocationTime ? getDateString(data.lastLocationTime) : $t('m.cloud.un_get_info')}}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.common.last_location') }}
                                        </div>
                                        <div>{{ data.lastLocation ? data.lastLocation : $t('m.cloud.un_get_info')}}</div>
                                    </b-list-group-item>

                                </b-list-group>
                            </div>
                            <div class="col-sm-6">
                                <!-- 车辆图片 -->
                                <div class="row">
                                    <div class="col-sm-12">
                                        <viewer>
                                            <img :src="data.vehicleImgUrl ? data.vehicleImgUrl : '/img/placeholder.5367544d.svg' "
                                             width="100%" alt="">
                                        </viewer>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row margin-top-20">
                            <div class="col-sm-12">
                                <myMap elementId="oder-detail-map" :map="map" v-if="map && map.lat != 0 && map.lng != 0"></myMap>
                                <div class="img text-center" v-if="map && (map.lat == 0 || map.lng == 0) " style="height: 25vh;margin-top:8vh">
                                    <img src="@/assets/pages-img/Location_not_available.svg" width="100px" />
                                    <p style="margin-top: 14px">
                                        {{ $t("m.vehicle_detail.no_map") }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-card>

                <b-card>
                    <div slot="header">
                        {{ $t('m.cloud.order_drive_detail') }}
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="col-sm-6">
                                <b-list-group>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.add_shop.country') }}
                                        </div>
                                        <div>{{ data.parkingCountryName?  data.parkingCountryName: 'N/A' }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.add_shop.city') }}
                                        </div>
                                        <div>{{ data.parkingCityName?  data.parkingCityName: 'N/A' }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.order_create_time') }}
                                        </div>
                                        <div>{{ getDateString(data.createTime) }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.order_drive_time') }}
                                        </div>
                                        <div>
                                            <template v-if="data.appointmentStartTime">
                                                {{ getDateString(data.appointmentStartTime) }}
                                            </template>
                                            <template v-else>
                                                {{ $t('m.cloud.no_get') }}
                                            </template>
                                        </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.order_drive_store') }}
                                        </div>
                                        <div>{{ data.parkingName ?  data.parkingName : 'N/A' }}</div>
                                    </b-list-group-item>
                                </b-list-group>
                            </div>
                            <div class="col-sm-6">
                                <b-list-group>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.add_shop.state') }}
                                        </div>
                                        <div>{{ data.parkingStateName?  data.parkingStateName: 'N/A' }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.add_shop.area') }}
                                        </div>
                                        <div>{{ data.parkingAreaName?  data.parkingAreaName: 'N/A' }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.real_get_car_time') }}
                                        </div>
                                        <div>
                                            <template v-if="data.takeTime">
                                                {{ getDateString(data.takeTime) }}
                                            </template>
                                            <template v-else>
                                                {{ $t('m.cloud.no_get') }}
                                            </template>
                                        </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.real_return_car_time') }}
                                        </div>
                                        <div>
                                            <template v-if="data.returnTime">
                                                {{ getDateString(data.returnTime) }}
                                            </template>
                                            <template v-else-if="data.orderStatus == 20">
                                                {{ $t('m.common.no_return_vehicle') }}
                                            </template>
                                            <template v-else>
                                                {{ $t('m.cloud.no_get') }}
                                            </template>
                                        </div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex box align-items-center">
                                        <div>
                                            {{ $t('m.cloud.drive_time') }}
                                        </div>
                                        <div>
                                            {{ data.returnTime && data.takeTime ?  getMinutesBetween(data.returnTime, data.takeTime)+'分钟' : 'N/A' }}
                                        </div>
                                    </b-list-group-item>
                                </b-list-group>
                            </div>
                        </div>
                    </div>
                </b-card>

            </div>
        </b-card>
    </div>

</template>

<script>
    import httpClient from "@/utils/httpclient";
    import { getDateStringChinese, getMinutesBetween } from "@/utils/date";
    import myMap from "@/components/map";
    import "@/utils/viewer";//该组件的js是预览图片组件，按需引用即可

    export default {
        name: "orderDetail",
        components: {
            myMap
        },
        inject: ['reload'],
        props:['orderId'],
        data() {
            return {
                data: {},
                showMap: false,
                map:{},
                show: false,
                updateInfo: '',
                markedAt:'',
                idcardImage:'',
                checkImages:true,
                rotateDeg:'90deg',
            }
        },
        mounted() {
            httpClient.get('/api/v1/clouddrive/order/detail?orderId=' + this.orderId).then(response => {
                if (response.data.code === 200) {
                    this.data = response.data.data;
                    this.$emit("childData", this.data.orderStatus);
                    this.map = {
                        lat: response.data.data.lastLocationLat ? response.data.data.lastLocationLat : 0,
                        lng: response.data.data.lastLocationLng ? response.data.data.lastLocationLng : 0,
                        area: response.data.data.areaCoordinates ? response.data.data.areaCoordinates : [],
                        vehicleInfo: {}
                    };
                }
            })
        },
        methods: {
            getDateString(data) {
                return getDateStringChinese(data);
            },
            getMinutesBetween(returnTime, takeTime){
                return getMinutesBetween(returnTime - takeTime)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .order-detail {
        .margin-top-20 {
            margin-top: 20px;
        }
        .blue-button {
            background: #20a8d8;
            color: #ffffff;
            padding: 4px;
            border-radius: 4px;
        }
        #check-modal{
            .modal-dialog{
                max-width: 800px;
            }
        }
        .order-status {
            float: right;
        }
        .maps #map {
            height: 26vh;
        }
        .box{
            div{
                width: 50%;
            }
        }
        .border-grey{
            border: 2px solid grey;
            border-radius: 5px;
            font-weight: 500;
            width: 100%;
            height: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: grey;
        }

    }
</style>
