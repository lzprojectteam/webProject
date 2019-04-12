import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tsell/applybreachofcontract';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveApplybreachofcontract: (params) => {
    return API.POST(baseUrl, params);
  },
  updateApplybreachofcontract: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteApplybreachofcontract: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  approval: (id, examinePerson, examineSuggestion, examineDate, flag) => {
    return API.POST(baseUrl + '/approval/id/' + id + '/examinePerson/' + examinePerson + '/examineSuggestion/' + examineSuggestion + '/examineDate/' + examineDate + '/flag/' + flag);
  }
}
;
