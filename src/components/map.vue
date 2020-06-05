<template>
    <div class="map-modal-custom">
        <div class="gaode-fullscreen"
             @click="showMapTip" v-if="$store.getters.userInfo.country && ($store.getters.userInfo.country == 'China' || $store.getters.userInfo.country == '中国') && type != 'model'">
            <img src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%20018%2018%22%3E%0A%20%20%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%2C0v2v4h2V2h4V0H2H0z%20M16%2C0h-4v2h4v4h2V2V0H16z%20M16%2C16h-4v2h4h2v-2v-4h-2V16z%20M2%2C12H0v4v2h2h4v-2H2V12z%22%2F%3E%0A%3C%2Fsvg%3E%0A"
                 style="height: 18px;width: 18px">
        </div>
        <b-modal ref="my-modal" v-model="showMap" :cancel-title="$t('m.tip.b_cancel')" :ok-title="$t('m.tip.b_ok')"
                 @ok="showMap = false" class="show-map show-google-gaode">
            <a-map :type="type" :elId="'model-map'"  :map="map"></a-map>
        </b-modal>
        <a-map v-if="$store.getters.userInfo.country && ($store.getters.userInfo.country == 'China' || $store.getters.userInfo.country == '中国')" :type="type" :elId="elementId"  :map="map"></a-map>
        <g-map v-if="!$store.getters.userInfo.country || ($store.getters.userInfo.country != 'China' && $store.getters.userInfo.country != '中国')" :type="type" :map="map"></g-map>
    </div>
</template>

<style lang="scss" scoped>
    .map-modal-custom {
        .show-map .modal-dialog {
            height: 600px;
            max-width: 80%;
        }
        .gaode-fullscreen{
            background: #ffffff; width: 30px;height: 30px;text-align: center;line-height: 30px;
            position: absolute;
            z-index: 1;
            right: 6px;
            top: 6px;
        }
        .gm-style .gm-style-iw-d {
            max-width: 280px!important;
            img {
                width: 100%;
            }
        }
    }
</style>

<script>
    export default {
        name: "myMap",
        props: ["map","elementId", "type"],
        components: {
            gMap: function (resolve) {
                require(["@/components/gmap"], resolve)
            },
            aMap: function (resolve) {
                require(["@/components/amap"], resolve)
            }
        },
        data() {
            return {
                showMap: false
            }
        },
        methods: {
            showMapTip() {
                this.showMap = true;
            }
        }
    }
</script>
