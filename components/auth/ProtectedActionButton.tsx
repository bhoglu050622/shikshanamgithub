'use client'

import React from 'react'
import { useProtectedAction, ProtectedAction } from '@/lib/hooks/useProtectedAction'
import { SSOLoginModal } from './SSOLoginModal'
import { Button, ButtonProps } from '@/components/ui/button'

interface ProtectedActionButtonProps extends Omit<ButtonProps, 'onClick'> {
  action: ProtectedAction
  requireAuth?: boolean
  onActionSuccess?: () => void
  onActionCancel?: () => void
}

/**
 * ProtectedActionButton - Button component that enforces authentication
 * Shows login modal if user is not authenticated before executing the action
 */
export function ProtectedActionButton({
  action,
  requireAuth = true,
  onActionSuccess,
  onActionCancel,
  children,
  ...buttonProps
}: ProtectedActionButtonProps) {
  const { 
    executeAction, 
    showLoginModal, 
    handleLoginSuccess, 
    handleLoginCancel,
    isLoading 
  } = useProtectedAction({
    onSuccess: onActionSuccess,
    onCancel: onActionCancel,
  })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    if (requireAuth) {
      executeAction(action)
    } else {
      // If auth not required, execute immediately
      if (typeof action === 'string') {
        window.open(action, '_blank', 'noopener,noreferrer')
      } else {
        action()
      }
    }
  }

  return (
    <>
      <Button
        {...buttonProps}
        onClick={handleClick}
        disabled={buttonProps.disabled || isLoading}
      >
        {children}
      </Button>

      {requireAuth && (
        <SSOLoginModal
          isOpen={showLoginModal}
          onClose={handleLoginCancel}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  )
}

