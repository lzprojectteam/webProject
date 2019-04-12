/* eslint-disable no-extend-native */
import axios from 'axios';
import dateFormat from 'dateformat';
import Long from 'long';
const util = {};
util.title = function(title) {
    title = title ? title + ' - Home' : 'CASIT';
    window.document.title = title;
};
util.dateFormat = function(date, pattern) {
    return dateFormat(date, pattern);
};

util.downloadWithStream = response => {
    var filename = dateFormat(new Date(), 'yyyymmddHHMMss');
    //content-disposition 格式content-disposition  "attachment; filename=20180104154630_%E6%9C%BA%E8%80%95%E8%B7%AF.doc"
    if (response.headers['content-disposition'] !== undefined) {
        const cd = response.headers['content-disposition'].split(';');
        if (cd.length > 1) {
            const file = cd[1].split('=');
            filename = decodeURI(file[1]);
        }
    }
    require('downloadjs')(response.data, filename);
};
const ajaxUrl =
    process.env.NODE_ENV === 'development'
        ? 'http://192.168.1.130:8089'
        : process.env.VUE_APP_API_URL != undefined
        ? process.env.VUE_APP_API_URL
        : window.location.origin;

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});
String.prototype.trim = function(char, type) {
    if (char) {
        if (type === 'left') {
            return this.replace(new RegExp('^\\' + char + '+', 'g'), '');
        } else if (type === 'right') {
            return this.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return this.replace(
            new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'),
            ''
        );
    }
    return this.replace(/^\s+|\s+$/g, '');
};

String.prototype.replaceAll = function(FindText, RepText) {
    const regExp = new RegExp(FindText, 'g');
    return this.replace(regExp, RepText);
};
String.prototype.toLong = function() {
    return Long.fromString(this, true);
};
/** 格式化输入字符串**/

//用法: 'hello{0}'.format('world')；返回'hello world'
//
/*
用法:
var template1='我是{0}，今年{1}了';
var template2='我是{name}，今年{age}了';
var result1=template1.format('loogn',22);
var result2=template1.format({name:'loogn',age:22});
*/
String.prototype.format = function(args) {
    if (arguments.length > 0) {
        var result = this;
        if (arguments.length === 1 && typeof args === 'object') {
            for (var key in args) {
                var reg = new RegExp('({' + key + '})', 'g');
                result = result.replace(reg, args[key]);
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === undefined) {
                    return '';
                } else {
                    var reg1 = new RegExp('({[' + i + ']})', 'g');
                    result = result.replace(reg1, arguments[i]);
                }
            }
        }
        return result;
    } else {
        return this;
    }
};
String.prototype.splitToArray = function(n) {
    var str = this;
    var arr = [];
    var len = Math.ceil(str.length / n);
    for (var i = 0; i < len; i++) {
        if (str.length >= n) {
            var strCut = str.substring(0, n);
            arr.push(strCut);
            str = str.substring(n);
        } else {
            arr.push(str);
        }
    }
    return arr;
};
String.prototype.isEmpty = text => {
    return text === '' || text === null || text === undefined;
};
export default util;
