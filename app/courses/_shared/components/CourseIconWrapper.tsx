'use client';

import { LucideIcon } from 'lucide-react';

interface CourseIconWrapperProps {
  icon: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function CourseIconWrapper({
  icon: Icon,
  size = 'md',
  className = '',
}: CourseIconWrapperProps) {
  const sizeClasses = {
    sm: 'course-icon-wrapper-sm',
    md: 'course-icon-wrapper-md',
    lg: 'course-icon-wrapper-lg',
  };

  return (
    <div className={`course-icon-wrapper ${sizeClasses[size]} ${className}`}>
      <Icon className="w-full h-full" />
    </div>
  );
}

