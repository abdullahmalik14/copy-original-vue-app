/**
 * Enterprise I18n System - Integration Tests
 * 
 * End-to-end integration tests for the complete enterprise i18n system
 * including Vue integration, state management, and real-world scenarios.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import type { Locale, TranslationKey } from '@/i18n/enterprise/types'

import { enterpriseI18n } from '@/i18n/enterprise/i18n'
import { useEnterpriseI18nStore } from '@/stores/enterpriseI18n'

// ============================================================================
// MOCK SETUP
// ============================================================================

// Mock dynamic imports
vi.mock('@/i18n/enterprise/i18n', async () => {
  const actual = await vi.importActual('@/i18n/enterprise/i18n')
  return {
    ...actual,
    enterpriseI18n: {
      ...actual.enterpriseI18n,
      setLocale: vi.fn(),
      getTranslation: vi.fn(),
      preloadLocale: vi.fn(),
      preloadLocales: vi.fn(),
      clearCache: vi.fn(),
      getMetrics: vi.fn(),
      getErrorStats: vi.fn(),
      addObserver: vi.fn(),
      removeObserver: vi.fn(),
      initialize: vi.fn(),
      currentLocale: 'en',
      isLoading: false,
      loadedLocales: ['en'],
      supportedLocales: [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸', direction: 'ltr' },
        { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt', flag: '🇻🇳', direction: 'ltr' }
      ]
    }
  }
})

// Mock translation data
const mockTranslations = {
  en: {
    common: {
      hello: 'Hello',
      goodbye: 'Goodbye',
      welcome: 'Welcome'
    },
    auth: {
      login: 'Login',
      logout: 'Logout',
      register: 'Register'
    },
    navigation: {
      home: 'Home',
      about: 'About',
      contact: 'Contact'
    }
  },
  vi: {
    common: {
      hello: 'Xin chào',
      goodbye: 'Tạm biệt',
      welcome: 'Chào mừng'
    },
    auth: {
      login: 'Đăng nhập',
      logout: 'Đăng xuất',
      register: 'Đăng ký'
    },
    navigation: {
      home: 'Trang chủ',
      about: 'Giới thiệu',
      contact: 'Liên hệ'
    }
  }
}

// ============================================================================
// VUE APP SETUP
// ============================================================================

function createTestApp() {
  const app = createApp({
    template: '<div>Test App</div>'
  })
  
  const pinia = createPinia()
  app.use(pinia)
  
  return { app, pinia }
}

// ============================================================================
// ENTERPRISE I18N SYSTEM TESTS
// ============================================================================

describe('Enterprise I18n System', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initialization', () => {
    it('should initialize successfully', async () => {
      const mockInitialize = vi.mocked(enterpriseI18n.initialize)
      mockInitialize.mockResolvedValue(undefined)
      
      await enterpriseI18n.initialize()
      
      expect(mockInitialize).toHaveBeenCalledTimes(1)
    })

    it('should handle initialization errors', async () => {
      const mockInitialize = vi.mocked(enterpriseI18n.initialize)
      mockInitialize.mockRejectedValue(new Error('Initialization failed'))
      
      await expect(enterpriseI18n.initialize()).rejects.toThrow('Initialization failed')
    })
  })

  describe('Locale Management', () => {
    it('should set locale successfully', async () => {
      const mockSetLocale = vi.mocked(enterpriseI18n.setLocale)
      mockSetLocale.mockResolvedValue(true)
      
      const result = await enterpriseI18n.setLocale('vi')
      
      expect(result).toBe(true)
      expect(mockSetLocale).toHaveBeenCalledWith('vi')
    })

    it('should handle locale setting errors', async () => {
      const mockSetLocale = vi.mocked(enterpriseI18n.setLocale)
      mockSetLocale.mockResolvedValue(false)
      
      const result = await enterpriseI18n.setLocale('invalid')
      
      expect(result).toBe(false)
    })

    it('should get translation correctly', () => {
      const mockGetTranslation = vi.mocked(enterpriseI18n.getTranslation)
      mockGetTranslation.mockReturnValue('Hello')
      
      const result = enterpriseI18n.getTranslation('common.hello')
      
      expect(result).toBe('Hello')
      expect(mockGetTranslation).toHaveBeenCalledWith('common.hello', undefined)
    })

    it('should get translation with specific locale', () => {
      const mockGetTranslation = vi.mocked(enterpriseI18n.getTranslation)
      mockGetTranslation.mockReturnValue('Xin chào')
      
      const result = enterpriseI18n.getTranslation('common.hello', 'vi')
      
      expect(result).toBe('Xin chào')
      expect(mockGetTranslation).toHaveBeenCalledWith('common.hello', 'vi')
    })
  })

  describe('Preloading', () => {
    it('should preload single locale', async () => {
      const mockPreloadLocale = vi.mocked(enterpriseI18n.preloadLocale)
      mockPreloadLocale.mockResolvedValue(undefined)
      
      await enterpriseI18n.preloadLocale('vi')
      
      expect(mockPreloadLocale).toHaveBeenCalledWith('vi')
    })

    it('should preload multiple locales', async () => {
      const mockPreloadLocales = vi.mocked(enterpriseI18n.preloadLocales)
      mockPreloadLocales.mockResolvedValue(undefined)
      
      await enterpriseI18n.preloadLocales(['vi', 'fr'])
      
      expect(mockPreloadLocales).toHaveBeenCalledWith(['vi', 'fr'])
    })
  })

  describe('Cache Management', () => {
    it('should clear cache', () => {
      const mockClearCache = vi.mocked(enterpriseI18n.clearCache)
      mockClearCache.mockReturnValue(undefined)
      
      enterpriseI18n.clearCache()
      
      expect(mockClearCache).toHaveBeenCalledTimes(1)
    })
  })

  describe('Metrics and Statistics', () => {
    it('should get performance metrics', () => {
      const mockMetrics = {
        averageLoadTime: 50,
        cacheHitRate: 0.8,
        errorRate: 0.02,
        memoryUsage: 1024,
        networkRequests: 10
      }
      
      const mockGetMetrics = vi.mocked(enterpriseI18n.getMetrics)
      mockGetMetrics.mockReturnValue(mockMetrics)
      
      const metrics = enterpriseI18n.getMetrics()
      
      expect(metrics).toEqual(mockMetrics)
      expect(mockGetMetrics).toHaveBeenCalledTimes(1)
    })

    it('should get error statistics', () => {
      const mockErrorStats = {
        totalErrors: 5,
        errorsByType: { 'NetworkError': 3, 'TranslationLoadError': 2 },
        errorsByLocale: { 'en': 3, 'vi': 2 },
        recentErrors: [],
        recoverySuccessRate: 0.8
      }
      
      const mockGetErrorStats = vi.mocked(enterpriseI18n.getErrorStats)
      mockGetErrorStats.mockReturnValue(mockErrorStats)
      
      const errorStats = enterpriseI18n.getErrorStats()
      
      expect(errorStats).toEqual(mockErrorStats)
      expect(mockGetErrorStats).toHaveBeenCalledTimes(1)
    })
  })

  describe('Observer Pattern', () => {
    it('should add and remove observers', () => {
      const mockObserver = {
        onLocaleChange: vi.fn(),
        onLoadingStart: vi.fn(),
        onLoadingComplete: vi.fn(),
        onError: vi.fn()
      }
      
      const mockAddObserver = vi.mocked(enterpriseI18n.addObserver)
      const mockRemoveObserver = vi.mocked(enterpriseI18n.removeObserver)
      
      enterpriseI18n.addObserver(mockObserver)
      enterpriseI18n.removeObserver(mockObserver)
      
      expect(mockAddObserver).toHaveBeenCalledWith(mockObserver)
      expect(mockRemoveObserver).toHaveBeenCalledWith(mockObserver)
    })
  })
})

// ============================================================================
// PINIA STORE TESTS
// ============================================================================

describe('Enterprise I18n Store', () => {
  let app: any
  let pinia: any
  let store: any

  beforeEach(() => {
    const testApp = createTestApp()
    app = testApp.app
    pinia = testApp.pinia
    
    store = useEnterpriseI18nStore()
  })

  afterEach(() => {
    if (app) {
      app.unmount()
    }
  })

  describe('Getters', () => {
    it('should get current locale', () => {
      expect(store.currentLocale).toBe('en')
    })

    it('should get loading state', () => {
      expect(store.isLoading).toBe(false)
    })

    it('should get loaded locales', () => {
      expect(store.loadedLocales).toEqual(['en'])
    })

    it('should get supported locales', () => {
      const supportedLocales = store.supportedLocales
      expect(supportedLocales).toHaveLength(2)
      expect(supportedLocales[0].code).toBe('en')
      expect(supportedLocales[1].code).toBe('vi')
    })

    it('should get current locale info', () => {
      const localeInfo = store.currentLocaleInfo
      expect(localeInfo).toBeDefined()
      expect(localeInfo?.code).toBe('en')
    })

    it('should check if locale is supported', () => {
      expect(store.isLocaleSupported('en')).toBe(true)
      expect(store.isLocaleSupported('vi')).toBe(true)
      expect(store.isLocaleSupported('invalid')).toBe(false)
    })

    it('should check if locale is loaded', () => {
      expect(store.isLocaleLoaded('en')).toBe(true)
      expect(store.isLocaleLoaded('vi')).toBe(false)
    })

    it('should get available locales for UI', () => {
      const availableLocales = store.availableLocales
      expect(availableLocales).toHaveLength(2)
      expect(availableLocales[0]).toHaveProperty('code')
      expect(availableLocales[0]).toHaveProperty('name')
      expect(availableLocales[0]).toHaveProperty('nativeName')
      expect(availableLocales[0]).toHaveProperty('flag')
      expect(availableLocales[0]).toHaveProperty('direction')
    })
  })

  describe('Actions', () => {
    it('should set locale successfully', async () => {
      const mockSetLocale = vi.mocked(enterpriseI18n.setLocale)
      mockSetLocale.mockResolvedValue(true)
      
      const result = await store.setLocale('vi')
      
      expect(result).toBe(true)
      expect(mockSetLocale).toHaveBeenCalledWith('vi')
    })

    it('should handle locale setting errors', async () => {
      const mockSetLocale = vi.mocked(enterpriseI18n.setLocale)
      mockSetLocale.mockRejectedValue(new Error('Unsupported locale'))
      
      await expect(store.setLocale('invalid')).rejects.toThrow('Unsupported locale')
    })

    it('should switch locale', async () => {
      const mockSetLocale = vi.mocked(enterpriseI18n.setLocale)
      mockSetLocale.mockResolvedValue(true)
      
      const result = await store.switchLocale('vi')
      
      expect(result).toBe(true)
      expect(mockSetLocale).toHaveBeenCalledWith('vi')
    })

    it('should return true when switching to current locale', async () => {
      const result = await store.switchLocale('en')
      
      expect(result).toBe(true)
      // Should not call setLocale since it's already current
    })

    it('should get translation', () => {
      const mockGetTranslation = vi.mocked(enterpriseI18n.getTranslation)
      mockGetTranslation.mockReturnValue('Hello')
      
      const result = store.getTranslation('common.hello')
      
      expect(result).toBe('Hello')
      expect(mockGetTranslation).toHaveBeenCalledWith('common.hello', undefined)
    })

    it('should preload locale', async () => {
      const mockPreloadLocale = vi.mocked(enterpriseI18n.preloadLocale)
      mockPreloadLocale.mockResolvedValue(undefined)
      
      await store.preloadLocale('vi')
      
      expect(mockPreloadLocale).toHaveBeenCalledWith('vi')
    })

    it('should preload multiple locales', async () => {
      const mockPreloadLocales = vi.mocked(enterpriseI18n.preloadLocales)
      mockPreloadLocales.mockResolvedValue(undefined)
      
      await store.preloadLocales(['vi', 'fr'])
      
      expect(mockPreloadLocales).toHaveBeenCalledWith(['vi', 'fr'])
    })

    it('should preload common locales', async () => {
      const mockPreloadLocales = vi.mocked(enterpriseI18n.preloadLocales)
      mockPreloadLocales.mockResolvedValue(undefined)
      
      await store.preloadCommonLocales()
      
      expect(mockPreloadLocales).toHaveBeenCalledWith(['en', 'vi'])
    })

    it('should clear cache', () => {
      const mockClearCache = vi.mocked(enterpriseI18n.clearCache)
      mockClearCache.mockReturnValue(undefined)
      
      store.clearCache()
      
      expect(mockClearCache).toHaveBeenCalledTimes(1)
    })

    it('should get cache statistics', () => {
      const mockMetrics = { cacheHitRate: 0.8 }
      const mockGetMetrics = vi.mocked(enterpriseI18n.getMetrics)
      mockGetMetrics.mockReturnValue(mockMetrics)
      
      const stats = store.getCacheStats()
      
      expect(stats).toEqual(mockMetrics)
    })

    it('should get performance metrics', () => {
      const mockMetrics = { averageLoadTime: 50 }
      const mockGetMetrics = vi.mocked(enterpriseI18n.getMetrics)
      mockGetMetrics.mockReturnValue(mockMetrics)
      
      const metrics = store.getMetrics()
      
      expect(metrics).toEqual(mockMetrics)
    })

    it('should get error statistics', () => {
      const mockErrorStats = { totalErrors: 5 }
      const mockGetErrorStats = vi.mocked(enterpriseI18n.getErrorStats)
      mockGetErrorStats.mockReturnValue(mockErrorStats)
      
      const errorStats = store.getErrorStats()
      
      expect(errorStats).toEqual(mockErrorStats)
    })

    it('should get comprehensive statistics', () => {
      const mockMetrics = { averageLoadTime: 50 }
      const mockErrorStats = { totalErrors: 5 }
      
      const mockGetMetrics = vi.mocked(enterpriseI18n.getMetrics)
      const mockGetErrorStats = vi.mocked(enterpriseI18n.getErrorStats)
      
      mockGetMetrics.mockReturnValue(mockMetrics)
      mockGetErrorStats.mockReturnValue(mockErrorStats)
      
      const stats = store.getStatistics()
      
      expect(stats).toHaveProperty('metrics')
      expect(stats).toHaveProperty('errorStats')
      expect(stats).toHaveProperty('cacheStats')
      expect(stats).toHaveProperty('currentLocale')
      expect(stats).toHaveProperty('loadedLocales')
      expect(stats).toHaveProperty('isLoading')
    })

    it('should add and remove observers', () => {
      const mockObserver = {
        onLocaleChange: vi.fn(),
        onLoadingStart: vi.fn(),
        onLoadingComplete: vi.fn(),
        onError: vi.fn()
      }
      
      const mockAddObserver = vi.mocked(enterpriseI18n.addObserver)
      const mockRemoveObserver = vi.mocked(enterpriseI18n.removeObserver)
      
      store.addObserver(mockObserver)
      store.removeObserver(mockObserver)
      
      expect(mockAddObserver).toHaveBeenCalledWith(mockObserver)
      expect(mockRemoveObserver).toHaveBeenCalledWith(mockObserver)
    })
  })

  describe('Utility Methods', () => {
    it('should check if locale is loading', () => {
      expect(store.isLocaleLoading('en')).toBe(false)
      expect(store.isLocaleLoading('vi')).toBe(false)
    })

    it('should get locale display name', () => {
      expect(store.getLocaleDisplayName('en')).toBe('English')
      expect(store.getLocaleDisplayName('vi')).toBe('Tiếng Việt')
      expect(store.getLocaleDisplayName('invalid')).toBe('invalid')
    })

    it('should get locale flag', () => {
      expect(store.getLocaleFlag('en')).toBe('🇺🇸')
      expect(store.getLocaleFlag('vi')).toBe('🇻🇳')
      expect(store.getLocaleFlag('invalid')).toBe('🌐')
    })

    it('should get locale direction', () => {
      expect(store.getLocaleDirection('en')).toBe('ltr')
      expect(store.getLocaleDirection('vi')).toBe('ltr')
      expect(store.getLocaleDirection('invalid')).toBe('ltr')
    })

    it('should format number according to locale', () => {
      const result = store.formatNumber(1234.56, 'en')
      expect(result).toBe('1,234.56')
    })

    it('should format date according to locale', () => {
      const date = new Date('2023-12-25')
      const result = store.formatDate(date, 'en')
      expect(result).toBe('12/25/2023')
    })

    it('should format currency according to locale', () => {
      const result = store.formatCurrency(1234.56, 'en')
      expect(result).toBe('$1,234.56')
    })
  })

  describe('Initialization and Destruction', () => {
    it('should initialize store', async () => {
      const mockInitialize = vi.mocked(enterpriseI18n.initialize)
      mockInitialize.mockResolvedValue(undefined)
      
      await store.initialize()
      
      expect(mockInitialize).toHaveBeenCalledTimes(1)
    })

    it('should handle initialization errors', async () => {
      const mockInitialize = vi.mocked(enterpriseI18n.initialize)
      mockInitialize.mockRejectedValue(new Error('Initialization failed'))
      
      await expect(store.initialize()).rejects.toThrow('Initialization failed')
    })

    it('should destroy store', () => {
      const mockDestroy = vi.mocked(enterpriseI18n.destroy)
      mockDestroy.mockReturnValue(undefined)
      
      store.destroy()
      
      expect(mockDestroy).toHaveBeenCalledTimes(1)
    })
  })
})

// ============================================================================
// REAL-WORLD SCENARIOS
// ============================================================================

describe('Real-World Scenarios', () => {
  let store: any

  beforeEach(() => {
    const testApp = createTestApp()
    store = useEnterpriseI18nStore()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should handle complete locale switching workflow', async () => {
    // Mock successful locale switching
    const mockSetLocale = vi.mocked(enterpriseI18n.setLocale)
    mockSetLocale.mockResolvedValue(true)
    
    // Switch locale
    const result = await store.switchLocale('vi')
    
    expect(result).toBe(true)
    expect(mockSetLocale).toHaveBeenCalledWith('vi')
  })

  it('should handle translation loading with fallback', () => {
    // Mock translation with fallback
    const mockGetTranslation = vi.mocked(enterpriseI18n.getTranslation)
    mockGetTranslation.mockReturnValue('common.hello') // Fallback to key
    
    const result = store.getTranslation('common.hello', 'vi')
    
    expect(result).toBe('common.hello')
  })

  it('should handle preloading workflow', async () => {
    // Mock preloading
    const mockPreloadLocales = vi.mocked(enterpriseI18n.preloadLocales)
    mockPreloadLocales.mockResolvedValue(undefined)
    
    // Preload common locales
    await store.preloadCommonLocales()
    
    expect(mockPreloadLocales).toHaveBeenCalledWith(['en', 'vi'])
  })

  it('should handle error scenarios gracefully', async () => {
    // Mock error in locale switching
    const mockSetLocale = vi.mocked(enterpriseI18n.setLocale)
    mockSetLocale.mockRejectedValue(new Error('Network error'))
    
    // Should handle error gracefully
    await expect(store.setLocale('vi')).rejects.toThrow('Network error')
  })

  it('should provide comprehensive monitoring data', () => {
    // Mock metrics and error stats
    const mockMetrics = {
      averageLoadTime: 45,
      cacheHitRate: 0.85,
      errorRate: 0.01,
      memoryUsage: 2048,
      networkRequests: 15
    }
    
    const mockErrorStats = {
      totalErrors: 3,
      errorsByType: { 'NetworkError': 2, 'TranslationLoadError': 1 },
      errorsByLocale: { 'en': 2, 'vi': 1 },
      recentErrors: [],
      recoverySuccessRate: 0.9
    }
    
    const mockGetMetrics = vi.mocked(enterpriseI18n.getMetrics)
    const mockGetErrorStats = vi.mocked(enterpriseI18n.getErrorStats)
    
    mockGetMetrics.mockReturnValue(mockMetrics)
    mockGetErrorStats.mockReturnValue(mockErrorStats)
    
    // Get comprehensive statistics
    const stats = store.getStatistics()
    
    expect(stats.metrics).toEqual(mockMetrics)
    expect(stats.errorStats).toEqual(mockErrorStats)
    expect(stats.cacheStats).toEqual(mockMetrics)
    expect(stats.currentLocale).toBe('en')
    expect(stats.loadedLocales).toEqual(['en'])
    expect(stats.isLoading).toBe(false)
  })
})
