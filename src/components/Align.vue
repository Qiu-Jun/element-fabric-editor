<!--
 * @Author: 秦少卫
 * @Date: 2022-09-03 19:16:55
 * @LastEditors: June
 * @LastEditTime: 2024-07-24 19:36:49
 * @Description: 组合元素对齐
-->

<template>
  <div v-if="mixinState.mSelectMode === 'multiple'" class="attr-item-box">
    <!-- <h3>对齐</h3> -->
    <el-divider content-position="left"><h4>对齐</h4></el-divider>
    <div class="bg-item">
      <!-- 水平对齐 -->
      <el-tooltip :content="$t('attrSeting.align.left')">
        <el-button class="icon" @click="left" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="left" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('attrSeting.align.centerX')">
        <el-button class="icon" @click="xcenter" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="centerx" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('attrSeting.align.right')">
        <el-button class="icon" @click="right" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="right" />
        </el-button>
      </el-tooltip>
      <!-- 垂直对齐 -->
      <el-tooltip :content="$t('attrSeting.align.top')">
        <el-button class="icon" @click="top" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="top" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('attrSeting.align.centerY')">
        <el-button class="icon" @click="ycenter" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="centery" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('attrSeting.align.bottom')">
        <el-button class="icon" @click="bottom" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="bottom" />
        </el-button>
      </el-tooltip>
      <!-- 平均对齐 -->
      <el-tooltip :content="$t('attrSeting.align.averageX')">
        <el-button class="icon" @click="xequation" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="sx" />
        </el-button>
      </el-tooltip>
      <el-tooltip :content="$t('attrSeting.align.averageY')">
        <el-button class="icon" @click="yequation" size="small" link>
          <SvgIcon :style="{ width: '20px', height: '20px' }" name="sy" />
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script name="Align" setup>
import useSelect from '@/hooks/select'

const { mixinState, canvasEditor } = useSelect()

// 左对齐
const left = () => {
  canvasEditor.left()
}
// 右对齐
const right = () => {
  canvasEditor.right()
}
// 水平居中对齐
const xcenter = () => {
  canvasEditor.xcenter()
}
// 垂直居中对齐
const ycenter = () => {
  canvasEditor.ycenter()
}
// 顶部对齐
const top = () => {
  canvasEditor.top()
}
// 底部对齐
const bottom = () => {
  canvasEditor.bottom()
}
// 水平平均对齐
const xequation = () => {
  canvasEditor.xequation()
}
// 垂直平均对齐
const yequation = () => {
  canvasEditor.yequation()
}
</script>

<style lang="scss" scoped>
.icon {
  width: 100%;
  height: auto;
}
</style>
