import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/facilityExtend';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveFacilityExtend: (params) => {
    return API.POST(baseUrl, params);
  },
  updateFacilityExtend: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteFacilityExtend: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
