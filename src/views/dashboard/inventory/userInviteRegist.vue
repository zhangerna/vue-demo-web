<template>
    <div class="animated fadeIn">
        <div class="invite-register" v-if="!showResult">
            <b-row>
                <b-col sm="12" lg="12" class="text-center">
                    <img src="../../../assets/pages-img/logo.svg" width="200" alt="" />
                </b-col>
                <b-col sm="12" lg="12">
                    <p class="text-muted text-center title">
                        {{ $t("m.cloud.invite_user_title") }}
                    </p>
                </b-col>
                <b-col sm="12" lg="12">
                    <div class="text-muted text-center" style="margin-bottom: 10px">
                        {{ $t("m.cloud.user_invite_desc", { name: user.name, store: user.lot }) }}<br />
                        {{ $t("m.cloud.user_invite_fill") }}
                    </div>
                </b-col>
            </b-row>

            <div class="form-submit">
                <b-row>
                    <b-col class="full-width" sm="6" lg="6">
                        <label class="text-muted">{{ $t("m.common.first_name") }}</label>
                        <b-form-input class="form-control" type="text" :state="firstNameState" v-model="firstName"></b-form-input>
                    </b-col>
                    <b-col class="full-width" sm="6" lg="6">
                        <label class="text-muted">{{ $t("m.common.last_name") }}</label>
                        <b-form-input class="form-control" type="text" :state="lastNameState" v-model="lastName"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" lg="12">
                        <label class="text-muted">{{ $t("m.admin.email") }}</label>
                        <b-form-input disabled class="form-control" type="email" v-model="user.email"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" lg="12">
                        <label class="text-muted">{{ $t("m.register.set") }}</label>
                        <b-form-input class="form-control" type="password" :state="setPassWordState" v-model="setPassWord"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" lg="12">
                        <label class="text-muted">{{ $t("m.register.confirm") }}</label>
                        <b-form-input class="form-control" :state="confirmPassWordState" type="password" v-model="confirmPassWord"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12" lg="12">
                        <label class="text-muted">{{ $t("m.common.contact_phone") }}</label>
                        <b-form-input class="form-control" :state="phoneState" type="number" v-model="phone"></b-form-input>
                    </b-col>
                </b-row>
                <b-row>
                    <!--                    <b-form-checkbox class="input-check" v-model="status" value="accepted"-->
                    <!--                                     unchecked-value="not_accepted">-->
                    <!--                        Agree to the Privacy Policy and Terms of Service-->
                    <!--                    </b-form-checkbox>-->
                </b-row>
                <b-row>
                    <b-col sm="12" lg="12" class="margin-submit">
                        <b-button variant="success" class="btn col-12 " @click="saveInviteData">{{ $t("m.common.submit") }}</b-button>
                    </b-col>
                </b-row>
            </div>
        </div>

        <div v-if="showResult">
            <registerStatus id="after-result" :btnGroup="btnGroup" :errInfo="errInfo" :succInfo="succInfo"></registerStatus>
        </div>

        <Alert @closeRemindBox="closeBox()" :buttonText="showAlerts.buttonText" :show="showAlerts.show" :title="showAlerts.title" :content="showAlerts.content"></Alert>
    </div>
</template>
<script>
import httpClient from "@/utils/httpclient";
import Alert from "@components/model";
import registerStatus from "@components/registStatus";

