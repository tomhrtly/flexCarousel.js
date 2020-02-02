module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'airbnb-base',
    ],
    rules: {
        'indent': ['error', 4],
        'max-len': 0,
        'no-param-reassign': [2, { 'props': false }],
        'no-underscore-dangle': 0,
    },
};
