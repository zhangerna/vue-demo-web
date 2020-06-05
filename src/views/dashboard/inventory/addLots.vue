<template>
    <div class="animated fadeIn add-lots">
        <b-card :header="$t('m.lots.b_add')">
            <div class="content">
                <draw-map></draw-map>
            </div>
        </b-card>
    </div>
</template>

<style lang="scss">
</style>

<script>
    import drawMap from "@/components/drawMap";
    export default {
        name: 'addLots',
        components: {
            drawMap
        },
        data() {
            return {
            }
        },
    }
</script>
