<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-12 19:12:04
 * @LastEditTime: 2024-09-12 20:27:57
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\views\home\components\EditorContent\index.vue
-->
<template>
  <PanelLeft v-model="rulerEnable" />
  <PanelMiddle v-model="rulerEnable" />
  <PanelRight />
</template>

<script lang="ts" setup>
import PanelLeft from './PanelLeft/index.vue'
import PanelMiddle from './PanelMiddle/index.vue'
import PanelRight from './PanelRight/index.vue'

const rulerEnable = ref(true)
</script>
