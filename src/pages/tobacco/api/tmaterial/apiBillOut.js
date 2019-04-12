import * as API from '@/api/index';
const baseUrl = 'material/api/tmaterial/billout';
export default {
  getAll: params => {
    return API.GET(baseUrl, params);
  },
  save: params => {
    return API.POST(baseUrl, params);
  },
  update: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  delete: id => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  saveOrUpdate: (id, params) => {
    return API.POST(baseUrl + '/force', params);
  },
  softDelete: id => {
    return API.DELETE(baseUrl + '/' + id);
  },
  saveItem: params => {
    return API.POST(baseUrl + '/item', params);
  },
  audit: billId => {
    return API.PUT(baseUrl + '/{billId}/audit'.format({ billId: billId }));
  },
  auditMove: (billId, operation) => {
    return API.PUT(
      baseUrl +
      '/{billId}/audit/operation/{operation}'.format({
        billId: billId,
        operation: operation
      })
    );
  },
  getNotEnter: (organizationId, keyword, params) => {
    return API.PUT(
      baseUrl + '/not/enter',
      Object.assign(
        { organizationId: organizationId, keyword: keyword },
        params
      )
    );
  },

  saveAll: (billOut, billItemList) => {
    return API.POST(baseUrl + '/all', {
      billOut: billOut,
      billItemEntityList: billItemList
    });
  }
};
