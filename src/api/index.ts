/**
 * Created by billow36 on 2017/6/9.
 */
import axios from 'axios';
import { Message, MessageBox, Notification } from 'element-ui';
const qs = require('querystring');

import {
    setToken,
    getToken,
    setTokenExpire,
    getTokenExpire,
    removeTokenExpire
} from '@/utils/cookieUtils';
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.timeout = 60000;
//基地址
axios.defaults.baseURL =
    process.env.VUE_APP_API_URL !== undefined
        ? process.env.VUE_APP_API_URL
        : window.location.origin;

//添加一个请求拦截器
axios.interceptors.request.use(
    function(config) {
        // if (config.method === 'get') { //如果是查询类的操作
        //   loadingInstance = Loading.service({fullscreen: true});
        // }
        // 在发送请求之前做某件事
        if (
            config.method === 'post' ||
            config.method === 'put' ||
            config.method === 'delete'
        ) {
            let contentType;
            switch (config.method) {
                case 'post':
                    contentType = config.headers.post['Content-Type'];
                    break;
                case 'put':
                    contentType = config.headers.put['Content-Type'];
                    break;
                case 'delete':
                    contentType = config.headers.delete['Content-Type'];
                    break;
            }
            // 序列化
            if (contentType === 'application/json') {
                config.data = JSON.stringify(config.data);
            } else {
                config.data = qs.stringify(config.data);
            }
        }
        //console.log( store.state.user.tokenExpireTime);
        // console.log(getTokenExpire());
        //判断有效时间
        let tokenExpire = getTokenExpire();
        if (tokenExpire === undefined) {
            tokenExpire = '';
        }
        if (
            (new Date().valueOf() - new Date(tokenExpire).valueOf()) /
                1000 /
                60 >
            30
        ) {
            removeTokenExpire();
            setToken('');
            // router.push({
            //     path: '/login',
            //     query: { redirect: '/login' }
            // });
        } else {
            setTokenExpire(new Date());
            config.headers.Authorization = getToken();
        }
        return config;
    },
    function(error) {
        Message.error('发送请求错误');
        return Promise.reject(error);
    }
);

// 添加一个响应拦截器
axios.interceptors.response.use(
    function(response) {
        if (
            response.headers &&
            response.headers['content-type'].indexOf('application/json') !== 0
        ) {
            //downloadWithStream(response);
            // setTimeout(() => {
            //loadingInstance.close();
            // }, 500);
            return response;
        }
        if (response.data && response.data.code !== 0) {
            if (parseInt(response.data.code) === 401) {
                //Message.error(response.data.message);
                //未登录
                //  bus.$emit('goto', '/login');
                MessageBox.confirm('认证失效，是否跳转到登陆')
                    .then(_ => {
                        window.location.href = '/login.html';
                    })
                    .catch(_ => {
                        return Promise.reject(response.data);
                    });
            } else if (parseInt(response.data.code) === -99) {
                Message.error(response.data.message);
                //未登录
                //  bus.$emit('goto', '/login');
                return Promise.reject(response.data);
            } else {
                // Message.error(response.data.message);
                return Promise.reject(response.data);
            }
        } else {
            return response.data.data;
        }
    },
    function(error) {
        // console.log(error);
        if (error.response === undefined) {
            Message.error('网络异常');
        } else if (error.response.status === 401) {
            MessageBox.confirm('认证失效，是否跳转到登陆')
                .then(_ => {
                    window.location.href = '/login.html';
                })
                .catch(_ => {});
            Message.error('认证信息失效');
        } else if (error.response.status === 404) {
            Message.error('访问资源不存在');
        } else if (error.response.status === 500) {
            Message.error('系统内部错误，联系管理员');
        } else {
            //  Message.error('接收请求错误');
            Notification.warning({
                title: '请求警告',
                message: error.response.data.message,
                position: 'bottom-right'
            });
        }
        // console.log(error);
        // Do something with response error
        return Promise.reject(error);
    }
);
export const POST = (url: string, params: any = null, config: any = null) => {
    if (config === undefined) return axios.post(url, params);
    else return axios.post(url, params, config);
};
export const GET_NATIVE = (url: string, config: object) => {
    return axios.get(url, config);
};
export const GET = (url: string, params: object) => {
    return axios.get(url, { params: params });
};

export const PUT = (url: string, params: object) => {
    return axios.put(url, params);
};

export const DELETE = (url: string, params: object) => {
    return axios.delete(url, { params: params });
};

export const PATCH = (url: string, params: object) => {
    return axios.patch(url, params);
};
