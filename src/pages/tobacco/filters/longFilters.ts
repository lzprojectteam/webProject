import Long from 'long';
/**
 *
 * @param key 格式化性别
 */
export function parseLong(strLong) {
    return Long.fromString(strLong, true);
}
