import * as API from '@/api/index';

const baseUrl = 'tobacco/api/setup/attribute';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveAttribute: (params) => {
    return API.POST(baseUrl, params);
  },
  updateAttribute: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteAttribute: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  showType: () => {
    return API.POST(baseUrl + '/showtype');
  }
}
;
