'use client'

import { useEffect } from 'react'

export default function ClientServiceWorker() {
  useEffect(() => {
    // Only register service worker in production
    if (process.env.NODE_ENV !== 'production') return

    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw/sw.js', {
            scope: '/'
          })

          console.log('Service Worker registered successfully:', registration)

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, prompt user to refresh
                  if (confirm('New content is available. Refresh to update?')) {
                    window.location.reload()
                  }
                }
              })
            }
          })

          // Handle service worker messages
          navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'CACHE_UPDATED') {
              console.log('Cache updated:', event.data.payload)
            }
          })

        } catch (error) {
          console.error('Service Worker registration failed:', error)
        }
      }

      // Register service worker when page loads
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerSW)
      } else {
        registerSW()
      }
    }
  }, [])

  return null // This component doesn't render anything
}