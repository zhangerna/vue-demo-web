<template>
    <div class="animated fadeIn user-detail">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t('m.index.user') }}{{ data.phone ? data.phone : '' }}
                <span class="text-right float-right">
                    <span class="badge badge-success">{{$t('m.cloud.submitted_time')}}:{{submitAuthTime === 0 ? "" : submitAuthTime }}</span>
                </span>
            </div>
            <div class="content">
                <b-card>
                    <div slot="header">
                        {{ $t('m.cloud.idcrad_title') }}
                        <span v-if="data.authMessageCode && data.authMessageCode === 1"
                              class="text-right badge badge-danger">
                            {{$t('m.cloud.idcard_verify_failed')}}
                        </span>
                        <span v-if="data.authMessageCode && data.authMessageCode === 2"
                              class="text-right badge badge-danger">
                            {{$t('m.cloud.idcard_auth_fail')}}
                        </span>
                        <span v-if="data.authMessageCode && data.authMessageCode === 3"
                              class="text-right badge badge-danger">
                            {{$t('m.cloud.idcard_used_others')}}
                        </span>
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="col-sm-6">
                                <b-list-group>
                                    <div class="row list-group-item ">
                                        <b-row>
                                            <b-col sm="6">
                                                <b-form-group :label="$t('m.admin.name')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="idcardName"></b-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col sm="2">
                                                <b-form-group :label="$t('m.cloud.gender')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="idcardGender"></b-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col sm="4">
                                                <b-form-group :label="$t('m.cloud.nation')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="idcardNation"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                        <b-row class="margin-top-20">
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.birth_day')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="idcardBirthDate"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                        <b-row class="margin-top-20">
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.address')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="idcardAddress"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row class="margin-top-20">
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.id_number')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="idcardNumber"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row class="margin-top-20">
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.issure_auth')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="idcardOrganization"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row class="margin-top-20">
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.valid_day')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="idcardExpireDate"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </div>

                                </b-list-group>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-12 text-center">
                                    <img v-if="!data.idCardResponse" src="@/assets/pages-img/placeholder.svg" width="50%">
                                    <img v-if="data.idCardResponse" :src="data.idCardResponse.idcardFrontUrl "
                                         width="100%" alt="">
                                </div>
                                <div class="col-sm-12 text-center">
                                    <img v-if="!data.idCardResponse" src="@/assets/pages-img/placeholder.svg" width="50%">
                                    <img v-if="data.idCardResponse" :src="data.idCardResponse.idcardBackUrl "
                                         width="100%" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </b-card>
                <b-card>
                    <div slot="header">
                        {{ $t('m.cloud.license_title') }}
                        <span v-if="data.authMessageCode && data.authMessageCode === 4"
                              class="text-right badge badge-danger">
                            {{$t('m.cloud.license_verify_failed')}}
                        </span>
                        <span v-if="data.authMessageCode && data.authMessageCode === 5"
                              class="text-right badge badge-danger">
                            {{$t('m.cloud.difference_idcard_license')}}
                        </span>
                        <span v-if="data.authMessageCode && data.authMessageCode === 6"
                              class="text-right badge badge-danger">
                            {{$t('m.cloud.driver_used_others')}}
                        </span>
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="col-sm-6">
                                <b-list-group>

                                    <div class="row list-group-item">
                                        <b-row>
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.id_number')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="licenseNumber"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                        <b-row class="margin-top-20">
                                            <b-col sm="6">
                                                <b-form-group :label="$t('m.admin.name')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="licenseName"></b-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col sm="2">
                                                <b-form-group :label="$t('m.cloud.gender')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="licenseGender"></b-input>
                                                </b-form-group>
                                            </b-col>
                                            <b-col sm="4">
                                                <b-form-group :label="$t('m.cloud.country')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="licenseCountry"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                        <b-row class="margin-top-20">
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.address')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="licenseAddress"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row class="margin-top-20">
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.birth_day')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="licenseBirthDate"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row class="margin-top-20">
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.init_driving_license')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="licenseInitDate"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row class="margin-top-20">
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.vehicle_class')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="licenseCarClass"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>

                                        <b-row class="margin-top-20">
                                            <b-col sm="12">
                                                <b-form-group :label="$t('m.cloud.valid_day')" label-align-sm="top" class="mb-0">
                                                    <b-input v-model="licenseExpireDate"></b-input>
                                                </b-form-group>
                                            </b-col>
                                        </b-row>
                                    </div>
                                </b-list-group>
                            </div>
                            <div class="col-sm-6">
                                <div class="col-sm-12 text-center">
                                    <img v-if="!data.driveLicenseResponse" src="@/assets/pages-img/placeholder.svg" width="50%">
                                    <img v-if="data.driveLicenseResponse" :src="data.driveLicenseResponse.driveLicensePrimeUrl"
                                         width="100%" alt="">
                                </div>
                                <div class="col-sm-12 text-center">
                                    <img v-if="!data.driveLicenseResponse" src="@/assets/pages-img/placeholder.svg" width="50%">
                                    <img v-if="data.driveLicenseResponse" :src="data.driveLicenseResponse.driveLicenseAuxiUrl"
                                         width="100%" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </b-card>

                <b-row>
                    <b-col sm="7">
                        <p style="margin-bottom: 10px">{{$t('m.cloud.verify_result')}}</p>
                        <div class="d-flex justify-content-center">
                            <b-form-select class="select-box" v-model="selected_reason">
                                <option v-for="(val,j) in reasonList" :disabled="j===0" :value="val.value" :key="j">
                                    {{val.text}}
                                </option>
                            </b-form-select>

                            <button class="btn btn-primary" @click="saveUserInfo" :disabled="selected_reason === 'null'" style="margin-left: 10px">
                                {{ $t('m.common.b_save') }}
                            </button>
                        </div>
                    </b-col>
                </b-row>

                <b-modal ref="my-modal" v-model="updateUserStatus" :title="$t('m.common.action')" :ok-title="$t('m.tip.b_ok')" @ok="$router.push('/test-drive/test-user/detail/' + $route.params.id)" ok-only>
                    <div>{{updateUserText}}</div>
                </b-modal>


            </div>
        </b-card>
    </div>
