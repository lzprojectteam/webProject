import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/invoice';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveInvoice: (params) => {
    return API.POST(baseUrl, params);
  },
  updateInvoice: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteInvoice: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
};
