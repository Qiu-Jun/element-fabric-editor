/*
 * @Author: June
 * @Description:
 * @Date: 2024-05-25 15:48:42
 * @LastEditTime: 2024-06-19 10:23:02
 * @LastEditors: June
 * @FilePath: \mine-pro\eslint.config.js
 */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    uni: true,
    UniApp: true,
    Glo: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    './packages/weaap/.eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'vue'],
  ignorePatterns: ['dist', 'node_modules', 'auto-imports.d.ts', '.hbuilderx'],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
