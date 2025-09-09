/**
 * Viewport Testing Utilities
 * Provides tools for testing responsive design across different screen sizes
 */

export interface ViewportSize {
  name: string;
  width: number;
  height: number;
  devicePixelRatio?: number;
  isMobile?: boolean;
  isTablet?: boolean;
  isDesktop?: boolean;
}

export const VIEWPORT_SIZES: ViewportSize[] = [
  // Mobile devices
  { name: 'iPhone SE', width: 375, height: 667, devicePixelRatio: 2, isMobile: true },
  { name: 'iPhone 12', width: 390, height: 844, devicePixelRatio: 3, isMobile: true },
  { name: 'iPhone 12 Pro Max', width: 428, height: 926, devicePixelRatio: 3, isMobile: true },
  { name: 'Samsung Galaxy S21', width: 384, height: 854, devicePixelRatio: 3, isMobile: true },
  { name: 'Google Pixel 5', width: 393, height: 851, devicePixelRatio: 2.75, isMobile: true },
  
  // Tablet devices
  { name: 'iPad', width: 768, height: 1024, devicePixelRatio: 2, isTablet: true },
  { name: 'iPad Pro', width: 1024, height: 1366, devicePixelRatio: 2, isTablet: true },
  { name: 'Samsung Galaxy Tab', width: 800, height: 1280, devicePixelRatio: 1.5, isTablet: true },
  
  // Desktop devices
  { name: 'Desktop Small', width: 1024, height: 768, isDesktop: true },
  { name: 'Desktop Medium', width: 1440, height: 900, isDesktop: true },
  { name: 'Desktop Large', width: 1920, height: 1080, isDesktop: true },
  { name: 'Desktop XL', width: 2560, height: 1440, isDesktop: true },
  
  // Common breakpoints
  { name: 'Mobile Small', width: 320, height: 568, isMobile: true },
  { name: 'Mobile Medium', width: 375, height: 667, isMobile: true },
  { name: 'Mobile Large', width: 414, height: 896, isMobile: true },
  { name: 'Tablet Portrait', width: 768, height: 1024, isTablet: true },
  { name: 'Tablet Landscape', width: 1024, height: 768, isTablet: true },
  { name: 'Desktop Small', width: 1280, height: 720, isDesktop: true },
  { name: 'Desktop Medium', width: 1440, height: 900, isDesktop: true },
  { name: 'Desktop Large', width: 1920, height: 1080, isDesktop: true }
];

export class ViewportTester {
  private currentViewport: ViewportSize | null = null;
  private originalViewport: { width: number; height: number } | null = null;

  /**
   * Set viewport to a specific size
   */
  setViewport(viewport: ViewportSize): void {
    if (typeof window === 'undefined') return;

    // Store original viewport
    if (!this.originalViewport) {
      this.originalViewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }

    // Set new viewport
    this.currentViewport = viewport;
    
    // Update viewport meta tag
    this.updateViewportMeta(viewport);
    
    // Dispatch resize event
    window.dispatchEvent(new Event('resize'));
    
    console.log(`Viewport set to: ${viewport.name} (${viewport.width}x${viewport.height})`);
  }

  /**
   * Reset viewport to original size
   */
  resetViewport(): void {
    if (typeof window === 'undefined' || !this.originalViewport) return;

    this.currentViewport = null;
    this.updateViewportMeta({
      name: 'Original',
      width: this.originalViewport.width,
      height: this.originalViewport.height
    });
    
    window.dispatchEvent(new Event('resize'));
    console.log('Viewport reset to original size');
  }

