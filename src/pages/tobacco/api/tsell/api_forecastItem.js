import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/forecastItem';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveForecastItem: (params) => {
    return API.POST(baseUrl, params);
  },
  updateForecastItem: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteForecastIte: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
