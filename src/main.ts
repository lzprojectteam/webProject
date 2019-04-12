import 'es6-promise/auto';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import '@/utils/util';
import { getToken, removeSystemId, setSystemId } from '@/utils/cookieUtils';
import { getUser, setUser } from '@/utils/userUtils';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.use(Element, {
  size: screen.width > 1366 ? 'small' : 'mini', // set element-ui default size 'large' | 'medium' | 'small' | 'mini'
  zIndex: 3000
});
Vue.config.productionTip = false;
import apiUser from '@/api/base/apiUser';
new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    //如果没有登陆
    //判定是否登陆，token存在，说明，已经登陆过，不验证是否有效
    if (getToken()) {
      //如果token有效，获取跳转界面，然后跳转界面
      let user = getUser();

      this.loadSystem(user);
      // if (
      //     user.systemId === undefined ||
      //     user.systemId === '' ||
      //     user.systemId === null
      // ) {
      // } else if (
      //     user.index !== undefined &&
      //     user.index !== '' &&
      //     user.index !== null
      // ) {
      //     //s window.location.href = user.index;
      // }
    } else {
      //如果token不存在，则跳转到登陆界面
      window.location.href = '/login.html';
    }
  },
  methods: {
    //获取系统信息
    async loadSystem(userData) {
      //获取系统列表
      let systemList = await apiUser.checkSystem();
      console.log(systemList);
      if (systemList.length > 0) {
        //设置默认系统
        systemList = systemList.sort((a, b) => {
          return a.id - b.id;
        });
        let currentSystem;
        if (
          userData.systemId !== undefined &&
          userData.systemId !== '' &&
          userData.systemId !== null
        ) {
          let exsit = systemList.find(function (x) {
            return x.id === userData.systemId;
          });
          if (exsit !== undefined) {
            currentSystem = exsit;
          }
        }
        if (currentSystem === undefined) {
          currentSystem = systemList[0];
          userData.systemId = systemList[0].id;
        }
        userData.index = currentSystem.entry;
        userData.systemList = systemList;
        setSystemId(currentSystem.id);
        if (window.location.pathname !== userData.index)
          window.location.href = userData.index;
        else {
          userData.index = '';
          userData.systemId = undefined;
          removeSystemId();
          this.$notify({
            title: '警告',
            message: '请确认权限，请重新登陆',
            type: 'warning'
          });
          //  window.location.href = '/login.html';
        }
        setUser(userData);
      } else {
        console.log('用户无信息');
      }
      return userData;
    }
  }
}).$mount('#app');
