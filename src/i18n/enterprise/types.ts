/**
 * Enterprise I18n System - Type Definitions
 * 
 * This module defines all TypeScript interfaces and types for the enterprise-grade
 * i18n lazy loading system, ensuring full type safety and excellent developer experience.
 */

// ============================================================================
// CORE TYPES
// ============================================================================

export type Locale = string
export type TranslationKey = string
export type Section = string
export type Module = string

// ============================================================================
// TRANSLATION DATA STRUCTURES
// ============================================================================

export interface TranslationData {
  readonly [section: string]: {
    readonly [key: string]: string
  }
}

export interface LocaleTranslations {
  readonly [locale: string]: TranslationData
}

export interface SectionTranslations {
  readonly [section: string]: {
    readonly [key: string]: string
  }
}

// ============================================================================
// CACHE STRUCTURES
// ============================================================================

export interface CacheEntry<T> {
  readonly data: T
  readonly timestamp: number
  readonly ttl: number
  readonly hits: number
}

export interface TranslationCache {
  readonly [locale: string]: CacheEntry<TranslationData>
}

export interface SectionCache {
  readonly [key: string]: CacheEntry<SectionTranslations>
}

export interface ModuleCache {
  readonly [module: string]: CacheEntry<any>
}

// ============================================================================
// LOADING & PERFORMANCE
// ============================================================================

export interface LoadingMetrics {
  readonly totalRequests: number
  readonly cacheHits: number
  readonly cacheMisses: number
  readonly loadTimes: readonly number[]
  readonly errors: number
  readonly retries: number
}

export interface PerformanceMetrics {
  readonly averageLoadTime: number
  readonly cacheHitRate: number
  readonly errorRate: number
  readonly memoryUsage: number
  readonly networkRequests: number
}

