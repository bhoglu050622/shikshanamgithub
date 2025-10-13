'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MotionWrapper from '@/components/motion/MotionWrapper';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import Image from 'next/image';
import { Play, Shield, Award, Users, Clock } from 'lucide-react';
import { chanakyaCodeCourseData } from '../courseData';

// Pre-generate fixed particle positions to avoid hydration mismatch
const PARTICLES = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: (i * 7 + 25) % 100,
  top: (i * 11 + 10) % 100,
  animationDelay: (i * 0.6) % 8,
  animationDuration: 8 + (i % 4)
}));

export default function HeroSection() {
  const courseData = chanakyaCodeCourseData;
  
  return (
    <section className="chanakya-hero-section relative overflow-hidden">
      {/* Particle Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((particle) => (
          <div
            key={particle.id}
            className="chanakya-particle absolute"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Content */}
          <MotionWrapper
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            {/* Badge */}
            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
            >
              <Shield className="w-4 h-4" />
              <span className="text-sm font-semibold">Premium Strategic Course</span>
            </MotionWrapper>

            {/* Main Headline */}
            <MotionWrapper
              as="h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Dominate Negotiation & Business Tactics!
            </MotionWrapper>

            {/* Subheading */}
            <MotionWrapper
              as="p"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/90 mb-4 font-medium"
            >
              Master Chanakya's 10 Secret Codes
            </MotionWrapper>

            {/* Description */}
            <MotionWrapper
              as="p"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base md:text-lg text-white/80 mb-8 leading-relaxed"
            >
              Learn the ancient art of persuasion, negotiation, and strategic leadership. 
              Unlock 2,300 years of proven wisdom to outsmart competition and dominate your field.
            </MotionWrapper>

            {/* Micro Stats */}
            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
            >
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-white">{courseData.stats?.hours}</div>
                <div className="text-xs text-white/70">Hours</div>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-white">{courseData.stats?.lessons}</div>
                <div className="text-xs text-white/70">Lessons</div>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-white">{courseData.stats?.worksheets}</div>
                <div className="text-xs text-white/70">Worksheets</div>
              </div>
              <div className="text-center p-3 bg-white/10 backdrop-blur-sm rounded-lg">
                <div className="text-2xl font-bold text-white">{courseData.stats?.accessYears}Y</div>
                <div className="text-xs text-white/70">Access</div>
              </div>
            </MotionWrapper>

            {/* CTAs */}
            <MotionWrapper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <ProtectedExternalLink
                href={courseData.enrollment.checkoutLink}
                className="group px-8 py-4 bg-white text-[#0B2B3A] font-bold text-lg rounded-xl shadow-2xl hover:shadow-[0_0_30px_rgba(216,122,43,0.5)] hover:-translate-y-1 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                <span>Enroll Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </ProtectedExternalLink>

              <a
                href="#syllabus"
                className="px-8 py-4 bg-transparent text-white font-semibold text-lg rounded-xl border-2 border-white/30 hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center justify-center gap-2"
              >
                View 10 Secret Codes
              </a>
            </MotionWrapper>

            {/* Trust Indicators */}
            <MotionWrapper
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
              className="mt-8 flex flex-wrap gap-6 text-sm text-white/70"
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{courseData.stats?.students} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>{courseData.stats?.rating} ★ Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>1 Year Access</span>
              </div>
            </MotionWrapper>
          </MotionWrapper>

          {/* Right Column - Visual */}
          <MotionWrapper
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Animated Emblem */}
            <div className="chanakya-hero-emblem relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D87A2B]/20 to-transparent rounded-full blur-3xl" />
              
              {/* Main Image */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
                <Image
                  src={courseData.heroImage || '/assets/chanakya-code-course.png'}
                  alt="Acharya Chanakya"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Video Play Overlay */}
                <a
                  href={courseData.videoPromo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300 group"
                >
                  <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <Play className="w-10 h-10 text-[#0B2B3A] ml-1" fill="currentColor" />
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white text-center">
                    <p className="font-semibold">Watch Course Preview</p>
                  </div>
                </a>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#D87A2B] rounded-full opacity-20 blur-2xl" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#0B2B3A] rounded-full opacity-20 blur-2xl" />
            </div>

            {/* Floating Badge - Sanskrit */}
            <MotionWrapper
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-white px-6 py-3 rounded-2xl shadow-xl hidden md:block"
            >
              <p className="text-[#0B2B3A] font-semibold" style={{ fontFamily: 'var(--font-devanagari)' }}>
                चाणक्य नीति
              </p>
              <p className="text-xs text-gray-600">Ancient Wisdom</p>
            </MotionWrapper>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}
