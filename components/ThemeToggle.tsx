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

  return (
    <div className="flex items-center space-x-1 bg-secondary/50 rounded-2xl p-1 backdrop-blur-sm border border-primary/20">
      {themes.map(({ value, icon: Icon, label }) => (
        <motion.button
          key={value}
          onClick={() => {
            setTheme(value)
          }}
          className={`
            relative flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200
            ${theme === value 
              ? 'text-brand-primary' 
              : 'text-medium-contrast hover:text-brand-primary'
            }
            focus-ring tap-target
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Switch to ${label} theme`}
        >
          {theme === value && (
            <motion.div
              layoutId="theme-indicator"
              className="absolute inset-0 bg-card/80 rounded-xl shadow-sm"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <Icon className="w-4 h-4 relative z-10" />
          <span className="relative z-10 hidden sm:inline">{label}</span>
        </motion.button>
      ))}
    </div>
  )
}
