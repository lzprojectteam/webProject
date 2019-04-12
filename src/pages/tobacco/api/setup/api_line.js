import * as API from '@/api/index';

const baseUrl = 'tobacco/api/setup/line';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveLine: (params) => {
    return API.POST(baseUrl, params);
  },
  updateLine: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteLine: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  getOnde: (id) => {
    return API.GET(baseUrl + '/' + id);
  }
};
