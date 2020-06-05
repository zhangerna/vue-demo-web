<template>
    <div class="animated fadeIn shop-detail">
        <b-card>
            <div slot="header">
                {{ $t('m.add_shop.manager_detail') }}
                <button class="btn btn-info btn-sm active float-right font-weight-bold color-white"
                        @click="$router.push('/inventory/shop-manager/edit/' + $route.params.id)">{{ $t('m.common.edit') }}
                </button>
            </div>
            <b-row>
                <b-col sm="6" class="left">
                    <div class="border">
                        <b-row>
                            <b-col sm="12" lg="12" class="title">
                                {{ data.storeName }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.add_shop.country') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ $i18n.locale == "en-US" ?  (data.countryEn ? data.countryEn : 'N/A') : (data.country ? data.country : 'N/A')  }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.add_shop.state') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ $i18n.locale == "en-US" ?  (data.stateEn ? data.stateEn : 'N/A') : (data.state ? data.state : 'N/A') }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.add_shop.city') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ $i18n.locale == "en-US" ?  (data.cityEn ? data.cityEn : 'N/A') : (data.city ? data.city : 'N/A') }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.add_shop.area') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ $i18n.locale == "en-US" ?  (data.areaEn ? data.areaEn : 'N/A') : (data.area ? data.area : 'N/A') }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.add_shop.street') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.streetAddress }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.add_shop.address') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.storeAddress }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.add_shop.zip') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.zipCode }}
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col sm="4" lg="4">
                                {{ $t('m.add_shop.stock') }}
                            </b-col>
                            <b-col sm="8" lg="8">
                                {{ data.vehicleInventory }}
                            </b-col>
                        </b-row>
                        <template v-for="(item, key) in data.userList">
                            <div :key="key">
                                <b-row>
                                    <b-col sm="4" lg="4">
                                        {{ $t('m.add_shop.manager') }}
                                    </b-col>
                                    <b-col sm="8" lg="8">
                                        {{ item.firstName + item.lastName }}
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="4" lg="4">
                                        {{ $t('m.admin.email') }}
                                    </b-col>
                                    <b-col sm="8" lg="8">
                                        {{ item.userEmail }}
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col sm="4" lg="4">
                                        {{ $t('m.common.contact_phone') }}
                                    </b-col>
                                    <b-col sm="8" lg="8">
                                        {{ item.userPhone }}
                                    </b-col>
                                </b-row>
                            </div>
                        </template>
                    </div>
                </b-col>
                <b-col sm="6" class="right">
                    <my-map :address="data.country + data.state + data.city + data.area+ data.streetAddress + data.storeAddress "></my-map>
                </b-col>
            </b-row>
            <div class="del-group text-center">
                <p>{{ $t('m.detail_shop.del_p') }}</p>
                <button class="btn btn-danger" @click="removeData(data.id)">{{ $t('m.detail_shop.del_b') }}</button>
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
    import httpclient from '@/utils/httpclient';
    import myMap from "@/components/mapForAddress";
    import model from "@/components/model";

    export default {
        name: "shopDetail",
        components: {
            myMap,
            model
        },
        data() {
            return {
                address: "",
                data: {},
                showTip: false,
                title: '',
                content: '',
                curDel: null,
                btnGroup: {},
                times: 0
            }
        },
        mounted() {
            if (this.$route.params.id) {
                httpclient.get("/api/v1/store/detail?storeId=" + this.$route.params.id, {
                }).then((res) => {
                    if (res.data.code == 200) {
                        this.data = res.data.data;
                    }
                });
            }
        },
        methods: {
            closeBox(type) {
                if (type) {
                    this.times = this.times + 1;
                    this.title = this.$t('m.tip.warn');
                    this.content = this.$t('m.detail_shop.del2');
                    if (this.times == 2) {
                        httpclient.post("/api/v1/store/delete", {
                            storeId: this.curDel
                        }).then((res) => {
                            if (res.data.code == 200 && res.data.data.result) {
                                this.$router.push("/shop-manager")
                            } else {
                                this.showTip = true;
                                this.title = this.$t('m.tip.warn');
                                this.content = this.$t('m.edit_shop.no_delete');
                                this.btnGroup = {btnFirst: this.$t('m.tip.b_cancel')}
                            }
                        }).catch(err => {
                            this.showTip = false;
                            err
                        });
                    }
                } else {
                    this.showTip = false;
                }
            },
            removeData(id) {
                this.times = 0;
                this.curDel = id;
                this.showTip = true;
                this.title = this.$t('m.tip.warn');
                this.content = this.$t('m.detail_shop.del1');
                this.btnGroup = {btnFirst: this.$t('m.tip.b_cancel'), btnSecond: this.$t('m.tip.b_ok')}
            }
        }
    }
</script>

<style lang="scss" scoped>

    .shop-detail {
        .row {
            padding: .75rem 1.25rem;
        }

        .title {
            font-size: 18px;
            color: #63c2de;
        }

        .card {
            margin: 0 auto;
        }

        .del-group {
            padding: 4px 0;
            margin-bottom: 20px;
        }

        .left {
            padding: 10px;
            padding-top: 0;
            .row {
                margin: 0px;
                border-bottom: 1px solid #23282c;
                padding: 10px;
            }

            .row > div {
                padding-left: 4px;
            }
        }
    }
</style>
