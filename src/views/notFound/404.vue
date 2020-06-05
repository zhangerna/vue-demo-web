<template>
    <b-row class="page-404">
        <b-col class="col-md-6 text-right big-text">
            404
        </b-col>
        <b-col class="col-md-6">
            <p style="font-size: 24px;margin-bottom: 0;">{{ $t('m.no_login.page_404') }}</p>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name: "page404"
    }
</script>

<style scoped lang="scss">
.page-404{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .big-text{
        font-size: 60px;
    }
    .para{
        font-size: 24px;
        margin-bottom: 0;
    }

}
</style>
