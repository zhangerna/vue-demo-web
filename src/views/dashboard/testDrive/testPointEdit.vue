<template>
    <div class="animated fadeIn add-lots">
        <b-card :header="$t('m.common.edit_test_point')" class="custom-header">
            <div class="content">
                <point-map :data="data"></point-map>
            </div>
        </b-card>
    </div>
</template>

<style lang="scss">
</style>

<script>
    import httpClient from "@/utils/httpclient";
    import pointMap from "../component/testPointMap";
    export default {
        name: 'addTestPoint',
        components: {
            pointMap
        },
        data() {
            return {
                data: {}
            }
        },
        mounted() {
            httpClient.get('/api/v1/clouddrive/parkinglot/detail?parkingid=' + this.$route.params.id).then(res => {
                if (res.data.code == 200 && res.data.data) {
                    this.data = res.data.data;
                }
            });
        }
    }
</script>
