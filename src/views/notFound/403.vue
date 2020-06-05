<template>
    <b-row class="page-404">
        <b-col class="col-md-6">
            <ul>
                <li>403</li>
                <li>Permission Denied</li>
                <li>禁止访问</li>
                <li>You are not allowed to access the data.</li>
                <li>你的权限不允许访问该页面。</li>
            </ul>
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
        ul{
            li{
                font-size: 24px;
            }
        }

    }
</style>



