<template>
  <el-tooltip v-if="mixinState.mSelectMode" :content="$t('editor.quick.del')">
    <el-button @click="del" icon="ios-trash" link>
      <el-icon>
        <Delete />
      </el-icon>
    </el-button>
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
