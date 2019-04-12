import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('user/online/dynamicMethod', params);
    },
    saveDynamicMethod: params => {
        return API.POST('user/online/dynamicMethod', params);
    },
    saveOrUpdate: params => {
        return API.POST('user/online/dynamicMethod/force', params);
    },
    updateDynamicMethod: (id, params) => {
        return API.PUT('user/online/dynamicMethod/' + id, params);
    },
    deleteDynamicMethod: id => {
        return API.DELETE('user/online/dynamicMethod/' + id);
    }
};
