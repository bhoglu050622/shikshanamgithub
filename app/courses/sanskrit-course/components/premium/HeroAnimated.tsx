'use client';

import { motion } from 'framer-motion';
import MotionWrapper from '@/components/motion/MotionWrapper';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import Image from 'next/image';

interface HeroAnimatedProps {
  title: string;
  subtitle: string;
  description: string;
  badges: { text: string; variant?: 'primary' | 'secondary' }[];
  primaryCta: { text: string; href: string };
  secondaryCta: { text: string; href: string };
  thumbnailUrl: string;
  stats: { label: string; value: string; icon: React.ReactNode }[];
}

export default function HeroAnimated({
  title,
  subtitle,
  description,
  badges,
  primaryCta,
  secondaryCta,
  thumbnailUrl,
  stats
}: HeroAnimatedProps) {
  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[var(--bg-sanskrit)]">
      {/* Animated Background */}
      <div className="absolute inset-0 devanagari-bg" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FEF3C7]/80 via-[#F5E6D3]/70 to-[#B8860B]/10" />
      
      {/* Floating Devanagari Characters (CSS Animation) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {['ॐ', 'अ', 'क', 'म', 'स'].map((char, i) => (
          <MotionWrapper
            key={i}
            className="absolute text-6xl text-[var(--gold-sanskrit)] animate-sanskrit-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 30}%`,
              animationDelay: `${i * 0.5}s`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: i * 0.2 }}
          >
            {char}
          </MotionWrapper>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <MotionWrapper
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6 md:space-y-8"
          >
            {/* Badges */}
            <MotionWrapper variants={itemVariants} className="flex flex-wrap gap-3">
              {badges.map((badge, index) => (
                <span
                  key={index}
                  className="badge-sanskrit"
                >
                  {badge.text}
                </span>
              ))}
            </MotionWrapper>

            {/* Main Headline */}
            <MotionWrapper
              as="h1"
              variants={itemVariants}
              className="sanskrit-heading-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[var(--text-primary-sanskrit)]"
            >
              {title}
            </MotionWrapper>

            {/* Subtitle in Devanagari */}
            <MotionWrapper
              as="p"
              variants={itemVariants}
              className="sanskrit-heading-primary text-2xl sm:text-3xl lg:text-4xl text-[var(--accent-sanskrit)]"
            >
              {subtitle}
            </MotionWrapper>

            {/* Description */}
            <MotionWrapper
              as="p"
              variants={itemVariants}
              className="sanskrit-body text-lg sm:text-xl text-[var(--text-secondary-sanskrit)] max-w-2xl leading-relaxed"
            >
              {description}
            </MotionWrapper>

            {/* CTA Buttons */}
            <MotionWrapper
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <ProtectedExternalLink
                href={primaryCta.href}
                className="btn-sanskrit-primary inline-flex items-center justify-center gap-2 focus-sanskrit group"
              >
                <span>{primaryCta.text}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 group-hover:translate-x-1 transition-transform" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </ProtectedExternalLink>

              <a
                href={secondaryCta.href}
                className="btn-sanskrit-secondary inline-flex items-center justify-center gap-2 focus-sanskrit"
              >
                {secondaryCta.text}
              </a>
            </MotionWrapper>

            {/* Stats Row */}
            <MotionWrapper
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-6 border-t border-[var(--gold-sanskrit)]/20"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="text-[var(--gold-sanskrit)]">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--text-primary-sanskrit)]">
                      {stat.value}
                    </div>
                    <div className="text-sm text-[var(--text-muted-sanskrit)]">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </MotionWrapper>
          </MotionWrapper>

          {/* Right Column - Promo Card */}
          <MotionWrapper
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="card-sanskrit-premium p-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-sanskrit)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.5rem]" />
              
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={thumbnailUrl}
                  alt="Sanskrit Course Preview"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--accent-sanskrit)]/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--accent-sanskrit)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--text-primary-sanskrit)]">30 Video Sessions</p>
                    <p className="text-sm text-[var(--text-muted-sanskrit)]">17+ Hours of Content</p>
                  </div>
                </div>
                <span className="badge-sanskrit">Beginner Friendly</span>
              </div>
            </div>
          </MotionWrapper>

        </div>
      </div>

      {/* Scroll Indicator */}
      <MotionWrapper
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, repeat: Infinity, repeatType: 'reverse' }}
      >
        <svg className="w-6 h-6 text-[var(--gold-sanskrit)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </MotionWrapper>
    </section>
  );
}

