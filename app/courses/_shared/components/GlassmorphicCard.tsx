'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassmorphicCardProps {
  children: ReactNode;
  variant?: 'default' | 'premium' | 'sacred';
  glowColor?: string;
  borderGradient?: string;
  className?: string;
  delay?: number;
}

export default function GlassmorphicCard({
  children,
  variant = 'default',
  glowColor = 'rgba(251, 191, 36, 0.3)',
  borderGradient = 'linear-gradient(135deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.1))',
  className = '',
  delay = 0,
}: GlassmorphicCardProps) {
  const variants = {
    default: 'glass-card',
    premium: 'glass-card glow-golden',
    sacred: 'glass-card border-sacred',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className={`${variants[variant]} ${className}`}
      style={{
        '--glow-color': glowColor,
        '--border-gradient': borderGradient,
      } as React.CSSProperties}
      suppressHydrationWarning
    >
      <div className="relative z-10">{children}</div>
      <div 
        className="absolute inset-0 rounded-xl opacity-50 blur-xl" 
        style={{ 
          background: glowColor,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      />
    </motion.div>
  );
}

