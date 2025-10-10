'use client'

import { useEffect } from 'react'
import { preloadCriticalImages } from '@/lib/image-preloader'

export default function ImagePreloader() {
  useEffect(() => {
    // Preload critical images after component mounts
    const timer = setTimeout(() => {
      preloadCriticalImages()
    }, 1000) // Delay to not block initial page load

    return () => clearTimeout(timer)
  }, [])

  return null // This component doesn't render anything
}
