import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import httpclient from '@/utils/httpclient'
import dashboard from './dashboard'
import testRouter from './testDrive'
import inventory from './inventory'
import soldManager from './soldManager'
import admin from './admin'
import noLogin from './noLoginPage'
import profile from './profile'

Vue.use(Router);

const Dashboard = () => import(/* webpackChunkName:'dashboard'*/'@/views/dashboard/index');

const router =  new Router ({
	mode: 'history',
	linkActiveClass: 'open active',
	scrollBehavior: () => ({y:0}),
	routes: [
		{
			path: '/',
			redirect: '/index',
			name: 'Home',
			content: "home",
			component: Dashboard,
			children: [
				...dashboard,
				...inventory,
				...testRouter,
				...soldManager,
				...admin,
				...profile
			]
		},
		...noLogin
	]
});

router.beforeEach(async (to, from, next) => {
	if (store.getters.noLoginList.includes(to.name)) {
		next();
	} else {
		if (localStorage.getItem("user_info")) {
			store.dispatch("user_info", JSON.parse(localStorage.getItem("user_info")));
		}
		await new Promise((resolve, reject) => {
			httpclient.get("/api/v1/checklogin", {}).then(() => {
				next();
				resolve();
			}).catch((e) => {
				next('/login');
				reject(e)
			});
		});

	}
});

router.onError(error => {
	if (/Loading chunk ([A-Za-z0-9_-])* failed/.test(error.message)) {
		window.location.reload()
	}
});

export default router
