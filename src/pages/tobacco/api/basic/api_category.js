import * as API from '@/api/index';
const baseUrl = 'tobacco/api/basic/category';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveHrClassify: (params) => {
    return API.POST(baseUrl, params);
  },
  updateHrClassify: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteHrClassify: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
};
