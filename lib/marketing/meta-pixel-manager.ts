/**
 * Meta Pixel Manager
 * Utilities for initializing and managing Meta Pixel tracking
 */

import { MetaPixelConfig, MetaStandardEventName, validateMetaPixelConfig } from './tracking-config';

// Extend Window interface for Meta Pixel
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export class MetaPixelManager {
  private config: MetaPixelConfig | null = null;
  private isInitialized = false;
  private scriptLoaded = false;

  constructor(config?: MetaPixelConfig) {
    if (config) {
      this.config = config;
    }
  }

  /**
   * Initialize Meta Pixel with configuration
   */
  async initialize(config: MetaPixelConfig): Promise<boolean> {
    const errors = validateMetaPixelConfig(config);
    if (errors.length > 0) {
      console.error('Meta Pixel Configuration errors:', errors);
      return false;
    }

    this.config = config;

    // Load Meta Pixel script
    await this.loadScript();

    // Initialize pixel
    this.initializePixel();

    this.isInitialized = true;
    return true;
  }

  /**
   * Load Meta Pixel script dynamically
   */
  private async loadScript(): Promise<void> {
    if (this.scriptLoaded || !this.config) {
      return;
    }

    return new Promise((resolve, reject) => {
      // Initialize fbq function
      const fbq: any = function() {
        if (fbq.callMethod) {
          fbq.callMethod.apply(fbq, arguments as any);
        } else {
          fbq.queue.push(arguments);
        }
      };

      if (!window.fbq) {
        window.fbq = fbq;
      }
      
      (window.fbq as any).push = window.fbq;
      (window.fbq as any).loaded = true;
      (window.fbq as any).version = '2.0';
      (window.fbq as any).queue = [];

      // Load script
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      
      script.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Meta Pixel script'));
      };

      document.head.appendChild(script);

      // Add noscript image pixel
      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.style.display = 'none';
      img.src = `https://www.facebook.com/tr?id=${this.config!.pixelId}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.body.appendChild(noscript);
    });
  }

  /**
   * Initialize pixel with configuration
   */
  private initializePixel(): void {
    if (!this.config || !window.fbq) {
      return;
    }

    // Initialize pixel
    const initOptions: any = {};

    // Add advanced matching if enabled
    if (this.config.advancedMatching.enabled) {
      const { enabled, ...matchingData } = this.config.advancedMatching;
      Object.keys(matchingData).forEach(key => {
        if (matchingData[key as keyof typeof matchingData]) {
          initOptions[key] = matchingData[key as keyof typeof matchingData];
        }
      });
    }

    window.fbq('init', this.config.pixelId, initOptions);

    // Track initial PageView if enabled
    const pageViewEvent = this.config.standardEvents.find(e => e.name === 'PageView' && e.enabled);
    if (pageViewEvent) {
      window.fbq('track', 'PageView');
    }

    console.log('Meta Pixel initialized:', this.config.pixelId);
  }

  /**
   * Track a standard event
   */
  trackEvent(eventName: MetaStandardEventName, parameters: Record<string, any> = {}): void {
    if (!this.isInitialized || !window.fbq) {
      console.warn('Meta Pixel not initialized. Event not sent:', eventName);
      return;
    }

    // Add test event code if in test mode
    if (this.config?.testEventCode) {
      window.fbq('trackSingle', this.config.pixelId, eventName, parameters, {
        eventID: `test_${Date.now()}`,
      });
    } else {
      window.fbq('track', eventName, parameters);
    }

    console.log('Meta Pixel Event:', eventName, parameters);
  }

  /**
   * Track a custom event
   */
  trackCustomEvent(eventName: string, parameters: Record<string, any> = {}): void {
    if (!this.isInitialized || !window.fbq) {
      console.warn('Meta Pixel not initialized. Custom event not sent:', eventName);
      return;
    }

    window.fbq('trackCustom', eventName, parameters);
    console.log('Meta Pixel Custom Event:', eventName, parameters);
  }

  /**
   * Track a page view
   */
  trackPageView(): void {
    this.trackEvent('PageView');
  }

  /**
   * Track ViewContent event
   */
  trackViewContent(contentName: string, contentCategory?: string, value?: number, currency: string = 'USD'): void {
    this.trackEvent('ViewContent', {
      content_name: contentName,
      content_category: contentCategory,
      value: value,
      currency: currency,
    });
  }

  /**
   * Track AddToCart event
   */
  trackAddToCart(contentName: string, contentId: string, value: number, currency: string = 'USD'): void {
    this.trackEvent('AddToCart', {
      content_name: contentName,
      content_ids: [contentId],
      content_type: 'product',
      value: value,
      currency: currency,
    });
  }

  /**
   * Track Purchase event
   */
  trackPurchase(value: number, currency: string = 'USD', contents?: any[]): void {
    this.trackEvent('Purchase', {
      value: value,
      currency: currency,
      contents: contents,
    });
  }

  /**
   * Track Lead event
   */
  trackLead(contentName?: string): void {
    this.trackEvent('Lead', {
      content_name: contentName,
    });
  }

  /**
   * Track CompleteRegistration event
   */
  trackCompleteRegistration(contentName?: string, value?: number, currency: string = 'USD'): void {
    this.trackEvent('CompleteRegistration', {
      content_name: contentName,
      value: value,
      currency: currency,
    });
  }

  /**
   * Check if Meta Pixel is loaded and working
   */
  isLoaded(): boolean {
    return this.scriptLoaded && typeof window.fbq === 'function';
  }

  /**
   * Get current configuration
   */
  getConfig(): MetaPixelConfig | null {
    return this.config;
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<MetaPixelConfig>): void {
    if (this.config) {
      this.config = { ...this.config, ...config };
    }
  }

  /**
   * Send test event
   */
  sendTestEvent(eventName: MetaStandardEventName, parameters: Record<string, any> = {}): Promise<boolean> {
    return new Promise((resolve) => {
      if (!this.isInitialized || !window.fbq) {
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
   * Get pixel configuration for debugging
   */
  getPixelInfo(): any {
    return {
      loaded: this.isLoaded(),
      initialized: this.isInitialized,
      pixelId: this.config?.pixelId,
      fbqExists: typeof window.fbq !== 'undefined',
    };
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
let metaPixelManagerInstance: MetaPixelManager | null = null;

/**
 * Get Meta Pixel Manager instance
 */
export function getMetaPixelManager(): MetaPixelManager {
  if (!metaPixelManagerInstance) {
    metaPixelManagerInstance = new MetaPixelManager();
  }
  return metaPixelManagerInstance;
}

/**
 * Initialize Meta Pixel with environment variables
 */
export function initMetaPixelFromEnv(): MetaPixelManager | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) {
    return null;
  }

  const manager = getMetaPixelManager();
  manager.initialize({
    pixelId,
    testEventCode: process.env.NEXT_PUBLIC_META_PIXEL_TEST === 'true' ? 'TEST_EVENT' : undefined,
    standardEvents: [
      { id: '1', name: 'PageView', enabled: true, parameters: {} },
    ],
    customConversions: [],
    advancedMatching: {
      enabled: false,
    },
    customData: {},
    firstPartyCookies: true,
  });

  return manager;
}

