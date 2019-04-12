import * as API from '@/api/index';

export default {
    getAll: params => {
        return API.GET('user/org/organization', params);
    },
    getById: id => {
        return API.GET('user/org/organization/' + id);
    },
    saveOrganization: params => {
        return API.POST('user/org/organization', params);
    },
    updateOrganization: (id, params) => {
        return API.PUT('user/org/organization/' + id, params);
    },
    deleteOrganization: id => {
        return API.POST('user/org/organization/remove/' + id);
    },
    //获取根目录
    getByRootLead: (lead, annaul) => {
        return API.GET(
            'user/org/organization/tree?lead={lead}&annaul={annaul}'.format({
                lead: lead,
                annaul: annaul
            })
        );
    },
    getTreeByLead: (lead, annaul) => {
        return API.GET(
            'user/org/organization/tree/lead?lead={lead}&annaul={annaul}'.format(
                {
                    lead: lead,
                    annaul: annaul
                }
            )
        );
    },
    //获取上级目录
    getByLead: lead => {
        return API.GET('user/org/organization/lead/' + lead);
    },
    //获取本级及其子数据
    getSameLevelByOrgId: orgId => {
        return API.GET('user/org/organization/sameLevel/' + orgId);
    },
    //获取本级子数据
    getChildByOrgId: (orgId, annual) => {
        return API.GET(
            'user/org/organization/child/{orgid}?annual={annual}'.format({
                orgid: orgId,
                annual: annual
            })
        );
    },
    searchTree(entity, id) {
        if (entity.id === id) {
            return entity;
        } else if (entity.children != null) {
            var i;
            var result = null;
            for (i = 0; result == null && i < entity.children.length; i++) {
                result = this.searchTree(entity.children[i], id);
            }
            return result;
        }
        return null;
    },
    /**
     * 按年度更新组织单位名称
     */
    updateName: (id, annual, name) => {
        return API.POST(
            'user/org/organization/organizationId/{organizationId}/annual/{annual}/rename/{name}'.format(
                { annual: annual, organizationId: id, name: name }
            )
        );
    },
    /**
     * 按年度启停组织单位,action: 0->停用，1->启用
     */
    startOrStop: (id, annual, action) => {
        let url =
            'user/org/organization/organizationId/{organizationId}/annual/{annual}/start';
        if (action === 0) {
            url =
                'user/org/organization/organizationId/{organizationId}/annual/{annual}/stop';
        }
        return API.POST(url.format({ annual: annual, organizationId: id }));
    },
    /**
     * 根据组织单位编码，获取其中的禁用名单位
     */
    getDisabledList: (annual, organizationIds) => {
        return API.GET('user/org/organization/disabled', {
            organizationIds: organizationIds,
            annual: annual
        });
    }
};
