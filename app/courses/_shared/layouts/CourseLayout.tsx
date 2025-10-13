'use client';

import { ReactNode } from 'react';
import { ThemeVariant } from '../types/course.types';
import '../course-landing.css';

interface CourseLayoutProps {
  children: ReactNode;
  theme: ThemeVariant;
  className?: string;
}

export default function CourseLayout({ children, theme, className = '' }: CourseLayoutProps) {
  const themeClass = `theme-${theme}`;
  
  return (
    <div className={`min-h-screen bg-gray-50 ${themeClass} ${className}`}>
      {children}
    </div>
  );
}

