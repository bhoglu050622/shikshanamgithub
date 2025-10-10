'use client'

import { useEffect } from 'react'

export default function ImagePreloader() {
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    try {
      // Simple image preloading with error handling
      const preloadImages = async () => {
        const criticalImages = [
          'https://shikshanam.in/wp-content/uploads/2024/03/Nyaya-Darshan.png',
          // Add other existing images here when available
        ]

        for (const src of criticalImages) {
          try {
            await new Promise<void>((resolve, reject) => {
              const img = new Image()
              img.onload = () => resolve()
              img.onerror = () => reject(new Error(`Failed to load ${src}`))
              img.src = src
            })
            console.log(`Preloaded: ${src}`)
          } catch (error) {
            console.warn(`Failed to preload image: ${src}`, error)
          }
        }
      }

      // Preload images after a delay to not block initial page load
      const timer = setTimeout(() => {
        preloadImages().catch(error => {
          console.warn('Image preloading failed:', error)
        })
      }, 1000)

      return () => clearTimeout(timer)
    } catch (error) {
      console.warn('Image preloader initialization failed:', error)
      return () => {}
    }
  }, [])

  return null // This component doesn't render anything
}
