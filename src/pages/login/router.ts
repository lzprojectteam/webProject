import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/login.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Home
        },
        {
            path: '/home',
            name: 'home',
            redirect: to => {
                return '/user.html';
            }
        }
    ]
});
