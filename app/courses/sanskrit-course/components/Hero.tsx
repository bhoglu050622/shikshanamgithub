'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Play, Users, Clock, Award, BookOpen } from 'lucide-react'
import Image from 'next/image'

const FeatureBadges = () => {
  const features = [
    { icon: Users, text: 'Live Classes', subtext: 'लाइव क्लासेस' },
    { icon: BookOpen, text: 'Learn in English', subtext: 'अंग्रेजी में सीखें' },
    { icon: Award, text: 'Certificate', subtext: 'सर्टिफिकेट' },
    { icon: Clock, text: '3 Months', subtext: '3 महीने' },
    { icon: Users, text: 'Doubt Sessions', subtext: 'डाउट सेशन' },
    { icon: BookOpen, text: 'For Beginners', subtext: 'शुरुआती के लिए' },
    { icon: Award, text: 'Verified', subtext: 'वेरिफाइड' },
    { icon: Clock, text: 'Lifetime Access', subtext: 'लाइफटाइम एक्सेस' }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/80 dark:bg-wisdom-800/80 backdrop-blur-sm rounded-xl p-3 text-center border border-saffron-200/30 dark:border-saffron-400/20"
        >
          <feature.icon className="w-5 h-5 mx-auto mb-2 text-saffron-600 dark:text-saffron-400" />
          <p className="text-xs font-medium text-indigo-800 dark:text-wisdom-100">
            {feature.text}
          </p>
          <p className="text-xs text-indigo-600 dark:text-wisdom-300 font-devanagari">
            {feature.subtext}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

const TrustLine = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
    className="flex items-center justify-center gap-2 mt-6"
  >
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-saffron-500 text-saffron-500" />
      ))}
    </div>
    <span className="text-sm text-indigo-700 dark:text-wisdom-300">
      4.9/5 Rating • 500+ Students Learned
    </span>
  </motion.div>
)

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="bg-gradient-to-r from-saffron-500 to-saffron-600 text-white px-4 py-2 text-sm font-medium">
                🎯 Perfect for Beginners
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-hero text-indigo-900 dark:text-wisdom-50 leading-tight"
            >
              <span className="block">Learn Sanskrit</span>
              <span className="block text-saffron-600 dark:text-saffron-400">
                From the Beginning
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-indigo-700 dark:text-wisdom-200 leading-relaxed"
            >
              Learn Sanskrit without any prior knowledge. Complete guidance with live classes, doubt sessions, and certification.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                className="btn-primary text-lg px-8 py-4 h-auto"
                asChild
              >
                <a href="#pricing">
                  Enroll Now - ₹2,999
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="btn-outline text-lg px-8 py-4 h-auto"
                asChild
              >
                <a href="#demo" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Free Demo
                </a>
              </Button>
            </motion.div>

            {/* Trust Line */}
            <TrustLine />

            {/* Feature Badges */}
            <FeatureBadges />
          </motion.div>

          {/* Right Column - Lottie/Video */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-saffron-100 to-saffron-200 dark:from-saffron-900/30 dark:to-saffron-800/30 rounded-3xl p-8 shadow-2xl">
              {/* Placeholder for Lottie/Video */}
              <div className="aspect-video bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/50 dark:to-indigo-800/50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Devanagari Glyphs Animation Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl md:text-8xl text-indigo-300 dark:text-indigo-600 animate-pulse-gentle font-bold">
                    Sanskrit
                  </div>
                </div>
                
                {/* Floating Glyphs */}
                <div className="absolute inset-0">
                  {['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ'].map((glyph, index) => (
                    <motion.div
                      key={glyph}
                      className="absolute text-2xl font-devanagari text-saffron-500/60"
                      style={{
                        left: `${20 + (index * 15)}%`,
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
                      {glyph}
                    </motion.div>
                  ))}
                </div>

                {/* Play Button Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="bg-white/90 dark:bg-wisdom-800/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                    <Play className="w-8 h-8 text-saffron-600 dark:text-saffron-400 ml-1" />
                  </div>
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-saffron-500 rounded-full animate-pulse-gentle" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-peacock-green-500 rounded-full animate-pulse-gentle animation-delay-2000" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sutra Divider */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32">
        <div className="sutra" />
      </div>
    </section>
  )
}
