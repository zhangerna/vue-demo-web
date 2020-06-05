<template>
    <div class="animated fadeIn register">
        <div class="register-top text-center">
            <b-row>
                <b-col sm="12" md="12" lg="12">
                    <img src="@/assets/pages-img/logo.svg" width="30%">
                    <h3 class="text-muted">Increase Efficiency and Profitability</h3>
                    <h3>Sign Up</h3>
                    <p class="text-muted">Fill in the information below to complete the registration.</p>
                </b-col>
            </b-row>
        </div>
        <div class="register-form">
            <b-row>
                <b-col sm="6">
                    <b-form-group>
                        <label><strong class="text-muted">First Name</strong></label>
                        <b-form-input type="text" v-model="firstName" :class="firstE ? 'is-invalid' : ''"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col sm="6">
                    <b-form-group>
                        <label><strong class="text-muted">Last Name</strong></label>
                        <b-form-input type="text" v-model="lastName" :class="lastE ? 'is-invalid' : ''"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" md="12">
                    <b-form-group>
                        <label><strong class="text-muted">Email</strong></label>
                        <b-form-input type="text" v-model="email" :class="emailE ? 'is-invalid' : ''"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" md="12">
                    <b-form-group>
                        <label><strong class="text-muted">Set Password</strong></label>
                        <b-form-input type="password" v-model="password" minlength="6" :class="passwordE ? 'is-invalid' : ''" @blur="checkPassword()"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" md="12">
                    <b-form-group>
                        <label><strong class="text-muted">Confirm Password</strong></label>
                        <b-form-input type="password" v-model="confirmP" @blur="checkConfirmPa()" :class="confirmpE ? 'is-invalid' : ''"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" md="12">
                    <b-form-group>
                        <label><strong class="text-muted">Phone</strong></label>
                        <b-form-input type="text" v-model="phone" @blur="checkInput()" :class="phoneE ? 'is-invalid' : ''"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <br />
            <b-row>
                <b-col sm="12" md="12">
                    <b-form-group>
                        <label><strong class="text-muted">Dealership Group</strong></label>
                        <b-form-input type="text" v-model="dGroup" @blur="checkInput()" :class="dGroupE ? 'is-invalid' : ''"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" md="12">
                    <b-form-group>
                        <label><strong class="text-muted">Dealership Name</strong></label>
                        <b-form-input type="text" @blur="checkInput()" v-model="dName" :class="dNameE ? 'is-invalid' : ''"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" md="12">
                    <b-form-group>
                        <label><strong class="text-muted">Dealership Address</strong></label>
                        <b-row>
                            <b-col sm="4">
                                <select class=" form-control" v-model="country" :class="countryE ? 'is-invalid' : ''">
                                    <option value="" disabled selected>Please Select</option>
                                    <option v-for="(item, key) in list" :key="key" :value="key + 1">{{ item.countryName }}</option>
                                </select>
                            </b-col>
                            <b-col sm="4">
                                <select class="form-control" v-model="state" :class="stateE ? 'is-invalid' : ''">
                                    <option value="" disabled selected>{{ $t('m.add_shop.please_select') }}</option>
                                    <option v-for="(item, key) in (country ? list[country - 1]['proviceList'] : [])" :value="key + 1" :key="key">{{ item.proviceName}}</option>
                                </select>
                            </b-col>
                            <b-col sm="4">
                                <select class="form-control" v-model="city" :class="cityE ? 'is-invalid' : ''">
                                    <option value="" disabled selected>{{ $t('m.add_shop.please_select') }}</option>
                                    <option v-for="(item, key) in (country && state ? list[country - 1]['proviceList'][state - 1]['cityList'] : [] )" :value="key + 1" :key="key">{{ item.cityName }}</option>
                                </select>
                            </b-col>
                        </b-row>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" md="12">
                    <b-form-group>
                        <b-form-input type="text" v-model="street" @blur="checkInput()" :class="streetE ? 'is-invalid' : ''" placeholder="Street and number, P.O. box, c/o."></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" md="12">
                    <b-form-group>
                        <b-form-input type="text" v-model="apartment" @blur="checkInput()" :class="apartE ? 'is-invalid' : ''" placeholder="Apartment, suite, unit, building, floor, etc."></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" md="12">
                    <b-form-group>
                        <b-form-input type="text" v-model="zipCode" @blur="checkInput()" :class="zipE ? 'is-invalid' : ''" placeholder="Zip Code"></b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col sm="12" md="12">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" @click="choiceRule()" checked>
                        <label> Agree to the Privacy Policy and Terms of Service</label>
                    </div>
                </b-col>
            </b-row>
            <button class="btn btn-block btn-success btn-create" :disabled="disable" @click="submitData()">Create Account</button>
        </div>
        <model
                :show="show"
                :title="'Error'"
                :content="content"
                :buttonText="btnGroup"
                @closeRemindBox="show = false"
        ></model>
    </div>
