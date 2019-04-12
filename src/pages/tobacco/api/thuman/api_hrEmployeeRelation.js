import * as API from '@/api/index';

const baseUrl = 'tobacco/api/thuman/hrEmployeeRelation';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveHrEmployeeRelation: (params) => {
    return API.POST(baseUrl, params);
  },
  //批量绑定
  oneKeyBindings: (mark, params) => {
    return API.PUT(baseUrl + '/oneKeyBindings/mark/' + mark, params);
  },
  //选中解绑
  ReleaseBind: (params) => {
    return API.PUT(baseUrl + '/ReleaseBind', params);
  },
  //一键解绑
  oneKeyReleaseBind: (params) => {
    return API.PUT(baseUrl + '/oneKeyReleaseBind', params);
  },
  updateHrEmployeeRelation: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteHrEmployeeRelation: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  saveAll: (params) => {
    return API.POST(baseUrl + '/list', params);
  }
};
