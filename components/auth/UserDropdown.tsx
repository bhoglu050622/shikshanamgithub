'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { User, ChevronDown, LogOut, BookOpen, Compass, UserCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UserDropdownProps {
  user: {
    name: string
    email: string
    avatar?: string
  }
  onLogout: () => void
}

export default function UserDropdown({ user, onLogout }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    onLogout()
    setIsOpen(false)
  }

  const menuItems = [
    {
      icon: BookOpen,
      label: 'My Learning Hub',
      href: 'https://courses.shikshanam.in/t/u/activeCourses',
      description: 'Access your courses and progress',
      external: true
    },
    {
      icon: Compass,
      label: 'My Personalized Journey',
      href: '/dashboard',
      description: 'Your customized learning path'
    }
  ]

  return (
    <div className="relative" ref={dropdownRef}>
      {/* User Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 px-4 py-2 rounded-xl bg-gradient-to-r from-golden-olive/10 to-copper-orange/10 border border-golden-olive/20 hover:border-golden-olive/40 transition-all duration-200 focus-ring tap-target"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-golden-olive to-copper-orange flex items-center justify-center">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>

        {/* User Info */}
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium text-deep-maroon truncate max-w-32">
            {user.name}
          </p>
          <p className="text-xs text-sand-beige truncate max-w-32">
            {user.email}
          </p>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-golden-olive transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-80 bg-parchment-ivory border border-golden-olive/20 rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            {/* User Info Header */}
            <div className="px-6 py-4 border-b border-golden-olive/10 bg-gradient-to-r from-golden-olive/5 to-copper-orange/5">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-golden-olive to-copper-orange flex items-center justify-center">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-deep-maroon">{user.name}</p>
                  <p className="text-sm text-sand-beige">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  whileHover={{ backgroundColor: 'rgba(255, 138, 0, 0.05)' }}
                  className="flex items-center space-x-4 px-6 py-3 text-deep-maroon hover:bg-golden-olive/5 transition-colors duration-200 group"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-golden-olive/10 to-copper-orange/10 flex items-center justify-center group-hover:from-golden-olive/20 group-hover:to-copper-orange/20 transition-all duration-200">
                    <item.icon className="w-5 h-5 text-golden-olive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-deep-maroon">{item.label}</p>
                    <p className="text-sm text-sand-beige">{item.description}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Logout Button */}
            <div className="border-t border-golden-olive/10 p-2">
              <motion.button
                whileHover={{ backgroundColor: 'rgba(220, 38, 38, 0.05)' }}
                onClick={handleLogout}
                className="w-full flex items-center space-x-4 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors duration-200">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-red-600">Logout</p>
                  <p className="text-sm text-red-500">Sign out of your account</p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
