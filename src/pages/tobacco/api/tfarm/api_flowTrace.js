import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/flowTrace';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveFlowTrace: (params) => {
    return API.POST(baseUrl, params);
  },
  updateFlowTrace: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteFlowTrace: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
