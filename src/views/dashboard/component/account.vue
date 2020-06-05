<template>
    <AppHeaderDropdown right no-caret class="saas-header">
        <template slot="header">
            <b-dropdown v-if="lang && env != 'cn'" :text="lang" class="m-2" size="sm"  id="change-lang">
                <b-dropdown-item @click="changeLang('en')">
                    <span>English</span>
                </b-dropdown-item>
                <b-dropdown-item @click="changeLang('zh')">
                    <span>简体中文</span>
                </b-dropdown-item>
            </b-dropdown>
            <span>{{ $store.state.userInfo.firstName }} {{ $store.state.userInfo.lastName }}</span>
            <img :src="$store.state.userInfo.avatarUrl" class="img-avatar object-cover">
        </template>
        <template slot="dropdown">
            <b-dropdown-header tag="div" class="text-center">
                <strong>
                    {{ $t('m.dashboard.account') }}
                </strong>
            </b-dropdown-header>
            <b-dropdown-item @click="$router.push('/profile')">
                <i class="fa fa-user"></i>
                {{ $t('m.dashboard.profile') }}
            </b-dropdown-item>
            <b-dropdown-header class="text-center">
                {{ $t('m.dashboard.setting') }}
            </b-dropdown-header>
            <b-dropdown-item @click="logOut">
                <i class="fa fa-lock"></i>
                {{ $t('m.dashboard.logout') }}
            </b-dropdown-item>
        </template>
    </AppHeaderDropdown>
</template>

<style lang="scss">
    .img-avatar {
        height: 35px;
        width: 35px;
        border-radius: 50%;
    }
    .saas-header {
        padding: 4px 10px;
        #change-lang__BV_toggle_ {
            color: #73818f!important;
            background-color: transparent!important;
            border-color: #73818f;
        }
    }
    .object-cover {
        object-fit: contain;
    }

</style>

<script>
    import {HeaderDropdown as AppHeaderDropdown} from '@coreui/vue'
    import httpClient from '@/utils/httpclient';
    export default {
        name: "dropAccount",
        components: {
            AppHeaderDropdown
        },
        inject: ['reload'],
        data() {
            return {
                lang: null,
                env: null
            }
        },
        mounted() {
            this.env = process.env.VUE_APP_ENV;
            if (this.$i18n.locale == 'en-US') {
                this.lang = "English";
            } else {
                this.lang = '简体中文';
            }
        },
        methods: {
            logOut() {
                httpClient.post('/api/v1/logout').then(response => {
                    if (response.data.code == 200) {
                        localStorage.removeItem('user_info');
                        window.location.href = '/login'
                    }
                })
            },
            changeLang(type) {
                if (type == 'en') {
                    this.lang = 'English';
                    this.$i18n.locale = "en-US";
                    localStorage.setItem('lang', "en-US");
                } else {
                    this.lang = '简体中文';
                    this.$i18n.locale = "zh-CN";
                    localStorage.setItem('lang', "zh-CN");
                }
                this.reload();
            }
        }
    }
</script>
