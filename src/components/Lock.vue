<template>
  <el-tooltip
    :content="$t('quick.lock')"
    v-if="mixinState.mSelectMode === 'one'"
  >
    <el-button
      v-if="isLock"
      @click="doLock(false)"
      :icon="Lock"
      link
    ></el-button>
    <el-button v-else @click="doLock(true)" :icon="Unlock" link></el-button>
  </el-tooltip>
</template>

<script lang="ts" setup>
import { Lock, Unlock } from '@element-plus/icons-vue'
import { Selector } from '@/hooks/useSelectListen'
import { useEditorStore } from '@/store/modules/editor'

const mixinState = inject('mixinState') as Selector
const editorStore = useEditorStore()

const isLock = ref(false)
const doLock = (isLock) => {
  isLock ? editorStore.editor?.lock() : editorStore.editor?.unLock()
}

const handleSelected = (items) => {
  isLock.value = !items[0].selectable
}

onMounted(() => {
  nextTick(() => {
    editorStore.editor?.on('selectOne', handleSelected)
  })
})

onBeforeUnmount(() => {
  editorStore.editor?.off('selectOne', handleSelected)
})
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
