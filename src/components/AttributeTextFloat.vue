<template>
  <div
    v-if="mixinState.mSelectMode === 'one' && isMatchType"
    class="attr-item-box"
  >
    <div class="flex-view">
      <div class="flex-item">
        <span class="label">{{ $t('editor.textFloat') }}</span>
        <div class="content">
          <el-select
            v-model="baseAttr.verticalAlign"
            @change="(value: any) => changeCommon('verticalAlign', value)"
          >
            <el-option label="无" value="null"></el-option>
            <el-option label="下标" value="bottom"></el-option>
            <el-option label="上标" value="top"></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Selector } from '@/hooks/useSelectListen'
import { useEditorStore } from '@/store/modules/editor'

const mixinState = inject('mixinState') as Selector
const editorStore = useEditorStore()

const baseAttr = reactive({
  verticalAlign: 'null'
})

const matchType = ['i-text', 'textbox', 'text']

const isMatchType = computed(() =>
  matchType.includes(mixinState.mSelectOneType as string)
)
const getObjectAttr = (e?: any) => {
  const activeObject = editorStore.canvas?.getActiveObject()
  // 不是当前obj，跳过
  if (e && e.target && e.target !== activeObject) return
  if (
    activeObject &&
    matchType.includes(activeObject.type as string) &&
    // @ts-ignore
    activeObject.text.includes('.')
  ) {
    // @ts-ignore
    baseAttr.verticalAlign = activeObject.get('verticalAlign')
  }
}

const changeCommon = (key: any, value: any) => {
  const activeObject: any = editorStore.canvas?.getActiveObjects()[0]
  if (activeObject && activeObject.text.includes('.')) {
    const [init] = activeObject.text.split('.')
    const startIndex = init.length + 1
    const endIndex = activeObject.text.length
    activeObject.styles = []
    // 上标
    if (value === 'top') {
      activeObject.setSuperscript(startIndex, endIndex)
    } else if (value === 'bottom') {
      // 下标
      activeObject.setSelectionStyles(
        {
          fontSize: activeObject.superscript.size * activeObject.fontSize
        },
        startIndex,
        endIndex
      )
    }
    activeObject.set(key, value)
    editorStore.canvas?.renderAll()
  }
}

const update = getCurrentInstance()
const selectCancel = () => {
  update?.proxy?.$forceUpdate()
}

onMounted(() => {
  nextTick(() => {
    // 获取字体数据
    getObjectAttr()
    editorStore.editor?.on('selectCancel', selectCancel)
    editorStore.editor?.on('selectOne', getObjectAttr)
    editorStore.canvas?.on('object:modified', getObjectAttr)
  })
})

onBeforeUnmount(() => {
  editorStore.editor?.off('selectCancel', selectCancel)
  editorStore.editor?.off('selectOne', getObjectAttr)
  editorStore.canvas?.off('object:modified', getObjectAttr)
})
</script>

<style scoped lang="scss">
.flex-view {
  position: relative;
  z-index: 1;
  width: 100%;
  margin-bottom: 5px;
  padding: 5px;
  display: inline-flex;
  justify-content: space-between;
  border-radius: 5px;
  background: #f6f7f9;
}
.flex-item {
  display: inline-flex;
  flex: 1;
  .label {
    width: 32px;
    height: 32px;
    line-height: 32px;
    display: inline-block;
    font-size: 14px;
    // color: #333333;
  }
  .content {
    flex: 1;
    // width: 60px;
  }
  .slider-box {
    width: calc(100% - 50px);
    margin-left: 10px;
  }
  .left {
    flex: 1;
  }
  .right {
    flex: 1;
    margin-left: 10px;
  }
}
</style>
