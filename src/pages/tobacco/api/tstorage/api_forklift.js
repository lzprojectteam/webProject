import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/forklift';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveForklift: (params) => {
    return API.POST(baseUrl, params);
  },
  updateForklift: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteForklift: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
