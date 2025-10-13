/**
 * Analytics Service
 * Comprehensive analytics and monitoring service for user behavior and performance tracking
 */

import { 
  AnalyticsEvent, 
  DeviceInfo, 
  PageInfo, 
  UserInfo,
  PerformanceMetrics,
  UserSession,
  ConversionEvent,
  ErrorEvent,
  ABTestResult
} from './types';

// ============================================================================
// ANALYTICS SERVICE CLASS
// ============================================================================

export class AnalyticsService {
  private sessionId: string;
  private userId?: string;
  private deviceInfo: DeviceInfo;
  private pageInfo: PageInfo;
  private sessionStartTime: number;
  private eventQueue: AnalyticsEvent[] = [];
  private isInitialized: boolean = false;
  private config: AnalyticsConfig;

  constructor(config: AnalyticsConfig) {
    this.config = config;
    // Initialize with safe defaults for SSR
    this.sessionId = '';
    this.sessionStartTime = 0;
    this.deviceInfo = this.getDefaultDeviceInfo();
    this.pageInfo = this.getDefaultPageInfo();
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    // Only initialize client-side to avoid hydration mismatches
    if (typeof window === 'undefined') return;

    try {
      // Initialize client-side specific data
      this.sessionId = this.generateSessionId();
      this.sessionStartTime = typeof window !== 'undefined' ? Date.now() : 0;
      this.deviceInfo = this.detectDevice();
      this.pageInfo = this.getPageInfo();
      
      // Initialize tracking
      await this.initializeTracking();
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Track page view
      await this.trackPageView();
      
      // Set up performance monitoring
      this.setupPerformanceMonitoring();
      
      this.isInitialized = true;
      
      // Send queued events
      await this.flushEventQueue();
    } catch (error) {
      console.error('Analytics initialization failed:', error);
    }
  }

  private async initializeTracking(): Promise<void> {
    // Initialize Google Analytics if configured
    if (this.config.googleAnalytics?.measurementId) {
      await this.initializeGoogleAnalytics();
    }

    // Initialize custom tracking
    if (this.config.customEndpoint) {
      await this.initializeCustomTracking();
    }
  }

