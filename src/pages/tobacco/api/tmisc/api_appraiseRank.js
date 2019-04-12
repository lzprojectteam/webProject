import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/appraiseRank';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveAppraiseRank: (params) => {
    return API.POST(baseUrl, params);
  },
  updateAppraiseRank: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteAppraiseRank: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
