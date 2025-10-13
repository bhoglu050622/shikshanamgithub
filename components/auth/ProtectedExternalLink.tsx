'use client'

import React from 'react'
import { useProtectedAction } from '@/lib/hooks/useProtectedAction'
import { SSOLoginModal } from './SSOLoginModal'

interface ProtectedExternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
  target?: string
  rel?: string
}

/**
 * ProtectedExternalLink - Wraps external links and enforces authentication
 * Shows login modal if user is not authenticated before opening the link
 */
export function ProtectedExternalLink({
  href,
  children,
  className,
  onClick,
  target = '_blank',
  rel = 'noopener noreferrer',
}: ProtectedExternalLinkProps) {
  const { 
    executeAction, 
    showLoginModal, 
    handleLoginSuccess, 
    handleLoginCancel 
  } = useProtectedAction()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    
    // Execute custom onClick if provided
    onClick?.()
    
    // Execute protected action (will show login modal if not authenticated)
    executeAction(href)
  }

  return (
    <>
      <a
        href={href}
        onClick={handleClick}
        className={className}
        target={target}
        rel={rel}
      >
        {children}
      </a>

      <SSOLoginModal
        isOpen={showLoginModal}
        onClose={handleLoginCancel}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  )
}

