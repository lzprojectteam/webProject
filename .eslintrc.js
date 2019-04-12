module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/typescript'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        quotes: [1, 'single'], //引号类型 `` "" ''
        'quote-props': [2, 'always'] //对象字面量中的属性名是否强制双引号
    },
    parserOptions: {
        parser: 'typescript-eslint-parser'
    }
};
