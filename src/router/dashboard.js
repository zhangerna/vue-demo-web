const DashboardM = () => import(/* webpackChunkName:'dashboard-main'*/'@/views/dashboard/dashboardMain/mainI');

export default [
    {
        path: 'index',
        component: DashboardM,
        name: 'Dashboard',
    }
];

