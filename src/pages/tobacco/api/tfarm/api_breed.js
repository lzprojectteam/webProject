import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/breed';
export default {
  getAll: params => {
    return API.GET(baseUrl, params);
  },
  saveBreed: params => {
    return API.POST(baseUrl, params);
  },
  updateBreed: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteBreed: id => {
    return API.POST(baseUrl + '/remove/' + id);
  }
};
