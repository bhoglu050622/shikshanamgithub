'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: 'light' | 'dark'
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Default to light theme to align with Shikshanam's spiritual brand identity
  const [theme, setTheme] = useState<Theme>('light')
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Get saved theme from localStorage or default to light
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('shikshanam-theme') as Theme || 'light'
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      
      // Remove previous theme classes
      root.classList.remove('light', 'dark')
      
      let currentTheme: 'light' | 'dark'
      if (theme === 'system') {
        currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        root.classList.add(currentTheme)
        setActualTheme(currentTheme)
      } else {
        currentTheme = theme
        root.classList.add(theme)
        setActualTheme(theme)
      }
      
      // Apply premium color system variables
      applyThemeVariables(currentTheme)
      
      // Save theme preference
      localStorage.setItem('shikshanam-theme', theme)
    }
  }, [theme])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = () => {
        if (theme === 'system') {
          const systemTheme = mediaQuery.matches ? 'dark' : 'light'
          setActualTheme(systemTheme)
          document.documentElement.classList.remove('light', 'dark')
          document.documentElement.classList.add(systemTheme)
          // Apply premium color system variables
          applyThemeVariables(systemTheme)
        }
      }

      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// Import the new color system
import { getThemeColors as getNewThemeColors, generateCSSVariables } from './colors'

// Theme-aware color utilities (legacy support)
export const getThemeColors = (actualTheme: 'light' | 'dark') => {
  const lightColors = {
    primary: {
      saffron: '#FF8A00',
      indigo: '#1A237E',
      teal: '#0A7B6C',
      gold: '#C49B0B',
    },
    background: {
      main: '#ffffff',
      secondary: '#fefefe',
      card: '#ffffff',
      accent: '#f8fafc',
    },
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      accent: '#FF8A00',
      muted: '#94a3b8',
    },
    border: {
      light: '#f1f5f9',
      medium: '#e2e8f0',
      accent: '#FF8A00',
    }
  }

  const darkColors = {
    primary: {
      saffron: '#FF8A00',
      indigo: '#3F51B5',
      teal: '#2dd4bf',
      gold: '#fbbf24',
    },
    background: {
      main: '#0f172a',
      secondary: '#1e293b',
      card: '#1e293b',
      accent: '#334155',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1',
      accent: '#FF8A00',
      muted: '#64748b',
    },
    border: {
      light: '#334155',
      medium: '#475569',
      accent: '#FF8A00',
    }
  }

  return actualTheme === 'dark' ? darkColors : lightColors
}

// New premium theme utilities
export const getPremiumThemeColors = (actualTheme: 'light' | 'dark') => {
  return getNewThemeColors(actualTheme)
}

// Apply CSS variables to document root
export const applyThemeVariables = (theme: 'light' | 'dark') => {
  if (typeof window === 'undefined') return
  
  const cssVariables = generateCSSVariables(theme)
  const root = document.documentElement
  
  Object.entries(cssVariables).forEach(([property, value]) => {
    root.style.setProperty(property, value)
  })
}
