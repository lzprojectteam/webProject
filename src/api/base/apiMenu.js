/**
 * 系统
 */
import * as API from '@/api/index';

export default {
    //登陆
    getBySystemId: (systemId, params) => {
        return API.GET(
            'user/rbac/menu/system/{0}?sort=code&sort=sortBy'.format(systemId),
            params
        );
    },
    getMenuTree: (systemId, params) => {
        return API.GET(
            'user/rbac/menu/system/{0}/menutree'.format(systemId),
            params
        );
    },
    saveMenu: params => {
        return API.POST('user/rbac/menu', params);
    },
    updateMenu: (menuId, params) => {
        return API.PUT('user/rbac/menu/' + menuId, params);
    },
    deleteMenu: menuId => {
        return API.POST('user/rbac/menu/remove/' + menuId);
    },
    getValidMenuTree: (systemId, roleId, pageable) => {
        return API.GET(
            'user/rbac/menu/system/{0}/role/{1}/tree/valid'.format(
                systemId,
                roleId
            ),
            pageable
        );
    },
    getElementByMenuId: (menuId, pageable) => {
        return API.GET('user/rbac/element/menu/{0}'.format(menuId), pageable);
    }
};
