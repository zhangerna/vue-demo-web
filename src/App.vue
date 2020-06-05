<template>
    <div id="app">
        <router-view v-if="isRouteAlive"/>
        <b-modal ref="globalModal" :title="$t('m.vehicle.actions_remind')"  v-model="$store.state.showGlobalModal" :ok-title="$t('m.tip.b_ok')" ok-only @hide="show_global_modal(false)" @ok="show_global_modal(false)">
            <p>{{ $t('m.cloud.no_access') }}</p>
        </b-modal>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    export default {
        name: 'app',
        provide () {
            return {
                reload: this.reload
            }
        },
        data () {
            return {
                isRouteAlive: true,
            }
        },
        methods: {
            reload () {
                this.isRouteAlive = false;
                this.$nextTick(() => {
                    this.isRouteAlive = true;
                })
            },
            ...mapActions(['show_global_modal'])
        }
    }
</script>

<style lang="scss">
    @import '~@coreui/icons/css/coreui-icons.min.css';
    @import '~font-awesome/css/font-awesome.css';
    @import '~simple-line-icons/css/simple-line-icons.css';
    @import '~flag-icon-css/css/flag-icon.min.css';
    @import '~bootstrap-vue/dist/bootstrap-vue.css';
    @import '@/assets/style/style.scss';
    @import '@/assets/style/common.scss';
</style>
