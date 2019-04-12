import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/books';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveBooks: (params) => {
    return API.POST(baseUrl, params);
  },
  updateBooks: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  /*deleteBooks: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },*/
  deleteBooks: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  checkCode: (code) => {
    return API.PUT(baseUrl + '/checkCode/code/' + code);
  },
  updateControl: (id, mark, flag) => {
    return API.PUT(baseUrl + '/updateControl/id/' + id + '/mark/' + mark + '/flag/' + flag);
  },
};
