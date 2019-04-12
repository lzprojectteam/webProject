module.exports = file => {
    try {
        //如果是以@page开头的，说明是相绝对位置
        if (file.indexOf('@/page') === 0) {
            return require(file + '.vue').default;
        } else {
            let root = window.location.pathname.split(/[./]/)[1];
            return require('@/pages/' + root + '/views/' + file + '.vue')
                .default;
        }
    } catch (err) {
        //console.log(err);
        return require('@/components/errorPage/404.vue').default;
    }
}; // vue-loader at least v13.0.0+
