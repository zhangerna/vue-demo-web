<template>
    <div class="animated fadeIn bind-vehicle">
        <b-card>
            <div slot="header">
                {{ $t('m.vehicle_bind.title') }}
            </div>
            <div class="content">
                <b-row class="step">
                    <b-col sm="4">
                        <button class="btn btn-sm mx-3 px-4" :class="step1 ? 'btn-success' : 'btn-secondary'" style="padding-left: 0px;padding-right: 0px">
                            <strong>{{ $t('m.vehicle_bind.step1') }}</strong><br />
                            {{ $t('m.vehicle_bind.step1_des') }}
                        </button>
                    </b-col>
                    <b-col sm="4">
                        <button class="btn btn-sm mx-3 px-4" :class="step2 ? 'btn-success' : 'btn-secondary'">
                            <strong>{{ $t('m.vehicle_bind.step2') }}</strong><br />
                            {{ $t('m.vehicle_bind.step2_des') }}
                        </button>
                    </b-col>
                    <b-col sm="4">
                        <button class="btn btn-sm mx-3 px-4" :class="step3 ? 'btn-success btn-sm' : 'btn-secondary'">
                            <strong>{{ $t('m.vehicle_bind.step3') }}</strong><br />
                            {{ $t('m.vehicle_bind.step3_des') }}
                        </button>
                    </b-col>
                </b-row>
                <div class="step-info step1" v-if="step1">
                    <b-form-group>
                        <label>{{ $t('m.vehicle_bind.imei') }}</label>
                        <b-form-input type="text" v-model="deviceId" :placeholder="$t('m.common.enter') + $t('m.vehicle_bind.imei')" :class="imeiIsVaild ? 'is-invalid' : ''" :disabled="imeiDisable" maxlength="15"></b-form-input>
                        <p v-show="imeiIsVaild" class="warn-imei">{{ $t('m.common.imei') + $t('m.vehicle_bind.invalid') }}</p>
                        <p v-show="imeiSuccess" class="primary-imei">{{ $t('m.common.imei') + $t('m.vehicle_bind.valid') }}</p>
                    </b-form-group>
                    <div class="next-btn">
                        <b-button type="submit" :disabled="step1Button" class="btn-sm btn-success justify-content-center" @click="clickStep1">{{ $t('m.vehicle_bind.next') }}</b-button>
                    </div>

                </div>
                <div class="step-info step2" v-if="step2">
                    <b-row>
                        <b-col sm="6">
                            <b-form-group>
                                <label>{{ $t('m.vehicle_bind.imei') }}</label>
                                <b-form-input type="text" v-model="deviceId" :placeholder="$t('m.common.enter') + $t('m.vehicle_bind.imei')" disabled maxlength="15"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group>
                                <label>{{ $t('m.common.vin3') }}</label>
                                <b-form-input type="text" v-model="vin" :placeholder="$t('m.common.enter') + $t('m.common.vin3')" maxlength="17" :class="vinIsVaild ? 'is-invalid' : ''" :disabled="vinDisable"></b-form-input>
                                <p v-show="vinIsVaild" class="warn-imei">{{ $t('m.common.vin3') + $t('m.vehicle_bind.invalid') }}</p>
                                <p v-show="vinSuccess" class="primary-imei">{{  $t('m.common.vin3') + $t('m.vehicle_bind.valid') }}</p>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <vehicle-form
                            v-if="isClickStep2"
                            :vehicleInfo="data2"
                            @showStep3="showStep3"
                    >
                    </vehicle-form>
                    <div class="text-center" v-if="!isClickStep2">
                        <b-button type="submit" :disabled="step2Button" class="btn-sm btn-success">{{ $t('m.common.submit') }}</b-button>
                    </div>
                </div>
                <div class="step-info step3" v-if="step3">
                    <b-row class="justify-content-center">
                        <span class="font-144">
                            <i class="cui cui-check"></i>
                        </span>
                    </b-row>
                    <p class="text-center">{{ $t('m.vehicle_bind.install_completed') }}</p>
                    <b-row class="justify-content-center">
                        <b-col sm="4" md="4" xs="12">
                            <button class="btn btn-block btn-outline-success" @click="$router.push('/index')">{{ $t('m.vehicle_bind.dashboard') }}</button>
                        </b-col>
                        <b-col sm="4" md="4" xs="12">
                            <button class="btn btn-block btn-outline-success" @click="reloadPage()">{{ $t('m.vehicle_bind.continue') }}</button>
                        </b-col>
                        <b-col sm="4" md="4" xs="12">
                            <button class="btn btn-block btn-outline-success" @click="$router.push('/inventory/vehicle/detail/' + vehicleId)">{{ $t('m.vehicle_bind.detail') }}</button>
                        </b-col>
                    </b-row>
                </div>
            </div>
        </b-card>
        <model
                :show="showTip"
                :title="title"
                :content="content"
                :buttonText="btnGroup"
                @closeRemindBox="closeBox"
        ></model>
    </div>
