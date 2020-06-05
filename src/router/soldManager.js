const soldVehicle = () => import(/* webpackChunkName:'add-shop'*/'@/views/dashboard/soldManager/soldVehicle');
const soldVehicleDetail = () => import(/* webpackChunkName:'add-shop'*/'@/views/dashboard/soldManager/soldDetail');

export default [
    {
        path: "/sold-manager",
        name: "SoldManager",
        component: {
            render(c) {
                return c('router-view')
            }
        },
        children: [
            {
                path: "list",
                component: soldVehicle,
                name: "soldVehicleList"
            },
            {
                path: "detail/:id",
                component: soldVehicleDetail,
                name: "soldVehicleDetail"
            },

        ]
    }
];
