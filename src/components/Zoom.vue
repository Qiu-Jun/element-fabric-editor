<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-05 00:02:31
 * @LastEditTime: 2024-11-17 10:05:23
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\components\Zoom.vue
-->
<template>
  <div class="absolute right-10px bottom-10px">
    <el-switch
      v-model="dragEnable"
      size="large"
      class="mr-10px"
      inline-prompt
      active-text="拖曳"
      inactive-text="拖曳"
      @change="onDragEnable"
    />
    <el-button-group>
      <el-button @click="big">
        <SvgIcon extClass="text-20px" color="var(--color)" icon="zoom-big" />
      </el-button>
      <el-button @click="rSet" :icon="FullScreen"></el-button>
      <el-button @click="setViewport">
        <SvgIcon extClass="text-20px" color="var(--color)" icon="zoom-small" />
      </el-button>
    </el-button-group>
  </div>
</template>

<script lang="ts" setup>
import { FullScreen } from '@element-plus/icons-vue'
import { useEditorStore } from '@/store/modules/editor'

const editorStore = useEditorStore()
const dragEnable = ref(false)
const onDragEnable = (val: string | number | boolean) => {
  if (val) {
    editorStore.editor.startDring()
  } else {
    editorStore.editor.endDring()
  }
}
const rSet = () => {
  editorStore.editor.one()
}
const big = () => {
  editorStore.editor.big()
}
const small = () => {
  editorStore.editor.small()
}
const setViewport = () => {
  editorStore.editor.auto()
}

onMounted(() => {
  nextTick(() => {
    editorStore.editor?.on('startDring', () => (dragEnable.value = true))
    editorStore.editor?.on('endDring', () => (dragEnable.value = false))
  })
})

onBeforeUnmount(() => {
  editorStore.editor?.off('startDring')
  editorStore.editor?.off('endDring')
})
</script>
