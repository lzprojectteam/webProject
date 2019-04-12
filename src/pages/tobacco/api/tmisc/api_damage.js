import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/damage';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveDamage: (params) => {
    return API.POST(baseUrl, params);
  },
  updateDamage: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteDamage: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
