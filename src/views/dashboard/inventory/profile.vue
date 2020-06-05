<template>
    <div class="animated fadeIn profile-content">
        <b-card :header="$t('m.dashboard.profile')" class="profile">
            <div class="content">
                <div class="group-img">
                    <img :src="img" width="160px" height="160px" />
                    <input type="file"  @change="savefile($event)" accept="image/jpeg,image/png,image/jpg,image/svg,image/svg+xml" />
                    <!-- <div class="icon-camera  camera"></div> -->
                </div>
                <div>
                    <b-form-group>
                        <label for="email">{{ this.$t("m.admin.email") }}</label>
                        <b-form-input v-model="email" id="email" type="email" required disabled autocomplete="email"></b-form-input>
                    </b-form-group>
                    <b-row style="padding-left: 0px;">
                        <b-col sm="6">
                            <b-form-group>
                                <label for="firstname">{{ $t("m.common.first_name") }}</label>
                                <b-form-input v-model="firstname" id="firstname" type="text" :placeholder="$t('m.common.enter') + $t('m.common.first_name')" required></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-form-group>
                                <label for="lastname">{{ $t("m.common.last_name") }}</label>
                                <b-form-input v-model="lastname" id="lastname" type="text" :placeholder="$t('m.common.enter') + $t('m.common.last_name')" required></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-form-group>
                        <label for="phone">{{ $t("m.common.contact_phone") }}</label>
                        <b-form-input v-model="phone" id="phone" type="text" required></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label for="Role">{{ $t("m.common.role") }}</label>
                        <b-form-input v-model="role" id="role" type="text" disabled required></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label>{{ $t("m.common.dealership") }}</label>
                        <b-form-input v-model="dealship" type="text" disabled required></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label>{{ $t("m.common.deal_group") }}</label>
                        <b-form-input v-model="dealGroup" type="text" disabled required></b-form-input>
                    </b-form-group>
                </div>
                <b-row class="text-center">
                    <b-col>
                        <button class="btn btn-primary" @click="saveUserInfo">
                            {{ $t("m.admin.save") }}
                        </button>
                        <button class="btn btn-ghost-danger" @click="$router.push('/change-password')">
                            {{ $t("m.common.change_password") }}
                        </button>
                    </b-col>
                </b-row>
            </div>
        </b-card>
        <b-modal ref="globalModal" :title="$t('m.vehicle.actions_remind')" v-model="showTip" :ok-title="$t('m.tip.b_ok')" ok-only @ok="showTip = false">
            <p v-text="pText"></p>
        </b-modal>

        <b-modal ref="globalModal" :title="$t('m.vehicle.actions_remind')" v-model="showETip" :ok-title="$t('m.tip.b_ok')" ok-only @ok="showETip = false">
            <p>{{ this.$t("m.tip.update_failed") }}</p>
        </b-modal>
    </div>
</template>

<style lang="scss">
.profile {
    .content {
        max-width: 600px;
        margin: 0 auto;
        img {
            border-radius: 50%;
            cursor: pointer;
        }
        .group-img {
            position: relative;
            margin-bottom: 20px;
            text-align: center;
            input {
                opacity: 0;
                width: 160px;
                height: 160px;
                border-radius: 50%;
                position: absolute;
                z-index: 1;
                // margin-left: -160px;
                left: 50%;
                top: 50%;
                cursor: pointer;
                transform: translate(-50%,-50%);
            }
            .camera {
                color:#000;
                font-size: 40px;
                position: absolute;
                left: 56%;
                top: 70%;
                cursor: pointer;
            }
        }
        .btn-ghost-danger {
            margin-left: 20px;
        }
    }
}
</style>

<script>
import httpclient from "@/utils/httpclient";
export default {
    name: "profile",
    inject: ["reload"],
    data() {
        return {
            data: null,
            email: "",
            firstname: "",
            lastname: "",
            phone: "",
            role: "",
            dealGroup: "",
            dealship: "",
            img: "",
            showTip: false,
            showETip: false,
            pText: ''
        };
    },
    mounted() {
        this.img = this.$store.state.userInfo.avatarUrl;
        httpclient
            .post("/api/v1/getUserById", {
                userId: this.$store.state.userInfo.userId
            })
            .then(response => {
                this.email = response.data.data.userEmail ? response.data.data.userEmail : "";
                this.firstname = response.data.data.firstName;
                this.lastname = response.data.data.lastName;
                this.phone = response.data.data.phone;
                this.role = response.data.data.role;
                this.dealship = response.data.data.storeName;
                this.dealGroup = response.data.data.tenantName;
            });
    },
    methods: {
        savefile(event) {
            let file = event.target.files;
            let fb = new FormData();
            fb.append("image", file[0]);
            httpclient.post("/api/v1/user/updateAvatar", fb).then(response => {
                if (response.data.code === 200) {
                    this.img = response.data.data.avatarUrl;
                    let userPersonInfo = {
                        avatarUrl: this.img,
                        firstName: this.firstname,
                        lastName: this.lastname
                    };
                    this.$store.dispatch("user_Personal_Info", userPersonInfo); //更新store内用户信息
                    let storeData = JSON.parse(localStorage.getItem("user_info")); //更新localstorage内用户信息
                    storeData.avatarUrl = this.img;
                    localStorage.setItem("user_info", JSON.stringify(storeData));
                    this.showTip = true;
                    this.pText =  this.$t("m.admin.upload_success") 
                } else {
                    this.showETip = true;
                }
            });
        },
        saveUserInfo() {
            if (this.firstname && this.lastname && this.phone) {
                httpclient
                    .post("/api/v1/updateuserdetail", {
                        firstName: this.firstname,
                        lastName: this.lastname,
                        userPhone: this.phone
                    })
                    .then(res => {
                        if (res.data.code === 200) {
                            let userPersonInfo = {
                                avatarUrl: this.img,
                                firstName: this.firstname,
                                lastName: this.lastname
                            };
                            this.$store.dispatch("user_Personal_Info", userPersonInfo);
                            let storeData = JSON.parse(localStorage.getItem("user_info"));
                            storeData.firstName = this.firstname;
                            storeData.lastName = this.lastname;
                            localStorage.setItem("user_info", JSON.stringify(storeData));
                            this.showTip = true;
                            this.pText =  this.$t("m.admin.save_success") 
                            
                        }
                    })
                    .catch(() => {
                        this.showETip = true;
                    });
            }
        }
    }
};
</script>
