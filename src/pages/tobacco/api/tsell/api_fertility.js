import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tsell/fertility';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveFertility: (params) => {
    return API.POST(baseUrl, params);
  },
  updateFertility: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteFertility: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  approval: (id) => {
    return API.POST(baseUrl + '/' + id + '/approval');
  }
}
;
