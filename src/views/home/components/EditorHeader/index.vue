<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-12 18:51:45
 * @LastEditTime: 2024-09-13 01:13:12
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\views\home\components\EditorHeader\index.vue
-->
<template>
  <div class="w-full flex justify-between items-center">
    <div class="flex justify-start items-center">
      <Logo />
      <el-divider direction="vertical" />
      <ImportJson />
      <el-divider direction="vertical" />
      <ImportFile />
      <el-divider direction="vertical" />
      <router-link custom v-slot="{ navigate }" to="/editor/template">
        <el-button text @click="navigate">全部模板</el-button>
      </router-link>
      <el-divider direction="vertical" />
      <MyTemplName />

      <el-tooltip :content="$t('grid')">
        <el-switch
          v-model="rulerEnable"
          @change="onRulerEnable"
          size="small"
          class="mx-10px"
        />
      </el-tooltip>
      <el-divider direction="vertical" />
      <History />
    </div>
    <div class="flex justify-end items-center">
      <a
        class="mr-10px"
        href="https://github.com/ikuaitu/element-fabric-editor"
        target="_blank"
      >
        <img
          src="https://img.shields.io/badge/GitHub-ElementFbricEditor-blue"
          alt="element-fbric-editor"
        />
      </a>
      <PreviewCurrent />
      <el-divider direction="vertical" />
      <Save />
      <el-divider direction="vertical" />
      <Login />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/store/modules/editor'

const editorStore = useEditorStore()
// 标尺
const rulerEnable = ref(false)
const onRulerEnable = (val: string | number | boolean) => {
  if (val) {
    editorStore.editor.rulerEnable()
  } else {
    editorStore.editor.rulerDisable()
  }
  // 使标尺开关组件失焦，避免响应键盘的空格事件
  // @ts-ignore
  document.activeElement.blur()
}
</script>
