<template>
  <div class="editor-wrap">
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <EditorHeader />
      </el-header>
      <el-main>
        <EditorContent />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { fabric } from 'fabric'
// hooks
import { apiHost } from '@/constants/app'

import Editor, {
  DringPlugin,
  AlignGuidLinePlugin,
  ControlsPlugin,
  // ControlsRotatePlugin,
  CenterAlignPlugin,
  LayerPlugin,
  CopyPlugin,
  MoveHotKeyPlugin,
  DeleteHotKeyPlugin,
  GroupPlugin,
  DrawLinePlugin,
  GroupTextEditorPlugin,
  GroupAlignPlugin,
  WorkspacePlugin,
  HistoryPlugin,
  FlipPlugin,
  RulerPlugin,
  MaterialPlugin,
  FontPlugin,
  PolygonModifyPlugin,
  DrawPolygonPlugin,
  FreeDrawPlugin,
  PathTextPlugin,
  PsdPlugin,
  SimpleClipImagePlugin,
  BarCodePlugin,
  QrCodePlugin,
  ImageStroke,
  ResizePlugin,
  LockPlugin,
  AddBaseTypePlugin
} from '@/lib/core'
import EditorHeader from './components/EditorHeader/index.vue'
import EditorContent from './components/EditorContent/index.vue'
import { useEditorStore } from '@/store/modules/editor'
import { useTemplate } from '@/hooks/useTemplate'
import { useTemplateStore } from '@/store/modules/template'

defineOptions({
  name: 'Home'
})

const templateStore = useTemplateStore()
const editorStore = useEditorStore()
const APIHOST = apiHost
// 创建编辑器
const canvasEditor = new Editor()

onMounted(() => {
  // 初始化fabric
  const canvas = new fabric.Canvas('canvas', {
    fireRightClick: true, // 启用右键，button的数字为3
    stopContextMenu: true, // 禁止默认右键菜单
    controlsAboveOverlay: true, // 超出clipPath后仍然展示控制条
    // imageSmoothingEnabled: false, // 解决文字导出后不清晰问题
    preserveObjectStacking: true // 当选择画布中的对象时，让对象不在顶层。
  })

  // 初始化编辑器
  canvasEditor.init(canvas)
  canvasEditor
    .use(DringPlugin)
    .use(PolygonModifyPlugin)
    .use(AlignGuidLinePlugin)
    .use(ControlsPlugin)
    // .use(ControlsRotatePlugin);
    .use(CenterAlignPlugin)
    .use(LayerPlugin)
    .use(CopyPlugin)
    .use(MoveHotKeyPlugin)
    .use(DeleteHotKeyPlugin)
    .use(GroupPlugin)
    .use(DrawLinePlugin)
    .use(GroupTextEditorPlugin)
    .use(GroupAlignPlugin)
    .use(WorkspacePlugin)
    .use(HistoryPlugin)
    .use(FlipPlugin)
    .use(RulerPlugin)
    .use(DrawPolygonPlugin)
    .use(FreeDrawPlugin)
    .use(PathTextPlugin)
    .use(SimpleClipImagePlugin)
    .use(BarCodePlugin)
    .use(QrCodePlugin)
    .use(FontPlugin, {
      repoSrc: APIHOST
    })
    .use(MaterialPlugin, {
      repoSrc: APIHOST
    })
    .use(PsdPlugin)
    .use(ImageStroke)
    .use(ResizePlugin)
    .use(LockPlugin)
    .use(AddBaseTypePlugin)

  editorStore.setEditor(canvasEditor)
  editorStore.setCanvas(canvas)
  // 默认打开标尺
  if (editorStore.rulerEnable) {
    canvasEditor.rulerEnable()
  }

  // 有ID时，打开作品面板
  const route = useRoute()
  if (route?.query?.id) {
    // menuActive.value = 'MyMaterial'
  }

  const { createTemplate } = useTemplate()
  templateStore.addTemplate(createTemplate())
})

onUnmounted(() => canvasEditor.destory())
</script>

<style lang="scss" scoped>
.editor-wrap {
  :deep(.el-header) {
    --height: 45px;
    padding: 0 10px;
    border-bottom: 1px solid #eef2f8;
    background: #fff;
    height: var(--height);
    line-height: var(--height);
    display: flex;
    justify-content: space-between;
  }

  :deep(.el-main) {
    display: flex;
    height: calc(100vh - 45px);
    padding: 0;
    overflow: hidden;
  }
}
</style>
