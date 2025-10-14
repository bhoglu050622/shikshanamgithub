'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ExternalLink, Shield, Users, BookOpen, Sparkles, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { redirectToGoogleOAuth } from '@/lib/auth/GoogleOAuth'
import { useAuth } from '@/lib/auth/AuthContext'
import { AUTH_CONFIG } from '@/lib/config/auth'

// Google Logo SVG Component
const GoogleLogo = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" className="flex-shrink-0">
    <path fill="#4285F4" d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"/>
    <path fill="#34A853" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.48h4.96c-.21 1.12-.84 2.08-1.79 2.66l2.85 2.2c2.01-1.86 3.17-4.6 3.17-7.85z"/>
    <path fill="#FBBC05" d="M3.88 10.78c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09L.96 4.24C.35 5.66 0 7.28 0 9s.35 3.34.96 4.76l2.92-2.26z"/>
    <path fill="#EA4335" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.85-2.2c-.76.53-1.78.9-3.11.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.76C2.45 16.68 5.48 18 9 18z"/>
  </svg>
)

interface SSOLoginModalProps {
  isOpen: boolean
  onClose: () => void
  onSignup?: () => void
  onLoginSuccess?: () => void
}

export function SSOLoginModal({ isOpen, onClose, onSignup, onLoginSuccess }: SSOLoginModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login, isLoggedIn } = useAuth()
  
  const dialogRef = useRef<HTMLDivElement>(null)

  // Focus management
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      const firstInput = dialogRef.current.querySelector('input') as HTMLElement
      firstInput?.focus()
    }
  }, [isOpen])

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setEmail('')
      setIsLoading(false)
      setError('')
    }
  }, [isOpen])

  // Call onLoginSuccess when user successfully logs in
  useEffect(() => {
    if (isLoggedIn && isOpen && onLoginSuccess) {
      onLoginSuccess()
    }
  }, [isLoggedIn, isOpen, onLoginSuccess])

  const handleGoogleLogin = () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Check if Google OAuth is configured
      if (!AUTH_CONFIG.GOOGLE.CLIENT_ID) {
        setError('Google authentication is not configured. Please set up Google OAuth credentials in your environment variables. Check the setup documentation for details.')
        setIsLoading(false)
        return
      }
      
      // Get current page URL as return URL
      const returnUrl = window.location.pathname + window.location.search
      redirectToGoogleOAuth(returnUrl)
    } catch (err) {
      console.error('Google OAuth Error:', err)
      setError('Failed to initiate Google login. Please try again.')
      setIsLoading(false)
    }
  }

  const handleEmailLogin = async () => {
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Check if AUTH_URL is configured
      if (!AUTH_CONFIG.GRAPHY.AUTH_URL) {
        setError('Authentication service is not configured. Please contact support.')
        setIsLoading(false)
        return
      }
      
      // Get current page URL as return URL
      const returnUrl = window.location.pathname + window.location.search
      const encodedReturnUrl = encodeURIComponent(returnUrl)
      
      // Redirect to Graphy email authentication with return URL
      window.location.href = `${AUTH_CONFIG.GRAPHY.AUTH_URL}?returnurl=${encodedReturnUrl}`
      
    } catch (err) {
      console.error('Email Login Error:', err)
      setError('Failed to initiate email login. Please try again.')
      setIsLoading(false)
    }
  }

  const handleSignupClick = () => {
    onClose()
    if (onSignup) {
      onSignup()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 min-h-screen overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 30, stiffness: 400, duration: 0.3 }}
            className="relative z-10 w-full max-w-[420px] my-8"
          >
            {/* Centered Login Form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.05 }}
              className="w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-gray-200/50 dark:border-gray-800/50"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-110 touch-manipulation"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>

              <div className="w-full flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-6"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4 shadow-xl">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1.5">Welcome Back</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Sign in to continue learning</p>
                </motion.div>

                <div ref={dialogRef} className="space-y-4 w-full">
                  {/* Google OAuth Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Button
                        onClick={handleGoogleLogin}
                        variant="secondary"
                        className="w-full h-11 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 shadow-sm hover:shadow transition-all duration-200 rounded-xl touch-manipulation"
                        disabled={isLoading}
                      >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-600 rounded-full animate-spin" />
                          <span className="text-sm">Connecting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2.5">
                          <GoogleLogo />
                          <span>Continue with Google</span>
                        </div>
                      )}
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative py-2"
                  >
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-white dark:bg-gray-900 px-3 text-gray-500 dark:text-gray-400 font-medium">or</span>
                    </div>
                  </motion.div>

                  {/* Email Authentication */}
                  <motion.form
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    onSubmit={(e) => { e.preventDefault(); handleEmailLogin(); }}
                    className="space-y-3"
                  >
                    {/* Email Field */}
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-orange-500 transition-colors" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-11 text-sm bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-200 rounded-xl text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 touch-manipulation"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                        >
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
                              {error.includes('Google authentication is not configured') && (
                                <div className="mt-1.5">
                                  <a 
                                    href="/test-google-oauth" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                                  >
                                    Check OAuth Configuration →
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Email Login Button */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <Button
                        type="submit"
                        className="w-full h-11 text-sm font-semibold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl touch-manipulation"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Redirecting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Mail className="w-4 h-4" />
                            <span>Continue with Email</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>

                  {/* Sign Up Link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center pt-3 border-t border-gray-200 dark:border-gray-700"
                  >
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={handleSignupClick}
                        className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-semibold transition-colors touch-manipulation"
                        disabled={isLoading}
                      >
                        Sign up
                      </button>
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
