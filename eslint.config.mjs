import mocha from 'eslint-plugin-mocha';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
).map((config) => ({
    ...config,
    files: ['**/*.ts'],
})), {
    files: ['**/*.ts'],

    plugins: {
        mocha,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            ...globals.node,
            ...globals.mocha,
        },

        ecmaVersion: 2017,
        sourceType: 'module',
    },

    rules: {
        'no-unused-vars': 'off',

        '@typescript-eslint/no-unused-vars': ['warn', {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
        }],

        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'mocha/no-exclusive-tests': 'error',
    },
}, ...compat.extends('eslint:recommended').map(config => ({
    ...config,
    files: ['**/*.js', '**/*.cjs'],
})), {
    files: ['**/*.js', '**/*.cjs'],

    rules: {
        '@typescript-eslint/no-var-requires': 'off',
    },
}];
