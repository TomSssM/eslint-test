module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
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
    "overrides": [
        {
            "files": ["./client/**/*.ts", "./client/**/*.tsx"],
            parserOptions: {
                "project": "./client/tsconfig.json",
                // "project": "./tsconfig.json", // uncomment to error
                "sourceType": "module",
                "ecmaFeatures": {
                    "jsx": true
                }
            },
        },
    ],
    rules: {
        "@typescript-eslint/no-unsafe-call": "error",
        "@typescript-eslint/no-unsafe-assignment": "error"
    }
};
