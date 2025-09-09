/**
 * Service Worker for Shikshanam
 * Provides offline caching and performance optimization
 */

const CACHE_NAME = 'shikshanam-v1.0.0';
const STATIC_CACHE_NAME = 'shikshanam-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'shikshanam-dynamic-v1.0.0';

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

    // Skip GraphQL queries that might be from extensions
    if (request.url.includes('demoableFeatures') || 
        request.url.includes('teamsEntitlements') ||
        request.headers.get('content-type')?.includes('application/graphql')) {
      return;
    }

    // Handle different types of requests
    if (isStaticAsset(request)) {
      event.respondWith(handleStaticAsset(request));
    } else if (isAPIRequest(request)) {
      event.respondWith(handleAPIRequest(request));
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

// Check if request is for API
function isAPIRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/');
}

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

// Handle API requests - network first with cache fallback
async function handleAPIRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Service Worker: Network failed, trying cache for API request');
    
    const cache = await caches.open(DYNAMIC_CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return new Response(JSON.stringify({ 
      error: 'Offline', 
      message: 'This data is not available offline' 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Handle page requests - network first with cache fallback
async function handlePageRequest(request) {
  try {
    const networkResponse = await fetch(request);
    
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
    return await fetch(request);
  } catch (error) {
    console.error('Service Worker: Network error for other request', error);
    return new Response('Resource not available', { status: 503 });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Service Worker: Performing background sync');
  
  try {
    // Sync any pending offline actions
    const pendingActions = await getPendingActions();
    
    for (const action of pendingActions) {
      await syncAction(action);
    }
    
    console.log('Service Worker: Background sync completed');
  } catch (error) {
    console.error('Service Worker: Background sync failed', error);
  }
}

// Get pending actions from IndexedDB
async function getPendingActions() {
  // This would typically read from IndexedDB
  // For now, return empty array
  return [];
}

// Sync individual action
async function syncAction(action) {
  try {
    const response = await fetch(action.url, {
      method: action.method,
      headers: action.headers,
      body: action.body
    });
    
    if (response.ok) {
      // Remove from pending actions
      await removePendingAction(action.id);
    }
  } catch (error) {
    console.error('Service Worker: Failed to sync action', error);
  }
}

// Remove pending action from IndexedDB
async function removePendingAction(actionId) {
  // This would typically remove from IndexedDB
  console.log('Service Worker: Removing pending action', actionId);
}

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

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('Service Worker: Loaded successfully');
