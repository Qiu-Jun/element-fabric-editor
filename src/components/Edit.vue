<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-06 00:14:35
 * @LastEditTime: 2024-10-03 11:54:25
 * @LastEditors: June
 * @FilePath: \ai-desing\src\views\editor\components\Edit.vue
-->
<template>
  <el-tooltip
    :content="$t('editor.quick.editPoly')"
    v-if="mixinState.mSelectOneType === 'polygon'"
  >
    <el-button @click="onEditPolygon" link>
      <SvgIcon extClass="text-20px" icon="editor-brush" />
    </el-button>
  </el-tooltip>
</template>

<script setup lang="ts">
import { Selector } from '@/hooks/useSelectListen'
import { useEditorStore } from '@/store/modules/editor'

const mixinState = inject('mixinState') as Selector
const editorStore = useEditorStore()
const onEditPolygon = () => {
  const obj = editorStore.editor.fabricCanvas?.getActiveObject()
  if (obj && obj.type === 'polygon') {
    editorStore.editor.activeEdit()
  } else {
    ElMessage.warning('请检查选择polygon')
  }
}
</script>
