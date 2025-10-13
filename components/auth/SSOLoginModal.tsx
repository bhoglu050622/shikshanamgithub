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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 min-h-screen">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md mx-auto"
          >

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="relative z-10 w-full max-w-md mx-auto flex items-center justify-center">
            {/* Centered Login Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3 }}
              className="w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20"
            >
              <div className="w-full flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-8"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4 shadow-lg">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Shikshanam</h2>
                  <p className="text-gray-600">Sign in to continue your learning journey</p>
                </motion.div>

                <div ref={dialogRef} className="space-y-6 w-full max-w-sm">
                  {/* Google OAuth Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={handleGoogleLogin}
                        variant="secondary"
                        className="w-full h-12 font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl"
                        disabled={isLoading}
                      >
                      {isLoading ? (
                        <div className="flex items-center space-x-3">
                          <div className="w-5 h-5 border-2 border-gray-400/30 border-t-gray-600 rounded-full animate-spin" />
                          <span>Connecting to Google...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-3">
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
                    transition={{ delay: 0.6 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-4 text-gray-700 font-medium">or</span>
                    </div>
                  </motion.div>

                  {/* Email Authentication */}
                  <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    onSubmit={(e) => { e.preventDefault(); handleEmailLogin(); }}
                    className="space-y-4"
                  >
                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-12 h-12 bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300 rounded-xl"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="p-4 bg-red-50 border border-red-200 rounded-xl"
                        >
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm text-red-700">{error}</p>
                              {error.includes('Google authentication is not configured') && (
                                <div className="mt-2">
                                  <a 
                                    href="/test-google-oauth" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                                  >
                                    Check Google OAuth Configuration →
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
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        className="w-full h-12 font-medium bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Redirecting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-3">
                            <Mail className="w-5 h-5" />
                            <span>Continue with Email</span>
                            <ExternalLink className="w-4 h-4" />
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>

                  {/* Sign Up Link */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-center pt-4 border-t border-gray-200"
                  >
                    <p className="text-sm text-gray-700">
                      Don't have an account?{' '}
                      <button
                        type="button"
                        onClick={handleSignupClick}
                        className="text-orange-600 hover:text-orange-700 font-medium transition-colors"
                        disabled={isLoading}
                      >
                        Sign up
                      </button>
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
