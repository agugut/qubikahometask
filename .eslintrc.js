module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'eslint-config-prettier',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'prettier',
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:import/typescript',
        'plugin:jsdoc/recommended',
    ],
    globals: {
        BUILD_PATH: false,

        cy: true,
        // these are things injected using webpack define plugin
        process: false,
    },
    ignorePatterns: ['node_modules/', 'docs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        project: './tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint', 'import', 'prettier', 'sort-keys-fix'],
    rules: {
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/camelcase': 'off',
        '@typescript-eslint/explicit-function-return-type': 'warn',

        '@typescript-eslint/interface-name-prefix': 'off',

        '@typescript-eslint/naming-convention': ['warn', { format: ['PascalCase'], selector: 'class' }],
        '@typescript-eslint/no-empty-interface': 'warn',

        '@typescript-eslint/no-explicit-any': 'warn',

        '@typescript-eslint/no-for-in-array': 'error',

        '@typescript-eslint/no-inferrable-types': 'off',

        '@typescript-eslint/no-misused-promises': 'warn',

        '@typescript-eslint/no-namespace': 'warn',

        '@typescript-eslint/no-non-null-assertion': 'warn',

        '@typescript-eslint/no-unnecessary-type-assertion': 'error',

        '@typescript-eslint/no-unsafe-assignment': 'warn',

        '@typescript-eslint/no-unsafe-call': 'warn',

        '@typescript-eslint/no-unsafe-member-access': 'warn',

        '@typescript-eslint/no-unsafe-return': 'warn',

        '@typescript-eslint/no-unused-expressions': 'error',

        '@typescript-eslint/no-unused-vars': 'error',

        '@typescript-eslint/no-use-before-define': 'error',

        '@typescript-eslint/no-var-requires': 'warn',

        '@typescript-eslint/prefer-includes': 'warn',

        '@typescript-eslint/prefer-regexp-exec': 'off',

        '@typescript-eslint/restrict-template-expressions': 'warn',

        '@typescript-eslint/triple-slash-reference': 'off',

        '@typescript-eslint/unbound-method': 'warn',

        'array-callback-return': 'warn',

        'arrow-body-style': 'error',

        'consistent-return': 'warn',

        'default-case': 'warn',

        'dot-notation': 'warn',

        'guard-for-in': 'warn',

        'import/export': 'warn',

        'import/extensions': 'off',

        'import/first': 'warn',

        'import/named': 'warn',

        'import/newline-after-import': 'warn',

        'import/no-cycle': 'warn',

        'import/no-duplicates': 'error',

        'import/no-extraneous-dependencies': [
            'warn',
            {
                bundledDependencies: false,
                devDependencies: true,
                optionalDependencies: false,
                peerDependencies: false,
            },
        ],

        'import/no-named-as-default': 'warn',

        'import/no-unresolved': 'warn',

        'import/no-useless-path-segments': 'warn',

        'import/order': [
            'error',
            {
                alphabetize: {
                    order: 'asc',
                },
                groups: ['builtin', 'external', 'internal'],
                'newlines-between': 'always',
            },
        ],

        'import/prefer-default-export': 'off',

        'jsdoc/require-description': 'warn',

        'jsdoc/no-undefined-types': 'off',

        'lines-between-class-members': 'off',

        'no-case-declarations': 'off',

        'no-console': 'warn',

        'no-else-return': 'warn',

        'no-extra-boolean-cast': 'warn',

        'no-lonely-if': 'warn',
        'no-multi-str': 'warn',
        'no-nested-ternary': 'warn',
        'no-param-reassign': 'warn',
        'no-plusplus': 'warn',
        'no-prototype-builtins': 'warn',

        'no-restricted-syntax': 'warn',
        'no-sequences': 'warn',
        'no-shadow': 'error',
        'no-undef-init': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': 'warn',
        'no-useless-return': 'warn',
        'object-shorthand': 'warn',
        'operator-assignment': 'warn',
        'prefer-const': 'error',

        'prefer-destructuring': 'warn',
        'prefer-spread': 'warn',
        'prefer-template': 'warn',
        'prettier/prettier': 'warn',
        radix: 'warn',

        'sort-keys-fix/sort-keys-fix': 'warn',

        'spaced-comment': 'warn',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
        jsdoc: {
            mode: 'typescript',
            preferredTypes: {
                unknown: 'unknown',
            },
            tagNamePreference: {
                returns: 'return',
            },
        },
        react: {
            version: 'detect',
        },
    },
};
