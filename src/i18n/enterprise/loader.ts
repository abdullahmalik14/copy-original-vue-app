/**
 * Enterprise I18n System - Advanced Lazy Loader
 * 
 * High-performance lazy loading system with dynamic imports,
 * intelligent preloading, and comprehensive error handling.
 */

import type {
  Locale,
  TranslationData,
  TranslationKey,
  Section,
  Module,
  LoadingStrategy,
  ModuleLoader,
  LoadingMetrics,
  PerformanceMetrics,
  LoadingState,
  LoadingContext,
  LoadingResult
} from './types'

import { TranslationCacheManager } from './cache'
import { ErrorHandler, TranslationLoadError, NetworkError } from './errors'
import { I18N_CONFIG } from './config'

// ============================================================================
// DYNAMIC MODULE LOADER
// ============================================================================

export class DynamicModuleLoader implements ModuleLoader {
  private cacheManager: TranslationCacheManager
  private errorHandler: ErrorHandler
  private loadingPromises: Map<string, Promise<TranslationData>> = new Map()

  constructor(
    cacheManager: TranslationCacheManager,
    errorHandler: ErrorHandler
  ) {
    this.cacheManager = cacheManager
    this.errorHandler = errorHandler
  }

  public async load(locale: Locale, section?: Section): Promise<TranslationData> {
    const cacheKey = section ? `${locale}:${section}` : locale

    // Check if already loading
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!
    }

    // Check cache first
    if (section) {
      const cached = this.cacheManager.getSectionCache(locale, section)
      if (cached) {
        return cached.data
      }
    } else {
      const cached = this.cacheManager.getLocaleCache(locale)
      if (cached) {
        return cached.data
      }
    }

    // Start loading
    const loadingPromise = this.performLoad(locale, section)
    this.loadingPromises.set(cacheKey, loadingPromise)

    try {
      const result = await loadingPromise
      this.loadingPromises.delete(cacheKey)
      return result
    } catch (error) {
      this.loadingPromises.delete(cacheKey)
      throw error
    }
  }

  private async performLoad(locale: Locale, section?: Section): Promise<TranslationData> {
    const startTime = performance.now()

    try {
      // Always load the full locale file, then extract section if needed
      const filePath = `/i18n/${locale}.json`

      const response = await fetch(filePath)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filePath}: ${response.status} ${response.statusText}`)
      }

      const fullData = await response.json()

      const loadTime = performance.now() - startTime

      // Extract section data if section is specified
      const data = section ? { [section]: fullData[section] } : fullData

      // Cache the result
      if (section) {
        this.cacheManager.setSectionCache(locale, section, data)
      } else {
        this.cacheManager.setLocaleCache(locale, data)
      }

      return data

    } catch (error) {
      const loadTime = performance.now() - startTime
      
      // Handle error with recovery
      const recoverySuccess = await this.errorHandler.handleError(
        error as Error,
        { locale, section, operation: 'load_module' },
        async (strategy) => {
          if (strategy.type === 'fallback' && strategy.fallbackLocale) {
            return this.loadFallback(strategy.fallbackLocale, section)
          }
          return false
        }
      )

      if (recoverySuccess) {
        // Try to load fallback
        return this.loadFallback(I18N_CONFIG.fallbackLocale, section)
      }

      throw new TranslationLoadError(
        locale,
        `Failed to load ${section ? `section '${section}'` : 'translations'} for locale '${locale}'`,
        error as Error
      )
    }
  }

  private async loadFallback(locale: Locale, section?: Section): Promise<TranslationData> {
    try {
      // Always load the full locale file for fallback
      const filePath = `/i18n/${locale}.json`

      const response = await fetch(filePath)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch fallback ${filePath}: ${response.status} ${response.statusText}`)
      }

      const fullData = await response.json()

      // Extract section data if section is specified
      const data = section ? { [section]: fullData[section] } : fullData

      return data
    } catch (error) {
      throw new TranslationLoadError(
        locale,
        `Fallback loading failed for locale '${locale}'`,
        error as Error
      )
    }
  }

  public async preload(locales: readonly Locale[]): Promise<void> {
    const preloadPromises = locales.map(locale => 
      this.load(locale).catch(error => {
        console.warn(`[I18N] Failed to preload locale '${locale}':`, error)
      })
    )

    await Promise.allSettled(preloadPromises)
  }

  public async unload(locale: Locale): Promise<void> {
    // Clear cache for locale
    this.cacheManager.clearLocale(locale)
    
    // Clear loading promises
    const keysToDelete: string[] = []
    this.loadingPromises.forEach((_, key) => {
      if (key.startsWith(locale)) {
        keysToDelete.push(key)
      }
    })
    
    keysToDelete.forEach(key => this.loadingPromises.delete(key))
  }
}

