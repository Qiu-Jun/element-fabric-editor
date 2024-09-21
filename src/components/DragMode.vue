<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-08-19 12:53:30
 * @LastEditTime: 2024-09-21 09:39:06
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\components\DragMode.vue
-->
<template>
  <div class="box">
    <el-switch
      size="large"
      v-model="status"
      @change="switchMode"
      width="60"
      inline-prompt
      active-text="Drag"
      inactive-text="Drag"
    />
  </div>
</template>

<script setup name="Drag">
import { useEditorStore } from '@/store/modules/editor'
const editorStore = useEditorStore()
const status = ref(false)

const switchMode = (val) => {
  if (val) {
    editorStore.editor?.startDring()
  } else {
    editorStore.editor?.endDring()
  }
}

onMounted(() => {
  nextTick(() => {
    editorStore.editor?.on('startDring', () => (status.value = true))
    editorStore.editor?.on('endDring', () => (status.value = false))
  })
})

onBeforeUnmount(() => {
  editorStore.editor?.off('startDring')
  editorStore.editor?.off('endDring')
})
</script>
