<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-08-19 12:53:30
 * @LastEditTime: 2024-09-20 10:41:18
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\components\Delete.vue
-->
<template>
  <el-tooltip v-if="mixinState.mSelectMode" :content="$t('editor.quick.del')">
    <el-button @click="del" :icon="Delete" link></el-button>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { Delete } from '@element-plus/icons-vue'
import { debounce } from 'lodash-es'
import { Selector } from '@/hooks/useSelectListen'
import { useEditorStore } from '@/store/modules/editor'

const mixinState = inject('mixinState') as Selector
const editorStore = useEditorStore()

const del = debounce(function () {
  editorStore.editor.del()
}, 300)
</script>
