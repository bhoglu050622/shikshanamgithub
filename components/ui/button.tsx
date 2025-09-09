'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { trackEvent, type AnalyticsEvent } from '@/lib/analytics'

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
  analytics?: {
    event: AnalyticsEvent
    properties?: Record<string, any>
  }
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
    analytics,
    className,
    children,
    disabled,
    onClick,
    ...props
  }, ref) => {
    // Base classes for all buttons with premium design system
    const baseClasses = cn(
      // Base styles with enhanced accessibility and visual quality
      'inline-flex items-center justify-center font-semibold transition-all duration-300 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-premium-accent-primary focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'tap-target antialiased', // Ensures minimum 44px touch target and smooth text
      
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
      
      // Premium variant styles
      {
        // Primary - Premium blue with subtle shadows
        'bg-premium-accent-primary hover:bg-premium-accent-primary/90 text-white shadow-[0_4px_14px_rgba(37,99,235,0.1)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.15)] hover:scale-[1.02] active:scale-[0.98]': variant === 'primary',
        
        // Secondary - Clean white/dark background with border
        'bg-premium-bg-secondary text-premium-text-primary border border-premium-border hover:bg-premium-bg-primary shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:scale-[1.02] active:scale-[0.98]': variant === 'secondary',
        
        // Outline - Premium blue border
        'border-2 border-premium-accent-primary text-premium-accent-primary hover:bg-premium-accent-primary hover:text-white hover:scale-[1.02] active:scale-[0.98] bg-transparent': variant === 'outline',
        
        // Ghost - Transparent with subtle hover
        'text-premium-accent-primary hover:bg-premium-accent-primary/10 hover:scale-[1.02] active:scale-[0.98] bg-transparent': variant === 'ghost',
        
        // Link - Text only with premium accent
        'text-premium-accent-primary hover:text-premium-accent-primary/80 underline-offset-4 hover:underline p-0 h-auto bg-transparent': variant === 'link',
        
        // Destructive - Premium error styling
        'bg-premium-error hover:bg-premium-error/90 text-white shadow-[0_4px_14px_rgba(220,38,38,0.1)] hover:shadow-[0_6px_20px_rgba(220,38,38,0.15)] hover:scale-[1.02] active:scale-[0.98]': variant === 'destructive',
      },
      
      className
    )

    // Handle click with analytics
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (analytics) {
        trackEvent(analytics.event, analytics.properties)
      }
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
      analytics={{
        event: enrolled ? 'start_learning_click' : 'enroll_click',
        properties: { course_id: courseId }
      }}
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
      analytics={{
        event: purchased ? 'view_package_click' : 'buy_now_click',
        properties: { package_id: packageId }
      }}
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
      analytics={{
        event: 'course_view_click',
        properties: { course_id: courseId }
      }}
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
      analytics={{
        event: 'syllabus_view_click',
        properties: { course_id: courseId }
      }}
      {...props}
    >
      View Syllabus
    </Button>
  ),

  // Wishlist action
  Wishlist: ({ courseId, inWishlist, ...props }: { courseId: string; inWishlist?: boolean } & Omit<ButtonProps, 'children'>) => (
    <Button
      variant="ghost"
      analytics={{
        event: inWishlist ? 'remove_wishlist_click' : 'add_wishlist_click',
        properties: { course_id: courseId }
      }}
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
      analytics={{
        event: 'contact_click'
      }}
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
      analytics={{
        event: 'login_click'
      }}
      {...props}
    >
      Login
    </Button>
  ),
}

export { Button }
export default Button