'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

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
    event: string
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
    // Base classes for all buttons
    const baseClasses = cn(
      // Base styles
      'inline-flex items-center justify-center font-semibold transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-golden-olive focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'tap-target', // Ensures minimum 44px touch target
      
      // Size variants
      {
        'h-8 px-3 text-sm rounded-lg': size === 'sm',
        'h-10 px-4 text-base rounded-xl': size === 'md',
        'h-12 px-6 text-lg rounded-2xl': size === 'lg',
      },
      
      // Width
      {
        'w-full': fullWidth,
      },
      
      // Variant styles
      {
        // Primary - Golden olive gradient
        'bg-gradient-to-r from-golden-olive to-golden-olive/90 hover:from-golden-olive/90 hover:to-golden-olive/80 text-white shadow-lg hover:shadow-xl hover:scale-105': variant === 'primary',
        
        // Secondary - Deep maroon
        'bg-gradient-to-r from-deep-maroon to-deep-maroon/90 hover:from-deep-maroon/90 hover:to-deep-maroon/80 text-white shadow-lg hover:shadow-xl hover:scale-105': variant === 'secondary',
        
        // Outline - Golden olive border
        'border-2 border-golden-olive text-golden-olive hover:bg-golden-olive hover:text-white hover:scale-105': variant === 'outline',
        
        // Ghost - Transparent with hover
        'text-golden-olive hover:bg-golden-olive/10 hover:text-golden-olive': variant === 'ghost',
        
        // Link - Text only
        'text-golden-olive hover:text-golden-olive/80 underline-offset-4 hover:underline p-0 h-auto': variant === 'link',
        
        // Destructive - Red for dangerous actions
        'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl hover:scale-105': variant === 'destructive',
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
    return (
      <motion.button
        ref={ref}
        className={baseClasses}
        disabled={disabled}
        onClick={handleClick}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        {...props}
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