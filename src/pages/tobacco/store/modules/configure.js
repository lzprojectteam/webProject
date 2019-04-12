import annualApi from '../../api/basic/api_annual';
const system = {
    namespaced: true,
    state: {
        annual: 0 //年度
    },

    mutations: {
        SET_ANNUAL: (state, annual) => {
            state.annual = annual;
        }
    },

    actions: {
        /**
         * 获取年度
         */
        checkAnnual({ commit }) {
            return new Promise((resolve, reject) => {
                annualApi
                    .getAll({
                        size: 1,
                        sort: 'id,DESC',
                        page: 0,
                        search: 'control:eq:5'.format({})
                    })
                    .then(response => {
                        if (response.content.length === 0) {
                            console.log('请设置年度信息');
                        } else {
                            console.log(
                                '当前年度:' + response.content[0].annualId
                            );
                            commit('SET_ANNUAL', response.content[0].annualId);
                            resolve();
                        }
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        }
    }
};
export default system;
