module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    env: {
        "es6": true,
        "browser": true,
        "node": false
    },
    parserOptions: {
        // "project": "./client/tsconfig.json",
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
