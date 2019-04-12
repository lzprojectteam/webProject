import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('user/online/dynamicParam', params);
    },
    saveDynamicParam: params => {
        return API.POST('user/online/dynamicParam', params);
    },
    saveOrUpdate: params => {
        return API.POST('user/online/dynamicParam/force', params);
    },
    updateDynamicParam: (id, params) => {
        return API.PUT('user/online/dynamicParam/' + id, params);
    },
    deleteDynamicParam: id => {
        return API.DELETE('user/online/dynamicParam/' + id);
    }
};
