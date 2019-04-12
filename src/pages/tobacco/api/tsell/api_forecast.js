import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/forecast';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveForecast: (params) => {
    return API.POST(baseUrl, params);
  },
  updateForecast: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteForecast: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
