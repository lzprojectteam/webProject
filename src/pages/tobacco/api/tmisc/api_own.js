import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/own';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveOwn: (params) => {
    return API.POST(baseUrl, params);
  },
  updateOwn: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteOwn: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
