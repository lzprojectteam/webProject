import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/infrastructure';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveInfrastructure: (params) => {
    return API.POST(baseUrl, params);
  },
  updateInfrastructure: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteInfrastructure: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
