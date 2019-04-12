import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/processAttrEnum';
export default {
    getAll: ( params) => {
        return API.GET(baseUrl, params);
    },
    saveProcessAttrEnum: (params) => {
        return API.POST(baseUrl, params);
    },
    updateProcessAttrEnum: (id, params) => {
        return API.PUT(baseUrl+'/'+id, params);
    },
    deleteProcessAttrEnum:(id)=>{
        return API.POST(baseUrl+'/remove/'+id);
    }
}
;
