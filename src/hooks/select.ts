/*
 * @Author: June
 * @Description:
 * @Date: 2024-07-25 14:39:41
 * @LastEditTime: 2024-09-13 00:44:59
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\hooks\select.ts
 */
import Editor from '@/lib/core'
import { useI18n } from '@/hooks/useI18n'
import { Selector } from './useSelectListen'
import { useEditorStoreWithOut } from '@/store/modules/editor'

// interface Selector {
//   mSelectMode: (typeof SelectMode)[keyof typeof SelectMode];
//   mSelectOneType: string | undefined;
//   mSelectId: string | undefined;
//   mSelectIds: (string | undefined)[];
//   mSelectActive: unknown[];
// }

export default function useSelect() {
  const editorStore = useEditorStoreWithOut()
  const { t } = useI18n()
  const mixinState = inject('mixinState') as Selector

  return {
    canvasEditor: editorStore.editor as Editor,
    mixinState,
    t
  }
}
