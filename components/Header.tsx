'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogIn, Search, ChevronDown, BookOpen } from 'lucide-react'
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  
  const { isLoggedIn, user, isInitialized, logout } = useAuth()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <motion.header 
      initial={isClient ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-parchment-ivory/90 backdrop-blur-md border-b border-golden-olive/20 shadow-sm"
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
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-high-contrast hover:text-golden-olive font-medium transition-colors duration-200 flex items-center space-x-1 focus-ring tap-target whitespace-nowrap"
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
              className="p-2 rounded-xl hover:bg-sand-beige/50 transition-colors duration-200 focus-ring tap-target"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-high-contrast" />
            </motion.button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Login Button or User Dropdown */}
            {isInitialized && isLoggedIn && user ? (
              <UserDropdown user={user} onLogout={logout} />
            ) : isInitialized ? (
              <CTAButton.Login
                onClick={() => setIsLoginModalOpen(true)}
                size="md"
              />
            ) : (
              <div className="w-20 h-10 bg-sand-beige/20 rounded-xl animate-pulse" />
            )}
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3 ml-auto flex-shrink-0">
            {/* Mobile Theme Toggle */}
            <ThemeToggle />
            
            {/* Mobile Menu Button - Enhanced */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-gradient-to-r from-golden-olive/10 to-copper-orange/10 hover:from-golden-olive/20 hover:to-copper-orange/20 transition-all duration-200 focus-ring tap-target border border-golden-olive/20"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6">
                <motion.div
                  animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-golden-olive rounded-full transform -translate-x-1/2 -translate-y-1/2"
                />
                <motion.div
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-golden-olive rounded-full transform -translate-x-1/2 -translate-y-1/2"
                />
                <motion.div
                  animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-golden-olive rounded-full transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Mobile Menu Panel */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="lg:hidden absolute top-full left-0 right-0 z-50 bg-parchment-ivory/95 backdrop-blur-md border-t border-golden-olive/20 shadow-xl"
                role="navigation"
                aria-label="Mobile navigation"
              >
                <div className="p-4 space-y-4">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-golden-olive" />
                    <input
                      type="text"
                      placeholder="Search courses, gurus..."
                      className="w-full pl-10 pr-4 py-3 bg-white/80 border border-golden-olive/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-golden-olive text-dark-olive placeholder-sand-beige"
                    />
                  </div>

                  {/* Quick Navigation Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {topLevelNavItems.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsMenuOpen(false)
                          trackEvent('nav_click', { 
                            nav_item: item.name, 
                            nav_href: item.href,
                            from: 'header_mobile'
                          })
                        }}
                        className="flex flex-col items-center space-y-2 p-4 bg-white/60 hover:bg-white/80 border border-golden-olive/10 hover:border-golden-olive/30 rounded-xl transition-all duration-200 focus-ring tap-target group"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-br from-golden-olive/10 to-copper-orange/10 group-hover:from-golden-olive/20 group-hover:to-copper-orange/20 transition-all duration-200">
                          <item.icon className="w-5 h-5 text-golden-olive" />
                        </div>
                        <span className="font-medium text-sm text-dark-olive group-hover:text-golden-olive transition-colors">
                          {item.name}
                        </span>
                      </motion.a>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-2 border-t border-golden-olive/20">
                    <div className="flex space-x-3">
                      {isInitialized && isLoggedIn && user ? (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setIsMenuOpen(false)
                            logout()
                          }}
                          className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 focus-ring tap-target bg-red-50 text-red-600 hover:bg-red-100"
                        >
                          <LogIn className="w-4 h-4" />
                          <span>Logout</span>
                        </motion.button>
                      ) : isInitialized ? (
                        <CTAButton.Login
                          onClick={() => {
                            setIsMenuOpen(false)
                            setIsLoginModalOpen(true)
                          }}
                          size="md"
                          fullWidth
                        />
                      ) : (
                        <div className="flex-1 h-12 bg-sand-beige/20 rounded-xl animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

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
