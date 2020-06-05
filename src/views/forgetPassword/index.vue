<template>
    <div class="animated fadeIn forget-password flex-row align-items-center">
        <div v-if="!showModel" class="container forget-password-content">
            <div class="row justify-content-center">
                <img src="@/assets/pages-img/logo.svg" width="50%">
            </div>
            <br />
            <div class="row justify-content-center">
                <b-col class="col-12">
                    <h2 class="text-muted">{{ $t('m.register.title') }}</h2>
                    <br />
                    <p class="text-muted">{{ $t('m.register.forget_password') }}</p>
                </b-col>
            </div>
            <div class="justify-content-center">
                <b-form-group>
                    <label>
                        <strong class="text-muted">{{ $t('m.admin.email') }}</strong>
                    </label>
                    <b-form-input v-model="email" type="text" :class="emailE ? 'is-invalid' : ''"></b-form-input>
                    <p class="error" v-show="emailE">{{ $t('m.no_login.input_email') }}</p>
                </b-form-group>
                <br />
                <div class="text-center">
                    <button class="btn btn-success" @click="submitEmail()">{{ $t('m.common.submit') }}</button>
                </div>
            </div>
        </div>
        <succ v-if="showModel"
              :btnGroup="btnGroup"
              :succInfo="succInfo"
              :icon="icon">
        </succ>
    </div>
</template>

<style lang="scss">
    .forget-password {
        .forget-password-content {
            max-width: 500px;
            text-align: left;
            margin-top: 20%;
        }
        .error {
            color: red;
        }
    }
</style>

<script>
    import httpClient from "@/utils/httpclient";
    import succ from "@/components/registStatus"
    export default {
        name: "forgetPassword",
        data() {
            return {
                email: "",
                emailE: "",
                succInfo: "We've sent a password reset link to your email address. Please click the link in the email to continue.",
                btnGroup: {
                },
                icon: "cui cui-envelope-letter",
                showModel: false
            }
        },
        components: {
            succ
        },
        methods: {
            submitEmail() {
                if (!this.email || (this.email.indexOf("@") <= 0)) {
                    this.emailE = true;
                } else {
                    this.emailE = false;
                    console.log(this.email);

                    httpClient.post('/api/v1/user/forgetpwd', {
                        userEmail: this.email
                    }).then(response => {
                        if(response.data.data){
                            this.showModel = true;
                        } else {
                            alert(response.data.msg);
                        }
                    }).catch((e) => {
                        alert('server is error');
                    })
                }
            }
        }

    }
</script>
