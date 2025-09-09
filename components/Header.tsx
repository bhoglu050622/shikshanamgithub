'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogIn, Search, ChevronDown, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'
import MegaMenu from './navigation/MegaMenu'
import MobileDrawer from './navigation/MobileDrawer'
import LoginModal from './auth/LoginModal'
import UserDropdown from './auth/UserDropdown'
import { useAuth } from '@/lib/auth-context'
import { topLevelNavItems } from '@/lib/navigation-data'
import Button, { CTAButton } from './ui/button'
import { ROUTES } from '@/lib/routes'
import { trackEvent } from '@/lib/analytics'
import { shouldHideThemeToggle } from '@/lib/config/theme-exclusions'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  
  const { isLoggedIn, user, isInitialized, logout } = useAuth()
  const pathname = usePathname()
  const router = useRouter()
  const hideThemeToggle = shouldHideThemeToggle(pathname)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <motion.header 
      initial={isClient ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 premium-header"
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center h-16">
          {/* Logo */}
          <motion.a 
            href={ROUTES.HOME}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 flex-shrink-0"
            onClick={() => trackEvent('home_click', { from: 'header_logo' })}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-golden-olive via-deep-maroon to-copper-orange rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold bg-gradient-to-r from-golden-olive via-deep-maroon to-copper-orange bg-clip-text text-transparent tracking-wide">
                शिक्षणम्
              </span>
              <span className="font-display text-sm font-medium text-golden-olive tracking-wider">
                Shikshanam
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation - Centered with proper spacing */}
          <nav id="navigation" className="hidden lg:flex items-center gap-8 mx-auto" role="navigation" aria-label="Main navigation">
            {topLevelNavItems.map((item) => (
              <div key={item.name} className="relative">
                <motion.button
                  onClick={() => {
                    if (item.hasDropdown) {
                      const newActiveDropdown = activeDropdown === item.name ? null : item.name
                      setActiveDropdown(newActiveDropdown)
                      setActiveGroupId(newActiveDropdown && item.groupId ? item.groupId : null)
                      setIsMegaMenuOpen(newActiveDropdown !== null)
                    } else {
                      trackEvent('nav_click', { 
                        nav_item: item.name, 
                        nav_href: item.href,
                        from: 'header_desktop'
                      })
                      // Navigate to the target href for non-dropdown items
                      router.push(item.href)
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="premium-nav-item font-medium flex items-center space-x-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium-accent-primary focus-visible:ring-offset-2 tap-target whitespace-nowrap rounded-xl px-3 py-2"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={cn(
                      "w-3 h-3 transition-transform duration-200",
                      activeDropdown === item.name ? "rotate-180" : ""
                    )} />
                  )}
                </motion.button>
              </div>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center gap-4 ml-auto flex-shrink-0">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsSearchOpen(!isSearchOpen)
                trackEvent('search_click', { from: 'header_desktop' })
              }}
              className="p-2 rounded-xl hover:bg-premium-accent-primary/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium-accent-primary focus-visible:ring-offset-2 tap-target"
              aria-label="Search"
            >
              <Search className="w-5 h-5 premium-text-primary" />
            </motion.button>

            {/* Theme Toggle - Hidden on excluded pages */}
            {!hideThemeToggle && <ThemeToggle />}

            {/* Login Button or User Dropdown */}
            {isInitialized && isLoggedIn && user ? (
              <UserDropdown user={user} onLogout={logout} />
            ) : isInitialized ? (
              <CTAButton.Login
                onClick={() => setIsLoginModalOpen(true)}
                size="md"
              />
            ) : (
              <div className="w-20 h-10 bg-premium-border rounded-xl animate-pulse" />
            )}
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3 ml-auto flex-shrink-0">
            {/* Mobile Menu Button - Enhanced */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-premium-accent-primary/10 hover:bg-premium-accent-primary/20 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium-accent-primary focus-visible:ring-offset-2 tap-target border border-premium-border"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6">
                <motion.div
                  animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-premium-accent-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
                />
                <motion.div
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-premium-accent-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
                />
                <motion.div
                  animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-premium-accent-primary rounded-full transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </motion.button>
          </div>
        </div>


        {/* MegaMenu */}
        <MegaMenu 
          isOpen={isMegaMenuOpen} 
          activeGroupId={activeGroupId}
          onClose={() => {
            setIsMegaMenuOpen(false)
            setActiveDropdown(null)
            setActiveGroupId(null)
          }} 
        />

        {/* Mobile Drawer */}
        <MobileDrawer 
          isOpen={isMenuOpen} 
          onClose={() => setIsMenuOpen(false)} 
        />

        {/* Login Modal */}
        <LoginModal 
          isOpen={isLoginModalOpen} 
          onClose={() => setIsLoginModalOpen(false)} 
        />
      </div>
    </motion.header>
  )
}
