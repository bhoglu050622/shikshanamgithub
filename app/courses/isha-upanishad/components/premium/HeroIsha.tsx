'use client';

import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, Award } from 'lucide-react';
import { ishaUpanishadCourseData } from '../../courseData';
import { heroVariants, heroChildVariants, safeVariants } from '../../motion.config';
import { useState } from 'react';

interface HeroIshaProps {
  onDemoClick?: () => void;
}

export default function HeroIsha({ onDemoClick }: HeroIshaProps) {
  const { metadata, stats, demoVideos } = ishaUpanishadCourseData;
  const featuredDemo = demoVideos?.[0];

  return (
    <section className="isha-hero">
      {/* Animated background - simple gradient, Lottie would be added separately */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D3B4A]/10 via-transparent to-[#D97B2A]/10" />
      </div>

      <motion.div
        className="isha-hero-grid relative z-10"
        variants={safeVariants(heroVariants)}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Content */}
        <motion.div className="isha-hero-content" variants={heroChildVariants}>
          <h1>{metadata.title}</h1>
          <p className="isha-hero-subtitle">{metadata.subtitle}</p>

          {/* Badge Strip */}
          <div className="isha-badge-strip">
            <span className="isha-badge isha-badge-primary">
              {metadata.level}
            </span>
            <span className="isha-badge isha-badge-secondary">
              हिन्दी
            </span>
            <span className="isha-badge isha-badge-outline">
              <Clock className="w-4 h-4" />
              {metadata.duration}
            </span>
            <span className="isha-badge isha-badge-outline">
              <BookOpen className="w-4 h-4" />
              18 Shlokas
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-bold text-[#0D3B4A]">{metadata.price}</span>
            <span className="text-xl text-gray-400 line-through">{metadata.originalPrice}</span>
            <span className="px-3 py-1 bg-[#D97B2A] text-white text-sm font-semibold rounded-full">
              Save {metadata.savings}
            </span>
          </div>

          {/* CTAs */}
          <div className="isha-cta-group">
            <a
              href={ishaUpanishadCourseData.enrollment.checkoutLink}
              className="isha-btn-primary"
            >
              <span>Enroll now — {metadata.price}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <button
              onClick={onDemoClick}
              className="isha-btn-secondary"
            >
              <Play className="w-5 h-5" />
              <span>Watch demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#D97B2A]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>{stats?.students} Students</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#D97B2A]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{stats?.rating} Rating ({stats?.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#D97B2A]" />
              <span>{stats?.satisfaction} Satisfaction</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Demo Thumbnail */}
        {featuredDemo && (
          <motion.div variants={heroChildVariants}>
            <div 
              className="isha-demo-card featured cursor-pointer"
              onClick={onDemoClick}
            >
              <div className="isha-demo-thumbnail">
                <img 
                  src={featuredDemo.url?.replace('/embed/', '/vi/').split('?')[0] + '/maxresdefault.jpg'} 
                  alt={featuredDemo.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/640x360/0D3B4A/FFFFFF?text=Demo+Video';
                  }}
                />
                <div className="isha-demo-play-button">
                  <Play className="w-8 h-8" />
                </div>
              </div>
              <div className="isha-demo-info">
                <h3 className="text-lg font-semibold">{featuredDemo.title}</h3>
                {featuredDemo.description && (
                  <p className="text-sm text-gray-600 mt-1">{featuredDemo.description}</p>
                )}
                <div className="flex items-center gap-2 mt-2 text-sm text-[#D97B2A]">
                  <Clock className="w-4 h-4" />
                  <span>{featuredDemo.duration}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

