import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('user/rbac/systemAdditional', params);
    },
    saveSystemAdditional: params => {
        return API.POST('user/rbac/systemAdditional', params);
    },
    updateSystemAdditional: (id, params) => {
        return API.PUT('user/rbac/systemAdditional/' + id, params);
    },
    deleteSystemAdditional: id => {
        return API.POST('user/rbac/systemAdditional/remove/' + id);
    }
};
