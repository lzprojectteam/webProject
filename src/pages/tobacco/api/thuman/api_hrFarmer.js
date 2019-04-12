import * as API from '@/api/index';

const baseUrl = 'tobacco/api/thuman/hrFarmer';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveHrFarmer: (params) => {
    return API.POST(baseUrl, params);
  },
  updateHrFarmer: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  updateDistrictId: (districtId, districtName, params) => {
    return API.PUT(baseUrl + '/updateDistrictId/' + districtId + '/' + districtName, params);
  },
  deleteHrFarmer: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
};
