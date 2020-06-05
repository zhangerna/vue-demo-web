<template>
    <div class="animated fadeIn point-detail">
        <b-card>
            <div slot="header">
                {{ $t("m.cloud.test_point_info") }}
                <b-button class="btn btn-sm btn-info float-right" style="color: #fff" @click="$router.push('/test-drive/test-point/edit/' + $route.params.id)">{{ $t("m.common.edit") }} </b-button>
            </div>
            <div class="content">
                <b-card>
                    <div slot="header">
                        {{ $t("m.cloud.test_point_info") }}
                    </div>
                    <div class="content">
                        <div class="row">
                            <div class="col-sm-6">
                                <b-list-group>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.lots.name2") }}
                                        <div>{{ data.parkingName ? data.parkingName : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.cloud.drive_dealership") }}
                                        <div>{{ data.tenantName ? data.tenantName : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.cloud.vehicle_store_name") }}
                                        <div>{{ data.storeName ? data.storeName : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.common.contact_person") }}
                                        <div>{{ data.parkingContactName ? data.parkingContactName : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.common.contact_phone") }}
                                        <div>{{ data.parkingContactPhone ? data.parkingContactPhone : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.add_shop.country") }}
                                        <div>{{ data.parkingCountryName ? data.parkingCountryName : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.add_shop.state") }}
                                        <div>{{ data.parkingStateName ? data.parkingStateName : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.add_shop.city") }}
                                        <div>{{ data.parkingCityName ? data.parkingCityName : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.add_shop.area") }}
                                        <div>{{ data.parkingAreaName ? data.parkingAreaName : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.add_shop.label_address") }}
                                        <div>{{ data.address ? data.address : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.common.address_des") }}
                                        <div>{{ data.parkingAddressDesc ? data.parkingAddressDesc : "N/A" }}</div>
                                    </b-list-group-item>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        {{ $t("m.common.create_time") }}
                                        <div>{{ data.createTime ? getDateString2(data.createTime) : "N/A" }}</div>
                                    </b-list-group-item>
                                </b-list-group>
                            </div>
                            <div class="col-sm-6">  
                                <div>
                                    <myMap type="test_point" :elementId="'test-point'" :map="map"></myMap>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </b-card>
                <p class="text-center" style="margin-bottom: 4px;color:#f86c6b">{{ $t("m.cloud.del_point1") }}</p>
                <p class="text-center" style="color:#f86c6b">{{ $t("m.cloud.del_point2") }}</p>
                <div class="text-center">
                    <button class="btn btn-sm btn-danger btn-del" @click="delPoint">{{ $t("m.cloud.delete") }}</button>
                </div>
            </div>
        </b-card>
        <model :show="show" :title="$t('m.cloud.insert_repeat_title')" :content="$t('m.tip.confirm_del_vehicle')" :buttonText="btnGroup" @closeRemindBox="hideTip"></model>
    </div>
</template>

<style lang="scss">
.point-detail {
    #map {
        height: 40vh;
    }
}
</style>

<script>
import httpClient from "@/utils/httpclient";
import model from "@/components/model";
import myMap from "@/components/map";
import { getDateString2 } from "@/utils/date";
export default {
    name: "testPointDetail",
    components: {
        myMap,
        model
    },
    data() {
        return {
            data: {},
            map: {},
            show: false,
            btnGroup: {
                btnFirst: this.$t("m.tip.b_cancel"),
                btnSecond: this.$t("m.tip.b_ok")
            }
        };
    },
    mounted() {
        this.initData();
    },
    methods: {
        initData() {
            httpClient.get("/api/v1/clouddrive/parkinglot/detail?parkingid=" + this.$route.params.id).then(res => {
                if (res.data.code == 200 && res.data.data) {
                    this.data = res.data.data;
                    this.map = {
                        lat: res.data.data.centerCoordinate.split(" ")[1],
                        lng: res.data.data.centerCoordinate.split(" ")[0],
                        area: res.data.data.areaCoordinate,
                        vehicleInfo: {}
                    };
                }
            });
        },
        delPoint() {
            this.show = true;
        },
        hideTip(type) {
            if (type) {
                httpClient
                    .post("/api/v1/lot/delete", {
                        id: this.$route.params.id
                    })
                    .then(response => {
                        if (response.data.code == 200) {
                            this.$router.push("/test-drive/test-point/list");
                        }
                    });
            }
            this.show = false;
        },
        getDateString2(time) {
            return getDateString2(time);
        }
    }
};
</script>
