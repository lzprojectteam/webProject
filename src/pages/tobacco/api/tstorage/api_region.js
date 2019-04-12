import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/region';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveRegion: (params) => {
    return API.POST(baseUrl, params);
  },
  updateRegion: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteRegion: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  checkNumber: (no) => {
    return API.PUT(baseUrl + '/checkNumber/number/' + no);
  }
}
;
