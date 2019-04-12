import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import errorLog from './modules/errorLog';
import permission from './modules/permission';
import tagsView from './modules/tagsView';
import user from './modules/user';
//import system from './modules/system';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        router: {}
    },
    modules: {
        app,
        errorLog,
        permission,
        tagsView,
        user
    },
    getters,
    mutations: {
        SET_ROUTER: (state, router) => {
            state.router = router;
        }
    },
    actions: {
        setRouter({ commit }, router) {
            commit('SET_ROUTER', router);
        }
    }
});

export default store;
