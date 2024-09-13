/*
 * @Author: June
 * @Description:
 * @Date: 2024-08-07 15:41:56
 * @LastEditTime: 2024-09-12 20:22:26
 * @LastEditors: June
 * @FilePath: \element-fabric-editor\src\locales\index.ts
 */
import { createI18n } from 'vue-i18n'
import { localeMap } from './config'
import { setHtmlPageLang, setLoadLocalePool } from './helper'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import type { App } from 'vue'

async function createI18nOptions() {
  const localeStore = useLocaleStoreWithOut()
  const locale = localeStore.getLocale
  const defaultLocal = await import(`./langs/${locale}.ts`)
  const message = defaultLocal.default?.message ?? {}

  setHtmlPageLang(locale)
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale)
  })

  return {
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
}

const options = await createI18nOptions()

export const i18n = createI18n(options)

// setup i18n instance with global
export function setupI18n(app: App) {
  app.use(i18n)
}
