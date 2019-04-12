import constant from '../lang/zh/constant';
/**
 *
 * @param key 格式化性别
 */
export function sex(key) {
    let it = constant.sex.find(item => {
        return item.key === key;
    });
    return it === undefined ? '' : it.value;
}
/**
 *
 * @param key 格式化布尔
 */
export function boolean(key) {
    let it = constant.boolean.find(item => {
        return item.key === key;
    });
    return it === undefined ? '' : it.value;
}