export interface LoadingState {
  readonly isLoading: boolean
  readonly loadingLocales: readonly Locale[]
  readonly loadingSections: readonly string[]
  readonly loadingModules: readonly string[]
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

export interface ErrorContext {
  readonly locale?: Locale
  readonly key?: TranslationKey
  readonly section?: Section
  readonly module?: Module
  readonly operation: string
  readonly timestamp: number
}

export interface ErrorRecoveryStrategy {
  readonly type: 'fallback' | 'retry' | 'skip' | 'abort'
  readonly fallbackLocale?: Locale
  readonly retryCount?: number
  readonly retryDelay?: number
}

export interface ErrorStatistics {
  readonly totalErrors: number
  readonly errorsByType: Record<string, number>
  readonly errorsByLocale: Record<Locale, number>
  readonly recentErrors: readonly ErrorContext[]
  readonly recoverySuccessRate: number
}

// ============================================================================
// CONFIGURATION
// ============================================================================

export interface I18nConfig {
  readonly supportedLocales: readonly Locale[]
  readonly fallbackLocale: Locale
  readonly defaultLocale: Locale
  readonly preloadLocales: readonly Locale[]
  readonly preloadSections: readonly Section[]
  readonly cacheConfig: CacheConfig
  readonly performanceConfig: PerformanceConfig
  readonly errorConfig: ErrorConfig
}

export interface CacheConfig {
  readonly maxSize: number
  readonly ttl: number
  readonly enableMemoryCache: boolean
  readonly enableNetworkCache: boolean
  readonly cleanupInterval: number
}

export interface PerformanceConfig {
  readonly enableMetrics: boolean
  readonly metricsInterval: number
  readonly maxLoadTime: number
  readonly enablePreloading: boolean
  readonly preloadDelay: number
}

export interface ErrorConfig {
  readonly enableErrorRecovery: boolean
  readonly maxRetries: number
  readonly retryDelay: number
  readonly enableErrorLogging: boolean
  readonly errorLogSize: number
}

// ============================================================================
// LOCALE INFORMATION
// ============================================================================

export interface LocaleInfo {
  readonly code: Locale
  readonly name: string
  readonly nativeName: string
  readonly flag: string
  readonly direction: 'ltr' | 'rtl'
  readonly currency?: string
  readonly dateFormat?: string
  readonly numberFormat?: string
}

export interface LocaleMetadata {
  readonly [locale: string]: LocaleInfo
}

// ============================================================================
// MODULE SYSTEM
// ============================================================================

export interface ModuleDefinition {
  readonly name: Module
  readonly locales: readonly Locale[]
  readonly sections: readonly Section[]
  readonly priority: number
  readonly dependencies?: readonly Module[]
  readonly loader: ModuleLoader
}

export interface ModuleLoader {
  readonly load: (locale: Locale, section?: Section) => Promise<TranslationData>
  readonly preload: (locales: readonly Locale[]) => Promise<void>
  readonly unload: (locale: Locale) => Promise<void>
}

// ============================================================================
// STRATEGY PATTERNS
// ============================================================================

export interface LoadingStrategy {
  readonly load: (locale: Locale) => Promise<TranslationData>
  readonly preload: (locales: readonly Locale[]) => Promise<void>
  readonly canLoad: (locale: Locale) => boolean
}

export interface CachingStrategy {
  readonly get: <T>(key: string) => CacheEntry<T> | null
  readonly set: <T>(key: string, data: T, ttl?: number) => void
  readonly has: (key: string) => boolean
  readonly clear: () => void
  readonly cleanup: () => void
}

export interface ErrorStrategy {
  readonly handle: (error: Error, context: ErrorContext) => ErrorRecoveryStrategy
  readonly recover: (strategy: ErrorRecoveryStrategy, context: ErrorContext) => Promise<boolean>
}

// ============================================================================
// FACTORY INTERFACES
// ============================================================================

export interface LoaderFactory {
  readonly createLoader: (type: string, config: any) => ModuleLoader
  readonly getSupportedTypes: () => readonly string[]
}

export interface CacheFactory {
  readonly createCache: (type: string, config: CacheConfig) => CachingStrategy
  readonly getSupportedTypes: () => readonly string[]
}

// ============================================================================
// OBSERVER PATTERN
// ============================================================================

export interface I18nObserver {
  readonly onLocaleChange: (locale: Locale) => void
  readonly onLoadingStart: (context: LoadingContext) => void
  readonly onLoadingComplete: (context: LoadingContext, result: LoadingResult) => void
  readonly onError: (error: Error, context: ErrorContext) => void
}

export interface LoadingContext {
  readonly locale: Locale
  readonly section?: Section
  readonly module?: Module
  readonly timestamp: number
}

export interface LoadingResult {
  readonly success: boolean
  readonly data?: TranslationData
  readonly error?: Error
  readonly loadTime: number
  readonly fromCache: boolean
}

// ============================================================================
// STATE MANAGEMENT
// ============================================================================

export interface I18nState {
  readonly currentLocale: Locale
  readonly fallbackLocale: Locale
  readonly supportedLocales: readonly Locale[]
  readonly loadedLocales: readonly Locale[]
  readonly loadingState: LoadingState
  readonly metrics: PerformanceMetrics
  readonly errorStats: ErrorStatistics
}

// ============================================================================
// API INTERFACES
// ============================================================================

export interface I18nAPI {
  readonly setLocale: (locale: Locale) => Promise<boolean>
  readonly getTranslation: (key: TranslationKey, locale?: Locale) => string
  readonly preloadLocale: (locale: Locale) => Promise<void>
  readonly preloadLocales: (locales: readonly Locale[]) => Promise<void>
  readonly clearCache: () => void
  readonly getMetrics: () => PerformanceMetrics
  readonly getErrorStats: () => ErrorStatistics
  readonly addObserver: (observer: I18nObserver) => void
  readonly removeObserver: (observer: I18nObserver) => void
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>

export type NonNullable<T> = T extends null | undefined ? never : T

// ============================================================================
// GENERIC CONSTRAINTS
// ============================================================================

export interface Cacheable {
  readonly id: string
  readonly timestamp: number
}

export interface Loadable {
  readonly load: () => Promise<any>
  readonly unload: () => Promise<void>
}

export interface Observable {
  readonly addObserver: (observer: any) => void
  readonly removeObserver: (observer: any) => void
  readonly notifyObservers: (event: any) => void
}
