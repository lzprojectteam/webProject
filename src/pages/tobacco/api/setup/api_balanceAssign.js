import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tsell/balanceAssign';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  updateBalanceAssign: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteBalanceAssign: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  saveList: (balanceId, lineId, roleId, epid) => {
    return API.PUT(baseUrl + '/saveList/balanceId/' + balanceId + '/lineId/' + lineId + '/roleId/' + roleId + '/epid/' + epid);
  },
  saveBalanceAssign: (balanceId, lineId, roleId, name, loginId, flag) => {
    return API.PUT(baseUrl + '/saveBalanceAssign/balanceId/' + balanceId + '/lineId/' + lineId + '/roleId/' + roleId + '/name/' + name + '/loginId/' + loginId + '/flag/' + flag);
  },
  getParam: (params) => {
    return API.GET('/rbac/api/user?valid=true', params);
  },
};
