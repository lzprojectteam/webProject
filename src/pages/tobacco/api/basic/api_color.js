import * as API from '@/api/index';

export default {
  getAll: (params) => {
    return API.GET('tobacco/api/basic/color', params);
  },
  saveColor: (params) => {
    return API.POST('tobacco/api/basic/color', params);
  },
  updateColor: (id, params) => {
    return API.PUT('tobacco/api/basic/color/' + id, params);
  },
  deleteColor: (id) => {
    return API.POST('tobacco/api/basic/color/remove/' + id);
  }
}
;
