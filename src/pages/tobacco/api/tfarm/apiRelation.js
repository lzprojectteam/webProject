import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/relation';
export default {
    getAll: ( params) => {
        return API.GET(baseUrl, params);
    },
    saveRelation: (params) => {
        return API.POST(baseUrl, params);
    },
    updateRelation: (id, params) => {
        return API.PUT(baseUrl+'/'+id, params);
    },
    deleteRelation:(id)=>{
        return API.POST(baseUrl+'/remove/'+id);
    }
}
;
