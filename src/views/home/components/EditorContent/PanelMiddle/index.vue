<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-12 19:09:34
 * @LastEditTime: 2024-09-13 01:25:44
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\views\home\components\EditorContent\PanelMiddle\index.vue
-->
<template>
  <section class="flex-1 w-full relative overflow-hidden" id="workspace">
    <div class="relative">
      <div class="absolute w-full z-2 inside-shadow"></div>
      <canvas
        class="w-300px h-300px mx-auto"
        id="canvas"
        :class="rulerEnable ? 'design-stage-grid' : ''"
      ></canvas>

      <!-- 暂放 -->
      <div
        class="absolute left-30px bottom-10px bg-#fff rounded-4px p-4px"
        @click="handleLayer"
      >
        <SvgIcon
          :style="{ width: '24px', height: '24px' }"
          name="editor-layer"
        />
      </div>

      <DragMode />
      <Zoom />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash-es'
import { useEditorStore } from '@/store/modules/editor'

const editorStore = useEditorStore()
const rulerEnable = computed(() => editorStore.rulerEnable)
// 暂放 待分离组件
const handleLayer = debounce(function () {
  //   currentTab.value = ''
  //   unref(subType) !== panels.layer && (subType.value = panels.layer)
}, 250)
</script>

<style lang="scss" scoped>
.inside-shadow {
  box-shadow: inset 0 0 9px 2px #0000001f;
  pointer-events: none;
}

#workspace {
  background: #f1f1f1;
}

.design-stage-grid {
  --offsetX: 0px;
  --offsetY: 0px;
  --size: 16px;
  --color: #dedcdc;
  background-image: linear-gradient(
      45deg,
      var(--color) 25%,
      transparent 0,
      transparent 75%,
      var(--color) 0
    ),
    linear-gradient(
      45deg,
      var(--color) 25%,
      transparent 0,
      transparent 75%,
      var(--color) 0
    );
  background-position:
    var(--offsetX) var(--offsetY),
    calc(var(--size) + var(--offsetX)) calc(var(--size) + var(--offsetY));
  background-size: calc(var(--size) * 2) calc(var(--size) * 2);
}
</style>
