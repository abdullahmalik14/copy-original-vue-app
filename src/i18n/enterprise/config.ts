/**
 * Enterprise I18n System - Configuration
 * 
 * Centralized configuration management with environment-specific settings,
 * validation, and type safety for the enterprise i18n system.
 */

import type { 
  I18nConfig, 
  LocaleInfo, 
  LocaleMetadata, 
  CacheConfig, 
  PerformanceConfig, 
  ErrorConfig 
} from './types'

// ============================================================================
// ENVIRONMENT CONFIGURATION
// ============================================================================

const isDevelopment = process.env.NODE_ENV === 'development'
const isProduction = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_ENV === 'test'

// ============================================================================
// CACHE CONFIGURATION
// ============================================================================

export const CACHE_CONFIG: CacheConfig = {
  maxSize: isProduction ? 50 : 20,
  ttl: isProduction ? 30 * 60 * 1000 : 5 * 60 * 1000, // 30min prod, 5min dev
  enableMemoryCache: true,
  enableNetworkCache: isProduction,
  cleanupInterval: 10 * 60 * 1000 // 10 minutes
}

// ============================================================================
// PERFORMANCE CONFIGURATION
// ============================================================================

export const PERFORMANCE_CONFIG: PerformanceConfig = {
  enableMetrics: !isTest,
  metricsInterval: isDevelopment ? 5000 : 30000, // 5s dev, 30s prod
  maxLoadTime: 5000, // 5 seconds max load time
  enablePreloading: true,
  preloadDelay: isDevelopment ? 1000 : 500 // 1s dev, 500ms prod
}

// ============================================================================
// ERROR CONFIGURATION
// ============================================================================

export const ERROR_CONFIG: ErrorConfig = {
  enableErrorRecovery: true,
  maxRetries: isProduction ? 3 : 1,
  retryDelay: isProduction ? 1000 : 500,
  enableErrorLogging: !isTest,
  errorLogSize: isDevelopment ? 100 : 50
}

// ============================================================================
// LOCALE METADATA
// ============================================================================

export const LOCALE_METADATA: LocaleMetadata = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    numberFormat: '1,234.56'
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    direction: 'ltr',
    currency: 'VND',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1.234,56'
  },
}

// ============================================================================
// SUPPORTED LOCALES
// ============================================================================

export const SUPPORTED_LOCALES = ['en', 'vi'] as const

export const DEFAULT_LOCALE: keyof typeof LOCALE_METADATA = 'vi'
export const FALLBACK_LOCALE: keyof typeof LOCALE_METADATA = 'vi'

// ============================================================================
// PRELOAD CONFIGURATION
// ============================================================================

export const PRELOAD_LOCALES = ['en', 'vi'] as const
export const PRELOAD_SECTIONS = ['common', 'auth', 'navigation'] as const

// ============================================================================
// MODULE CONFIGURATION
// ============================================================================

export const MODULE_PRIORITIES = {
  core: 1,
  auth: 2,
  navigation: 3,
  dashboard: 4,
  profile: 5,
  shop: 6,
  discover: 7,
  misc: 8
} as const

export const MODULE_DEPENDENCIES = {
  auth: ['core'],
  navigation: ['core'],
  dashboard: ['core', 'auth'],
  profile: ['core', 'auth'],
  shop: ['core', 'auth'],
  discover: ['core'],
  misc: ['core']
} as const

// ============================================================================
// MAIN CONFIGURATION
// ============================================================================

export const I18N_CONFIG: I18nConfig = {
  supportedLocales: SUPPORTED_LOCALES,
  fallbackLocale: FALLBACK_LOCALE,
  defaultLocale: DEFAULT_LOCALE,
  preloadLocales: PRELOAD_LOCALES,
  preloadSections: PRELOAD_SECTIONS,
  cacheConfig: CACHE_CONFIG,
  performanceConfig: PERFORMANCE_CONFIG,
  errorConfig: ERROR_CONFIG
}

