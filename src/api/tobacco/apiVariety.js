import * as API from '@/api/index'

export default {
    getAll: params => {
        return API.GET('tobacco/api/basic/variety', params)
    },
    saveVariety: params => {
        return API.POST('tobacco/api/basic/variety', params)
    },
    updateVariety: (id, params) => {
        return API.PUT('tobacco/api/basic/variety/' + id, params)
    },
    deleteVariety: id => {
        return API.POST('tobacco/api/basic/variety/remove/' + id)
    }
}
