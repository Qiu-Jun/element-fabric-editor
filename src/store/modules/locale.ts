/*
 * @Author: June
 * @Description:
 * @Date: 2024-09-12 20:17:00
 * @LastEditTime: 2024-09-12 20:17:12
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\store\modules\locale.ts
 */
import { defineStore } from 'pinia'
import store from '@/store'
import { LOCALE_KEY } from '@/enums/cacheEnum'
import { setLocal, getLocal } from '@/utils/local'
import type { LocaleType } from '@/locales/config'

interface LocaleState {
  locale: LocaleType
}

export const useLocaleStore = defineStore({
  id: 'locale',
  state: (): LocaleState => ({
    locale: getLocal(LOCALE_KEY, 'zh_CN')
  }),
  getters: {
    getLocale(): LocaleType {
      return this.locale ?? 'zh_CN'
    }
  },
  actions: {
    setLocale(locale: LocaleType) {
      this.locale = locale
      setLocal(LOCALE_KEY, locale)
    }
  }
})

// Need to be used outside the setup
export function useLocaleStoreWithOut() {
  return useLocaleStore(store)
}
