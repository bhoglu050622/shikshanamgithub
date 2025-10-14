'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, LogIn, Search, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'
import { topLevelNavItems } from '@/lib/navigation-data'
import Button from './ui/button'
import { ROUTES } from '@/lib/routes'
import { shouldHideThemeToggle } from '@/lib/config/theme-exclusions'
import { usePathname } from 'next/navigation'
import { SSOLoginModal } from './auth/SSOLoginModal'
import { UserDropdown } from './auth/UserDropdown'
import { useAuth } from '@/lib/auth/AuthContext'
import MobileDrawer from './navigation/MobileDrawer'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const hideThemeToggle = shouldHideThemeToggle(pathname)
  const { user, isLoading } = useAuth()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleNavigation = (href: string) => {
    try {
      if (href.startsWith('http')) {
        window.location.href = href
      } else {
        router.push(href)
      }
    } catch (error) {
      console.error('Navigation error:', error)
      window.location.href = href
    }
  }

  return (
    <motion.header 
      initial={isClient ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50"
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a 
            href={ROUTES.HOME}
            whileHover={{ scale: 1.02 }}
            className="flex items-center space-x-3 flex-shrink-0 group"
            aria-label="Shikshanam Home"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              handleNavigation(ROUTES.HOME)
            }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-rose-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg transform transition-transform group-hover:rotate-6">
                <BookOpen className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/20 via-rose-600/20 to-purple-700/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-orange-600 via-rose-600 to-purple-700 bg-clip-text text-transparent tracking-tight">
                शिक्षणम्
              </span>
              <span className="font-display text-sm font-medium text-gray-600 dark:text-gray-400 tracking-wide">
                Shikshanam
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {topLevelNavItems.map((item) => (
              <Link 
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-xl font-medium text-base transition-all duration-200",
                  pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                    ? "bg-gradient-to-r from-orange-100 to-rose-100 dark:from-orange-950/30 dark:to-rose-950/30 text-orange-700 dark:text-orange-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400"
                )}
              >
                <item.icon className="w-5 h-5" aria-hidden="true" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {isClient && !hideThemeToggle && <ThemeToggle />}
            {isClient && !isLoading && user && <UserDropdown />}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>

          {/* Desktop Right Controls */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" aria-hidden="true" />
            </motion.button>

            {/* Theme Toggle */}
            {!hideThemeToggle && <ThemeToggle />}

            {/* Authentication */}
            {!isLoading && (
              <>
                {user ? (
                  <UserDropdown />
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Drawer */}
      <MobileDrawer 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      {/* SSO Login Modal */}
      <SSOLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignup={() => {
          console.log('Navigate to signup')
        }}
      />
    </motion.header>
  )
}