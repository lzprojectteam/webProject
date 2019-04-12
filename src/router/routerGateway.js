import router from './index';
import store from '@/store/index';
//import {Message} from 'element-ui';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { getToken } from '@/utils/cookieUtils'; // getToken from cookie
import { getUser } from '@/utils/userUtils';
NProgress.configure({ showSpinner: false }); // NProgress Configuration

// permissiom judge function
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
    if (!permissionRoles) return true;
    return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/login', '/authredirect']; // no redirect whitelist

router.beforeEach((to, from, next) => {
    NProgress.start(); // start progress bar
    /* 如果没有token,先判定是不是无需验证的URl*/
    if (getToken()) {
        if (
            to.path !== '/dashboard' &&
            store.state.tagsView.visitedViews.find(item => {
                return item.name === 'dashboard';
            }) === undefined
        ) {
            next({ path: '/' });
        } else if (store.getters.name === '') {
            // 判断当前用户是否已拉取完user_info信息，注意用户信息是放置在store里，如果刷新浏览器后，会重新执行下列操作
            store
                .dispatch('loadEnv')
                .then(response => {
                    store.dispatch('GenerateRoutes', response).then(() => {
                        // 根据roles权限生成可访问的路由表
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        next({ ...to, replace: true }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                    });
                })
                .catch(error => {
                    console.log(error);
                    store.dispatch('FedLogOut').then(() => {
                        //Message.error('Verification failed, please login again');
                        window.location.href = '/login.html';
                    });
                });
        } else {
            // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
            if (hasPermission(store.getters.permissions, to.meta.roles)) {
                next(); //
            } else {
                next({
                    path: '/401',
                    replace: true,
                    query: { noGoBack: true }
                });
            }
            // 可删 ↑
        }
    } else if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next();
    } else {
        //跳转到登陆
        window.location.href = '/login.html';
    }
});

router.afterEach(() => {
    NProgress.done(); // finish progress bar
});
