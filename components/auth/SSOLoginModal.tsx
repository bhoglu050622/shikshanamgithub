'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ExternalLink, Shield, Users, BookOpen, Sparkles, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
}

export function SSOLoginModal({ isOpen, onClose, onSignup }: SSOLoginModalProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  
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

  const handleGoogleLogin = () => {
    setIsLoading(true)
    setError('')
    
    try {
      redirectToGoogleOAuth()
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
      // Redirect to Graphy email authentication
      window.location.href = AUTH_CONFIG.GRAPHY.AUTH_URL
      
    } catch (err) {
      console.error('Email Login Error:', err)
      setError('Failed to initiate email login. Please try again.')
    } finally {
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
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
            className="relative w-full max-w-4xl max-h-[95vh] overflow-hidden"
          >
          {/* Background with Glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/95 via-amber-50/95 to-yellow-50/95 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl" />
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-pink-200/30 rounded-full blur-xl" />
          
          {/* Om Symbol Decoration */}
          <div className="absolute top-6 right-6 text-4xl opacity-10">
            ॐ
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          <div className="relative z-10 flex flex-col lg:flex-row min-h-[600px]">
            {/* Left Side - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center"
            >
              <div className="text-center lg:text-left">
                {/* Logo/Brand */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", damping: 15 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-6 shadow-lg"
                >
                  <BookOpen className="w-8 h-8 text-white" />
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl lg:text-4xl font-bold mb-4"
                  style={{ fontFamily: "'Cinzel', serif", color: '#000000' }}
                >
                  Welcome to Shikshanam
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg text-gray-600 mb-8"
                >
                  Discover your inner wisdom through ancient knowledge and modern insights
                </motion.p>

                {/* Benefits List */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-4"
                >
                  {[
                    { icon: Sparkles, text: "Personalized personality assessments" },
                    { icon: BookOpen, text: "Curated course recommendations" },
                    { icon: Users, text: "Join our spiritual community" },
                    { icon: Shield, text: "Secure and private learning" }
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg flex items-center justify-center">
                        <benefit.icon className="w-4 h-4 text-orange-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{benefit.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="mt-8 pt-6 border-t border-gray-200"
                >
                  <div className="flex items-center justify-center lg:justify-start space-x-4 text-sm text-gray-700">
                    <div className="flex items-center space-x-1">
                      <Shield className="w-4 h-4 text-orange-600" />
                      <span>Secure Login</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-orange-600" />
                      <span>10,000+ Learners</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Login Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white/80 backdrop-blur-sm"
            >
              <div className="max-w-sm mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center mb-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In</h2>
                  <p className="text-gray-600">Choose your preferred method</p>
                </motion.div>

                <div ref={dialogRef} className="space-y-6">
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
                        className="w-full h-14 font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md transition-all duration-300"
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
                          className="pl-12 h-14 bg-white border-gray-200 focus:border-orange-500 focus:ring-orange-500/20 transition-all duration-300"
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
                          className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <p className="text-sm text-red-700">{error}</p>
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
                        className="w-full h-14 font-medium bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
