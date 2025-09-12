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
      if (typeof window !== 'undefined') {
        window.location.href = '/api/auth/google'
      }
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
      <DialogContent className="sm:max-w-md premium-modal">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-display font-bold premium-text-primary">
            Welcome to शिक्षणम्
          </DialogTitle>
          <p className="premium-text-secondary mt-2">
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
              variant="secondary"
              className="w-full h-12 font-medium flex items-center justify-center space-x-3"
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
              variant="primary"
              className="w-full h-12 font-medium flex items-center justify-center space-x-3"
            >
              <Mail className="w-5 h-5" />
              <span>Continue with Email</span>
            </Button>
          </motion.div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm premium-text-secondary">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-premium-accent-primary hover:text-premium-accent-primary/80">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-premium-accent-primary hover:text-premium-accent-primary/80">
              Privacy Policy
            </a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
