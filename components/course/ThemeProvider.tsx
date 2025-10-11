'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CourseTheme, getCourseTheme, generateThemeCSS } from '@/lib/course-themes'

interface ThemeContextType {
  theme: CourseTheme | null
  setTheme: (courseId: string) => void
  isLoading: boolean
}

const ThemeContext = createContext<ThemeContextType>({
  theme: null,
  setTheme: () => {},
  isLoading: true
})

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
  courseId?: string
}

export function ThemeProvider({ children, courseId }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<CourseTheme | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const setTheme = (newCourseId: string) => {
    const newTheme = getCourseTheme(newCourseId)
    setThemeState(newTheme)
    
    if (newTheme) {
      // Apply theme CSS variables
      const css = generateThemeCSS(newTheme)
      
      // Remove existing theme styles
      const existingStyle = document.getElementById('course-theme-styles')
      if (existingStyle) {
        existingStyle.remove()
      }
      
      // Add new theme styles
      const styleElement = document.createElement('style')
      styleElement.id = 'course-theme-styles'
      styleElement.textContent = css
      document.head.appendChild(styleElement)
    }
  }

  useEffect(() => {
    if (courseId) {
      setTheme(courseId)
    }
    setIsLoading(false)
  }, [courseId])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Higher-order component for course pages
export function withCourseTheme<P extends object>(
  Component: React.ComponentType<P>,
  courseId: string
) {
  return function ThemedComponent(props: P) {
    return (
      <ThemeProvider courseId={courseId}>
        <Component {...props} />
      </ThemeProvider>
    )
  }
}