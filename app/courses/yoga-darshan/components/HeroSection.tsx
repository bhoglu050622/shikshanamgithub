'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play, ArrowRight, Star, Clock, Users, Award } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

export default function HeroSection() {
  return (
    <section id="yoga-darshan-hero-scoped" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Sunrise gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-saffron-50 via-orange-50 to-amber-50"></div>
        
        {/* Course Icon Overlay */}
        <div className="absolute inset-0 opacity-10">
          <Image 
            src="/assets/courses/yoga-darshan.png"
            alt="Yoga Darshan"
            fill
            className="object-contain"
          />
        </div>
        
        {/* Mandala overlay pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-saffron-200 to-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-200 to-saffron-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
        </div>
        
        {/* Yogi silhouette overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <StaggerContainer>
            <StaggerItem>
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-2 text-saffron-600">
                  <Award className="w-5 h-5" />
                  <span className="text-sm font-medium">Premium Course</span>
                </div>
                <div className="flex items-center space-x-2 text-wisdom-500">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm">4.9/5</span>
                  <span className="text-sm">(180+ reviews)</span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <h1 className="text-5xl lg:text-6xl font-display text-high-contrast mb-6 leading-tight">
                <span className="text-saffron-600">योग दर्शन</span>
                <br />
                <span className="text-2xl lg:text-3xl text-wisdom-600 font-normal">
                  Yoga Philosophy through Patanjali Yoga Sutras
                </span>
                <br />
                <span className="text-lg lg:text-xl text-saffron-600 font-medium">
                  समझें समाधियों के विज्ञान का रहस्य !
                </span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-xl text-wisdom-600 mb-8 leading-relaxed">
                Simplified journey through all 195 Yoga Sutras, taught in Hindi for modern seekers.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-saffron-600" />
                  <span className="text-wisdom-600">Duration: <span className="font-semibold text-high-contrast">8+ hours</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-saffron-600" />
                  <span className="text-wisdom-600">Students: <span className="font-semibold text-high-contrast">2.9K+</span></span>
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex items-center space-x-4 mb-8">
                <div className="text-4xl font-bold text-saffron-600">
                  ₹3,999
                </div>
                <div className="text-xl text-wisdom-400 line-through">
                  ₹5,999
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  33% OFF
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-4">
                <ProtectedExternalLink href="https://courses.shikshanam.in/single-checkout/6440e5d6e4b0c4378b6240e5?pid=p2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center justify-center space-x-3 px-8 py-4 text-lg"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </ProtectedExternalLink>
                
                <motion.a
                  href="https://www.youtube.com/watch?v=ekeTLlgFwGg"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline flex items-center justify-center space-x-3 px-8 py-4 text-lg"
                >
                  <Play className="w-5 h-5" />
                  <span>Watch Free Demo</span>
                </motion.a>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* Visual */}
          <StaggerContainer>
            <StaggerItem>
              <div className="relative">
                <div className="card-premium p-8">
                  <div className="aspect-video bg-gradient-to-br from-saffron-100 to-teal-100 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                    {/* Sunrise background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-200 via-yellow-200 to-amber-200"></div>
                    
                    {/* Yogi silhouette */}
                    <div className="relative z-10 text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-saffron-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <span className="text-2xl">🧘</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-high-contrast mb-2">Yoga Philosophy</h3>
                      <p className="text-wisdom-600">195 Yoga Sutras Explained</p>
                    </div>
                    
                    {/* Mandala overlay */}
                    <div className="absolute top-4 right-4 w-16 h-16 opacity-20">
                      <div className="w-full h-full border-2 border-saffron-400 rounded-full"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-saffron-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-wisdom-600">Course Type:</span>
                      <span className="font-semibold text-high-contrast">Pre-recorded Video</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-wisdom-600">Language:</span>
                      <span className="font-semibold text-high-contrast">हिन्दी</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-wisdom-600">Access:</span>
                      <span className="font-semibold text-green-600">1 Year</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-wisdom-600">Sutras Covered:</span>
                      <span className="font-semibold text-saffron-600">All 195</span>
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
