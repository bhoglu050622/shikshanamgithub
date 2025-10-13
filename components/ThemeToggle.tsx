'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/lib/theme'

export default function ThemeToggle() {
  const { theme, setTheme, actualTheme } = useTheme()

  const themes = [
    { value: 'light' as const, icon: Sun, label: 'Light' },
    { value: 'dark' as const, icon: Moon, label: 'Dark' },
  ]

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    console.log('Theme change requested:', newTheme)
    setTheme(newTheme)
    // Force immediate DOM update for better UX
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(newTheme)
    }
  }

  return (
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
      {themes.map(({ value, icon: Icon, label }) => {
        const isActive = actualTheme === value || theme === value
        
        return (
          <motion.button
            key={value}
            onClick={() => handleThemeChange(value)}
            className={`
              relative flex-1 flex flex-col items-center justify-center px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 h-12
              ${isActive
                ? 'bg-white shadow-sm' 
                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
              }
              focus-ring tap-target
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`Switch to ${label} theme`}
            aria-pressed={isActive}
          >
            <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-yellow-500' : 'text-gray-600 dark:text-gray-400'}`} />
            <div className={`text-[10px] leading-tight font-medium ${isActive ? 'text-yellow-600' : 'text-gray-600 dark:text-gray-400'}`}>
              {label === 'Light' ? (
                <>
                  <div>Lig</div>
                  <div>ht</div>
                </>
              ) : (
                <>
                  <div>Da</div>
                  <div>rk</div>
                </>
              )}
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}
