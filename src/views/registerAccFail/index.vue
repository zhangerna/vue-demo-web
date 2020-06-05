<template>
    <div class="animated fadeIn">
        <fail
            :errInfo="errInfo"
            :btnGroup="btnGroup">
        </fail>
    </div>
</template>

<script>
    import fail from "@/components/registStatus"
    export default {
        name: "registerAccessFail",
        components: {
            fail
        },
        data() {
            return {
                errInfo: this.$t('m.register.had_register'),
                btnGroup: {
                    btnFirst: "login",
                    btnSecond: "index"
                }
            }
        }
    }
</script>
