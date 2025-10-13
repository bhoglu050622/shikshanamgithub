'use client'

import React, { useState } from 'react'
import { useAuth } from '@/lib/auth/AuthContext'
import { SSOLoginModal } from './SSOLoginModal'
import { Button, ButtonProps } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface ProtectedEnrollButtonProps extends Omit<ButtonProps, 'onClick' | 'href'> {
  courseId: string
  courseName?: string
  enrollUrl?: string
  onEnrollSuccess?: () => void
}

export function ProtectedEnrollButton({ 
  courseId, 
  courseName,
  enrollUrl,
  onEnrollSuccess,
  children = 'Enroll Now',
  ...buttonProps 
}: ProtectedEnrollButtonProps) {
  const { isLoggedIn, isLoading } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (isLoggedIn) {
      // User is logged in, proceed to enrollment
      const destination = enrollUrl || `/courses/${courseId}/enroll`
      router.push(destination)
      
      if (onEnrollSuccess) {
        onEnrollSuccess()
      }
    } else {
      // User not logged in, show login modal
      setShowLoginModal(true)
    }
  }

  const handleLoginSuccess = () => {
    setShowLoginModal(false)
    // After successful login, redirect to enrollment
    const destination = enrollUrl || `/courses/${courseId}/enroll`
    router.push(destination)
    
    if (onEnrollSuccess) {
      onEnrollSuccess()
    }
  }

  return (
    <>
      <Button
        {...buttonProps}
        onClick={handleClick}
        loading={isLoading}
      >
        {children}
      </Button>

      <SSOLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  )
}

// Convenience wrapper for common use cases
export function EnrollNowButton({ 
  courseId, 
  courseName,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  className
}: {
  courseId: string
  courseName?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  fullWidth?: boolean
  className?: string
}) {
  return (
    <ProtectedEnrollButton
      courseId={courseId}
      courseName={courseName}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
    >
      Enroll Now
    </ProtectedEnrollButton>
  )
}

// Convenience wrapper for "Start Learning" buttons on free courses
export function StartLearningButton({ 
  courseId, 
  courseName,
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  className
}: {
  courseId: string
  courseName?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  fullWidth?: boolean
  className?: string
}) {
  return (
    <ProtectedEnrollButton
      courseId={courseId}
      courseName={courseName}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
    >
      Start Learning
    </ProtectedEnrollButton>
  )
}

