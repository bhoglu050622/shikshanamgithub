'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// Button variant types
export type ButtonVariant = 
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'link'
  | 'destructive'

export type ButtonSize = 'sm' | 'md' | 'lg'

// Button props interface
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  children: React.ReactNode
}

// Button component with all variants and accessibility features
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    href,
    external = false,
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    className,
    children,
    disabled,
    onClick,
    ...props
  }, ref) => {
    // Base classes for all buttons with premium design system and accessibility
    const baseClasses = cn(
      // Base styles with enhanced accessibility and visual quality
      'inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
      'tap-target antialiased', // Ensures minimum 44px touch target and smooth text
      'relative', // For better positioning of child elements
      
      // Size variants with premium rounded corners (0.75rem-1rem)
      {
        'h-9 px-3 text-sm rounded-xl': size === 'sm',  // 12px border radius
        'h-11 px-4 text-base rounded-xl': size === 'md', // 12px border radius
        'h-12 px-6 text-lg rounded-2xl': size === 'lg',  // 16px border radius
      },
      
      // Width
      {
        'w-full': fullWidth,
      },
      
      // Premium variant styles with WCAG 2.1 AA compliance
      {
        // Primary - Premium gold with white text (4.5:1 contrast minimum)
        'bg-button-primary-bg hover:bg-button-primary-hover text-button-primary-text font-semibold shadow-[0_2px_8px_rgba(196,155,11,0.25)] hover:shadow-[0_4px_16px_rgba(196,155,11,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200': variant === 'primary',
        
        // Secondary - Burgundy with white text (4.5:1+ contrast)
        'bg-button-secondary-bg hover:bg-button-secondary-hover text-button-secondary-text font-semibold border border-button-secondary-bg shadow-[0_2px_8px_rgba(139,21,21,0.25)] hover:shadow-[0_4px_16px_rgba(139,21,21,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200': variant === 'secondary',
        
        // Outline - Accessible border with proper contrast (3:1 minimum)
        'border-2 border-button-primary-bg text-premium-text-primary hover:bg-button-primary-bg hover:text-button-primary-text hover:scale-[1.02] active:scale-[0.98] bg-premium-bg-secondary font-semibold transition-all duration-200': variant === 'outline',
        
        // Ghost - Subtle hover with accessible colors
        'text-premium-text-primary hover:bg-button-primary-bg/15 hover:text-premium-text-primary hover:scale-[1.02] active:scale-[0.98] bg-transparent font-medium transition-all duration-200': variant === 'ghost',
        
        // Link - Text only with accessible colors
        'text-button-primary-bg hover:text-button-primary-hover underline-offset-4 hover:underline p-0 h-auto bg-transparent font-medium transition-colors duration-200': variant === 'link',
        
        // Destructive - High contrast error styling
        'bg-destructive hover:opacity-90 text-destructive-foreground font-semibold shadow-[0_2px_8px_rgba(185,28,28,0.25)] hover:shadow-[0_4px_16px_rgba(185,28,28,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200': variant === 'destructive',
      },
      
      className
    )

    // Handle click
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) {
        onClick(e)
      }
    }

    // Loading state
    if (loading) {
      return (
        <button
          ref={ref}
          className={baseClasses}
          disabled
          {...props}
        >
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          {children}
        </button>
      )
    }

    // Link button
    if (href) {
      const linkProps = {
        className: baseClasses,
        ...(external && { target: '_blank', rel: 'noopener noreferrer' }),
      }

      if (external) {
        return (
          <a href={href} {...linkProps}>
            {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
          </a>
        )
      }

      return (
        <Link href={href} {...linkProps}>
          {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
        </Link>
      )
    }

    // Regular button
    const { 
      onAnimationStart, 
      onAnimationEnd, 
      onAnimationIteration,
      onTransitionEnd,
      onTransitionStart,
      onTransitionRun,
      onTransitionCancel,
      onDragStart,
      onDrag,
      onDragEnd,
      ...safeProps 
    } = props;
    
    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={disabled}
        onClick={handleClick}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        {...safeProps}
      >
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

// CTA Button variants for common actions
export const CTAButton = {
  // Course enrollment
  Enroll: ({ courseId, enrolled, ...props }: { courseId: string; enrolled?: boolean } & Omit<ButtonProps, 'children'>) => (
    <Button
      variant="primary"
      href={enrolled ? `/courses/${courseId}/learn` : `/courses/${courseId}/enroll`}
      {...props}
    >
      {enrolled ? 'Start Learning' : 'Enroll Now'}
    </Button>
  ),

  // Package purchase
  Buy: ({ packageId, purchased, ...props }: { packageId: string; purchased?: boolean } & Omit<ButtonProps, 'children'>) => (
    <Button
      variant="primary"
      href={purchased ? `/packages/${packageId}` : `/packages/${packageId}/buy`}
      {...props}
    >
      {purchased ? 'View Package' : 'Buy Now'}
    </Button>
  ),

  // View course details
  ViewCourse: ({ courseId, ...props }: { courseId: string } & Omit<ButtonProps, 'children'>) => (
    <Button
      variant="outline"
      href={`/courses/${courseId}`}
      {...props}
    >
      View Course
    </Button>
  ),

  // View syllabus
  Syllabus: ({ courseId, ...props }: { courseId: string } & Omit<ButtonProps, 'children'>) => (
    <Button
      variant="ghost"
      href={`/courses/${courseId}/syllabus`}
      {...props}
    >
      View Syllabus
    </Button>
  ),

  // Wishlist action
  Wishlist: ({ courseId, inWishlist, ...props }: { courseId: string; inWishlist?: boolean } & Omit<ButtonProps, 'children'>) => (
    <Button
      variant="ghost"
      {...props}
    >
      {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </Button>
  ),

  // Contact/Support
  Contact: (props: Omit<ButtonProps, 'children'>) => (
    <Button
      variant="outline"
      href="/contact"
      {...props}
    >
      Contact Us
    </Button>
  ),

  // Login/Signup
  Login: (props: Omit<ButtonProps, 'children'>) => (
    <Button
      variant="primary"
      href="/auth/login"
      {...props}
    >
      Login
    </Button>
  ),
}

export { Button }
export default Button