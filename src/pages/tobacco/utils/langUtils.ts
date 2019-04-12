const fs = require('fs');
const path = require('path');
const glob = require('glob');
export function loadLang(filePath) {
    const [globPathJs] = [
        ['../lang/zh/**', 'entry'] // 入口脚本正则
    ];

    try {
        let [fileList] = [glob.sync(...globPathJs)];
        //找到主口文件
        if (fileList.length !== 0) {
            for (let entry of fileList) {
                console.log(entry);
            }
        } else {
            console.log('无法获取多页入口模板');
        }
    } catch (err) {
        console.log('未扫描到文件', err);
    }
}
