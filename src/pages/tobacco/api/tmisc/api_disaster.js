import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/disaster';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveDisaster: (params) => {
    return API.POST(baseUrl, params);
  },
  updateDisaster: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteDisaster: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
