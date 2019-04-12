import * as API from '@/api/index'

export default {
    getAll: params => {
        return API.GET('tobacco/api/basic/type', params)
    },
    saveType: params => {
        return API.POST('tobacco/api/basic/type', params)
    },
    updateType: (id, params) => {
        return API.PUT('tobacco/api/basic/type/' + id, params)
    },
    deleteType: id => {
        return API.POST('tobacco/api/basic/type/remove/' + id)
    }
}
