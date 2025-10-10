/**
 * Accessible Modal Component
 * Enhanced modal with comprehensive accessibility features
 */

'use client';

import React, { useEffect, useRef, ReactNode } from 'react';
import { useAccessibilityContext } from './AccessibilityProvider';
import { AccessibleButton } from './AccessibleButton';

interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  initialFocus?: 'first' | 'close' | 'none';
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className = '',
  overlayClassName = '',
  contentClassName = '',
  initialFocus = 'first',
}: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const { focusManagement, handleEscapeKey, announce } = useAccessibilityContext();

  // Handle escape key
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      handleEscapeKey(event, onClose);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEscape, onClose, handleEscapeKey]);

  // Focus management
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Store the previously focused element
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    // Trap focus within modal
    const releaseFocus = focusManagement.trapFocus(modalRef.current);

    // Set initial focus
    if (initialFocus === 'close' && closeButtonRef.current) {
      closeButtonRef.current.focus();
    } else if (initialFocus === 'first') {
      focusManagement.focusFirst(modalRef.current);
    }

    // Announce modal opening
    announce(`Modal opened: ${title}`);

    return () => {
      releaseFocus();
      // Restore focus to previously focused element
      if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === 'function') {
        previouslyFocusedElement.focus();
      }
    };
  }, [isOpen, title, focusManagement, announce, initialFocus]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClassName}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      
      {/* Modal content */}
      <div
        ref={modalRef}
        className={`relative bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} ${className}`}
        role="document"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2
            id="modal-title"
            className="text-lg font-semibold text-gray-900"
          >
            {title}
          </h2>
          
          {showCloseButton && (
            <AccessibleButton
              ref={closeButtonRef}
              variant="ghost"
              size="sm"
              onClick={onClose}
              aria-label="Close modal"
              announceOnClick
              announceText="Modal closed"
              className="text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </AccessibleButton>
          )}
        </div>

        {/* Body */}
        <div className={`p-6 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccessibleModalFooterProps {
  children: ReactNode;
  className?: string;
}

export function AccessibleModalFooter({ children, className = '' }: AccessibleModalFooterProps) {
  return (
    <div className={`flex items-center justify-end space-x-3 p-6 border-t border-gray-200 ${className}`}>
      {children}
    </div>
  );
}
