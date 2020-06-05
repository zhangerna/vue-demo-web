import axios from 'axios';
import {Base64} from 'js-base64';
import sha1 from 'js-sha1';
import NProgress from "nprogress";
import store from '../store/index'
const uuidv4 = require('uuid/v4');
const httpclient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 60000
});

const loginApiPath = '/api/v1/login';
const checkLoginApiPath = '/api/v1/checklogin';

httpclient.defaults.withCredentials = true;
httpclient.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

httpclient.interceptors.request.use(
    config => {
        config.headers['X-Request-ZId'] = uuidv4();
        config.headers['X-Request-Ztime'] = new Date().valueOf();
        config.headers['X-Installation-Id'] = 'saas-web';
 

        let url = config.url;
        if (!url.startsWith("http")) {
            url = config.baseURL + url;
        }
        
        if (!config.params) {
            config.params = {};
        }
        
        config.params['zos'] = 'web';
        config.params['zname'] = 'web';
        config.params['zversion'] = '1.0.0';
        
        if (url.includes('getlastLocation')) {
            config.headers['token'] = 'g8d6S6ZiKfKvEOl1HnfR';
            console.log('进入getlastLocation的接口')
        }

        if (url.indexOf('login') < 0 && url.indexOf('Login') < 0 && localStorage.getItem("role") == 'root' && sessionStorage.getItem('storeId')) {
            if (config.method == 'get') {
                config.params['storeIdList'] = sessionStorage.getItem("storeId");
            }
            if (config.method == 'post') {
                config.data ?
                    config.data["storeIdList"] = [sessionStorage.getItem("storeId")]
                    : config.data = {"storeIdList": [sessionStorage.getItem("storeId")]}
            }
        }

        url = getUrl(url, config.params);

        config.headers['X-Track-Id'] = buildTrackId(url,
            config.headers['X-Request-ZId'],
            config.headers['X-Request-Ztime'],
            config.headers['X-Installation-Id'],
            config.data);
    
        NProgress.start();
        return config;
    },
    error => {
        NProgress.done();
        return Promise.reject(error);
    }
);



httpclient.interceptors.response.use(
    response => {
        NProgress.done();
        return response;
    },
    error => {
        NProgress.done();
        if (error.response && !isLoginApi(error.response.config.url)) {
            switch (error.response.status) {
                case 401:
                    window.location.href = '/login';
                    break;
                case 403:
                    store.commit('CLOSE_GLOBAL_MODAL',true);
                    break;
                case 404:
                    window.location.href = '/404';
                    break;
            }
        }
        return Promise.reject(error);
    }
);

function isLoginApi(url) {
    return url.indexOf(loginApiPath) >= 0 || url.indexOf(checkLoginApiPath) >= 0;
}


function getUrl(url, params) {
    let markIndex = url.indexOf('?');
    let paramObj = {};
    let urlPath = url;
    if (markIndex > 0) {
        let queryString = url.substring(markIndex + 1);
        urlPath = url.substring(0, markIndex);
        let arr = queryString.split('&');
        // console.log(arr);
        for (let i = 0; i < arr.length; i++) {
            let paramArr = arr[i].split('=');
            const key = paramArr[0];
            const value = encodeURIComponent(paramArr[1]);
            paramObj[key] = value;
        }
    }

    if (params != undefined) {
        for (let k in params) {
            let v = params[k];
            paramObj[k] = v;
        }
    }



    let allKeys = Object.keys(paramObj).sort();

    let sortedQueryString = "";
    for (let i = 0; i < allKeys.length; i++) {
        sortedQueryString += allKeys[i] + "=" + paramObj[allKeys[i]] + "&";
    }
    // 去掉末尾的&
    sortedQueryString = sortedQueryString.substring(0, sortedQueryString.length - 1);
    return urlPath + "?" + sortedQueryString;

}

function buildTrackId(url, requestId, requestZtime, installId, body) {
    const secret = 'nonda-saas-web';
    let xTrackId = url + secret + requestId + installId + requestZtime;
    if (body != undefined) {
        const bodystr = JSON.stringify(body);
        if (bodystr !== '{}') {
            xTrackId = xTrackId + JSON.stringify(body);
        }
    }

    return Base64.encode(sha1(xTrackId));

}


export default httpclient;
