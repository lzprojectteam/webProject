import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/operation';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveOperation: (params) => {
    return API.POST(baseUrl, params);
  },
  updateOperation: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteOperation: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
