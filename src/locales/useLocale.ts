/*
 * @Author: June
 * @Description:
 * @Date: 2024-08-07 15:41:56
 * @LastEditTime: 2024-08-30 20:12:17
 * @LastEditors: June
 * @FilePath: \ai-desing\src\locales\useLocale.ts
 */
/**
 * Multi-language related operations
 */
import { unref, computed } from 'vue'
import { loadLocalePool, setHtmlPageLang } from './helper'
import { i18n } from './index'
import { useLocaleStoreWithOut } from '@/store/modules/locale'
import type { LocaleType } from './config'

interface LangModule {
  message: Recordable
  dateLocale: Recordable
  dateLocaleName: string
}

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStoreWithOut()

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    ;(i18n.global.locale as any).value = locale
  }
  localeStore.setLocale(locale)
  setHtmlPageLang(locale)
}

export function useLocale() {
  const localeStore = useLocaleStoreWithOut()
  const getLocale = computed(() => localeStore.getLocale)

  const getAntdLocale = computed<any>((): any => {
    return i18n.global.getLocaleMessage(unref(getLocale)).antdLocale
  })

  // Switching the language will change the locale of useI18n
  // And submit to configuration modification
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global
    const currentLocale = unref(globalI18n.locale)
    if (currentLocale === locale) {
      return locale
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale)
      return locale
    }

    const langModule = ((await import(`./langs/${locale}.ts`)) as any)
      .default as LangModule
    if (!langModule) return

    const { message } = langModule

    globalI18n.setLocaleMessage(locale, message)
    loadLocalePool.push(locale)

    setI18nLanguage(locale)
    return locale
  }

  return {
    getLocale,
    changeLocale,
    getAntdLocale
  }
}