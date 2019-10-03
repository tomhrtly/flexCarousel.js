module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {
        'indent': ['error', 4],
        'max-len': ['error', {
            'code': 150,
            'ignoreStrings': true,
        }],
        'no-param-reassign': [2, { 'props': false }]
    },
};
