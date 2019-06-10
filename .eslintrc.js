module.exports = {
    env: {
        node: true,
        es6: true,
        mocha: true
    },
    extends: 'eslint:recommended',
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module'
    },
    rules: {
        'no-unused-vars': [
            'error',
            {
                'args': 'none'
            }
        ],
        indent: [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        quotes: [
            'error',
            'single'
        ],
        semi: [
            'error',
            'always'
        ],
        strict: [
            'error',
            'global'
        ],
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'comma-dangle': [
            'error',
            'never'
        ],
        'no-undef': 'warn',
        'no-var': 'error',
        'newline-before-return': 'error',
        'prefer-arrow-callback': 'warn',
        'no-console': 'off',
        'space-before-function-paren': ['error', 'never'],
        'object-curly-spacing': ['error', 'always'],
        'space-in-parens': ['error', 'never'],
        'array-bracket-spacing': ['error', 'never'],
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0, 'maxBOF': 0 }],
        'prefer-template': 'error',
        'comma-spacing': ['error', { 'before': false, 'after': true }],
        'space-before-blocks': ['error', { 'functions': 'always', 'keywords': 'always', 'classes': 'always' }],
        'no-constant-condition': ["error", { "checkLoops": false }]
    }
};