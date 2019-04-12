import * as API from '@/api/index';

export default {
  getAll: (params) => {
    return API.GET('tobacco/api/basic/price', params);
  },
  savePrice: (params) => {
    return API.POST('tobacco/api/basic/price', params);
  },
  updatePrice: (id, params) => {
    return API.PUT('tobacco/api/basic/price/' + id, params);
  },
  deletePrice: (id) => {
    return API.POST('tobacco/api/basic/price/remove/' + id);
  },
  getPriceJson: (params) => {
    return API.GET('tobacco/api/basic/price/getListByAnnualAndVariety', params);
  }
}
;
