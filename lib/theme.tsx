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
  const [theme, setTheme] = useState<Theme>('system')
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Get saved theme from localStorage or default to system
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('shikshanam-theme') as Theme || 'system'
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      
      // Remove previous theme classes
      root.classList.remove('light', 'dark')
      
      let appliedTheme: 'light' | 'dark'
      
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        root.classList.add(systemTheme)
        appliedTheme = systemTheme
      } else {
        root.classList.add(theme)
        appliedTheme = theme
      }
      
      setActualTheme(appliedTheme)
      
      // Save theme preference
      localStorage.setItem('shikshanam-theme', theme)
      
      // Debug log
      console.log('Theme applied:', theme, '| Actual theme:', appliedTheme, '| Classes:', root.classList.toString())
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

// Theme-aware color utilities
export const getThemeColors = (actualTheme: 'light' | 'dark') => {
  const lightColors = {
    primary: {
      saffron: '#FF6F00',
      indigo: '#1A237E',
      teal: '#0C3B3C',
      gold: '#C49B0B',
    },
    background: {
      main: '#FAF8F4',
      secondary: '#F5EDDA',
      card: '#FFFFFF',
      accent: '#FFF8F0',
    },
    text: {
      primary: '#1A237E',
      secondary: '#0C3B3C',
      accent: '#FF6F00',
      muted: '#64748b',
    },
    border: {
      light: '#f1f5f9',
      medium: '#e2e8f0',
      accent: '#FF6F00',
    }
  }

  const darkColors = {
    primary: {
      saffron: '#FF8A00',
      indigo: '#3F51B5',
      teal: '#26A69A',
      gold: '#FFC107',
    },
    background: {
      main: '#0F172A',
      secondary: '#1E293B',
      card: '#334155',
      accent: '#1E293B',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
      accent: '#FF8A00',
      muted: '#94A3B8',
    },
    border: {
      light: '#334155',
      medium: '#475569',
      accent: '#FF8A00',
    }
  }

  return actualTheme === 'dark' ? darkColors : lightColors
}
