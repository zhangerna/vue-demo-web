<template>
    <div class="animated fadeIn lot-edit">
        <b-card :header="$t('m.lots.edit_title')" class="custom-header">
            <div class="content">
                <draw-map
                        :data="data"
                    ></draw-map>
            </div>
        </b-card>
    </div>
</template>

<script>
    import drawMap from "@/components/drawMap";
    import httpClient from "@/utils/httpclient";
    export default {
        name: 'lotEdit',
        components: {
            drawMap
        },
        data() {
            return {
                data: null
            }
        },
        mounted(){
            httpClient.get("/api/v1/lot/detail", {
                params: {
                    id: this.$route.params.id
                }
            }).then(response => {
                this.data = response.data.data;
            })
        },
    }
</script>

<style lang="scss" scoped>

</style>
