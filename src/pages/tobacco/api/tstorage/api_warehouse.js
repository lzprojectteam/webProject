import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/warehouse';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveWarehouse: (params) => {
    return API.POST(baseUrl, params);
  },
  updateWarehouse: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteWarehouse: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  checkSerialno: (no) => {
    return API.PUT(baseUrl + '/checkSerialno/serialno/' + no);
  }
}
;
