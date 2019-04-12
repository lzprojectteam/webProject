import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('user/org/level', params);
    },
    saveLevel: params => {
        return API.POST('user/org/level', params);
    },
    updateLevel: (id, params) => {
        return API.PUT('user/org/level/' + id, params);
    },
    deleteLevel: id => {
        return API.POST('user/org/level/remove/' + id);
    }
};
