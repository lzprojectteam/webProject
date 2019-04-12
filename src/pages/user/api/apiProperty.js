/**
 * 系统
 */
import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('user/rbac/property', params);
    },

    saveProperty: params => {
        return API.POST('user/rbac/property', params);
    },
    updateProperty: (id, params) => {
        return API.PUT('user/rbac/property/' + id, params);
    },
    deleteProperty: id => {
        return API.POST('user/rbac/property/remove/' + id);
    }
};
