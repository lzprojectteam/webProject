import * as API from '@/api/index';
const baseUrl = 'user/org/district';
export default {
    getAll: params => {
        return API.GET(baseUrl, params);
    },
    saveDistrict: params => {
        return API.POST(baseUrl, params);
    },
    updateDistrict: (id, params) => {
        return API.PUT(baseUrl + '/' + id, params);
    },
    deleteDistrict: id => {
        return API.POST(baseUrl + '/remove/' + id);
    },
    getByLead: (lead, annual) => {
        return API.GET(baseUrl + '/tree/' + lead + '?annual=' + annual);
    },
    /**
     * 按年度更新组织单位名称
     */
    updateName: (id, annual, name) => {
        return API.POST(
            baseUrl +
                '/districtId/{districtId}/annual/{annual}/rename/{name}'.format(
                    {
                        annual: annual,
                        districtId: id,
                        name: name
                    }
                )
        );
    },
    /**
     * 按年度启停组织单位,action: 0->停用，1->启用
     */
    startOrStop: (id, annual, action) => {
        let url = baseUrl + '/districtId/{districtId}/annual/{annual}/start';
        if (action === 0) {
            url = baseUrl + '/districtId/{districtId}/annual/{annual}/stop';
        }
        return API.POST(url.format({ annual: annual, districtId: id }));
    },
    /**
     * 根据组织单位编码，获取其中的禁用名单位
     */
    getDisabledList: (annual, districtIds) => {
        return API.GET(baseUrl + '/disabled', {
            districtIds: districtIds,
            annual: annual
        });
    }
};
