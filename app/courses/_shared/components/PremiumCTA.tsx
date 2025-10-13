'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface PremiumCTAProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'gradient-pulse' | 'glass-morphic' | 'outlined-glow' | 'floating';
  icon?: LucideIcon;
  glowColor?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PremiumCTA({
  children,
  href,
  onClick,
  variant = 'gradient-pulse',
  icon: Icon,
  glowColor = 'rgba(251, 191, 36, 0.5)',
  className = '',
  size = 'md',
}: PremiumCTAProps) {
  const sizeClasses = {
    sm: 'px-6 py-3 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  };

  const variants = {
    'gradient-pulse': `
      bg-gradient-to-r from-amber-500 to-orange-500
      text-white font-bold rounded-lg
      shadow-xl hover:shadow-2xl
      transition-all duration-300
      hover:-translate-y-1
      animate-pulse-divine
    `,
    'glass-morphic': `
      glass-card text-white font-semibold rounded-lg
      border-2 border-white/30
      hover:border-white/60 hover:bg-white/20
      transition-all duration-300
      backdrop-blur-sm
    `,
    'outlined-glow': `
      bg-transparent text-white font-bold rounded-lg
      border-2 border-white/50
      hover:bg-white/10
      transition-all duration-300
      glow-golden
    `,
    floating: `
      bg-gradient-to-r from-purple-500 to-pink-500
      text-white font-bold rounded-full
      shadow-2xl hover:shadow-3xl
      transition-all duration-300
      hover:scale-105
      animate-float-gentle
    `,
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick };

  return (
    <Component
      {...props}
      className={`
        inline-flex items-center justify-center gap-3
        ${sizeClasses[size]}
        ${variants[variant]}
        ${className}
      `}
      style={{
        '--glow-color': glowColor,
      } as React.CSSProperties}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      suppressHydrationWarning
    >
      <span>{children}</span>
      {Icon && <Icon className="w-5 h-5" />}
    </Component>
  );
}

