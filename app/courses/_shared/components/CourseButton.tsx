'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface CourseButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function CourseButton({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  href,
  onClick,
  className = '',
  disabled = false,
  ariaLabel,
}: CourseButtonProps) {
  const baseClasses = 'course-btn course-focus-ring';
  const variantClasses = {
    primary: 'course-btn-primary',
    secondary: 'course-btn-secondary',
    tertiary: 'course-btn-tertiary',
  };
  const sizeClasses = {
    sm: 'course-btn-sm',
    md: '',
    lg: 'course-btn-lg',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        aria-label={ariaLabel}
        aria-disabled={disabled}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  );
}

