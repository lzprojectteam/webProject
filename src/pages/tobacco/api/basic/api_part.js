import * as API from '@/api/index';

export default {
  getAll: (params) => {
    return API.GET('tobacco/api/basic/part', params);
  },
  savePart: (params) => {
    return API.POST('tobacco/api/basic/part', params);
  },
  updatePart: (id, params) => {
    return API.PUT('tobacco/api/basic/part/' + id, params);
  },
  deletePart: (id) => {
    return API.POST('tobacco/api/basic/part/remove/' + id);
  }
}
;
