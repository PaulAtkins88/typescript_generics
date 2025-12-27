// Flat ESLint config for TypeScript (ESLint v9)
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import nPlugin from 'eslint-plugin-n';
import promisePlugin from 'eslint-plugin-promise';

export default [
  {
    files: ['**/*.ts'],
    ignores: ['dist/**', 'node_modules/**'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
    },
    rules: {
      // Core basics
      eqeqeq: ['error', 'always'],
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Import hygiene
      'import/order': 'off',
      'import/no-unresolved': 'off',

      // Node and promises
      'n/no-missing-import': 'off',
      'promise/always-return': 'off',
      'promise/no-nesting': 'off',
    },
  },
];
