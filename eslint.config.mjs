import js from '@eslint/js';
import rxjs from '@smarttools/eslint-plugin-rxjs';
import angular from 'angular-eslint';
import { defineConfig } from 'eslint/config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';

export default defineConfig(
    {
        ignores: ['node_modules/**', 'dist/**', '.angular/**', 'out-tsc/**', '.idea/**', '.vscode/**'],
    },
    {
        files: ['*.mjs'],
        extends: [js.configs.recommended],
    },
    {
        files: ['src/**/*.ts'],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...angular.configs.tsRecommended,
            rxjs.configs.recommended,
        ],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        processor: angular.processInlineTemplates,
        plugins: { 'simple-import-sort': simpleImportSort },
        rules: {
            curly: 'error',
            eqeqeq: ['error', 'always'],
            'array-callback-return': ['error', { allowImplicit: true }],
            'no-console': ['error', { allow: ['info', 'assert', 'warn', 'error', 'time', 'timeLog', 'timeEnd'] }],
            'no-param-reassign': 'error',
            'no-return-assign': ['error', 'always'],
            'no-duplicate-imports': 'error',
            'no-magic-numbers': [
                'error',
                {
                    ignore: [-1, 0, 1],
                    ignoreArrayIndexes: false,
                    enforceConst: true,
                    ignoreDefaultValues: true,
                    ignoreClassFieldInitialValues: true,
                    detectObjects: false,
                },
            ],
            'max-depth': ['error', 3],
            complexity: ['error', 20],
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
            '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
            '@typescript-eslint/unbound-method': ['error', { ignoreStatic: true }],
            '@typescript-eslint/explicit-member-accessibility': [
                'error',
                {
                    accessibility: 'explicit',
                    overrides: { constructors: 'no-public' },
                },
            ],
            '@typescript-eslint/explicit-function-return-type': [
                'error',
                {
                    allowExpressions: true,
                    allowTypedFunctionExpressions: true,
                    allowHigherOrderFunctions: true,
                },
            ],
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'default',
                    format: ['camelCase', 'PascalCase'],
                    leadingUnderscore: 'forbid',
                    trailingUnderscore: 'forbid',
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^I[A-Z]',
                        match: true,
                    },
                },
                {
                    selector: ['variable', 'classProperty'],
                    format: ['camelCase', 'UPPER_CASE'],
                },
                {
                    selector: ['variable', 'classProperty', 'parameter'],
                    types: ['boolean'],
                    format: ['PascalCase'],
                    prefix: ['is', 'has', 'should'],
                },
                {
                    selector: 'variable',
                    types: ['boolean'],
                    modifiers: ['destructured'],
                    format: null,
                },
                {
                    selector: 'parameter',
                    modifiers: ['unused'],
                    leadingUnderscore: 'require',
                    format: null,
                },
                {
                    selector: 'enumMember',
                    format: ['PascalCase', 'UPPER_CASE'],
                },
                {
                    selector: [
                        'classProperty',
                        'objectLiteralProperty',
                        'typeProperty',
                        'classMethod',
                        'objectLiteralMethod',
                        'typeMethod',
                        'accessor',
                        'enumMember',
                    ],
                    modifiers: ['requiresQuotes'],
                    format: null,
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: ['element', 'attribute'],
                    prefix: 'onion',
                    style: 'kebab-case',
                },
            ],
            '@angular-eslint/pipe-prefix': ['error', { prefixes: ['onion'] }],
            '@angular-eslint/component-class-suffix': 'error',
            '@angular-eslint/directive-class-suffix': 'error',
            '@angular-eslint/prefer-on-push-component-change-detection': 'error',
            '@angular-eslint/no-empty-lifecycle-method': 'error',
            '@angular-eslint/no-lifecycle-call': 'error',
            '@angular-eslint/no-output-on-prefix': 'error',
            '@angular-eslint/no-input-prefix': ['error', { prefixes: ['on'] }],
            '@angular-eslint/use-lifecycle-interface': 'error',
            '@angular-eslint/prefer-inject': 'off',
            '@angular-eslint/prefer-standalone': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            '@smarttools/rxjs/no-implicit-any-catch': 'off',
            '@smarttools/rxjs/no-unsafe-takeuntil': ['error', { alias: ['takeUntilDestroyed'] }],
            '@smarttools/rxjs/no-exposed-subjects': 'error',
            '@smarttools/rxjs/no-unsafe-catch': 'error',
            '@smarttools/rxjs/suffix-subjects': ['error', { suffix: '$' }],
            '@smarttools/rxjs/finnish': [
                'error',
                {
                    functions: false,
                    methods: false,
                    parameters: true,
                    properties: true,
                    variables: true,
                    strict: false,
                    types: { '^EventEmitter$': false },
                },
            ],
        },
    },
    {
        files: ['**/*.html'],
        extends: [...angular.configs.templateRecommended],
        rules: {
            '@angular-eslint/template/eqeqeq': 'error',
            '@angular-eslint/template/no-any': 'error',
            '@angular-eslint/template/no-call-expression': [
                'error',
                {
                    allowList: ['vm', 'user', 'users', 'status', 'isFavoritesOnly', 'favoritesCount', 'emit'],
                },
            ],
            '@angular-eslint/template/use-track-by-function': 'error',
            '@angular-eslint/template/conditional-complexity': 'error',
            '@angular-eslint/template/no-interpolation-in-attributes': 'error',
            'no-restricted-syntax': [
                'error',
                {
                    selector:
                        'BoundEvent[handler.ast.type="Call"][handler.ast.receiver.type="PropertyRead"]:not([handler.ast.receiver.name=/^on[A-Z]/]):not([handler.ast.receiver.name="emit"])',
                    message: 'Обработчик события должен начинаться с on. Прямой output.emit() разрешён.',
                },
            ],
        },
    },
);
