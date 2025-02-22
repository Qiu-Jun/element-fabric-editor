<template>
  <div class="box-border p-10px">
    <!-- 搜索组件 -->
    <SearchType
      ref="selectTypeRef"
      :typeListApi="getFontStyleTypes"
      @change="searchChange"
    />

    <!-- 分类列表 -->
    <TypeList
      v-show="!filters?.font_style_type.$contains && !filters?.name.$contains"
      :typeApi="getFontStyleTypes"
      :typeListApi="getFontStyleListByType"
      typeKey="font_style_type"
      :formatData="formatData"
      @selectType="selectType"
      @click="addItem"
      @dragend="dragItem"
    />

    <!-- 搜索分页列表 -->
    <PageList
      v-if="filters?.font_style_type.$contains || filters?.name.$contains"
      DOMId="fontMaterialList"
      :pageListApi="getFontStyles"
      :filters="filters"
      :formatData="formatData"
      @click="addItem"
      @dragend="dragItem"
    />
  </div>
</template>

<script setup name="ImportSvg">
import SearchType from '@/components/common/SearchType.vue'
import TypeList from '@/components/common/TypeList.vue'
import PageList from '@/components/common/PageList.vue'
import useCalculate from '@/hooks/useCalculate'
import { getMaterialInfoUrl, getMaterialPreviewUrl } from '@/hooks/usePageList'
import {
  getFontStyleTypes,
  getFontStyleListByType,
  getFontStyles
} from '@/api/material'
import { fabric } from 'fabric'
import { v4 as uuid } from 'uuid'
import { ElLoading } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useEditorStore } from '@/store/modules/editor'

const editorStore = useEditorStore()
const { t } = useI18n()

const { isOutsideCanvas } = useCalculate()

// 按照类型渲染
const dragItem = async ({ e, info: item }) => {
  if (isOutsideCanvas(e.clientX, e.clientY)) return
  const loadingInstance = ElLoading.service({
    text: t('alert.loading_data')
  })
  await editorStore.editor.downFontByJSON(JSON.stringify(item.json))
  const el = JSON.parse(JSON.stringify(item.json))
  const elType = capitalizeFirstLetter(el.type)
  new fabric[elType].fromObject(el, (fabricEl) => {
    editorStore.editor.addBaseType(fabricEl, { event: e })
    loadingInstance.close()
  })
}

const addItem = async ({ info: item }) => {
  const loadingInstance = ElLoading.service({
    text: t('alert.loading_data')
  })
  await editorStore.editor.downFontByJSON(JSON.stringify(item.json))
  const el = JSON.parse(JSON.stringify(item.json))
  el.id = uuid()
  const elType = capitalizeFirstLetter(el.type)
  new fabric[elType].fromObject(el, (fabricEl) => {
    editorStore.editor.addBaseType(fabricEl)
    loadingInstance.close()
  })
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const selectTypeRef = ref()

const filters = reactive({
  font_style_type: {
    $contains: ''
  },
  name: {
    $contains: ''
  }
})

// 分页格式化
const formatData = (data) => {
  return data.map((item) => {
    return {
      id: item.id,
      name: item.attributes.name,
      desc: item.attributes.desc,
      json: item.attributes.json,
      src: getMaterialInfoUrl(item.attributes.img),
      previewSrc: getMaterialPreviewUrl(item.attributes.img)
    }
  })
}

// 搜索改变
const searchChange = async ({ searchKeyWord, typeValue }) => {
  filters.name.$contains = ''
  filters.font_style_type.$contains = ''
  await nextTick()
  filters.name.$contains = searchKeyWord
  filters.font_style_type.$contains = typeValue
}

// 分类列表选择
const selectType = async (type) => {
  filters.font_style_type.$contains = type
  selectTypeRef.value.setType(type)
  await nextTick()
}
</script>
