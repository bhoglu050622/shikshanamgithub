'use client';

import { motion } from 'framer-motion';
import { Play, Star, Users, Clock } from 'lucide-react';
import { fadeInUp, fadeIn, pulseOnHover } from '../motion.config';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';
import MeditativeBackground from './MeditativeBackground';
import { useState } from 'react';
import DemoModal from './DemoModal';

interface HeroMeditativeProps {
  title: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  level: string;
  language: string;
  rating: number;
  students: string;
  duration: string;
  enrollLink: string;
  demoVideoUrl: string;
  demoTitle: string;
}

export default function HeroMeditative({
  title,
  subtitle,
  price,
  originalPrice,
  level,
  language,
  rating,
  students,
  duration,
  enrollLink,
  demoVideoUrl,
  demoTitle,
}: HeroMeditativeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-[var(--yoga-primary)] via-[var(--yoga-primary-light)] to-[var(--yoga-primary-dark)]">
        {/* Animated Background */}
        <MeditativeBackground />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--yoga-primary)]/40 to-[var(--yoga-primary)]/60" />

        {/* Content Container */}
        <div className="relative z-10 yoga-container py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-white"
            >
              {/* Badges */}
              <motion.div
                variants={fadeIn}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap gap-3 mb-6"
              >
                <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold">
                  {level}
                </span>
                <span className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm font-semibold font-devanagari">
                  {language}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
                className="yoga-heading-1 mb-4"
              >
                {title}
              </motion.h1>

              {/* Hindi Subtitle */}
              <motion.p
                variants={fadeInUp}
                transition={{ delay: 0.4 }}
                className="yoga-heading-devanagari text-white/90 mb-6"
              >
                {subtitle}
              </motion.p>

              {/* Stats */}
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-6 mb-8 text-white/80"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}/5</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">{students} Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">{duration}</span>
                </div>
              </motion.div>

              {/* Price */}
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold">{price}</span>
                  {originalPrice && (
                    <span className="text-2xl line-through text-white/50">{originalPrice}</span>
                  )}
                </div>
                <p className="text-sm text-white/70 mt-2">One-time payment • 1 Year Access</p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                variants={fadeInUp}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.div
                  variants={pulseOnHover}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                >
                  <ProtectedExternalLink
                    href={enrollLink}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[var(--yoga-primary)] font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <span>Enroll Now</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </ProtectedExternalLink>
                </motion.div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold text-lg rounded-xl border-2 border-white/30 hover:border-white/60 hover:bg-white/20 transition-all duration-300"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </button>
              </motion.div>
            </motion.div>

            {/* Right Column - Demo Video Thumbnail */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative group cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/courses/yoga-darshan-hero.png"
                  alt="Yoga Darshan Course Preview"
                  className="w-full h-full object-cover"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white/90 group-hover:bg-white group-hover:scale-110 transition-all duration-300 flex items-center justify-center shadow-lg">
                    <Play className="w-10 h-10 text-[var(--yoga-primary)] ml-1" fill="currentColor" />
                  </div>
                </div>

                {/* Free Demo Badge */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-[var(--yoga-accent)] text-white font-semibold rounded-lg shadow-lg">
                  Free Demo
                </div>
              </div>

              <p className="text-center text-white/80 mt-4 text-sm">
                Click to watch the free Samadhi Pada introduction
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Demo Modal */}
      <DemoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoSrc={demoVideoUrl}
        title={demoTitle}
        description="Experience the teaching style and depth of content in this free preview of the Samadhi Pada module"
        enrollLink={enrollLink}
      />
    </>
  );
}

