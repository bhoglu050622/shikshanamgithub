// public/sw.js - Safe service worker for production
// This service worker does NOT call protected APIs or GraphQL endpoints

self.addEventListener('install', () => {
  console.log('Service Worker: Installing...');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('Service Worker: Activating...');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Do NOT intercept or call protected API / GraphQL endpoints
  if (
    url.pathname.startsWith('/api') || 
    url.pathname.includes('/graphql') || 
    url.pathname === '/manifest.webmanifest' ||
    url.pathname.startsWith('/api/auth') ||
    url.pathname.startsWith('/api/dashboard')
  ) {
    // Let the network handle auth-protected requests
    return;
  }

  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension, browser extension, and other non-http requests
  if (!url.protocol.startsWith('http') || 
      url.protocol === 'chrome-extension:' || 
      url.protocol === 'moz-extension:' ||
      url.hostname.includes('localhost') && url.port === '3000' && url.pathname.includes('_next/webpack-hmr')) {
    return;
  }

  // Default pass-through with offline fallback for static assets only
  event.respondWith((async () => {
    try {
      // For static assets, try cache first
      if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
        const cache = await caches.open('shikshanam-static-v1.2.0');
        const cached = await cache.match(event.request);
        if (cached) {
          return cached;
        }
        
        const response = await fetch(event.request);
        if (response.ok) {
          cache.put(event.request, response.clone());
        }
        return response;
      }
      
      // For pages, network first
      return await fetch(event.request);
    } catch (err) {
      console.log('Service Worker: Network failed, trying offline fallback');
      const cached = await caches.match('/offline.html');
      return cached || new Response('Service Unavailable', { status: 503 });
    }
  })());
});

self.addEventListener('message', (event) => {
  // Accept messages but do not perform authenticated network calls from SW
  // Use postMessage pattern: SW asks the client (page) to perform protected requests.
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: 'shikshanam-v1.2.0' });
  }
  
  if (event.data && event.data.type === 'UNREGISTER_SW') {
    self.registration.unregister().then(() => {
      console.log('Service Worker: Unregistered successfully');
    });
  }
  
  // Handle requests for authenticated data by asking client to perform them
  if (event.data && event.data.type === 'REQUEST_AUTHENTICATED_DATA') {
    // Forward to all clients - they should handle the authenticated request
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage({
          type: 'PERFORM_AUTHENTICATED_REQUEST',
          requestId: event.data.requestId,
          url: event.data.url,
          options: event.data.options
        });
      });
    });
  }
  
  // Handle responses from client for authenticated requests
  if (event.data && event.data.type === 'AUTHENTICATED_REQUEST_RESULT') {
    // Store the result and notify any waiting processes
    const { requestId, success, result, error } = event.data;
    console.log('Service Worker: Received authenticated request result', { requestId, success });
    
    // You can store this in IndexedDB or handle it as needed
    // For now, just log it
    if (success) {
      console.log('Service Worker: Authenticated request succeeded', result);
    } else {
      console.error('Service Worker: Authenticated request failed', error);
    }
  }
});

console.log('Service Worker: Loaded successfully - Safe mode enabled');