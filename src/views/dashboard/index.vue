<template>
    <div class="app">
        <AppHeader fixed>
            <Socket></Socket>
            <SidebarToggler class="d-lg-none" display="md" mobile/>
            <b-link class="navbar-brand" to="#">
                <img class="navbar-brand-full" src="@/assets/pages-img/logo.svg" width="89" height="25">
                <img class="navbar-brand-minimized" src="https://pic.zus.ai/saas/logo.svg" width="30" height="30">
            </b-link>
            <SidebarToggler class="d-md-down-none" display="lg"/>
            <b-dropdown v-if="root" :text="storeName" class="m-2" size="sm"  id="change-shop">
                <b-dropdown-item @click="changeStore()">
                    <span>{{ $t('m.common.all_store') }}</span>
                </b-dropdown-item>
                <b-dropdown-item v-for="(item,key) in rootData" :key="key" @click="changeStore(item.storeId, item.storeName)">
                    <span>{{ item.storeName }}</span>
                </b-dropdown-item>
            </b-dropdown>
            <b-navbar-nav class="ml-auto">
                <b-nav-item class="d-md-down-none" @click="showWarnList($store.getters.updateNumber)" ref="box">
                    <i class="icon-bell"></i>
                    <b-badge pill variant="danger">{{ $store.getters.updateNumber ? $store.getters.updateNumber : curNumber }}</b-badge>
                </b-nav-item>
                <div slot="dropdown" class="warn-tip" v-if="showUpdateTip">
                    <b-dropdown-header tag="div" class="text-center">
                        <strong>
                            {{ $t('m.common.nav_tip', {number: $store.getters.updateNumber ? $store.getters.updateNumber : curNumber  }) }}
                        </strong>
                    </b-dropdown-header>
                    <b-dropdown-item v-for="(item, key) in updateLists" :key="key">
                        <template v-if="item.eventType == 1">
                            <div @click="linkTo(item.eventType, item.testDriveUserId)">{{ $t('m.tip.test_user') }}<span class="blue-color">{{ item.serviceNum }}</span>{{ $t('m.tip.card_check') }}</div>
                        </template>
                        <template v-if="item.eventType == 2">
                            <div @click="linkTo(item.eventType)">{{ $t('m.common.test_drive') }}<span class="blue-color">{{ item.serviceNum }}</span>{{ $t('m.cloud.w_accept') }}</div>
                        </template>
                        <template v-if="item.eventType == 3">
                            <div @click="linkTo(item.eventType, item.orderId )">{{ $t('m.common.appoint_order') }}<span class="blue-color">{{ item.serviceNum }}</span>{{ $t('m.common.out_time') }}</div>
                        </template>
                    </b-dropdown-item>
                </div>
                <DefaultHeaderDropdownAccnt/>
            </b-navbar-nav>
        </AppHeader>
        <div class="app-body">
            <AppSidebar fixed>
                <SidebarHeader/>
                <SidebarForm/>
                <SidebarNav :navItems="nav"></SidebarNav>
                <SidebarFooter/>
                <SidebarMinimizer/>
            </AppSidebar>
            <main class="main">
                <ol class="breadcrumb">
                    <li v-for="(item, k) of $route.matched" :key="k" class="breadcrumb-item">
                        {{ $t($store.getters.crumbs[item.name]) }}
                    </li>
                </ol>
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
        </div>
        <TheFooter>
            <!--footer-->
            <div>
                <a href="https://zus.ai">ZUS.ai</a>
                <span class="ml-1">© Copyright No NDA Inc., All Rights Reserved</span>
                <span class="ml-1">沪ICP备19032313号 </span>
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011202011601">沪公网安备 31011202011601号</a>
            </div>
        </TheFooter>
    </div>

</template>

