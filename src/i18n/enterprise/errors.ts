/**
 * Enterprise I18n System - Error Handling
 * 
 * Comprehensive error handling system with custom error classes,
 * recovery strategies, and detailed error tracking for enterprise applications.
 */

import type {
  ErrorContext,
  ErrorRecoveryStrategy,
  ErrorStatistics,
  Locale,
  TranslationKey,
  Section,
  Module
} from './types'

// ============================================================================
// CUSTOM ERROR CLASSES
// ============================================================================

export class I18nError extends Error {
  public readonly context: ErrorContext
  public readonly timestamp: number
  public readonly id: string

  constructor(
    message: string,
    context: ErrorContext,
    originalError?: Error
  ) {
    super(message)
    this.name = this.constructor.name
    this.context = context
    this.timestamp = Date.now()
    this.id = this.generateErrorId()
    
    if (originalError) {
      this.cause = originalError
      this.stack = originalError.stack
    }
  }

  private generateErrorId(): string {
    return `i18n_${this.timestamp}_${Math.random().toString(36).substr(2, 9)}`
  }

  public toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      message: this.message,
      context: this.context,
      timestamp: this.timestamp,
      stack: this.stack,
      cause: this.cause
    }
  }
}

export class TranslationLoadError extends I18nError {
  constructor(
    locale: Locale,
    message: string,
    originalError?: Error
  ) {
    super(message, {
      locale,
      operation: 'load_translation',
      timestamp: Date.now()
    }, originalError)
  }
}

export class TranslationKeyError extends I18nError {
  constructor(
    locale: Locale,
    key: TranslationKey,
    message: string,
    originalError?: Error
  ) {
    super(message, {
      locale,
      key,
      operation: 'get_translation_key',
      timestamp: Date.now()
    }, originalError)
  }
}

export class SectionLoadError extends I18nError {
  constructor(
    locale: Locale,
    section: Section,
    message: string,
    originalError?: Error
  ) {
    super(message, {
      locale,
      section,
      operation: 'load_section',
      timestamp: Date.now()
    }, originalError)
  }
}

export class ModuleLoadError extends I18nError {
  constructor(
    locale: Locale,
    module: Module,
    message: string,
    originalError?: Error
  ) {
    super(message, {
      locale,
      module,
      operation: 'load_module',
      timestamp: Date.now()
    }, originalError)
  }
}

export class NetworkError extends I18nError {
  constructor(
    locale: Locale,
    message: string,
    originalError?: Error
  ) {
    super(message, {
      locale,
      operation: 'network_request',
      timestamp: Date.now()
    }, originalError)
  }
}

export class CacheError extends I18nError {
  constructor(
    operation: string,
    message: string,
    originalError?: Error
  ) {
    super(message, {
      operation,
      timestamp: Date.now()
    }, originalError)
  }
}

export class ConfigurationError extends I18nError {
  constructor(
    message: string,
    originalError?: Error
  ) {
    super(message, {
      operation: 'configuration',
      timestamp: Date.now()
    }, originalError)
  }
}

// ============================================================================
// ERROR RECOVERY STRATEGIES
// ============================================================================

export class ErrorRecoveryManager {
  private static instance: ErrorRecoveryManager
  private recoveryStrategies: Map<string, ErrorRecoveryStrategy> = new Map()

  static getInstance(): ErrorRecoveryManager {
    if (!ErrorRecoveryManager.instance) {
      ErrorRecoveryManager.instance = new ErrorRecoveryManager()
    }
    return ErrorRecoveryManager.instance
  }

  constructor() {
    this.initializeDefaultStrategies()
  }

  private initializeDefaultStrategies(): void {
    // Network error recovery
    this.recoveryStrategies.set('network', {
      type: 'retry',
      retryCount: 3,
      retryDelay: 1000
    })

    // Translation load error recovery
    this.recoveryStrategies.set('translation_load', {
      type: 'fallback',
      fallbackLocale: 'en'
    })

    // Translation key error recovery
    this.recoveryStrategies.set('translation_key', {
      type: 'skip'
    })

    // Cache error recovery
    this.recoveryStrategies.set('cache', {
      type: 'retry',
      retryCount: 1,
      retryDelay: 100
    })

    // Configuration error recovery
    this.recoveryStrategies.set('configuration', {
      type: 'abort'
    })
  }

