import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/bakeProgressTrace';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  getByBakeProgressId: ( id) => {
    return API.GET(baseUrl + '/bakeProgress/' + id);
  },
  saveBakeProgressTrace: (params) => {
    return API.POST(baseUrl, params);
  },
  updateBakeProgressTrace: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteBakeProgressTrace: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  }
}
;
