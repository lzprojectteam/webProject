import * as API from '@/api/index';
const baseUrl = 'tobacco/api/setup/station';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveStation: (params) => {
    return API.POST(baseUrl, params);
  },
  updateStation: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteStation: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
