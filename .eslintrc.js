module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb-base',
    ],
    rules: {
        'class-methods-use-this': 0,
        'import/no-named-as-default': 0,
        'indent': ['error', 4],
        'max-len': 0,
        'no-param-reassign': [2, { 'props': false }],
        'no-underscore-dangle': 0,
    },
};