</template>

<style lang="scss">
    .is-invalid {
        border: 1px solid red;
    }
    .register {
        max-width: 500px;
        margin: 4% auto;
        .register-top {
            h3 {
                margin-top: 4%;
            }
        }
        .custom-control {
            text-align: center;
        }
        .btn-create {
            margin-top: 2%;
        }
        .custom-control-input {
            z-index: 1;
            opacity: 1;
            position: relative;
            margin-right: 4px;
        }
    }
</style>

<script>
    import httpClient from "@/utils/httpclient";
    import model from "@/components/model";
    export default {
        name: "register",
        components: {
            model
        },
        data() {
            return {
                show: false,
                btnGroup: {
                    btnFirst: "Cancel",
                    btnSecond:'OK'
                },
                content: "",
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmP: "",
                phone: "",
                dGroup: "",
                dName: "",
                country: "",
                state: "",
                city: "",
                check: true,
                list: [],
                street: "",
                apartment: "",
                zipCode: "",
                disable: true,
                cityE: false,
                stateE: false,
                countryE: false,
                firstE: false,
                lastE: false,
                passwordE: false,
                confirmpE: false,
                status: true,
                emailE: false,
                phoneE: false,
                dGroupE: false,
                dNameE: false,
                streetE: false,
                apartE: false,
                zipE: false
            }
        },
        mounted() {
            this.initData()
        },
        watch: {
            firstName(newV) {
                this.firstName = newV;
                this.checkInput();
            },
            lastName(newV) {
                this.lastName = newV;
                this.checkInput();
            }
        },
        methods: {
            initData() {
                httpClient.get("/api/v1/getprovicescity").then((res) => {
                    if (res.data.code == 200) {
                        this.list = res.data.data.countryList;
                    }
                })
            },
            choiceRule() {
                this.check = !this.check;
                this.checkInput();
            },
            checkInput() {
                this.status = true;
                if (!this.firstName || !this.lastName || !this.email || !this.password ||
                    !this.confirmP || !this.phone || !this.dGroup || !this.dName || !this.country
                    || !this.state || !this.city || !this.check ) {
                    this.disable = true;
                    this.status = false;
                }
                !this.firstName ? this.firstE = true : this.firstE = false;
                !this.lastName ? this.lastE = true : this.lastE = false;
                !this.email || (this.email && this.email.indexOf("@") < 0) ? this.emailE = true : this.emailE = false;
                !this.phone || (this.phone && this.phone.length > 15) ? this.phoneE = true : this.phoneE = false;
                !this.dGroup ? this.dGroupE = true : this.dGroupE = false;
                !this.dName ? this.dNameE = true : this.dNameE = false;
                this.countryE = this.country ? false : true;
                this.stateE = this.state ? false : true;
                this.cityE = this.city ? false : true;

                this.checkPassword();
                this.checkConfirmPa();

                if (this.status) {
                    this.disable = false;
                }
            },
            checkPassword() {
                if (this.password && this.password.length < 6) {
                    this.passwordE = true;
                    this.status = false;
                } else {
                    this.passwordE = false;
                }
            },
            checkConfirmPa() {
                if ( (this.confirmP && this.confirmP.length < 6) ||  this.password != this.confirmP) {
                    this.confirmpE = true;
                    this.status = false;
                } else {
                    this.confirmpE = false;
                }
            },
            submitData() {
                this.checkInput();
                if (this.status) {
                    httpClient.post('/api/v1/manager/reg', {
                        userEmail: this.email,
                        password: this.password,
                        firstName: this.firstName,
                        lastName: this.lastName,
                        phone: this.phone,
                        storeName: this.dName,
                        storeAddress: this.apartment,
                        tenantName: this.dGroup,
                        country: this.list[this.country - 1].countryName,
                        countryCode: this.list[this.country - 1].countryId,
                        stateCode: this.list[this.country - 1]['proviceList'][this.state - 1].provicesId,
                        cityCode: this.list[this.country - 1]['proviceList'][this.state - 1]['cityList'][this.city - 1].cityId,
                        city: this.list[this.country - 1]['proviceList'][this.state - 1]['cityList'][this.city - 1].cityName,
                        streetAddress: this.street,
                        zipCode: this.zipCode,
                        state: this.list[this.country - 1]['proviceList'][this.state - 1].provicesName,
                    }).then(response => {
                        if (response.data.data && response.data.data == "ok" && response.data.code == 200) {
                            this.$router.push("/register-success");
                        } else {
                            this.show = true;
                            this.content = response.data.msg;
                        }
                    }).catch(error => {
                        window.location.reload();
                    })
                }
            }
        }
    }
</script>
