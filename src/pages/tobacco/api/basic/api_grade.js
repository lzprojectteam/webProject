import * as API from '@/api/index';

export default {
  getAll: (params) => {
    return API.GET('tobacco/api/basic/grade', params);
  },
  saveGrade: (params) => {
    return API.POST('tobacco/api/basic/grade', params);
  },
  updateGrade: (id, params) => {
    return API.PUT('tobacco/api/basic/grade/' + id, params);
  },
  deleteGrade: (id) => {
    return API.POST('tobacco/api/basic/grade/remove/' + id);
  }
}
;
