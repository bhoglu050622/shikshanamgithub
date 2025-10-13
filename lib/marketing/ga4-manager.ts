/**
 * Google Analytics 4 Manager
 * Utilities for initializing and managing GA4 tracking
 */

import { GA4Config, GA4CustomEvent, validateGA4Config } from './tracking-config';

// Extend Window interface for GA4
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export class GA4Manager {
  private config: GA4Config | null = null;
  private isInitialized = false;
  private scriptLoaded = false;

  constructor(config?: GA4Config) {
    if (config) {
      this.config = config;
    }
  }

  /**
   * Initialize GA4 with configuration
   */
  async initialize(config: GA4Config): Promise<boolean> {
    const errors = validateGA4Config(config);
    if (errors.length > 0) {
      console.error('GA4 Configuration errors:', errors);
      return false;
    }

    this.config = config;

    // Load GA4 script
    await this.loadScript();

    // Initialize gtag
    this.initializeGtag();

    this.isInitialized = true;
    return true;
  }

  /**
   * Load GA4 script dynamically
   */
  private async loadScript(): Promise<void> {
    if (this.scriptLoaded || !this.config) {
      return;
    }

    return new Promise((resolve, reject) => {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      
      // Create gtag function
      window.gtag = function() {
        window.dataLayer?.push(arguments);
      };

      // Load script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.config!.measurementId}`;
      
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load GA4 script'));
      };

      document.head.appendChild(script);
    });
  }

  /**
   * Initialize gtag with configuration
   */
  private initializeGtag(): void {
    if (!this.config || !window.gtag) {
      return;
    }

    // Set timestamp
    window.gtag('js', new Date());

    // Configure GA4
    const configParams: any = {
      debug_mode: this.config.debugMode,
    };

    // Add stream name if provided
    if (this.config.streamName) {
      configParams.stream_name = this.config.streamName;
    }

    // Add user properties
    if (Object.keys(this.config.userProperties).length > 0) {
      configParams.user_properties = this.config.userProperties;
    }

    // Configure cross-domain tracking
    if (this.config.crossDomainTracking.length > 0) {
      configParams.linker = {
        domains: this.config.crossDomainTracking,
      };
    }

    window.gtag('config', this.config.measurementId, configParams);

    console.log('GA4 initialized with config:', this.config.measurementId);
  }

  /**
   * Track a custom event
   */
  trackEvent(eventName: string, parameters: Record<string, any> = {}): void {
    if (!this.isInitialized || !window.gtag) {
      console.warn('GA4 not initialized. Event not sent:', eventName);
      return;
    }

    window.gtag('event', eventName, parameters);
    console.log('GA4 Event:', eventName, parameters);
  }

  /**
   * Track a page view
   */
  trackPageView(pageTitle: string, pageLocation: string, pagePath: string): void {
    this.trackEvent('page_view', {
      page_title: pageTitle,
      page_location: pageLocation,
      page_path: pagePath,
    });
  }

  /**
   * Set user properties
   */
  setUserProperties(properties: Record<string, any>): void {
    if (!this.isInitialized || !window.gtag) {
      console.warn('GA4 not initialized. User properties not set');
      return;
    }

    window.gtag('set', 'user_properties', properties);
    console.log('GA4 User Properties set:', properties);
  }

  /**
   * Set user ID
   */
  setUserId(userId: string): void {
    if (!this.isInitialized || !window.gtag) {
      console.warn('GA4 not initialized. User ID not set');
      return;
    }

    window.gtag('config', this.config!.measurementId, {
      user_id: userId,
    });
    console.log('GA4 User ID set:', userId);
  }

  /**
   * Track custom events from configuration
   */
  trackCustomEvent(eventId: string): void {
    if (!this.config) {
      return;
    }

    const customEvent = this.config.customEvents.find(e => e.id === eventId);
    if (customEvent) {
      this.trackEvent(customEvent.name, customEvent.parameters);
    }
  }

  /**
   * Check if GA4 is loaded and working
   */
  isLoaded(): boolean {
    return this.scriptLoaded && typeof window.gtag === 'function' && Array.isArray(window.dataLayer);
  }

  /**
   * Get current configuration
   */
  getConfig(): GA4Config | null {
    return this.config;
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<GA4Config>): void {
    if (this.config) {
      this.config = { ...this.config, ...config };
    }
  }

  /**
   * Get dataLayer contents (for debugging)
   */
  getDataLayer(): any[] {
    return window.dataLayer || [];
  }

  /**
   * Send test event
   */
  sendTestEvent(eventName: string, parameters: Record<string, any> = {}): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.isInitialized || !window.gtag) {
        resolve(false);
        return;
      }

      try {
        this.trackEvent(eventName, {
          ...parameters,
          test_event: true,
          timestamp: Date.now(),
        });
        resolve(true);
      } catch (error) {
        console.error('Error sending test event:', error);
        resolve(false);
      }
    });
  }

  /**
   * Reset manager (for testing)
   */
  reset(): void {
    this.isInitialized = false;
    this.scriptLoaded = false;
    this.config = null;
  }
}

// Singleton instance
let ga4ManagerInstance: GA4Manager | null = null;

/**
 * Get GA4 Manager instance
 */
export function getGA4Manager(): GA4Manager {
  if (!ga4ManagerInstance) {
    ga4ManagerInstance = new GA4Manager();
  }
  return ga4ManagerInstance;
}

/**
 * Initialize GA4 with environment variables
 */
export function initGA4FromEnv(): GA4Manager | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const measurementId = process.env.NEXT_PUBLIC_GA4_ID;
  if (!measurementId) {
    return null;
  }

  const manager = getGA4Manager();
  manager.initialize({
    measurementId,
    debugMode: process.env.NEXT_PUBLIC_GA4_DEBUG === 'true',
    streamName: '',
    customEvents: [],
    userProperties: {},
    enhancedMeasurement: {
      scrolls: true,
      outboundClicks: true,
      siteSearch: true,
      videoEngagement: true,
      fileDownloads: true,
    },
    crossDomainTracking: [],
    customDimensions: [],
    customMetrics: [],
  });

  return manager;
}

