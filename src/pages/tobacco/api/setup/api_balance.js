import * as API from '@/api/index';

const baseUrl = 'tobacco/api/setup/balance';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveBalance: (params) => {
    return API.POST(baseUrl, params);
  },
  updateBalance: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteBalance: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  getBalanceJson: (organizeCode) => {
    return API.GET(baseUrl + '/getBalanceJson/organizeCode/' + organizeCode);
  },
  getBalanceUserJson: (organizeId) => {
    return API.GET(baseUrl + '/getBalanceUserJson/organizeid/' + organizeId);
  }
};
