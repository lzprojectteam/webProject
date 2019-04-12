import * as API from '@/api/index';

const baseUrl = 'tobacco/api/setup/lineRole';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveLineRole: (params) => {
    return API.POST(baseUrl, params);
  },
  updateLineRole: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteLineRole: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