  public getRecoveryStrategy(error: I18nError): ErrorRecoveryStrategy {
    const errorType = this.getErrorType(error)
    return this.recoveryStrategies.get(errorType) || {
      type: 'skip'
    }
  }

  public setRecoveryStrategy(errorType: string, strategy: ErrorRecoveryStrategy): void {
    this.recoveryStrategies.set(errorType, strategy)
  }

  private getErrorType(error: I18nError): string {
    if (error instanceof NetworkError) return 'network'
    if (error instanceof TranslationLoadError) return 'translation_load'
    if (error instanceof TranslationKeyError) return 'translation_key'
    if (error instanceof SectionLoadError) return 'section_load'
    if (error instanceof ModuleLoadError) return 'module_load'
    if (error instanceof CacheError) return 'cache'
    if (error instanceof ConfigurationError) return 'configuration'
    return 'unknown'
  }
}

// ============================================================================
// ERROR TRACKING & STATISTICS
// ============================================================================

export class ErrorTracker {
  private static instance: ErrorTracker
  private errorLog: Array<{ error: I18nError; context: ErrorContext }> = []
  private errorCounts: Map<string, number> = new Map()
  private localeErrorCounts: Map<Locale, number> = new Map()
  private recoverySuccessCount: number = 0
  private recoveryAttemptCount: number = 0
  private maxLogSize: number = 100

  static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker()
    }
    return ErrorTracker.instance
  }

  public trackError(error: I18nError): void {
    // Add to error log
    this.errorLog.push({ error, context: error.context })
    
    // Trim log if too large
    if (this.errorLog.length > this.maxLogSize) {
      this.errorLog.shift()
    }

    // Update error counts
    const errorType = error.constructor.name
    this.errorCounts.set(errorType, (this.errorCounts.get(errorType) || 0) + 1)

    // Update locale error counts
    if (error.context.locale) {
      this.localeErrorCounts.set(
        error.context.locale,
        (this.localeErrorCounts.get(error.context.locale) || 0) + 1
      )
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`[I18N Error] ${error.name}:`, error.message, error.context)
    }
  }

  public trackRecoveryAttempt(success: boolean): void {
    this.recoveryAttemptCount++
    if (success) {
      this.recoverySuccessCount++
    }
  }

  public getStatistics(): ErrorStatistics {
    const errorsByType: Record<string, number> = {}
    this.errorCounts.forEach((count, type) => {
      errorsByType[type] = count
    })

    const errorsByLocale: Record<Locale, number> = {}
    this.localeErrorCounts.forEach((count, locale) => {
      errorsByLocale[locale] = count
    })

    const recentErrors = this.errorLog
      .slice(-10)
      .map(entry => entry.context)

    const recoverySuccessRate = this.recoveryAttemptCount > 0
      ? this.recoverySuccessCount / this.recoveryAttemptCount
      : 0

    return {
      totalErrors: this.errorLog.length,
      errorsByType,
      errorsByLocale,
      recentErrors,
      recoverySuccessRate
    }
  }

  public clearStatistics(): void {
    this.errorLog = []
    this.errorCounts.clear()
    this.localeErrorCounts.clear()
    this.recoverySuccessCount = 0
    this.recoveryAttemptCount = 0
  }

  public getErrorLog(): Array<{ error: I18nError; context: ErrorContext }> {
    return [...this.errorLog]
  }
}

// ============================================================================
// ERROR RECOVERY EXECUTOR
// ============================================================================

export class ErrorRecoveryExecutor {
  private static instance: ErrorRecoveryExecutor
  private recoveryManager: ErrorRecoveryManager
  private errorTracker: ErrorTracker

  static getInstance(): ErrorRecoveryExecutor {
    if (!ErrorRecoveryExecutor.instance) {
      ErrorRecoveryExecutor.instance = new ErrorRecoveryExecutor()
    }
    return ErrorRecoveryExecutor.instance
  }

  constructor() {
    this.recoveryManager = ErrorRecoveryManager.getInstance()
    this.errorTracker = ErrorTracker.getInstance()
  }

