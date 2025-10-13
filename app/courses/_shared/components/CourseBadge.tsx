'use client';

import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface CourseBadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'info';
  icon?: LucideIcon;
  className?: string;
}

export default function CourseBadge({
  children,
  variant = 'primary',
  icon: Icon,
  className = '',
}: CourseBadgeProps) {
  const variantClasses = {
    primary: 'course-badge-primary',
    success: 'course-badge-success',
    warning: 'course-badge-warning',
    info: 'course-badge-info',
  };

  return (
    <span className={`course-badge ${variantClasses[variant]} ${className}`}>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </span>
  );
}

