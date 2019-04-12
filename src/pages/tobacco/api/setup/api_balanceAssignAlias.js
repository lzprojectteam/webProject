import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tsell/balanceAssignAlias';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveBalanceAssignAlias: (params) => {
    return API.POST(baseUrl, params);
  },
  updateBalanceAssignAlias: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteBalanceAssignAlias: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  getBalanceAssignAliasList: (balanceId, lineId, roleId, assignId) => {
    return API.PUT(baseUrl + '/getBalanceAssignAliasList/balanceId/' + balanceId + '/lineId/' + lineId + '/roleId/' + roleId + '/assignId/' + assignId);
  },
  saveList: (params) => {
    return API.POST(baseUrl + '/list', params);
  },
  getUserMappingJson: (organizationId) => {
    return API.GET(baseUrl + '/getUserMappingJson/organizationId/' + organizationId);
  },
}
;
