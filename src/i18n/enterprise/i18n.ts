/**
 * Enterprise I18n System - Vue Integration
 * 
 * Seamless Vue i18n integration with reactive updates,
 * intelligent missing handler, and comprehensive error handling.
 */

import { createI18n } from 'vue-i18n'
import type { Locale, TranslationKey, I18nAPI } from './types'

import { I18N_CONFIG, getLocaleInfo, getSupportedLocales } from './config'
import { I18nStateManager } from './state'
import { TranslationCacheManager } from './cache'
import { ErrorHandler } from './errors'
import { 
  DynamicModuleLoader, 
  IntelligentLoadingStrategy, 
  KeyLevelLoader,
  PreloadingManager 
} from './loader'

// ============================================================================
// ENTERPRISE I18N SYSTEM
// ============================================================================

export class EnterpriseI18nSystem implements I18nAPI {
  private static instance: EnterpriseI18nSystem
  private stateManager: I18nStateManager
  private cacheManager: TranslationCacheManager
  private errorHandler: ErrorHandler
  private moduleLoader: DynamicModuleLoader
  private loadingStrategy: IntelligentLoadingStrategy
  private keyLoader: KeyLevelLoader
  private preloadingManager: PreloadingManager
  private vueI18n: any

  static getInstance(): EnterpriseI18nSystem {
    if (!EnterpriseI18nSystem.instance) {
      EnterpriseI18nSystem.instance = new EnterpriseI18nSystem()
    }
    return EnterpriseI18nSystem.instance
  }

  constructor() {
    // Initialize core components
    this.stateManager = I18nStateManager.getInstance()
    this.cacheManager = TranslationCacheManager.getInstance(I18N_CONFIG.cacheConfig)
    this.errorHandler = ErrorHandler.getInstance()
    
    // Initialize loaders
    this.moduleLoader = new DynamicModuleLoader(this.cacheManager, this.errorHandler)
    this.loadingStrategy = new IntelligentLoadingStrategy(
      this.moduleLoader,
      this.cacheManager,
      this.errorHandler
    )
    this.keyLoader = new KeyLevelLoader(
      this.moduleLoader,
      this.cacheManager,
      this.errorHandler
    )
    this.preloadingManager = new PreloadingManager(this.loadingStrategy)

    // Initialize Vue i18n
    this.initializeVueI18n()
  }

  // ============================================================================
  // VUE I18N INITIALIZATION
  // ============================================================================

  private initializeVueI18n(): void {
    const initialLocale = this.stateManager.getInitialLocale()
    console.log(`[I18N] Initializing Vue i18n with locale: ${initialLocale}`)
    this.stateManager.setCurrentLocale(initialLocale)

    this.vueI18n = createI18n({
      legacy: false,
      locale: initialLocale,
      fallbackLocale: I18N_CONFIG.fallbackLocale,
      messages: {
        // Start with empty messages - will be loaded lazily
        ...this.createEmptyMessages()
      },
      missing: this.createMissingHandler(),
      silentTranslationWarn: true, // Disable translation warnings
      silentFallbackWarn: true,    // Disable fallback warnings
      warnHtmlMessage: false       // Disable HTML message warnings
    })
    
    console.log(`[I18N] Vue i18n initialized with locale: ${this.vueI18n.global.locale.value}`)
  }

  private createEmptyMessages(): Record<Locale, {}> {
    const messages: Record<Locale, {}> = {}
    I18N_CONFIG.supportedLocales.forEach(locale => {
      messages[locale] = {}
    })
    return messages
  }

  private createMissingHandler() {
    return async (locale: Locale, key: TranslationKey) => {
      try {
        // Load locale if not loaded (avoid infinite loop)
        if (!this.stateManager.isLocaleLoaded(locale)) {
          const translations = await this.loadingStrategy.load(locale)
          
          // Set translations in Vue i18n
          this.vueI18n.global.setLocaleMessage(locale, translations)
        }

        // Try to get translation directly from loaded messages (avoid triggering missing handler)
        const messages = this.vueI18n.global.getLocaleMessage(locale)
        const translation = this.getNestedValue(messages, key)
        if (translation && translation !== key) {
          return translation
        }

        // Try key-level loading
        try {
          const keyTranslation = await this.keyLoader.loadKey(locale, key)
          if (keyTranslation && keyTranslation !== key) {
            return keyTranslation
          }
        } catch (keyError) {
          // Silent key loading error - don't log warnings
        }

        // Try fallback locale if current locale is not fallback
        if (locale !== I18N_CONFIG.fallbackLocale) {
          try {
            const fallbackMessages = this.vueI18n.global.getLocaleMessage(I18N_CONFIG.fallbackLocale)
            const fallbackTranslation = this.getNestedValue(fallbackMessages, key)
            if (fallbackTranslation && fallbackTranslation !== key) {
              return fallbackTranslation
            }
          } catch (fallbackError) {
            // Silent fallback error
          }
        }

      } catch (error) {
        // Silent error handling - don't log errors for missing translations
      }

      // Return key as final fallback (no warning)
      return key
    }
  }

