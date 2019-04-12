import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('tobacco/api/basic/area', params);
    },
    saveArea: params => {
        return API.POST('tobacco/api/basic/area', params);
    },
    updateArea: (id, params) => {
        return API.PUT('tobacco/api/basic/area/' + id, params);
    },
    deleteArea: id => {
        return API.POST('tobacco/api/basic/area/remove/' + id);
    }
};
