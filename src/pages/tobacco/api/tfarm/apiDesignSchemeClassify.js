import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/designSchemeClassify';
export default {
    getAll: ( params) => {
        return API.GET(baseUrl, params);
    },
    saveDesignSchemeClassify: (params) => {
        return API.POST(baseUrl, params);
    },
    updateDesignSchemeClassify: (id, params) => {
        return API.PUT(baseUrl+'/'+id, params);
    },
    deleteDesignSchemeClassify:(id)=>{
        return API.POST(baseUrl+'/remove/'+id);
    }
}
;
