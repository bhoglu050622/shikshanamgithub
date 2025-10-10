'use client'

import { useEffect } from 'react'

export default function FontPreloader() {
  useEffect(() => {
    // Only preload the fonts that are actually used in the layout
    const criticalFonts = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&display=swap',
      'https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Hindi:wght@400&display=swap'
    ]

    criticalFonts.forEach(href => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'style'
      link.href = href
      link.onload = () => {
        link.rel = 'stylesheet'
      }
      document.head.appendChild(link)
    })
  }, [])

  return null
}
