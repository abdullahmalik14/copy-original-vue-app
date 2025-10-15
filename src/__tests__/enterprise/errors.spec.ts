/**
 * Enterprise I18n System - Error Handling Tests
 * 
 * Comprehensive tests for the error handling system including
 * custom error classes, recovery strategies, and error tracking.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import type { ErrorContext, ErrorRecoveryStrategy } from '@/i18n/enterprise/types'

import {
  I18nError,
  TranslationLoadError,
  TranslationKeyError,
  SectionLoadError,
  ModuleLoadError,
  NetworkError,
  CacheError,
  ConfigurationError,
  ErrorRecoveryManager,
  ErrorTracker,
  ErrorRecoveryExecutor,
  ErrorHandler
} from '@/i18n/enterprise/errors'

// ============================================================================
// CUSTOM ERROR CLASSES TESTS
// ============================================================================

describe('Custom Error Classes', () => {
  describe('I18nError', () => {
    it('should create error with context', () => {
      const context: ErrorContext = {
        locale: 'en',
        key: 'test.key',
        operation: 'test_operation',
        timestamp: Date.now()
      }
      
      const error = new I18nError('Test error', context)
      
      expect(error.message).toBe('Test error')
      expect(error.context).toEqual(context)
      expect(error.timestamp).toBeGreaterThan(0)
      expect(error.id).toMatch(/^i18n_\d+_[a-z0-9]+$/)
      expect(error.name).toBe('I18nError')
    })

    it('should include original error', () => {
      const originalError = new Error('Original error')
      const context: ErrorContext = {
        operation: 'test_operation',
        timestamp: Date.now()
      }
      
      const error = new I18nError('Test error', context, originalError)
      
      expect(error.cause).toBe(originalError)
      expect(error.stack).toBe(originalError.stack)
    })

    it('should serialize to JSON', () => {
      const context: ErrorContext = {
        locale: 'en',
        operation: 'test_operation',
        timestamp: Date.now()
      }
      
      const error = new I18nError('Test error', context)
      const json = error.toJSON()
      
      expect(json).toHaveProperty('id')
      expect(json).toHaveProperty('name', 'I18nError')
      expect(json).toHaveProperty('message', 'Test error')
      expect(json).toHaveProperty('context')
      expect(json).toHaveProperty('timestamp')
    })
  })

  describe('TranslationLoadError', () => {
    it('should create translation load error', () => {
      const error = new TranslationLoadError('en', 'Failed to load translations')
      
      expect(error.message).toBe('Failed to load translations')
      expect(error.context.locale).toBe('en')
      expect(error.context.operation).toBe('load_translation')
      expect(error.name).toBe('TranslationLoadError')
    })

    it('should include original error', () => {
      const originalError = new Error('Network error')
      const error = new TranslationLoadError('en', 'Failed to load', originalError)
      
      expect(error.cause).toBe(originalError)
    })
  })

  describe('TranslationKeyError', () => {
    it('should create translation key error', () => {
      const error = new TranslationKeyError('en', 'test.key', 'Key not found')
      
      expect(error.message).toBe('Key not found')
      expect(error.context.locale).toBe('en')
      expect(error.context.key).toBe('test.key')
      expect(error.context.operation).toBe('get_translation_key')
      expect(error.name).toBe('TranslationKeyError')
    })
  })

  describe('SectionLoadError', () => {
    it('should create section load error', () => {
      const error = new SectionLoadError('en', 'common', 'Section not found')
      
      expect(error.message).toBe('Section not found')
      expect(error.context.locale).toBe('en')
      expect(error.context.section).toBe('common')
      expect(error.context.operation).toBe('load_section')
      expect(error.name).toBe('SectionLoadError')
    })
  })

  describe('ModuleLoadError', () => {
    it('should create module load error', () => {
      const error = new ModuleLoadError('en', 'auth', 'Module not found')
      
      expect(error.message).toBe('Module not found')
      expect(error.context.locale).toBe('en')
      expect(error.context.module).toBe('auth')
      expect(error.context.operation).toBe('load_module')
      expect(error.name).toBe('ModuleLoadError')
    })
  })

  describe('NetworkError', () => {
    it('should create network error', () => {
      const error = new NetworkError('en', 'Network request failed')
      
      expect(error.message).toBe('Network request failed')
      expect(error.context.locale).toBe('en')
      expect(error.context.operation).toBe('network_request')
      expect(error.name).toBe('NetworkError')
    })
  })

  describe('CacheError', () => {
    it('should create cache error', () => {
      const error = new CacheError('cache_get', 'Cache operation failed')
      
      expect(error.message).toBe('Cache operation failed')
      expect(error.context.operation).toBe('cache_get')
      expect(error.name).toBe('CacheError')
    })
  })

  describe('ConfigurationError', () => {
    it('should create configuration error', () => {
      const error = new ConfigurationError('Invalid configuration')
      
      expect(error.message).toBe('Invalid configuration')
      expect(error.context.operation).toBe('configuration')
      expect(error.name).toBe('ConfigurationError')
    })
  })
})

// ============================================================================
// ERROR RECOVERY MANAGER TESTS
// ============================================================================

describe('ErrorRecoveryManager', () => {
  let recoveryManager: ErrorRecoveryManager

  beforeEach(() => {
    recoveryManager = ErrorRecoveryManager.getInstance()
  })

  it('should get default recovery strategies', () => {
    const networkError = new NetworkError('en', 'Network error')
    const strategy = recoveryManager.getRecoveryStrategy(networkError)
    
    expect(strategy.type).toBe('retry')
    expect(strategy.retryCount).toBe(3)
    expect(strategy.retryDelay).toBe(1000)
  })

  it('should get fallback strategy for translation load errors', () => {
    const loadError = new TranslationLoadError('en', 'Load failed')
    const strategy = recoveryManager.getRecoveryStrategy(loadError)
    
    expect(strategy.type).toBe('fallback')
    expect(strategy.fallbackLocale).toBe('en')
  })

  it('should get skip strategy for translation key errors', () => {
    const keyError = new TranslationKeyError('en', 'test.key', 'Key not found')
    const strategy = recoveryManager.getRecoveryStrategy(keyError)
    
    expect(strategy.type).toBe('skip')
  })

  it('should allow setting custom recovery strategies', () => {
    const customStrategy: ErrorRecoveryStrategy = {
      type: 'retry',
      retryCount: 5,
      retryDelay: 2000
    }
    
    recoveryManager.setRecoveryStrategy('custom', customStrategy)
    
    // Create a custom error that would use this strategy
    const customError = new I18nError('Custom error', {
      operation: 'custom_operation',
      timestamp: Date.now()
    })
    
    // Mock the getErrorType method to return 'custom'
    const originalGetErrorType = (recoveryManager as any).getErrorType
    vi.spyOn(recoveryManager as any, 'getErrorType').mockReturnValue('custom')
    
    const strategy = recoveryManager.getRecoveryStrategy(customError)
    
    expect(strategy.type).toBe('retry')
    expect(strategy.retryCount).toBe(5)
    expect(strategy.retryDelay).toBe(2000)
    
    vi.restoreAllMocks()
  })
})

// ============================================================================
// ERROR TRACKER TESTS
// ============================================================================

describe('ErrorTracker', () => {
  let errorTracker: ErrorTracker

  beforeEach(() => {
    errorTracker = ErrorTracker.getInstance()
    errorTracker.clearStatistics()
  })

  it('should track errors', () => {
    const error = new TranslationLoadError('en', 'Load failed')
    
    errorTracker.trackError(error)
    
    const stats = errorTracker.getStatistics()
    expect(stats.totalErrors).toBe(1)
    expect(stats.errorsByType['TranslationLoadError']).toBe(1)
    expect(stats.errorsByLocale['en']).toBe(1)
  })

  it('should track multiple errors', () => {
    const error1 = new TranslationLoadError('en', 'Load failed')
    const error2 = new TranslationKeyError('vi', 'test.key', 'Key not found')
    const error3 = new NetworkError('en', 'Network error')
    
    errorTracker.trackError(error1)
    errorTracker.trackError(error2)
    errorTracker.trackError(error3)
    
    const stats = errorTracker.getStatistics()
    expect(stats.totalErrors).toBe(3)
    expect(stats.errorsByType['TranslationLoadError']).toBe(1)
    expect(stats.errorsByType['TranslationKeyError']).toBe(1)
    expect(stats.errorsByType['NetworkError']).toBe(1)
    expect(stats.errorsByLocale['en']).toBe(2)
    expect(stats.errorsByLocale['vi']).toBe(1)
  })

  it('should track recovery attempts', () => {
    errorTracker.trackRecoveryAttempt(true)
    errorTracker.trackRecoveryAttempt(false)
    errorTracker.trackRecoveryAttempt(true)
    
    const stats = errorTracker.getStatistics()
    expect(stats.recoverySuccessRate).toBe(2/3) // 2 successes out of 3 attempts
  })

  it('should maintain error log', () => {
    const error = new TranslationLoadError('en', 'Load failed')
    
    errorTracker.trackError(error)
    
    const log = errorTracker.getErrorLog()
    expect(log).toHaveLength(1)
    expect(log[0].error).toBe(error)
    expect(log[0].context).toEqual(error.context)
  })

  it('should limit error log size', () => {
    // Create more errors than max log size
    for (let i = 0; i < 150; i++) {
      const error = new TranslationLoadError('en', `Error ${i}`)
      errorTracker.trackError(error)
    }
    
    const log = errorTracker.getErrorLog()
    expect(log.length).toBeLessThanOrEqual(100) // Default max size
  })

  it('should clear statistics', () => {
    const error = new TranslationLoadError('en', 'Load failed')
    errorTracker.trackError(error)
    errorTracker.trackRecoveryAttempt(true)
    
    errorTracker.clearStatistics()
    
    const stats = errorTracker.getStatistics()
    expect(stats.totalErrors).toBe(0)
    expect(stats.recoverySuccessRate).toBe(0)
    expect(errorTracker.getErrorLog()).toHaveLength(0)
  })
})

// ============================================================================
// ERROR RECOVERY EXECUTOR TESTS
// ============================================================================

describe('ErrorRecoveryExecutor', () => {
  let recoveryExecutor: ErrorRecoveryExecutor
  let mockRecoveryFunction: vi.Mock

  beforeEach(() => {
    recoveryExecutor = ErrorRecoveryExecutor.getInstance()
    mockRecoveryFunction = vi.fn()
  })

  it('should execute retry strategy', async () => {
    const error = new NetworkError('en', 'Network error')
    mockRecoveryFunction.mockResolvedValue(true)
    
    const result = await recoveryExecutor.executeRecovery(error, mockRecoveryFunction)
    
    expect(result).toBe(true)
    expect(mockRecoveryFunction).toHaveBeenCalledTimes(1)
  })

  it('should execute fallback strategy', async () => {
    const error = new TranslationLoadError('en', 'Load failed')
    mockRecoveryFunction.mockResolvedValue(true)
    
    const result = await recoveryExecutor.executeRecovery(error, mockRecoveryFunction)
    
    expect(result).toBe(true)
    expect(mockRecoveryFunction).toHaveBeenCalledTimes(1)
  })

  it('should execute skip strategy', async () => {
    const error = new TranslationKeyError('en', 'test.key', 'Key not found')
    mockRecoveryFunction.mockResolvedValue(false)
    
    const result = await recoveryExecutor.executeRecovery(error, mockRecoveryFunction)
    
    expect(result).toBe(true) // Skip always returns true
    expect(mockRecoveryFunction).not.toHaveBeenCalled()
  })

  it('should execute abort strategy', async () => {
    const error = new ConfigurationError('Invalid config')
    mockRecoveryFunction.mockResolvedValue(false)
    
    const result = await recoveryExecutor.executeRecovery(error, mockRecoveryFunction)
    
    expect(result).toBe(false) // Abort returns false
    expect(mockRecoveryFunction).not.toHaveBeenCalled()
  })

  it('should handle recovery function errors', async () => {
    const error = new NetworkError('en', 'Network error')
    mockRecoveryFunction.mockRejectedValue(new Error('Recovery failed'))
    
    const result = await recoveryExecutor.executeRecovery(error, mockRecoveryFunction)
    
    expect(result).toBe(false)
  })
})

// ============================================================================
// ERROR HANDLER TESTS
// ============================================================================

describe('ErrorHandler', () => {
  let errorHandler: ErrorHandler
  let mockRecoveryFunction: vi.Mock

  beforeEach(() => {
    errorHandler = ErrorHandler.getInstance()
    mockRecoveryFunction = vi.fn()
  })

  it('should handle errors with recovery', async () => {
    const error = new Error('Test error')
    const context = { locale: 'en', operation: 'test' }
    mockRecoveryFunction.mockResolvedValue(true)
    
    const result = await errorHandler.handleError(error, context, mockRecoveryFunction)
    
    expect(result).toBe(true)
  })

  it('should handle errors without recovery', async () => {
    const error = new Error('Test error')
    const context = { locale: 'en', operation: 'test' }
    
    const result = await errorHandler.handleError(error, context)
    
    expect(result).toBe(false)
  })

  it('should wrap regular errors as I18nError', async () => {
    const error = new Error('Test error')
    const context = { locale: 'en', operation: 'test' }
    
    await errorHandler.handleError(error, context)
    
    const stats = errorHandler.getStatistics()
    expect(stats.totalErrors).toBe(1)
  })

  it('should preserve I18nError instances', async () => {
    const i18nError = new TranslationLoadError('en', 'Load failed')
    const context = { locale: 'en', operation: 'test' }
    
    await errorHandler.handleError(i18nError, context)
    
    const stats = errorHandler.getStatistics()
    expect(stats.totalErrors).toBe(1)
    expect(stats.errorsByType['TranslationLoadError']).toBe(1)
  })

  it('should provide error statistics', () => {
    const error1 = new TranslationLoadError('en', 'Load failed')
    const error2 = new TranslationKeyError('vi', 'test.key', 'Key not found')
    
    errorHandler.handleError(error1, { locale: 'en', operation: 'load' })
    errorHandler.handleError(error2, { locale: 'vi', operation: 'get_key' })
    
    const stats = errorHandler.getStatistics()
    expect(stats.totalErrors).toBe(2)
    expect(stats.errorsByType['TranslationLoadError']).toBe(1)
    expect(stats.errorsByType['TranslationKeyError']).toBe(1)
    expect(stats.errorsByLocale['en']).toBe(1)
    expect(stats.errorsByLocale['vi']).toBe(1)
  })

  it('should clear error statistics', () => {
    const error = new TranslationLoadError('en', 'Load failed')
    errorHandler.handleError(error, { locale: 'en', operation: 'load' })
    
    errorHandler.clearStatistics()
    
    const stats = errorHandler.getStatistics()
    expect(stats.totalErrors).toBe(0)
  })
})

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('Error Handling Integration Tests', () => {
  let errorHandler: ErrorHandler

  beforeEach(() => {
    errorHandler = ErrorHandler.getInstance()
  })

  it('should handle complex error scenarios', async () => {
    // Simulate a complex error scenario
    const networkError = new Error('Network timeout')
    const context = { 
      locale: 'en', 
      key: 'test.key',
      section: 'common',
      operation: 'load_translation' 
    }
    
    const recoveryFunction = vi.fn().mockResolvedValue(true)
    
    const result = await errorHandler.handleError(networkError, context, recoveryFunction)
    
    expect(result).toBe(true)
    
    const stats = errorHandler.getStatistics()
    expect(stats.totalErrors).toBe(1)
  })

  it('should maintain error context across recovery', async () => {
    const error = new TranslationLoadError('en', 'Load failed')
    const context = { locale: 'en', operation: 'load' }
    
    await errorHandler.handleError(error, context)
    
    const log = errorHandler.getStatistics().recentErrors
    expect(log).toHaveLength(1)
    expect(log[0].locale).toBe('en')
    expect(log[0].operation).toBe('load')
  })

  it('should handle multiple concurrent errors', async () => {
    const errors = [
      new TranslationLoadError('en', 'Load failed'),
      new TranslationKeyError('vi', 'test.key', 'Key not found'),
      new NetworkError('fr', 'Network error')
    ]
    
    const promises = errors.map((error, index) => 
      errorHandler.handleError(error, { 
        locale: error.context.locale || 'unknown', 
        operation: `test_${index}` 
      })
    )
    
    await Promise.all(promises)
    
    const stats = errorHandler.getStatistics()
    expect(stats.totalErrors).toBe(3)
    expect(stats.errorsByType['TranslationLoadError']).toBe(1)
    expect(stats.errorsByType['TranslationKeyError']).toBe(1)
    expect(stats.errorsByType['NetworkError']).toBe(1)
  })
})
