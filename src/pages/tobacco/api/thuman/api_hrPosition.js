import * as API from '@/api/index';
const baseUrl = 'tobacco/api/thuman/hrPosition';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveHrPosition: (params) => {
    return API.POST(baseUrl, params);
  },
  updateHrPosition: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteHrPosition: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
};
