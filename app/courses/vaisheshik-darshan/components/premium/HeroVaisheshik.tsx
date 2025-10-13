'use client';

import { motion } from 'framer-motion';
import MotionWrapper from '@/components/motion/MotionWrapper';
import { Play, GraduationCap, Clock, Languages } from 'lucide-react';
import { heroVariants, getReducedMotionVariants } from '../../motion.config';
import { useState } from 'react';

interface HeroVaisheshikProps {
  title: string;
  subtitle: string;
  price: string;
  duration: string;
  level: string;
  language: string;
  onDemoClick: () => void;
  onEnrollClick: () => void;
  stats?: {
    students?: string;
    rating?: number;
    satisfaction?: string;
  };
}

export default function HeroVaisheshik({
  title,
  subtitle,
  price,
  duration,
  level,
  language,
  onDemoClick,
  onEnrollClick,
  stats
}: HeroVaisheshikProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="vaisheshik-hero">
      {/* Subtle background pattern */}
      <div className="vaisheshik-hero-background">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="devanagari-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <text x="50" y="50" fontSize="80" fill="currentColor" opacity="0.4">ॐ</text>
              <text x="150" y="150" fontSize="60" fill="currentColor" opacity="0.3">॥</text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#devanagari-pattern)" />
        </svg>
      </div>

      <div className="vaisheshik-hero-grid">
        {/* Content Left */}
        <MotionWrapper
          className="vaisheshik-hero-content"
          initial="hidden"
          animate="visible"
          variants={getReducedMotionVariants(heroVariants)}
        >
          {/* Badge Strip */}
          <div className="vaisheshik-badge-strip">
            <span className="vaisheshik-badge">
              <GraduationCap size={16} />
              {level}
            </span>
            <span className="vaisheshik-badge">
              <Languages size={16} />
              {language}
            </span>
            <span className="vaisheshik-badge">
              <Clock size={16} />
              {duration}
            </span>
          </div>

          {/* Title */}
          <h1 className="vaisheshik-heading-display text-4xl md:text-5xl lg:text-6xl mb-4">
            {title}
          </h1>

          {/* Hindi Subtitle */}
          <p className="vaisheshik-heading-devanagari text-2xl md:text-3xl mb-6">
            {subtitle}
          </p>

          {/* Stats Row */}
          {stats && (stats.students || stats.rating || stats.satisfaction) && (
            <div className="flex flex-wrap gap-6 mb-6">
              {stats.students && stats.students !== '0K+' && (
                <div>
                  <div className="text-2xl font-bold text-[var(--vaisheshik-primary-indigo)]">
                    {stats.students}
                  </div>
                  <div className="text-sm text-[var(--vaisheshik-muted-gray)]">Students</div>
                </div>
              )}
              {stats.rating && stats.rating > 0 && (
                <div>
                  <div className="text-2xl font-bold text-[var(--vaisheshik-accent-saffron)]">
                    {stats.rating} ★
                  </div>
                  <div className="text-sm text-[var(--vaisheshik-muted-gray)]">Rating</div>
                </div>
              )}
              {stats.satisfaction && (
                <div>
                  <div className="text-2xl font-bold text-[var(--vaisheshik-primary-indigo)]">
                    {stats.satisfaction}
                  </div>
                  <div className="text-sm text-[var(--vaisheshik-muted-gray)]">Satisfaction</div>
                </div>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mb-8">
            <div className="vaisheshik-price">{price}</div>
            <p className="text-sm text-[var(--vaisheshik-muted-gray)] mt-2">
              One-time payment • 1 Year Access • Certificate included
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={onEnrollClick}
              className="vaisheshik-cta-primary"
            >
              Enroll Now — {price}
            </button>
            <button
              onClick={onDemoClick}
              className="vaisheshik-cta-secondary"
            >
              <Play size={20} />
              Watch Demo
            </button>
          </div>
        </MotionWrapper>

        {/* Demo Thumbnail Right (Desktop) */}
        <MotionWrapper
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="vaisheshik-demo-thumbnail" onClick={onDemoClick}>
            {!imageError ? (
              <img
                src="/assets/vaisheshik-darshan-course.png"
                alt="Vaisheshik Darshan Course Demo"
                className="w-full h-auto rounded-lg"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full aspect-video bg-gradient-to-br from-[var(--vaisheshik-primary-indigo)] to-[var(--vaisheshik-accent-saffron)] rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <Play size={80} className="mx-auto mb-4" />
                  <p className="text-xl font-semibold">Watch Free Demo</p>
                  <p className="text-sm opacity-90">Why Nyaya and Vaisheshik are studied together?</p>
                </div>
              </div>
            )}
            <div className="vaisheshik-demo-play-button">
              <Play size={32} fill="white" color="white" />
            </div>
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}

