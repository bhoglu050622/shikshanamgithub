'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LogIn, Search, ChevronDown, BookOpen } from 'lucide-react'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'
import MegaMenu from './navigation/MegaMenu'
import MobileDrawer from './navigation/MobileDrawer'
import { topLevelNavItems } from '@/lib/navigation-data'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null)

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 bg-parchment-ivory/90 backdrop-blur-md border-b border-golden-olive/20 shadow-sm"
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 flex-shrink-0"
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
          </motion.div>

          {/* Desktop Navigation - Centered with proper spacing */}
          <nav className="hidden lg:flex items-center gap-8 mx-auto" role="navigation" aria-label="Main navigation">
            {topLevelNavItems.map((item) => (
              <div key={item.name} className="relative">
                <motion.button
                  onClick={() => {
                    if (item.hasDropdown) {
                      const newActiveDropdown = activeDropdown === item.name ? null : item.name
                      setActiveDropdown(newActiveDropdown)
                      setActiveGroupId(newActiveDropdown ? item.groupId : null)
                      setIsMegaMenuOpen(newActiveDropdown !== null)
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-dark-olive hover:text-golden-olive font-medium transition-colors duration-200 flex items-center space-x-1 focus-ring tap-target whitespace-nowrap"
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
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-xl hover:bg-sand-beige/50 transition-colors duration-200 focus-ring tap-target"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-dark-olive" />
            </motion.button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Login Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-shikshanam-primary flex items-center space-x-2 px-6 py-2 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl focus-ring tap-target"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </motion.button>
          </div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center gap-2 ml-auto flex-shrink-0">
            {/* Mobile Theme Toggle */}
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-sand-beige/50 transition-colors duration-200 focus-ring tap-target"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-dark-olive" />
              ) : (
                <Menu className="w-6 h-6 text-dark-olive" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-golden-olive/20"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="py-4 space-y-3">
                {/* Search Bar */}
                <div className="px-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sand-beige" />
                    <input
                      type="text"
                      placeholder="Search courses, gurus..."
                      className="w-full pl-10 pr-4 py-3 bg-sand-beige/80 border border-golden-olive/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-golden-olive text-dark-olive placeholder-sand-beige"
                    />
                  </div>
                </div>

                {/* Navigation Items */}
                {topLevelNavItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 text-dark-olive hover:text-golden-olive hover:bg-sand-beige/50 rounded-xl transition-all duration-200 focus-ring tap-target"
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.a>
                ))}

                {/* Social Links */}
                <div className="pt-3 border-t border-golden-olive/20">
                  <div className="px-4 py-2">
                    <p className="text-sm text-sand-beige mb-3">Follow us</p>
                    <div className="flex space-x-4">
                      <a href="#" className="text-golden-olive hover:text-golden-olive/80 transition-colors">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a href="#" className="text-golden-olive hover:text-golden-olive/80 transition-colors">
                        <span className="sr-only">Instagram</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                        </svg>
                      </a>
                      <a href="#" className="text-golden-olive hover:text-golden-olive/80 transition-colors">
                        <span className="sr-only">YouTube</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm6.39-2.908a.75.75 0 01.766.027l3.5 2.25a.75.75 0 010 1.262l-3.5 2.25A.75.75 0 018 12.25v-4.5a.75.75 0 01.39-.658z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Login Button */}
                <div className="pt-3 border-t border-golden-olive/20">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="btn-shikshanam-primary w-full flex items-center justify-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200 focus-ring tap-target"
                  >
                    <LogIn className="w-5 h-5" />
                    <span>Login</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
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
      </div>
    </motion.header>
  )
}
