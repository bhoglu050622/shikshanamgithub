// Polyfill for self in server-side rendering - ensure this runs first
if (typeof global !== 'undefined') {
  try {
    // Set self polyfill early
    if (typeof global.self === 'undefined') {
      global.self = global;
    }

    // Ensure these globals exist for SSR compatibility
    if (typeof global.window === 'undefined') {
      global.window = global;
    }

    if (typeof global.document === 'undefined') {
      global.document = {
        addEventListener: () => {},
        removeEventListener: () => {},
        createElement: () => ({ appendChild: () => {} }),
        head: { appendChild: () => {} },
        title: '',
        referrer: '',
        visibilityState: 'visible',
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        getElementsByClassName: () => [],
        getElementsByTagName: () => [],
        createTextNode: () => ({}),
        body: { appendChild: () => {} },
        documentElement: {
          classList: { add: () => {}, remove: () => {} }
        }
      };
    }

    if (typeof global.navigator === 'undefined') {
      global.navigator = {
        userAgent: 'Node.js',
        serviceWorker: { register: () => Promise.resolve() },
        language: 'en'
      };
    }

    // Additional browser globals that might be accessed
    if (typeof global.location === 'undefined') {
      global.location = {
        href: '',
        pathname: '/',
        search: '',
        reload: () => {}
      };
    }

    if (typeof global.history === 'undefined') {
      global.history = {
        replaceState: () => {},
        pushState: () => {}
      };
    }

  } catch (error) {
    // Silently handle any issues with setting polyfills
    if (typeof console !== 'undefined') {
      console.warn('Failed to set global polyfills:', error.message);
    }
  }
}
