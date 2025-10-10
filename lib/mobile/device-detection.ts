// Device detection utilities - simplified for frontend-only version

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

export interface NetworkInfo {
  connectionType: string;
  effectiveType: string;
  downlink: number;
  rtt: number;
}

export const detectDevice = (): DeviceInfo => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      screenWidth: 1920,
      screenHeight: 1080,
      userAgent: 'server',
      devicePixelRatio: 1,
      browser: 'server'
    };
  }

  const width = window.innerWidth;
  const userAgent = navigator.userAgent;
  
  // Simple browser detection
  let browser = 'unknown';
  if (userAgent.includes('Chrome')) browser = 'chrome';
  else if (userAgent.includes('Firefox')) browser = 'firefox';
  else if (userAgent.includes('Safari')) browser = 'safari';
  else if (userAgent.includes('Edge')) browser = 'edge';

  return {
    isMobile: width < 768,
    isTablet: width >= 768 && width < 1024,
    isDesktop: width >= 1024,
    screenWidth: width,
    screenHeight: window.innerHeight,
    userAgent,
    devicePixelRatio: window.devicePixelRatio || 1,
    browser
  };
};

export const getNetworkInfo = (): NetworkInfo => {
  if (typeof window === 'undefined' || !('connection' in navigator)) {
    return {
      connectionType: 'unknown',
      effectiveType: '4g',
      downlink: 10,
      rtt: 50
    };
  }

  const connection = (navigator as any).connection;
  return {
    connectionType: connection.type || 'unknown',
    effectiveType: connection.effectiveType || '4g',
    downlink: connection.downlink || 10,
    rtt: connection.rtt || 50
  };
};

export const isSlowConnection = (): boolean => {
  const networkInfo = getNetworkInfo();
  return networkInfo.effectiveType === 'slow-2g' || 
         networkInfo.effectiveType === '2g' || 
         networkInfo.downlink < 1;
};
