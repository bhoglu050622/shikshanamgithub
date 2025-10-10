// Mobile navigation types - simplified for frontend-only version

export interface MobileNavigationItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  children?: MobileNavigationItem[];
  badge?: string;
}

export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  screenWidth: number;
  screenHeight: number;
  userAgent: string;
  devicePixelRatio: number;
  browser: string;
}

export interface MobileNavigationConfig {
  items: MobileNavigationItem[];
  theme: 'light' | 'dark' | 'system';
  showHomeButton?: boolean;
  showSearchButton?: boolean;
  showUserMenu?: boolean;
  showNotifications?: boolean;
  position?: 'top' | 'bottom';
  style?: 'tabs' | 'drawer';
}
