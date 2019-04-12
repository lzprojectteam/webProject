import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/transport';
export default {
  /* getAll: (params) => {
     return API.GET(baseUrl, params);
   },*/
  getAll: (params) => {
    return API.GET(baseUrl + '/getListNew', params);
  },
  saveTransport: (params) => {
    return API.POST(baseUrl, params);
  },
  updateTransport: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  reviewTransport: (id) => {
    return API.PUT(baseUrl + '/approval/id/' + id);
  },
  export: (id) => {
    return API.GET(baseUrl + '/export/id/' + id);
  },
  deleteTransport: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  readcard: () => {
    return API.GET('http://127.0.0.1:7777/api/v1/hardware/ats522/no');
  }
}
;
