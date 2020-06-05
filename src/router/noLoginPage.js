// views
const Login = () => import(/* webpackChunkName:'login'*/'@/views/login/index');
const Register = () => import(/* webpackChunkName:'register'*/'@/views/register/index');
const RegisterSucc = () => import(/* webpackChunkName:'register-succ'*/'@/views/registerSucc/index');
const RegisterAccSucc = () => import(/* webpackChunkName:'register-acc-succ'*/'@/views/registerAccSucc/index');
const RegisterAccFail = () => import(/* webpackChunkName:'register-acc-fail'*/'@/views/registerAccFail/index');
const RegisterCheckFail = () => import(/* webpackChunkName:'register-check-fail'*/'@/views/registerCheckFail/index');
const RegisterCheckSucc = () => import(/* webpackChunkName:'register-check-succ'*/'@/views/registerCheckSucc/index');
const EmailVer = () => import(/* webpackChunkName:'email-ver'*/'@/views/emailVer/index');
const ResetPassword = () => import(/* webpackChunkName:'reset-password'*/'@/views/resetPassword/index');
const ForgetPassword = () => import(/* webpackChunkName:'forget-password'*/'@/views/forgetPassword/index');
const page404 = () => import(/* webpackChunkName:'add-shop'*/'@/views/notFound/404');
const page403 = () => import(/* webpackChunkName:'add-shop'*/'@/views/notFound/403');
const UserInviteRegister = () => import(/* webpackChunkName:'invite-register'*/'@/views/dashboard/inventory/userInviteRegist');

export default [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/user-invite-register',
        name: 'userInviteRegister',
        component: UserInviteRegister
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/register-success',
        name: 'RegisterSuccess',
        component: RegisterSucc
    },
    {
        path: '/register-access-success',
        name: 'RegisterAccessSuccess',
        component: RegisterAccSucc
    },
    {
        path: '/register-access-fail',
        name: 'RegisterAccessFail',
        component: RegisterAccFail
    },
    {
        path: '/register-check-fail',
        name: 'RegisterCheckFail',
        component: RegisterCheckFail
    },
    {
        path: '/register-check-success',
        name: 'RegisterCheckSuccess',
        component: RegisterCheckSucc
    },
    {
        path: '/email-verification',
        name: 'EmailVerification',
        component: EmailVer
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: ResetPassword,
    },
    {
        path: '/forget-password',
        name: 'ForgetPassword',
        component: ForgetPassword
    },
    {
        path: '*',
        redirect: '/index'
    },
    {
        path: '/404',
        name: '404',
        component: page404
    },
    {
        path: '/403',
        name: '403',
        component: page403
    },
];
