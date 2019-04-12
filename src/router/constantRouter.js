const _import = require('./_import_' + process.env.NODE_ENV);
/* Layout */
import Layout from '@/components/Layout/Layout';
export default [
    { path: '/404', component: _import('errorPage/404'), hidden: true },
    { path: '/401', component: _import('errorPage/401'), hidden: true },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: _import('dashboard/index'),
                name: 'dashboard',
                meta: {
                    title: '欢迎你',
                    icon: 'dashboard',
                    noCache: false,
                    id: -1
                }
            }
        ]
    },

    { path: '*', component: _import('errorPage/404'), hidden: true }
];
