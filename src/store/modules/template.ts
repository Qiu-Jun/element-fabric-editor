/*
 * @Author: June
 * @Description:
 * @Date: 2024-09-30 17:20:34
 * @LastEditTime: 2024-10-13 00:17:31
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\store\modules\template.ts
 */
import { defineStore } from 'pinia'
import store from '@/store'
import { fabric } from 'fabric'
import type { Template } from '@/types/template'
interface IState {
  templateList: Template[] // 所有的模板
  curTempIdx: number // 当前页面索引
}
export const useTemplateStore = defineStore({
  id: 'Template',
  state: (): IState => ({
    templateList: [],
    curTempIdx: -1
  }),
  actions: {
    addTemplate(template: Template | Template[]) {
      const templates = Array.isArray(template) ? template : [template]
      const addIndex = this.curTempIdx + 1
      this.curTempIdx = addIndex
      this.templateList = this.templateList.concat(templates)
    },
    addCurTemplate(obj: fabric.Object) {
      this.templateList.push(obj)
      this.curTempIdx++
    },
    deleTemplate(idx: number) {
      const len = this.templateList.length
      if (len == 1) return ElMessage.warning('删除失败，至少要有一个模板')
      this.templateList.splice(idx, 1)
      if (len > idx) {
        const newIdx = this.curTempIdx - 1
        this.curTempIdx = newIdx <= 0 ? 0 : newIdx
      }
    }
  }
})

export function useTemplateStoreWithOut() {
  return useTemplateStore(store)
}
