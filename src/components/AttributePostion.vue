<template>
  <div class="box attr-item-box" v-if="mixinState.mSelectMode === 'one'">
    <!-- <h3>位置信息</h3> -->
    <el-divider content-position="left"><h4>位置信息</h4></el-divider>
    <!-- 通用属性 -->
    <div v-show="baseType.includes(mixinState.mSelectOneType as string)">
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="12">
          <InputNumber
            v-model="baseAttr.left"
            :append="$t('editor.attributes.left')"
            @on-change="(value) => changeCommon('left', value)"
          />
        </el-col>
        <el-col :span="12">
          <InputNumber
            v-model="baseAttr.right"
            :append="$t('editor.attributes.top')"
            @on-change="(value) => changeCommon('top', value)"
          />
        </el-col>
      </el-row>

      <div class="asa-number-warp">
        <span>{{ $t('editor.attributes.angle') }}</span>
        <el-slider
          v-model="baseAttr.angle"
          :max="360"
          @input="(value: any) => changeCommon('angle', value)"
        ></el-slider>
      </div>

      <div class="asa-number-warp">
        <span>{{ $t('editor.attributes.opacity') }}</span>
        <el-slider
          v-model="baseAttr.opacity"
          @input="(value: any) => changeCommon('opacity', value)"
        ></el-slider>
      </div>
    </div>
    <!-- <Divider plain></Divider> -->
  </div>
</template>

<script lang="ts" setup>
import InputNumber from './InputNumber'
import { Selector } from '@/hooks/useSelectListen'
import { useEditorStore } from '@/store/modules/editor'

const mixinState = inject('mixinState') as Selector
const editorStore = useEditorStore()
const update = getCurrentInstance()

// 可修改的元素
const baseType = [
  'text',
  'i-text',
  'textbox',
  'rect',
  'circle',
  'triangle',
  'polygon',
  'image',
  'group',
  'line',
  'arrow',
  'thinTailArrow'
]

// 属性值
const baseAttr = reactive<Record<string, any>>({
  opacity: 0,
  angle: 0,
  left: 0,
  top: 0,
  rx: 0,
  ry: 0
})

// 属性获取
const getObjectAttr = (e?: any) => {
  const activeObject = editorStore.canvas?.getActiveObject()
  // 不是当前obj，跳过
  if (e && e.target && e.target !== activeObject) return
  //@ts-ignore
  if (activeObject && baseType.includes(activeObject.type)) {
    baseAttr.opacity = (activeObject.get('opacity') ?? 0) * 100
    baseAttr.left = activeObject.get('left')
    baseAttr.top = activeObject.get('top')
    baseAttr.angle = activeObject.get('angle') || 0
  }
}

// 通用属性改变
const changeCommon = (key: any, value: any) => {
  const activeObject = editorStore.canvas?.getActiveObjects()[0]
  if (activeObject) {
    // 透明度特殊转换
    if (key === 'opacity') {
      activeObject && activeObject.set(key, value / 100)
      editorStore.canvas?.renderAll()
      return
    }
    // 旋转角度适配
    if (key === 'angle') {
      activeObject.rotate(value)
      editorStore.canvas?.renderAll()
      return
    }
    activeObject && activeObject.set(key, value)
    editorStore.canvas?.renderAll()
  }
}

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

<style lang="scss" scoped>
.asa-number-warp {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #f6f7f9;
  border-radius: 5px;
  padding: 0 15px 0 10px;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
  span {
    display: inline-block;
    width: 56px;
    font-size: var(--el-form-label-font-size);
    color: var(--el-text-color-regular);
  }
}
</style>
