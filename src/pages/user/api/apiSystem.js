/**
 * 系统
 */
import * as API from '@/api/index';

export default {
    //登陆
    getAll: pageable => {
        if (pageable === undefined) {
            pageable = {
                size: 400,
                page: 0
            };
        }
        return API.GET('user/rbac/system', pageable);
    },
    saveSystem: params => {
        return API.POST('user/rbac/system', params);
    },
    updateSystem: (id, params) => {
        return API.PUT('user/rbac/system/' + id, params);
    },
    deleteSystem: id => {
        return API.POST('user/rbac/system/remove/' + id);
    }
};
