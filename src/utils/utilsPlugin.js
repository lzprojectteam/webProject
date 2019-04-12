import dateFormat from 'dateformat';

const utilsPlugin = {};
utilsPlugin.install = function(Vue, options) {
    // 1. 添加全局方法或属性
    Vue.dateFormat = function(date, pattern) {
        // 逻辑...
        return dateFormat(date, pattern);
    };

    // 2. 添加全局资源
    Vue.directive('my-directive', {
        bind(el, binding, vnode, oldVnode) {
            // 逻辑...
        }
    });

    // 3. 注入组件
    Vue.mixin({
        created: function() {
            // 逻辑...
        }
    });

    // 4. 添加实例方法
    Vue.prototype.dateFormat = function(date, pattern) {
        if (date === '' || date === undefined || date === null) {
            return '';
        }
        return dateFormat(date, pattern);
    };
    /**
     * 获取每月第一天
     */
    Vue.prototype.getFirstDate = () => {
        let current = dateFormat(new Date(), 'yyyy/mm/01');
        return new Date(current);
    };
    Vue.prototype.getLastDate = () => {
        let current = dateFormat(new Date(), 'yyyy/mm/01');
        let cd = new Date(current);
        cd.setMonth(cd.getMonth() + 1);
        return new Date(cd.getFullYear(), cd.getMonth(), 0);
    };
};
export default utilsPlugin;
