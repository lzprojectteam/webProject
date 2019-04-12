import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/appraise';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveAppraise: (params) => {
    return API.POST(baseUrl, params);
  },
  updateAppraise: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteAppraise: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
