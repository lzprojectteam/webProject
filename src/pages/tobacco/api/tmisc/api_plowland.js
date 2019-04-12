import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/plowland';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  savePlowland: (params) => {
    return API.POST(baseUrl, params);
  },
  updatePlowland: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deletePlowland: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
