/**
 * Development-only console filter to reduce browser extension noise
 * This helps clean up the console during development by filtering out
 * common browser extension errors that don't affect the app functionality.
 */

if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;

  // Filter out common browser extension noise and React reconciler errors
  const extensionErrorPatterns = [
    /tx_attempts_exceeded/,
    /tx_ack_timeout/,
    /Failed to initialize messaging/,
    /chrome-extension:/,
    /Invalid session! You must be logged in/,
    /sw\.js:/,
    /host-console-events\.js/,
    /host-network-events\.js/,
    /host-dom-snapshot\.js/,
    /host-additional-hooks\.js/,
    /intercept-console-error\.js/,
    /remote-object-helper-content\.js/,
    /about:blank/,
    /web_accessible_resources manifest key/,
    /react-reconciler\.development\.js/,
    /Cannot read properties of undefined \(reading 'ReactCurrentOwner'\)/,
    /events-.*\.esm\.js/,
    /webpack\.js/,
    /Failed to refresh token/,
    /token.*refresh/,
    /refresh.*token/,
    /was preloaded using link preload but not used/,
    /preload.*not used/
  ];

  console.error = (...args: any[]) => {
    const message = args.join(' ');
    const isExtensionNoise = extensionErrorPatterns.some(pattern => pattern.test(message));
    
    if (!isExtensionNoise) {
      originalConsoleError.apply(console, args);
    }
  };

  console.warn = (...args: any[]) => {
    const message = args.join(' ');
    const isExtensionNoise = extensionErrorPatterns.some(pattern => pattern.test(message));
    
    if (!isExtensionNoise) {
      originalConsoleWarn.apply(console, args);
    }
  };

  // Log that console filtering is active
  console.log('🔧 Development console filter active - browser extension noise filtered');
}
