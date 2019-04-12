import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/designScheme';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveDesignScheme: params => {
        return API.POST(baseUrl, params);
    },
    updateDesignScheme: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteDesignScheme: id => {
        return API.POST(baseUrl + '/remove/' + id);
    },
    distribute: (id, organizationIds) => {
        return API.POST(baseUrl + '/' + id + '/distribute', organizationIds);
    }
};
