/**
 * Vue directive for automatic translation
 */

import { fetchDynamicTranslation } from './translationUtils'

/**
 * Install translation directive
 */
export function installTranslationDirective(app) {
  app.directive('translate', {
    mounted(el, binding) {
      const key = binding.value || el.getAttribute('data-translate')
      if (!key) return

      // Add data attribute for identification
      el.setAttribute('data-translate', key)
      
      // Translate the element
      translateElement(el, key)
    },
    
    updated(el, binding) {
      const key = binding.value || el.getAttribute('data-translate')
      if (!key) return
      
      // Re-translate if key changed
      translateElement(el, key)
    }
  })
}

/**
 * Translate a single element
 */
async function translateElement(element, key) {
  try {
    // Get current locale from i18n
    const locale = getCurrentLocale()
    
    // Fetch translation
    const translation = await fetchDynamicTranslation(key, locale)
    
    if (translation && translation !== key) {
      element.textContent = translation
      element.setAttribute('data-translation-processed', 'true')
      console.debug(`[Directive] Translated element with key '${key}': ${translation}`)
    } else {
      element.setAttribute('data-translation-failed', 'true')
      console.warn(`[Directive] Failed to translate key '${key}'`)
    }
  } catch (error) {
    element.setAttribute('data-translation-failed', 'true')
    console.error(`[Directive] Error translating element with key '${key}':`, error)
  }
}

/**
 * Get current locale
 */
function getCurrentLocale() {
  try {
    // Try to get from localStorage
    const saved = localStorage.getItem('preferred-locale')
    if (saved && ['en', 'vi'].includes(saved)) {
      return saved
    }
    
    // Try browser language
    if (typeof navigator !== 'undefined' && navigator.language) {
      const browserLang = navigator.language.split('-')[0]
      if (['en', 'vi'].includes(browserLang)) {
        return browserLang
      }
    }
    
    return 'en' // Default fallback
  } catch (error) {
    console.warn('[Directive] Error getting locale, using default: en', error)
    return 'en'
  }
}
