import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/inventoryDetail';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveInventoryDetail: (params) => {
    return API.POST(baseUrl, params);
  },
  updateInventoryDetail: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteInventoryDetail: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
