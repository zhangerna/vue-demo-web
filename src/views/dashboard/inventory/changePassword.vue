<template>
    <div class="animated fadeIn change-password">
        <b-card header="Change Password">
            <div class="main">
                <b-form-group>
                    <label>{{ $t('m.change_password.old') }}</label>
                    <b-form-input v-model="oPassword" type="password" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <label>{{ $t('m.change_password.new') }}</label>
                    <b-form-input v-model="nPassword" type="password" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <label>{{ $t('m.change_password.confirm') }}</label>
                    <b-form-input v-model="cPassword" type="password" required></b-form-input>
                </b-form-group>
                <b-form-group>
                    <button class="btn btn-primary" @click="savePassword">
                        {{ $t('m.common.b_save') }}
                    </button>
                </b-form-group>
            </div>
        </b-card>
        <b-modal ref="my-modal" :title="errorInfo" v-model="showTip" @ok="showTip = false">
        </b-modal>
    </div>
</template>

<style lang="scss">
    .change-password {
        .main {
            width: 60%;
        }
        .modal-body {
            display: none;
        }
        .modal-footer {
            .btn-secondary {
                display: none;
            }
        }
    }
</style>

<script>
    import httpclient from '@/utils/httpclient'
    export default {
        name: "changePassword",
        data() {
            return {
                oPassword: '',
                nPassword: '',
                cPassword: '',
                showTip: false,
                errorInfo: ''
            }
        },
        methods: {
            savePassword () {
                if (!this.oPassword || !this.nPassword || !this.cPassword) {
                    this.errorInfo = this.$t('m.tip.profile_requied');
                    this.showTip = true;
                    return;
                }
                if (this.nPassword.length < 6) {
                    this.errorInfo = this.$t('m.tip.new_password_err');
                    this.showTip = true;
                    return;
                }
                if (this.nPassword != this.cPassword) {
                    this.errorInfo = this.$t('m.tip.twist_diff');
                    this.showTip = true;
                    return;
                }

                if (this.oPassword && this.nPassword && this.cPassword) {
                    httpclient.post('/api/v1/user/updatePassword', {
                        oldPassword: this.oPassword,
                        newPassword: this.nPassword,
                        confirmPassword: this.cPassword
                    }).then(response => {
                        this.$router.push('/login')
                    })
                }
            }
        }
    }
</script>
