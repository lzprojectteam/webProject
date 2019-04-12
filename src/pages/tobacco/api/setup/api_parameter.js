import * as API from '@/api/index';

const baseUrl = 'tobacco/api/setup/parameter';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  saveParameter: (params) => {
    return API.POST(baseUrl, params);
  },
  updateParameter: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteParameter: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  },
  getParameterJson: (annual, organizationId) => {
    return API.GET(baseUrl + '/getParameterJson/annual/' + annual + '/organizationId/' + organizationId);
  },
  parameterBind: (annual, catalog, organizationId, organizeName, data) => {
    return API.PUT(baseUrl + '/bindParmeter/annual/' + annual + '/catalog/' + catalog + '/organizationId/' + organizationId + '/organizeName/' + organizeName, data);
  },
  showType: () => {
    return API.POST(baseUrl + '/showType');
  }
};
