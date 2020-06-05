<template>
    <div class="animated fadeIn add-shop">
        <b-card>
            <div slot="header">
                {{ $t('m.shop.add_shop') }}
            </div>
            <div class="container">
                
                <div class="content">
                    <b-row>
                        <b-col sm="12" md="12">
                            <div class="warn-info text-left">
                                <p>{{ $t('m.tip.note') }}: 1.{{ $t('m.add_shop.p1') }}</p>
                                <p class="content-p">2.{{ $t('m.add_shop.p2') }}</p>
                                <p class="content-p">3.{{ $t('m.add_shop.p3') }}</p>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" md="12">
                            <b-form-group>
                                <label><strong class="text-muted">{{ $t('m.shop.shop_name') }}</strong></label>
                                <b-form-input type="text" :class="nameE ? 'is-invalid' : ''"  v-model="name"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" md="12">
                            <b-form-group>
                                <b-row>
                                    <b-col sm="3">
                                        <label><strong class="text-muted">{{ $t('m.add_shop.country') }}</strong></label>
                                        <select class=" form-control" v-model="country" :class="countryE ? 'is-invalid' : ''">
                                            <option value="" disabled selected>{{ $t('m.add_shop.please_select') }}</option>
                                            <option v-for="(item, key) in list" :key="key" :value="key + 1">{{ $i18n.locale == 'en-US' ? item.countryName : item.countryCName }}</option>
                                        </select>
                                    </b-col>
                                    <b-col sm="3">
                                        <label><strong class="text-muted">{{ $t('m.add_shop.state') }}</strong></label>
                                        <select class="form-control" v-model="state" :class="stateE ? 'is-invalid' : ''">
                                            <option value="" disabled selected>{{ $t('m.add_shop.please_select') }}</option>
                                            <option v-for="(item, key) in (country ? list[country - 1]['proviceList'] : [])" :value="key + 1" :key="key">{{ $i18n.locale == 'en-US' ? item.proviceName : item.proviceCName }}</option>
                                        </select>
                                    </b-col>
                                    <b-col sm="3">
                                        <label><strong class="text-muted">{{ $t('m.add_shop.city') }}</strong></label>
                                        <select class="form-control" v-model="city" :class="cityE ? 'is-invalid' : ''">
                                            <option value="" disabled selected>{{ $t('m.add_shop.please_select') }}</option>
                                            <option v-for="(item, key) in (country && state ? list[country - 1]['proviceList'][state - 1]['cityList'] : [] )" :value="key + 1" :key="key">{{ $i18n.locale == 'en-US' ? item.cityName : item.cityCName }}</option>
                                        </select>
                                    </b-col>
                                    <b-col sm="3">
                                        <label><strong class="text-muted">{{ $t('m.add_shop.area') }}</strong></label>
                                        <select class="form-control" v-model="area" :class="areaE ? 'is-invalid' : ''">
                                            <option value="" disabled selected>{{ $t('m.add_shop.please_select') }}</option>
                                            <option v-for="(item, key) in (country && state && city ? list[country - 1]['proviceList'][state - 1]['cityList'][city - 1]['areaDTOList'] : [] )" :value="key + 1" :key="key">{{ $i18n.locale == 'en-US' ? item.areaName : item.areaCName }}</option>
                                        </select>
                                    </b-col>
                                </b-row>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" md="12">
                            <label><strong class="text-muted">{{ $t('m.add_shop.label_address') }}</strong></label>
                            <b-form-group>
                                <b-form-input type="text" :class="streetE ? 'is-invalid' : ''" v-model="street" :placeholder="$t('m.add_shop.street_info')"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" md="12">
                            <b-form-group>
                                <b-form-input type="text" :class="apartE ? 'is-invalid' : ''" v-model="apartment" :placeholder="$t('m.add_shop.apartInfo')"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="12" md="12">
                            <b-form-group>
                                <b-form-input type="text" :class="zipE ? 'is-invalid' : ''" v-model="zipCode" :placeholder="$t('m.add_shop.zip')"></b-form-input>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <div class="admin-info">
                        <b-row v-for="(item, index) in managerList" :key="index">
                            <b-col sm="4" md="4">
                                <b-form-group>
                                    <div><strong class="text-muted">{{ $t('m.add_shop.manager') + (index+1) }}</strong></div>
                                    <label><strong class="text-muted">{{ $t('m.add_shop.manager_email') }}</strong></label>
                                    <b-form-input type="email" :class="hasSubmit && (!managerList[index]['email'] || managerList[index]['email'].indexOf('@') < 0)  ? 'is-invalid' : '' "  v-model="managerList[index]['email']"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col sm="4" md="4">
                                <b-form-group>
                                    <div><strong class="text-muted">&nbsp;</strong></div>
                                    <label><strong class="text-muted">{{ $t('m.add_shop.manager_phone') }}</strong></label>
                                    <b-form-input type="number" :class="hasSubmit && !managerList[index]['phone'] ? 'is-invalid' : '' "  v-model="managerList[index]['phone']"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col sm="2" md="2">
                                <b-form-group>
                                    <div><strong class="text-muted">&nbsp;</strong></div>
                                    <label><strong class="text-muted">{{ $t('m.common.first_name') }}</strong></label>
                                    <b-form-input type="text" :class="hasSubmit && !managerList[index]['firstName'] ? 'is-invalid' : '' "  v-model="managerList[index]['firstName']"></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col sm="2" md="2">
                                <b-form-group>
                                    <div><strong class="text-muted">&nbsp;</strong></div>
                                    <label><strong class="text-muted">{{ $t('m.common.last_name') }}</strong></label>
                                    <b-form-input type="text" :class="hasSubmit && !managerList[index]['lastName'] ? 'is-invalid' : '' "  v-model="managerList[index]['lastName']"></b-form-input>
                                </b-form-group>
                                <div class="add">
                                    <i style="font-size: 20px;margin-right: 10px;" @click="addAdmin" class="fa fa-plus-square"></i>
                                    <i style="font-size: 20px;color: red" v-if="index != 0" @click="reduceAdmin(index)" class="fa fa-minus-square"></i>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                    <div class="text-center">
                        <button class="btn btn-sm btn-primary" @click="insertData()" :disabled="buttonStatus">
                            {{ $t('m.common.b_save') }}
                        </button>
                    </div>
                </div>
            </div>
        </b-card>
        <model
                :show="showTip"
                :title="title"
                :content="info"
                :buttonText="btnGroup"
                @closeRemindBox="closeBox"
        ></model>
    </div>
