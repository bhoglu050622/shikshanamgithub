'use client';
import { useEffect } from 'react';

export default function ClientServiceWorker() {
  useEffect(() => {
    // Only register service worker in production and in browser
    if (typeof window !== 'undefined' && 
        'serviceWorker' in navigator && 
        process.env.NODE_ENV === 'production') {
      
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .then(reg => {
          console.log('Service Worker registered successfully', reg);
          
          // Handle updates
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker is available
                  console.log('New service worker available');
                  // You can show a notification to the user here
                }
              });
            }
          });
        })
        .catch(err => {
          console.warn('Service Worker registration failed', err);
        });
    }
  }, []);

  return null;
}