export default {
    name: "userInviteRegister",
    components: {
        Alert,
        registerStatus
    },
    data() {
        return {
            firstName: "",
            lastName: "",
            setPassWord: "",
            confirmPassWord: "",
            phone: "",
            status: "accepted",
            showResult: false,
            showAlerts: {
                title: "",
                show: false,
                content: "",
                buttonText: ""
            },
            user: {
                name: "",
                lot: "",
                email: ""
            },
            btnGroup: {
                btnFirst: "Login",
                btnSecond: "Homepage"
            },
            errInfo: "",
            succInfo: "",
            icon: "",
            valueLength: "",
            language: "44", //226是美国
            inviteData: {}
        };
    },
    mounted() {
        let token = window.location.search.split("token=")[1];
        //let token = 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZW5hbnRJZCI6ImJkMzM1MGJhMWRmZDQ4Njg5MTc5MTE3YWExNTY5ZTk5IiwiZW1haWwiOiJ3ZWltaW5Abm9uZGEudXMiLCJzdWIiOiJiZDMzNTBiYTFkZmQ0ODY4OTE3OTExN2FhMTU2OWU5OV93ZWltaW5Abm9uZGEudXMiLCJleHAiOjE1NjI4Mzc0ODN9.DDntzh__-hj25PHzpazZCm9iUyFR-yv2VPUdbgmBQpU';
        this.inviteRegister(token)
            .then(res => {
                if (res.data.code === 200) {
                    let data = res.data.data;
                    this.firstName = data.inviteFirstName ? data.inviteFirstName : "";
                    this.lastName = data.inviteLastName ? data.inviteLastName : "";
                    this.phone = data.invitePhone ? data.invitePhone : "";
                    this.user.name = data.firstName + " " + data.lastName;
                    this.user.lot = data.storeName;
                    this.user.email = data.inviteEmail;
                } else if (res.data.code === 400) {
                    let passData = {
                        title: this.$t("m.register.sign_up"),
                        show: true,
                        content: this.$t("m.cloud.register_verify_failed"),
                        buttonText: {
                            btnFirst: "",
                            btnSecond: this.$t("m.tip.b_ok")
                        }
                    };
                    this.closeRemind(passData);
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    computed: {
        firstNameState() {
            return this.firstName.length > 0;
        },
        lastNameState() {
            return this.lastName.length > 0;
        },
        setPassWordState() {
            return this.setPassWord.length > 5;
        },
        confirmPassWordState() {
            return this.confirmPassWord.length > 5;
        },
        phoneState() {
            return this.phone.length > 7;
        }
    },
    methods: {
        inviteRegister(token) {
            return httpClient.post("/api/v1/user/inviteLinkVerification", {
                token: token
            });
        },
        GetRequest() {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = {};
            if (url.indexOf("?") !== -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
                }
            }
            return theRequest;
        },
        saveInviteData() {
            this.checkThePassWord(this.postData);
        },
        checkThePassWord(cb) {
            //检验两次密码，是否勾选
            if (this.firstName === "" || this.lastName === "" || this.setPassWord === "" || this.confirmPassWord === "" || this.phone === "") {
                let passData = {
                    title: this.$t("m.register.sign_up"),
                    show: true,
                    content: this.$t("m.cloud.fill_in_all_in"),
                    buttonText: {
                        btnFirst: "",
                        btnSecond: this.$t("m.tip.b_ok")
                    }
                };
                this.closeRemind(passData);
            } else if (this.confirmPassWord !== this.setPassWord) {
                let passData = {
                    title: this.$t("m.register.sign_up"),
                    show: true,
                    content: this.$t("m.tip.password_confirm_error"),
                    buttonText: {
                        btnFirst: "",
                        btnSecond: this.$t("m.tip.b_ok")
                    }
                };
                this.closeRemind(passData);
                this.confirmPassWord = "";
            } else {
                cb();
            }

            // else if (this.status !== 'accepted') {//判断是否勾选协议，暂时去掉
            //         let passData = {
            //             title: 'Register',
            //             show: true,
            //             content: 'Please Check Our Privacy Policy and Terms of Service',
            //             buttonText: {
            //                 btnFirst: '',
            //                 btnSecond: 'OK'
            //             }
            //         };
            //         this.closeRemind(passData);
            //     }
        },
        postData() {
            let data = {
                firstName: this.firstName,
                lastName: this.lastName,
                password: this.confirmPassWord,
                phone: this.phone,
                userEmail: this.user.email
            };
            let token = this.GetRequest().token;
            let link = "/api/v1/user/reg?token=" + token;
            httpClient.post(link, data).then(res => {
                if (res && res.data.code === 400) {
                    this.showResult = !this.showResult;
                    this.errInfo = this.$t("m.tip.user_already");
                    this.succInfo = "";
                    this.icon = "fa fa-close";
                } else {
                    this.showResult = !this.showResult;
                    this.errInfo = "";
                    this.succInfo = this.$t("m.cloud.register_success_login", { store: this.user.lot });
                    this.icon = "cui cui-check";
                }
            });
        },
        closeRemind(data) {
            this.showAlerts.show = data.show;
            this.showAlerts.title = data.title;
            this.showAlerts.content = data.content;
            this.showAlerts.buttonText = data.buttonText;
        },
        closeBox() {
            //子组件来请求父组件关闭弹窗
            this.showAlerts.show = !this.showAlerts.show;
        }
    }
};
</script>
<style lang="scss" scoped>
.invite-register {
    margin: 40px auto;
    max-width: 440px;

    .title {
        margin: 10px 0;
        font-size: 28px;
    }
}

.form-submit {
    label {
        margin-top: 10px;
    }
}

.input-check {
    margin: 10px auto;
}

.contain {
    transform: translateX(-50%);
    position: absolute;
    left: 50%;
    top: 20px;

    .col-lg-6 {
        flex: 0 0 100%;
        max-width: 100%;
    }

    .full-width {
        flex: 0 0 50% !important;
    }
}
.margin-submit {
    margin-top: 20px;
}
</style>
