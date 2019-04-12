import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/bakeProgress';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  review: ( params) => {
    return API.PUT(baseUrl + '/review', params);
  },
  unreview: ( params) => {
    return API.PUT(baseUrl + '/unreview', params);
  },
  saveBakeProgress: (params) => {
    return API.POST(baseUrl, params);
  },
  updateBakeProgress: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteBakeProgress: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
