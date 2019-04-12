/* eslint-disable no-unused-vars */
import store from '../index';

/**
 * 根据定义的菜单，生成对应系统的路由树
 * @param entry
 * @param menu
 * @returns {{path: *, name, component: (function(*=)), children: Array}}
 */
function buildRouter(system, menu) {
    // console.log(window.location.pathname.split(/[./]/)[1]);
    let child = [];
    for (var item of menu) {
        child = child.concat(ergodicMenuTree(item));
    }
    return {
        path: '/',
        name: 'aes' + encodeCipher(system.entry),
        meta: { title: system.name, id: 'root' },
        component: resolve => {
            require(['@/components/Layout/Layout.vue'], resolve);
        },
        children: child
    };
}

const _import = require('@/router/_import_' + process.env.NODE_ENV);
import { encodeCipher } from '@/utils/cryptoUtils';
function ergodicMenuTree(item) {
    let cc = [];
    if (item.leaf) {
        // 如果是节点
        if (item.path !== '' && item.path !== undefined && item.path !== null) {
            // 如果设置了路径
            let ii = item.url.indexOf('?');
            let url = item.url;
            if (ii !== -1) {
                url = url.substring(0, ii);
            }
            let reg = new RegExp('/', 'g');
            //   let com = item.path.trim('/').split('/');

            var entity = {
                path: encodeCipher(item.url),
                name: 'aes' + encodeCipher(item.url),
                meta: {
                    title: item.title,
                    icon: item.icon,
                    id: item.id,
                    noCache: !item.cacheMenu,
                    file: item.path
                },
                component: _import(item.path.trim('/'))
            };
            entity.component.name = entity.name;
            cc.push(entity);
        }
    } else {
        cc.push({
            path: item.url.trim('/'),
            meta: { title: item.title, icon: item.icon, id: item.id }
        });
        for (let it of item.child) {
            cc = cc.concat(ergodicMenuTree(it));
        }
    }
    return cc;
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0);
    } else {
        return true;
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles);
            }
            return true;
        }
        return false;
    });
    return accessedRouters;
}

const permission = {
    state: {
        routers: [],
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            //console.log(store.state.router);
            //state.routers = store.state.constantRouterMap.concat(routers);
            state.routers = routers;
        }
    },
    actions: {
        GenerateRoutes({ commit }, dataEntity) {
            return new Promise(resolve => {
                var isAdmin = false;
                const accessedRouters = [];
                var { user, system } = dataEntity;

                for (var i = 0, len = user.roles.length; i < len; i++) {
                    if (user.roles[i].toLocaleLowerCase() === 'superadmin') {
                        isAdmin = true;
                    }
                }
                if (isAdmin) {
                    // accessedRouters = asyncRouterMap //管理管显示内容
                } else {
                    if (user.menus !== undefined && user.menus.length > 0) {
                        //  accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
                        //var jsonObj = JSON.parse('[{"systemId":"6000","code":"600001","title":"基础设置","shortTitle":"基础设置","url":"/","path":null,"sortBy":999,"icon":"iconfont el-iconfont-workbench_fill","bigIcon":"iconfont el-iconfont-shezhi","style":null,"leaf":false,"parentId":null,"parentName":null,"ancestry":"","child":[{"systemId":"6000","code":"60000101","title":"维保单位","shortTitle":"维保单位","url":"/basic/maintenance","path":"itoms/maintenanceRefList","sortBy":999,"icon":"iconfont el-iconfont-workbench_fill","bigIcon":"iconfont el-iconfont-shezhi","style":null,"leaf":true,"parentId":"600001","parentName":"基础设置","ancestry":"[{\\"id\\":\\"600001\\",\\"title\\":\\"基础设置\\"}]","child":[],"mark":"itoms:basic:maintenance","templet":"","visible":true,"id":"60000101"},{"systemId":"6000","code":"60000102","title":"问题分类","shortTitle":"问题分类","url":"/basic/fault","path":"itoms/serviceClassifyList","sortBy":999,"icon":"iconfont el-iconfont-workbench_fill","bigIcon":"iconfont el-iconfont-shezhi","style":null,"leaf":true,"parentId":"600001","parentName":"基础设置","ancestry":"[{\\"id\\":\\"600001\\",\\"title\\":\\"基础设置\\"}]","child":[],"mark":"itoms:basic:category","templet":"","visible":true,"id":"60000102"}],"mark":"","templet":"","visible":true,"id":"600001"},{"systemId":"6000","code":"600002","title":"内管应用","shortTitle":"内管应用","url":"/app","path":null,"sortBy":999,"icon":"iconfont el-iconfont-workbench_fill","bigIcon":"iconfont el-iconfont-shezhi","style":null,"leaf":false,"parentId":null,"parentName":null,"ancestry":"","child":[{"systemId":"6000","code":"60000201","title":"运维工单","shortTitle":"运维工单","url":"/app/job","path":"itoms/jobList","sortBy":999,"icon":"iconfont el-iconfont-workbench_fill","bigIcon":"iconfont el-iconfont-shezhi","style":null,"leaf":true,"parentId":"600002","parentName":"内管应用","ancestry":"[{\\"id\\":\\"600002\\",\\"title\\":\\"内管应用\\"}]","child":[],"mark":"itoms:app:job","templet":"","visible":true,"id":"60000201"}],"mark":"","templet":"","visible":true,"id":"600002"}]');

                        var rr = buildRouter(system, user.menus);
                        //console.log(rr);
                        accessedRouters.push(rr);
                    }
                }
                commit('SET_ROUTERS', accessedRouters);
                resolve();
            });
        }
    }
};

export default permission;
