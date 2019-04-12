import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tfarm/grid';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveGrid: params => {
        return API.POST(baseUrl, params);
    },
    updateGrid: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteGrid: id => {
        return API.POST(baseUrl + '/remove/' + id);
    },
    saveBelongTo: params => {
        return API.POST(baseUrl + '/belongto/list', params);
    },
    saveJurisdiction: params => {
        return API.POST(baseUrl + '/jurisdiction/list', params);
    },
    getBelongToByGridId: (gridId, annual) => {
        return API.GET(
            baseUrl +
                '/grid/{gridId}/belongto/list?annual={annual}'.format({
                    gridId: gridId,
                    annual: annual
                })
        );
    },
    getJurisdictionByGridId: gridId => {
        return API.GET(
            baseUrl +
                '/grid/{gridId}/jurisdiction/list'.format({ gridId: gridId })
        );
    },
    deleteJurisdictionById: id => {
        return API.DELETE(baseUrl + '/jurisdiction/' + id);
    },
    deleteBelongToById: id => {
        return API.DELETE(baseUrl + '/belongto/' + id);
    }
};
