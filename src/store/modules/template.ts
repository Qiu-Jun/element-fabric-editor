import { defineStore } from 'pinia'
import store from '@/store'

interface IState {}
export const useTemplateStore = defineStore({
  id: 'Template',
  state: (): IState => ({}),
  actions: {}
})

export function useTemplateStoreWithOut() {
  return useTemplateStore(store)
}
