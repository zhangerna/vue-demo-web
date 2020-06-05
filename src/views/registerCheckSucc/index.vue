<template>
    <div class="animated fadeIn">
        <succ
                :succInfo="succInfo"
                :btnGroup="btnGroup">
        </succ>
    </div>
</template>

<script>
    import succ from "@/components/registStatus"
    export default {
        name: "registerCheckSuccess",
        components: {
            succ
        },
        data() {
            return {
                succInfo: this.$t('m.register.register_suc'),
                btnGroup: {
                    btnFirst: "login"
                }
            }
        }
    }
</script>
