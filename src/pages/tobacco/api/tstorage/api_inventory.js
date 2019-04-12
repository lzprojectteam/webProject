import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tstorage/inventory';
export default {
  getAll: (params) => {
    return API.GET(baseUrl, params);
  },
  getInventoryListByRelationId: (params) => {
    return API.GET(baseUrl + '/getInventoryListByRelationId', params);
  },
  getInventoryNewListByRelationId: (params) => {
    return API.GET(baseUrl + '/getInventoryNewListByRelationId', params);
  },
  saveInventory: (params) => {
    return API.POST(baseUrl, params);
  },
  batchPack: (params) => {
    return API.POST(baseUrl + '/batchPack', params);
  },
  updateInventory: (id, params) => {
    return API.PUT(baseUrl + '/' + id, params);
  },
  deleteInventory: (id) => {
    return API.DELETE(baseUrl + '/' + id);
  },
  upload: (params) => {
    return API.PUT(baseUrl + '/batch/upload', params);
  },
  getStandardWeightAndUnpackWeight: (typeId, varietyId, gradeId, orgId) => {
    return API.GET(baseUrl + '/getStandardWeightAndUnpackWeight/' + typeId +
      '/' + varietyId + '/' + gradeId + '/' + orgId);
  },
  deleteInventory2: (id) => { //查看烟包界面的删除
    return API.POST('tobacco/api/tstorage/inventoryTrace/remove/' + id);
  },
  updateInventory2: (id, weight) => { //查看烟包界面的更新
    return API.POST('tobacco/api/tstorage/inventoryTrace/updateWeight/' + id + '/' + weight);
  },
}
;
