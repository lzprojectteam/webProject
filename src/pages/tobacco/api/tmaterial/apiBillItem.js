import * as API from '@/api/index';
const baseUrl = 'material/api/tmaterial/billItem';
export default {
  getAll: params => {
    return API.GET(baseUrl, params);
  },
  save: params => {
    return API.POST(baseUrl, params);
  },
  update: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  delete: id => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  saveOrUpdate: (id, params) => {
    return API.POST(baseUrl + '/force', params);
  },
  softDelete: id => {
    return API.DELETE(baseUrl + '/' + id);
  },
  saveAll: (billItem, billItemConvert) => {
    return API.POST(baseUrl + '/all', {
      billItemConvert: billItemConvert,
      billItem: billItem
    });
  }
};
