module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
    ],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module"
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "jquery": true
    },
    "rules": {
        "quotes": 0,
        "no-console": 1,
        "no-debugger": 1,
        "no-var": 1,
        "semi": [1, "always"],
        "no-trailing-spaces": 0,
        "eol-last": 0,
        "no-unused-vars": 0,
        "no-underscore-dangle": 0,
        "no-alert": 0,
        "no-lone-blocks": 0
    }
};