import * as API from '@/api/index';
const baseUrl = 'tobacco/api/basic/card';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveCard: (params) => {
    return API.POST(baseUrl, params);
  },
  updateCard: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteCard: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
