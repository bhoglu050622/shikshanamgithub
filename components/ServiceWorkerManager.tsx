'use client';

import { useEffect } from 'react';

export default function ServiceWorkerManager() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Unregister any existing service workers first
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          console.log('Unregistering old service worker:', registration.scope);
          registration.unregister();
        });
      });

      // Register new service worker
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration.scope);
          
          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker is available
                  console.log('New service worker available');
                  // Optionally show update notification to user
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'INVALID_SESSION') {
          console.log('Service Worker detected invalid session');
          // Handle invalid session - redirect to login or refresh token
          window.location.href = '/auth/login';
        }
        
        if (event.data?.type === 'BACKGROUND_SYNC_REQUESTED') {
          console.log('Background sync requested by service worker');
          // Handle background sync in main thread instead of service worker
          // This prevents authentication issues
        }
      });
    }
  }, []);

  return null;
}
