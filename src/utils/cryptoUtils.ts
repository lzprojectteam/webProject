//import crypto from 'crypto';
const crypto = require('crypto');
/**
 * 加密算法
 * @param {*} data 待加密的数据
 * @param {*} algorithm 加密算法，具体可用值，可以调用crypto.getCiphers()查看，默认值为aes192
 * @param {*} password
 */
export function encodeCipher(
    data: any,
    algorithm = 'aes192',
    password = 'casit-part-3'
) {
    const cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}
/**
 * 解密密算法
 * @param {*} data 待加密的数据
 * @param {*} algorithm 加密算法，具体可用值，可以调用crypto.getCiphers()查看，默认值为aes192
 * @param {*} password
 */
export function decodeCipher(
    data: any,
    algorithm = 'aes192',
    password = 'casit-part-3'
) {
    /* 
   该方法使用指定的算法与密码来创建 decipher对象, 第一个算法必须与加密数据时所使用的算法保持一致;
   第二个参数用于指定解密时所使用的密码，其参数值为一个二进制格式的字符串或一个Buffer对象，该密码同样必须与加密该数据时所使用的密码保持一致
  */
    const decipher = crypto.createDecipher(algorithm, password);

    /*
   第一个参数为一个Buffer对象或一个字符串，用于指定需要被解密的数据
   第二个参数用于指定被解密数据所使用的编码格式，可指定的参数值为 'hex', 'binary', 'base64'等，
   第三个参数用于指定输出解密数据时使用的编码格式，可选参数值为 'utf-8', 'ascii' 或 'binary';
  */
    let decrypted = decipher.update(data, 'hex', 'utf-8');

    decrypted += decipher.final('utf-8');
    return decrypted;
}
