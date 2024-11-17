<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-05 23:18:00
 * @LastEditTime: 2024-11-17 09:41:49
 * @LastEditors: June
 * @FilePath: \ai-desing\src\views\editor\components\Group.vue
-->
<template>
  <div v-if="isMultiple || isGroup" class="attr-item-box">
    <div class="bg-item">
      <!-- 组合按钮 多选时不可用 -->
      <el-button v-if="isMultiple" :disabled="!isMultiple" @click="group">
        <SvgIcon extClass="text-20px" color="#fff" icon="group" />
        {{ $t('editor.attrSetting.group') }}
      </el-button>
      <!-- 拆分组合按钮，为单选且组元素时可用 -->
      <el-button v-if="isGroup" :disabled="!isGroup" @click="unGroup">
        <SvgIcon extClass="text-20px" color="#fff" icon="un-group" />
        {{ $t('editor.attrSetting.unGroup') }}
      </el-button>
    </div>

    <!-- <Divider plain v-if="isGroup"></Divider> -->
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/store/modules/editor'
import useSelect from '@/hooks/select'

const editorStore = useEditorStore()
const { isGroup, isMultiple } = useSelect()

// 拆分组
const unGroup = () => {
  editorStore.editor.unGroup()
}
const group = () => {
  editorStore.editor.group()
}
</script>
<style scoped lang="scss">
:deep(.el-button) {
  width: 100%;
  svg {
    margin-right: 5px;
  }
  &[disabled] {
    svg {
      opacity: 0.2;
    }
  }
}
</style>
