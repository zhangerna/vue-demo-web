<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-header "> {{ $t('m.admin.add_users') }}</div>
                    <div class="card-body" style="">
                        <div class="pb-3 text-secondary">{{ $t('m.admin.invite_p') }}
                            {{storeName}}</div>
                        <div class="pb-3" style="font-size: 12px">{{ $t('m.admin.send_content') }} </div>
                        <div class="form-input">
                            <div class="form-group col-md-6" v-for="(item,i) in emails" :key="i">
                                <b-input-group class="mt-3">
                                    <b-input-group-text slot="prepend"><i class="fa fa-envelope"></i></b-input-group-text>
                                    <b-form-input v-model="item.name" type="email" @change="verifyEmail(item.name)"></b-form-input>
                                </b-input-group>
                            </div>
                        </div>
                        <div class="form-group col-md-8" id="plusUserDiv" style="margin-top:-48px;margin-left:48%">
                            <div class="input-group-append col-md-4" @click="addInputBox">
                    <span class="input-group-text" id="plusUserBtn">
                      <i class="fa fa-plus"></i>
                    </span>
                            </div>
                        </div>
                        <div class="form-group form-actions col-6">
                            <b-button class="btn btn-info text-white" @click="getAllEmails" :disabled="btnActive">{{ $t('m.common.b_save') }}</b-button>
                        </div>
                    </div>
                </div>
            </div>

            <Alert @closeRemindBox='closeBox' :buttonText="showAlerts.buttonText" :show="showAlerts.show"
                   :title="showAlerts.title" :content="showAlerts.content">
            </Alert>

        </div>


    </div>
</template>
<script>
    import httpClient from '@/utils/httpclient';
    import Alert from '@components/model'

    export default {
        name: 'adminInvite',
        components: {
            Alert
        },
        data() {
            return {
                emails: [
                    {
                        name: ''
                    },
                    {
                        name: '',
                    }
                ],
                btnActive: true,
                showAlerts: {
                    title: '',
                    content: '',
                    show: false,
                    buttonText: ''
                },
                storeName:'',
                opSave: false
            }
        },
        mounted(){
            httpClient.post('/api/v1/user/store').then((res)=>{
                this.storeName = res.data.data.storeName;
            })
        },
        methods: {
            addInputBox() {
                this.emails.push({name: ''});
            },
            getAllEmails() {
                let emailsArray = [];
                let url = '/api/v1/inviteUser';
                this.emails.map((item, i) => {
                    item.name.length ? emailsArray.push(item.name) : '';
                });
                httpClient.post(url, {emails: emailsArray.join(',')}).then((res) => {
                    if (res.data.code === 200) {
                        this.opSave = true;
                        this.showAlerts = {
                            title: this.$t('m.tip.suc'),
                            content: this.$t('m.tip.save_succ'),
                            show: true,
                            buttonText: {
                                btnSecond: this.$t('m.tip.b_ok'),
                            }
                        }
                    }
                })
            },
            verifyEmail(m) {//验证输入值，合法才可以提交
                let reg = /^.*@\w+(\.\w+)+/;
                if (!reg.test(m)) {
                    let passData = {
                        title: this.$t('m.tip.add_user_invite'),
                        show: true,
                        content: this.$t('m.tip.add_user_invalid_email'),
                        buttonText: {
                            btnFirst: '',
                            btnSecond: this.$t('m.tip.b_ok'),
                            userId: ''
                        }
                    };
                    this.closeRemind(passData);
                } else {
                    this.btnActive = false
                }
            },
            closeBox() {
                if (this.opSave) {
                    this.$router.push('/manager-user/list');
                }
                this.showAlerts.show = !this.showAlerts.show;
            },
            closeRemind(data) {
                this.showAlerts.show = data.show;
                this.showAlerts.title = data.title;
                this.showAlerts.content = data.content;
                this.showAlerts.buttonText = data.buttonText;
            },
        },
    }
</script>
<style lang="scss" scoped>
    #plusUserDiv {
        cursor: pointer;
    }
</style>
