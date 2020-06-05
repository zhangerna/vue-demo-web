<template>
    <div class="animated fadeIn add-lots">
        <b-card :header="$t('m.cloud.add_test_point')">
            <div class="content">
                <point-map></point-map>
            </div>
        </b-card>
    </div>
</template>

<style lang="scss">
</style>

<script>
    import pointMap from "../component/testPointMap";
    export default {
        name: 'addTestPoint',
        components: {
            pointMap
        },
        data() {
            return {
            }
        },
    }
</script>
