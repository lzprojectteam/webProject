import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/plantPlanArea';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  savePlantPlanArea: (params) => {
    return API.POST(baseUrl, params);
  },
  updatePlantPlanArea: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deletePlantPlanArea: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
