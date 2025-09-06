'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, 
  ArrowRight,
  Download,
  MessageCircle,
  Instagram,
  HelpCircle,
  Mail,
  ChevronDown,
  CheckCircle,
  Play,
  Users,
  BookOpen,
  Star,
  Sparkles,
  Flower,
  Award,
  Target,
  Clock,
  Globe,
  Zap,
  Scale,
  Lightbulb,
  Eye,
  Brain,
  Atom
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

export default function SchoolOfYogaPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section - Red Capsule */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-red-50/30 via-transparent to-teal-50/30 dark:from-red-900/10 dark:via-transparent dark:to-teal-900/10">
        {/* Background Ornaments */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-red-200/20 via-teal-200/15 to-indigo-200/20 dark:from-red-400/10 dark:via-teal-400/8 dark:to-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-teal-200/20 via-indigo-200/15 to-red-200/20 dark:from-teal-400/10 dark:via-indigo-400/8 dark:to-red-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-indigo-200/20 via-red-200/15 to-teal-200/20 dark:from-indigo-400/10 dark:via-red-400/8 dark:to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-4000"></div>
          
          {/* Indian pattern overlay */}
          <div className="absolute inset-0 indian-pattern opacity-30 dark:opacity-20"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <StaggerContainer className="text-center">
            <StaggerItem>
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4 text-red-500">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <Heart className="w-8 h-8 animate-bounce" />
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              {/* Red Capsule Hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-500 dark:to-red-600 rounded-[40px] p-8 md:p-12 mx-auto max-w-2xl mb-8 shadow-2xl"
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
                  Welcome to School of Yoga
                </h1>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                  "The path of self-realization through the eight limbs of yoga"
                </p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col items-center space-y-4">
                <span className="text-medium-contrast text-small font-medium tracking-wide uppercase">
                  Transform your life through practice
                </span>
                
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-7 h-12 border-2 border-red-500 dark:border-red-400 rounded-full flex justify-center relative group cursor-pointer tap-target"
                >
                  <motion.div
                    animate={{ y: [0, 18, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-4 bg-gradient-to-b from-red-500 to-teal-500 dark:from-red-400 dark:to-teal-400 rounded-full mt-2"
                  />
                </motion.div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* About The Darshana Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Teal Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="w-8 h-8" />
                <h2 className="text-2xl md:text-3xl font-bold">About The Darshana</h2>
              </div>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Yoga, the "Path of Self-Realization," is one of the six classical schools of Indian philosophy. 
                  Founded by Patañjali, it provides a systematic approach to transforming your life through practice.
                </p>
                <p>
                  This profound philosophy teaches you the eight limbs of yoga: ethical living, personal discipline, 
                  physical postures, breath control, sense withdrawal, concentration, meditation, and self-realization.
                </p>
                <p>
                  Through Yoga, you'll learn to still the mind, transform your consciousness, and discover the path 
                  to inner peace and liberation (Kaivalya) through disciplined practice and self-awareness.
                </p>
              </div>
            </motion.div>

            {/* Right: Guru Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white dark:bg-wisdom-800 rounded-3xl p-8 shadow-xl">
                <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Heart className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-2">
                  Patañjali
                </h3>
                <p className="text-wisdom-600 dark:text-wisdom-400 mb-4">
                  Founder of Yoga Philosophy
                </p>
                <p className="text-sm text-wisdom-500 dark:text-wisdom-400 leading-relaxed">
                  "The ancient sage who systematized the practice of yoga, providing humanity with 
                  a complete path to self-realization through the eight limbs of yoga."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How This Darshan Helps You in Life */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              How This Darshan Helps You in Life?
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Develop inner peace and self-realization through the systematic practice of the eight limbs of yoga
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Heart, label: 'Inner Peace', color: 'from-red-500 to-red-600' },
              { icon: Brain, label: 'Mental Clarity', color: 'from-teal-500 to-teal-600' },
              { icon: Lightbulb, label: 'Self-Awareness', color: 'from-indigo-500 to-indigo-600' },
              { icon: Target, label: 'Life Balance', color: 'from-saffron-500 to-saffron-600' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-wisdom-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 h-32 flex flex-col items-center justify-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-indigo-700 dark:text-soft-gold-500">
                    {item.label}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Tagline */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-8"
          >
            Transform Your Life Through Practice!
          </motion.h2>
        </div>
      </section>

      {/* Course Thumbnail & Primary CTA */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Course Thumbnail */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 rounded-3xl p-8 mb-8 shadow-2xl">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Complete Yoga Course</h3>
              <p className="text-white/90">Master the Eight Limbs</p>
            </div>

            {/* What you will get */}
            <h4 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-6">
              What you will get!
            </h4>

            {/* Benefit Chips */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                '26 Self-Paced Videos',
                '2 Weekly Live Classes',
                'Meditation Practices',
                'Community Access',
                'Certificate'
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  {benefit}
                </motion.div>
              ))}
            </div>

            {/* Enroll CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-coral-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus-ring"
            >
              Enroll Now
            </motion.button>

            <p className="text-sm text-wisdom-500 dark:text-wisdom-400 mt-4">
              Secure payment • 30-day money-back guarantee
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sanskrit Quote Strip + Contact */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Sanskrit Quote Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 rounded-2xl p-8 text-center mb-8"
          >
            <p className="text-2xl md:text-3xl font-devanagari text-white mb-2">
              योगश्चित्तवृत्तिनिरोधः
            </p>
            <p className="text-white/80 text-lg">
              "Yoga is the cessation of mental fluctuations"
            </p>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus-ring flex items-center space-x-3 mx-auto"
            >
              <Mail className="w-6 h-6" />
              <span>Contact Us</span>
            </motion.button>
            <p className="text-sm text-wisdom-500 dark:text-wisdom-400 mt-4">
              Replies within 24 hours
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
