import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/billItem';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveBillItem: (params) => {
    return API.POST(baseUrl, params);
  },
  updateBillItem: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteBillItem: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
