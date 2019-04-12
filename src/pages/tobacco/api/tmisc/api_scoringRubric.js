import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tmisc/scoringRubric';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveScoringRubric: (params) => {
    return API.POST(baseUrl, params);
  },
  updateScoringRubric: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteScoringRubric: (id) => {
    return API.POST(baseUrl + '/remove/' + id);
  }
}
;