</template>

<script>
    import httpClient from "@/utils/httpclient";
    import {getDateString} from "@/utils/date";

    export default {
        name: "testUserVerify",
        inject: ['reload'],
        data() {
            return {
                data: {},
                showMap: false,
                updateUserStatus:false,
                updateUserText:'',
                map: {},
                show: false,
                updateInfo: '',
                markedAt: '',
                table: null,
                idcardVerifyTime: null,
                driverLicenseverifyTime: null,
                idcardName: 'N/A',
                idcardGender: 'N/A',
                idcardNation: 'N/A',
                idcardBirthDate: 'N/A',
                idcardAddress: 'N/A',
                idcardNumber: 'N/A',
                idcardOrganization: 'N/A',
                idcardExpireDate: 'N/A',
                licenseNumber: 'N/A',
                licenseName: 'N/A',
                licenseGender: 'N/A',
                licenseCountry: 'N/A',
                licenseAddress: 'N/A',
                licenseBirthDate: 'N/A',
                licenseInitDate: 'N/A',
                licenseCarClass: 'N/A',
                licenseExpireDate: 'N/A',
                selected_reason: 'null',
                submitAuthTime:null,
                reasonList: [
                    {value: 'null', text: this.$t('m.add_shop.please_select')},
                    {value: 1, text: this.$t('m.cloud.verify_success')},
                    {value: 2, text: this.$t('m.cloud.idcard_verify_failed')},
                    {value: 3, text: this.$t('m.cloud.license_verify_failed')},
                    {value: 4, text: this.$t('m.cloud.difference_idcard_license')}
                ]
            }
        },
        mounted() {
            httpClient.get('/api/v1/clouddrive/user/detail?userId=' + this.$route.params.id)
                .then(response => {
                    if (response.data.code == 200) {
                        this.data = response.data.data;
                        this.idcardVerifyTime = getDateString(this.data.idCardResponse.certificationTime);
                        this.driverLicenseverifyTime = getDateString(this.data.driveLicenseResponse.certificationTime);
                        this.submitAuthTime = this.data.submitAuthTime ? getDateString(this.data.submitAuthTime) :0;
                        if (response.data.data.idCardResponse) {
                            let data = response.data.data.idCardResponse;
                            this.idcardName = data.userName;
                            this.idcardGender = data.gender? (data.gender === 1 ? this.$t('m.common.boy') :(data.gender === 2 ? this.$t('m.common.girl'):'N/A')) : '';
                            this.idcardNation = data.ethnicGroup;
                            this.idcardBirthDate = data.birthDate;
                            this.idcardAddress = data.address;
                            this.idcardNumber = data.idcardNumber;
                            this.idcardOrganization = data.issuingOrganization;
                            this.idcardExpireDate = data.expireDate;
                        }
                        if (response.data.data.driveLicenseResponse) {
                            let data = response.data.data.driveLicenseResponse;
                            this.licenseNumber = data.drivingLicenseNumber;
                            this.licenseName = data.userName;
                            this.licenseGender = data.gender ? (data.gender === 1 ? this.$t('m.common.boy') :this.$t('m.common.girl')) :'';
                            this.licenseCountry = data.nationality;
                            this.licenseAddress = data.address;
                            this.licenseBirthDate = data.birthDate;
                            this.licenseInitDate = data.initialDrivingLicenseDate;
                            this.licenseCarClass = data.quasiDrivingModel;
                            this.licenseExpireDate = data.expireDate;
                        }

                    }
                })
        },
        methods: {
            filterData(data) {
                this.table = data.map((item) => {
                    return {
                        orderId: item.orderServiceNum,
                        id: item.orderId,
                        phone: item.phone,
                        year: item.vehicleYear,
                        make: item.vehicleMake,
                        model: item.vehicleModel,
                        color: item.vehicleColor,
                        alias: item.vehicleAlias,
                        trim: item.vehicleTrim,
                        plat: item.vehiclePlate,
                        num: item.vehiclePlate, // 库存编号
                        testInfo: item.parkingName,
                        pointTime: item.appointmentStartTime + "~" + item.appointmentEndTime,
                        status: item.orderStatus,
                    }
                });
            },
            saveUserInfo() {//提交用户的信息
                let driveLicenseResponse = {
                    address:this.licenseAddress,
                    birthDate:this.licenseBirthDate,
                    drivingLicenseNumber:this.licenseNumber,
                    userName: this.licenseName,
                    gender:this.licenseGender === '男' ? 1:2,
                    nationality:this.licenseCountry,
                    initialDrivingLicenseDate:this.licenseInitDate,
                    quasiDrivingModel:this.licenseCarClass,
                    expireDate:this.licenseExpireDate,
                };
                let idCardResponse = {
                    userName:this.idcardName,
                    gender:this.idcardGender === '男' ? 1:2,
                    ethnicGroup:this.idcardNation,
                    birthDate:this.idcardBirthDate,
                    address:this.idcardAddress,
                    idcardNumber:this.idcardNumber,
                    issuingOrganization:this.idcardOrganization,
                    expireDate:this.idcardExpireDate
                };

                let verifyStatus = this.selected_reason;

                let data = {
                    idCardResponse:idCardResponse,
                    driveLicenseResponse:driveLicenseResponse,
                    check:verifyStatus,
                    dUserId: this.$route.params.id
                };

                httpClient.post('/api/v1/clouddrive/user/checkcard',data).then(res=>{
                    if(res.data.code === 200 && res.data.data.result === true){
                        this.updateUserStatus = true;
                        this.updateUserText = this.$t('m.tip.update_succ')
                    }else{
                        this.updateUserStatus = true;
                        this.updateUserText = this.$t('m.tip.update_failed')
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    }
</script>

<style lang="scss">
    .user-detail {
        .content {
            .margin-top-20 {
                margin-top: 20px;
            }
        }

    }
</style>

