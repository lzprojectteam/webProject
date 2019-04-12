/**
 * 公用方法，包含登陆，菜单等等方法
 */
import * as API from '../index';
import Cookies from 'js-cookie';

const baseUrl = 'user/rbac/user';
export default {
    findAll: params => {
        return API.GET(baseUrl, params);
    },
    deleteUser: userId => {
        return API.POST(baseUrl + '/remove/' + userId);
    },
    getAll: (state, params) => {
        return API.GET(baseUrl + '/state/' + state, params);
    },
    findAllByOrgId: (orgId, params) => {
        return API.GET(baseUrl + '/orgid/' + orgId, params);
    },
    findAllWithOrgId: (orgId, params) => {
        return API.GET(baseUrl + '/organization/' + orgId, params);
    },
    findAllWithDistrictId: (districtId, params) => {
        return API.GET(baseUrl + '/district/' + districtId, params);
    },
    loginByUserName: (userName, password) => {
        return API.POST(
            'auth/oauth/token?client_id={client_id}&client_secret={client_secret}&grant_type={grant_type}&username={username}&password={password}'.format(
                {
                    username: userName,
                    password: password,
                    grant_type: 'password',
                    client_id: process.env.VUE_APP_CLIENT_ID,
                    client_secret: process.env.VUE_APP_CLIENT_SECRET
                }
            )
        );
    },
    getUserDetail: systemId => {
        return API.GET('auth/userInfo?systemId=' + systemId);
    },
    logout: () => {
        Cookies.remove('user');
    },
    /**
     * 获取系统菜单
     * @param userName
     * @param systemId
     */
    checkMenu: (userName, systemId) => {
        return API.GET(
            baseUrl + '/{0}/system/{1}/menu'.format(userName, systemId)
        );
    },
    homeIndex: systemId => {
        return API.GET(baseUrl + '/system/{0}/index'.format(systemId));
    },
    /**
     * 获取所有的系统信息
     */
    checkSystem: () => {
        return API.GET(baseUrl + '/system/ids');
    },
    /**
     * 根据角色编码，和角色类型获取菜单权限
     * @param roleId
     * @param roleType
     */
    getMenuPrivilege: (roleId, roleType) => {
        return API.GET(
            'user/rbac/privilege/role/{0}/{1}/MENU'.format(roleId, roleType)
        );
    },
    getElementPrivilege: (roleId, roleType, menuId) => {
        return API.GET(
            'user/rbac/privilege/role/{0}/{1}/menu/{2}/ELEMENT'.format(
                roleId,
                roleType,
                menuId
            )
        );
    },
    saveElementPrivilege: (roleId, roleType, systemId, menuId, resourceIds) => {
        return API.POST(
            'user/rbac/privilege/role/{0}/{1}/system/{2}/menu/{3}/ELEMENT'.format(
                roleId,
                roleType,
                systemId,
                menuId
            ),
            resourceIds
        );
    },
    savePrivilege: (roleId, roleType, systemId, resourceType, resourceIds) => {
        return API.POST(
            'user/rbac/privilege/role/{0}/{1}/system/{2}/{3}'.format(
                roleId,
                roleType,
                systemId,
                resourceType
            ),
            resourceIds
        );
    },
    getRoles: userId => {
        return API.GET(baseUrl + '/{0}/roles'.format(userId));
    },
    updateRoles: (loginName, op, roleIds) => {
        var url = '';
        if (op === 'left') {
            // 移除
            url = baseUrl + '/{0}/remove/role'.format(loginName);
        } else {
            // 增加
            url = baseUrl + '/{0}/role'.format(loginName);
        }
        return API.POST(url, roleIds);
    },
    getOrganization: loginName => {
        return API.GET(baseUrl + '/{0}/organization'.format(loginName));
    },
    getOrgByLoginName: (loginName, systemId, stationId) => {
        return API.GET(
            baseUrl +
                '/{0}/organization?systemId={1}&stationId={2}'.format(
                    loginName,
                    systemId,
                    stationId
                )
        );
    },
    updateOrganization: org => {
        return API.POST(baseUrl + '/organization', org);
    },
    removeOrganization: id => {
        return API.DELETE(baseUrl + '/organization/' + id);
    },
    getProperty: loginName => {
        return API.GET(baseUrl + '/{0}/property'.format(loginName));
    },
    updateProperty: property => {
        return API.POST(baseUrl + '/property', property);
    },
    saveUser: params => {
        return API.POST(baseUrl, params);
    },
    save: params => {
        return API.POST(baseUrl + '/district', params);
    },
    updateUser: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteRole: id => {
        return API.POST('user/rbac/user/remove/' + id);
    },
    changePass: (loginName, params) => {
        return API.POST(
            'uaa/oauth/{loginName}/changePass'.format({ loginName: loginName }),
            params
        );
    }
};
