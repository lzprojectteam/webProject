import * as API from '@/api/index';

const baseUrl = 'tobacco/api/thuman/hrTeam';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveHrTeam: (params) => {
    return API.POST(baseUrl, params);
  },
  updateHrTeam: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteHrTeam: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  checkNumer: (mark, number, params) => {
    return API.GET(baseUrl + '/mark/' + mark + '/checkNumber/' + number, params);
  }
}
;
