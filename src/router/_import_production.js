module.exports = file => {
    try {
        let root = window.location.pathname.split(/[./]/)[1];
        return require('@/pages/' + root + '/views/' + file + '.vue').default;
    } catch (err) {
        return require('@/components/errorPage/404.vue').default;
    }
}; // vue-loader at least v13.0.0+
