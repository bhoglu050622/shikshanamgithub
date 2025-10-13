'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Clock, Download, Award, Users, MessageCircle, Star, Sparkles, Target, TrendingUp, Shield, Video, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ProtectedExternalLink } from '@/components/auth/ProtectedExternalLink';

// Floating particles component for atomic visualization
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-vaisheshik-secondary/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FBF7F0] via-[#F5F1E8] to-[#E8DFD0]">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #0E4C6B 1px, transparent 0)`,
          backgroundSize: '40px 40px',
          transform: `translateY(${scrollY * 0.5}px)`,
        }} />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#0E4C6B]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#D98E3A]/10 rounded-full blur-3xl" />

      {/* Main Content */}
      <div className="container-custom relative z-10 min-h-screen flex items-center py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Course Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0E4C6B] to-[#1A6B8A] text-white rounded-full text-sm font-semibold shadow-lg"
            >
              <Sparkles className="w-4 h-4" />
              Premium Philosophy Course
            </motion.div>

            {/* Main Heading */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0E4C6B] leading-tight mb-4"
              >
                Philosophy of Maharshi Kanada's
                <span className="block mt-2 bg-gradient-to-r from-[#0E4C6B] to-[#D98E3A] bg-clip-text text-transparent">
                  Vaisheshik Sutras
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl md:text-2xl text-[#D98E3A] font-semibold italic"
              >
                अनंत ब्रह्मांड की सूक्ष्मता में प्रवेश!
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-700 leading-relaxed"
            >
              Explore the atomic philosophy of ancient India. Understand the fundamental building blocks of the universe through Maharshi Kanada's profound teachings.
            </motion.p>

            {/* Course Meta Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-[#0E4C6B]/10">
                <Target className="w-5 h-5 text-[#0E4C6B]" />
                <span className="font-medium text-gray-800">Intermediate Level</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-[#0E4C6B]/10">
                <MessageCircle className="w-5 h-5 text-[#0E4C6B]" />
                <span className="font-medium text-gray-800">हिन्दी</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-[#0E4C6B]/10">
                <Users className="w-5 h-5 text-[#0E4C6B]" />
                <span className="font-medium text-gray-800">Live Sessions</span>
              </div>
            </motion.div>

            {/* Price and CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-6"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-bold text-[#D98E3A]">₹3,499</span>
                <span className="text-2xl text-gray-400 line-through">₹5,199</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  33% OFF
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <ProtectedExternalLink 
                  href="https://courses.shikshanam.in/single-checkout/643aa48ee4b0bc2eac815e74?pid=p3" 
                  className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#D98E3A] to-[#E6A85C] text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <BookOpen className="w-6 h-6" />
                  Enroll Now
                  <motion.span
                    className="absolute inset-0 rounded-xl bg-white/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </ProtectedExternalLink>
                
                <button className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0E4C6B] rounded-xl font-semibold text-lg border-2 border-[#0E4C6B] hover:bg-[#0E4C6B] hover:text-white transition-all duration-300">
                  <Video className="w-6 h-6" />
                  Watch Preview
                </button>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Money-back Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D98E3A]" />
                <span className="text-sm text-gray-600">Certificate Included</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Lifetime Access</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image Card */}
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
              <div className="relative h-64 md:h-80 mb-6 rounded-2xl overflow-hidden">
                <Image 
                  src="/assets/courses/vaisheshik-darshan.webp"
                  alt="Vaisheshik Darshan"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E4C6B]/60 to-transparent" />
              </div>

              {/* Course Features Grid */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-[#0E4C6B]/5 to-[#0E4C6B]/10 rounded-xl">
                  <Video className="w-8 h-8 mx-auto mb-2 text-[#0E4C6B]" />
                  <div className="text-2xl font-bold text-[#0E4C6B]">15-18</div>
                  <div className="text-xs text-gray-600 mt-1">Classes</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#D98E3A]/5 to-[#D98E3A]/10 rounded-xl">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-[#D98E3A]" />
                  <div className="text-2xl font-bold text-[#D98E3A]">1 Yr</div>
                  <div className="text-xs text-gray-600 mt-1">Access</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-[#0E4C6B]/5 to-[#0E4C6B]/10 rounded-xl">
                  <FileText className="w-8 h-8 mx-auto mb-2 text-[#0E4C6B]" />
                  <div className="text-2xl font-bold text-[#0E4C6B]">Notes</div>
                  <div className="text-xs text-gray-600 mt-1">Included</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-100">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl font-bold text-gray-800 ml-1">4.8</span>
                  </div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div className="text-center border-x border-gray-100">
                  <div className="text-xl font-bold text-gray-800">500+</div>
                  <div className="text-xs text-gray-600">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-gray-800">98%</div>
                  <div className="text-xs text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Floating Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-[#D98E3A]/20"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#D98E3A] to-[#E6A85C] rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">Certificate</div>
                  <div className="text-sm text-gray-600">Upon Completion</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-[#0E4C6B]/20"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-[#0E4C6B] to-[#1A6B8A] rounded-xl">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-800">Community</div>
                  <div className="text-sm text-gray-600">Active Forum</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" fillOpacity="0.1"/>
        </svg>
      </div>
    </section>
  );
}
