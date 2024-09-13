<template>
  <el-dialog v-model="modal" :title="props.title" footer-hide>
    <h3>自定义尺寸</h3>
    <section class="asa-size-wrap">
      <div class="asa-size-wrap-item">
        <span>宽度</span>
        <el-input-number
          style="width: 70%"
          v-model="width"
          :min="1"
          placeholder="请输入"
          controls-position="right"
        ></el-input-number>
      </div>
      <div class="asa-size-wrap-item">
        <span>高度</span>
        <el-input-number
          style="width: 70%"
          v-model="height"
          :min="1"
          placeholder="请输入"
          controls-position="right"
        ></el-input-number>
      </div>
      <div :label-width="0">
        <el-button type="primary" @click="customSizeCreate"> 确定 </el-button>
      </div>
    </section>
    <el-divider direction="horizontal" />
    <h3>系统推荐尺寸</h3>
    <section class="cell-wrap">
      <div
        :key="item.name"
        v-for="item in sizeList"
        class="cell-main"
        @click="setSize(`${item.width}x${item.height}x${item.unit}`)"
      >
        <div>
          <div class="cell-name">{{ item.name }}</div>
          <div class="cell-label">
            {{ `${item.width}x${item.height}${item.unit}` }}
          </div>
        </div>
        <el-icon><Plus /></el-icon>
      </div>
    </section>
  </el-dialog>
</template>

<script name="ImportJson" setup>
import { Plus } from '@element-plus/icons-vue'
import { useEditorStore } from '@/store/modules/editor'

const editorStore = useEditorStore()

const emit = defineEmits(['set'])

const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})

const modal = defineModel('show', {
  default: false
})
const width = ref(null)
const height = ref(null)
const sizeList = [
  {
    id: 1,
    name: '小红书配图',
    height: 1660,
    width: 1242,
    unit: 'px'
  },
  {
    id: 2,
    name: '公众号首图',
    height: 383,
    width: 900,
    unit: 'px'
  },
  {
    id: 3,
    name: '公众号次图',
    height: 500,
    width: 500,
    unit: 'px'
  },
  {
    id: 4,
    name: '竖版直播背景',
    height: 1660,
    width: 1242,
    unit: 'px'
  },
  {
    id: 5,
    name: '竖版视频封面',
    height: 2208,
    width: 1242,
    unit: 'px'
  },
  {
    id: 6,
    name: '横版视频封面',
    height: 1080,
    width: 1920,
    unit: 'px'
  },
  {
    id: 7,
    name: '商品主图',
    height: 800,
    width: 800,
    unit: 'px'
  },
  {
    id: 8,
    name: '电商详情页面',
    height: 1000,
    width: 750,
    unit: 'px'
  }
]
const showSetSize = (w, h) => {
  width.value = w || null
  height.value = h || null
  modal.value = true
}
const setSize = (itemString) => {
  const [w, h] = itemString.split('x')
  width.value = Number(w)
  height.value = Number(h)
}

const customSizeCreate = async () => {
  if (width.value && height.value) {
    emit('set', width.value, height.value)
    modal.value = false
  } else {
    ElMessage.warning('请检查尺寸')
  }
}

defineExpose({
  showSetSize
})
</script>
<style scoped lang="scss">
.asa-size-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .asa-size-wrap-item {
    display: inline-block;
    margin-right: 10px;
    & > span {
      margin-right: 10px;
    }
  }
}
h3 {
  padding: 0;
  margin: 0;
}
.divider {
  margin-top: 0;
}
.cell-wrap {
  box-sizing: border-box;
  .cell-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    vertical-align: middle;
    margin-bottom: 10px;
    .cell-name {
      line-height: 24px;
      font-size: 14px;
    }
    .cell-label {
      line-height: 1.2;
      font-size: 12px;
      color: #808695;
    }
  }
}
</style>
