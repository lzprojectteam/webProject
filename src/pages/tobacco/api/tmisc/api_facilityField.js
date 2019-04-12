import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/facilityField';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveFacilityField: (params) => {
    return API.POST(baseUrl, params);
  },
  updateFacilityField: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteFacilityField: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
