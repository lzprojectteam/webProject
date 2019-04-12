import * as API from '@/api/index';
const baseUrl = 'tobacco/api/tsell/receipt';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveReceipt: params => {
        return API.POST(baseUrl, params);
    },
    updateReceipt: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteReceipt: id => {
        return API.DELETE(baseUrl + '/' + id);
    },
    createReceipt: uid => {
        return API.GET(baseUrl + '/createReceipt/uid/' + uid);
    },
    release: deliveryId => {
        return API.GET(baseUrl + '/release/deliveryId/' + deliveryId);
    },
    buttonSupportFee_actionListener: (organizationId, uid) => {
        return API.GET(
            baseUrl +
                '/buttonSupportFee_actionListener/organizationId/' +
                organizationId +
                '/uid/' +
                uid
        );
    },
    getMaxFeeNo: (organizationId, type) => {
        return API.GET(
            baseUrl +
                '/getMaxFeeNo/organizationId/' +
                organizationId +
                '/type/' +
                type
        );
    },
    getHtmlFile: () => {
        return API.GET('/zuul/tobacco/support_fee.html');
    }
};
