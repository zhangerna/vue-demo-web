
const DashboardV = () => import(/* webpackChunkName:'vehicle'*/'@/views/dashboard/inventory/vehicle');
const DashboardVD = () => import(/* webpackChunkName:'vehicle-detail'*/'@/views/dashboard/inventory/vehicleDetail');
const DashboardVE = () => import(/* webpackChunkName:'vehicle-edit'*/'@/views/dashboard/inventory/vehicleEdit');
const Alerts = () => import(/* webpackChunkName:'alerts'*/'@/views/dashboard/inventory/alerts');
const ChangePassword = () => import(/* webpackChunkName:'change-password'*/'@/views/dashboard/inventory/changePassword');
const AddVehicle = () => import(/* webpackChunkName:'add-vehicle'*/'@/views/dashboard/inventory/addVehicle');
const BindVehicle = () => import(/* webpackChunkName:'bind-vehicle'*/'@/views/dashboard/inventory/bindVehicle');
const AlertDetail = () => import(/* webpackChunkName:'alert-detail'*/'@/views/dashboard/inventory/alertDetail');
const Device = () => import(/* webpackChunkName:'device'*/'@/views/dashboard/inventory/device');
const Lots = () => import(/* webpackChunkName:'lots'*/'@/views/dashboard/inventory/lots');
const LotsEdit = () => import(/* webpackChunkName:'lots-edit'*/'@/views/dashboard/inventory/lotsEdit');
const LotsDetail = () => import(/* webpackChunkName:'lots-edit'*/'@/views/dashboard/inventory/lotsDetail');
const addLots = () => import(/* webpackChunkName:'add-lots'*/'@/views/dashboard/inventory/addLots');
const ShopManager = () => import(/* webpackChunkName:'shop-manager'*/'@/views/dashboard/inventory/shopManager');
const ShopEdit = () => import(/* webpackChunkName:'shop-edit'*/'@/views/dashboard/inventory/shopEdit');
const ShopDetail = () => import(/* webpackChunkName:'shop-edit'*/'@/views/dashboard/inventory/shopDetail');
const AddShop = () => import(/* webpackChunkName:'add-shop'*/'@/views/dashboard/inventory/addShop');

export default [
    {
        path: '/inventory',
        redirect: '/inventory/vehicle/list',
        name: 'Inventory',
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: "vehicle",
                name: "Vehicle",
                component: {
                    render (c) { return c('router-view') }
                },
                children: [
                    {
                        path: "list",
                        component: DashboardV,
                        name: 'VehicleList'
                    },
                    {
                        path: "detail/:id",
                        component: DashboardVD,
                        name: 'VehicleDetail'
                    },
                    {
                        path: "edit/:id",
                        component: DashboardVE,
                        name: 'VehicleEdit'
                    },
                    {
                        path: "add",
                        component: AddVehicle,
                        name: 'VehicleAdd'
                    },
                    {
                        path: "bind",
                        component: BindVehicle,
                        name: 'VehicleBindVehicle'
                    }
                ]
            },
            {
                path: "alerts",
                name: "Alerts",
                component: {
                    render (c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'list',
                        component: Alerts,
                        name: "AlertsList"
                    },
                    {
                        path: 'detail/:id',
                        component: AlertDetail,
                        name: "AlertsDetail"
                    }
                ],
            },
            {
                path: "/change-password",
                component: ChangePassword,
                name: "ChangePassword"
            },
            {
                path: "device",
                name: "Device",
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: "list",
                        component: Device,
                        name: "DeviceList"
                    },
                    // {
                    //     path: "bind",
                    //     component: DeviceBind,
                    //     name: "DeviceBind"
                    // }
                ]
            },
            {
                path: "shop-manager",
                name: "ShopManager",
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: "list",
                        component: ShopManager,
                        name: "ShopManagerList"
                    },
                    {
                        path: "edit/:id",
                        component: ShopEdit,
                        name: "ShopManagerEdit"
                    },
                    {
                        path: "add",
                        component: AddShop,
                        name: "ShopManagerAdd"
                    },
                    {
                        path: "detail/:id",
                        component: ShopDetail,
                        name: "ShopManagerDetail"
                    }
                ]
            },
            {
                path: "lots",
                name: "Lots",
                component: {
                    render (c) {return c('router-view')}
                },
                children: [
                    {
                        path: "list",
                        component: Lots,
                        name: "LotsList"
                    },
                    {
                        path: "detail/:id",
                        component: LotsDetail,
                        name: "LotsDetail"
                    },
                    {
                        path: "edit/:id",
                        component: LotsEdit,
                        name: "LotsEdit"
                    },
                    {
                        path: "add",
                        component: addLots,
                        name: "LotsAdd"
                    }
                ]
            },
        ]


    }
];
