import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/process';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveProcess: params => {
        return API.POST(baseUrl, params);
    },
    updateProcess: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteProcess: id => {
        return API.POST(baseUrl + '/remove/' + id);
    },
    saveOrUpdate: params => {
        return API.POST(baseUrl + '/force', params);
    },
    getTree: (annual, designScheme, classify, organizationId) => {
        return API.GET(baseUrl + '/tree', {
            annual: annual,
            designScheme: designScheme,
            classify: classify,
            organizationId: organizationId
        });
    }
};
