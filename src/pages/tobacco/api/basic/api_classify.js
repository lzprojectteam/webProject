import * as API from '@/api/index';

export default {
  getAll: (params) => {
    return API.GET('tobacco/api/basic/classify', params);
  },
  saveClassify: (params) => {
    return API.POST('tobacco/api/basic/classify', params);
  },
  updateClassify: (id, params) => {
    return API.PUT('tobacco/api/basic/classify/' + id, params);
  },
  deleteClassify: (id) => {
    return API.POST('tobacco/api/basic/classify/remove/' + id);
  }
}
;
