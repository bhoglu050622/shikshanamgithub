'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode, useState, useEffect } from 'react'

interface MotionWrapperProps extends MotionProps {
  children: ReactNode
  variant?: 'fade-lift' | 'stagger' | 'micro-scale' | 'parallax'
  delay?: number
  staggerDelay?: number
  className?: string
}

const motionVariants = {
  'fade-lift': {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  'stagger': {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
  },
  'micro-scale': {
    initial: { scale: 1 },
    whileHover: { scale: 1.03 },
    transition: { duration: 0.12, ease: "easeOut" }
  },
  'parallax': {
    initial: { y: 0 },
    whileInView: { y: -20 },
    transition: { duration: 0.6, ease: "easeOut" }
  }
}

export default function MotionWrapper({ 
  children, 
  variant = 'fade-lift', 
  delay = 0,
  staggerDelay = 0.08,
  className = '',
  ...props 
}: MotionWrapperProps) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const variantConfig = motionVariants[variant]
  
  const motionProps = {
    ...variantConfig,
    ...props,
    transition: {
      ...variantConfig.transition,
      delay: delay + staggerDelay,
      ...props.transition
    }
  }

  // Prevent hydration mismatch by not rendering motion until mounted
  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

// Stagger container for children
export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.08 
}: { 
  children: ReactNode
  className?: string
  staggerDelay?: number 
}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Prevent hydration mismatch by not rendering motion until mounted
  if (!mounted) {
    return <div className={className}>{children}</div>
  }
  
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  )
}

// Individual stagger item
export function StaggerItem({ 
  children, 
  className = '' 
}: { 
  children: ReactNode
  className?: string 
}) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Prevent hydration mismatch by not rendering motion until mounted
  if (!mounted) {
    return <div className={className}>{children}</div>
  }
  
  return (
    <motion.div
      className={className}
      variants={{
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
