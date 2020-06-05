<template>
    <div class="animated fadeIn mainI">
        <shop v-if="role != 'root' || storeId"></shop>
        <allShop v-if="!storeId && role == 'root'"></allShop>
    </div>
</template>


<script>
    export default {
        name: "mainI",
        data() {
            return {
                storeId: null,
                role: null
            }
        },
        components: {
            allShop: function (resolve) {
                require(["../component/allshop"], resolve)
            },
            shop: function (resolve) {
                require(["../component/shop"], resolve)
            }

        },
        mounted() {
            this.role = localStorage.getItem('role');
            this.storeId = sessionStorage.getItem('storeId') ? sessionStorage.getItem('storeId') : null;
        }

    }
</script>
