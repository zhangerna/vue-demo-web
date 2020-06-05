<template>
    <div class="map-modal-custom">
        <div class="gaode-fullscreen" @click="showMapTip" v-if="$store.getters.userInfo.country && ($store.getters.userInfo.country == 'China' || $store.getters.userInfo.country == '中国')">
            <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%20018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A" style="height: 18px;width: 18px" />
        </div>
        <b-modal  ref="my-modal" v-model="showMap" :cancel-title="$t('m.tip.b_cancel')" :ok-title="$t('m.tip.b_ok')" @ok="showMap = false" class="show-map show-google-gaode modal-dialog">
            <div id="map2"></div>
        </b-modal>
        <a-map v-if="$store.getters.userInfo.country && ($store.getters.userInfo.country == 'China' || $store.getters.userInfo.country == '中国')" :address="address"></a-map>
        <g-map v-if="!$store.getters.userInfo.country || ($store.getters.userInfo.country != 'China' && $store.getters.userInfo.country != '中国')" :address="address"></g-map>
    </div>
</template>

<script>
import AMap from "AMap";
export default {
    name: "mapForAddress",
    props: ["address"],
    components: {
        gMap: function(resolve) {
            require(["@/components/gmapForAddress"], resolve);
        },
        aMap: function(resolve) {
            require(["@/components/amapForAddress"], resolve);
        }
    },
    data() {
        return {
            showMap: false,
            address1: ""
        };
    },
    watch: {
        address(newVal) {
            this.address1 = newVal;
            // console.log(this.address1);
        }
    },
    methods: {
        showMapTip() {
            this.showMap = true;
            // console.log(2333);
            this.initMap();
        },
        initMap() {
            this.mapObj = new AMap.Map("map2", {
                zoom: 17
            });
            this.safeLayer = new AMap.TileLayer.Satellite({});
            this.roadLayer = new AMap.TileLayer.RoadNet({});
            this.mapObj.add(this.safeLayer);
            this.mapObj.add(this.roadLayer);
            this.safeLayer.hide();
            this.roadLayer.hide();

            this.geocoders = new AMap.Geocoder();
            this.geocoders.getLocation(this.address1, (status, result) => {
                if (status === "complete" && result.geocodes.length) {
                    this.markers = new AMap.Marker({
                        position: result.geocodes[0].location,
                        icon: new AMap.Icon({
                            image: "https://cdn.shopify.com/s/files/1/0703/1149/files/Store.svg?854352",
                            size: new AMap.Size(60, 60),
                            imageSize: new AMap.Size(20, 30)
                        })
                    });
                    this.mapObj.add(this.markers);
                    this.mapObj.setFitView(this.markers);
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
#map {
    height: 40vh;
    .gm-style .gm-style-iw-d {
        max-width: 280px !important;
        img {
            width: 100%;
        }
    }
}
#map2 {
    height: 70vh;
    // width: 30vw;
    .gm-style .gm-style-iw-d {
        max-width: 280px !important;
        img {
            width: 100%;
        }
    }
}
.map-modal-custom {
    height: 100%;
    .show-map .modal-dialog {
        max-width:50%;
        max-width: 80%;
    }
    .gaode-fullscreen {
        background: #ffffff;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        position: absolute;
        z-index: 1;
        right: 6px;
        top: 6px;
    }
    .gm-style .gm-style-iw-d {
        max-width: 280px !important;
        img {
            width: 100%;
        }
    }
}
.modal-dialog {
    position: absolute;
    top:20%;
    left:20%;
    max-width: 50% !important;
    width: 50% !important;
}
</style>
