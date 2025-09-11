'use client';
import { useEffect } from 'react';

export default function ClientServiceWorker() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    // Optionally unregister stale service workers (uncomment if needed)
    // navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));

    navigator.serviceWorker.register('/sw.js').then(reg => {
      console.log('SW registered', reg);
    }).catch(err => {
      console.warn('SW register failed', err);
    });

    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener('message', (e) => {
      console.log('Message from SW:', e.data);
      
      // If SW requests authenticated work, the client should do it and postMessage results back to SW
      if (e.data && e.data.type === 'PERFORM_AUTHENTICATED_REQUEST') {
        handleAuthenticatedRequest(e.data);
      }
    });

    // Handle authenticated requests from service worker
    const handleAuthenticatedRequest = async (data: any) => {
      try {
        const { requestId, url, options } = data;
        
        // Perform the authenticated request with credentials
        const response = await fetch(url, {
          ...options,
          credentials: 'include', // Include authentication cookies
          headers: {
            ...options?.headers,
            'Content-Type': 'application/json',
          }
        });
        
        const result = await response.json();
        
        // Send result back to service worker
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'AUTHENTICATED_REQUEST_RESULT',
            requestId,
            success: response.ok,
            result: response.ok ? result : null,
            error: response.ok ? null : result
          });
        }
      } catch (error) {
        console.error('Authenticated request failed:', error);
        
        // Send error back to service worker
        if (navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({
            type: 'AUTHENTICATED_REQUEST_RESULT',
            requestId: data.requestId,
            success: false,
            result: null,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    };

    // Cleanup function
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleAuthenticatedRequest);
    };
  }, []);

  return null;
}
