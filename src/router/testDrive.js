// 云试驾
const reseOrder = () => import(/* webpackChunkName:'rese-order'*/'@/views/dashboard/testDrive/reseOrder');
const testVehicle = () => import(/* webpackChunkName:'test-vehicle'*/'@/views/dashboard/testDrive/testVehicle');
const testUser = () => import(/* webpackChunkName:'test-user'*/'@/views/dashboard/testDrive/testUser');
const testUserDetail = () => import(/* webpackChunkName:'test-user'*/'@/views/dashboard/testDrive/testUserDetail');
const testUserVerify = () => import(/* webpackChunkName:'test-user'*/'@/views/dashboard/testDrive/testUserVerify');
const addTestPoint = () => import(/* webpackChunkName:'add-test-point'*/'@/views/dashboard/testDrive/addTestPoint');
const testPoint = () => import(/* webpackChunkName:'test-point'*/'@/views/dashboard/testDrive/testPoint');
const testPointDetail = () => import(/* webpackChunkName:'test-point-detail'*/'@/views/dashboard/testDrive/testPointDetail');
const testPointEdit = () => import(/* webpackChunkName:'test-point-edit'*/'@/views/dashboard/testDrive/testPointEdit');
const carBox = () => import(/* webpackChunkName:'carbox'*/'@/views/dashboard/testDrive/carBox');
const reseOrderDetail = () => import(/* webpackChunkName:'rese-order-detail'*/'@/views/dashboard/testDrive/reseOrderDetail');
const testVehicleEdit = () => import(/* webpackChunkName:'user-detail'*/'@/views/dashboard/testDrive/testVehicleEdit');
const testVehicleDetail = () => import(/* webpackChunkName:'user-detail'*/'@/views/dashboard/testDrive/testVehicleDetail');
const testReport = () => import(/* webpackChunkName:'test-report' */'@/views/dashboard/testDrive/testReportDetail');
const testReportList = () => import(/* webpackChunkName:'test-report' */'@/views/dashboard/testDrive/testReportList');
const testReportAll = () => import(/* webpackChunkName:'test-report' */'@/views/dashboard/testDrive/testReportAllList');
const reseOrderVerify = () => import(/* webpackChunkName:'test-report' */'@/views/dashboard/testDrive/reseOrderVerify');

export default [
    {
        path: "/test-drive",
        name: "TestDrive",
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: "test-report",
                name: "TestReport",
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: "list",
                        component: testReportList,
                        name: "TestReportList"
                    },
                    {
                        path: "detail/:id",
                        component: testReport,
                        name: "TestReportDetail"
                    }
                ]
            },
            {
                path: "reservation-order",
                name: "TestOrder",
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: "list",
                        component: reseOrder,
                        name: "TestOrderList"
                    },
                    {
                        path: 'detail/:id',
                        component: reseOrderDetail,
                        name: "TestOrderDetail"
                    },
                    {
                        path: 'verify/:id',
                        component: reseOrderVerify,
                        name: "TestOrderVerify"
                    }
                ]
            },
            {
                path: "test-all-report",
                component: testReportAll,
                name: "TestReportAll"
            },
            {
                path: "test-vehicle",
                name: "TestVehicle",
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: 'list',
                        component: testVehicle,
                        name: "TestVehicleList"
                    },
                    {
                        path: 'edit/:id',
                        component: testVehicleEdit,
                        name: "TestVehicleEdit"
                    },
                    {
                        path: 'detail/:id',
                        component: testVehicleDetail,
                        name: "TestVehicleDetail"
                    },
                ]
            },
            {
                path: "test-user",
                name: "TestUser",
                component: {
                    render(c) {
                        return c('router-view')
                    }
                },
                children:[
                    {
                        path: 'list',
                        component: testUser,
                        name: "TestUserList"
                    },
                    {
                        path: 'detail/:id',
                        component: testUserDetail,
                        name: "TestUserDetail"
                    },
                    {
                        path: 'verify/:id',
                        component: testUserVerify,
                        name: "TestUserVerify"
                    },

                ]
            },
            {
                path: "test-point",
                name: "TestPoint",
                component: {
                    render (c) {
                        return c('router-view')
                    }
                },
                children: [
                    {
                        path: "list",
                        component: testPoint,
                        name: "TestPointList"
                    },
                    {
                        path: "detail/:id",
                        component: testPointDetail,
                        name: "TestPointDetail"
                    },
                    {
                        path: "edit/:id",
                        component: testPointEdit,
                        name: "TestPointEdit"
                    },
                    {
                        path: "add",
                        component: addTestPoint,
                        name: "TestPointAdd"
                    },
                ]
            },
            {
                path: "car-box",
                component: {
                    render (c) {
                        return c('router-view')
                    }
                },
                name: "TestCarBox",
                children: [
                    {
                        path: "list",
                        component: carBox,
                        name: "carBoxList"
                    }
                ]
            }
        ]
    }
];
