'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from '@/components/motion/SimpleMotionWrapper'
import { Menu, X, LogIn, Search, ChevronDown, BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'
import MegaMenu from './navigation/MegaMenu'
import { topLevelNavItems } from '@/lib/navigation-data'
import Button, { CTAButton } from './ui/button'
import { ROUTES } from '@/lib/routes'
import { shouldHideThemeToggle } from '@/lib/config/theme-exclusions'
import { usePathname } from 'next/navigation'
import { SSOLoginModal } from './auth/SSOLoginModal'
import { UserDropdown } from './auth/UserDropdown'
import { useAuth } from '@/lib/auth/AuthContext'
import { MobileNavigation } from './mobile/MobileNavigation'

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)
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

  return (
    <motion.header 
      initial={isClient ? { y: -100, opacity: 0 } : { y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 premium-header bg-background/95 dark:bg-background/95 backdrop-blur-md border-b border-border"
      role="banner"
    >
      <div className="container-responsive">
        <div className="flex items-center h-16">
          {/* Logo */}
          <motion.a 
            href={ROUTES.HOME}
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 md:space-x-3 flex-shrink-0 touch-target"
            aria-label="Shikshanam Home"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              try {
                router.push(ROUTES.HOME)
              } catch (error) {
                console.error('Navigation error:', error)
                window.location.href = ROUTES.HOME
              }
            }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-golden-olive via-deep-maroon to-copper-orange rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-white" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl md:text-2xl font-bold bg-gradient-to-r from-golden-olive via-deep-maroon to-copper-orange bg-clip-text text-transparent tracking-wide">
                शिक्षणम्
              </span>
              <span className="font-display text-xs md:text-sm font-medium text-foreground dark:text-foreground tracking-wider">
                Shikshanam
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation - Centered with proper spacing */}
          <nav id="navigation" className="hidden lg:flex items-center gap-8 mx-auto" role="navigation" aria-label="Main navigation">
            {topLevelNavItems.map((item) => (
              <div key={item.name} className="relative">
                <motion.button
                  onClick={(e: React.MouseEvent) => {
                    if (item.hasDropdown) {
                      e.preventDefault()
                      const newActiveDropdown = activeDropdown === item.name ? null : item.name
                      setActiveDropdown(newActiveDropdown)
                      setActiveGroupId(newActiveDropdown && item.groupId ? item.groupId : null)
                      setIsMegaMenuOpen(newActiveDropdown !== null)
                    } else {
                      // Close any open menus first
                      setIsMegaMenuOpen(false)
                      setActiveDropdown(null)
                      setActiveGroupId(null)
                      // Navigate to the target href for non-dropdown items
                      try {
                        // Use window.location for more reliable navigation
                        if (item.href.startsWith('http')) {
                          window.location.href = item.href
                        } else {
                          router.push(item.href)
                        }
                      } catch (error) {
                        console.error('Navigation error:', error)
                        // Fallback to window.location
                        window.location.href = item.href
                      }
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-medium flex items-center space-x-1 text-foreground dark:text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 tap-target whitespace-nowrap rounded-xl px-3 py-2 transition-colors duration-200"
                  aria-label={`${item.name}${item.hasDropdown ? ' menu' : ''}`}
                  aria-expanded={item.hasDropdown ? activeDropdown === item.name : undefined}
                  aria-haspopup={item.hasDropdown ? true : undefined}
                >
                  <item.icon className="w-4 h-4 text-foreground dark:text-foreground" aria-hidden="true" />
                  <span>{item.name}</span>
                  {item.hasDropdown && (
                    <ChevronDown className={cn(
                      "w-3 h-3 transition-transform duration-200 text-foreground dark:text-foreground",
                      activeDropdown === item.name ? "rotate-180" : ""
                    )} aria-hidden="true" />
                  )}
                </motion.button>
              </div>
            ))}
          </nav>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center ml-auto lg:hidden gap-2">
            {isClient && !hideThemeToggle && (
              <div className="mr-2">
                <ThemeToggle />
              </div>
            )}
            {isClient && !isLoading && (
              <>
                {user ? (
                  <div className="mr-2">
                    <UserDropdown />
                  </div>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => setIsLoginModalOpen(true)}
                    className="mr-2 touch-target"
                    aria-label="Login"
                  >
                    <LogIn className="h-5 w-5" />
                  </Button>
                )}
              </>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-primary/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 touch-target"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground dark:text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground dark:text-foreground" />
              )}
            </motion.button>
          </div>

          {/* Right side controls */}
          <div className="hidden lg:flex items-center gap-4 ml-auto flex-shrink-0">
            {/* Search Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsSearchOpen(!isSearchOpen)
              }}
              className="p-2 rounded-xl hover:bg-primary/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 tap-target"
              aria-label="Search"
              aria-expanded={isSearchOpen}
            >
              <Search className="w-5 h-5 text-foreground dark:text-foreground" aria-hidden="true" />
            </motion.button>

            {/* Theme Toggle - Hidden on excluded pages */}
            {!hideThemeToggle && <ThemeToggle />}

            {/* Authentication Section */}
            {!isLoading && (
              <>
                {user ? (
                  <UserDropdown />
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    className="flex items-center space-x-2"
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


      </div>
      
      {/* Mobile Navigation Drawer */}
      <div className="lg:hidden">
        <MobileNavigation
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* SSO Login Modal */}
      <SSOLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSignup={() => {
          console.log('Navigate to signup')
          // Handle signup navigation here
        }}
      />
    </motion.header>
  )
}
