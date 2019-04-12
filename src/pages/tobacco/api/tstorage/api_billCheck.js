import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/billCheck';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveBillCheck: (params) => {
    return API.POST(baseUrl, params);
  },
  updateBillCheck: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteBillCheck: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  getItem: (id) => {
    return API.POST(baseUrl + '/getItem/checkId/' + id);
  },
  approval: (id, mark) => {
    return API.POST(baseUrl + '/approval/id/' + id + '/mark/' + mark);
  },
  approval_recheck: (id, mark) => {
    return API.POST(baseUrl + '/approval/recheck/id/' + id + '/mark/' + mark);
  },
}
;
