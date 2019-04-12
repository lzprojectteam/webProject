import * as API from '@/api/index';

export default {
  getAll: (params) => {
    return API.GET('tobacco/api/basic/status', params);
  },
  saveStatus: (params) => {
    return API.POST('tobacco/api/basic/status', params);
  },
  updateStatus: (id, params) => {
    return API.PUT('tobacco/api/basic/status/' + id, params);
  },
  deleteStatus: (id) => {
    return API.POST('tobacco/api/basic/status/remove/' + id);
  }
}
;
