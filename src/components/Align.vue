<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-05 22:41:44
 * @LastEditTime: 2024-09-05 22:47:33
 * @LastEditors: June
 * @FilePath: \ai-desing\src\views\editor\components\Align.vue
-->
<template>
  <div class="attr-item-box" v-if="mixinState.mSelectMode === 'multiple'">
    <el-divider content-position="left">
      <h4>对齐</h4>
    </el-divider>
    <div class="bg-item flex flex-wrap">
      <!-- 水平对齐 -->
      <el-tooltip :content="$t('editor.attrSetting.align.left')">
        <el-button class="w-36px" @click="left" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="left" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('editor.attrSetting.align.centerX')">
        <el-button class="w-36px" @click="xcenter" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="centerx" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('editor.attrSetting.align.right')">
        <el-button class="w-36px" @click="right" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="right" />
        </el-button>
      </el-tooltip>
      <!-- 垂直对齐 -->
      <el-tooltip :content="$t('editor.attrSetting.align.top')">
        <el-button class="w-36px" @click="top" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="top" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('editor.attrSetting.align.centerY')">
        <el-button class="w-36px" @click="ycenter" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="centery" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('editor.attrSetting.align.bottom')">
        <el-button class="w-36px" @click="bottom" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="bottom" />
        </el-button>
      </el-tooltip>
      <!-- 平均对齐 -->
      <el-tooltip :content="$t('editor.attrSetting.align.averageX')">
        <el-button class="w-36px" @click="xequation" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="sx" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('editor.attrSetting.align.averageY')">
        <el-button class="w-36px" @click="yequation" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="sy" />
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Selector } from '@/hooks/useSelectListen'
import { useEditorStore } from '@/store/modules/editor'

const mixinState = inject('mixinState') as Selector
const editorStore = useEditorStore()

// 左对齐
const left = () => {
  editorStore.editor.left()
}
// 右对齐
const right = () => {
  editorStore.editor.right()
}
// 水平居中对齐
const xcenter = () => {
  editorStore.editor.xcenter()
}
// 垂直居中对齐
const ycenter = () => {
  editorStore.editor.ycenter()
}
// 顶部对齐
const top = () => {
  editorStore.editor.top()
}
// 底部对齐
const bottom = () => {
  editorStore.editor.bottom()
}
// 水平平均对齐
const xequation = () => {
  editorStore.editor.xequation()
}
// 垂直平均对齐
const yequation = () => {
  editorStore.editor.yequation()
}
</script>
