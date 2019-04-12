import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/operationFromTo';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveOperationFromTo: (params) => {
    return API.POST(baseUrl, params);
  },
  updateOperationFromTo: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteOperationFromTo: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
