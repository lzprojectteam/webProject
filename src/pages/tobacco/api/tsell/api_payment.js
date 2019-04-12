import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/payment';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  savePayment: (params) => {
    return API.POST(baseUrl, params);
  },
  updatePayment: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deletePayment: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
};
