/**
 * Mobile Optimization Barrel Export
 * Centralized exports for all mobile utilities and components
 */

// Types and interfaces
export * from './types';

// Device detection
export * from './device-detection';

// Touch gestures
export * from './touch-gestures';

// Re-export commonly used items
export {
  detectDevice,
  isMobileDevice,
  isTabletDevice,
  isTouchDevice,
  getOrientation,
  detectPlatform,
  detectBrowser,
  getBreakpoint,
  isBreakpoint,
  isMobileBreakpoint,
  isTabletBreakpoint,
  isDesktopBreakpoint,
  getViewportSize,
  getSafeAreaInsets,
  isLandscape,
  isPortrait,
  getNetworkInfo,
  isSlowConnection,
  isDataSaverMode,
  getDevicePerformance,
  shouldReduceMotion,
  prefersDarkMode,
  isIOS,
  isAndroid,
  isSafari,
  isChrome,
  isFirefox,
  isEdge,
  hasCamera,
  hasGeolocation,
  hasVibration,
  hasNotification,
  hasServiceWorker,
  hasWebGL,
  hasWebRTC,
  hasWebAssembly,
} from './device-detection';

export {
  TouchGestureRecognizer,
  vibrate,
  hapticFeedback,
  visualFeedback,
  ensureTouchTarget,
  isTouchTarget,
  useTouchGestures,
  detectSwipeDirection,
  calculateSwipeVelocity,
  calculatePinchScale,
  calculatePinchCenter,
} from './touch-gestures';