  /**
   * Update viewport meta tag
   */
  private updateViewportMeta(viewport: ViewportSize): void {
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute('content', 
        `width=${viewport.width}, height=${viewport.height}, initial-scale=1.0`
      );
    }
  }

  /**
   * Get current viewport
   */
  getCurrentViewport(): ViewportSize | null {
    return this.currentViewport;
  }

  /**
   * Test all viewport sizes
   */
  async testAllViewports(
    testFunction: (viewport: ViewportSize) => Promise<void> | void,
    delay: number = 1000
  ): Promise<void> {
    for (const viewport of VIEWPORT_SIZES) {
      this.setViewport(viewport);
      await testFunction(viewport);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    this.resetViewport();
  }

  /**
   * Test specific device categories
   */
  async testDeviceCategory(
    category: 'mobile' | 'tablet' | 'desktop',
    testFunction: (viewport: ViewportSize) => Promise<void> | void,
    delay: number = 1000
  ): Promise<void> {
    const categoryViewports = VIEWPORT_SIZES.filter(vp => {
      switch (category) {
        case 'mobile': return vp.isMobile;
        case 'tablet': return vp.isTablet;
        case 'desktop': return vp.isDesktop;
        default: return false;
      }
    });

    for (const viewport of categoryViewports) {
      this.setViewport(viewport);
      await testFunction(viewport);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    this.resetViewport();
  }
}

/**
 * Responsive Design Testing Utilities
 */
export class ResponsiveTester {
  /**
   * Check if element is visible at current viewport
   */
  static isElementVisible(selector: string): boolean {
    if (typeof window === 'undefined') return false;
    
    const element = document.querySelector(selector);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  /**
   * Check if element has expected dimensions
   */
  static hasExpectedDimensions(
    selector: string, 
    expectedWidth: number, 
    expectedHeight: number, 
    tolerance: number = 10
  ): boolean {
    if (typeof window === 'undefined') return false;
    
    const element = document.querySelector(selector);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    const widthMatch = Math.abs(rect.width - expectedWidth) <= tolerance;
    const heightMatch = Math.abs(rect.height - expectedHeight) <= tolerance;
    
    return widthMatch && heightMatch;
  }

  /**
   * Check if text is readable (not too small)
   */
  static isTextReadable(selector: string, minFontSize: number = 14): boolean {
    if (typeof window === 'undefined') return false;
    
    const element = document.querySelector(selector);
    if (!element) return false;
    
    const computedStyle = window.getComputedStyle(element);
    const fontSize = parseFloat(computedStyle.fontSize);
    
    return fontSize >= minFontSize;
  }

  /**
   * Check if touch targets are large enough
   */
  static hasAdequateTouchTargets(selector: string, minSize: number = 44): boolean {
    if (typeof window === 'undefined') return false;
    
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return false;
    
    return Array.from(elements).every(element => {
      const rect = element.getBoundingClientRect();
      return rect.width >= minSize && rect.height >= minSize;
    });
  }

  /**
   * Check if layout is not broken (no horizontal scroll)
   */
  static isLayoutIntact(): boolean {
    if (typeof window === 'undefined') return false;
    
    return document.documentElement.scrollWidth <= window.innerWidth;
  }

  /**
   * Check if images are properly sized
   */
  static areImagesOptimized(): boolean {
    if (typeof window === 'undefined') return false;
    
    const images = document.querySelectorAll('img');
    if (images.length === 0) return true;
    
    return Array.from(images).every(img => {
      const rect = img.getBoundingClientRect();
      const naturalWidth = img.naturalWidth;
      const naturalHeight = img.naturalHeight;
      
      // Check if image is not significantly larger than display size
      const widthRatio = naturalWidth / rect.width;
      const heightRatio = naturalHeight / rect.height;
      
      return widthRatio <= 2 && heightRatio <= 2;
    });
  }

  /**
   * Run comprehensive responsive tests
   */
  static runResponsiveTests(): {
    passed: number;
    failed: number;
    results: Array<{
      test: string;
      passed: boolean;
      message: string;
    }>;
  } {
    const results: Array<{
      test: string;
      passed: boolean;
      message: string;
    }> = [];

    // Test 1: Layout integrity
    const layoutIntact = this.isLayoutIntact();
    results.push({
      test: 'Layout Integrity',
      passed: layoutIntact,
      message: layoutIntact ? 'No horizontal scroll detected' : 'Horizontal scroll detected'
    });

    // Test 2: Touch targets
    const touchTargets = this.hasAdequateTouchTargets('button, a, input, select, textarea');
    results.push({
      test: 'Touch Targets',
      passed: touchTargets,
      message: touchTargets ? 'All touch targets are adequate size' : 'Some touch targets are too small'
    });

    // Test 3: Text readability
    const textReadable = this.isTextReadable('p, span, div, h1, h2, h3, h4, h5, h6');
    results.push({
      test: 'Text Readability',
      passed: textReadable,
      message: textReadable ? 'Text is readable' : 'Some text may be too small'
    });

    // Test 4: Image optimization
    const imagesOptimized = this.areImagesOptimized();
    results.push({
      test: 'Image Optimization',
      passed: imagesOptimized,
      message: imagesOptimized ? 'Images are properly sized' : 'Some images may be oversized'
    });

    const passed = results.filter(r => r.passed).length;
    const failed = results.filter(r => !r.passed).length;

    return { passed, failed, results };
  }
}

/**
 * Performance Testing Utilities
 */
export class PerformanceTester {
  /**
   * Measure page load time
   */
  static measurePageLoadTime(): number {
    if (typeof window === 'undefined') return 0;
    
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    return navigation ? navigation.loadEventEnd - navigation.fetchStart : 0;
  }

  /**
   * Measure first contentful paint
   */
  static measureFCP(): number {
    if (typeof window === 'undefined') return 0;
    
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? fcpEntry.startTime : 0;
  }

  /**
   * Measure largest contentful paint
   */
  static measureLCP(): Promise<number> {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') {
        resolve(0);
        return;
      }

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        resolve(lastEntry ? lastEntry.startTime : 0);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // Resolve after 5 seconds if no LCP is detected
      setTimeout(() => resolve(0), 5000);
    });
  }

  /**
   * Run performance tests
   */
  static async runPerformanceTests(): Promise<{
    pageLoadTime: number;
    fcp: number;
    lcp: number;
    score: number;
  }> {
    const pageLoadTime = this.measurePageLoadTime();
    const fcp = this.measureFCP();
    const lcp = await this.measureLCP();

    // Calculate performance score (0-100)
    let score = 100;
    if (pageLoadTime > 3000) score -= 30;
    else if (pageLoadTime > 1500) score -= 15;
    
    if (fcp > 1800) score -= 25;
    else if (fcp > 1000) score -= 10;
    
    if (lcp > 2500) score -= 25;
    else if (lcp > 1200) score -= 10;

    return {
      pageLoadTime,
      fcp,
      lcp,
      score: Math.max(0, score)
    };
  }
}

// Create singleton instances
export const viewportTester = new ViewportTester();
export const responsiveTester = ResponsiveTester;
export const performanceTester = PerformanceTester;
