import * as API from '@/api/index';

const baseUrl = 'tobacco/api/tsell/seContract';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    getAllData: params => {
        return API.GET(baseUrl + '/all', params);
    },
    saveSeContract: params => {
        return API.POST(baseUrl, params);
    },
    updateSeContract: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteSeContract: id => {
        return API.DELETE(baseUrl + '/' + id);
    },
    checkNumer: (mark, number, params) => {
        return API.GET(
            baseUrl + '/mark/' + mark + '/checkNumber/' + number,
            params
        );
    },
    updateControl: (mark, ids, orgId) => {
        return API.PUT(
            baseUrl +
                '/updateControl/mark/' +
                mark +
                '/ids/' +
                ids +
                '/orgId/' +
                orgId
        );
    },
    getContractInfoListByOrgId: orgId => {
        return API.PUT(baseUrl + '/getContractInfoListByOrgId/orgId/' + orgId);
    }
};
