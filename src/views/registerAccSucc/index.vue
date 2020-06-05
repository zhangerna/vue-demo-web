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
        name: "registerAccessSucc",
        components: {
            succ
        },
        data() {
            return {
                succInfo: this.$t('m.register.congratulation_join'),
                btnGroup: {
                    btnFirst: "login",
                    btnSecond: "index"
                }
            }
        }
    }
</script>
