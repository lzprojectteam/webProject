import apiUser from '@/api/base/apiUser';
import {
    getToken,
    setToken,
    removeToken,
    getSystemId,
    removeSystemId,
    setTokenExpire,
    setSystemId
} from '@/utils/cookieUtils';
import { getUser, setUser } from '@/utils/userUtils';
const user = {
    state: {
        loginName: '', //用户编码
        userName: '', //用户名称
        roles: [], //角色
        permissions: [], //权限
        menus: [], //菜单
        token: getToken(), //访问令牌
        tokenExpireTime: 30, //时间有效期，
        titleList: ['首页'], //用于面包标题导航
        organization: undefined, //组织单位,
        detail: {}, //用户的详细信息
        property: undefined, //用户属性
        status: '',
        avatar: '',
        introduction: '',
        systemInfo: '', //系统信息
        systemList: [], //系统列表，一个用户可能存在多个系统
        setting: {
            articlePlatform: []
        }
    },

    mutations: {
        SET_SYSTEM_LIST: (state, systemList) => {
            state.systemList = systemList;
        },
        SET_SYSTEM: (state, system) => {
            state.systemInfo = system;
        },
        SET_MENUS: (state, menus) => {
            state.menus = menus;
        },
        SET_LOGIN_NAME: (state, loginName) => {
            state.loginName = loginName;
        },

        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction;
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_NAME: (state, userName) => {
            state.userName = userName;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_ORG: (state, org) => {
            state.organization = org;
        },
        SET_PERMISSIONS: (state, permissions) => {
            state.permissions = permissions;
        },
        SET_PROPERTY: (state, propertys) => {
            let pro = {};
            for (let it of propertys) {
                pro[it.id.propertyId] = it.propertyValue;
            }

            state.property = pro;
        },
        SET_DETAIL(state, detail) {
            state.detail = detail;
        }
    },

    actions: {
        async loadEnv({ commit }) {
            let systemList = await apiUser.checkSystem();
            if (systemList.length > 0) {
                //设置默认系统
                systemList = systemList.sort((a, b) => {
                    return a.id - b.id;
                });
                var exsit = systemList.find(function(x) {
                    return x.id === getSystemId();
                });
                if (exsit === undefined) {
                    setSystemId(systemList[0].id);
                    exsit = systemList[0];
                }
                commit('SET_SYSTEM', exsit);
                commit('SET_SYSTEM_LIST', systemList);
                let user = await apiUser.homeIndex(exsit.id);

                commit('SET_ROLES', user.roles);
                commit('SET_MENUS', user.menus);
                commit('SET_NAME', user.user.name);
                commit('SET_LOGIN_NAME', user.user.loginName);
                commit('SET_PERMISSIONS', user.permissions);
                commit('SET_PROPERTY', user.propertys);
                commit('SET_AVATAR', user.propertys.avatar);
                commit(
                    'SET_AVATAR',
                    'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
                );
                commit('SET_INTRODUCTION', user.introduction);

                let userDetail = await apiUser.getUserDetail(exsit.id);
                if (userDetail !== undefined) {
                    commit('SET_DETAIL', userDetail);
                    commit('SET_ORG', {
                        organizationId: userDetail.organizationId,
                        organizationName: userDetail.organizationName
                    });
                } else {
                    commit('SET_ORG', {
                        organizationId: '',
                        organizationName: ''
                    });
                }

                return new Promise((resolve, reject) => {
                    resolve({ user: user, system: exsit });
                });
            } else {
                console.log('用户无信息');
                return new Promise((resolve, reject) => {
                    reject('用户无信息');
                });
            }
        },
        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('SET_LOGIN_NAME', '');
                commit('SET_TOKEN', '');
                commit('SET_ROLES', []);
                commit('SET_MENUS', []);
                let userData = getUser();
                userData.index = '';
                userData.systemId = undefined;
                setUser(userData);
                removeToken();
                removeSystemId();
                resolve();
            });
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                let userData = getUser();
                userData.index = '';
                userData.systemId = undefined;
                setUser(userData);
                commit('SET_TOKEN', '');
                removeToken();
                removeSystemId();
                resolve();
            });
        },

        // 动态修改权限
        ChangeRoles({ commit }, role) {
            return new Promise(resolve => {
                commit('SET_TOKEN', role);
                setToken(role);
                apiUser.homeIndex(role).then(response => {
                    const data = response.data;
                    commit('SET_ROLES', data.roles);
                    commit('SET_NAME', data.name);
                    commit('SET_AVATAR', data.avatar);
                    commit('SET_INTRODUCTION', data.introduction);
                    resolve();
                });
            });
        }
    }
};
export default user;
