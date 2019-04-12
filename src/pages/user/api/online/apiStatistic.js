import * as API from '@/api/index';
const baseUrl = 'user/online/statistic';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveStatistic: params => {
        return API.POST(baseUrl, params);
    },
    saveParams: params => {
        return API.POST(baseUrl + '/saveParams', params);
    },
    updateStatistic: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteStatistic: id => {
        return API.POST(baseUrl + '/remove/' + id);
    },
    getReport: params => {
        return API.POST(baseUrl + '/getReport', params);
    }
};
