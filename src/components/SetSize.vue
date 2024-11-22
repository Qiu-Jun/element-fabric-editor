<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-05 23:19:31
 * @LastEditTime: 2024-11-22 14:20:23
 * @LastEditors: June
 * @FilePath: \ai-desing\src\views\editor\components\SetSize.vue
-->
<template>
  <div v-if="!isSelect" class="attr-item-box">
    <el-divider content-position="left">
      <h4>{{ $t('editor.bgSeting.size') }}</h4>
    </el-divider>
    <el-form :label-width="40" inline class="flex">
      <el-form-item :label="$t('editor.bgSeting.width')" prop="name">
        <el-input
          style="width: 60px"
          disabled
          v-model="width"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item :label="$t('editor.bgSeting.height')" prop="name">
        <el-input
          style="width: 60px"
          disabled
          v-model="height"
          readonly
        ></el-input>
      </el-form-item>
      <el-form-item :label-width="0">
        <el-button link @click="showSetSize">
          <el-icon size="18"><Edit /></el-icon>
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 修改尺寸 -->
    <ModalSize
      :title="$t('editor.setSizeTip')"
      ref="modalSizeRef"
      @set="handleConfirm"
    ></ModalSize>
  </div>
</template>

<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'
import ModalSize from './ModalSize.vue'
import { useEditorStore } from '@/store/modules/editor'
import useSelect from '@/hooks/select'

const editorStore = useEditorStore()
const { isSelect } = useSelect()
const DefaultSize = {
  width: 900,
  height: 1200
}

const modalSizeRef = ref(null)

const width = ref(DefaultSize.width)
const height = ref(DefaultSize.height)

onMounted(() => {
  nextTick(() => {
    const { width: w, height: h } = editorStore.editor?.getWorkspaceSize() || {
      width: 0,
      height: 0
    }
    w > 0 && (width.value = w)
    h > 0 && (height.value = h)
    editorStore.editor?.setSize(width.value, height.value)
    editorStore.editor?.on('sizeChange', (w: number, h: number) => {
      width.value = w
      height.value = h
    })
  })
})

const setSize = () => {
  editorStore.editor?.setSize(width.value, height.value)
}

const showSetSize = () => {
  //@ts-ignore
  modalSizeRef.value?.showSetSize(width.value, height.value)
}
const handleConfirm = (w: number, h: number) => {
  width.value = w
  height.value = h
  setSize()
}
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  margin-right: 10px;
}
</style>
