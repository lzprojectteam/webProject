import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tsell/delivery';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveDelivery: (params) => {
    return API.POST(baseUrl, params);
  },
  updateDelivery: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteDelivery: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  getReport: (orgId, beginDate, endDate, orgName, params) => {
    return API.GET(baseUrl + '/getReport/orgId/' + orgId + '/beginDate/' + beginDate + '/endDate/' + endDate + '/orgName/' + orgName, params);
  },
  getBankrollReport: (orgId, beginDate, endDate, annual) => {
    return API.GET(baseUrl + '/getBankrollReport/orgId/' + orgId + '/beginDate/' + beginDate + '/endDate/' + endDate + '/annual/' + annual);
  },
  getPackageReport: (params) => {
    return API.GET('tobacco/api/common/report/packagedStandBook', params);
  },
  getPurchaseAndStorage: (params) => {
    return API.GET('tobacco/api/common/report/purchaseAndStorage ', params);
  }
};
