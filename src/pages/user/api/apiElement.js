import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('user/rbac/element', params);
    },
    saveElement: params => {
        return API.POST('user/rbac/element', params);
    },
    updateElement: (id, params) => {
        return API.PUT('user/rbac/element/' + id, params);
    },
    deleteElement: id => {
        return API.POST('user/rbac/element/remove/' + id);
    },
    getByMenuId: (menuId, pageable) => {
        return API.GET('user/rbac/element/menu/' + menuId, pageable);
    }
};
