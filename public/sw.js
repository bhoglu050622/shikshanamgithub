/**
 * Service Worker for Shikshanam
 * Provides offline caching and performance optimization
 */

const CACHE_NAME = 'shikshanam-v1.1.0';
const STATIC_CACHE_NAME = 'shikshanam-static-v1.1.0';
const DYNAMIC_CACHE_NAME = 'shikshanam-dynamic-v1.1.0';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/offline',
  '/manifest.json',
  '/favicon.ico',
  '/assets/logo.svg',
  '/assets/hero-bg.jpg',
  '/assets/pattern.svg'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^\/api\/dashboard/,
  /^\/api\/courses/,
  /^\/api\/recommendations/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  try {
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
      return;
    }

    // Skip chrome-extension, browser extension, and other non-http requests
    if (!url.protocol.startsWith('http') || 
        url.protocol === 'chrome-extension:' || 
        url.protocol === 'moz-extension:' ||
        url.hostname.includes('localhost') && url.port === '3000' && url.pathname.includes('_next/webpack-hmr')) {
      return;
    }

    // Don't intercept API or GraphQL auth requests or manifest
    if (
      url.pathname.startsWith('/api') ||
      url.pathname.includes('/graphql') ||
      url.pathname === '/manifest.webmanifest' ||
      url.pathname === '/sw.js' ||
      url.pathname.startsWith('/api/auth') ||
      url.pathname.startsWith('/api/cms') ||
      url.pathname.startsWith('/api/analytics') ||
      url.pathname.startsWith('/api/dashboard')
    ) {
      return; // allow them to go to network (no event.respondWith)
    }

    // Skip GraphQL queries that might be from extensions
    if (request.url.includes('demoableFeatures') || 
        request.url.includes('teamsEntitlements') ||
        request.headers.get('content-type')?.includes('application/graphql')) {
      return;
    }

    // Handle different types of requests
    if (isStaticAsset(request)) {
      event.respondWith(handleStaticAsset(request));
    } else if (isPageRequest(request)) {
      event.respondWith(handlePageRequest(request));
    } else {
      event.respondWith(handleOtherRequest(request));
    }
  } catch (error) {
    // If URL parsing fails, skip the request
    console.log('Service Worker: Skipping invalid URL request');
    return;
  }
});

// Check if request is for static assets
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/);
}

// Check if request is for API (no longer used since we don't intercept API calls)
// function isAPIRequest(request) {
//   const url = new URL(request.url);
//   return url.pathname.startsWith('/api/');
// }

// Check if request is for a page
function isPageRequest(request) {
  const url = new URL(request.url);
  return url.pathname === '/' || (!url.pathname.includes('.') && url.pathname.startsWith('/'));
}

// Handle static assets - cache first strategy
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Error handling static asset', error);
    return new Response('Asset not available offline', { status: 503 });
  }
}

// Handle API requests - no longer used since we don't intercept API calls
// async function handleAPIRequest(request) {
//   // This function is no longer used
// }

// Handle page requests - network first with cache fallback
async function handlePageRequest(request) {
  try {
    // Create a new request with credentials included for authenticated pages
    const authenticatedRequest = new Request(request, {
      credentials: 'include',
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        'Cache-Control': 'no-cache'
      }
    });
    
    const networkResponse = await fetch(authenticatedRequest);
    
    // Handle 401 responses gracefully
    if (networkResponse.status === 401) {
      // Notify clients about invalid session
      self.clients.matchAll().then(clients =>
        clients.forEach(client => client.postMessage({ type: 'INVALID_SESSION' }))
      );
      return networkResponse; // Let the browser handle the 401
    }
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache for page request');
    
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page
    const offlineResponse = await cache.match('/offline');
    return offlineResponse || new Response('Page not available offline', { status: 503 });
  }
}

// Handle other requests - network first
async function handleOtherRequest(request) {
  try {
    // Create a new request with credentials included
    const authenticatedRequest = new Request(request, {
      credentials: 'include',
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        'Cache-Control': 'no-cache'
      }
    });
    
    const networkResponse = await fetch(authenticatedRequest);
    
    // Handle 401 responses gracefully
    if (networkResponse.status === 401) {
      // Notify clients about invalid session
      self.clients.matchAll().then(clients =>
        clients.forEach(client => client.postMessage({ type: 'INVALID_SESSION' }))
      );
      return networkResponse; // Let the browser handle the 401
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Service Worker: Network error for other request', error);
    return new Response('Resource not available', { status: 503 });
  }
}

// Background sync for offline actions - DISABLED to prevent auth issues
// Service Worker no longer performs background API calls to avoid authentication issues
// Instead, use clients.postMessage() to communicate with the main thread
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync requested but disabled for security');
  // Notify clients that sync was requested but handled by main thread
  self.clients.matchAll().then(clients =>
    clients.forEach(client => client.postMessage({ 
      type: 'BACKGROUND_SYNC_REQUESTED',
      tag: event.tag 
    }))
  );
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
  
  if (event.data && event.data.type === 'UNREGISTER_SW') {
    // Unregister this service worker
    self.registration.unregister().then(() => {
      console.log('Service Worker: Unregistered successfully');
    });
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/assets/logo.svg',
      badge: '/assets/badge.png',
      vibrate: [100, 50, 100],
      data: data.data,
      actions: [
        {
          action: 'open',
          title: 'Open App',
          icon: '/assets/open-icon.png'
        },
        {
          action: 'close',
          title: 'Close',
          icon: '/assets/close-icon.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});


console.log('Service Worker: Loaded successfully');
