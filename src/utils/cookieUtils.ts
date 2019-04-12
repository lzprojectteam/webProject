import Cookies from 'js-cookie';
import { decodeCipher, encodeCipher } from './cryptoUtils';
const TokenKey = 'Admin-Token';
const sidKey = 'sssss'; // 故意设置
const TokenExpire = 'TokenExpire'; //token有效时间
const UserKey = 'user';

export function setUser(filed: string, value: any) {
    //获取数据
    let userData = Cookies.get(UserKey);
    let user: any = {};
    //解析原有数据
    if (userData !== undefined) {
        user = JSON.parse(decodeCipher(userData));
    }
    //设置新数据
    Reflect.set(user, filed, value);
    //更新数据
    console.log(JSON.stringify(user));
    Cookies.set(UserKey, encodeCipher(JSON.stringify(user)));
}
export function getUser(filed: string): object {
    let userData = Cookies.get(UserKey);
    let user: any = {};
    //解析原有数据
    if (userData !== undefined) {
        user = JSON.parse(decodeCipher(userData));
    }
    return user[filed];
}

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token: string) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function setSystemId(sid: string) {
    //return Cookies.set(sidKey, sid);
    localStorage.setItem(sidKey, sid);
}

export function getSystemId() {
    return localStorage.getItem(sidKey);
}

export function removeSystemId() {
    localStorage.removeItem(sidKey);
}

export function setTokenExpire(tokenExpire: any) {
    return Cookies.set(TokenExpire, tokenExpire);
}

export function getTokenExpire() {
    return Cookies.get(TokenExpire);
}

export function removeTokenExpire() {
    return Cookies.remove(TokenExpire);
}
export function get(key: string) {
    return Cookies.get(key);
}
export function set(key: string, data: any) {
    return Cookies.set(key, data);
}
