<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-05 23:05:23
 * @LastEditTime: 2024-09-12 20:12:17
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\components\AttributeRounded.vue
-->
<template>
  <div
    class="box attr-item-box"
    v-if="
      mixinState.mSelectMode === 'one' &&
      rectType.includes(mixinState.mSelectOneType as string)
    "
  >
    <!-- <h3>圆角</h3> -->
    <el-divider content-position="left"><h4>圆角</h4></el-divider>
    <!-- 通用属性 -->
    <div>
      <el-row :gutter="10">
        <el-col :span="18" flex="1">
          <el-form :label-width="40" class="form-wrap">
            <el-form-item :label="$t('attributes.rx_ry')">
              <el-slider
                v-model="baseAttr.rx"
                :max="300"
                @input="(value: any) => changeCommon(value)"
              ></el-slider>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6" flex="1">
          <InputNumber
            v-model="baseAttr.rx"
            :min="0"
            :max="300"
            @on-change="(value) => changeCommon(value)"
          ></InputNumber>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import InputNumber from './InputNumber'
import { Selector } from '@/hooks/useSelectListen'
import { useEditorStore } from '@/store/modules/editor'

const mixinState = inject('mixinState') as Selector
const editorStore = useEditorStore()
const update = getCurrentInstance()

// 矩形元素
const rectType = ['rect']

// 属性值
const baseAttr = reactive({
  rx: 0,
  ry: 0
})

// 属性获取
const getObjectAttr = (e?: any) => {
  const activeObject = editorStore.canvas?.getActiveObject()
  // 不是当前obj，跳过
  if (e && e.target && e.target !== activeObject) return
  if (activeObject) {
    baseAttr.rx = activeObject.get('rx')
    baseAttr.ry = activeObject.get('ry')
  }
}

// 通用属性改变
const changeCommon = (value) => {
  const activeObject = editorStore.canvas.getActiveObjects()[0]
  if (activeObject) {
    activeObject.set('ry', value)
    activeObject.set('rx', value)
    editorStore.canvas.renderAll()
  }
}

const selectCancel = () => {
  update?.proxy?.$forceUpdate()
}

onMounted(() => {
  nextTick(() => {
    // 获取圆角数据
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

<style scoped lang="scss"></style>
