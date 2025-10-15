// Translation utilities for dynamic content translation
import { ref, onMounted } from 'vue'
import { enterpriseI18n } from '@/i18n/enterprise/i18n'

// Cache for translations to avoid repeated requests
const translationCache = new Map()

// Logger utility
const logger = {
  debug: (message, ...args) => {
    if (import.meta.env.DEV) {
      console.log(`[TranslationUtils] ${message}`, ...args)
    }
  },
  warn: (message, ...args) => {
    console.warn(`[TranslationUtils] ${message}`, ...args)
  },
  error: (message, ...args) => {
    console.error(`[TranslationUtils] ${message}`, ...args)
  }
}

/**
 * Get nested translation from object using dot notation
 * @param {Object} obj - Translation object
 * @param {string} key - Dot notation key (e.g., 'auth.login.title')
 * @returns {string|null} Translation value or null
 */
function getNestedTranslation(obj, key) {
  if (!obj || !key) return null
  
  const keys = key.split('.')
  let result = obj
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k]
    } else {
      return null
    }
  }
  
  return typeof result === 'string' ? result : null
}

/**
 * Fetch dynamic translation for a key using lazy loader
 * @param {string} key - Translation key
 * @param {string} locale - Locale (en, vi)
 * @returns {Promise<string>} Translation or key as fallback
 */
export async function fetchDynamicTranslation(key, locale = 'en') {
  const cacheKey = `${locale}:${key}`
  
  // Check cache first
  if (translationCache.has(cacheKey)) {
    logger.debug(`fetchDynamicTranslation: Using cached translation for key '${key}'`)
    return translationCache.get(cacheKey)
  }
  
  logger.debug(`fetchDynamicTranslation: Fetching translation for key '${key}' in locale '${locale}'`)
  
  try {
    // Load translations using lazy loader
    const translations = await enterpriseI18n.loadingStrategy.load(locale)
    
    if (translations) {
      const translation = getNestedTranslation(translations, key)

      if (translation && translation !== key) {
        // Cache the result
        translationCache.set(cacheKey, translation)
        logger.debug(`fetchDynamicTranslation: Found translation '${translation}' for key '${key}'`)
        return translation
      }
    }

    // Fallback to key itself
    logger.debug(`fetchDynamicTranslation: No translation found, returning key '${key}'`)
    return key
  } catch (error) {
    logger.error(`fetchDynamicTranslation: Error fetching translation for key '${key}':`, error)
    return key
  }
}

/**
 * Translate elements with data-translate attribute
 * @param {string} locale - Locale to translate to
 */
export async function triggerTranslationForElements(locale = 'en') {
  const elements = document.querySelectorAll('[data-translate]')
  
  if (elements.length === 0) {
    logger.debug('triggerTranslationForElements: No elements with data-translate found')
    return
  }
  
  logger.debug(`triggerTranslationForElements: Found ${elements.length} elements to translate`)
  
  const translationPromises = Array.from(elements).map(async (element) => {
    const key = element.getAttribute('data-translate')
    if (!key) return
    
    try {
      const translation = await fetchDynamicTranslation(key, locale)
      if (translation && translation !== key) {
        element.textContent = translation
        logger.debug(`triggerTranslationForElements: Translated '${key}' to '${translation}'`)
      }
    } catch (error) {
      logger.error(`triggerTranslationForElements: Failed to translate '${key}':`, error)
    }
  })
  
  await Promise.all(translationPromises)
  logger.debug('triggerTranslationForElements: Completed translation of all elements')
}

/**
 * Vue composable for dynamic translation
 * @param {string} locale - Locale to translate to
 * @returns {Object} Translation utilities
 */
export function useDynamicTranslation(locale = 'en') {
  const isLoading = ref(false)
  const error = ref(null)
  
  const translate = async (key) => {
    isLoading.value = true
    error.value = null
    
    try {
      const result = await fetchDynamicTranslation(key, locale)
      return result
    } catch (err) {
      error.value = err
      logger.error(`useDynamicTranslation: Error translating '${key}':`, err)
      return key
    } finally {
      isLoading.value = false
    }
  }
  
  const translateElements = async () => {
    isLoading.value = true
    error.value = null
    
    try {
      await triggerTranslationForElements(locale)
    } catch (err) {
      error.value = err
      logger.error('useDynamicTranslation: Error translating elements:', err)
    } finally {
      isLoading.value = false
    }
  }
  
  return {
    translate,
    translateElements,
    isLoading,
    error
  }
}

/**
 * Auto-translate elements when they are added to DOM
 * @param {string} locale - Locale to translate to
 */
export function setupAutoTranslation(locale = 'en') {
  const observer = new MutationObserver(async (mutations) => {
    const newElements = []
    
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Check if the node itself has data-translate
          if (node.hasAttribute && node.hasAttribute('data-translate')) {
            newElements.push(node)
          }
          
          // Check for child elements with data-translate
          const childElements = node.querySelectorAll && node.querySelectorAll('[data-translate]')
          if (childElements) {
            newElements.push(...Array.from(childElements))
          }
        }
      })
    })
    
    if (newElements.length > 0) {
      logger.debug(`setupAutoTranslation: Found ${newElements.length} new elements to translate`)
      
      const translationPromises = newElements.map(async (element) => {
        const key = element.getAttribute('data-translate')
        if (!key) return
        
        try {
          const translation = await fetchDynamicTranslation(key, locale)
          if (translation && translation !== key) {
            element.textContent = translation
            logger.debug(`setupAutoTranslation: Translated '${key}' to '${translation}'`)
          }
        } catch (error) {
          logger.error(`setupAutoTranslation: Failed to translate '${key}':`, error)
        }
      })
      
      await Promise.all(translationPromises)
    }
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  logger.debug('setupAutoTranslation: Auto-translation observer started')
  
  return () => {
    observer.disconnect()
    logger.debug('setupAutoTranslation: Auto-translation observer stopped')
  }
}

/**
 * Clear translation cache
 * @param {string} locale - Specific locale to clear, or 'all' to clear all
 */
export function clearTranslationCache(locale = 'all') {
  if (locale === 'all') {
    translationCache.clear()
    logger.debug('clearTranslationCache: Cleared all translation cache')
  } else {
    const keysToDelete = Array.from(translationCache.keys()).filter(key => key.startsWith(`${locale}:`))
    keysToDelete.forEach(key => translationCache.delete(key))
    logger.debug(`clearTranslationCache: Cleared cache for locale '${locale}' (${keysToDelete.length} entries)`)
  }
}

/**
 * Initialize translation scanner (legacy function for compatibility)
 * @param {string} locale - Locale to scan for
 */
export function initializeTranslationScanner(locale = 'en') {
  logger.debug(`initializeTranslationScanner: Initializing for locale '${locale}'`)
  // This function is kept for compatibility but functionality moved to setupAutoTranslation
  return setupAutoTranslation(locale)
}

/**
 * Auto translate document (legacy function for compatibility)
 * @param {string} locale - Locale to translate to
 */
export async function autoTranslateDocument(locale = 'en') {
  logger.debug(`autoTranslateDocument: Auto-translating document for locale '${locale}'`)
  await triggerTranslationForElements(locale)
}