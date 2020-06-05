const Admin = () => import(/* webpackChunkName:'admin'*/'@/views/dashboard/managerUser/admin');
const AdminEdit = () => import(/* webpackChunkName:'admin-edit'*/'@/views/dashboard/managerUser/adminEdit');
const AdminDetail = () => import(/* webpackChunkName:'admin-detail'*/'@/views/dashboard/managerUser/adminDetail');
const AdminInvite = () => import(/* webpackChunkName:'admin-invite'*/'@/views/dashboard/managerUser/adminInvite');

export default [
    {
        path: "/manager-user",
        name: "Admin",
        component: {
            render (c) { return c('router-view') }
        },
        children:[
            {
                path: "user-info",
                name: "UserInfo",
                component: {
                    render (c) {return c('router-view')}
                },
                children: [
                    {
                        path: "list",
                        component: Admin,
                        name: "AdminList",
                    },
                    {
                        path:'detail/:id',
                        component:AdminDetail,
                        name:'AdminDetail'
                    },
                    {
                        path:'edit/:id',
                        component:AdminEdit,
                        name:'AdminEdit'
                    },
                    {
                        path:'invite',
                        component:AdminInvite,
                        name:'AdminInvite'
                    }
                ]
            }
        ]
    }
];