</template>

<script>
    import httpClient from "@/utils/httpclient";
    import VehicleForm from "@/components/vehicleForm";
    import model from "@/components/model";
    export default {
        name: "bindVehicle",
        inject: ["reload"],
        components: {
            VehicleForm,
            model
        },
        data() {
            return {
                step1: true,
                step2: false,
                step3: false,
                deviceId: null,
                step1Button: true,
                imeiIsVaild: false,
                imeiSuccess: false,
                imeiDisable: false,
                step2Button: true,
                title: '',
                data1: {},
                data2: null,
                showTip: false,
                vin: '',
                vinDisable: false,
                vinIsVaild: false,
                vinSuccess: false,
                isClickStep2: false,
                vehicleId: '',
                btnGroup: {btnFirst:'Cancel', btnSecond: 'OK'},
                content: '',
                err: false
            }
        },
        watch: {
            deviceId(newV) {
                if (newV.length == 15) {
                    this.deviceId = newV;
                    this.imeiDisable = this.err ? false : true;
                    this.imeiIsVaild = false;
                    this.imeiSuccess = true;
                    this.step1Button = false;
                } else {
                    this.imeiIsVaild = true;
                }
            },
            vin(newV) {
                if (newV.length == 17) {
                    this.vin = newV;
                    this.vinDisable = true;
                    this.vinIsVaild = false;
                    this.vinSuccess = false;
                    this.step2Button = false;
                    this.clickStep2();
                } else {
                    this.vinDisable = false;
                    this.vinIsVaild = true;

                }
            }
        },
        mounted() {
            if (this.$route.query.deviceMac) {
                this.step1 = false;
                this.step2 = true;
                this.deviceId = this.$route.query.deviceMac;
            }
        },
        methods: {
            closeBox(type){
                if (type && (this.btnGroup.btnSecond == 'Unpair' || this.btnGroup.btnSecond == '解绑')) {
                    this.unbind(this.data1);
                }
                if (type && this.btnGroup.status == 'vin') {
                    this.unbind(this.data2);
                }
                this.showTip = false;
            },
            reloadPage() {
                window.location.reload();
            },
            unbind(data) {
                httpClient.post('/api/v1/vehicle/unbind/device', {
                    deviceMac: data.deviceMac,
                    vin: data.vin
                }).then(response => {
                    if (response.data.code == 200) {
                        if (this.step2) {
                            window.location.reload();
                        }
                        this.vin = '';
                        this.vinDisable = false;
                        this.vinIsVaild = false;
                        this.vinSuccess = false;
                        this.step2Button = true;
                        this.showTip = false;
                        this.step1 = false;
                        this.step2 = true;
                    } else {
                        window.location.reload();
                    }
                })
            },
            clickStep2() {
                httpClient.get('/api/v1/vehicle/detail/vin?vin=' + this.vin, {
                }).then(response => {
                    this.data2 = response.data.data;
                    this.data2.mac = this.deviceId;
                    if (this.data2.deviceMac == '') {
                        this.isClickStep2 = true;
                        this.vinSuccess = false;
                    } else {
                        this.title = this.$t('m.tip.warn');
                        this.content = this.$t('m.tip.vehicle_pair_warn', {imei: response.data.data.deviceMac});
                        this.btnGroup = {btnFirst:this.$t('m.tip.b_cancel'), btnSecond: this.$t('m.common.b_unpair'), status: 'vin'};
                        this.showTip = true;
                        this.vinDisable = false;
                    }
                }).catch(err => {
                    this.data2 = err.response.data.data;
                    this.title = this.$t('m.tip.warn');
                    this.content = this.$t('m.tip.vehicle_pair_warn', {imei: err.response.data.data.deviceMac});
                    this.btnGroup = {btnFirst:this.$t('m.tip.b_cancel'), btnSecond: this.$t('m.common.b_unpair'), status: 'vin'};
                    this.showTip = true;
                    this.vinDisable = false;
                })
            },
            showStep3(data) {
                this.step1 = false;
                this.step2 = false;
                this.step3 = true;
                this.vehicleId = data.vehicleId;
            },
            clickStep1() {
                httpClient.post('/api/v1/device/vehiceldetail/mac', {
                    deviceMac: this.deviceId
                }).then(response => {
                    this.data1 = response.data.data;
                    if (this.data1.vin == ''){
                        this.step1 = false;
                        this.step2 = true;
                    } else {
                        this.title = this.$t('m.tip.warn');
                        this.content = this.$t('m.tip.vehicle_pair_vin', {year: response.data.data.year, make: response.data.data.make, model: response.data.data.model, vin: response.data.data.vin})
                        this.btnGroup = {btnFirst:this.$t('m.tip.b_cancel'), btnSecond: this.$t('m.common.b_unpair')};
                        this.showTip = true;
                    }
                }).catch(err => {
                    if (!err.response.data.data) {
                        this.err = true;
                        this.imeiDisable = false;
                        this.imeiSuccess = false;
                        this.title = this.$t('m.tip.warn');
                        this.content = err.response.data.msg;
                        this.btnGroup = {btnSecond: this.$t('m.tip.b_ok')};
                        this.showTip = true;
                    } else {
                        this.data1 = err.response.data.data;
                        if (this.data1.vin == ''){
                            this.step1 = false;
                            this.step2 = true;
                        } else {
                            this.err = true;
                            this.imeiDisable = false;
                            this.imeiSuccess = false;
                            this.title = this.$t('m.tip.warn');
                            this.content = this.content = this.$t('m.tip.vehicle_pair_vin', {year: err.response.data.data.year, make: err.response.data.data.make, model: err.response.data.data.model, vin: err.response.data.data.vin})
                            this.btnGroup = {btnFirst:this.$t('m.tip.b_cancel'), btnSecond: this.$t('m.common.b_unpair')};
                            this.showTip = true;
                        }
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bind-vehicle {
        .modal {
            .modal-footer {
                border-top: 0;
            }
        }
        .font-144 {
            font-size: 144px;
        }
        .content {
            max-width: 660px;
            margin: 0 auto;
            .step {
                button {
                    width: 100%;
                }
                button:first-child {
                    margin-left: 0 !important;
                }
            }
            .step1 {
                max-width: 300px;
                margin: 10% auto 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .next-btn{
                    display: flex;
                    justify-content: center;
                    margin-bottom: 5px;
                }
                input {
                    max-width: 300px;
                }
            }
            .step2 {
                margin-top: 6%;
                .row {
                    margin-left: 0px!important;
                }
                button {
                    margin-left: 15px;
                }
            }
            .warn-imei {
                color: #f86c6b;
                font-size: 12px;
                margin-top: 4px;
            }
            .primary-imei {
                color: #4dbd74;
                font-size: 12px;
                margin-top: 4px;
            }
        }
    }
</style>

