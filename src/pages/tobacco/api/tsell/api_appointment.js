import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/appointment';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveAppointment: (params) => {
    return API.POST(baseUrl, params);
  },
  updateAppointment: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteAppointment: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
