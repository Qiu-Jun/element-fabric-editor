<template>
  <div class="attr-item-box" v-if="isOne && isMatchType && isBarcode">
    <!-- <h3>字体属性</h3> -->
    <el-divider content-position="left"><h4>条形码属性</h4></el-divider>
    <div>
      <div class="flex-view">
        <div class="flex-item">
          <span class="label">代码</span>
          <div class="content">
            <el-input v-model="baseAttr.value" @change="changeCommon" />
          </div>
        </div>
      </div>

      <div class="flex-view" v-if="baseAttr.displayValue">
        <div class="flex-item">
          <span class="label">文字</span>
          <div class="content">
            <el-input v-model="baseAttr.text" @change="changeCommon" />
          </div>
        </div>
      </div>

      <div class="flex-view">
        <div class="flex-item">
          <span class="label">显示</span>
          <div class="content">
            <el-switch v-model="baseAttr.displayValue" @change="changeCommon" />
          </div>
        </div>
        <div class="flex-item" v-if="baseAttr.displayValue">
          <span class="label">垂直</span>
          <div class="content">
            <el-select v-model="baseAttr.textPosition" @change="changeCommon">
              <el-option value="bottom">bottom</el-option>
              <el-option value="top">top</el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="flex-view" v-if="baseAttr.displayValue">
        <div class="flex-item">
          <el-radio-group
            class="button-group"
            v-model="baseAttr.textAlign"
            @change="changeCommon"
            size="small"
          >
            <el-radio-button
              v-for="(item, i) in textAlignList"
              :label="item"
              :value="item"
              :key="item"
            >
              <SvgIcon
                extClass="text-20px"
                color="#fff"
                :icon="textAlignListSvg[i]"
              />
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>

      <div class="flex-view">
        <div :span="12" class="flex-item">
          <span class="label">条码</span>
          <div class="content">
            <el-color-picker
              v-model="baseAttr.lineColor"
              @change="changeCommon"
              show-alpha
            />
          </div>
        </div>
        <div :span="12" class="flex-item" v-if="baseAttr.displayValue">
          <div class="content f-center">
            <InputNumber
              v-model="baseAttr.fontSize"
              @on-change="changeCommon"
              append="字号"
              :min="1"
            />
          </div>
        </div>
      </div>
      <div class="flex-view">
        <div class="flex-item">
          <span class="label">背景</span>
          <div class="content">
            <el-color-picker
              v-model="baseAttr.background"
              @change="changeCommon"
              show-alpha
            />
          </div>
        </div>
        <div class="flex-item">
          <span class="label mr-10px">类型</span>
          <div class="content">
            <el-select
              v-model="baseAttr.format"
              @on-change="changeCommon"
              style="width: 90px"
            >
              <el-option
                v-for="item in barcodeTypeList"
                :value="item"
                :key="item"
              >
                {{ item }}
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputNumber from './InputNumber'
import { useEditorStore } from '@/store/modules/editor'
import useSelect from '@/hooks/select'

const editorStore = useEditorStore()
const { isOne, isMatchType } = useSelect(['image'])
const update = getCurrentInstance()

// 文字元素
const textType = ['image']
const extensionType = ref('')

const isBarcode = computed(() => extensionType.value === 'barcode')

// 属性值
const baseAttr = reactive({
  value: '',
  format: '',
  text: '12121',
  textAlign: 'left',
  textPosition: 'bottom',
  fontSize: 12,
  background: '',
  lineColor: '',
  displayValue: false
})

// 字体对齐方式
const textAlignList = ['left', 'center', 'right']
// 对齐图标
const textAlignListSvg = ['left', 'center', 'right']

// 属性获取
const getObjectAttr = (e?: any) => {
  const activeObject: any = editorStore.canvas?.getActiveObject()
  // 不是当前obj，跳过
  if (e && e.target && e.target !== activeObject) return
  extensionType.value = activeObject?.extensionType || ''
  if (
    activeObject &&
    isMatchType &&
    activeObject?.extensionType === 'barcode'
  ) {
    baseAttr.value = activeObject.get('extension').value
    baseAttr.format = activeObject.get('extension').format
    baseAttr.text = activeObject.get('extension').text
    baseAttr.textAlign = activeObject.get('extension').textAlign
    baseAttr.textPosition = activeObject.get('extension').textPosition
    baseAttr.fontSize = activeObject.get('extension').fontSize
    baseAttr.background = activeObject.get('extension').background
    baseAttr.lineColor = activeObject.get('extension').lineColor
    baseAttr.displayValue = activeObject.get('extension').displayValue
  }
}

// 通用属性改变
const changeCommon = () => {
  editorStore.editor.setBarcode(toRaw(baseAttr))
  editorStore.canvas?.renderAll()
}

const selectCancel = () => {
  extensionType.value = ''
  update?.proxy?.$forceUpdate()
}

const barcodeTypeList = ref([])

onMounted(() => {
  nextTick(() => {
    getObjectAttr()
    barcodeTypeList.value = editorStore.editor?.getBarcodeTypes()
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
:deep(.el-color-picker__trigger) {
  width: 88px;
}

.font-selector {
  .font-item {
    height: 40px;
    width: 330px;
    background-size: auto 40px;
    background-repeat: no-repeat;
  }
}

.flex-view {
  position: relative;
  z-index: 1;
  width: 100%;
  margin-bottom: 10px;
  padding: 5px;
  display: inline-flex;
  justify-content: space-between;
  border-radius: 5px;
  background: #f6f7f9;
  .flex-item {
    display: inline-flex;
    flex: 1;
    .label {
      width: 32px;
      height: 32px;
      line-height: 32px;
      display: inline-block;
      font-size: 14px;
    }
    .content {
      flex: 1;
      align-content: center;
    }
    .button-group {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .el-radio-button {
        flex: 1;
        :deep(.el-radio-button__inner) {
          width: 100%;
        }
      }
    }
    .slider-box {
      width: calc(100% - 50px);
      margin-left: 10px;
    }
  }
}
</style>
