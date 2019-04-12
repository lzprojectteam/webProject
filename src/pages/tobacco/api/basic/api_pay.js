import * as API from '@/api/index';

export default {
  getAll: (params) => {
    return API.GET('tobacco/api/basic/pay', params);
  },
  savePay: (params) => {
    return API.POST('tobacco/api/basic/pay', params);
  },
  updatePay: (id, params) => {
    return API.PUT('tobacco/api/basic/pay/' + id, params);
  },
  deletePay: (id) => {
    return API.POST('tobacco/api/basic/pay/remove/' + id);
  }
}
;