</template>

<script>
    import httpClient from "@/utils/httpclient";
    import model from "@/components/model";
    export default {
        name: "addShop",
        components: {
            model
        },
        data() {
            return {
                btnGroup: {
                    btnSecond:this.$t('m.tip.confirm')
                },
                showTip: false,
                title: "",
                info: "",
                name: "",
                list: [],
                country: '',
                state: '',
                city: '',
                area: '',
                street: "",
                areaE: false,
                cityE: false,
                stateE: false,
                countryE: false,
                apartment: "",
                zipCode: "",
                buttonStatus: false,
                zipE: false,
                apartE: false,
                streetE: false,
                nameE: false,
                hasSubmit: false,
                managerE: false,
                managerList: [
                    {
                        email: "",
                        phone: "",
                        lastName: "",
                        firstName: ""
                    }
                ]
            }
        },
        mounted () {
            httpClient.get("/api/v1/getprovicescitynew").then((res) => {
                if (res.data.code == 200) {
                    this.list = res.data.data.countryList;
                    this.list.splice(1)
                }
            })
        },
        methods: {
            closeBox(type){
                if (type) {
                    this.$router.push('/inventory/shop-manager/list');
                }
            },
            addAdmin() {
                this.managerList.push(
                    {
                        email: "",
                        phone: "",
                        lastName: "",
                        firstName: ""
                    }
                )
            },
            reduceAdmin(index) {
                this.managerList.splice(index, 1);
            },
            checkData() {
                this.hasSubmit = true;
                this.nameE = this.name ? false : true;
                this.zipE = this.zipCode ? false : true;
                this.streetE = this.street ? false : true;
                this.apartE = this.apartment ? false : true;
                this.countryE = this.country ? false : true;
                this.stateE = this.state ? false : true;
                this.cityE = this.city ? false : true;
                this.areaE = this.area ? false : true;
                for (let item of this.managerList) {
                    if (!item.email || item.email.indexOf("@") < 0 || !item.phone || !item.lastName || !item.firstName) {
                        this.managerE = true;
                    }
                }

            },
            insertData() {
                console.log(1)
                this.buttonStatus = true;
                console.log(this.buttonStatus)
                this.checkData();
                if (!this.nameE && !this.zipE && !this.streetE && !this.apartE && !this.managerE && !this.countryE && !this.stateE && !this.cityE&& !this.areaE) {
                    console.log(2)
                    httpClient.post('/api/v1/store/insert', {
                        insertSaasTenantStoreDTO: {
                            areaCode: this.list[this.country - 1]['proviceList'][this.state - 1]['cityList'][this.city - 1]['areaDTOList'][this.area - 1].areaId,
                            cityCode: this.list[this.country - 1]['proviceList'][this.state - 1]['cityList'][this.city - 1].cityId,
                            countryCode: this.list[this.country - 1].countryId,
                            stateCode: this.list[this.country - 1]['proviceList'][this.state - 1].provicesId,
                            storeAddress: this.apartment,
                            storeName: this.name,
                            streetAddress: this.street,
                            zipCode: this.zipCode
                        },
                        inviteUserParamDTO: this.managerList
                    }).then((res) => {
                        res
                        this.showTip = true;
                        this.title = this.$t('m.tip.suc');
                        this.info = this.$t('m.tip.save_succ');
                    })
                } else {
                    this.buttonStatus = false;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .warn-info {
        padding: 2px;
        color: #c00;
        text-align: left;
        p {
            margin-bottom: 4px;
        }
    }
    .is-invalid {
        border: 1px solid red;
    }
    .container {
        .content {
            width: 60%;
            margin: 0 auto;
            padding-top: 20px;
            position: relative;
            .content-p{
                padding-left: 1.5em
            }
        }
        .add {
            position: absolute;
            right: -50px;
            margin-top: -44px;
            width: 50px;
            .add-icon {
                color: #ffffff;
                background: black;
                padding: 3px 4px;
                border-radius: 50%;
            }
        }
    }
</style>
