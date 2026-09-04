<!--
 * @Author: June
 * @Description: Description
 * @Date: 2024-11-17 10:30:49
 * @LastEditTime: 2024-11-28 16:19:18
 * @LastEditors: June
-->
<template>
  <div v-if="isOne && type === 'image'" class="attr-item-box mt-8px">
    <div class="bg-item">
      <el-button class="w-full" @click="cropper" text>
        {{ $t('editor.imageSetting.crop.title') }}
      </el-button>
    </div>
  </div>
  <CropModal ref="cropperDialogRef"></CropModal>
</template>

<script setup name="CropperImg">
import useSelect from '@/hooks/select'
import { useEditorStore } from '@/store/modules/editor'

const editorStore = useEditorStore()
import CropModal from './CropModal.vue'
import { Utils } from '@/lib/core'
const { insertImgFile } = Utils

const update = getCurrentInstance()
const { isOne } = useSelect()
const type = ref('')
const cropperDialogRef = ref()
const cropper = () => {
  const activeObject = editorStore.canvas.getActiveObjects()[0]
  if (activeObject && activeObject.type === 'image') {
    cropperDialogRef.value.open(
      { img: activeObject._element.src },
      async (data) => {
        const imgEl = await insertImgFile(data)
        // const width = activeObject.get('width');
        // const height = activeObject.get('height');
        // const scaleX = activeObject.get('scaleX');
        // const scaleY = activeObject.get('scaleY');
        activeObject.setSrc(imgEl.src, () => {
          // activeObject.set('scaleX', scaleX);
          // activeObject.set('scaleY', scaleY);
          editorStore.canvas.renderAll()
        })
        imgEl.remove()
      }
    )
  }
}

// 替换图片
// const repleace = async () => {
//   const activeObject = canvasEditor.canvas.getActiveObjects()[0];
//   if (activeObject && activeObject.type === 'image') {
//     // 图片
//     const [file] = await selectFiles({ accept: 'image/*', multiple: false });
//     // 转字符串
//     const fileStr = await getImgStr(file);
//     // 字符串转El
//     const imgEl = await insertImgFile(fileStr);
//     const width = activeObject.get('width');
//     const height = activeObject.get('height');
//     const scaleX = activeObject.get('scaleX');
//     const scaleY = activeObject.get('scaleY');
//     activeObject.setSrc(imgEl.src, () => {
//       activeObject.set('scaleX', (width * scaleX) / imgEl.width);
//       activeObject.set('scaleY', (height * scaleY) / imgEl.height);
//       canvasEditor.canvas.renderAll();
//     });
//     imgEl.remove();
//   }
// };

const init = () => {
  const activeObject = editorStore.canvas.getActiveObjects()[0]

  if (activeObject) {
    type.value = activeObject.type
    update?.proxy?.$forceUpdate()
  }
}

onMounted(() => {
  nextTick(() => {
    editorStore.editor?.on('selectOne', init)
  })
})

onBeforeUnmount(() => {
  editorStore.editor.off('selectOne', init)
})
</script>
