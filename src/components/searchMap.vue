<template>
    <div>
        <a-map v-if="$store.getters.userInfo.country && ($store.getters.userInfo.country == 'China' || $store.getters.userInfo.country == '中国')" :elId="elementId"  :map="map" :from="from"></a-map>
        <g-map v-if="!$store.getters.userInfo.country || ($store.getters.userInfo.country != 'China' && $store.getters.userInfo.country != '中国')" :map="map" :from="from"></g-map>
    </div>
</template>

<style lang="scss">
    #map {
        height: 70vh;
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
        name: "searchMap",
        props: ["map","elementId", "from"],
        components: {
            gMap: function (resolve) {
                require(["@/components/searchMapForGoogle"], resolve)
            },
            aMap: function (resolve) {
                require(["@/components/searchMapForGaoDe"], resolve)
            }
        }
    }
</script>
