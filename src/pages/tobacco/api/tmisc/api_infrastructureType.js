import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/infrastructureType';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveInfrastructureType: (params) => {
    return API.POST(baseUrl, params);
  },
  updateInfrastructureType: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteInfrastructureType: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
