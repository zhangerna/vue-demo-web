<template>
    <div class="animated fadeIn lot-edit">
        <b-card class="custom-header">
            <div slot="header">
                {{ $t("m.lots.lot_detail") }}
                <div class="float-right">
                    <b-button class="btn btn-sm btn-info mr-2 text-white" @click="$router.push('/inventory/lots/edit/' + $route.params.id)">
                        {{ $t("m.common.edit") }}
                    </b-button>
                </div>
            </div>
            <b-row>
                <b-col class="col-6">
                    <b-form-group>
                        <label>{{ $t("m.lots.name") }}</label>
                        <b-form-input disabled type="text" v-model="parkingName"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label>{{ $t("m.common.contact_person") }}</label>
                        <b-form-input disabled type="text" v-model="parkingContactName"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label>{{ $t("m.common.contact_phone") }}</label>
                        <b-form-input disabled type="number" v-model="parkingContactPhone"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label>{{ $t("m.add_shop.country") }}</label>
                        <b-form-input disabled type="text" v-model="parkingCountryName"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label>{{ $t("m.add_shop.state") }}</label>
                        <b-form-input disabled type="text" v-model="parkingStateName"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label>{{ $t("m.add_shop.city") }}</label>
                        <b-form-input disabled type="text" v-model="parkingCityName"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label>{{ $t("m.add_shop.area") }}</label>
                        <b-form-input disabled type="text" v-model="parkingAreaName"></b-form-input>
                    </b-form-group>
                    <b-form-group>
                        <label>{{ $t("m.lots.address") }}</label>
                        <b-input-group>
                            <b-form-input disabled type="text" v-model="parkingAddress"></b-form-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group>
                        <label>{{ $t("m.common.address_des") }}</label>
                        <b-form-input disabled type="text" v-model="parkingAddressDesc"></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col class="col-6">
                    <div class="position-relative">
                        <myMap :map="map" :elementId="'lot-map'"></myMap>
                    </div>
                </b-col>
            </b-row>

            <b-row>
                <b-col class="col-12 text-center">
                    <b-button variant="danger" @click="delId(id)">{{ $t("m.cloud.delete") }}</b-button>
                </b-col>
            </b-row>
        </b-card>
        <model :show="show" :title="$t('m.tip.warn')" :content="$t('m.tip.delete_lot')" :buttonText="btnGroup" @closeRemindBox="hideTip"></model>
    </div>
</template>

<script>
import httpClient from "@/utils/httpclient";
import myMap from "@/components/map";
import model from "@/components/model";
export default {
    name: "lotDetail",
    components: {
        myMap,
        model
    },
    data() {
        return {
            data: null,
            show: false,
            id: this.$route.params.id,
            btnGroup: {
                btnFirst: this.$t("m.tip.b_cancel"),
                btnSecond: this.$t("m.tip.b_ok")
            },
            map: {},
            parkingName: "",
            parkingContactName: "",
            parkingContactPhone: "",
            parkingAddress: "",
            parkingAddressDesc: "",
            parkingCountryName: "",
            parkingStateName: "",
            parkingCityName: "",
            parkingAreaName: ""
        };
    },
    mounted() {
        httpClient
            .get("/api/v1/lot/detail", {
                params: {
                    id: this.id
                }
            })
            .then(response => {
                let myData = response.data.data;
                // this.data = response.data.data;
                this.parkingName = myData.parkingName || "N/A";
                this.parkingContactName = myData.parkingContactName || "N/A";
                this.parkingContactPhone = myData.parkingContactPhone || "N/A";
                this.parkingAddress = myData.address || "N/A";
                this.parkingAddressDesc = myData.parkingAddressDesc || "N/A";
                this.parkingCountryName = myData.parkingCountryName || "N/A";
                this.parkingStateName = myData.parkingStateName || "N/A";
                this.parkingCityName = myData.parkingCityName || "N/A";
                this.parkingAreaName = myData.parkingAreaName || "N/A";

                this.getVehicleList(this.$route.params.id, myData.areaCoordinate, myData.centerCoordinate);
            });
    },

    methods: {
        getVehicleList(id, area, centerCoor) {
            //初始化地图
            httpClient
                .get("/api/v1/inlotvehiclelist", {
                    params: {
                        parkingId: id
                    }
                })
                .then(response => {
                    let latlng = centerCoor.split(" ");
                    this.map = {
                        lat: Number(latlng[1]),
                        lng: Number(latlng[0]),
                        area: area,
                        vehicleInfo: response.data.data
                    };
                });
        },
        delId(id) {
            this.curDel = id;
            this.show = true;
        },
        hideTip(type) {
            if (type) {
                httpClient
                    .post("/api/v1/lot/delete", {
                        id: this.curDel
                    })
                    .then(() => {
                        this.$router.push("/inventory/lots/list");
                    });
            }
            this.show = false;
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
