import * as API from '@/api/index';

const baseUrl = 'tobacco/api/thuman/hrEmployee';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  getFramerList: (id, params) => {
    return API.GET(baseUrl + '/getFramerList/id/' + id, params);
  },
  saveHrEmployee: (params) => {
    return API.POST(baseUrl, params);
  },
  updateHrEmployee: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteHrEmployee: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  saveEntity: (params) => {
    return API.POST(baseUrl + '/saveEntity', params);
  },
  checkNumer: (mark, number, params) => {
    return API.GET(baseUrl + '/mark/' + mark + '/checkNumber/' + number, params);
  },
  bindUser: (hrEmployeeId, loginId, loginName) => {
    return API.PUT(baseUrl + '/bindUser/hrEmployeeId/' + hrEmployeeId + '/loginId/' + loginId + '/loginName/' + loginName);
  },
  releaseBind: (hrEmployeeId) => {
    return API.PUT(baseUrl + '/releaseBind/hrEmployeeId/' + hrEmployeeId);
  }
};
