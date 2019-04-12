import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/transportItem';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveTransportItem: (params) => {
    return API.POST(baseUrl, params);
  },
  updateTransportItem: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteTransportItem: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
