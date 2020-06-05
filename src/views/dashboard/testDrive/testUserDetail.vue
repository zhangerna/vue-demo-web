<template>
    <div class="animated fadeIn user-detail">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t('m.report.user') }}{{ data.phone ? data.phone : '' }}
                <span v-if="data.checkStatus && data.checkStatus === 50" class="text-right float-right">
                    <span class="badge badge-success">{{$t('m.cloud.verify_success')}}</span>
                </span>
                <span v-if="data.checkStatus && data.checkStatus === 40" class="text-right float-right">
                    <span class="badge badge-danger">{{$t('m.cloud.verify_failed')}}</span>
                </span>
                <span v-if="data.checkStatus && (data.checkStatus === 20 || data.checkStatus === 30) " class="text-right float-right">
                    <span class="badge badge-warning">{{$t('m.cloud.wait_verify')}}</span>
                </span>
                <span v-if="data.checkStatus && data.checkStatus === 10" class="text-right float-right">
                   <span class="badge badge-pill btn-secondary">{{$t('m.cloud.unsubmit_verify')}}</span>
                </span>
            </div>
            <div class="content">
                <b-card>
                    <div slot="header">
                        {{ $t('m.cloud.idcheck_info') }}
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="col-sm-6">
                                <b-list-group>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.admin.name') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.idCardResponse ?  data.idCardResponse.userName : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.gender') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.idCardResponse && data.idCardResponse.gender ?
                                            (data.idCardResponse.gender === 1 ? $t('m.common.boy') :$t('m.common.girl')) : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.nation') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.idCardResponse && data.idCardResponse.ethnicGroup ?
                                            data.idCardResponse.ethnicGroup : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.birth_day') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ idcardBirthDate }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.address') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.idCardResponse && data.idCardResponse.address ?
                                            data.idCardResponse.address : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.id_type') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.idCard') }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.id_number') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.idCardResponse && data.idCardResponse.idcardNumber ?
                                            data.idCardResponse.idcardNumber : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.issure_auth') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.idCardResponse && data.idCardResponse.issuingOrganization ?
                                            data.idCardResponse.issuingOrganization : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.valid_day') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ idcardExpireDate }}
                                        </div>
                                    </div>
                                </b-list-group>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-12 text-center">
                                    <viewer>
                                        <img id="idcardFirstImg" :src="data.idCardResponse ? data.idCardResponse.idcardFrontUrl : '@/assets/pages-img/placeholder.svg'"
                                             :width="idcardFirstWidth !== ''? idcardFirstWidth :'100%'"
                                             :style="idCardFront === 'true'? 'transform: rotate(-90deg)' :''">
                                    </viewer>

                                </div>
                                <div class="col-sm-12 text-center">
                                    <viewer>
                                        <img id="idcardSecondImg" :src="data.idCardResponse ? data.idCardResponse.idcardBackUrl : '@/assets/pages-img/placeholder.svg'"
                                             :width="idcardSecondWidth !== ''? idcardSecondWidth :'100%'"
                                             :style="idCardBack === 'true'? 'transform: rotate(-90deg)' :''" >
                                    </viewer>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-card>
                <b-card>
                    <div slot="header">
                        {{ $t('m.cloud.drive_card_info') }}
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="col-sm-6">
                                <b-list-group>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.admin.name') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.idCardResponse ?  data.idCardResponse.userName : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.gender') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.driveLicenseResponse && data.driveLicenseResponse.gender ?
                                            (data.driveLicenseResponse.gender === 1 ? $t('m.common.boy') :$t('m.common.girl')) : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.country') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.driveLicenseResponse && data.driveLicenseResponse.nationality ?
                                            data.driveLicenseResponse.nationality : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.address') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.driveLicenseResponse && data.driveLicenseResponse.address ?
                                            data.driveLicenseResponse.address : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.birth_day') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ licenseBirthDate }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.init_driving_license') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ licenceFristGetTime }}{{data.driveLicenseResponse && data.driveLicenseResponse.driveAge == 0 ? $t('m.cloud.drive_license_in_one_year'):'' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.vehicle_class') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.driveLicenseResponse && data.driveLicenseResponse.quasiDrivingModel ?
                                            data.driveLicenseResponse.quasiDrivingModel : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.id_type') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.drive_type') }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.id_number') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ data.driveLicenseResponse && data.driveLicenseResponse.drivingLicenseNumber ?
                                            data.driveLicenseResponse.drivingLicenseNumber : 'N/A' }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.valid_day') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{ licenseExpireDate }}
                                        </div>
                                    </div>
                                    <div class="row list-group-item d-flex justify-content-between align-items-center">
                                        <div class="col-sm-6">
                                            {{ $t('m.cloud.verify_time') }}
                                        </div>
                                        <div class="col-sm-6">
                                            {{driverLicenseverifyTime}}
                                        </div>
                                    </div>
                                </b-list-group>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-12 text-center" style="overflow: hidden;">
                                    <viewer>
                                        <img id="licenseFirstImg" :src="data.driveLicenseResponse ? data.driveLicenseResponse.driveLicensePrimeUrl : '@/assets/pages-img/placeholder.svg'"
                                             :width="licenseFirstWidth !== ''? licenseFirstWidth :'100%'" alt="" :style="licenseFirstPage === 'true'? 'transform: rotate(-90deg)' :''" >
                                    </viewer>

                                </div>
                                <div class="col-sm-12 text-center">
                                    <viewer>
                                        <img id="licenseSecondImg" :src="data.driveLicenseResponse ? data.driveLicenseResponse.driveLicenseAuxiUrl : '@/assets/pages-img/placeholder.svg'"
                                             :width="licenseSecondWidth !== ''? licenseSecondWidth :'100%'" :style="licenseSecondPage === 'true'? 'transform: rotate(-90deg)' :''" >
                                    </viewer>

                                </div>
                            </div>
                        </div>
                    </div>'
                </b-card>
                <b-card>
                    <div slot="header">
                        {{ $t('m.cloud.appoint_history') }}
                    </div>
                    <div class="content">
                        <b-table class="mb-0 table-outline table-responsive-sm" small striped responsive="sm" :items="table" hover :fields="tableFields">
                            <template slot="orderId" slot-scope="data">
                                <div style="cursor: pointer;color: #20a8d8;" class="" @click="$router.push('/test-drive/reservation-order/detail/' + data.item.id)">{{data.item.orderId}}</div>
                            </template>
                        </b-table>
                    </div>
                    <b-row style="margin-top: 20px">
                        <b-col sm="4" lg="4">
                            <div class="dataTables_info" id="DataTables0" role="status" aria-live="polite">
                                {{ $t('m.common.show') }} {{10 * (currentPage - 1) + 1 }} {{ $t('m.common.to') }} {{currentPage === totalPages? total :currentPage * 10 }} {{ $t('m.common.of') }} {{total}} {{ $t('m.common.entries') }}
                            </div>
                        </b-col>
                        <b-col sm="8" lg="8">
                            <b-pagination align="right" :total-rows="total" v-model="currentPage" :per-page="10" @input=" getUserOrderList(currentPage)"></b-pagination>
                        </b-col>
                    </b-row>
                </b-card>
            </div>
        </b-card>
    </div>
