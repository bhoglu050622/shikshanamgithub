'use client'

import { useEffect } from 'react'

export default function FontPreloader() {
  useEffect(() => {
    // Preload critical font weights
    const fontWeights = ['400', '600', '700']
    const fontFamilies = [
      'Inter:wght@300;400;500;600;700',
      'Nunito+Sans:wght@300;400;500;600;700',
      'DM+Serif+Display:ital@0;1',
      'Sura:wght@400'
    ]

    fontFamilies.forEach(family => {
      fontWeights.forEach(weight => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'font'
        link.type = 'font/woff2'
        link.crossOrigin = 'anonymous'
        link.href = `https://fonts.googleapis.com/css2?family=${family}&display=swap`
        document.head.appendChild(link)
      })
    })

    // Preload Devanagari subset
    const devanagariLink = document.createElement('link')
    devanagariLink.rel = 'preload'
    devanagariLink.as = 'font'
    devanagariLink.type = 'font/woff2'
    devanagariLink.crossOrigin = 'anonymous'
    devanagariLink.href = 'https://fonts.googleapis.com/css2?family=Sura:wght@400&display=swap&subset=devanagari'
    document.head.appendChild(devanagariLink)
  }, [])

  return null
}
