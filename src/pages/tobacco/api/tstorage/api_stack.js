import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/stack';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveStack: (params) => {
    return API.POST(baseUrl, params);
  },
  updateStack: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteStack: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
