/**
 * Enterprise I18n Store - Pinia Integration
 * 
 * Pinia store integration for the enterprise i18n system
 * with reactive state management and comprehensive actions.
 */

import { defineStore } from 'pinia'
import type { Locale, TranslationKey, I18nObserver } from '@/i18n/enterprise/types'

import { enterpriseI18n } from '@/i18n/enterprise/i18n'
import { getSupportedLocales, getLocaleInfo } from '@/i18n/enterprise/config'

import { I18nStateManager } from '@/i18n/enterprise/state'

// ============================================================================
// STORE DEFINITION
// ============================================================================

export const useEnterpriseI18nStore = defineStore('enterpriseI18n', {
  state: () => ({
    // State is managed by I18nStateManager
    // This store provides reactive access to the state
  }),

  getters: {
    // Current locale
    currentLocale: (): Locale => enterpriseI18n.currentLocale,
    
    // Loading state
    isLoading: (): boolean => enterpriseI18n.isLoading,
    
    // Loaded locales
    loadedLocales: (): Locale[] => Array.from(enterpriseI18n.loadedLocales),
    
    // Supported locales
    supportedLocales: () => getSupportedLocales(),
    
    // Current locale info
    currentLocaleInfo: () => getLocaleInfo(enterpriseI18n.currentLocale),
    
    // Check if locale is supported
    isLocaleSupported: () => (locale: Locale): boolean => 
      enterpriseI18n.supportedLocales.some(l => l.code === locale),
    
    // Check if locale is loaded
    isLocaleLoaded: () => (locale: Locale): boolean => 
      enterpriseI18n.loadedLocales.includes(locale),
    
    // Performance metrics
    metrics: () => enterpriseI18n.getMetrics(),
    
    // Error statistics
    errorStats: () => enterpriseI18n.getErrorStats(),
    
    // Cache statistics
    cacheStats: () => enterpriseI18n.getMetrics(),
    
    // Loading state details
    loadingState: () => enterpriseI18n.isLoading,
    
    // Available locales for UI
    availableLocales: () => getSupportedLocales().map(locale => ({
      code: locale.code,
      name: locale.name,
      nativeName: locale.nativeName,
      flag: locale.flag,
      direction: locale.direction
    }))
  },

  actions: {
    // ============================================================================
    // LOCALE MANAGEMENT
    // ============================================================================

    /**
     * Set the current locale
     */
    async setLocale(locale: Locale): Promise<boolean> {
      try {
        console.log(`[I18nStore] Setting locale to: ${locale}`)

        // Validate locale
        if (!this.isLocaleSupported(locale)) {
          throw new Error(`Unsupported locale: ${locale}`)
        }

        // Set locale using enterprise i18n
        const success = await enterpriseI18n.setLocale(locale)
        
        if (success) {
          console.log(`[I18nStore] ✅ Locale set successfully: ${locale}`)
        } else {
          console.warn(`[I18nStore] ⚠️ Failed to set locale: ${locale}`)
        }

        return success

      } catch (error) {
        console.error(`[I18nStore] Error setting locale: ${locale}`, error)
        throw error
      }
    },

    /**
     * Switch locale with loading indicator
     */
    async switchLocale(locale: Locale): Promise<boolean> {
      try {
        if (locale === this.currentLocale) {
          return true // Already current locale
        }

        console.log(`[I18nStore] Switching locale from ${this.currentLocale} to ${locale}`)
        
        return await this.setLocale(locale)

      } catch (error) {
        console.error(`[I18nStore] Error switching locale: ${locale}`, error)
        return false
      }
    },

    /**
     * Get translation for a key
     */
    getTranslation(key: TranslationKey, locale?: Locale): string {
      try {
        return enterpriseI18n.getTranslation(key, locale)
      } catch (error) {
        console.warn(`[I18nStore] Error getting translation for key '${key}':`, error)
        return key // Return key as fallback
      }
    },

    // ============================================================================
    // PRELOADING
    // ============================================================================

    /**
     * Preload a specific locale
     */
    async preloadLocale(locale: Locale): Promise<void> {
      try {
        console.log(`[I18nStore] Preloading locale: ${locale}`)
        await enterpriseI18n.preloadLocale(locale)
        console.log(`[I18nStore] ✅ Locale preloaded: ${locale}`)
      } catch (error) {
        console.error(`[I18nStore] Error preloading locale '${locale}':`, error)
      }
    },

    /**
     * Preload multiple locales
     */
    async preloadLocales(locales: Locale[]): Promise<void> {
      try {
        console.log(`[I18nStore] Preloading locales:`, locales)
        await enterpriseI18n.preloadLocales(locales)
        console.log(`[I18nStore] ✅ Locales preloaded:`, locales)
      } catch (error) {
        console.error(`[I18nStore] Error preloading locales:`, error)
      }
    },

    /**
     * Preload common locales
     */
    async preloadCommonLocales(): Promise<void> {
      try {
        const commonLocales = ['en', 'vi'] // Common locales
        await this.preloadLocales(commonLocales)
      } catch (error) {
        console.error(`[I18nStore] Error preloading common locales:`, error)
      }
    },

    // ============================================================================
    // CACHE MANAGEMENT
    // ============================================================================

    /**
     * Clear all caches
     */
    clearCache(): void {
      try {
        enterpriseI18n.clearCache()
        console.log('[I18nStore] ✅ Cache cleared')
      } catch (error) {
        console.error('[I18nStore] Error clearing cache:', error)
      }
    },

    /**
     * Get cache statistics
     */
    getCacheStats() {
      return enterpriseI18n.getMetrics()
    },

    // ============================================================================
    // METRICS & MONITORING
    // ============================================================================

    /**
     * Get performance metrics
     */
    getMetrics() {
      return enterpriseI18n.getMetrics()
    },

    /**
     * Get error statistics
     */
    getErrorStats() {
      return enterpriseI18n.getErrorStats()
    },

    /**
     * Get comprehensive statistics
     */
    getStatistics() {
      return {
        metrics: this.getMetrics(),
        errorStats: this.getErrorStats(),
        cacheStats: this.getCacheStats(),
        currentLocale: this.currentLocale,
        loadedLocales: this.loadedLocales,
        isLoading: this.isLoading
      }
    },

    // ============================================================================
    // OBSERVER MANAGEMENT
    // ============================================================================

    /**
     * Add observer for i18n events
     */
    addObserver(observer: I18nObserver): void {
      enterpriseI18n.addObserver(observer)
    },

    /**
     * Remove observer
     */
    removeObserver(observer: I18nObserver): void {
      enterpriseI18n.removeObserver(observer)
    },

    // ============================================================================
    // UTILITY METHODS
    // ============================================================================

    /**
     * Check if locale is currently loading
     */
    isLocaleLoading(locale: Locale): boolean {
      return enterpriseI18n.isLoading && this.loadedLocales.includes(locale)
    },

    /**
     * Get locale display name
     */
    getLocaleDisplayName(locale: Locale): string {
      const localeInfo = getLocaleInfo(locale)
      return localeInfo ? localeInfo.nativeName : locale
    },

    /**
     * Get locale flag
     */
    getLocaleFlag(locale: Locale): string {
      const localeInfo = getLocaleInfo(locale)
      return localeInfo ? localeInfo.flag : '🌐'
    },

    /**
     * Get locale direction
     */
    getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
      const localeInfo = getLocaleInfo(locale)
      return localeInfo ? localeInfo.direction : 'ltr'
    },

    /**
     * Format number according to locale
     */
    formatNumber(value: number, locale?: Locale): string {
      const targetLocale = locale || this.currentLocale
      try {
        return new Intl.NumberFormat(targetLocale).format(value)
      } catch (error) {
        console.warn(`[I18nStore] Error formatting number for locale '${targetLocale}':`, error)
        return value.toString()
      }
    },

    /**
     * Format date according to locale
     */
    formatDate(date: Date, locale?: Locale): string {
      const targetLocale = locale || this.currentLocale
      try {
        return new Intl.DateTimeFormat(targetLocale).format(date)
      } catch (error) {
        console.warn(`[I18nStore] Error formatting date for locale '${targetLocale}':`, error)
        return date.toLocaleDateString()
      }
    },

    /**
     * Format currency according to locale
     */
    formatCurrency(value: number, locale?: Locale): string {
      const targetLocale = locale || this.currentLocale
      const localeInfo = getLocaleInfo(targetLocale)
      
      if (!localeInfo?.currency) {
        return value.toString()
      }

      try {
        return new Intl.NumberFormat(targetLocale, {
          style: 'currency',
          currency: localeInfo.currency
        }).format(value)
      } catch (error) {
        console.warn(`[I18nStore] Error formatting currency for locale '${targetLocale}':`, error)
        return `${value} ${localeInfo.currency}`
      }
    },

    // ============================================================================
    // INITIALIZATION
    // ============================================================================

    /**
     * Initialize the store
     */
    async initialize(): Promise<void> {
      try {
        console.log('[I18nStore] Initializing enterprise i18n store...')
        await enterpriseI18n.initialize()
        console.log('[I18nStore] ✅ Enterprise i18n store initialized')
      } catch (error) {
        console.error('[I18nStore] Failed to initialize:', error)
        throw error
      }
    },

    /**
     * Destroy the store
     */
    destroy(): void {
      try {
        enterpriseI18n.destroy()
        console.log('[I18nStore] ✅ Enterprise i18n store destroyed')
      } catch (error) {
        console.error('[I18nStore] Error destroying store:', error)
      }
    }
  }
})

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

export const useI18nStore = useEnterpriseI18nStore

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  Locale,
  TranslationKey,
  I18nObserver
}
