<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-12">
                <div class="card custom-header">
                    <div class="card-header">
                        {{ $t('m.admin.edit_user') }}
                    </div>

                    <div class="card-body">
                        <div class="spec-tip">
                            <p class="margin0 red">{{ $t('m.admin.user_manager_1') }}</p>
                            <p class="margin0 red">{{ $t('m.admin.user_manager_2') }}</p>
                            <p class="red">{{ $t('m.admin.user_manager_3') }}</p>
                        </div>
                        <div class="row">
                            <div class="col-sm-12 col-md-6 col-lg-6">
                                <b-form-group :label="$t('m.common.first_name')" label-align-sm="top" class="mb-0">
                                    <b-input disabled :value="firstName"></b-input>
                                </b-form-group>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-6">
                                <b-form-group :label="$t('m.common.last_name')" label-align-sm="top" class="mb-0">
                                    <b-input disabled :value="lastName"></b-input>
                                </b-form-group>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <b-form-group :label="$t('m.common.user_email')" label-align-sm="top" class="mb-0">
                                    <b-input disabled :value="userEmail"></b-input>
                                </b-form-group>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <b-form-group :label="$t('m.common.contact_phone')" label-align-sm="top" class="mb-0">
                                    <b-input disabled :value="phone"></b-input>
                                </b-form-group>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-sm-12 col-md-6 col-lg-6 option-choose">
                                <b-form-group :label="$t('m.common.role')" label-align-sm="top">
                                    <select class="form-control" name=""  v-model="selected1">
                                        <option v-for="(item, index) in options1" :key="index" :value="item.id">{{item.name}}</option>
                                    </select>
                                </b-form-group>
                            </div>

                            <div class="col-sm-12 col-md-6 col-lg-6 option-choose">
                                <b-form-group :label="$t('m.admin.detail_status')" label-align-sm="top">
                                    <select class="form-control" name=""  v-model="selected2" :disabled=" activeStatus ">
                                        <option v-for="(item, index) in options2" :key="index" :value="item.id">{{item.name}}</option>
                                    </select>
                                </b-form-group>
                            </div>
                        </div>

                        <div class="text-center">
                            <b-button class="btn-sm" variant="primary" @click="saveData">{{ $t('m.admin.save') }}</b-button>
                        </div>

                        <Alert @closeRemindBox='closeBox' :buttonText="showAlerts.buttonText" :show="showAlerts.show"
                               :title="showAlerts.title" :content="showAlerts.content">
                        </Alert>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .card-body {
        .red {
            color: #f86c6b;
        }
        .margin0 {
            margin-bottom: 0px;
        }
        .row {
            margin-bottom: 20px;
        }

        .custom-select:disabled {
            color: #73818f;
            background-color: unset;
        }

    }
</style>

<script>
    import httpClient from '@/utils/httpclient';
    import Alert from '@components/model'

    export default {
        name: 'adminEdit',
        components: {
            Alert
        },
        data() {
            return {
                id: this.$route.params.id,
                activeStatus:'',
                accountRole:'',
                userName: '',
                firstName: '',
                lastName: '',
                userEmail: '',
                phone: '',
                adminId: 0,
                status: 1,
                role: '',
                detailRole:'',
                options1: [
                    {
                        id: "Dealership Staff",
                        name: this.$t('m.common.user')
                    },
                    {
                        id: "Dealership Manager",
                        name: this.$t('m.common.manager')
                    },
                    {
                        id: "Dealership Group Administrator",
                        name: this.$t('m.common.root')
                    }
                ],
                selected1: '',
                options2: [
                    {
                        id: "Active",
                        name: this.$t('m.common.active')
                    },
                    {
                        id: "InActive",
                        name: this.$t('m.common.inactive')
                    }
                ],
                selected2: '',
                showAlerts: {
                    title: '',
                    content: '',
                    show: false,
                    buttonText: ''
                }
            }
        },
        mounted() {
            this.adminId = this.$store.state.userInfo.userId;
            let url = '/api/v1/getUserById';
            httpClient.post(url, {userId: this.id}).then((res) => {
                let data = res.data.data;
                this.detailRole = data.role;
                this.userName = data.firstName + data.lastName;
                this.firstName = data.firstName;
                this.lastName = data.lastName;
                this.userEmail = data.userEmail;
                this.phone = data.phone;
                let temp = data.status === 1 ? 'Active' : 'InActive';
                this.status = temp;
                this.role = localStorage.getItem('role');

                if(this.role === 'root'){
                    this.activeStatus = false
                }else if(this.role === 'manager'){
                    this.activeStatus = !this.detailRole.includes('Staff')
                }

                //初始化role 和 status的下拉选择
                let i = this.options1.filter((val) => val.id === data.role);
                this.selected1 = i[0].id;
                let j = this.options2.filter((item) => item.id === temp);
                this.selected2 = j[0].id;
            });
        },
        methods: {
            saveData() {
                let link = '/api/v1/updateUser';
                let userRole;
                if (this.selected1 === 'Dealership Staff') {
                    userRole = 'user'
                } else if (this.selected1 === 'Dealership Manager') {
                    userRole = 'manager'
                } else {
                    userRole = 'root'
                }
                let data = {
                    userId: this.id,
                    role: userRole,
                    status: this.selected2 === 'Active' ? 1 : 0
                };
                httpClient.post(link, data).then((res) => {
                    if (res.data.code === 200) {
                        let passData = {
                            title: this.$t('m.vehicle.actions_remind'),
                            show: true,
                            content: this.$t('m.admin.save_success'),
                            buttonText: {
                                btnFirst: '',
                                btnSecond: this.$t('m.tip.confirm'),
                                userId: ''
                            }
                        };
                        this.closeRemind(passData);
                    }
                }).catch(res => {
                    let passData = {
                        title: this.$t('m.vehicle.actions_remind'),
                        show: true,
                        content: this.$t('m.cloud.no_access'),
                        buttonText: {
                            btnFirst: '',
                            btnSecond: this.$t('m.tip.confirm'),
                            userId: ''
                        }
                    };
                    this.closeRemind(passData);
                })
            },
            closeBox() {
                this.$router.push('/manager-user/detail/' + this.$route.params.id)
            },
            closeRemind(data) {
                this.showAlerts.show = data.show;
                this.showAlerts.title = data.title;
                this.showAlerts.content = data.content;
                this.showAlerts.buttonText = data.buttonText;
            },
        }
    }
</script>
