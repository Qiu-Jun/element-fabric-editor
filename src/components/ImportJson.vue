<template>
  <div class="f-center">
    <el-dropdown @command="clickHandler">
      <el-button link type="primary">
        {{ $t('editor.importFiles.file') }}
        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="createDesign">
            {{ $t('editor.importFiles.createDesign.title') }}
          </el-dropdown-item>
          <el-dropdown-item command="importFiles">{{
            $t('editor.importFiles.importFiles')
          }}</el-dropdown-item>
          <el-dropdown-item command="psd">PSD</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <!-- 创建设计 -->
    <ModalSize
      :title="$t('editor.importFiles.createDesign.title')"
      ref="modalSizeRef"
      @set="customSizeCreate"
    ></ModalSize>
  </div>
</template>

<script name="ImportJson" setup>
import { ArrowDown } from '@element-plus/icons-vue'
import useMaterial from '@/hooks/useMaterial'
import { ElMessage } from 'element-plus'
import ModalSize from './ModalSize.vue'
import { useI18n } from 'vue-i18n'
import { useEditorStore } from '@/store/modules/editor'

const editorStore = useEditorStore()

const { createTmpl, routerToId } = useMaterial()
const modalSizeRef = ref(null)

const handleMap = {
  // 导入文件
  importFiles: editorStore.editor?.insert(),
  // 创建文件
  createDesign: () => modalSizeRef.value?.showSetSize(),
  // psd
  psd: async () => {
    //   const loadingInstance = ElLoading.service({
    //       fullscreen: true,
    //       text: t('alert.loading_data')
    //   })

    await editorStore.editor.insertPSD()
  }
}

const clickHandler = (type) => {
  handleMap[type]?.()
}

const customSizeCreate = async (w, h) => {
  const res = await createTmpl(w, h)
  routerToId(res.data.data.id)
  ElMessage.success('创建成功')
}
</script>
