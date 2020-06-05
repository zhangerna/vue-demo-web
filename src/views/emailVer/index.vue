<template>
    <div class="animated fadeIn">
        <succ v-if="status"
                :succInfo="succInfo"
                :btnGroup="btnGroup"
                :errInfo="errInfo">
        </succ>
    </div>
</template>

<script>
    import httpClient from "@/utils/httpclient";
    import succ from "@/components/registStatus";
    export default {
        name: "registerCheckSuccess",
        components: {
            succ
        },
        data() {
            return {
                succInfo: "",
                errInfo: "",
                btnGroup: {
                    btnFirst: "login"
                },
                status: ''
            }
        },
        mounted() {

            httpClient.post("/api/v1/email/verification", {
                token: this.$route.query.token
            }).then(response => {
                if (response.data.data && response.data.data == "ok") {
                    this.succInfo = this.$t('m.register.register_suc');
                    this.status = 1;
                    this.errInfo = null;
                } else {
                    this.errInfo = this.$t('m.register.link_expire');
                    this.status = 2;
                    this.succInfo = null;
                }
            }).catch(err => {
                this.errInfo = this.$t('m.register.link_expire');
                this.status = 2;
                this.succInfo = null;
            })
        }
    }
</script>
