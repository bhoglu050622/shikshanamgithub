'use client';

import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, Users, Star, Award } from 'lucide-react';
import { nyayaDarshanCourseData } from '../../courseData';
import { heroVariants, heroChildVariants, safeVariants } from '../../motion.config';

interface HeroNyayaProps {
  onDemoClick?: () => void;
}

export default function HeroNyaya({ onDemoClick }: HeroNyayaProps) {
  const { metadata, stats, demoVideos } = nyayaDarshanCourseData;
  const featuredDemo = demoVideos?.[0];

  return (
    <section className="nyaya-hero">
      {/* Animated background - SVG gradient fallback for Lottie */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D3B4A]/10 via-transparent to-[#D97B2A]/10" />
        {/* TODO: Add Lottie Devanagari glyphs animation here */}
      </div>

      <motion.div
        className="nyaya-hero-grid relative z-10"
        variants={safeVariants(heroVariants)}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Content */}
        <motion.div className="nyaya-hero-content" variants={heroChildVariants}>
          <h1>{metadata.title}</h1>
          <p className="nyaya-hero-subtitle">{metadata.subtitle}</p>

          {/* Badge Strip */}
          <div className="nyaya-badge-strip">
            <span className="nyaya-badge nyaya-badge-primary">
              {metadata.level}
            </span>
            <span className="nyaya-badge nyaya-badge-secondary">
              {metadata.language}
            </span>
            <span className="nyaya-badge nyaya-badge-outline">
              <Clock className="w-4 h-4" />
              {metadata.duration}
            </span>
            <span className="nyaya-badge nyaya-badge-outline">
              <BookOpen className="w-4 h-4" />
              1 Year Access
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-bold text-[#0D3B4A]">{metadata.price}</span>
            {metadata.originalPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">{metadata.originalPrice}</span>
                <span className="px-3 py-1 bg-[#D97B2A] text-white text-sm font-semibold rounded-full">
                  Save {metadata.savings}
                </span>
              </>
            )}
          </div>

          {/* CTAs */}
          <div className="nyaya-cta-group">
            <a
              href={nyayaDarshanCourseData.enrollment.checkoutLink}
              className="nyaya-btn-primary"
            >
              <span>Enroll now — {metadata.price}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <button
              onClick={onDemoClick}
              className="nyaya-btn-secondary"
            >
              <Play className="w-5 h-5" />
              <span>Watch Intro</span>
            </button>
          </div>

          {/* Stats */}
          {stats && (
            <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#D97B2A]" />
                <span>{stats.students} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#D97B2A] fill-current" />
                <span>{stats.rating} Rating ({stats.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D97B2A]" />
                <span>{stats.satisfaction} Satisfaction</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Right: Demo Thumbnail */}
        {featuredDemo && (
          <motion.div variants={heroChildVariants} className="hidden md:block">
            <div 
              className="nyaya-demo-card featured cursor-pointer"
              onClick={onDemoClick}
            >
              <div className="nyaya-demo-thumbnail">
                <img 
                  src={featuredDemo.url?.replace('/embed/', '/vi/').split('?')[0] + '/maxresdefault.jpg'} 
                  alt={featuredDemo.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/640x360/0D3B4A/FFFFFF?text=Demo+Video';
                  }}
                />
                <div className="nyaya-demo-play-button">
                  <Play className="w-8 h-8" />
                </div>
              </div>
              <div className="nyaya-demo-info">
                <h3 className="text-lg font-semibold text-[#0D3B4A]">{featuredDemo.title}</h3>
                {featuredDemo.description && (
                  <p className="text-sm text-gray-600 mt-1">{featuredDemo.description}</p>
                )}
                <div className="flex items-center gap-2 mt-2 text-sm text-[#D97B2A]">
                  <Clock className="w-4 h-4" />
                  <span>{featuredDemo.duration}</span>
                  <span className="px-2 py-0.5 bg-[#D97B2A] text-white text-xs rounded-full ml-auto">
                    FREE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

