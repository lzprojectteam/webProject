import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('user/rbac/role', params);
    },
    saveRole: params => {
        return API.POST('user/rbac/role', params);
    },
    updateRole: (id, params) => {
        return API.PUT('user/rbac/role/' + id, params);
    },
    deleteRole: id => {
        return API.POST('user/rbac/role/remove/' + id);
    },
    getRoleTree: params => {
        return API.GET('user/rbac/role/tree', params);
    }
};
