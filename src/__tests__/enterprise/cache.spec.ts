/**
 * Enterprise I18n System - Cache Tests
 * 
 * Comprehensive tests for the caching system including
 * memory cache, LRU cache, and translation cache manager.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { CacheConfig } from '@/i18n/enterprise/types'

import {
  CacheEntryImpl,
  MemoryCacheStrategy,
  LRUCacheStrategy,
  TranslationCacheManager
} from '@/i18n/enterprise/cache'

// ============================================================================
// TEST CONFIGURATION
// ============================================================================

const testCacheConfig: CacheConfig = {
  maxSize: 5,
  ttl: 1000, // 1 second for tests
  enableMemoryCache: true,
  enableNetworkCache: false,
  cleanupInterval: 100
}

// ============================================================================
// CACHE ENTRY TESTS
// ============================================================================

describe('CacheEntryImpl', () => {
  it('should create cache entry with data and timestamp', () => {
    const data = { test: 'value' }
    const entry = new CacheEntryImpl(data, 1000)

    expect(entry.data).toEqual(data)
    expect(entry.timestamp).toBeGreaterThan(0)
    expect(entry.ttl).toBe(1000)
    expect(entry.hits).toBe(0)
  })

  it('should track hits correctly', () => {
    const entry = new CacheEntryImpl({ test: 'value' })
    
    entry.incrementHits()
    entry.incrementHits()
    
    expect(entry.hits).toBe(2)
  })

  it('should detect expired entries', () => {
    const entry = new CacheEntryImpl({ test: 'value' }, 100)
    
    expect(entry.isExpired()).toBe(false)
    
    // Mock time to make entry expired
    vi.useFakeTimers()
    vi.advanceTimersByTime(200)
    
    expect(entry.isExpired()).toBe(true)
    
    vi.useRealTimers()
  })

  it('should calculate age correctly', () => {
    const entry = new CacheEntryImpl({ test: 'value' })
    const initialAge = entry.getAge()
    
    expect(initialAge).toBeGreaterThanOrEqual(0)
    
    // Wait a bit and check age increased
    setTimeout(() => {
      expect(entry.getAge()).toBeGreaterThan(initialAge)
    }, 10)
  })

  it('should calculate hit rate correctly', () => {
    const entry = new CacheEntryImpl({ test: 'value' })
    
    entry.incrementHits()
    entry.incrementHits()
    
    const hitRate = entry.getHitRate()
    expect(hitRate).toBeGreaterThan(0)
  })
})

// ============================================================================
// MEMORY CACHE STRATEGY TESTS
// ============================================================================

describe('MemoryCacheStrategy', () => {
  let cache: MemoryCacheStrategy

  beforeEach(() => {
    cache = new MemoryCacheStrategy(testCacheConfig)
  })

  afterEach(() => {
    cache.destroy()
  })

  it('should store and retrieve data', () => {
    const data = { test: 'value' }
    
    cache.set('key1', data)
    const retrieved = cache.get('key1')
    
    expect(retrieved).not.toBeNull()
    expect(retrieved!.data).toEqual(data)
    expect(retrieved!.hits).toBe(1)
  })

  it('should return null for non-existent keys', () => {
    const result = cache.get('nonexistent')
    expect(result).toBeNull()
  })

  it('should check if key exists', () => {
    cache.set('key1', { test: 'value' })
    
    expect(cache.has('key1')).toBe(true)
    expect(cache.has('nonexistent')).toBe(false)
  })

  it('should evict least used entries when full', () => {
    // Fill cache to max size
    for (let i = 0; i < testCacheConfig.maxSize; i++) {
      cache.set(`key${i}`, { value: i })
    }
    
    // Access some keys to make them "used"
    cache.get('key0')
    cache.get('key1')
    
    // Add one more entry to trigger eviction
    cache.set('newkey', { value: 'new' })
    
    // key2 should be evicted (least used)
    expect(cache.has('key2')).toBe(false)
    expect(cache.has('key0')).toBe(true)
    expect(cache.has('key1')).toBe(true)
    expect(cache.has('newkey')).toBe(true)
  })

  it('should clear all entries', () => {
    cache.set('key1', { test: 'value1' })
    cache.set('key2', { test: 'value2' })
    
    expect(cache.has('key1')).toBe(true)
    expect(cache.has('key2')).toBe(true)
    
    cache.clear()
    
    expect(cache.has('key1')).toBe(false)
    expect(cache.has('key2')).toBe(false)
  })

  it('should cleanup expired entries', () => {
    cache.set('key1', { test: 'value1' }, 100) // Short TTL
    
    expect(cache.has('key1')).toBe(true)
    
    // Wait for expiration
    vi.useFakeTimers()
    vi.advanceTimersByTime(200)
    
    cache.cleanup()
    
    expect(cache.has('key1')).toBe(false)
    
    vi.useRealTimers()
  })

  it('should provide cache statistics', () => {
    cache.set('key1', { test: 'value1' })
    cache.set('key2', { test: 'value2' })
    cache.get('key1') // Hit
    
    const stats = cache.getStats()
    
    expect(stats.size).toBe(2)
    expect(stats.maxSize).toBe(testCacheConfig.maxSize)
    expect(stats.hitRate).toBeGreaterThan(0)
    expect(stats.memoryUsage).toBeGreaterThan(0)
  })
})

// ============================================================================
// LRU CACHE STRATEGY TESTS
// ============================================================================

describe('LRUCacheStrategy', () => {
  let cache: LRUCacheStrategy

  beforeEach(() => {
    cache = new LRUCacheStrategy(testCacheConfig)
  })

  afterEach(() => {
    cache.destroy()
  })

  it('should store and retrieve data', () => {
    const data = { test: 'value' }
    
    cache.set('key1', data)
    const retrieved = cache.get('key1')
    
    expect(retrieved).not.toBeNull()
    expect(retrieved!.data).toEqual(data)
  })

  it('should move accessed items to end (most recently used)', () => {
    // Fill cache
    cache.set('key1', { value: 1 })
    cache.set('key2', { value: 2 })
    cache.set('key3', { value: 3 })
    
    // Access key1 to make it most recently used
    cache.get('key1')
    
    // Add new entry to trigger eviction
    cache.set('key4', { value: 4 })
    
    // key2 should be evicted (least recently used)
    expect(cache.has('key2')).toBe(false)
    expect(cache.has('key1')).toBe(true)
    expect(cache.has('key3')).toBe(true)
    expect(cache.has('key4')).toBe(true)
  })

  it('should evict oldest entries when full', () => {
    // Fill cache to max size
    for (let i = 0; i < testCacheConfig.maxSize; i++) {
      cache.set(`key${i}`, { value: i })
    }
    
    // Add one more entry
    cache.set('newkey', { value: 'new' })
    
    // First key should be evicted
    expect(cache.has('key0')).toBe(false)
    expect(cache.has('newkey')).toBe(true)
  })

  it('should provide cache statistics', () => {
    cache.set('key1', { test: 'value1' })
    cache.set('key2', { test: 'value2' })
    cache.get('key1')
    
    const stats = cache.getStats()
    
    expect(stats.size).toBe(2)
    expect(stats.maxSize).toBe(testCacheConfig.maxSize)
    expect(stats.hitRate).toBeGreaterThan(0)
    expect(stats.memoryUsage).toBeGreaterThan(0)
  })
})

// ============================================================================
// TRANSLATION CACHE MANAGER TESTS
// ============================================================================

describe('TranslationCacheManager', () => {
  let cacheManager: TranslationCacheManager

  beforeEach(() => {
    cacheManager = TranslationCacheManager.getInstance(testCacheConfig)
  })

  afterEach(() => {
    cacheManager.destroy()
  })

  it('should cache locale translations', () => {
    const translations = {
      common: { hello: 'Hello', goodbye: 'Goodbye' },
      auth: { login: 'Login', logout: 'Logout' }
    }
    
    cacheManager.setLocaleCache('en', translations)
    
    const cached = cacheManager.getLocaleCache('en')
    expect(cached).not.toBeNull()
    expect(cached!.data).toEqual(translations)
  })

  it('should cache section translations', () => {
    const sectionData = { hello: 'Hello', goodbye: 'Goodbye' }
    
    cacheManager.setSectionCache('en', 'common', sectionData)
    
    const cached = cacheManager.getSectionCache('en', 'common')
    expect(cached).not.toBeNull()
    expect(cached!.data).toEqual(sectionData)
  })

  it('should cache individual keys', () => {
    cacheManager.setKeyCache('en', 'common.hello', 'Hello')
    
    const cached = cacheManager.getKeyCache('en', 'common.hello')
    expect(cached).not.toBeNull()
    expect(cached!.data).toBe('Hello')
  })

  it('should check if caches exist', () => {
    cacheManager.setLocaleCache('en', { test: 'value' })
    cacheManager.setSectionCache('en', 'common', { hello: 'Hello' })
    cacheManager.setKeyCache('en', 'common.hello', 'Hello')
    
    expect(cacheManager.hasLocaleCache('en')).toBe(true)
    expect(cacheManager.hasSectionCache('en', 'common')).toBe(true)
    expect(cacheManager.hasKeyCache('en', 'common.hello')).toBe(true)
    
    expect(cacheManager.hasLocaleCache('vi')).toBe(false)
    expect(cacheManager.hasSectionCache('en', 'auth')).toBe(false)
    expect(cacheManager.hasKeyCache('en', 'common.goodbye')).toBe(false)
  })

  it('should clear all caches', () => {
    cacheManager.setLocaleCache('en', { test: 'value' })
    cacheManager.setSectionCache('en', 'common', { hello: 'Hello' })
    cacheManager.setKeyCache('en', 'common.hello', 'Hello')
    
    cacheManager.clearAll()
    
    expect(cacheManager.hasLocaleCache('en')).toBe(false)
    expect(cacheManager.hasSectionCache('en', 'common')).toBe(false)
    expect(cacheManager.hasKeyCache('en', 'common.hello')).toBe(false)
  })

  it('should clear locale-specific caches', () => {
    cacheManager.setLocaleCache('en', { test: 'value' })
    cacheManager.setSectionCache('en', 'common', { hello: 'Hello' })
    cacheManager.setKeyCache('en', 'common.hello', 'Hello')
    
    cacheManager.setLocaleCache('vi', { test: 'giá trị' })
    cacheManager.setSectionCache('vi', 'common', { hello: 'Xin chào' })
    
    cacheManager.clearLocale('en')
    
    expect(cacheManager.hasLocaleCache('en')).toBe(false)
    expect(cacheManager.hasSectionCache('en', 'common')).toBe(false)
    expect(cacheManager.hasKeyCache('en', 'common.hello')).toBe(false)
    
    // Vietnamese caches should still exist
    expect(cacheManager.hasLocaleCache('vi')).toBe(true)
    expect(cacheManager.hasSectionCache('vi', 'common')).toBe(true)
  })

  it('should cleanup expired entries', () => {
    cacheManager.setLocaleCache('en', { test: 'value' }, 100) // Short TTL
    
    expect(cacheManager.hasLocaleCache('en')).toBe(true)
    
    // Wait for expiration
    vi.useFakeTimers()
    vi.advanceTimersByTime(200)
    
    cacheManager.cleanup()
    
    expect(cacheManager.hasLocaleCache('en')).toBe(false)
    
    vi.useRealTimers()
  })

  it('should provide comprehensive statistics', () => {
    cacheManager.setLocaleCache('en', { test: 'value' })
    cacheManager.setSectionCache('en', 'common', { hello: 'Hello' })
    cacheManager.setKeyCache('en', 'common.hello', 'Hello')
    
    const stats = cacheManager.getStats()
    
    expect(stats.locale).toBeDefined()
    expect(stats.section).toBeDefined()
    expect(stats.key).toBeDefined()
    expect(stats.total).toBeDefined()
    
    expect(stats.total.size).toBeGreaterThan(0)
    expect(stats.total.hitRate).toBeGreaterThanOrEqual(0)
    expect(stats.total.memoryUsage).toBeGreaterThan(0)
  })
})

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('Cache Integration Tests', () => {
  let cacheManager: TranslationCacheManager

  beforeEach(() => {
    cacheManager = TranslationCacheManager.getInstance(testCacheConfig)
  })

  afterEach(() => {
    cacheManager.destroy()
  })

  it('should handle complex translation data', () => {
    const complexTranslations = {
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
    }
    
    cacheManager.setLocaleCache('en', complexTranslations)
    
    const cached = cacheManager.getLocaleCache('en')
    expect(cached).not.toBeNull()
    expect(cached!.data).toEqual(complexTranslations)
  })

  it('should handle cache eviction under load', () => {
    // Fill cache with many entries
    for (let i = 0; i < 10; i++) {
      cacheManager.setKeyCache('en', `key${i}`, `value${i}`)
    }
    
    // Check that some entries were evicted
    const stats = cacheManager.getStats()
    expect(stats.total.size).toBeLessThanOrEqual(testCacheConfig.maxSize * 2)
  })

  it('should maintain cache consistency across operations', () => {
    // Set locale cache
    cacheManager.setLocaleCache('en', { common: { hello: 'Hello' } })
    
    // Set section cache
    cacheManager.setSectionCache('en', 'common', { hello: 'Hello' })
    
    // Set key cache
    cacheManager.setKeyCache('en', 'common.hello', 'Hello')
    
    // All should be consistent
    expect(cacheManager.hasLocaleCache('en')).toBe(true)
    expect(cacheManager.hasSectionCache('en', 'common')).toBe(true)
    expect(cacheManager.hasKeyCache('en', 'common.hello')).toBe(true)
    
    // Clear all
    cacheManager.clearAll()
    
    // All should be cleared
    expect(cacheManager.hasLocaleCache('en')).toBe(false)
    expect(cacheManager.hasSectionCache('en', 'common')).toBe(false)
    expect(cacheManager.hasKeyCache('en', 'common.hello')).toBe(false)
  })
})
