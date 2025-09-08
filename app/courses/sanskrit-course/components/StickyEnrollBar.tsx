'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, ShoppingCart } from 'lucide-react'

export default function StickyEnrollBar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (scrollY > 200 && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-wisdom-900/95 backdrop-blur-md border-t border-saffron-200/30 dark:border-saffron-400/20 shadow-lg"
        >
          <div className="container-custom py-4">
            <div className="flex items-center justify-between gap-4">
              {/* Left - Course Info */}
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center">
                    <span className="text-white font-devanagari text-lg font-bold">सं</span>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-indigo-900 dark:text-wisdom-50 text-sm md:text-base truncate">
                    Sanskrit Course - From the Beginning
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs bg-saffron-100 dark:bg-saffron-900/30 text-saffron-700 dark:text-saffron-300">
                      Live Classes
                    </Badge>
                    <span className="text-xs text-indigo-600 dark:text-wisdom-400">
                      • 3 Months • Certificate
                    </span>
                  </div>
                </div>
              </div>

              {/* Center - Price */}
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="text-lg font-bold text-indigo-900 dark:text-wisdom-50">
                    ₹2,999
                  </div>
                  <div className="text-xs text-indigo-600 dark:text-wisdom-400 line-through">
                    ₹4,999
                  </div>
                </div>
                <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs">
                  40% OFF
                </Badge>
              </div>

              {/* Right - CTA */}
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  className="btn-primary whitespace-nowrap"
                  href="#pricing"
                  icon={<ShoppingCart className="w-4 h-4" />}
                  iconPosition="left"
                >
                  <span className="hidden sm:inline">Enroll Now</span>
                  <span className="sm:hidden">Join</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-wisdom-800"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
