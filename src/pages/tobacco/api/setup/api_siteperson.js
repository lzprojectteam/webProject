import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tsell/siteperson';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveSiteperson: (params) => {
    return API.POST(baseUrl, params);
  },
  updateSiteperson: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteSiteperson: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
