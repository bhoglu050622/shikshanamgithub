'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BookOpen,
  MapPin,
  Users,
  Heart,
  UserCheck,
  Lightbulb,
  MessageSquare,
  Sun,
  Moon,
  Home
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
    name: 'Home',
    href: '/',
    icon: Home,
    description: 'Return to homepage'
  },
  {
    name: 'Personality Test',
    href: '/personality-test',
    icon: UserCheck,
    description: 'Discover yourself'
  },
  {
    name: 'Courses',
    href: '/courses',
    icon: BookOpen,
    description: 'Explore our courses'
  },
  {
    name: 'Wisdom',
    href: '/wisdom',
    icon: Lightbulb,
    description: 'Articles & insights'
  },
  {
    name: 'About Us',
    href: '/about',
    icon: Users,
    description: 'Learn about us'
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: MessageSquare,
    description: 'Get in touch'
  }
]

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

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
            className="fixed inset-0 z-[140] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Mobile Navigation Overlay */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-24 left-4 right-4 z-[150] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
          >
            <div className="flex flex-col max-h-[calc(100vh-7rem)] overflow-hidden">
              {/* Navigation Items */}
              <div className="overflow-y-auto p-4">
                <nav className="space-y-2">
                  {mobileNavItems.map((item, index) => (
                    <Link 
                      key={item.name} 
                      href={item.href}
                      onClick={handleLinkClick}
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "flex items-center space-x-3 p-3.5 rounded-xl transition-all duration-200",
                          pathname === item.href
                            ? "bg-gradient-to-r from-orange-100 to-rose-100 dark:from-orange-950/40 dark:to-rose-950/40"
                            : "hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        <div className={cn(
                          "p-2 rounded-lg",
                          pathname === item.href
                            ? "bg-gradient-to-r from-orange-500 to-rose-500"
                            : "bg-gray-200 dark:bg-gray-700"
                        )}>
                          <item.icon className={cn(
                            "w-5 h-5",
                            pathname === item.href
                              ? "text-white"
                              : "text-gray-600 dark:text-gray-400"
                          )} />
                        </div>
                        <div className="flex-1">
                          <div className={cn(
                            "font-medium text-sm",
                            pathname === item.href
                              ? "text-orange-700 dark:text-orange-400"
                              : "text-gray-900 dark:text-white"
                          )}>
                            {item.name}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {item.description}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Theme Toggle */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50/50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Appearance</span>
                </div>
                <div className="flex items-center bg-white dark:bg-gray-900 rounded-xl p-1 border border-gray-200 dark:border-gray-700">
                  {[
                    { value: 'light' as const, icon: Sun, label: 'Light' },
                    { value: 'dark' as const, icon: Moon, label: 'Dark' }
                  ].map(({ value, icon: Icon, label }) => (
                    <motion.button
                      key={value}
                      onClick={() => setTheme(value)}
                      className={cn(
                        "flex-1 flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                        theme === value 
                          ? 'bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Switch to ${label} theme`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