  private async initializeGoogleAnalytics(): Promise<void> {
    if (typeof window === 'undefined') return;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.googleAnalytics!.measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer!.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', this.config.googleAnalytics!.measurementId, {
      anonymize_ip: this.config.googleAnalytics!.anonymizeIp,
      respect_dnt: this.config.googleAnalytics!.respectDnt,
    });
  }

  private async initializeCustomTracking(): Promise<void> {
    // Initialize custom analytics endpoint
    console.log('Custom analytics tracking initialized');
  }

  // ============================================================================
  // EVENT TRACKING
  // ============================================================================

  public async trackEvent(
    event: string,
    category: string,
    action: string,
    label?: string,
    value?: number,
    properties?: Record<string, any>
  ): Promise<void> {
    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      label,
      value,
      properties,
      timestamp: typeof window !== 'undefined' ? Date.now() : 0,
      sessionId: this.sessionId,
      userId: this.userId,
      deviceInfo: this.deviceInfo,
      pageInfo: this.pageInfo,
      userAgent: navigator.userAgent,
      referrer: document.referrer,
    };

    // Add to queue
    this.eventQueue.push(analyticsEvent);

    // Send immediately if initialized, otherwise queue
    if (this.isInitialized) {
      await this.sendEvent(analyticsEvent);
    }
  }

  public async trackPageView(
    url?: string,
    title?: string,
    customProperties?: Record<string, any>
  ): Promise<void> {
    const currentUrl = url || window.location.href;
    const currentTitle = title || document.title;

    await this.trackEvent(
      'page_view',
      'navigation',
      'view',
      currentUrl,
      undefined,
      {
        page_title: currentTitle,
        page_url: currentUrl,
        page_path: window.location.pathname,
        ...customProperties,
      }
    );
  }

  public async trackConversion(
    goalId: string,
    goalName: string,
    value: number,
    properties?: Record<string, any>
  ): Promise<void> {
    const conversionEvent: ConversionEvent = {
      goalId,
      goalName,
      value,
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: typeof window !== 'undefined' ? Date.now() : 0,
      properties,
    };

    await this.trackEvent(
      'conversion',
      'goal',
      'complete',
      goalName,
      value,
      properties
    );

    // Send conversion to external services
    await this.sendConversion(conversionEvent);
  }

  public async trackError(
    error: Error,
    context?: Record<string, any>
  ): Promise<void> {
    const errorEvent: ErrorEvent = {
      id: this.generateErrorId(),
      type: 'javascript',
      message: error.message,
      stack: error.stack,
      severity: 'medium',
      category: 'javascript_error',
      userId: this.userId,
      sessionId: this.sessionId,
      timestamp: typeof window !== 'undefined' ? Date.now() : 0,
      url: window.location.href,
      userAgent: navigator.userAgent,
      deviceInfo: this.deviceInfo,
      context: {
        component: context?.component,
        action: context?.action,
        properties: context,
      },
      resolved: false,
    };

    await this.trackEvent(
      'error',
      'exception',
      'javascript_error',
      error.message,
      undefined,
      context
    );

    // Send error to external services
    await this.sendError(errorEvent);
  }

  // ============================================================================
  // USER TRACKING
  // ============================================================================

  public setUserId(userId: string): void {
    this.userId = userId;
    
    // Update Google Analytics user ID
    if (this.config.googleAnalytics && window.gtag) {
      window.gtag('config', this.config.googleAnalytics.measurementId, {
        user_id: userId,
      });
    }
  }

  public setUserProperties(properties: Record<string, any>): void {
    if (this.config.googleAnalytics && window.gtag) {
      window.gtag('config', this.config.googleAnalytics.measurementId, {
        custom_map: properties,
      });
    }
  }

  public async trackUserEngagement(
    action: string,
    element?: string,
    properties?: Record<string, any>
  ): Promise<void> {
    await this.trackEvent(
      'engagement',
      'user_interaction',
      action,
      element,
      undefined,
      properties
    );
  }

  // ============================================================================
  // PERFORMANCE TRACKING
  // ============================================================================

  public async trackPerformance(metrics: PerformanceMetrics): Promise<void> {
    await this.trackEvent(
      'performance',
      'web_vitals',
      'measure',
      'core_web_vitals',
      undefined,
      metrics
    );

    // Send to Google Analytics
    if (this.config.googleAnalytics && window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: 'Core Web Vitals',
        value: Math.round(metrics.largestContentfulPaint),
        custom_map: {
          first_contentful_paint: metrics.firstContentfulPaint,
          largest_contentful_paint: metrics.largestContentfulPaint,
          first_input_delay: metrics.firstInputDelay,
          cumulative_layout_shift: metrics.cumulativeLayoutShift,
          time_to_interactive: metrics.timeToInteractive,
        },
      });
    }
  }

  private setupPerformanceMonitoring(): void {
    if (typeof window === 'undefined') return;

    // Track Core Web Vitals
    this.trackCoreWebVitals();
    
    // Track page load performance
    this.trackPageLoadPerformance();
    
    // Track resource loading
    this.trackResourceLoading();
  }

  private trackCoreWebVitals(): void {
    // First Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.trackPerformance({
              firstContentfulPaint: entry.startTime,
            } as PerformanceMetrics);
          }
        }
      });
      observer.observe({ entryTypes: ['paint'] });
    }

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.trackPerformance({
          largestContentfulPaint: lastEntry.startTime,
        } as PerformanceMetrics);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    // First Input Delay
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const inputEntry = entry as any;
          this.trackPerformance({
            firstInputDelay: inputEntry.processingStart - inputEntry.startTime,
          } as PerformanceMetrics);
        }
      });
      observer.observe({ entryTypes: ['first-input'] });
    }

    // Cumulative Layout Shift
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as any;
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
          }
        }
        this.trackPerformance({
          cumulativeLayoutShift: clsValue,
        } as PerformanceMetrics);
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  private trackPageLoadPerformance(): void {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      this.trackPerformance({
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        timeToFirstByte: navigation.responseStart - navigation.requestStart,
      } as PerformanceMetrics);
    });
  }

  private trackResourceLoading(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming;
          
          this.trackEvent(
            'resource_load',
            'performance',
            'load',
            resourceEntry.name,
            resourceEntry.duration,
            {
              resource_type: resourceEntry.initiatorType,
              resource_size: resourceEntry.transferSize,
              resource_duration: resourceEntry.duration,
            }
          );
        }
      });
      observer.observe({ entryTypes: ['resource'] });
    }
  }

  // ============================================================================
  // A/B TESTING
  // ============================================================================

  public async trackABTest(
    testId: string,
    variantId: string,
    result: ABTestResult
  ): Promise<void> {
    await this.trackEvent(
      'ab_test',
      'experimentation',
      'variant_assigned',
      testId,
      undefined,
      {
        test_id: testId,
        variant_id: variantId,
        conversions: result.conversions,
        revenue: result.revenue,
        custom_metrics: result.customMetrics,
      }
    );
  }

  // ============================================================================
  // SESSION MANAGEMENT
  // ============================================================================

  public getSessionId(): string {
    return this.sessionId;
  }

  public getUserId(): string | undefined {
    return this.userId;
  }

  public async endSession(): Promise<void> {
    const sessionDuration = Date.now() - this.sessionStartTime;
    
    await this.trackEvent(
      'session_end',
      'session',
      'end',
      undefined,
      sessionDuration,
      {
        session_duration: sessionDuration,
        page_views: this.eventQueue.filter(e => e.event === 'page_view').length,
        events: this.eventQueue.length,
      }
    );

    // Send session data
    await this.sendSessionData();
  }

  // ============================================================================
  // DATA SENDING
  // ============================================================================

  private async sendEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // Send to Google Analytics
      if (this.config.googleAnalytics && window.gtag) {
        window.gtag('event', event.action, {
          event_category: event.category,
          event_label: event.label,
          value: event.value,
          custom_map: event.properties,
        });
      }

      // Send to custom endpoint
      if (this.config.customEndpoint) {
        await this.sendToCustomEndpoint(event);
      }

      // Send to internal analytics
      if (this.config.internalEndpoint) {
        await this.sendToInternalEndpoint(event);
      }
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  }

  private async sendToCustomEndpoint(event: AnalyticsEvent): Promise<void> {
    if (!this.config.customEndpoint) return;

    try {
      await fetch(this.config.customEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Failed to send to custom endpoint:', error);
    }
  }

  private async sendToInternalEndpoint(event: AnalyticsEvent): Promise<void> {
    if (!this.config.internalEndpoint) return;

    try {
      await fetch(this.config.internalEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      });
    } catch (error) {
      console.error('Failed to send to internal endpoint:', error);
    }
  }

  private async sendConversion(conversion: ConversionEvent): Promise<void> {
    // Send conversion to external services
    console.log('Conversion tracked:', conversion);
  }

  private async sendError(error: ErrorEvent): Promise<void> {
    // Send error to external services
    console.log('Error tracked:', error);
  }

  private async sendSessionData(): Promise<void> {
    // Send session data to analytics service
    console.log('Session data sent');
  }

  private async flushEventQueue(): Promise<void> {
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      if (event) {
        await this.sendEvent(event);
      }
    }
  }

  // ============================================================================
  // EVENT LISTENERS
  // ============================================================================

  private setupEventListeners(): void {
    if (typeof window === 'undefined') return;

    // Track clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      if (target) {
        this.trackUserEngagement('click', target.tagName, {
          element_id: target.id,
          element_class: target.className,
          element_text: target.textContent?.substring(0, 100),
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      if (form) {
        this.trackUserEngagement('form_submit', 'form', {
          form_id: form.id,
          form_action: form.action,
        });
      }
    });

    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        this.trackUserEngagement('scroll', 'page', {
          scroll_depth: scrollDepth,
        });
      }
    });

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackUserEngagement('visibility_change', 'page', {
        visibility_state: document.visibilityState,
      });
    });

    // Track beforeunload
    window.addEventListener('beforeunload', () => {
      this.endSession();
    });
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getDefaultDeviceInfo(): DeviceInfo {
    return {
      type: 'desktop',
      os: 'unknown',
      browser: 'unknown',
      version: 'unknown',
      screenResolution: 'unknown',
      language: 'en',
      timezone: 'UTC',
      userAgent: 'unknown',
    };
  }

  private getDefaultPageInfo(): PageInfo {
    return {
      url: '',
      title: '',
      referrer: '',
      path: '',
      loadTime: 0,
      viewport: {
        width: 0,
        height: 0,
      },
    };
  }

  private detectDevice(): DeviceInfo {
    if (typeof window === 'undefined') {
      return {
        type: 'desktop',
        os: 'unknown',
        browser: 'unknown',
        version: 'unknown',
        screenResolution: 'unknown',
        language: 'en',
        timezone: 'UTC',
        userAgent: 'unknown',
      };
    }

    const userAgent = navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Android(?!.*Mobile)/i.test(userAgent);

    return {
      type: isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop',
      os: this.detectOS(userAgent),
      browser: this.detectBrowser(userAgent),
      version: this.detectBrowserVersion(userAgent),
      screenResolution: `${screen.width}x${screen.height}`,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      userAgent,
    };
  }

  private detectOS(userAgent: string): string {
    if (/Windows/i.test(userAgent)) return 'Windows';
    if (/Macintosh|Mac OS X/i.test(userAgent)) return 'macOS';
    if (/Linux/i.test(userAgent)) return 'Linux';
    if (/Android/i.test(userAgent)) return 'Android';
    if (/iPhone|iPad|iPod/i.test(userAgent)) return 'iOS';
    return 'Unknown';
  }

  private detectBrowser(userAgent: string): string {
    if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) return 'Chrome';
    if (/Firefox/i.test(userAgent)) return 'Firefox';
    if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) return 'Safari';
    if (/Edge/i.test(userAgent)) return 'Edge';
    if (/Opera|OPR/i.test(userAgent)) return 'Opera';
    return 'Unknown';
  }

  private detectBrowserVersion(userAgent: string): string {
    const match = userAgent.match(/(Chrome|Firefox|Safari|Edge|Opera)\/(\d+\.\d+)/);
    return match ? match[2] : 'Unknown';
  }

  private getPageInfo(): PageInfo {
    if (typeof window === 'undefined') {
      return {
        url: '',
        title: '',
        path: '',
        referrer: '',
        loadTime: 0,
        viewport: { width: 0, height: 0 },
      };
    }

    return {
      url: window.location.href,
      title: document.title,
      path: window.location.pathname,
      referrer: document.referrer,
      loadTime: performance.now(),
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };
  }
}

// ============================================================================
// ANALYTICS CONFIGURATION
// ============================================================================

export interface AnalyticsConfig {
  googleAnalytics?: {
    measurementId: string;
    anonymizeIp?: boolean;
    respectDnt?: boolean;
  };
  customEndpoint?: string;
  internalEndpoint?: string;
  apiKey?: string;
  debug?: boolean;
  sampleRate?: number;
  batchSize?: number;
  flushInterval?: number;
}

// ============================================================================
// GLOBAL TYPES
// ============================================================================

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}
