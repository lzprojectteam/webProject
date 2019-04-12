import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/rotation';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveRotation: (params) => {
    return API.POST(baseUrl, params);
  },
  updateRotation: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteRotation: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
