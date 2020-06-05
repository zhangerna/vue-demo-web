const Profile = () => import(/* webpackChunkName:'profile'*/'@/views/dashboard/inventory/profile');

export default [
    {
        path: 'profile',
        component: Profile,
        name: 'Profile'
    }
]