<script>

    import {
        Header as AppHeader,
        SidebarToggler,
        Sidebar as AppSidebar,
        SidebarFooter,
        SidebarForm,
        SidebarHeader,
        SidebarMinimizer,
        SidebarNav,
        Footer as TheFooter,
    } from '@coreui/vue';
    import DefaultHeaderDropdownAccnt from './component/account';
    import Socket from '@/components/socket';
    import httpclient from "@/utils/httpclient";

    export default {
        name: 'dashboard',
        inject: ['reload'],
        components: {
            AppHeader,
            AppSidebar,
            TheFooter,
            SidebarForm,
            SidebarFooter,
            SidebarToggler,
            SidebarHeader,
            SidebarNav,
            SidebarMinimizer,
            DefaultHeaderDropdownAccnt,
            Socket
        },
        data() {
            return {
                data: [
                    {
                        url: '/index',
                        icon: 'icon-speedometer',
                        id: 'lotmanger_dashboard',
                        name: this.$t('m.dashboard.dashboard')
                    },
                    {
                        name: this.$t('m.dashboard.vehicle_m'),
                        url: "/inventory",
                        icon: "fa fa-car",
                        id: "lotmanger",
                        children: [
                            {
                                name: this.$t('m.dashboard.vehicles'),
                                url: '/inventory/vehicle/list',
                                id: 'lotmanger_vehicles'
                            },
                            {
                                name: this.$t('m.dashboard.alerts'),
                                url: '/inventory/alerts/list',
                                id: 'lotmanger_alerts'
                            },
                            {
                                name: this.$t('m.dashboard.devices'),
                                url: '/inventory/device/list',
                                id: 'lotmanger_devices'
                            },
                            {
                                name: this.$t('m.dashboard.lots'),
                                url: '/inventory/lots/list',
                                id: 'lotmanger_lots'
                            },
                            {
                                name: this.$t('m.dashboard.shop'),
                                url: '/inventory/shop-manager/list',
                                id: 'lotmanger_store'
                            },
                        ]
                    },
                    {
                        name: this.$t('m.dashboard.cloud'),
                        url: '/test-drive',
                        icon: 'nav-icon icon-list',
                        id: "clouddrive",
                        children: [
                            {
                                name: this.$t('m.dashboard.appoint_order'),
                                url: '/test-drive/reservation-order/list',
                                id: "clouddrive_appointment"
                            },
                            {
                                name: this.$t('m.dashboard.report_manager'),
                                url: '/test-drive/test-report/list',
                                id: "report_list"
                            },
                            {
                                name: this.$t('m.dashboard.test_report_all'),
                                url: '/test-drive/test-all-report',
                                id: 'clouddrive_many_report'
                            },
                            {
                                name: this.$t('m.dashboard.test_vehicle'),
                                url: '/test-drive/test-vehicle/list',
                                id: "clouddrive_testvehicle"
                            },
                            {
                                name: this.$t('m.dashboard.test_user'),
                                url: '/test-drive/test-user/list',
                                id: "clouddrive_testuser"
                            },
                            {
                                name: this.$t('m.dashboard.test_point'),
                                url: '/test-drive/test-point/list',
                                id: "clouddrive_testpoint"
                            },
                            {
                                name: this.$t('m.dashboard.car_box'),
                                url: '/test-drive/car-box/list',
                                id: "clouddrive_vehiclebox"
                            },
                        ]
                    },
                    // {
                    //     name: this.$t('m.sold_vehicle.vehicle_management'),
                    //     url: '/sold-manager',
                    //     icon: 'fa fa-handshake-o',
                    //     id: 'after_sales',
                    //     children: [
                    //         {
                    //             name: this.$t('m.sold_vehicle.vehicle_sold'),
                    //             url: '/sold-manager/list',
                    //             id: "after_sales_vehicle"
                    //         }
                    //     ]
                    // },
                    {
                        name: this.$t('m.dashboard.admin'),
                        url: '/manager-user',
                        icon: 'icons cui-people',
                        id: 'lotmanger_user_manage',
                        children: [
                            {
                                name: this.$t('m.dashboard2.manager_user'),
                                url: '/manager-user/user-info/list',
                                id: 'lotmanger_admin'
                            },
                        ]
                    }
                ],
                nav: [
                ],
                root: false,
                rootData: [],
                storeName: '',
                env: '',
                updateLists: [],
                showUpdateTip: false,
                curNumber: 0
            }
        },
        mounted() {
            this.env = process.env.VUE_APP_ENV;
            this.root = localStorage.getItem('role') == 'root' ? true : false;
            httpclient.get("/api/v1/listmenus").then((response) => {
                this.filterList(response.data.data);
            }).catch((e) => {
                console.log('listmenus error')
            });
            this.requestNotice();
            if (this.root) {
                this.storeName = sessionStorage.getItem('storeName') ? sessionStorage.getItem('storeName') : this.$t('m.common.all_store');
                httpclient.get("/api/v1/store/list").then(res => {
                    if (res.data.code == 200) {
                        this.rootData = res.data.data;
                    }
                })
            }
        },
        created() {
            document.addEventListener('click', (e) => {
                if (this.$refs.box && !this.$refs.box.contains(e.target)) {
                    this.showUpdateTip = false;
                }
            });
        },
        methods: {
            linkTo(type, id) {
                if (type == 1) {
                    this.$router.push('/test-drive/test-user/verify/' + id);
                } else if (type == 2) {
                    window.location.href = '/test-drive/test-vehicle/list?type=30';
                } else {
                    this.$router.push('/test-drive/reservation-order/detail/' + id);
                }
            },
            requestNotice() {
                httpclient.get('/api/v1/clouddrive/notice/list').then((response) => {
                    if (response.data.code == 200) {
                        this.updateLists = response.data.data;
                        this.curNumber = response.data.data.length;
                    }
                });
            },
            showWarnList() {
                this.requestNotice();
                this.showUpdateTip = true;
            },
            changeStore(id, name) {
                if (id) {
                    sessionStorage.setItem('storeName', name);
                    sessionStorage.setItem('storeId', id);
                } else {
                    sessionStorage.removeItem('storeId');
                    sessionStorage.removeItem('storeName');
                }
                this.reload();
            },
            filterChildren(key, menus, key2) {
                let list = [];
                menus[key2].menuList ?
                    this.data[key].children.map(t => {
                        menus[key2].menuList.map(i => {
                            if (i.menuCode == t.id ) {
                                list.push(t)
                            }
                        });
                }) : '';
                return list.length > 0 ? list : null;
            },
            filterList(menus) {
                this.nav = [];
                this.data.map((it, key) => {
                    menus.map((item, key2) => {
                        if (item.menuCode == it.id) {
                            this.nav.push({
                                name: it.name,
                                url: it.url,
                                icon: it.icon,
                                id: it.id,
                                menuOrder: item.menuOrder,
                                children: this.filterChildren(key, menus, key2)
                            });
                        }
                    });
                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .warn-tip {
        position: absolute;
        top: 50px;
        right: 100px;
        border: 1px solid #ddd;
        background: #ffffff;
    }
    .blue-color {
        color: #20a8d8;
        text-decoration: underline;
    }
</style>
