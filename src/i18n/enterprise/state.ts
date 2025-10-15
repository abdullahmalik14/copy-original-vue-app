/**
 * Enterprise I18n System - State Management
 * 
 * Centralized state management with reactive updates,
 * observer pattern, and comprehensive state tracking.
 */

import { reactive, readonly, computed } from 'vue'
import type {
  I18nState,
  LoadingState,
  PerformanceMetrics,
  ErrorStatistics,
  Locale,
  I18nObserver,
  LoadingContext,
  LoadingResult
} from './types'

import { I18N_CONFIG } from './config'

// ============================================================================
// STATE MANAGER
// ============================================================================

export class I18nStateManager {
  private static instance: I18nStateManager
  private state: I18nState
  private observers: Set<I18nObserver> = new Set()

  static getInstance(): I18nStateManager {
    if (!I18nStateManager.instance) {
      I18nStateManager.instance = new I18nStateManager()
    }
    return I18nStateManager.instance
  }

  constructor() {
    this.state = reactive<I18nState>({
      currentLocale: I18N_CONFIG.defaultLocale,
      fallbackLocale: I18N_CONFIG.fallbackLocale,
      supportedLocales: I18N_CONFIG.supportedLocales,
      loadedLocales: [],
      loadingState: reactive({
        isLoading: false,
        loadingLocales: [],
        loadingSections: [],
        loadingModules: []
      }),
      metrics: {
        averageLoadTime: 0,
        cacheHitRate: 0,
        errorRate: 0,
        memoryUsage: 0,
        networkRequests: 0
      },
      errorStats: {
        totalErrors: 0,
        errorsByType: {},
        errorsByLocale: {},
        recentErrors: [],
        recoverySuccessRate: 0
      }
    })
  }

  // ============================================================================
  // STATE GETTERS
  // ============================================================================

  public get readonlyState(): DeepReadonly<I18nState> {
    return readonly(this.state)
  }

  public get currentLocale(): Locale {
    return this.state.currentLocale
  }

  public get fallbackLocale(): Locale {
    return this.state.fallbackLocale
  }

  public get supportedLocales(): readonly Locale[] {
    return this.state.supportedLocales
  }

  public get loadedLocales(): readonly Locale[] {
    return this.state.loadedLocales
  }

  public get isLoading(): boolean {
    return this.state.loadingState.isLoading
  }

  public get loadingState(): DeepReadonly<LoadingState> {
    return readonly(this.state.loadingState)
  }

  public get metrics(): DeepReadonly<PerformanceMetrics> {
    return readonly(this.state.metrics)
  }

  public get errorStats(): DeepReadonly<ErrorStatistics> {
    return readonly(this.state.errorStats)
  }

  // ============================================================================
  // STATE SETTERS
  // ============================================================================

