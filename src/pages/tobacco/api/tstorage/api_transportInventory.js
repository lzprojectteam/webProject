import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/transportInventory';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveTransportInventory: (params) => {
    return API.POST(baseUrl, params);
  },
  updateTransportInventory: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteTransportInventory: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
