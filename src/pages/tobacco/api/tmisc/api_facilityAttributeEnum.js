import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/facilityAttributeEnum';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveFacilityAttributeEnum: (params) => {
    return API.POST(baseUrl, params);
  },
  updateFacilityAttributeEnum: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteFacilityAttributeEnum: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
