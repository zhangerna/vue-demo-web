import Vue from 'vue';
import VueI18n from 'vue-i18n';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';
import router from './router';
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueI18n);

// this.$i18n.locale
const i18n = new VueI18n({
	locale: process.env.VUE_APP_ENV == 'en' ? (localStorage.getItem('lang') || 'en-US') : 'zh-CN',
	messages: {
		'zh-CN': require('@/lang/zh'),
		'en-US': require('@/lang/en'),
	}
});

if (process.env.VUE_APP_ENV != 'en') {
	localStorage.setItem('lang', 'zh-CN')
}


NProgress.configure({
	easing: 'ease',  // 动画方式
	speed: 500,  // 递增进度条的速度
	showSpinner: false, // 是否显示加载ico
	trickleSpeed: 200, // 自动递增间隔
	minimum: 0.3 // 初始化时的最小百分比
});


new Vue({
	el: "#app",
	i18n,
	store,
	router,
  render: h => h(App),
}).$mount('#app');
