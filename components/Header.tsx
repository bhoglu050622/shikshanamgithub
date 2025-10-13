'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogIn, Search, ChevronDown, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'
import MegaMenu from './navigation/MegaMenu'
import MobileDrawer from './navigation/MobileDrawer'
import { topLevelNavItems } from '@/lib/navigation-data'
import Button, { CTAButton } from './ui/button'
import { ROUTES } from '@/lib/routes'
import { shouldHideThemeToggle } from '@/lib/config/theme-exclusions'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/lib/auth/AuthContext'
import { SSOLoginModal } from './auth/SSOLoginModal'
import { UserDropdown } from './auth/UserDropdown'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const pathname = usePathname()
  const hideThemeToggle = shouldHideThemeToggle(pathname)
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <motion.header 
      initial={isClient ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-background/98 backdrop-blur-md border-b border-border shadow-sm"
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center h-16">
          {/* Logo */}
          <Link href={ROUTES.HOME} passHref legacyBehavior>
            <motion.a
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
              aria-label="Shikshanam Home"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-button-primary-bg to-button-primary-hover rounded-2xl flex items-center justify-center shadow-md">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-premium-text-primary tracking-wide">
                  शिक्षणम्
                </span>
                <span className="font-display text-sm font-medium text-premium-text-secondary tracking-wider">
                  Shikshanam
                </span>
              </div>
            </motion.a>
          </Link>

          {/* Desktop Navigation - Centered with proper spacing */}
          <nav id="navigation" className="hidden lg:flex items-center gap-8 mx-auto" role="navigation" aria-label="Main navigation">
            {topLevelNavItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <motion.button
                    onClick={(e) => {
                      e.preventDefault()
                      const newActiveDropdown = activeDropdown === item.name ? null : item.name
                      setActiveDropdown(newActiveDropdown)
                      setActiveGroupId(newActiveDropdown && item.groupId ? item.groupId : null)
                      setIsMegaMenuOpen(newActiveDropdown !== null)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="font-semibold flex items-center space-x-1 text-premium-text-primary hover:text-button-primary-bg hover:bg-button-primary-bg/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 tap-target whitespace-nowrap rounded-xl px-4 py-2.5 transition-all duration-200"
                    aria-label={`Navigate to ${item.name}`}
                    aria-expanded={activeDropdown === item.name}
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    <ChevronDown className={cn(
                      "w-3 h-3 transition-transform duration-200",
                      activeDropdown === item.name ? "rotate-180" : ""
                    )} />
                  </motion.button>
                ) : (
                  <Link href={item.href} passHref legacyBehavior>
                    <motion.a
                      onClick={() => {
                        // Close any open menus
                        setIsMegaMenuOpen(false)
                        setActiveDropdown(null)
                        setActiveGroupId(null)
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="font-semibold flex items-center space-x-1 text-premium-text-primary hover:text-button-primary-bg hover:bg-button-primary-bg/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 tap-target whitespace-nowrap rounded-xl px-4 py-2.5 transition-all duration-200"
                      aria-label={`Navigate to ${item.name}`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </motion.a>
                  </Link>
                )}
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
              }}
              className="p-2.5 rounded-xl hover:bg-button-primary-bg/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 tap-target"
              aria-label="Search"
              aria-expanded={isSearchOpen}
            >
              <Search className="w-5 h-5 text-premium-text-primary" />
            </motion.button>

            {/* Authentication Section */}
            {isLoggedIn ? (
              <UserDropdown />
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center space-x-2"
                aria-label="Login to your account"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Button>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-3 ml-auto flex-shrink-0">
            {/* Mobile Menu Button - Enhanced */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-3 rounded-xl bg-button-primary-bg/15 hover:bg-button-primary-bg/25 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 tap-target border-2 border-button-primary-bg/30"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              <div className="relative w-6 h-6">
                <motion.div
                  animate={isMenuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-button-primary-bg rounded-full transform -translate-x-1/2 -translate-y-1/2"
                />
                <motion.div
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-button-primary-bg rounded-full transform -translate-x-1/2 -translate-y-1/2"
                />
                <motion.div
                  animate={isMenuOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-button-primary-bg rounded-full transform -translate-x-1/2 -translate-y-1/2"
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
        <SSOLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />

      </div>
    </motion.header>
  )
}
