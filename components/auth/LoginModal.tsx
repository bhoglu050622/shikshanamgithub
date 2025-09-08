'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Mail, Chrome } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { EMAIL_AUTH_URL } from '@/lib/config/auth'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      // Redirect to Google OAuth
      window.location.href = '/api/auth/google'
    } catch (error) {
      console.error('Google login error:', error)
      setIsLoading(false)
    }
  }

  const handleEmailLogin = async () => {
    setIsLoading(true)
    try {
      // Redirect to email authentication
      window.location.href = EMAIL_AUTH_URL
    } catch (error) {
      console.error('Email login error:', error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-parchment-ivory border-golden-olive/20">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-display font-bold text-deep-maroon">
            Welcome to शिक्षणम्
          </DialogTitle>
          <p className="text-sand-beige mt-2">
            Choose your preferred way to continue your learning journey
          </p>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {/* Google Login Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full h-12 bg-white border-2 border-gray-200 hover:border-golden-olive text-deep-maroon font-medium rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <Chrome className="w-5 h-5" />
              <span>Continue with Google</span>
            </Button>
          </motion.div>

          {/* Email Login Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={handleEmailLogin}
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-golden-olive to-copper-orange hover:from-golden-olive/90 hover:to-copper-orange/90 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <Mail className="w-5 h-5" />
              <span>Continue with Email</span>
            </Button>
          </motion.div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-sand-beige">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-golden-olive hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-golden-olive hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
