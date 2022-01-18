module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    // extends: [
    //     'eslint:recommended',
    //     'plugin:@typescript-eslint/eslint-recommended',
    //     'plugin:@typescript-eslint/recommended',
    //     "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // ],
    env: {
        "es6": true,
        "node": true
    },
    parserOptions: {
        "project": "./tsconfig.json",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    rules: {
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-unsafe-assignment": "error"
    }
};