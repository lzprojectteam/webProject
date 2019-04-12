import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/billOut';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  getWarehouse: (params) => {
    return API.GET(baseUrl + '/getWarehouse', params);
  },
  saveBillOut: (params) => {
    return API.POST(baseUrl + '/saveBillOut', params);
  },
  save: (params) => {
    return API.POST(baseUrl, params);
  },
  updateBillOut: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  updateBillOut2: (id, params) => {
    return API.PUT(baseUrl + '/updateBillOut/' + id, params);
  },
  deleteBillOut: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  deleteBillOut2: (id) => {
    return API.DELETE(baseUrl + '/deleteBillOut/' + id);
  },
  approval: (id, mark) => {
    return API.POST(baseUrl + '/approval/id/' + id + '/mark/' + mark);
  },
  getItem: (id) => {
    return API.POST(baseUrl + '/getItem/id/' + id);
  },
  getWarehouseList: (params) => {
    return API.GET(baseUrl + '/getWarehouse', params);
  },
}
;
