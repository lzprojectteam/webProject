import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/processAttr';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    save: params => {
        return API.POST(baseUrl, params);
    },
    saveOrUpdate: params => {
        return API.POST(baseUrl + '/force', params);
    },
    update: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    delete: id => {
        return API.POST(baseUrl + '/remove/' + id);
    },
    getByProcessId: id => {
        return API.GET(baseUrl + '/process/{id}/list'.format({ id: id }));
    }
};
