import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/smokepoint';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveSmokepoint: (params) => {
    return API.POST(baseUrl, params);
  },
  updateSmokepoint: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteSmokepoint: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
