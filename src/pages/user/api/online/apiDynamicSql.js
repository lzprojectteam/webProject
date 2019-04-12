import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('user/online/dynamicSql', params);
    },
    saveDynamicSql: params => {
        return API.POST('user/online/dynamicSql', params);
    },
    updateDynamicSql: (id, params) => {
        return API.PUT('user/online/dynamicSql/' + id, params);
    },
    deleteDynamicSql: id => {
        return API.DELETE('user/online/dynamicSql/' + id);
    },
    publishDynamicSql: id => {
        return API.POST('user/online/dynamicSql/publish/' + id);
    },
    stopDynamicSql: id => {
        return API.POST('user/online/dynamicSql/stop/' + id);
    }
};
