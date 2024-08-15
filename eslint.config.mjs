// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    files: ['**/*.ts'],
    extends: [
        eslint.configs.recommended,
        ...tseslint.configs.recommended,
        ...tseslint.configs.strict,
        ...tseslint.configs.stylistic,
    ],
    rules: {
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/consistent-type-imports': 'error',
        "@typescript-eslint/naming-convention": "error",
    },
});