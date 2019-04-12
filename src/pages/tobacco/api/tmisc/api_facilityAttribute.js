import * as API from '@/api/index';
const baseUrl = 'casit/api/tmisc/facilityAttribute';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveFacilityAttribute: params => {
        return API.POST(baseUrl, params);
    },
    updateFacilityAttribute: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteFacilityAttribute: id => {
        return API.POST(baseUrl + '/remove/' + id);
    }
};
