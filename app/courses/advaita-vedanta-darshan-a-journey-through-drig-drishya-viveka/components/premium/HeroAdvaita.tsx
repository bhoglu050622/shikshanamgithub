'use client';

import { motion } from 'framer-motion';
import { Play, Clock, BookOpen, Award } from 'lucide-react';
import { advaitaVedantaCourseData } from '../../courseData';
import { heroVariants, heroChildVariants, safeVariants } from '../../motion.config';

interface HeroAdvaitaProps {
  onDemoClick?: () => void;
}

export default function HeroAdvaita({ onDemoClick }: HeroAdvaitaProps) {
  const { metadata, stats, demoVideos } = advaitaVedantaCourseData;
  const featuredDemo = demoVideos?.[0];

  return (
    <section className="advaita-hero">
      {/* Blurred Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://shikshanam.in/wp-content/uploads/2024/05/1.png')`,
            filter: 'blur(20px)',
            transform: 'scale(1.1)'
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D3B4A]/80 via-[#0D3B4A]/60 to-[#D97B2A]/70" />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <motion.div
        className="advaita-hero-grid relative z-10"
        variants={safeVariants(heroVariants)}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Content */}
        <motion.div className="advaita-hero-content" variants={heroChildVariants}>
          <h1>{metadata.title}</h1>
          <p className="advaita-hero-subtitle">{metadata.subtitle}</p>

          {/* Badge Strip */}
          <div className="advaita-badge-strip">
            <span className="advaita-badge advaita-badge-primary">
              {metadata.level}
            </span>
            <span className="advaita-badge advaita-badge-secondary">
              {metadata.language}
            </span>
            <span className="advaita-badge advaita-badge-outline">
              <Clock className="w-4 h-4" />
              {metadata.duration}
            </span>
            <span className="advaita-badge advaita-badge-outline">
              <BookOpen className="w-4 h-4" />
              46 Shlokas
            </span>
          </div>

          {/* Price */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{metadata.price}</span>
            {metadata.originalPrice && (
              <>
                <span className="text-lg md:text-xl text-gray-300 line-through">{metadata.originalPrice}</span>
                <span className="px-2 py-1 bg-[#D97B2A] text-white text-xs md:text-sm font-semibold rounded-full shadow-lg">
                  Save {metadata.savings}
                </span>
              </>
            )}
          </div>

          {/* CTAs */}
          <div className="advaita-cta-group">
            <a
              href={advaitaVedantaCourseData.enrollment.checkoutLink}
              className="advaita-btn-primary-black"
            >
              <span>Enroll now — {metadata.price}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <button
              onClick={onDemoClick}
              className="advaita-btn-secondary"
            >
              <Play className="w-5 h-5" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-8 text-sm text-white">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <svg className="w-5 h-5 text-[#D97B2A]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span>{stats?.students} Students</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <svg className="w-5 h-5 text-[#D97B2A]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{stats?.rating} Rating ({stats?.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Award className="w-5 h-5 text-[#D97B2A]" />
              <span>{stats?.satisfaction} Satisfaction</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Course Thumbnail - Hidden on Mobile */}
        <motion.div variants={heroChildVariants} className="hidden md:block">
          <div 
            className="advaita-demo-card featured cursor-pointer"
            onClick={onDemoClick}
          >
            <div className="advaita-demo-thumbnail">
              <img 
                src={metadata.thumbnail || '/assets/advaita-vedanta-course.png'} 
                alt={metadata.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/640x360/0D3B4A/FFFFFF?text=Advaita+Vedanta+Course';
                }}
              />
              <div className="advaita-demo-play-button">
                <Play className="w-8 h-8" />
              </div>
            </div>
            {featuredDemo && (
              <div className="advaita-demo-info">
                <h3 className="text-lg font-semibold text-[#0D3B4A]">{featuredDemo.title}</h3>
                {featuredDemo.description && (
                  <p className="text-sm text-gray-600 mt-1">{featuredDemo.description}</p>
                )}
                <div className="flex items-center gap-2 mt-2 text-sm text-[#D97B2A]">
                  <Clock className="w-4 h-4" />
                  <span>{featuredDemo.duration}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Mobile: Course Thumbnail Below Content */}
        <motion.div variants={heroChildVariants} className="md:hidden mt-6">
          <div 
            className="advaita-demo-card featured cursor-pointer"
            onClick={onDemoClick}
          >
            <div className="advaita-demo-thumbnail">
              <img 
                src={metadata.thumbnail || '/assets/advaita-vedanta-course.png'} 
                alt={metadata.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/640x360/0D3B4A/FFFFFF?text=Advaita+Vedanta+Course';
                }}
              />
              <div className="advaita-demo-play-button">
                <Play className="w-8 h-8" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}