  // Helper method to get nested value from object
  private getNestedValue(obj: any, key: string): string | undefined {
    const keys = key.split('.')
    let current = obj
    
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k]
      } else {
        return undefined
      }
    }
    
    return typeof current === 'string' ? current : undefined
  }

  // ============================================================================
  // PUBLIC API
  // ============================================================================

  public async setLocale(locale: Locale): Promise<boolean> {
    try {
      if (!this.stateManager.isLocaleSupported(locale)) {
        throw new Error(`Unsupported locale: ${locale}`)
      }

      if (locale === this.stateManager.currentLocale) {
        return true // Already current locale
      }

      // Start loading tracking
      const context = {
        locale,
        operation: 'set_locale',
        timestamp: Date.now()
      }
      this.stateManager.startLoading(context)

      // Load translations
      const translations = await this.loadingStrategy.load(locale)

      // Set translations in Vue i18n first
      this.vueI18n.global.setLocaleMessage(locale, translations)

      // Update state
      this.stateManager.setCurrentLocale(locale)
      this.stateManager.addLoadedLocale(locale)

      // Set locale after messages are loaded (avoid triggering missing handler)
      this.vueI18n.global.locale.value = locale

      // Complete loading tracking
      this.stateManager.completeLoading(context, {
        success: true,
        data: translations,
        loadTime: performance.now() - context.timestamp,
        fromCache: this.cacheManager.hasLocaleCache(locale)
      })

      return true

    } catch (error) {
      console.error(`[I18N] Failed to set locale '${locale}':`, error)

      // Complete loading tracking with error
      this.stateManager.completeLoading(
        { locale, operation: 'set_locale', timestamp: Date.now() },
        {
          success: false,
          error: error as Error,
          loadTime: 0,
          fromCache: false
        }
      )

      return false
    }
  }

  public getTranslation(key: TranslationKey, locale?: Locale): string {
    const targetLocale = locale || this.stateManager.currentLocale

    try {
      return this.vueI18n.global.t(key, targetLocale)
    } catch (error) {
      console.warn(`[I18N] Failed to get translation for '${key}' in '${targetLocale}':`, error)
      return key // Return key as fallback
    }
  }

  public async preloadLocale(locale: Locale, section?: Section): Promise<void> {
    try {
      if (section) {
        // Section-specific preloading
        console.log(`[I18N] Preloading locale '${locale}' section '${section}'`)
        await this.loadingStrategy.load(locale, section)
        console.log(`[I18N] Successfully preloaded locale '${locale}' section '${section}'`)
      } else {
        // Full locale preloading
        await this.preloadingManager.preloadLocales([locale])
      }
    } catch (error) {
      console.error(`[I18N] Failed to preload locale '${locale}'${section ? ` section '${section}'` : ''}:`, error)
    }
  }

  public async preloadLocales(locales: readonly Locale[]): Promise<void> {
    try {
      await this.preloadingManager.preloadLocales(locales)
    } catch (error) {
      console.error(`[I18N] Failed to preload locales:`, error)
    }
  }

  public clearCache(): void {
    this.cacheManager.clearAll()
  }

  public getMetrics() {
    return this.loadingStrategy.getPerformanceMetrics()
  }

  public getErrorStats() {
    return this.errorHandler.getStatistics()
  }

  public addObserver(observer: any): void {
    this.stateManager.addObserver(observer)
  }

  public removeObserver(observer: any): void {
    this.stateManager.removeObserver(observer)
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  public async initialize(): Promise<void> {
    try {
      // Load initial locale without triggering missing handler
      const initialLocale = this.stateManager.getInitialLocale()
      await this.loadingStrategy.load(initialLocale)

      // Also load fallback locale to prevent fallback warnings
      if (initialLocale !== I18N_CONFIG.fallbackLocale) {
        try {
          const fallbackTranslations = await this.loadingStrategy.load(I18N_CONFIG.fallbackLocale)
          this.vueI18n.global.setLocaleMessage(I18N_CONFIG.fallbackLocale, fallbackTranslations)
        } catch (fallbackError) {
          // Silent fallback loading error
        }
      }

      // Start background preloading
      if (I18N_CONFIG.performanceConfig.enablePreloading) {
        setTimeout(() => {
          this.startBackgroundPreloading()
        }, I18N_CONFIG.performanceConfig.preloadDelay)
      }

    } catch (error) {
      console.error('[I18N] Failed to initialize:', error)
      throw error
    }
  }

  private async startBackgroundPreloading(): Promise<void> {
    try {
      // Preload common locales
      await this.preloadLocales(I18N_CONFIG.preloadLocales)

    } catch (error) {
      console.error('[I18N] Background preloading failed:', error)
    }
  }

  // ============================================================================
  // VUE I18N ACCESS
  // ============================================================================

  public get vueI18nInstance() {
    return this.vueI18n
  }

  public get currentLocale(): Locale {
    return this.stateManager.currentLocale
  }

  public get isLoading(): boolean {
    return this.stateManager.isLoading
  }

  public get loadedLocales(): readonly Locale[] {
    return this.stateManager.loadedLocales
  }

  public get supportedLocales() {
    return getSupportedLocales()
  }

  public get currentLocaleInfo() {
    return getLocaleInfo(this.stateManager.currentLocale)
  }


  // ============================================================================
  // DESTRUCTION
  // ============================================================================

  public destroy(): void {
    this.cacheManager.destroy()
    this.stateManager.reset()
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const enterpriseI18n = EnterpriseI18nSystem.getInstance()

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

export const i18n = enterpriseI18n.vueI18nInstance

export const setLocale = (locale: Locale) => enterpriseI18n.setLocale(locale)
export const getTranslation = (key: TranslationKey, locale?: Locale) => 
  enterpriseI18n.getTranslation(key, locale)
export const preloadLocale = (locale: Locale) => enterpriseI18n.preloadLocale(locale)
export const preloadLocales = (locales: readonly Locale[]) => 
  enterpriseI18n.preloadLocales(locales)
export const clearCache = () => enterpriseI18n.clearCache()
export const getMetrics = () => enterpriseI18n.getMetrics()
export const getErrorStats = () => enterpriseI18n.getErrorStats()

// ============================================================================
// EXPORTS
// ============================================================================

export default i18n

export type {
  Locale,
  TranslationKey,
  I18nAPI
}