// ============================================================================
// VALIDATION FUNCTIONS
// ============================================================================

export function isValidLocale(locale: string): locale is keyof typeof LOCALE_METADATA {
  return locale in LOCALE_METADATA
}

export function getLocaleInfo(locale: string): LocaleInfo | null {
  return isValidLocale(locale) ? LOCALE_METADATA[locale] : null
}

export function getSupportedLocales(): readonly LocaleInfo[] {
  return SUPPORTED_LOCALES.map(locale => LOCALE_METADATA[locale])
}

export function getPreloadLocales(): readonly LocaleInfo[] {
  return PRELOAD_LOCALES.map(locale => LOCALE_METADATA[locale])
}

// ============================================================================
// ENVIRONMENT-SPECIFIC OVERRIDES
// ============================================================================

export function getEnvironmentConfig(): Partial<I18nConfig> {
  if (isTest) {
    return {
      cacheConfig: {
        ...CACHE_CONFIG,
        maxSize: 5,
        ttl: 1000, // 1 second for tests
        enableMemoryCache: true,
        enableNetworkCache: false,
        cleanupInterval: 1000
      },
      performanceConfig: {
        ...PERFORMANCE_CONFIG,
        enableMetrics: false,
        enablePreloading: false
      },
      errorConfig: {
        ...ERROR_CONFIG,
        enableErrorLogging: false,
        maxRetries: 0
      }
    }
  }

  if (isDevelopment) {
    return {
      performanceConfig: {
        ...PERFORMANCE_CONFIG,
        enableMetrics: true,
        metricsInterval: 2000 // More frequent metrics in dev
      }
    }
  }

  return {}
}

// ============================================================================
// CONFIGURATION VALIDATION
// ============================================================================

export function validateConfig(config: Partial<I18nConfig>): string[] {
  const errors: string[] = []

  if (config.supportedLocales && config.supportedLocales.length === 0) {
    errors.push('supportedLocales cannot be empty')
  }

  if (config.fallbackLocale && !isValidLocale(config.fallbackLocale)) {
    errors.push(`fallbackLocale '${config.fallbackLocale}' is not supported`)
  }

  if (config.defaultLocale && !isValidLocale(config.defaultLocale)) {
    errors.push(`defaultLocale '${config.defaultLocale}' is not supported`)
  }

  if (config.cacheConfig) {
    if (config.cacheConfig.maxSize <= 0) {
      errors.push('cacheConfig.maxSize must be greater than 0')
    }
    if (config.cacheConfig.ttl <= 0) {
      errors.push('cacheConfig.ttl must be greater than 0')
    }
  }

  if (config.errorConfig) {
    if (config.errorConfig.maxRetries < 0) {
      errors.push('errorConfig.maxRetries must be non-negative')
    }
    if (config.errorConfig.retryDelay < 0) {
      errors.push('errorConfig.retryDelay must be non-negative')
    }
  }

  return errors
}

// ============================================================================
// CONFIGURATION MERGER
// ============================================================================

export function mergeConfig(
  baseConfig: I18nConfig,
  overrideConfig: Partial<I18nConfig>
): I18nConfig {
  const errors = validateConfig(overrideConfig)
  if (errors.length > 0) {
    throw new Error(`Configuration validation failed: ${errors.join(', ')}`)
  }

  return {
    ...baseConfig,
    ...overrideConfig,
    cacheConfig: {
      ...baseConfig.cacheConfig,
      ...overrideConfig.cacheConfig
    },
    performanceConfig: {
      ...baseConfig.performanceConfig,
      ...overrideConfig.performanceConfig
    },
    errorConfig: {
      ...baseConfig.errorConfig,
      ...overrideConfig.errorConfig
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  type I18nConfig,
  type LocaleInfo,
  type LocaleMetadata,
  type CacheConfig,
  type PerformanceConfig,
  type ErrorConfig
}
