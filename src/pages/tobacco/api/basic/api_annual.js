import * as API from '@/api/index';

export default {
  getAll: (params) => {
    return API.GET('tobacco/api/basic/annual', params);
  },
  saveAnnual: (params) => {
    return API.POST('tobacco/api/basic/annual', params);
  },
  updateAnnual: (id, params) => {
    return API.PUT('tobacco/api/basic/annual/' + id, params);
  },
  deleteAnnual: (id) => {
    return API.POST('tobacco/api/basic/annual/remove/' + id);
  }
}
;
