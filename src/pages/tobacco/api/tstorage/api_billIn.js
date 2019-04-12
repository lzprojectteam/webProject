import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/billIn';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveBillIn: (params) => {
    return API.POST(baseUrl, params);
  },
  saveBillOut: (params) => {
    return API.POST(baseUrl, params);
  },
  updateBillIn: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteBillIn: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  approval: (id, mark) => {
    return API.POST(baseUrl + '/approval/id/' + id + '/mark/' + mark);
  },
  getItem: (id) => {
    return API.POST(baseUrl + '/getItem/id/' + id);
  },
  reset: (id) => {
    return API.POST(baseUrl + '/reset/' + id);
  },
}
;
