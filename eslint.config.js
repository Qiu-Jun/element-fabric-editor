/*
 * @Author: June
 * @Description: ESLint 9 flat config（旧 eslintrc 写法在 9.x 下整体失效，导致 lint 静默跳过所有文件）
 * @Date: 2026-09-04 14:00:00
 * @LastEditors: June
 * @LastEditTime: 2026-09-04 14:00:00
 * @FilePath: \element-fabric-editor\eslint.config.js
 */
const tsParser = require('@typescript-eslint/parser')
const tsPlugin = require('@typescript-eslint/eslint-plugin')
const pluginVue = require('eslint-plugin-vue')
const globals = require('globals')
// unplugin-auto-import 生成的全局变量声明，避免自动导入的 API 被报 no-undef
const autoImport = require('./.eslintrc-auto-import.json')

module.exports = [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'typings/**',
      'public/**',
      'patches/**',
      '*.d.ts'
    ]
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...(autoImport.globals || {})
      }
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn'
    }
  },
  // Vue 3 基础规则（含 vue-eslint-parser）
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },
  // .vue 内 <script lang="ts"> 交给 TS parser 处理
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      // fabric 插件代码中惯用 const that = this
      '@typescript-eslint/no-this-alias': 'off',
      // 约定 _ 前缀表示故意保留的未使用变量
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ]
    }
  },
  // prettier 最后加载，格式冲突以 prettier 为准
  require('eslint-plugin-prettier/recommended')
]
