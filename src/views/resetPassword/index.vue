<template>
    <div class="animated fadeIn reset-password">
        <div v-if="status == 3" class="container form-password flex-row align-items-center">
            <div class="justify-content-center">
                <div class="row justify-content-center">
                    <img src="@/assets/pages-img/logo.svg" width="50%">
                </div>
                <br />
                <h2 class="text-center text-muted">{{ $t('m.login.title') }}</h2>
                <p class="text-muted">{{ $t('m.no_login.input_password') }}</p>
                <div>
                    <b-form-group>
                        <label>
                            <strong>{{ $t('m.no_login.new_password') }}</strong>
                        </label>
                        <b-form-input v-model="password" type="password" :class="passwordE ? 'is-invalid' : ''"></b-form-input>
                        <p class="error" v-show="passwordE">{{ $t('m.no_login.password_require') }}</p>
                    </b-form-group>
                    <b-form-group>
                        <label>
                            <strong>{{ $t('m.no_login.confirm_password') }}</strong>
                        </label>
                        <b-form-input v-model="nPassword" type="password" :class="passwordNE ? 'is-invalid' : ''"></b-form-input>
                        <p class="error" v-show="passwordNE"></p>
                    </b-form-group>
                    <button class="btn btn-success" type="button" @click="submitForm">{{ $t('m.common.submit') }}</button>
                </div>
            </div>
        </div>
        <succ v-if="status && status != 3"
              :btnGroup="btnGroup"
              :errInfo="errInfo"
              :succInfo="succInfo">
        </succ>
    </div>
</template>

<style lang="scss">
    .reset-password {
        .form-password {
            max-width: 600px;
            text-align: center;
            margin-top: 20%;
            .form-control {
                max-width: 70%;
                margin: 0 auto;
            }
            .error {
                color: red;
            }
        }
    }
</style>

<script>
    import httpClient from "@/utils/httpclient";
    import succ from "@/components/registStatus";
    export default {
        name: "registerCheckSuccess",
        components: {
            succ
        },
        data() {
            return {
                errInfo: "",
                btnGroup: {
                },
                nPassword: '',
                password: '',
                passwordE: false,
                passwordNE: false,
                userId: '',
                succInfo: '',
                status: false
            }
        },
        mounted() {
            httpClient.post("/api/v1/user/resetpwdverification", {
                token: this.$route.query.token
            }).then(response => {
                if (response.data.data && response.data.code == 200) {
                    this.status = 3;
                    this.userId = response.data.data.id;
                } else {
                    this.errInfo = this.$t('m.register.link_expire');
                    this.status = 1;
                }
            }).catch(err => {
                this.errInfo = this.$t('m.register.link_expire');
                this.status = 1;
            })
        },
        methods: {
            submitForm() {
                if (!this.password || (this.password && this.password.length < 6)) {
                    this.passwordE = true;
                } else {
                    this.passwordE = false;
                }
                if (!this.nPassword || (this.nPassword && this.nPassword != this.password)) {
                    this.passwordNE = true;
                } else {
                    this.passwordNE = false;
                }
                if (!this.passwordNE && !this.passwordE) {
                    httpClient.post('/api/v1/user/resetpwd', {
                        userId: this.userId,
                        newPassword: this.password
                    }).then(response => {
                        if (response.data.data || response.data.code == 200) {
                            this.status = 2;
                            this.succInfo = "Congratulations, you have reset the password.";
                            this.btnGroup = {
                                btnFirst: "Login",
                                btnSecond: "Homepage"
                            }
                        } else {
                            this.errInfo = "Sorry,the link has been used or has expired.";
                            this.status = 1;
                        }
                    })
                }

            }
        }
    }
</script>
