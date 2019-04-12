import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/invoiceTrace';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveInvoiceTrace: (params) => {
    return API.POST(baseUrl, params);
  },
  updateInvoiceTrace: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteInvoiceTrace: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
};
