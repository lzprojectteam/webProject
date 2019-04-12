import * as API from './index';
class baseApi {
    baseUrl: string;
    constructor(baseUrl: any) {
        this.baseUrl = baseUrl;
    }
    /**
     * 查询列表数据
     * @param params
     */
    getAll(params: object) {
        return API.GET(this.baseUrl, params);
    }
    /**
     * 保存对象
     * @param params
     */
    save(params: any) {
        return API.POST(this.baseUrl, params);
    }
    /**
     * 更新对象
     * @param id 更新主键
     * @param params
     */
    update(id: any, params: object) {
        return API.PUT(this.baseUrl + '/' + id, params);
    }
    /**
     * 根据主键物理删除对象
     * @param id
     */
    delete(id: any) {
        return API.POST(this.baseUrl + '/remove/' + id);
    }
    /**
     * 保存或者更新一个对象
     * @param id
     * @param params
     */
    saveOrUpdate(id: any, params: any) {
        return API.POST(this.baseUrl + '/force', params);
    }
    /**
     * 逻辑删除对象
     * @param id
     */
    softDelete(id: any) {
        return API.DELETE(this.baseUrl + '/' + id, {});
    }
}
