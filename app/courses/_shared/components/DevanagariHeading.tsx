'use client';

import { motion } from 'framer-motion';

interface DevanagariHeadingProps {
  sanskrit: string;
  english?: string;
  gradient?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

export default function DevanagariHeading({
  sanskrit,
  english,
  gradient = 'linear-gradient(135deg, var(--theme-primary-500), var(--theme-secondary-500))',
  size = 'lg',
  className = '',
  animate = true,
}: DevanagariHeadingProps) {
  const sizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl lg:text-6xl',
    xl: 'text-5xl md:text-6xl lg:text-7xl',
  };

  const HeadingContent = () => (
    <div className={`text-center ${className}`}>
      <h1
        className={`devanagari-heading ${sizeClasses[size]} mb-4`}
        style={{
          background: gradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '2px 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        {sanskrit}
      </h1>
      {english && (
        <p className="text-xl md:text-2xl text-gray-600 font-medium mt-2">
          {english}
        </p>
      )}
    </div>
  );

  if (!animate) {
    return <HeadingContent />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      suppressHydrationWarning
    >
      <HeadingContent />
    </motion.div>
  );
}

