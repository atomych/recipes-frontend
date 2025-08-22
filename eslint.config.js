import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import ts from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...ts.configs.recommended,
  {
    files: ['**/*.{ts,tsx,vue}'],
    plugins: {
      prettier,
    },
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: ts.parser,
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    rules: {
      'prettier/prettier': 'error',
      'vue/no-unused-vars': 'error',
      '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
];