  public setCurrentLocale(locale: Locale): void {
    if (!this.isLocaleSupported(locale)) {
      throw new Error(`Unsupported locale: ${locale}`)
    }

    const previousLocale = this.state.currentLocale
    this.state.currentLocale = locale

    // Notify observers
    this.notifyObservers('onLocaleChange', locale)

    // Save to localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferred-locale', locale)
    }
  }

  public addLoadedLocale(locale: Locale): void {
    if (!this.state.loadedLocales.includes(locale)) {
      this.state.loadedLocales = [...this.state.loadedLocales, locale]
    }
  }

  public removeLoadedLocale(locale: Locale): void {
    this.state.loadedLocales = this.state.loadedLocales.filter(l => l !== locale)
  }

  public setLoading(isLoading: boolean): void {
    this.state.loadingState.isLoading = isLoading
  }

  public addLoadingLocale(locale: Locale): void {
    if (!this.state.loadingState.loadingLocales.includes(locale)) {
      this.state.loadingState.loadingLocales = [...this.state.loadingState.loadingLocales, locale]
    }
  }

  public removeLoadingLocale(locale: Locale): void {
    this.state.loadingState.loadingLocales = this.state.loadingState.loadingLocales.filter(l => l !== locale)
  }

  public addLoadingSection(section: string): void {
    if (!this.state.loadingState.loadingSections.includes(section)) {
      this.state.loadingState.loadingSections = [...this.state.loadingState.loadingSections, section]
    }
  }

  public removeLoadingSection(section: string): void {
    this.state.loadingState.loadingSections = this.state.loadingState.loadingSections.filter(s => s !== section)
  }

  public addLoadingModule(module: string): void {
    if (!this.state.loadingState.loadingModules.includes(module)) {
      this.state.loadingState.loadingModules = [...this.state.loadingState.loadingModules, module]
    }
  }

  public removeLoadingModule(module: string): void {
    this.state.loadingState.loadingModules = this.state.loadingState.loadingModules.filter(m => m !== module)
  }

  // ============================================================================
  // METRICS MANAGEMENT
  // ============================================================================

  public updateMetrics(metrics: Partial<PerformanceMetrics>): void {
    this.state.metrics = {
      ...this.state.metrics,
      ...metrics
    }
  }

  public updateErrorStats(errorStats: Partial<ErrorStatistics>): void {
    this.state.errorStats = {
      ...this.state.errorStats,
      ...errorStats
    }
  }

  // ============================================================================
  // LOADING TRACKING
  // ============================================================================

  public startLoading(context: LoadingContext): void {
    this.setLoading(true)
    
    if (context.locale) {
      this.addLoadingLocale(context.locale)
    }
    
    if (context.section) {
      this.addLoadingSection(context.section)
    }
    
    if (context.module) {
      this.addLoadingModule(context.module)
    }

    this.notifyObservers('onLoadingStart', context)
  }

  public completeLoading(context: LoadingContext, result: LoadingResult): void {
    if (context.locale) {
      this.removeLoadingLocale(context.locale)
    }
    
    if (context.section) {
      this.removeLoadingSection(context.section)
    }
    
    if (context.module) {
      this.removeLoadingModule(context.module)
    }

    // Check if all loading is complete
    if (this.state.loadingState.loadingLocales.length === 0 &&
        this.state.loadingState.loadingSections.length === 0 &&
        this.state.loadingState.loadingModules.length === 0) {
      this.setLoading(false)
    }

    this.notifyObservers('onLoadingComplete', context, result)
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  public isLocaleSupported(locale: Locale): boolean {
    return this.state.supportedLocales.includes(locale)
  }

  public isLocaleLoaded(locale: Locale): boolean {
    return this.state.loadedLocales.includes(locale)
  }

  public isLocaleLoading(locale: Locale): boolean {
    return this.state.loadingState.loadingLocales.includes(locale)
  }

  public getInitialLocale(): Locale {
    try {
      // Try localStorage first
      if (typeof localStorage !== 'undefined') {
        const saved = localStorage.getItem('preferred-locale')
        if (saved && this.isLocaleSupported(saved)) {
          console.log(`[I18N] Using saved locale from localStorage: ${saved}`)
          return saved
        }
      }

      // Always return default locale for first visit
      // Browser language detection is disabled to ensure Vietnamese default
      console.log(`[I18N] Using default locale: ${I18N_CONFIG.defaultLocale}`)
      return I18N_CONFIG.defaultLocale
    } catch (error) {
      console.error('[I18N] Error detecting initial locale:', error)
      return I18N_CONFIG.defaultLocale
    }
  }

  // ============================================================================
  // OBSERVER PATTERN
  // ============================================================================

  public addObserver(observer: I18nObserver): void {
    this.observers.add(observer)
  }

  public removeObserver(observer: I18nObserver): void {
    this.observers.delete(observer)
  }

  private notifyObservers(method: keyof I18nObserver, ...args: any[]): void {
    this.observers.forEach(observer => {
      try {
        const fn = observer[method] as Function
        if (typeof fn === 'function') {
          fn.apply(observer, args)
        }
      } catch (error) {
        console.error(`[I18N] Observer notification failed for ${method}:`, error)
      }
    })
  }

  // ============================================================================
  // STATE RESET
  // ============================================================================

  public reset(): void {
    this.state.currentLocale = I18N_CONFIG.defaultLocale
    this.state.loadedLocales = []
    this.state.loadingState.isLoading = false
    this.state.loadingState.loadingLocales = []
    this.state.loadingState.loadingSections = []
    this.state.loadingState.loadingModules = []
    this.state.metrics = {
      averageLoadTime: 0,
      cacheHitRate: 0,
      errorRate: 0,
      memoryUsage: 0,
      networkRequests: 0
    }
    this.state.errorStats = {
      totalErrors: 0,
      errorsByType: {},
      errorsByLocale: {},
      recentErrors: [],
      recoverySuccessRate: 0
    }
  }

  // ============================================================================
  // COMPUTED PROPERTIES
  // ============================================================================

  public get computedState() {
    return {
      currentLocale: computed(() => this.state.currentLocale),
      isLoading: computed(() => this.state.loadingState.isLoading),
      loadedLocales: computed(() => this.state.loadedLocales),
      supportedLocales: computed(() => this.state.supportedLocales),
      metrics: computed(() => this.state.metrics),
      errorStats: computed(() => this.state.errorStats)
    }
  }
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// ============================================================================
// EXPORTS
// ============================================================================

export type {
  I18nState,
  LoadingState,
  PerformanceMetrics,
  ErrorStatistics,
  Locale,
  I18nObserver,
  LoadingContext,
  LoadingResult
}
