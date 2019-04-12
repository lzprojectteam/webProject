import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/land';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveLand: (params) => {
    return API.POST(baseUrl, params);
  },
  updateLand: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteLand: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
