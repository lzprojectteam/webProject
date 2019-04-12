import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/appointmentTime';
export default {
  getAll: ( params) => {
    return API.GET(baseUrl, params);
  },
  saveAppointmentTime: (params) => {
    return API.POST(baseUrl, params);
  },
  updateAppointmentTime: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteAppointmentTime: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  getExsitOrgId: ( appTimeId) => {
    return API.GET(baseUrl + '/{id}/organization'.format({id: appTimeId}));
  },
  saveAppTimeRelation: (params) => {
    return API.POST(baseUrl + '/id', params);
  },
  removeAppTimeRelation: (appTimeId, orgId) => {
    return API.POST(baseUrl + '/remove/{id}/organization/{orgId}'.format({id: appTimeId, orgId: orgId}));
  },
}
;