// ============================================================================
// INTELLIGENT LOADING STRATEGY
// ============================================================================

export class IntelligentLoadingStrategy implements LoadingStrategy {
  private moduleLoader: DynamicModuleLoader
  private cacheManager: TranslationCacheManager
  private errorHandler: ErrorHandler
  private metrics: LoadingMetrics = {
    totalRequests: 0,
    cacheHits: 0,
    cacheMisses: 0,
    loadTimes: [],
    errors: 0,
    retries: 0
  }

  constructor(
    moduleLoader: DynamicModuleLoader,
    cacheManager: TranslationCacheManager,
    errorHandler: ErrorHandler
  ) {
    this.moduleLoader = moduleLoader
    this.cacheManager = cacheManager
    this.errorHandler = errorHandler
  }

  public async load(locale: Locale, section?: Section): Promise<TranslationData> {
    const startTime = performance.now()
    this.metrics.totalRequests++

    try {
      // Check cache first
      const cached = section 
        ? this.cacheManager.getSectionCache(locale, section)
        : this.cacheManager.getLocaleCache(locale)
        
      if (cached) {
        this.metrics.cacheHits++
        return cached.data
      }

      this.metrics.cacheMisses++

      // Load from module
      const data = await this.moduleLoader.load(locale, section)
      
      const loadTime = performance.now() - startTime
      this.metrics.loadTimes.push(loadTime)

      return data

    } catch (error) {
      this.metrics.errors++
      
      const recoverySuccess = await this.errorHandler.handleError(
        error as Error,
        { locale, section, operation: 'load_locale' },
        async (strategy) => {
          if (strategy.type === 'fallback' && strategy.fallbackLocale) {
            return this.loadFallback(strategy.fallbackLocale, section)
          }
          return false
        }
      )

      if (recoverySuccess) {
        return this.loadFallback(I18N_CONFIG.fallbackLocale, section)
      }

      throw error
    }
  }

  private async loadFallback(locale: Locale, section?: Section): Promise<TranslationData> {
    try {
      return await this.moduleLoader.load(locale, section)
    } catch (error) {
      throw new TranslationLoadError(
        locale,
        `Fallback loading failed for locale '${locale}'${section ? ` section '${section}'` : ''}`,
        error as Error
      )
    }
  }

  public async preload(locales: readonly Locale[]): Promise<void> {
    const preloadPromises = locales.map(locale => 
      this.load(locale).catch(error => {
        console.warn(`[I18N] Failed to preload locale '${locale}':`, error)
      })
    )

    await Promise.allSettled(preloadPromises)
  }

  public canLoad(locale: Locale): boolean {
    return I18N_CONFIG.supportedLocales.includes(locale)
  }

  public getMetrics(): LoadingMetrics {
    return { ...this.metrics }
  }

  public getPerformanceMetrics(): PerformanceMetrics {
    const averageLoadTime = this.metrics.loadTimes.length > 0
      ? this.metrics.loadTimes.reduce((a, b) => a + b, 0) / this.metrics.loadTimes.length
      : 0

    const cacheHitRate = this.metrics.totalRequests > 0
      ? this.metrics.cacheHits / this.metrics.totalRequests
      : 0

    const errorRate = this.metrics.totalRequests > 0
      ? this.metrics.errors / this.metrics.totalRequests
      : 0

    return {
      averageLoadTime,
      cacheHitRate,
      errorRate,
      memoryUsage: this.cacheManager.getStats().total.memoryUsage,
      networkRequests: this.metrics.totalRequests - this.metrics.cacheHits
    }
  }

  public resetMetrics(): void {
    this.metrics = {
      totalRequests: 0,
      cacheHits: 0,
      cacheMisses: 0,
      loadTimes: [],
      errors: 0,
      retries: 0
    }
  }
}

// ============================================================================
// KEY-LEVEL LOADER
// ============================================================================

