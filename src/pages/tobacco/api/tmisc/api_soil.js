import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/soil';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveSoil: (params) => {
    return API.POST(baseUrl, params);
  },
  updateSoil: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteSoil: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
