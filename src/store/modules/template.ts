/*
 * @Author: June
 * @Description:
 * @Date: 2024-09-30 17:20:34
 * @LastEditTime: 2024-10-03 11:14:55
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\store\modules\template.ts
 */
import { defineStore } from 'pinia'
import store from '@/store'
import { fabric } from 'fabric'

interface IState {
  curTemplate: fabric.Object | null
  curTempIdx: number
}
export const useTemplateStore = defineStore({
  id: 'Template',
  state: (): IState => ({}),
  actions: {}
})

export function useTemplateStoreWithOut() {
  return useTemplateStore(store)
}
