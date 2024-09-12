/*
 * @Author: June
 * @Description:
 * @Date: 2024-09-12 10:06:32
 * @LastEditTime: 2024-09-13 01:19:01
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\store\modules\editor.ts
 */
import { defineStore } from 'pinia'
import store from '@/store'
import { fabric } from 'fabric'

interface IState {
  editor: any
  canvas: fabric.Canvas | null
  zoom: number
  rulerEnable: boolean
}

export const useEditorStore = defineStore({
  id: 'editor',
  state: (): IState => ({
    editor: null,
    canvas: null,
    zoom: 1, // 缩放比例
    rulerEnable: true // 是否开启标尺
  }),
  actions: {
    setEditor(editor: any) {
      this.editor = editor
    },
    setCanvas(ctx: fabric.Canvas) {
      this.canvas = ctx
    },
    setScale(val: number) {
      this.zoom = val
    },
    updateRulerEnable(val: boolean) {
      this.rulerEnable = val
    }
  }
})

// Need to be used outside the setup
export function useEditorStoreWithOut() {
  return useEditorStore(store)
}
