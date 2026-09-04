# element-fabric-editor

基于 Vue 3 + TS + Vite + Pinia + Element Plus + UnoCSS + fabric.js 的画布编辑器。包管理器用 pnpm。

## 代码规范（必须遵守）

在本项目**生成或修改任何代码**之前，先阅读并遵循完整规范：

**`.claude/skills/code-standard/SKILL.md`**（也可用 `/code-standard` 调用）

最高优先级的几条硬性规则：

- **自动导入**：Vue API（`ref`/`computed`/`watch`/`onMounted` 等）、Element Plus 组件与 `ElMessage`、`src/components/` 下的组件，**一律不要手动 import**；`storeToRefs`/`useI18n`/lodash-es/`@/` 内部模块需要手动 import。不确定就查 `typings/auto-imports.d.ts`、`typings/components.d.ts`
- **代码风格**：单引号、无分号、无尾逗号、行宽 80、缩进 2 空格；注释用中文
- **禁止 `console.*`**：默认不写任何 console 输出（log/warn/error 等），除非明确要求
- **SFC 顺序**：`<template>` → `<script lang="ts" setup>` → `<style lang="scss" scoped>`；新文件加 kuroFileHeader 风格文件头注释
- **文案**：用户可见文案一律走 i18n（`$t('editor.xxx')`），新增 key 同步补 `src/locales/langs/zh-CN/` 和 `en/` 两份
- **样式**：优先 UnoCSS 原子类（shortcuts：`wh-full`、`f-center`、`text-over-1`）；复杂样式用 scoped SCSS + `:deep()`
- **完成后**：对改动文件执行 `npx eslint --fix <files>` 并确认无报错

## 常用命令

```bash
pnpm dev      # 启动开发（端口 3000）
pnpm build    # 生产构建
pnpm lint     # eslint 检查并修复
pnpm commit   # git-cz 交互式提交（conventional + emoji，中文描述）
```

## 目录速览

- `src/views/` 页面；`src/components/` 全局组件（自动注册）；`src/hooks/` 组合式函数
- `src/store/modules/` Pinia（options 风格 + `useXxxStoreWithOut`）；`src/api/` 接口层
- `src/locales/langs/{zh-CN,en}/` 国际化；`src/lib/core/` fabric 编辑器核心封装
