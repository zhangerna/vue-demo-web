<template>
    <div>
        <a-map v-if="$store.getters.userInfo.country && ($store.getters.userInfo.country == 'China' || $store.getters.userInfo.country == '中国')" :data="data"></a-map>
        <g-map v-if="!$store.getters.userInfo.country || ($store.getters.userInfo.country != 'China' && $store.getters.userInfo.country != '中国')" :data="data"></g-map>
    </div>
</template>

<script>
    export default {
        name: 'testDrawMap',
        props: ['data'],
        components: {
            gMap: function (resolve) {
                require(["./testPointGMap"], resolve)
            },
            aMap: function (resolve) {
                require(["./testPointAMap"], resolve)
            }
        }
    }
</script>
