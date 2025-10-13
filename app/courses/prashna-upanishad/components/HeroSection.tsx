'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, ArrowRight, Star, Clock, Users, Award, HelpCircle } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function HeroSection() {
  return (
    <section id="prashna-upanishad-hero-scoped" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Contemplative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gold-50 via-ivory-cream to-teal-50"></div>
        
        {/* Course Icon Overlay */}
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/assets/courses/prashna-upanishad.jpg"
            alt="Prashna Upanishad"
            fill
            className="object-contain"
          />
        </div>
        
        {/* Question mark motif overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-gold-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-200 to-gold-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
        </div>
        
        {/* Sage silhouette overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/3 bg-gradient-to-t from-black/10 to-transparent"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <StaggerContainer>
            <StaggerItem>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-gold-600 text-white px-4 py-2 rounded-full shadow-md">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-semibold">Premium Course</span>
                </div>
                <div className="flex items-center space-x-2 text-wisdom-600">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm font-semibold">4.9/5</span>
                  <span className="text-sm">(7 reviews)</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-5xl lg:text-6xl font-display text-high-contrast mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gold-600 to-gold-700 bg-clip-text text-transparent">ईशावास्य उपनिषद्</span>
                <br />
                <span className="text-2xl lg:text-3xl text-wisdom-700 font-normal">
                  आत्म दर्शन की यात्रा पर निकलें !
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-xl text-wisdom-600 mb-8 leading-relaxed">
                Online Course on The Isha Upanishad
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gold-600" />
                  <span className="text-wisdom-600">Skill Level: <span className="font-semibold text-high-contrast">Beginner</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gold-600" />
                  <span className="text-wisdom-600">Language: <span className="font-semibold text-high-contrast">हिन्दी</span></span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-center space-x-4 mb-8">
                <div className="text-4xl font-bold bg-gradient-to-r from-gold-600 to-gold-700 bg-clip-text text-transparent">
                  ₹999
                </div>
                <div className="text-xl text-wisdom-400 line-through">
                  ₹1,799
                </div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                  44% OFF
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-4">
                <ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/6614091229b29a677fdfd70a?pid=p1">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center justify-center space-x-3 px-8 py-4 text-lg"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </ProtectedExternalLink>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline flex items-center justify-center space-x-3 px-8 py-4 text-lg"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Free Preview</span>
                </motion.button>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Visual */}
          <StaggerContainer>
            <StaggerItem>
              <div className="relative">
                <div className="card-premium p-8">
                  <div className="aspect-video bg-gradient-to-br from-gold-100 to-teal-100 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                    {/* Contemplative background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gold-200 via-gold-100 to-teal-100"></div>
                    
                    {/* Sage in reflective pose */}
                    <div className="relative z-10 text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-gold-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <HelpCircle className="w-8 h-8 text-gold-600" />
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-high-contrast mb-2">18 Shlokas</h3>
                      <p className="text-wisdom-600">Isha Upanishad</p>
                    </div>
                    
                    {/* Question mark motif overlay */}
                    <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
                      <div className="w-full h-full border-2 border-gold-400 rounded-full flex items-center justify-center">
                        <span className="text-2xl text-gold-600">?</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-wisdom-600">Course Type:</span>
                      <span className="font-semibold text-high-contrast">Pre-recorded Video</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-wisdom-600">Language:</span>
                      <span className="font-semibold text-high-contrast">Hindi</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-wisdom-600">Access:</span>
                      <span className="font-semibold text-green-600">Lifetime</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-wisdom-600">Content:</span>
                      <span className="font-semibold text-gold-600">3+ Hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
