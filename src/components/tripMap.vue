<template>
    <div>
        <a-map v-if="$store.getters.userInfo.country && ($store.getters.userInfo.country == 'China' || $store.getters.userInfo.country == '中国')"  :map="map"></a-map>
        <g-map v-if="!$store.getters.userInfo.country || ($store.getters.userInfo.country != 'China' && $store.getters.userInfo.country != '中国')" :map="map"></g-map>
    </div>
</template>

<style lang="scss">
    #map {
        height: 30vh;
        .gm-style .gm-style-iw-d {
            img {
                width: 100%;
            }
        }
    }
</style>

<script>
    export default {
        name: "polygonMap",
        props: ["map"],
        components: {
            gMap: function (resolve) {
                require(["@/components/tripGMap"], resolve)
            },
            aMap: function (resolve) {
                require(["@/components/tripAMap"], resolve)
            }
        }
    }
</script>
