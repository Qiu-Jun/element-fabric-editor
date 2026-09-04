---
name: code-standard
description: element-fabric-editor 项目代码规范。在本项目中生成、修改、重构任何代码（Vue/TS/SCSS/UnoCSS/Store/API/提交信息）之前必须遵循本规范。
---

# element-fabric-editor 代码规范

## 0. 执行步骤

写代码前按顺序执行：

1. 新文件先加文件头注释块（见 §6）
2. 按本规范生成代码
3. 完成后对改动的文件执行 eslint 修复并确认无报错：
   ```bash
   npx eslint --fix <改动的文件>
   ```
4. 涉及提交时，按 §10 的提交规范写 commit message

## 1. 技术栈（不要引入偏离栈的依赖）

- Vue 3.4（`<script setup>` + TypeScript）+ Vite + Pinia + Vue Router
- UI：Element Plus（按需自动导入）
- 原子化 CSS：UnoCSS（presetUno + presetAttributify）
- 画布：fabric.js 5.3（编辑器核心封装在 `src/lib/core`）
- 国际化：vue-i18n；工具库：lodash-es、dayjs、@vueuse/core
- 包管理器：pnpm（不要用 npm/yarn 的锁文件思维）

## 2. 代码风格（与 .prettierrc.js 一致，写代码时直接遵守）

- 单引号，**无分号**，行宽 80，缩进 2 空格，**无尾逗号**
- **禁止写 `console.*`**（`console.log`/`warn`/`error`/`debug` 等一律不写），除非用户明确要求；调试用的临时代码完成后必须删除，不得残留在改动中
- 注释用中文，简洁说明"为什么"或业务含义
- 允许 `any`（eslint 已关闭 no-explicit-any），但优先给出准确类型

## 3. 自动导入（最容易出错，务必遵守）

项目用 unplugin-auto-import + unplugin-vue-components，规则：

| 内容 | 是否需要手动 import |
| --- | --- |
| Vue API：`ref`/`computed`/`watch`/`unref`/`reactive`/`onMounted` 等 | ❌ 不要 import |
| Element Plus 组件 `<el-xxx>`、`ElMessage` 等带 El 前缀的 API | ❌ 不要 import |
| `src/components/` 下的组件（模板中直接用 PascalCase 标签） | ❌ 不要 import |
| `storeToRefs`、`useI18n`、lodash-es、fabric 等 | ✅ 需要手动 import |
| `src/views/**` 下的局部子组件 | ✅ 需要手动 import |

不确定某个标识符是否自动导入时，查 `typings/auto-imports.d.ts` 和 `typings/components.d.ts`，**不要凭空猜测**。

路径别名：`@` → `src`，项目内导入一律用 `@/` 开头。

## 4. 目录与命名

| 类型 | 位置 | 命名 |
| --- | --- | --- |
| 页面视图 | `src/views/<页面>/`，子组件放同级 `components/<Xxx>/index.vue` | 文件夹小写，组件文件 PascalCase 或 index.vue |
| 全局通用组件 | `src/components/`（自动全局注册） | PascalCase .vue 或 `<Xxx>/index.vue` |
| hooks | `src/hooks/useXxx.ts` | 导出 `function useXxx()` |
| Pinia store | `src/store/modules/xxx.ts` | 导出 `useXxxStore` + `useXxxStoreWithOut` |
| API | `src/api/xxx.ts` | axios 实例 + 命名导出函数 `getXxx/createXxx` |
| 枚举 | `src/enums/xxx.ts` | enum 名小写驼峰（如 `panels`、`editorTabs`） |
| 常量 | `src/constants/xxx.ts` | — |
| 类型/接口 | `src/types/`、`src/interface/` | interface 加 `I` 前缀或业务名（如 `IState`、`Template`） |

## 5. Vue SFC 写法

结构顺序固定：`<template>` → `<script lang="ts" setup>` → `<style lang="scss" scoped>`。

script setup 内的书写顺序参照现有代码：

1. 手动 import（pinia、@element-plus/icons-vue、`@/` 内部模块、局部组件）
2. store 实例化、`storeToRefs` 解构
3. `useI18n()` 取 `t`
4. 本地 state（`ref`/`computed`）
5. 方法（事件处理函数命名 `handleXxx` 或 `onXxx`；高频触发的用 lodash-es 的 `debounce` 包裹，250ms）
6. `watch`（需要初始化即执行时加 `{ immediate: true }`）

模板中：文案一律走 i18n（`{{ $t('editor.xxx') }}`），禁止硬编码用户可见文案；新增 key 需同时补 `src/locales/langs/zh-CN/*.json` 和 `src/locales/langs/en/*.json` 两份。

## 6. 文件头注释

新建文件必须加 kuroFileHeader 风格头注释（项目现有文件均有），日期用当天实际日期：

```ts
/*
 * @Author: June
 * @Description: 一句话中文说明该文件职责
 * @Date: <YYYY-MM-DD HH:mm:ss>
 * @LastEditors: June
 * @LastEditTime: <YYYY-MM-DD HH:mm:ss>
 * @FilePath: \element-fabric-editor\<相对路径>
 */
```

## 7. 样式规范

- 布局与简单样式**优先 UnoCSS 原子类**写在模板上：`w-full h-48px text-14px flex` 等；数值直接带 px
- 可用 shortcuts：`wh-full`（宽高 100%）、`f-center`（flex 居中）、`text-over-1`（单行省略）
- 支持 attributify 写法（如 `text="14px #333"`）
- 复杂样式、伪类、覆盖 Element Plus 时用 `<style lang="scss" scoped>`，覆盖组件内部用 `:deep(.el-input__wrapper)` 这类选择器
- 全局变量在 `src/styles/` 下，不要重复定义

## 8. Pinia Store 写法

采用 options 风格 `defineStore({ id, state, actions })`，state 用独立的 `interface IState` 定义，action 命名 `setXxx`/`updateXxx`。需要在 setup 之外使用时导出 `useXxxStoreWithOut()`。参照 `src/store/modules/editor.ts`。

## 9. fabric 编辑器代码

画布相关逻辑不要直接操作原生 DOM/canvas，走 `src/lib/core` 的封装（Editor/Instance/plugin/objects）。给画布对象扩展类型放 `src/lib/core/objects`，插件放 `src/lib/core/plugin`。

## 10. Git 提交规范

用 git-cz 风格的 conventional commits，**type 后带 emoji、描述用中文**：

```
feat: ✨ 新增xx功能
fix: 🐛 修复xx问题
chore: 🚀 依赖更新 / 构建调整
refactor: ♻️ 重构xx
style: 💄 样式调整
docs: ✏️ 文档
perf: ⚡ 性能优化
```

emoji 对照：feat ✨、fix 🐛、chore 🚀、docs ✏️、style 💄、refactor ♻️、perf ⚡、test ✅、ci 👷、build 📦、revert ⏪。
