<template>
  <div v-if="isOne && type === 'image'" class="attr-item-box">
    <div class="bg-item" style="margin-bottom: 10px">
      <el-dropdown style="width: 270px" @command="addClipPath">
        <el-button text>{{ $t('editor.createClip') }}</el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in options"
              :key="item.value"
              :command="item.value"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="bg-item">
      <el-button @click="removeClip" text>{{
        $t('editor.removeClip')
      }}</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/store/modules/editor'
import { useI18n } from '@/hooks/useI18n'
import useSelect from '@/hooks/select'

const editorStore = useEditorStore()
const { isOne } = useSelect()
const update = getCurrentInstance()
const { t } = useI18n()
const type = ref('')
const options = [
  {
    label: t('edotpr.polygonClip'),
    value: 'polygon'
  },
  {
    label: t('edotpr.rectClip'),
    value: 'rect'
  },
  {
    label: t('edotpr.circleClip'),
    value: 'circle'
  },
  {
    label: t('edotpr.triangleClip'),
    value: 'triangle'
  },
  {
    label: t('edotpr.polygonClipInverted'),
    value: 'polygon-inverted'
  },
  {
    label: t('edotpr.rectClipInverted'),
    value: 'rect-inverted'
  },
  {
    label: t('edotpr.circleClipInverted'),
    value: 'circle-inverted'
  },
  {
    label: t('edotpr.triangleClipInverted'),
    value: 'triangle-inverted'
  }
]
const addClipPath = async (name: string) => {
  editorStore.editor.addClipPathToImage(name)
}
const removeClip = () => {
  editorStore.editor.removeClip()
}
const init = () => {
  const activeObject = editorStore.canvas?.getActiveObjects()[0]
  if (activeObject) {
    type.value = activeObject.type as string
    update?.proxy?.$forceUpdate()
  }
}

onMounted(() => {
  editorStore.editor?.on('selectOne', init)
})

onBeforeUnmount(() => {
  editorStore.editor?.off('selectOne', init)
})
</script>
<style lang="scss" scoped>
:deep(.el-button) {
  width: 100%;
}
.attr-item-box {
  margin-top: 8px;
}
</style>
