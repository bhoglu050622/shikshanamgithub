/**
 * Device Detection Utilities
 * Comprehensive device and browser detection for mobile optimization
 */

import { DeviceInfo } from './types';

// ============================================================================
// DEVICE DETECTION
// ============================================================================

export function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return getDefaultDeviceInfo();
  }

  const userAgent = window.navigator.userAgent;
  const screen = window.screen;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return {
    isMobile: isMobileDevice(userAgent),
    isTablet: isTabletDevice(userAgent),
    isDesktop: !isMobileDevice(userAgent) && !isTabletDevice(userAgent),
    isTouchDevice,
    screenWidth: screen.width,
    screenHeight: screen.height,
    devicePixelRatio: window.devicePixelRatio || 1,
    orientation: getOrientation(),
    userAgent,
    platform: detectPlatform(userAgent),
    browser: detectBrowser(userAgent),
  };
}

export function isMobileDevice(userAgent: string): boolean {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent);
}

export function isTabletDevice(userAgent: string): boolean {
  const tabletRegex = /iPad|Android(?!.*Mobile)|Tablet/i;
  return tabletRegex.test(userAgent);
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function getOrientation(): 'portrait' | 'landscape' {
  if (typeof window === 'undefined') return 'portrait';
  
  if (window.screen && window.screen.orientation) {
    return window.screen.orientation.angle === 0 || window.screen.orientation.angle === 180
      ? 'portrait'
      : 'landscape';
  }
  
  return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
}

export function detectPlatform(userAgent: string): DeviceInfo['platform'] {
  if (/iPhone|iPad|iPod/i.test(userAgent)) return 'ios';
  if (/Android/i.test(userAgent)) return 'android';
  if (/Windows/i.test(userAgent)) return 'windows';
  if (/Macintosh|Mac OS X/i.test(userAgent)) return 'macos';
  if (/Linux/i.test(userAgent)) return 'linux';
  return 'unknown';
}

export function detectBrowser(userAgent: string): DeviceInfo['browser'] {
  if (/Chrome/i.test(userAgent) && !/Edge/i.test(userAgent)) return 'chrome';
  if (/Firefox/i.test(userAgent)) return 'firefox';
  if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) return 'safari';
  if (/Edge/i.test(userAgent)) return 'edge';
  if (/Opera|OPR/i.test(userAgent)) return 'opera';
  return 'unknown';
}

// ============================================================================
// RESPONSIVE UTILITIES
// ============================================================================

export function getBreakpoint(width: number): 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' {
  if (width < 640) return 'xs';
  if (width < 768) return 'sm';
  if (width < 1024) return 'md';
  if (width < 1280) return 'lg';
  if (width < 1536) return 'xl';
  return '2xl';
}

export function isBreakpoint(breakpoint: string, width?: number): boolean {
  const currentWidth = width || (typeof window !== 'undefined' ? window.innerWidth : 1024);
  const currentBreakpoint = getBreakpoint(currentWidth);
  
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpoints.indexOf(currentBreakpoint);
  const targetIndex = breakpoints.indexOf(breakpoint);
  
  return currentIndex >= targetIndex;
}

export function isMobileBreakpoint(width?: number): boolean {
  return isBreakpoint('md', width);
}

export function isTabletBreakpoint(width?: number): boolean {
  const currentWidth = width || (typeof window !== 'undefined' ? window.innerWidth : 1024);
  return currentWidth >= 768 && currentWidth < 1024;
}

export function isDesktopBreakpoint(width?: number): boolean {
  return isBreakpoint('lg', width);
}

// ============================================================================
// VIEWPORT UTILITIES
// ============================================================================

export function getViewportSize(): { width: number; height: number } {
  if (typeof window === 'undefined') {
    return { width: 1024, height: 768 };
  }
  
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function getSafeAreaInsets(): {
  top: number;
  right: number;
  bottom: number;
  left: number;
} {
  if (typeof window === 'undefined') {
    return { top: 0, right: 0, bottom: 0, left: 0 };
  }
  
  const computedStyle = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(computedStyle.getPropertyValue('--safe-area-inset-top') || '0'),
    right: parseInt(computedStyle.getPropertyValue('--safe-area-inset-right') || '0'),
    bottom: parseInt(computedStyle.getPropertyValue('--safe-area-inset-bottom') || '0'),
    left: parseInt(computedStyle.getPropertyValue('--safe-area-inset-left') || '0'),
  };
}

