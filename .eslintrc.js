module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
    ],
    env: {
        es6: true,
        node: true,
    },
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
    },
    overrides: [
        {
            files: ["./client/**/*.ts", "./client/**/*.tsx"],
            parserOptions: {
                "project": "./client/tsconfig.json",
                "sourceType": "module",
                "ecmaFeatures": {
                    "jsx": true
                }
            },
        },
        {
            files: ["./server/**/*.ts"],
            parserOptions: {
                "project": "./server/tsconfig.json",
                "sourceType": "module"
            }
        }
    ],
    rules: {
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        '@typescript-eslint/member-ordering': [
            'error',
            {
                default: [
                    'field',

                    'static-method',
                    'private-static-method',

                    'public-constructor',
                    'protected-constructor',
                    'public-constructor',

                    'instance-method',
                    'private-instance-method',
                ],
            },
        ],
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-use-before-define': [
            'error',
            { functions: false, classes: false, variables: false },
        ],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/prefer-regexp-exec': 'off',
        '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
        '@typescript-eslint/no-misused-promises': [
            'error',
            {
                checksVoidReturn: false,
            },
        ],
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                vars: 'all',
                args: 'none',
                ignoreRestSiblings: false,
            },
        ],
        'brace-style': ['error', '1tbs'],
        'no-extra-boolean-cast': 'off',
        'comma-dangle': 'off',
        curly: 'error',
        'default-case': 'warn',
        'dot-notation': 'error',
        'eol-last': ['error', 'always'],
        eqeqeq: ['error', 'always'],
        'guard-for-in': 'error',
        'id-match': 'error',
        'linebreak-style': 'off',
        'new-parens': 'off',
        'newline-per-chained-call': 'off',
        'no-bitwise': 'error',
        'no-caller': 'error',
        'no-case-declarations': 'off',
        'no-console': 'error',
        'no-eval': 'error',
        'no-extra-semi': 'off',
        'no-multiple-empty-lines': 'error',
        'no-new-wrappers': 'error',
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
        'no-trailing-spaces': 'error',
        'no-underscore-dangle': 'error',
        radix: ['error', 'always'],
        'space-in-parens': ['error', 'never'],
        'spaced-comment': [
            'error',
            'always',
            {
                markers: ['/'],
            },
        ],
    },
};
