import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/standWeightSet';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveStandWeightSet: (params) => {
    return API.POST(baseUrl, params);
  },
  updateStandWeightSet: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteStandWeightSet: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
