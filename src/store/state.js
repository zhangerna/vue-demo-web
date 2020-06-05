import crumbs from '@/static/crumbs';

export default {
    auth: false,
    userInfo: {},
    userPersonalInfo:{
        avatarUrl:'',
        firstName:'',
        lastName:'',
        phone:''
    },
    crumbs: crumbs,
    socketData: {},
    logList: [],
    noLoginList: [
        "Login",
        "ForgetPassword",
        "ResetPassword",
        "EmailVerification",
        "RegisterCheckSuccess",
        "RegisterCheckFail",
        "RegisterSuccess",
        "userInviteRegister",
        "Register"
    ],
    menus: [],
    store: null,
    updateNumber: 0,
    showGlobalModal:false
}
