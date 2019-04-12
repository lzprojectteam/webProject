import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/billCheckItem';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveBillCheckItem: (params) => {
    return API.POST(baseUrl, params);
  },
  updateBillCheckItem: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteBillCheckItem: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
