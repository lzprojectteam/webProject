import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/envClassify';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveEnvClassify: (params) => {
    return API.POST(baseUrl, params);
  },
  updateEnvClassify: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteEnvClassify: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
