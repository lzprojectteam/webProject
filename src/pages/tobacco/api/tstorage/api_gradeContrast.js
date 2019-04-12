import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/gradeContrast';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveGradeContrast: (params) => {
    return API.POST(baseUrl, params);
  },
  updateGradeContrast: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteGradeContrast: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
