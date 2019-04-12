import * as API from '@/api/index';
const baseUrl = 'user/org/area';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveArea: params => {
        return API.POST(baseUrl, params);
    },
    updateArea: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteArea: id => {
        return API.POST(baseUrl + '/remove/' + id);
    }
};
