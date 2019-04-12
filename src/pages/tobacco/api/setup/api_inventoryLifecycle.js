import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tsell/inventoryLifecycle';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveInventoryLifecycle: (params) => {
    return API.POST(baseUrl, params);
  },
  updateInventoryLifecycle: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteInventoryLifecycle: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
