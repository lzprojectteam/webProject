import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/inventoryLoss';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveInventoryLoss: (params) => {
    return API.POST(baseUrl, params);
  },
  updateInventoryLoss: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteInventoryLoss: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
};
