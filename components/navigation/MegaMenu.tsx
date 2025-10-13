'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import Link from 'next/link'
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
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Main container with proper alignment */}
          <div className="fixed top-20 left-0 right-0 bottom-0 pointer-events-none">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-start justify-center pointer-events-auto">
              <motion.div
                ref={menuRef}
                initial={{ y: -20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-7xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[calc(100vh-6rem)] overflow-hidden"
                role="dialog"
                aria-label="Navigation menu"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex min-h-[500px] max-h-[calc(100vh-6rem)]">
                  {/* Left Navigation */}
                  <div className="w-72 bg-gradient-to-b from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-l-3xl p-6 flex flex-col">
                    <div className="flex-1 space-y-2">
                      {navigationGroups.map((group) => (
                        <motion.button
                          key={group.id}
                          onClick={() => setActiveGroup(group.id)}
                          whileHover={{ x: 4, scale: 1.02 }}
                          aria-pressed={activeGroup === group.id}
                          aria-label={`Navigate to ${group.title} section`}
                          className={cn(
                            "w-full flex items-center space-x-3 px-4 py-4 rounded-xl text-left transition-all duration-200 group",
                            activeGroup === group.id
                              ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
                              : "text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-gray-700"
                          )}
                        >
                          <group.icon className={cn(
                            "w-5 h-5 transition-colors",
                            activeGroup === group.id ? "text-white" : "text-orange-500 group-hover:text-orange-600"
                          )} />
                          <span className="font-medium">{group.title}</span>
                          <ChevronDown className={cn(
                            "w-4 h-4 ml-auto transition-transform duration-200",
                            activeGroup === group.id ? "rotate-180" : ""
                          )} />
                        </motion.button>
                      ))}
                    </div>

                    {/* Utilities at bottom */}
                    <div className="mt-6 pt-4 border-t border-orange-200 dark:border-gray-600 space-y-4">
                      <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                        <Search className="w-4 h-4 text-orange-500" />
                        <button
                          onClick={() => setIsSearchOpen(!isSearchOpen)}
                          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                        >
                          Search
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          </div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Theme</span>
                        </div>
                        <div className="pl-7">
                          <ThemeToggle />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="flex-1 p-8 overflow-y-auto">
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
                          <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-orange-200 dark:border-gray-600">
                            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                              <currentGroup.icon className="w-10 h-10 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-3">
                                <span className="text-xs font-semibold text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900 px-3 py-1 rounded-full">
                                  {currentGroup.featured.badge}
                                </span>
                              </div>
                              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                {currentGroup.featured.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                {currentGroup.featured.description}
                              </p>
                              <Link href={currentGroup.featured.href} passHref legacyBehavior>
                                <motion.a
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={onClose}
                                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                  <span>Explore Now</span>
                                  <ArrowRight className="w-4 h-4" />
                                </motion.a>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* Navigation Columns */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                          {currentGroup.columns.map((column, index) => (
                            <div key={index}>
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                                <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mr-3"></div>
                                {column.title}
                              </h4>
                              <div className="space-y-4">
                                {column.links.map((link, linkIndex) => (
                                  <Link key={linkIndex} href={link.href} passHref legacyBehavior>
                                    <motion.a
                                      onClick={onClose}
                                      whileHover={{ x: 6, scale: 1.02 }}
                                      className="block p-4 rounded-xl hover:bg-orange-50 dark:hover:bg-gray-800 transition-all duration-200 group border border-transparent hover:border-orange-200 dark:hover:border-gray-600"
                                    >
                                      <div className="flex items-start space-x-4">
                                        <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 rounded-lg flex items-center justify-center group-hover:from-orange-200 group-hover:to-amber-200 dark:group-hover:from-orange-800 dark:group-hover:to-amber-800 transition-all duration-200">
                                          <link.icon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors mb-1">
                                            {link.name}
                                          </div>
                                          <div className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {link.description}
                                          </div>
                                        </div>
                                      </div>
                                    </motion.a>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Bottom CTA */}
                        <div className="mt-10 pt-6 border-t border-orange-200 dark:border-gray-600">
                          <Link href="/courses" passHref legacyBehavior>
                            <motion.a
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={onClose}
                              className="inline-flex items-center space-x-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors group"
                            >
                              <span>Browse All Courses</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                          </Link>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900 dark:to-amber-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                            Choose a category
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 max-w-md">
                            Select a category from the left to explore our comprehensive learning content
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
