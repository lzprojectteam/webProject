import 'es6-promise/auto';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from '../../store';
import '@/registerServiceWorker';
import '@/utils/util';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(Element, {
    size: screen.width > 1366 ? 'small' : 'mini', // set element-ui default size 'large' | 'medium' | 'small' | 'mini'
    zIndex: 3000
});
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
