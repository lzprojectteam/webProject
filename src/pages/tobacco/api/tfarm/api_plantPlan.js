import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/plantPlan';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  savePlantPlan: (params) => {
    return API.POST(baseUrl, params);
  },
  updatePlantPlan: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deletePlantPlan: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
