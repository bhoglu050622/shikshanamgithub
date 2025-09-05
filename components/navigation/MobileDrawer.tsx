'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Search, 
  LogIn, 
  ChevronDown, 
  ChevronRight,
  ArrowRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from '../ThemeToggle'
import { navigationGroups } from '@/lib/navigation-data'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId)
    } else {
      newExpanded.add(sectionId)
    }
    setExpandedSections(newExpanded)
  }

  const handleLinkClick = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white dark:bg-wisdom-900 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-saffron-200/30 dark:border-saffron-400/20">
                <h2 className="text-xl font-bold text-indigo-700 dark:text-wisdom-200">
                  Menu
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-saffron-50 dark:hover:bg-wisdom-800 transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-indigo-700 dark:text-wisdom-200" />
                </button>
              </div>

              {/* Utilities at top */}
              <div className="p-6 border-b border-saffron-200/30 dark:border-saffron-400/20">
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-wisdom-400" />
                    <input
                      type="text"
                      placeholder="Search courses, gurus..."
                      className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-wisdom-800/80 border border-saffron-200/30 dark:border-saffron-400/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-saffron-500 text-indigo-700 dark:text-wisdom-200 placeholder-wisdom-400"
                    />
                  </div>

                  {/* Theme Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-wisdom-600 dark:text-wisdom-400">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>

              {/* Navigation Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-2">
                  {navigationGroups.map((group) => (
                    <div key={group.id} className="border border-saffron-200/30 dark:border-saffron-400/20 rounded-xl overflow-hidden">
                      {/* Section Header */}
                      <button
                        onClick={() => toggleSection(group.id)}
                        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-saffron-50 to-saffron-100 dark:from-wisdom-800 dark:to-wisdom-700 hover:from-saffron-100 hover:to-saffron-200 dark:hover:from-wisdom-700 dark:hover:to-wisdom-600 transition-all duration-200"
                      >
                        <div className="flex items-center space-x-3">
                          <group.icon className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                          <span className="font-semibold text-indigo-700 dark:text-wisdom-200">
                            {group.title}
                          </span>
                        </div>
                        {expandedSections.has(group.id) ? (
                          <ChevronDown className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                        )}
                      </button>

                      {/* Section Content */}
                      <AnimatePresence>
                        {expandedSections.has(group.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-white dark:bg-wisdom-900">
                              {group.columns.map((column, columnIndex) => (
                                <div key={columnIndex} className="mb-6 last:mb-0">
                                  <h4 className="text-sm font-semibold text-indigo-700 dark:text-wisdom-200 mb-3 uppercase tracking-wide">
                                    {column.title}
                                  </h4>
                                  <div className="space-y-2">
                                    {column.links.map((link, linkIndex) => (
                                      <motion.a
                                        key={linkIndex}
                                        href={link.href}
                                        onClick={handleLinkClick}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-saffron-50 dark:hover:bg-wisdom-800 transition-all duration-200 group"
                                      >
                                        <link.icon className="w-4 h-4 text-saffron-500 mt-0.5 group-hover:text-saffron-600 transition-colors flex-shrink-0" />
                                        <div className="min-w-0 flex-1">
                                          <div className="font-medium text-indigo-700 dark:text-wisdom-200 group-hover:text-saffron-600 dark:group-hover:text-saffron-400 transition-colors text-sm">
                                            {link.name}
                                          </div>
                                          <div className="text-xs text-wisdom-500 dark:text-wisdom-400 mt-1">
                                            {link.description}
                                          </div>
                                        </div>
                                      </motion.a>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer CTA */}
              <div className="p-6 border-t border-saffron-200/30 dark:border-saffron-400/20">
                <motion.a
                  href="/schools"
                  onClick={handleLinkClick}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-saffron-600 to-saffron-700 dark:from-saffron-500 dark:to-saffron-600 text-white px-6 py-3 rounded-2xl font-medium hover:from-saffron-700 hover:to-saffron-800 dark:hover:from-saffron-600 dark:hover:to-saffron-700 transition-all duration-200 shadow-lg"
                >
                  <span>Browse All Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                {/* Login Button */}
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-2 mt-3 bg-white dark:bg-wisdom-800 border border-saffron-200 dark:border-saffron-400 text-saffron-600 dark:text-saffron-400 px-6 py-3 rounded-2xl font-medium hover:bg-saffron-50 dark:hover:bg-wisdom-700 transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
