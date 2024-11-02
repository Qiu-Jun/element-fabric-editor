/*
 * @Author: June
 * @Description:
 * @Date: 2024-08-07 15:41:56
 * @LastEditTime: 2024-11-02 22:24:06
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
  !i18n && (await createI18nOptions)
  app.use(i18n)
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
  i18n = await createI18n(options)
}

createI18nOptions()
