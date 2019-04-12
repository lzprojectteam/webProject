import * as API from '@/api/index';

export default {
  getAll: (params) => {
    return API.GET('tobacco/api/basic/rank', params);
  },
  saveRank: (params) => {
    return API.POST('tobacco/api/basic/rank', params);
  },
  updateRank: (id, params) => {
    return API.PUT('tobacco/api/basic/rank/' + id, params);
  },
  deleteRank: (id) => {
    return API.POST('tobacco/api/basic/rank/remove/' + id);
  }
}
;
