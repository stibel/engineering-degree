module.exports = {
    extends: [
        'mantine',
        'plugin:@next/next/recommended',
        'plugin:jest/recommended',
        'plugin:storybook/recommended',
        'prettier'
    ],
    plugins: ['testing-library', 'jest', 'prettier'],
    overrides: [
        {
            files: ['**/?(*.)+(spec|test).[jt]s?(x)'],
            extends: ['plugin:testing-library/react']
        },
        {
            files: ['*.model.*'],
            rules: {
                'no-param-reassign': 'off'
            }
        },
        {
            files: ['*.store.*'],
            rules: {
                'no-param-reassign': 'off'
            }
        }
    ],
    parserOptions: {
        project: './tsconfig.json'
    },
    rules: {
        'react/react-in-jsx-scope': 'off',
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                trailingComma: 'none',
                printWidth: 100,
                tabWidth: 4,
                semi: true,
                bracketSpacing: true,
                arrowParens: 'avoid',
                endOfLine: 'auto'
            }
        ],
        'react/jsx-curly-brace-presence': [
            'error',
            {
                props: 'always'
            }
        ],
        'no-duplicate-imports': 'error',
        'no-self-compare': 'error',
        'no-use-before-define': 'error',
        camelcase: 'error',
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'unused' }]
    }
};
