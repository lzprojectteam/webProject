import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/facilityCoordinate';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveFacilityCoordinate: (params) => {
    return API.POST(baseUrl, params);
  },
  updateFacilityCoordinate: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteFacilityCoordinate: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
