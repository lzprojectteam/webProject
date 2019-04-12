const path = require('path');
const glob = require('glob');
const fs = require('fs');
/** 获取多页的入口脚本和模板 */
const loadPages = () => {
    const [globPathJs, pages] = [
        ['./src/pages/**/main.ts', 'entry'], // 入口脚本正则
        Object.create(null)
    ];

    try {
        let [fileList, tempArr, modName] = [glob.sync(...globPathJs), [], null];
        //找到主口文件
        if (fileList.length !== 0) {
            for (let entry of fileList) {
                //获取路径
                tempArr = path.dirname(entry, path.extname(entry)).split('/');
                //获取入口名称
                modName = tempArr[tempArr.length - 1];
                //获取获取文件
                //    console.log(path.dirname(entry) + `${modName}.html`);
                let templateList = glob.sync(
                    path.dirname(entry) + `/${modName}.html`
                );
                //如果没有找到，就使用默认的文件
                if (templateList.length === 0) {
                    console.log('未找到相应的模板，忽略该设置');
                } else {
                    Reflect.set(pages, modName, {
                        entry: entry,
                        template: templateList[0],
                        filename: `${modName}.html`
                    });
                }
            }
        } else {
            console.log('无法获取多页入口模板');
        }
        pages.index = {
            entry: './src/main.ts',
            template: './src/public/index.html'
            //filename: 'index.html'
        };
        return pages;
    } catch (err) {
        console.log('获取多页数据错误：', err);
    }
};
module.exports = {
    lintOnSave: false,
    pages: loadPages(),
    parallel: require('os').cpus().length > 1,

    css: {
        loaderOptions: {
            sass: {
                data: '@import "@/styles/variables.scss";'
            },
            less: {
                globalVars: {
                    primary: '#fff'
                }
            }
        }
    },
    //运行时编译
    runtimeCompiler: true,
    chainWebpack: config => {
        config.module
            .rule('element-ui')
            .test(/element-ui.src.*?js$/)
            .use('babel')
            .loader('babel-loader')
            .end();
    }
};
