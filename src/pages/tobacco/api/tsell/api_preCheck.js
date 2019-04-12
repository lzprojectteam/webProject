import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/precheck';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  savePreCheck: (params) => {
    return API.POST(baseUrl, params);
  },
  updatePreCheck: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deletePreCheck: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
