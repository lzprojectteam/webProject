import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('user/online/dataSource', params);
    },
    saveDataSource: params => {
        return API.POST('user/online/dataSource', params);
    },
    updateDataSource: (id, params) => {
        return API.PUT('user/online/dataSource/' + id, params);
    },
    deleteDataSource: id => {
        return API.POST('user/online/dataSource/remove/' + id);
    }
};
