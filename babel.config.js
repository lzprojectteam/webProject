module.exports = {
    presets: [
        [
            '@vue/app',
            { useBuiltIns: 'usage', polyfills: ['es6.promise', 'es6.symbol'] }
        ]
    ],
    plugins: [
        'transform-vue-jsx',
        '@babel/plugin-transform-modules-commonjs',
        'babel-plugin-transform-es2015-arrow-functions'
    ],
    env: {
        development: {
            plugins: ['dynamic-import-node']
        }
    }
};
