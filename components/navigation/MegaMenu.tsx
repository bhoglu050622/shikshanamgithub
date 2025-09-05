'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { 
  Search,
  LogIn,
  ArrowRight,
  ChevronDown,
  BookOpen
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from '../ThemeToggle'
import { navigationGroups } from '@/lib/navigation-data'

interface MegaMenuProps {
  isOpen: boolean
  activeGroupId?: string | null
  onClose: () => void
}

export default function MegaMenu({ isOpen, activeGroupId, onClose }: MegaMenuProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(activeGroupId || null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Update active group when activeGroupId changes
  useEffect(() => {
    setActiveGroup(activeGroupId || null)
  }, [activeGroupId])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      const currentIndex = navigationGroups.findIndex(group => group.id === activeGroup)
      
      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          const nextIndex = (currentIndex + 1) % navigationGroups.length
          setActiveGroup(navigationGroups[nextIndex].id)
          break
        case 'ArrowUp':
          event.preventDefault()
          const prevIndex = currentIndex <= 0 ? navigationGroups.length - 1 : currentIndex - 1
          setActiveGroup(navigationGroups[prevIndex].id)
          break
        case 'Home':
          event.preventDefault()
          setActiveGroup(navigationGroups[0].id)
          break
        case 'End':
          event.preventDefault()
          setActiveGroup(navigationGroups[navigationGroups.length - 1].id)
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, activeGroup])

  const currentGroup = navigationGroups.find(group => group.id === activeGroup)

  // Don't render until mounted to avoid hydration issues
  if (!mounted) return null

  const megaMenuContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
        >
          {/* Clamped shell container */}
          <div className="fixed top-16 left-0 right-0 bottom-0 pointer-events-none">
            {/* Centered inner container */}
            <div className="max-w-screen-2xl mx-auto px-4 h-full flex items-start justify-center pointer-events-auto">
              <motion.div
                ref={menuRef}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-6xl bg-white dark:bg-wisdom-900 rounded-2xl shadow-2xl border border-saffron-200/30 dark:border-saffron-400/20 max-h-[calc(100vh-5rem)] overflow-y-auto"
                role="dialog"
                aria-label="Navigation menu"
                aria-modal="true"
              >
                <div className="flex min-h-[400px] max-h-[calc(100vh-6rem)]">
                  {/* Left Navigation */}
                  <div className="w-64 bg-gradient-to-b from-saffron-50 to-saffron-100 dark:from-wisdom-800 dark:to-wisdom-900 rounded-l-2xl p-6">
                    <div className="space-y-2">
                      {navigationGroups.map((group) => (
                        <motion.button
                          key={group.id}
                          onClick={() => setActiveGroup(group.id)}
                          whileHover={{ x: 4 }}
                          aria-pressed={activeGroup === group.id}
                          aria-label={`Navigate to ${group.title} section`}
                          className={cn(
                            "w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                            activeGroup === group.id
                              ? "bg-saffron-500 text-white shadow-lg"
                              : "text-indigo-700 dark:text-wisdom-200 hover:bg-saffron-200 dark:hover:bg-wisdom-700"
                          )}
                        >
                          <group.icon className="w-5 h-5" />
                          <span className="font-medium">{group.title}</span>
                          <ChevronDown className={cn(
                            "w-4 h-4 ml-auto transition-transform duration-200",
                            activeGroup === group.id ? "rotate-180" : ""
                          )} />
                        </motion.button>
                      ))}
                    </div>

                    {/* Utilities at bottom */}
                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Search className="w-4 h-4 text-wisdom-500" />
                        <button
                          onClick={() => setIsSearchOpen(!isSearchOpen)}
                          className="text-sm text-wisdom-600 dark:text-wisdom-400 hover:text-saffron-600 dark:hover:text-saffron-400 transition-colors"
                        >
                          Search
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ThemeToggle />
                        <span className="text-sm text-wisdom-600 dark:text-wisdom-400">Theme</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 p-8">
                    {currentGroup ? (
                      <motion.div
                        key={currentGroup.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="h-full"
                      >
                        {/* Featured Item */}
                        <div className="mb-8">
                          <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-saffron-50 to-saffron-100 dark:from-wisdom-800 dark:to-wisdom-700 rounded-2xl">
                            <div className="w-24 h-24 bg-gradient-to-br from-saffron-400 to-saffron-600 rounded-xl flex items-center justify-center">
                              <currentGroup.icon className="w-12 h-12 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-sm font-medium text-saffron-600 dark:text-saffron-400 bg-saffron-200 dark:bg-saffron-800 px-2 py-1 rounded-full">
                                  {currentGroup.featured.badge}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-indigo-700 dark:text-wisdom-200 mb-2">
                                {currentGroup.featured.title}
                              </h3>
                              <p className="text-wisdom-600 dark:text-wisdom-400 mb-4">
                                {currentGroup.featured.description}
                              </p>
                              <motion.a
                                href={currentGroup.featured.href}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center space-x-2 bg-saffron-500 hover:bg-saffron-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200"
                              >
                                <span>Explore</span>
                                <ArrowRight className="w-4 h-4" />
                              </motion.a>
                            </div>
                          </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="grid grid-cols-3 gap-8">
                          {currentGroup.columns.map((column, index) => (
                            <div key={index}>
                              <h4 className="text-lg font-semibold text-indigo-700 dark:text-wisdom-200 mb-4">
                                {column.title}
                              </h4>
                              <div className="space-y-3">
                                {column.links.map((link, linkIndex) => (
                                  <motion.a
                                    key={linkIndex}
                                    href={link.href}
                                    whileHover={{ x: 4 }}
                                    className="block p-3 rounded-xl hover:bg-saffron-50 dark:hover:bg-wisdom-800 transition-all duration-200 group"
                                  >
                                    <div className="flex items-start space-x-3">
                                      <link.icon className="w-5 h-5 text-saffron-500 mt-0.5 group-hover:text-saffron-600 transition-colors" />
                                      <div>
                                        <div className="font-medium text-indigo-700 dark:text-wisdom-200 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors">
                                          {link.name}
                                        </div>
                                        <div className="text-sm text-wisdom-500 dark:text-wisdom-400">
                                          {link.description}
                                        </div>
                                      </div>
                                    </div>
                                  </motion.a>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-8 pt-6 border-t border-saffron-200/30 dark:border-saffron-400/20">
                          <motion.a
                            href="/schools"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center space-x-2 text-saffron-600 dark:text-saffron-400 hover:text-saffron-700 dark:hover:text-saffron-300 font-medium transition-colors"
                          >
                            <span>Browse All Courses</span>
                            <ArrowRight className="w-4 h-4" />
                          </motion.a>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <BookOpen className="w-16 h-16 text-saffron-400 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-indigo-700 dark:text-wisdom-200 mb-2">
                            Choose a category
                          </h3>
                          <p className="text-wisdom-500 dark:text-wisdom-400">
                            Select a category from the left to explore our content
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Render the mega menu in a portal to avoid stacking context issues
  return createPortal(megaMenuContent, document.body)
}
