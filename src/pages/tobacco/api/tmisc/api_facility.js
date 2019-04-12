import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/facility';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveFacility: params => {
        return API.POST(baseUrl, params);
    },
    updateFacility: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteFacility: id => {
        return API.POST(baseUrl + '/remove/' + id);
    }
};