export function isLandscape(): boolean {
  return getOrientation() === 'landscape';
}

export function isPortrait(): boolean {
  return getOrientation() === 'portrait';
}

// ============================================================================
// NETWORK DETECTION
// ============================================================================

export function getNetworkInfo(): {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  downlink: number;
  rtt: number;
  saveData: boolean;
  isOnline: boolean;
} {
  if (typeof window === 'undefined' || !('navigator' in window)) {
    return {
      effectiveType: '4g',
      downlink: 10,
      rtt: 50,
      saveData: false,
      isOnline: true,
    };
  }
  
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  return {
    effectiveType: connection?.effectiveType || '4g',
    downlink: connection?.downlink || 10,
    rtt: connection?.rtt || 50,
    saveData: connection?.saveData || false,
    isOnline: navigator.onLine,
  };
}

export function isSlowConnection(): boolean {
  const networkInfo = getNetworkInfo();
  return networkInfo.effectiveType === 'slow-2g' || networkInfo.effectiveType === '2g';
}

export function isDataSaverMode(): boolean {
  const networkInfo = getNetworkInfo();
  return networkInfo.saveData;
}

// ============================================================================
// PERFORMANCE DETECTION
// ============================================================================

export function getDevicePerformance(): 'low' | 'medium' | 'high' {
  if (typeof window === 'undefined') return 'medium';
  
  const deviceInfo = detectDevice();
  const networkInfo = getNetworkInfo();
  
  // Low-end device indicators
  const isLowEnd = 
    deviceInfo.devicePixelRatio < 2 ||
    deviceInfo.screenWidth < 375 ||
    networkInfo.effectiveType === 'slow-2g' ||
    networkInfo.effectiveType === '2g' ||
    networkInfo.downlink < 1;
  
  // High-end device indicators
  const isHighEnd = 
    deviceInfo.devicePixelRatio >= 3 ||
    deviceInfo.screenWidth >= 414 ||
    networkInfo.effectiveType === '4g' ||
    networkInfo.downlink >= 5;
  
  if (isLowEnd) return 'low';
  if (isHighEnd) return 'high';
  return 'medium';
}

export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
}

export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  return mediaQuery.matches;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getDefaultDeviceInfo(): DeviceInfo {
  return {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isTouchDevice: false,
    screenWidth: 1024,
    screenHeight: 768,
    devicePixelRatio: 1,
    orientation: 'landscape',
    userAgent: 'unknown',
    platform: 'unknown',
    browser: 'unknown',
  };
}

export function isIOS(): boolean {
  if (typeof window === 'undefined') return false;
  return /iPhone|iPad|iPod/i.test(window.navigator.userAgent);
}

export function isAndroid(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android/i.test(window.navigator.userAgent);
}

export function isSafari(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent;
  return /Safari/i.test(userAgent) && !/Chrome/i.test(userAgent);
}

export function isChrome(): boolean {
  if (typeof window === 'undefined') return false;
  const userAgent = window.navigator.userAgent;
  return /Chrome/i.test(userAgent) && !/Edge/i.test(userAgent);
}

export function isFirefox(): boolean {
  if (typeof window === 'undefined') return false;
  return /Firefox/i.test(window.navigator.userAgent);
}

export function isEdge(): boolean {
  if (typeof window === 'undefined') return false;
  return /Edge/i.test(window.navigator.userAgent);
}

// ============================================================================
// DEVICE CAPABILITIES
// ============================================================================

export function hasCamera(): boolean {
  if (typeof window === 'undefined') return false;
  return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
}

export function hasGeolocation(): boolean {
  if (typeof window === 'undefined') return false;
  return 'geolocation' in navigator;
}

export function hasVibration(): boolean {
  if (typeof window === 'undefined') return false;
  return 'vibrate' in navigator;
}

export function hasNotification(): boolean {
  if (typeof window === 'undefined') return false;
  return 'Notification' in window;
}

export function hasServiceWorker(): boolean {
  if (typeof window === 'undefined') return false;
  return 'serviceWorker' in navigator;
}

export function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch (e) {
    return false;
  }
}

export function hasWebRTC(): boolean {
  if (typeof window === 'undefined') return false;
  return 'RTCPeerConnection' in window;
}

export function hasWebAssembly(): boolean {
  if (typeof window === 'undefined') return false;
  return 'WebAssembly' in window;
}
