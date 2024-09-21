<!--
 * @Author: June
 * @Description: 
 * @Date: 2024-09-12 19:09:28
 * @LastEditTime: 2024-09-21 09:31:52
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\views\home\components\EditorContent\PanelLeft\index.vue
-->
<template>
  <section class="flex justify-start max-w-384px">
    <ul
      class="relative bg-#fff z-1 w-72px flex flex-col items-center pt-10px box-border border-r-#eef2f8 border-r-solid border-r-1px"
    >
      <li
        class="flex flex-col items-center mb-20px cursor-pointer"
        v-for="tab in tabList"
        :key="tab.type"
        @click="tabChange(tab.type, panels.menu)"
      >
        <div
          class="px-10px f-center py-4px rounded-10px tab-item editor-item"
          :class="[currentTab === tab.type ? 'tab-item_active' : '']"
        >
          <SvgIcon
            :style="{ width: '24px', height: '24px' }"
            :name="tab.icon"
            :color="currentTab === tab.type ? '#000' : '#333'"
          />
        </div>
        <span
          class="text-12px"
          :class="[currentTab === tab.type ? 'font-bold' : '']"
          >{{ tab.name }}</span
        >
      </li>
    </ul>
    <div
      v-if="panelPositoin === 'left'"
      class="relative h-full transition-all transition-ease left-style-panel"
      :class="[
        !showPanel ? '-ml-312px' : '',
        panelType === panels.menu ? 'w-312px' : 'w-224px'
      ]"
    >
      <template v-if="showPanel && panelType === panels.menu">
        <template v-if="currentTab">
          <KeepAlive>
            <component :is="tabComMap[currentTab]" />
          </KeepAlive>
        </template>
        <div
          class="inline-block absolute -right-14px top-50% -translate-y-50% z-1 cursor-pointer"
          @click="handleHideSubMenu"
        >
          <img src="@/assets/svgs/close-btn.svg" />
        </div>
      </template>
      <template v-else>
        <Layer />
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { debounce } from 'lodash-es'
import { tabList } from '@/constants/editor'
import { editorTabs, panels } from '@/enums/editor'
import Create from './components/Create.vue'
import Element from './components/Element.vue'
import Template from './components/Template.vue'
import Material from './components/Material.vue'
import Ai from './components/Ai.vue'
import Text from './components/Text.vue'
import Mine from './components/Mine/index.vue'
import { useEditorStore } from '@/store/modules/editor'
import { storeToRefs } from 'pinia'

const editorStore = useEditorStore()
const { panelType, showPanel, panelPositoin } = storeToRefs(editorStore)
const tabComMap: Record<editorTabs, any> = {
  [editorTabs.create]: Create,
  [editorTabs.template]: Template,
  [editorTabs.element]: Element,
  [editorTabs.ai]: Ai,
  [editorTabs.text]: Text,
  [editorTabs.material]: Material,
  [editorTabs.mine]: Mine
}

// 二级菜单
const handleHideSubMenu = debounce(function () {
  editorStore.setShowPanel(false)
}, 250)
// 左侧tab相关
const currentTab = ref<editorTabs | ''>(editorTabs.template)
const tabChange = debounce(function (type: editorTabs, _subType: panels) {
  currentTab.value = type
  !unref(showPanel) && editorStore.setShowPanel(true)
  unref(panelPositoin) === 'bottom' && editorStore.setPanelPositoin('left')
  unref(panelType) !== panels.menu && (panelType.value = _subType)
}, 250)
</script>

<style lang="scss" scoped>
.tab-item {
  &_active {
    background-color: #e8eaec !important;
  }
}
.editor-item:hover {
  background: rgba(0, 0, 0, 0.12);
}
</style>
