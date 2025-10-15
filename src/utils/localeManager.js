/**
 * Locale management utility for handling different locale switching methods
 */

import { ref, watch } from 'vue'

export const SUPPORTED_LOCALES = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳' }
]

export class LocaleManager {
  constructor() {
    this.currentLocale = ref('vi')
    this.isInitialized = false
  }

  /**
   * Initialize locale manager
   */
  initialize() {
    if (this.isInitialized) return

    console.log('[LocaleManager] Starting initialization...')

    // Get initial locale
    const initialLocale = this.getInitialLocale()
    console.log(`[LocaleManager] Initial locale: ${initialLocale}`)

    // Set initial locale
    this.setLocale(initialLocale)
    this.isInitialized = true

    console.log('[LocaleManager] Initialization complete')
  }

  /**
   * Get initial locale from various sources
   */
  getInitialLocale() {
    try {
      // Try localStorage first
      const saved = localStorage.getItem('preferred-locale')
      if (saved && this.isLocaleSupported(saved)) {
        console.log(`[LocaleManager] Using saved locale: ${saved}`)
        return saved
      }

      // Try browser language
      if (typeof navigator !== 'undefined' && navigator.language) {
        const browserLang = navigator.language.split('-')[0]
        console.log(`[LocaleManager] Browser language: ${navigator.language} (base: ${browserLang})`)

        if (this.isLocaleSupported(browserLang)) {
          console.log(`[LocaleManager] Using browser language: ${browserLang}`)
          return browserLang
        }

        // Check navigator.languages for fallback
        if (navigator.languages && navigator.languages.length > 0) {
          for (const lang of navigator.languages) {
            const langCode = lang.split('-')[0]
            if (this.isLocaleSupported(langCode)) {
              console.log(`[LocaleManager] Using fallback browser language: ${langCode}`)
              return langCode
            }
          }
        }
      }

      console.log(`[LocaleManager] No valid locale found, using default: en`)
      return 'en'
    } catch (error) {
      console.warn(`[LocaleManager] Error detecting locale, using default: en`, error)
      return 'en'
    }
  }

  /**
   * Check if locale is supported
   */
  isLocaleSupported(locale) {
    return SUPPORTED_LOCALES.some(l => l.code === locale)
  }

  /**
   * Set locale
   */
  setLocale(locale, i18nInstance = null) {
    if (!this.isLocaleSupported(locale)) {
      console.warn(`[LocaleManager] Unsupported locale: ${locale}`)
      return false
    }

    try {
      // Update current locale
      this.currentLocale.value = locale

      // Save to localStorage
      localStorage.setItem('preferred-locale', locale)

      // Update Vue i18n locale if instance is provided
      if (i18nInstance && i18nInstance.global) {
        i18nInstance.global.locale.value = locale
      }

      console.log(`[LocaleManager] Locale set to: ${locale}`)
      return true
    } catch (error) {
      console.error(`[LocaleManager] Error setting locale: ${locale}`, error)
      return false
    }
  }

  /**
   * Get current locale
   */
  getCurrentLocale() {
    return this.currentLocale.value
  }

  /**
   * Get supported locales
   */
  getSupportedLocales() {
    return SUPPORTED_LOCALES
  }

  /**
   * Switch to next locale
   */
  switchToNextLocale(i18nInstance = null) {
    const currentIndex = SUPPORTED_LOCALES.findIndex(l => l.code === this.currentLocale.value)
    const nextIndex = (currentIndex + 1) % SUPPORTED_LOCALES.length
    const nextLocale = SUPPORTED_LOCALES[nextIndex].code

    console.log(`[LocaleManager] Switching from ${this.currentLocale.value} to ${nextLocale}`)
    return this.setLocale(nextLocale, i18nInstance)
  }

  /**
   * Get locale info by code
   */
  getLocaleInfo(code) {
    return SUPPORTED_LOCALES.find(l => l.code === code)
  }
}

// Create singleton instance
export const localeManager = new LocaleManager()

// Export for use in components
export function useLocaleManager() {
  return localeManager
}
