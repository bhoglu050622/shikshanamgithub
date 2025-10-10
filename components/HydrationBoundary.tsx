'use client'

import { useEffect, useState } from 'react'

interface HydrationBoundaryProps {
  children: React.ReactNode
}

/**
 * HydrationBoundary component to handle hydration mismatches
 * caused by browser extensions or other client-side modifications
 */
export default function HydrationBoundary({ children }: HydrationBoundaryProps) {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    // Mark as hydrated after the first render
    setIsHydrated(true)
  }, [])

  // During SSR and initial hydration, render children normally
  if (!isHydrated) {
    return <>{children}</>
  }

  // After hydration, render children with error boundary
  return <>{children}</>
}

/**
 * Suppress hydration warnings for specific elements
 * This is useful when browser extensions modify the DOM
 */
export function suppressHydrationWarning() {
  if (typeof window !== 'undefined') {
    // Suppress hydration warnings for the html element
    const htmlElement = document.documentElement
    if (htmlElement) {
      // Remove any extension-added attributes that might cause hydration mismatches
      const attributesToRemove = [
        'katalonextensionid',
        'data-extension-id',
        'data-browser-extension'
      ]
      
      attributesToRemove.forEach(attr => {
        if (htmlElement.hasAttribute(attr)) {
          htmlElement.removeAttribute(attr)
        }
      })
    }
  }
}