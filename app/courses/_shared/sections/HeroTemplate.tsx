'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Clock, Users, Award, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { CourseMetadata, CourseStats } from '../types/course.types';
import { CourseButton, CourseBadge } from '../components';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

interface HeroTemplateProps {
  metadata: CourseMetadata;
  stats?: CourseStats;
  enrollmentLink: string;
  demoVideoLink?: string;
  backgroundImage?: string;
  className?: string;
}

export default function HeroTemplate({
  metadata,
  stats,
  enrollmentLink,
  demoVideoLink,
  backgroundImage,
  className = '',
}: HeroTemplateProps) {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--theme-primary-50)] via-white to-[var(--theme-secondary-50)]"></div>
        
        {/* Background Image Overlay */}
        {backgroundImage && (
          <div className="absolute inset-0 opacity-5">
            <Image
              src={backgroundImage}
              alt=""
              fill
              className="object-contain"
              priority
            />
          </div>
        )}
        
        {/* Decorative Blobs */}
        <div className="course-blob-decoration w-96 h-96 bg-[var(--theme-primary-200)] top-20 left-10" />
        <div className="course-blob-decoration w-80 h-80 bg-[var(--theme-secondary-200)] bottom-20 right-10 animation-delay-2000" />
        
        {/* Gradient Overlay */}
        <div className="course-gradient-overlay"></div>
      </div>

      <div className="course-container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Badge & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-4"
            >
              <CourseBadge variant="primary" icon={Award}>
                {metadata.type}
              </CourseBadge>
              {stats?.rating && (
                <div className="flex items-center gap-2 text-gray-700">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{stats.rating}/5</span>
                  {stats.reviews && (
                    <span className="text-gray-600">({stats.reviews}+ reviews)</span>
                  )}
                </div>
              )}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="course-heading-hero text-gray-900"
            >
              {metadata.title}
            </motion.h1>

            {/* Subtitle */}
            {metadata.subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="course-heading-3 text-gray-700"
              >
                {metadata.subtitle}
              </motion.p>
            )}

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="course-body-lg text-gray-600"
            >
              {metadata.description}
            </motion.p>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[var(--theme-primary-600)]" />
                <span className="text-gray-700">
                  <span className="font-semibold">{metadata.duration}</span>
                </span>
              </div>
              {stats?.students && (
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[var(--theme-primary-600)]" />
                  <span className="text-gray-700">
                    <span className="font-semibold">{stats.students}</span> Students
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[var(--theme-primary-600)]" />
                <span className="text-gray-700 font-semibold">{metadata.level}</span>
              </div>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="text-4xl font-bold text-[var(--theme-primary-600)]">
                {metadata.price}
              </div>
              {metadata.originalPrice && (
                <>
                  <div className="text-xl text-gray-400 line-through">
                    {metadata.originalPrice}
                  </div>
                  {metadata.savings && (
                    <CourseBadge variant="success">
                      {metadata.savings} OFF
                    </CourseBadge>
                  )}
                </>
              )}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <ProtectedExternalLink href={enrollmentLink}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="course-btn course-btn-primary course-btn-lg"
                >
                  <span>Enroll Now</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </ProtectedExternalLink>

              {demoVideoLink && (
                <motion.a
                  href={demoVideoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="course-btn course-btn-secondary course-btn-lg"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Demo</span>
                </motion.a>
              )}
            </motion.div>
          </div>

          {/* Right Visual Card */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="course-card-premium"
            >
              {/* Course Thumbnail or Visual */}
              <div className="aspect-video bg-gradient-to-br from-[var(--theme-primary-100)] to-[var(--theme-secondary-100)] rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                {metadata.thumbnail ? (
                  <Image
                    src={metadata.thumbnail}
                    alt={metadata.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-[var(--theme-primary-500)] to-[var(--theme-secondary-500)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Award className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="course-heading-3 text-gray-900 mb-2">
                      {metadata.type}
                    </h3>
                    <p className="text-gray-600">{metadata.level}</p>
                  </div>
                )}
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                {metadata.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                {metadata.features.length > 4 && (
                  <p className="text-sm text-gray-500 italic pt-2">
                    +{metadata.features.length - 4} more features
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

