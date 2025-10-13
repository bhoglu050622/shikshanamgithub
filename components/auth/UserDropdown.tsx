'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, BookOpen, ChevronDown, ExternalLink, MapPin } from 'lucide-react'
import { useAuth } from '@/lib/auth/AuthContext'
import { generateGraphySSOUrl, type GraphyUser } from '@/lib/auth/GraphySSO'

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMyLearningHub = async () => {
    if (!user) return
    
    try {
      // Generate SSO URL with JWT token
      const graphyUser: GraphyUser = {
        email: user.email,
        name: user.name || undefined,
        mobile: undefined, // Phone not available in user object
        learnerId: user.id || undefined,
      }
      
      const ssoUrl = await generateGraphySSOUrl(
        graphyUser,
        'https://courses.shikshanam.in/t/u/activeCourses'
      )
      
      // Open in new tab with SSO token
      window.open(ssoUrl, '_blank')
      setIsOpen(false)
    } catch (error) {
      console.error('Failed to generate SSO URL:', error)
      // Fallback to direct URL (will require login)
      window.open('https://courses.shikshanam.in/t/u/activeCourses', '_blank')
      setIsOpen(false)
    }
  }

  const handleMyJourney = () => {
    // Navigate to journey page
    window.location.href = '/my-journey'
    setIsOpen(false)
  }

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
    // Redirect to homepage after logout
    window.location.href = '/'
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        aria-label="User menu"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="hidden sm:block text-sm font-medium text-foreground">
          {user.name || user.email.split('@')[0]}
        </span>
        <ChevronDown 
          className={`w-3 h-3 text-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-72 sm:w-80 min-w-[280px] max-w-[calc(100vw-2rem)] bg-background border border-border rounded-xl shadow-lg z-50 overflow-hidden user-dropdown-mobile"
          >
            {/* User Info with Dashboard Badge */}
            <div className="px-4 py-3 border-b border-border bg-muted/30 user-info">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate">
                    {user.name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground break-words overflow-wrap-anywhere">
                    {user.email}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    Dashboard
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {/* My Learning Hub */}
              <motion.button
                whileHover={{ backgroundColor: 'rgba(var(--primary), 0.1)' }}
                onClick={handleMyLearningHub}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-primary/10 transition-colors duration-200 focus-visible:outline-none focus-visible:bg-primary/10 min-h-[44px] menu-item"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate menu-item-text">
                    My Learning Hub
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 menu-item-description">
                    Access your courses and progress
                  </p>
                </div>
                <ExternalLink className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              </motion.button>

              {/* My Journey */}
              <motion.button
                whileHover={{ backgroundColor: 'rgba(var(--primary), 0.1)' }}
                onClick={handleMyJourney}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-primary/10 transition-colors duration-200 focus-visible:outline-none focus-visible:bg-primary/10 min-h-[44px] menu-item"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate menu-item-text">
                    My Journey
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 menu-item-description">
                    Track your learning progress
                  </p>
                </div>
              </motion.button>

              {/* Log out */}
              <motion.button
                whileHover={{ backgroundColor: 'rgba(var(--destructive), 0.1)' }}
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-destructive/10 transition-colors duration-200 focus-visible:outline-none focus-visible:bg-destructive/10 min-h-[44px] menu-item"
              >
                <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <LogOut className="w-4 h-4 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground text-sm truncate menu-item-text">
                    Log out
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2 menu-item-description">
                    Sign out of your account
                  </p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