export class KeyLevelLoader {
  private moduleLoader: DynamicModuleLoader
  private cacheManager: TranslationCacheManager
  private errorHandler: ErrorHandler

  constructor(
    moduleLoader: DynamicModuleLoader,
    cacheManager: TranslationCacheManager,
    errorHandler: ErrorHandler
  ) {
    this.moduleLoader = moduleLoader
    this.cacheManager = cacheManager
    this.errorHandler = errorHandler
  }

  public async loadKey(locale: Locale, key: TranslationKey): Promise<string> {
    // Check key cache first
    const cached = this.cacheManager.getKeyCache(locale, key)
    if (cached) {
      return cached.data
    }

    try {
      // Load full locale data
      const localeData = await this.moduleLoader.load(locale)
      
      // Extract key value
      const value = this.extractKeyValue(localeData, key)
      
      // Cache the key
      this.cacheManager.setKeyCache(locale, key, value)
      
      return value

    } catch (error) {
      const recoverySuccess = await this.errorHandler.handleError(
        error as Error,
        { locale, key, operation: 'load_key' },
        async (strategy) => {
          if (strategy.type === 'fallback' && strategy.fallbackLocale) {
            return this.loadKeyFromFallback(strategy.fallbackLocale, key)
          }
          return false
        }
      )

      if (recoverySuccess) {
        return this.loadKeyFromFallback(I18N_CONFIG.fallbackLocale, key)
      }

      // Return key as fallback
      return key
    }
  }

  private extractKeyValue(data: TranslationData, key: TranslationKey): string {
    const keyParts = key.split('.')
    let value: any = data

    for (const part of keyParts) {
      if (value && typeof value === 'object' && part in value) {
        value = value[part]
      } else {
        // Return key as fallback instead of throwing error
        return key
      }
    }

    if (typeof value !== 'string') {
      // Return key as fallback instead of throwing error
      return key
    }

    return value
  }

  private async loadKeyFromFallback(locale: Locale, key: TranslationKey): Promise<string> {
    try {
      const localeData = await this.moduleLoader.load(locale)
      return this.extractKeyValue(localeData, key)
    } catch (error) {
      return key // Return key as final fallback
    }
  }
}

// ============================================================================
// PRELOADING MANAGER
// ============================================================================

export class PreloadingManager {
  private loadingStrategy: IntelligentLoadingStrategy
  private preloadQueue: Set<Locale> = new Set()
  private isPreloading: boolean = false

  constructor(loadingStrategy: IntelligentLoadingStrategy) {
    this.loadingStrategy = loadingStrategy
  }

  public async preloadLocales(locales: readonly Locale[]): Promise<void> {
    if (this.isPreloading) {
      return
    }

    this.isPreloading = true

    try {
      // Add to preload queue
      locales.forEach(locale => this.preloadQueue.add(locale))

      // Preload with delay to avoid blocking
      await this.loadingStrategy.preload(locales)

      // Clear preload queue
      this.preloadQueue.clear()

    } finally {
      this.isPreloading = false
    }
  }

  public async preloadSections(locale: Locale, sections: readonly Section[]): Promise<void> {
    const preloadPromises = sections.map(section =>
      this.loadingStrategy.load(locale).catch(error => {
        console.warn(`[I18N] Failed to preload section '${section}' for locale '${locale}':`, error)
      })
    )

    await Promise.allSettled(preloadPromises)
  }

  public isPreloadingLocale(locale: Locale): boolean {
    return this.preloadQueue.has(locale)
  }

  public getPreloadQueue(): readonly Locale[] {
    return Array.from(this.preloadQueue)
  }
}

// ============================================================================
// LOADER FACTORY
// ============================================================================

export class LoaderFactory {
  public static createLoader(
    type: string,
    cacheManager: TranslationCacheManager,
    errorHandler: ErrorHandler
  ): ModuleLoader {
    switch (type) {
      case 'dynamic':
        return new DynamicModuleLoader(cacheManager, errorHandler)
      default:
        throw new Error(`Unsupported loader type: ${type}`)
    }
  }

  public static getSupportedTypes(): readonly string[] {
    return ['dynamic'] as const
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  LoadingStrategy,
  ModuleLoader,
  LoadingMetrics,
  PerformanceMetrics,
  LoadingState,
  LoadingContext,
  LoadingResult
}
