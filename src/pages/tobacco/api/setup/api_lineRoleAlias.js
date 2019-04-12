import * as API from '@/api/index';

const baseUrl = 'tobacco/api/setup/lineRoleAlias';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveLineRoleAlias: (params) => {
    return API.POST(baseUrl, params);
  },
  updateLineRoleAlias: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteLineRoleAlias: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
