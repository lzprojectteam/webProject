import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/stock';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveStock: (params) => {
    return API.POST(baseUrl, params);
  },
  updateStock: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteStock: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
