import 'babel-polyfill';
import Vue from 'vue';
import 'normalize.css/normalize.css'; // A modern alternative to CSS resets
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import '@/styles/scss/element-variables.scss';
import '@/styles/index.scss'; // global css
import '@/styles/font/iconfont.css'; // 引入ICONFONT图标
import './styles/css/element-custom.css'; // 引入针对elementui的自定义修改
import './styles/css/global.css'; // 引入针对elementui的自定义修改

import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/theme-chalk/index.css';

import App from '@/App.vue';
import router from '@/router/index';
import store from '@/store/index';
import i18n from '@/lang'; // 国际化

import '@/registerServiceWorker';
import '@/utils/util';

import '@/icons/index'; // icon
import '@/errorLog'; // error log
import '@/router/routerGateway'; // permission control
import * as filters from '@/filters'; // global filters
import * as langFilters from './filters/langFilters'; // global filters
import * as longFilters from './filters/longFilters'; //
import '@/directive/highlight';
import utilsPlugin from '@/utils/utilsPlugin';
import BaiduMap from 'vue-baidu-map';
import fullscreen from '@/directive/el-fullscreenDialog';
import ECharts from 'vue-echarts';
import echarts from 'echarts';
import { loadLang } from './utils/langUtils';
Vue.prototype.$echarts = echarts;
Vue.component('v-chart', ECharts);

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: process.env.VUE_APP_BAIDU_KEY
});
Vue.config.productionTip = false;
Vue.use(utilsPlugin);
Vue.use(fullscreen);
Vue.use(Avue);
Vue.use(Element, {
  size: screen.width > 1366 ? 'medium' : 'small', // set element-ui default size 'large' | 'medium' | 'small' | 'mini'
  i18n: (key, value) => {
    i18n.t(key, value);
  },
  zIndex: 3000
});
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Object.keys(langFilters).forEach(key => {
  Vue.filter(key, langFilters[key]);
});
Object.keys(longFilters).forEach(key => {
  Vue.filter(key, longFilters[key]);
});
//动态注入store,实现与基础分支分离.此处可以循环注入多个，按需配置
store.registerModule('system', require('./store/modules/configure.js').default);
//动态注入语言包,此处只注入中文语言包，基目的是规范显示内容
i18n.mergeLocaleMessage('zh', {
  tobacco: require('./lang/zh/tobacco').default
});
i18n.mergeLocaleMessage('zh', {
  constant: require('./lang/zh/constant').default
});
store
  .dispatch('setRouter', router)
  .then(response => {
    console.log('设置路由');
  })
  .catch(error => {
    console.log(error);
  });
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
    const loading = this.$loading({
      lock: true,
      text: '正在加载系统参数',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    this.$store
      .dispatch('system/checkAnnual')
      .then(response => {
        loading.close();
      })
      .catch(ex => {
        console.log('设置年度失败:');
        console.log(ex);
        // loading.close();
      });
  }
}).$mount('#app');
