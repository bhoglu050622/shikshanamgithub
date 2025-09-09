/**
 * Loading States and Skeleton Components
 * Provides various loading indicators and placeholder skeletons
 */

'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  color = 'primary', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'border-blue-600',
    secondary: 'border-gray-600',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  return (
    <div className={`inline-block ${className}`}>
      <motion.div
        className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full ${colorClasses[color]}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
}

export function LoadingDots({ 
  size = 'md', 
  color = 'primary', 
  className = '' 
}: LoadingDotsProps) {
  const sizeClasses = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const colorClasses = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-600',
    white: 'bg-white',
    gray: 'bg-gray-400'
  };

  return (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2
          }}
        />
      ))}
    </div>
  );
}

interface LoadingPulseProps {
  className?: string;
  children?: React.ReactNode;
}

export function LoadingPulse({ className = '', children }: LoadingPulseProps) {
  return (
    <motion.div
      className={className}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
  rounded?: boolean;
  animate?: boolean;
}

export function Skeleton({ 
  width = '100%', 
  height = '1rem', 
  className = '', 
  rounded = false,
  animate = true
}: SkeletonProps) {
  const style = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height
  };

  const Component = animate ? motion.div : 'div';
  const animationProps = animate ? {
    animate: { opacity: [0.5, 1, 0.5] },
    transition: { duration: 1.5, repeat: Infinity }
  } : {};

  return (
    <Component
      className={`bg-gray-200 dark:bg-gray-700 ${rounded ? 'rounded-full' : 'rounded'} ${className}`}
      style={style}
      {...animationProps}
    />
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
  lineHeight?: string;
  spacing?: string;
}

export function SkeletonText({ 
  lines = 3, 
  className = '', 
  lineHeight = '1rem',
  spacing = '0.5rem'
}: SkeletonTextProps) {
  return (
    <div className={`space-y-2 ${className}`} style={{ '--line-height': lineHeight, '--spacing': spacing } as React.CSSProperties}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height={lineHeight}
          width={index === lines - 1 ? '75%' : '100%'}
        />
      ))}
    </div>
  );
}

interface SkeletonCardProps {
  className?: string;
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showButton?: boolean;
}

export function SkeletonCard({ 
  className = '',
  showImage = true,
  showTitle = true,
  showDescription = true,
  showButton = true
}: SkeletonCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
      {showImage && (
        <Skeleton height="200px" className="mb-4" />
      )}
      
      {showTitle && (
        <Skeleton height="1.5rem" width="80%" className="mb-2" />
      )}
      
      {showDescription && (
        <SkeletonText lines={2} className="mb-4" />
      )}
      
      {showButton && (
        <Skeleton height="2.5rem" width="120px" />
      )}
    </div>
  );
}

interface SkeletonListProps {
  items?: number;
  className?: string;
  itemHeight?: string;
  spacing?: string;
}

export function SkeletonList({ 
  items = 5, 
  className = '',
  itemHeight = '3rem',
  spacing = '1rem'
}: SkeletonListProps) {
  return (
    <div className={`space-y-4 ${className}`} style={{ '--spacing': spacing } as React.CSSProperties}>
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="flex items-center space-x-3">
          <Skeleton width="3rem" height="3rem" rounded />
          <div className="flex-1 space-y-2">
            <Skeleton height="1rem" width="60%" />
            <Skeleton height="0.75rem" width="40%" />
          </div>
        </div>
      ))}
    </div>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
}

export function LoadingOverlay({ 
  isLoading, 
  children, 
  message = 'Loading...',
  className = ''
}: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={`relative ${className}`}>
      {children}
      <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{message}</p>
        </div>
      </div>
    </div>
  );
}

interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export function LoadingButton({ 
  isLoading, 
  children, 
  loadingText = 'Loading...',
  className = '',
  disabled = false,
  onClick
}: LoadingButtonProps) {
  return (
    <button
      className={`relative ${className}`}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <LoadingSpinner size="sm" color="white" />
        </div>
      )}
      <span className={isLoading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
      {isLoading && (
        <span className="sr-only">{loadingText}</span>
      )}
    </button>
  );
}

interface LoadingPageProps {
  message?: string;
  className?: string;
}

export function LoadingPage({ 
  message = 'Loading...',
  className = ''
}: LoadingPageProps) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">{message}</p>
      </div>
    </div>
  );
}

interface LoadingInlineProps {
  message?: string;
  className?: string;
}

export function LoadingInline({ 
  message = 'Loading...',
  className = ''
}: LoadingInlineProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <LoadingSpinner size="sm" />
      <span className="text-sm text-gray-600 dark:text-gray-400">{message}</span>
    </div>
  );
}

// Pre-built skeleton components for common use cases
export const SkeletonComponents = {
  CourseCard: () => (
    <SkeletonCard 
      showImage={true}
      showTitle={true}
      showDescription={true}
      showButton={true}
    />
  ),
  
  UserProfile: () => (
    <div className="flex items-center space-x-4 p-4">
      <Skeleton width="4rem" height="4rem" rounded />
      <div className="flex-1 space-y-2">
        <Skeleton height="1.25rem" width="60%" />
        <Skeleton height="1rem" width="40%" />
      </div>
    </div>
  ),
  
  DashboardStats: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <Skeleton height="2rem" width="80%" className="mb-2" />
          <Skeleton height="1rem" width="60%" />
        </div>
      ))}
    </div>
  ),
  
  NavigationMenu: () => (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} height="2.5rem" width={index % 2 === 0 ? '100%' : '80%'} />
      ))}
    </div>
  ),
  
  Table: () => (
    <div className="space-y-2">
      <Skeleton height="3rem" width="100%" />
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} height="2.5rem" width="100%" />
      ))}
    </div>
  )
};
