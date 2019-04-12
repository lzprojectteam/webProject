import * as API from '@/api/index';
import qs from 'querystring';

export default {
    getAllTable: params => {
        return API.GET('user/online/table', params);
    },
    generator: tableId => {
        return API.POST('user/online/table/{0}/generator'.format(tableId));
    },
    generatorAll: tableIds => {
        return API.POST('user/online/table/batch/generator', tableIds, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            paramsSerializer: function(params) {
                return qs.stringify(params);
            },
            params: tableIds,
            timeout: 60000
        });
    },
    clearSourceDir: () => {
        return API.POST('user/online/table/clear/outdir');
    },
    downloadSource: () => {
        return API.GET_NATIVE('user/online/table/source', {
            responseType: 'blob',
            headers: {
                Accept: 'application/octet-stream'
            }
        });
    },
    getTableByTableId: tableId => {
        return API.GET('user/online/table/{0}/json'.format(tableId));
    },
    getPropertyList: tableId => {
        return API.GET('user/online/table/{0}/property'.format(tableId));
    },
    getForeignKeyList: tableId => {
        return API.GET('user/online/table/{0}/foreign'.format(tableId));
    },
    getIndexList: tableId => {
        return API.GET('user/online/table/{0}/index'.format(tableId));
    },
    saveTable: params => {
        return API.POST('user/online/table/json', params);
    },
    updateTable: (tableId, params) => {
        return API.PUT('user/online/table/{0}/json'.format(tableId), params);
    },
    deleteTable: tableId => {
        return API.POST('user/online/table/remove/' + tableId);
    },
    getSchemaTableList: datasourceId => {
        return API.GET('user/online/table/pgsql/' + datasourceId);
    },
    getTableDataList: (datasourceId, schemaName, tableName) => {
        return API.GET(
            'user/online/table/pgsql/{datasourceId}/{schemaName}/{tableName}'.format(
                {
                    datasourceId: datasourceId,
                    schemaName: schemaName,
                    tableName: tableName
                }
            )
        );
    }
};
