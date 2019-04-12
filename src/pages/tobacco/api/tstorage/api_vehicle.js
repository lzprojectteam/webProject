import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/vehicle';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveVehicle: (params) => {
    return API.POST(baseUrl, params);
  },
  updateVehicle: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteVehicle: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