</template>

<style lang="scss">
    .user-detail {
        .content {
            .row {
                margin: auto 0;
            }
        }
    }
</style>

<script>
    import httpClient from "@/utils/httpclient";
    import {formatUserBirthDate,formatUserIdcardExpireDate,formatUserLicenseBirthDate,formatUserLicenseExpireDate,getDateStringEnglish } from "@/utils/date";
    import {rotateImage} from '../../../utils/db'
    import '../../../utils/viewer'

    export default {
        name: "testUserDetail",
        inject: ['reload'],
        data() {
            return {
                data: {},
                showMap: false,
                map:{},
                show: false,
                updateInfo: '',
                markedAt:'',
                table: null,
                tableFields: {
                    orderId: {
                        label: this.$t('m.cloud.order_id'),
                        class: "text-center"
                    },
                    vehicleInfo: {
                        label: this.$t('m.cloud.vehicle_info'),
                        class: "text-center"
                    },
                    testInfo: {
                        label: this.$t('m.dashboard.test_point'),
                        class: "text-center"
                    },
                    pointTime: {
                        label: this.$t('m.cloud.rese_test_drive'),
                        class: "text-center"
                    },
                    status: {
                        label: this.$t('m.cloud.status'),
                        class: "text-center"
                    }
                },
                idcardVerifyTime:null,
                driverLicenseverifyTime:null,
                currentPage:1,
                totalPages:0,
                total:0,
                idcardBirthDate:null,
                idcardExpireDate:null,
                licenseBirthDate:null,
                licenceFristGetTime:null,
                licenseExpireDate:null,
                licenseFirstPage:'',
                licenseFirstWidth:'',
                licenseSecondPage:'',
                licenseSecondWidth:'',
                idCardFront:'',
                idcardFirstWidth:'',
                idCardBack:'',
                idcardSecondWidth:'',
            }
        },
        mounted() {
            httpClient.get('/api/v1/clouddrive/user/detail?userId='+this.$route.params.id)
                .then(response => {
                if (response.data.code == 200) {
                    this.data = response.data.data;
                    let res = response.data.data;
                    this.idcardVerifyTime = res.idCardResponse.certificationTime ? getDateStringEnglish(res.idCardResponse.certificationTime) : '';
                    this.driverLicenseverifyTime = res.driveLicenseResponse.certificationTime ? getDateStringEnglish(res.driveLicenseResponse.certificationTime) : '';
                    this.idcardBirthDate = res.idCardResponse.birthDate? formatUserBirthDate(res.idCardResponse.birthDate,this):'N/A';
                    this.idcardExpireDate = res.idCardResponse.expireDate? formatUserIdcardExpireDate(res.idCardResponse.expireDate):'N/A';
                    this.licenseBirthDate = res.driveLicenseResponse.birthDate ? formatUserLicenseBirthDate(res.driveLicenseResponse.birthDate) : 'N/A';
                    this.licenceFristGetTime = res.driveLicenseResponse.initialDrivingLicenseDate ? formatUserLicenseBirthDate(res.driveLicenseResponse.initialDrivingLicenseDate) : 'N/A';
                    this.licenseExpireDate = res.driveLicenseResponse.expireDate ? formatUserLicenseExpireDate(res.driveLicenseResponse.initialDrivingLicenseDate+res.driveLicenseResponse.expireDate,this) : 'N/A';

                    if(res.driveLicenseResponse){
                        let myData = res.driveLicenseResponse;
                        this.transformImage(myData.driveLicenseAuxiUrl,'driveLicenseAuxiUrl');
                        this.transformImage(myData.driveLicensePrimeUrl,'driveLicensePrimeUrl');
                    }
                    if(res.idCardResponse){
                        let myData = res.idCardResponse;
                        this.transformImage(myData.idcardFrontUrl,'idcardFrontUrl');
                        this.transformImage(myData.idcardBackUrl,'idcardBackUrl');
                    }

                }
            });
            this.getUserOrderList(1);
        },
        methods: {
            getUserOrderList(page){
                let _page = page ? page:1;
                httpClient.get('/api/v1/clouddrive/order/pagelistbyuser?duserid='+ this.$route.params.id+"&pageNo="+_page)
                    .then(res => {
                        if (res.data.code == 200) {
                            this.filterData(res.data.data.datas ? res.data.data.datas : []);
                            this.total = res.data.data.rowCount;
                            this.totalPages = res.data.data.totalPages
                        }
                    })
            },
            cb(rotate,type,rate){
                if(rotate === 1){
                    if(type === 'driveLicenseAuxiUrl'){
                        let w = document.getElementById('licenseSecondImg').clientWidth;
                        this.licenseSecondWidth = w/rate +'px';
                        this.licenseSecondPage = 'true'
                    }else if(type === 'driveLicensePrimeUrl'){
                        let w = document.getElementById('licenseFirstImg').clientWidth;
                        this.licenseFirstWidth = w/rate +'px';
                        this.licenseFirstPage = 'true'
                    }else if(type === 'idcardFrontUrl'){
                        let w = document.getElementById('idcardFirstImg').clientWidth;
                        this.idcardFirstWidth = w/rate +'px';
                        this.idCardFront = 'true'
                    }else if(type === 'idcardBackUrl'){
                        let w = document.getElementById('idcardSecondImg').clientWidth;
                        this.idcardSecondWidth = w/rate +'px';
                        this.idCardBack = 'true'
                    }
                }
            },
            transformImage(links,type){
                return rotateImage(links,type,this.cb)
            },
            filterData(data) {
                this.table = data.map((item) => {
                    let _status;
                    if(item.orderStatus){
                        if(item.orderStatus === 10){
                            _status = this.$t('m.cloud.wait_pick_up')
                        }else if(item.orderStatus === 20){
                            _status = this.$t('m.cloud.wait_return')
                        }else if(item.orderStatus === 30){
                            _status = this.$t('m.cloud.returned_vehicle')
                        }else if(item.orderStatus === 40){
                            _status = this.$t('m.cloud.complete')
                        }else if(item.orderStatus === 50){
                            _status = this.$t('m.cloud.canceled')
                        }
                    }

                    return {
                        orderId: item.orderServiceNum,
                        vehicleInfo:item.vehicleYear+ " "+item.vehicleMake+ " "+ item.vehicleModel+" "+item.vehicleStockNum+" "+item.vehiclePlate,
                        id: item.orderId,
                        phone: item.phone,
                        color: item.vehicleColor,
                        alias: item.vehicleAlias,
                        trim: item.vehicleTrim,
                        plat: item.vehiclePlate,
                        num: item.vehicleStockNum, // 库存编号
                        testInfo: item.parkingName,
                        pointTime: getDateStringEnglish(item.appointmentStartTime),
                        status: _status
                    }
                });
            },
        }
    }
</script>

