'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  BookOpen,
  MapPin,
  Users,
  Heart,
  LayoutDashboard,
  Sun,
  Moon,
  Monitor
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/theme'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

// Essential navigation items for visitors
const mobileNavItems = [
  {
    name: 'Courses',
    href: '/courses',
    icon: BookOpen,
    description: 'Explore our courses'
  },
  {
    name: 'Packages',
    href: '/packages',
    icon: Heart,
    description: 'Learning packages'
  },
  {
    name: 'Wisdom',
    href: '/wisdom',
    icon: BookOpen,
    description: 'Articles & insights'
  },
  {
    name: 'About',
    href: '/about',
    icon: Users,
    description: 'Learn about us'
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: MapPin,
    description: 'Get in touch'
  }
]

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { theme, setTheme, actualTheme } = useTheme()

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/80"
            onClick={onClose}
          />

          {/* Mobile Navigation Overlay */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-16 left-4 right-4 z-50 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
          >
            <div className="flex flex-col max-h-[80vh] overflow-hidden">
              {/* Navigation Items */}
              <div className="overflow-y-auto">
                <div className="p-4">
                  {/* Main Navigation */}
                  <nav className="space-y-1">
                    {mobileNavItems.map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        onClick={handleLinkClick}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 group"
                      >
                        <item.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {item.name}
                        </span>
                      </motion.a>
                    ))}
                  </nav>

                  {/* User Authentication Section - Placeholder for future auth implementation */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                    <motion.button
                      onClick={handleLinkClick}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 font-medium w-full"
                    >
                      <span>Sign In</span>
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Theme Toggle */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Theme</span>
                  </div>
                  <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                    {[
                      { value: 'light' as const, icon: Sun, label: 'Light' },
                      { value: 'dark' as const, icon: Moon, label: 'Dark' },
                      { value: 'system' as const, icon: Monitor, label: 'Auto' }
                    ].map(({ value, icon: Icon, label }) => (
                      <motion.button
                        key={value}
                        onClick={() => {
                          setTheme(value)
                        }}
                        className={cn(
                          "flex-1 flex items-center justify-center space-x-1 px-2 py-2 rounded-md text-xs font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 tap-target",
                          theme === value 
                            ? 'text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-700 shadow-sm' 
                            : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                        )}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label={`Switch to ${label} theme`}
                      >
                        <Icon className="w-3 h-3" />
                        <span>{label}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