  public async executeRecovery(
    error: I18nError,
    recoveryFunction: (strategy: ErrorRecoveryStrategy) => Promise<boolean>
  ): Promise<boolean> {
    const strategy = this.recoveryManager.getRecoveryStrategy(error)
    
    try {
      const success = await this.executeStrategy(strategy, recoveryFunction)
      this.errorTracker.trackRecoveryAttempt(success)
      return success
    } catch (recoveryError) {
      console.error('[I18N Recovery] Recovery failed:', recoveryError)
      this.errorTracker.trackRecoveryAttempt(false)
      return false
    }
  }

  private async executeStrategy(
    strategy: ErrorRecoveryStrategy,
    recoveryFunction: (strategy: ErrorRecoveryStrategy) => Promise<boolean>
  ): Promise<boolean> {
    switch (strategy.type) {
      case 'retry':
        return this.executeRetryStrategy(strategy, recoveryFunction)
      
      case 'fallback':
        return this.executeFallbackStrategy(strategy, recoveryFunction)
      
      case 'skip':
        return true // Skip error, continue execution
      
      case 'abort':
        return false // Abort operation
      
      default:
        return false
    }
  }

  private async executeRetryStrategy(
    strategy: ErrorRecoveryStrategy,
    recoveryFunction: (strategy: ErrorRecoveryStrategy) => Promise<boolean>
  ): Promise<boolean> {
    const maxRetries = strategy.retryCount || 3
    const retryDelay = strategy.retryDelay || 1000

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const success = await recoveryFunction(strategy)
        if (success) {
          return true
        }
      } catch (error) {
        console.warn(`[I18N Recovery] Retry attempt ${attempt} failed:`, error)
      }

      if (attempt < maxRetries) {
        await this.delay(retryDelay)
      }
    }

    return false
  }

  private async executeFallbackStrategy(
    strategy: ErrorRecoveryStrategy,
    recoveryFunction: (strategy: ErrorRecoveryStrategy) => Promise<boolean>
  ): Promise<boolean> {
    try {
      return await recoveryFunction(strategy)
    } catch (error) {
      console.warn('[I18N Recovery] Fallback strategy failed:', error)
      return false
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
}

// ============================================================================
// ERROR HANDLER FACADE
// ============================================================================

export class ErrorHandler {
  private static instance: ErrorHandler
  private recoveryExecutor: ErrorRecoveryExecutor
  private errorTracker: ErrorTracker

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler()
    }
    return ErrorHandler.instance
  }

  constructor() {
    this.recoveryExecutor = ErrorRecoveryExecutor.getInstance()
    this.errorTracker = ErrorTracker.getInstance()
  }

  public handleError(
    error: Error,
    context: Partial<ErrorContext>,
    recoveryFunction?: (strategy: ErrorRecoveryStrategy) => Promise<boolean>
  ): Promise<boolean> {
    const i18nError = this.wrapError(error, context)
    this.errorTracker.trackError(i18nError)

    if (recoveryFunction) {
      return this.recoveryExecutor.executeRecovery(i18nError, recoveryFunction)
    }

    return Promise.resolve(false)
  }

  public getStatistics(): ErrorStatistics {
    return this.errorTracker.getStatistics()
  }

  public clearStatistics(): void {
    this.errorTracker.clearStatistics()
  }

  private wrapError(error: Error, context: Partial<ErrorContext>): I18nError {
    const fullContext: ErrorContext = {
      operation: 'unknown',
      timestamp: Date.now(),
      ...context
    }

    if (error instanceof I18nError) {
      return error
    }

    // Determine error type based on context and error message
    if (context.locale && context.key) {
      return new TranslationKeyError(
        context.locale,
        context.key,
        error.message,
        error
      )
    }

    if (context.locale && context.section) {
      return new SectionLoadError(
        context.locale,
        context.section,
        error.message,
        error
      )
    }

    if (context.locale && context.module) {
      return new ModuleLoadError(
        context.locale,
        context.module,
        error.message,
        error
      )
    }

    if (context.locale) {
      return new TranslationLoadError(
        context.locale,
        error.message,
        error
      )
    }

    if (error.message.includes('network') || error.message.includes('fetch')) {
      return new NetworkError(
        context.locale || 'unknown',
        error.message,
        error
      )
    }

    return new I18nError(error.message, fullContext, error)
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  ErrorContext,
  ErrorRecoveryStrategy,
  ErrorStatistics
}
