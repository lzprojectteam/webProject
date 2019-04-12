export const searchTree = (item, id) => {
    if (item.id === id) {
        return item;
    } else if (item.child != null) {
        var i;
        var result = null;
        for (i = 0; result == null && i < item.child.length; i++) {
            result = searchTree(item.child[i], id);
        }
        return result;
    }
    return null;
};
const getters = {
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    visitedViews: state => state.tagsView.visitedViews,
    cachedViews: state => state.tagsView.cachedViews,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.loginName,
    introduction: state => state.user.introduction,
    status: state => state.user.status,
    roles: state => state.user.roles,
    permissions: state => state.user.permissions,
    user: state => state.user, // 当前用户信息
    menus: state => state.user.menus, // 系统功能菜单
    system: state => state.user.systemInfo, // 当前系统信息
    systemList: state => state.user.systemList, // 当前系统信息
    property: state => state.user.property, //用户的额外属性
    setting: state => state.user.setting,
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    errorLogs: state => state.errorLog.logs,
    getTitleList: state => path => {
        var item;
        for (var menu of state.user.menus) {
            item = searchTree(menu, path);
            if (item !== null) {
                break;
            }
        }
        const titleList = [];
        if (item !== undefined && item !== null) {
            if (item.ancestry !== undefined && item.ancestry.length > 0) {
                const ancestryArray = JSON.parse(item.ancestry);
                for (var it of ancestryArray) {
                    titleList.push(it.title);
                }
            }
            titleList.push(item.title);
        }
        return titleList;
    },
    hasPermission: state => permission => {
        return (
            state.user.permissions.includes(permission) ||
            state.user.roles.includes(permission)
        );
    }
};
export default getters;
