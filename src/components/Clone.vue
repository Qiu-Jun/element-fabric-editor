<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-05 23:13:23
 * @LastEditTime: 2024-09-06 11:32:00
 * @LastEditors: June
 * @FilePath: \ai-desing\src\views\editor\components\Clone.vue
-->
<template>
  <el-tooltip
    v-if="mixinState.mSelectMode === 'one'"
    :content="$t('editor.quick.copy')"
  >
    <el-button @click="clone" :icon="CopyDocument" link></el-button>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { CopyDocument } from '@element-plus/icons-vue'
import { debounce } from 'lodash-es'
import { Selector } from '@/hooks/useSelectListen'
import { useEditorStore } from '@/store/modules/editor'

const mixinState = inject('mixinState') as Selector
const editorStore = useEditorStore()
const clone = debounce(function () {
  editorStore.editor.clone()
}, 300)
</script>
