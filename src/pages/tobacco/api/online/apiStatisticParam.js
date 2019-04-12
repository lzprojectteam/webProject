import * as API from '@/api/index';
const baseUrl = 'user/online/statisticParam';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveStatisticParam: params => {
        return API.POST(baseUrl, params);
    },
    updateStatisticParam: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteStatisticParam: id => {
        return API.POST(baseUrl + '/remove/' + id);
    },
    getParamData: (url, param) => {
        return API.GET(url, param);
    }
};
