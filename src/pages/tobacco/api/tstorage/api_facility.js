import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/facility';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveFacility: (params) => {
    return API.POST(baseUrl, params);
  },
  updateFacility: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteFacility: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  checkSerialno: (no) => {
    return API.PUT(baseUrl + '/checkSerialno/serialno/' + no);
  }
}
;
