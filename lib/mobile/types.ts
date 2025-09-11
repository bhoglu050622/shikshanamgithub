/**
 * Mobile Optimization Types
 * Comprehensive types for mobile-specific features and optimizations
 */

// ============================================================================
// DEVICE DETECTION
// ============================================================================

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
  orientation: 'portrait' | 'landscape';
  userAgent: string;
  platform: 'ios' | 'android' | 'windows' | 'macos' | 'linux' | 'unknown';
  browser: 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera' | 'unknown';
}

// ============================================================================
// TOUCH INTERACTIONS
// ============================================================================

export interface TouchPoint {
  x: number;
  y: number;
  identifier: number;
  timestamp: number;
}

export interface TouchGesture {
  type: 'tap' | 'double-tap' | 'long-press' | 'swipe' | 'pinch' | 'pan';
  startPoint: TouchPoint;
  endPoint?: TouchPoint;
  duration: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  velocity?: number;
  scale?: number;
  rotation?: number;
}

export interface TouchFeedback {
  type: 'visual' | 'haptic' | 'audio';
  intensity: 'light' | 'medium' | 'heavy';
  duration: number;
}

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

export interface BreakpointConfig {
  xs: number;    // 0px
  sm: number;    // 640px
  md: number;    // 768px
  lg: number;    // 1024px
  xl: number;    // 1280px
  '2xl': number; // 1536px
}

export interface ResponsiveConfig {
  breakpoints: BreakpointConfig;
  containerMaxWidths: BreakpointConfig;
  gridColumns: number;
  gutterWidth: number;
}

// ============================================================================
// MOBILE NAVIGATION
// ============================================================================

export interface MobileNavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  badge?: string | number;
  children?: MobileNavigationItem[];
  isActive?: boolean;
  isDisabled?: boolean;
}

export interface MobileNavigationConfig {
  items: MobileNavigationItem[];
  showHomeButton?: boolean;
  showSearchButton?: boolean;
  showUserMenu?: boolean;
  showNotifications?: boolean;
  position: 'top' | 'bottom' | 'side';
  style: 'tabs' | 'drawer' | 'floating' | 'inline';
}

// ============================================================================
// PROGRESSIVE WEB APP
// ============================================================================

export interface PWAConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: 'fullscreen' | 'standalone' | 'minimal-ui' | 'browser';
  orientation: 'portrait' | 'landscape' | 'any';
  startUrl: string;
  scope: string;
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: 'any' | 'maskable';
  }>;
  categories: string[];
  lang: string;
  dir: 'ltr' | 'rtl';
  preferRelatedApplications?: boolean;
  relatedApplications?: Array<{
    platform: string;
    url: string;
    id?: string;
  }>;
}

export interface ServiceWorkerConfig {
  cacheName: string;
  cacheVersion: string;
  offlinePage: string;
  cacheStrategy: 'cache-first' | 'network-first' | 'stale-while-revalidate';
  cachePatterns: string[];
  excludePatterns: string[];
  maxCacheSize: number;
  maxCacheAge: number;
}

// ============================================================================
// MOBILE PERFORMANCE
// ============================================================================

export interface MobilePerformanceConfig {
  enableLazyLoading: boolean;
  enableImageOptimization: boolean;
  enableCodeSplitting: boolean;
  enablePreloading: boolean;
  enableCaching: boolean;
  maxImageSize: number;
  imageQuality: number;
  preloadCriticalResources: boolean;
  deferNonCriticalJS: boolean;
  minifyCSS: boolean;
  minifyJS: boolean;
}

export interface PerformanceMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  timeToInteractive: number;
  totalBlockingTime: number;
  speedIndex: number;
}

// ============================================================================
// MOBILE UI COMPONENTS
// ============================================================================

export interface MobileButtonProps {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  touchFeedback?: TouchFeedback;
  hapticFeedback?: boolean;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  badge?: string | number;
}

export interface MobileInputProps {
  type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'filled' | 'outlined';
  fullWidth?: boolean;
  clearable?: boolean;
  showPasswordToggle?: boolean;
  autoComplete?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  spellCheck?: boolean;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
  touchFeedback?: TouchFeedback;
}

export interface MobileCardProps {
  variant: 'default' | 'elevated' | 'outlined' | 'filled';
  padding: 'none' | 'sm' | 'md' | 'lg';
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  touchFeedback?: TouchFeedback;
  onClick?: () => void;
}

// ============================================================================
// MOBILE GESTURES
// ============================================================================

export interface GestureConfig {
  enableSwipe: boolean;
  enablePinch: boolean;
  enablePan: boolean;
  enableTap: boolean;
  enableLongPress: boolean;
  swipeThreshold: number;
  pinchThreshold: number;
  panThreshold: number;
  longPressDelay: number;
  doubleTapDelay: number;
}

export interface GestureHandler {
  onSwipe?: (direction: 'up' | 'down' | 'left' | 'right') => void;
  onPinch?: (scale: number) => void;
  onPan?: (deltaX: number, deltaY: number) => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  onLongPress?: () => void;
}

// ============================================================================
// MOBILE ACCESSIBILITY
// ============================================================================

export interface MobileAccessibilityConfig {
  enableVoiceOver: boolean;
  enableTalkBack: boolean;
  enableHighContrast: boolean;
  enableLargeText: boolean;
  enableReducedMotion: boolean;
  enableScreenReader: boolean;
  minTouchTargetSize: number;
  maxTouchTargetSize: number;
  touchTargetSpacing: number;
}

// ============================================================================
// MOBILE ANALYTICS
// ============================================================================

export interface MobileAnalyticsConfig {
  trackTouchEvents: boolean;
  trackGestures: boolean;
  trackPerformance: boolean;
  trackErrors: boolean;
  trackUserFlow: boolean;
  trackDeviceInfo: boolean;
  trackNetworkStatus: boolean;
  trackBatteryStatus: boolean;
}

export interface MobileAnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  deviceInfo: DeviceInfo;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

// ============================================================================
// MOBILE STORAGE
// ============================================================================

export interface MobileStorageConfig {
  enableLocalStorage: boolean;
  enableSessionStorage: boolean;
  enableIndexedDB: boolean;
  enableWebSQL: boolean;
  maxStorageSize: number;
  storageQuota: number;
  enableCompression: boolean;
  enableEncryption: boolean;
}

// ============================================================================
// MOBILE NETWORK
// ============================================================================

export interface NetworkInfo {
  effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  downlink: number;
  rtt: number;
  saveData: boolean;
  isOnline: boolean;
  connectionType: string;
}

export interface NetworkConfig {
  enableOfflineMode: boolean;
  enableDataSaver: boolean;
  enableAdaptiveLoading: boolean;
  enablePrefetching: boolean;
  maxPrefetchSize: number;
  offlineTimeout: number;
  retryAttempts: number;
  retryDelay: number;
}
