<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-05 00:02:31
 * @LastEditTime: 2024-09-30 16:09:18
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
        <svg
          t="1650853919128"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1271"
          width="14"
          height="14"
        >
          <path
            d="M970.837333 919.850667l-205.696-205.653334A382.421333 382.421333 0 0 0 853.333333 469.333333a384 384 0 0 0-384-384 384 384 0 0 0-384 384 384 384 0 0 0 384 384 382.421333 382.421333 0 0 0 244.906667-88.192l205.653333 205.653334a36.053333 36.053333 0 0 0 50.986667 0 36.266667 36.266667 0 0 0-0.042667-50.944z m-380.117333-162.986667c-38.4 16.256-79.189333 24.448-121.386667 24.448a311.296 311.296 0 0 1-220.586666-91.392A311.296 311.296 0 0 1 157.312 469.333333 311.296 311.296 0 0 1 248.746667 248.746667 311.296 311.296 0 0 1 469.333333 157.354667a311.296 311.296 0 0 1 220.586667 91.392A311.296 311.296 0 0 1 781.354667 469.333333a311.296 311.296 0 0 1-91.392 220.586667 310.186667 310.186667 0 0 1-99.242667 66.901333z"
            p-id="1272"
          ></path>
          <path
            d="M652.672 431.829333h-147.84V292.010667a35.968 35.968 0 1 0-71.978667 0v139.818666H292.010667a35.968 35.968 0 1 0 0 72.021334h140.8v140.8a35.968 35.968 0 1 0 72.021333 0v-140.8h147.84a35.968 35.968 0 1 0 0-72.021334z"
            p-id="1273"
          ></path>
        </svg>
      </el-button>
      <el-button @click="small">
        <svg
          t="1650853934351"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1470"
          width="14"
          height="14"
        >
          <path
            d="M970.837333 919.850667l-205.696-205.653334A382.421333 382.421333 0 0 0 853.333333 469.333333a384 384 0 0 0-384-384 384 384 0 0 0-384 384 384 384 0 0 0 384 384 382.421333 382.421333 0 0 0 244.906667-88.192l205.653333 205.653334a36.053333 36.053333 0 0 0 50.986667 0 36.266667 36.266667 0 0 0-0.042667-50.944z m-380.117333-162.986667c-38.4 16.256-79.189333 24.448-121.386667 24.448a311.296 311.296 0 0 1-220.586666-91.392A311.296 311.296 0 0 1 157.312 469.333333 311.296 311.296 0 0 1 248.746667 248.746667 311.296 311.296 0 0 1 469.333333 157.354667a311.296 311.296 0 0 1 220.586667 91.392A311.296 311.296 0 0 1 781.354667 469.333333a311.296 311.296 0 0 1-91.392 220.586667 310.186667 310.186667 0 0 1-99.242667 66.901333z"
            p-id="1471"
          ></path>
          <path
            d="M652.672 431.829333H292.010667a35.968 35.968 0 1 0 0 72.021334h360.661333a35.968 35.968 0 1 0 0-72.021334z"
            p-id="1472"
          ></path>
        </svg>
      </el-button>
      <el-button @click="rSet" :icon="FullScreen"></el-button>
      <el-button @click="setViewport">
        <SvgIcon
          :style="{ width: '18px', height: '18px' }"
          color="var(--color)"
          name="editor-suoxiao"
        />
      </el-button>
    </el-button-group>
  </div>
</template>

<script lang="ts" setup>
import { FullScreen } from '@element-plus/icons-vue'
import { useEditorStore } from '@/store/modules/editor'

const editorStore = useEditorStore()
const dragEnable = ref(false)
const onDragEnable = (val: boolean) => {
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
