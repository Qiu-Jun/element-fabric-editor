/*
 * @Author: June
 * @Description:
<<<<<<< HEAD
 * @Date: 2024-08-07 15:41:56
 * @LastEditTime: 2024-11-10 11:36:46
=======
 * @Date: 2024-08-07 1ptions)5:41:56
 * @LastEditTime: 2024-11-10 11:18:11
>>>>>>> e8c1c4a (fix: 🐛 修复部分问题)
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\locales\index.ts
 */
import { createI18n } from 'vue-i18n'
import { localeMap } from './config'
import { setHtmlPageLang, setLoadLocalePool } from './helper'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import type { App } from 'vue'

let options: any = null
export let i18n: any = null

// setup i18n instance with global
export async function setupI18n(app: App) {
  const _i18n = await createI18nOptions()
  i18n = _i18n
  app.use(_i18n)
}

async function createI18nOptions() {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale
  const defaultLocal = await import(`./langs/${locale}.ts`)
  const message = defaultLocal.default?.message ?? {}

  setHtmlPageLang(locale)
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale)
  })
  options = {
    locale,
    // legacy: false,
    fallbackLocale: localeMap.zh_CN, // set fallback locale
    messages: {
      [locale]: message as { [key: string]: string }
    },
    globalInjection: true,
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true
  }
  return await createI18n(options)
}
