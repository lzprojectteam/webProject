import * as API from '@/api/index';
const baseUrl = 'user/org/organizationAlias';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveOrganizationAlias: params => {
        return API.POST(baseUrl, params);
    },
    updateOrganizationAlias: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteOrganizationAlias: id => {
        return API.POST(baseUrl + '/remove/' + id);
    }
};
