<template>
  <teleport :to="props?.getContainer || 'body'">
    <el-dialog
      v-bind="omit(props, ['open', 'onCancel', 'onOk', 'onUpdate:open'])"
      v-model="openModel"
    >
      <slot> 222 </slot>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </teleport>
</template>

<script lang="ts" name="Modal" setup>
import { omit, debounce } from 'lodash-es'
const emits = defineEmits(['update:open', 'update:fullscreen', 'ok', 'cancel'])
const attr = useAttrs()

const props = defineProps({})
const openModel = defineModel<boolean>('open')

const handleCancel = debounce(function () {
  emits('cancel', false)
}, 250)
const handleConfirm = debounce(function () {
  console.log('ok')
}, 250)
console.log(openModel)
</script>
