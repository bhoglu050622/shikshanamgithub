'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Crown, Users, Clock, Star, Award, TrendingUp, Target } from 'lucide-react'
import { EnrollNowButton } from '@/components/auth/ProtectedEnrollButton'
import { ClientMotion, ClientMotionDiv, ClientMotionH1, ClientMotionP } from '@/components/motion/ClientMotion'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron-50/30 via-transparent to-peacock-green-50/30 -z-10" />
      
      {/* Course Icon Overlay */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <Image 
          src="/assets/courses/chanakya-code.png"
          alt="Chanakya Code"
          fill
          className="object-contain"
        />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-peacock-green-200/15 to-indigo-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-peacock-green-200/20 via-indigo-200/15 to-saffron-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <ClientMotionDiv
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-saffron-100 to-peacock-green-100 text-saffron-700 px-4 py-2 rounded-full text-sm font-medium">
                <ClientMotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Crown className="w-4 h-4" />
                  <span>Premium Business Course</span>
                </ClientMotionDiv>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-900 leading-tight">
                <ClientMotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Chanakya's Code
                  <span className="block text-saffron-600 mt-2">
                    Dominate Negotiation & Business Tactics
                  </span>
                </ClientMotionDiv>
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-indigo-700 leading-relaxed">
                <ClientMotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Master 2000-year-old strategic wisdom for modern business success. 
                  Learn negotiation, leadership, and decision-making from India's greatest strategist.
                </ClientMotionDiv>
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <ClientMotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center space-x-2 text-wisdom-600">
                    <Users className="w-5 h-5 text-saffron-600" />
                    <span>10,000+ Professionals</span>
                  </div>
                  <div className="flex items-center space-x-2 text-wisdom-600">
                    <Clock className="w-5 h-5 text-saffron-600" />
                    <span>16-20 Classes</span>
                  </div>
                  <div className="flex items-center space-x-2 text-wisdom-600">
                    <Star className="w-5 h-5 fill-saffron-500 text-saffron-500" />
                    <span>4.8/5 Rating</span>
                  </div>
                </ClientMotionDiv>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-saffron-50 to-amber-50 rounded-2xl p-6">
                <ClientMotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-3xl font-bold text-indigo-700">₹3,999</div>
                      <div className="text-sm text-wisdom-400 line-through">₹6,999</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">Save ₹3,000</div>
                      <div className="text-xs text-wisdom-500">43% off</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-indigo-600 mb-4">
                    <Award className="w-4 h-4" />
                    <span>1-Year Access • Certificate Included</span>
                  </div>
                </ClientMotionDiv>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <ClientMotionDiv
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <EnrollNowButton
                    courseId="chanakya-code"
                    courseName="Chanakya's Code"
                    size="lg"
                    className="flex-1"
                  />
                  <a 
                    href="#curriculum" 
                    className="inline-flex items-center justify-center px-8 py-4 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold text-lg rounded-2xl transition-all duration-300"
                  >
                    View Curriculum
                  </a>
                </ClientMotionDiv>
              </div>

              {/* Trust Line */}
              <div className="flex items-center space-x-4 text-sm text-wisdom-600">
                <ClientMotionDiv
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-saffron-500 text-saffron-500" />
                    ))}
                  </div>
                  <span>Trusted by CEOs, Entrepreneurs & Business Leaders</span>
                </ClientMotionDiv>
              </div>
            </ClientMotionDiv>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <ClientMotionDiv
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative bg-gradient-to-br from-saffron-100 to-peacock-green-100 rounded-3xl p-8 shadow-2xl">
                {/* Icon Grid */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <TrendingUp className="w-8 h-8 text-saffron-600 mb-2" />
                    <p className="text-xs font-semibold text-indigo-700">Strategic Growth</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Target className="w-8 h-8 text-peacock-green-600 mb-2" />
                    <p className="text-xs font-semibold text-indigo-700">Goal Achievement</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <Crown className="w-8 h-8 text-indigo-600 mb-2" />
                    <p className="text-xs font-semibold text-indigo-700">Leadership</p>
                  </div>
                </div>

                {/* Center Visual */}
                <div className="aspect-video bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Crown className="w-24 h-24 text-indigo-300 animate-pulse-gentle" />
                  </div>
                  
                  {/* Floating Elements */}
                  {['Strategy', 'Leadership', 'Wisdom', 'Power'].map((text, index) => (
                    <motion.div
                      key={text}
                      className="absolute text-sm font-bold text-saffron-500/60"
                      style={{
                        left: `${20 + (index * 20)}%`,
                        top: `${30 + (index % 2) * 40}%`,
                      }}
                      animate={{
                        y: [-10, 10, -10],
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 3 + index * 0.5,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    >
                      {text}
                    </motion.div>
                  ))}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-saffron-500 rounded-full animate-pulse-gentle" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-peacock-green-500 rounded-full animate-pulse-gentle animation-delay-2000" />
              </div>
            </ClientMotionDiv>
          </div>
        </div>
      </div>
    </section>
  )
}
