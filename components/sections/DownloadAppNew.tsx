'use client'

import { motion } from 'framer-motion'
import { MotionDiv } from '@/components/motion/MotionWrapper'
import { Download, Smartphone, Play, Apple, Globe, Star, Users, BookOpen, ArrowRight, HardDrive, Gauge, Video, MessageSquare, Check, Zap, Clock, Trophy } from 'lucide-react'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'

const appFeatures = [
  {
    icon: HardDrive,
    title: 'Offline Learning',
    description: 'Download videos and learn without internet',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Gauge,
    title: 'Custom Speed',
    description: 'Adjust playback speed to your pace',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: Video,
    title: 'Live Classes',
    description: 'Join interactive sessions in real-time',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: MessageSquare,
    title: 'Community Hub',
    description: 'Connect with learners worldwide',
    gradient: 'from-green-500 to-teal-500'
  },
  {
    icon: Zap,
    title: 'Quick Access',
    description: 'Jump to any lesson instantly',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Trophy,
    title: 'Track Progress',
    description: 'Monitor your learning journey',
    gradient: 'from-indigo-500 to-purple-500'
  }
]

const appStats = [
  { number: '50K+', label: 'Downloads', icon: Download },
  { number: '4.8★', label: 'App Rating', icon: Star },
  { number: '100+', label: 'Countries', icon: Globe }
]

export default function DownloadApp() {
  const mounted = useHydrationSafeAnimation()
  
  return (
    <section id="download-app" className="py-20 md:py-28 bg-gradient-to-br from-slate-50 via-orange-50/50 to-amber-50/50 dark:from-gray-900 dark:via-orange-950/30 dark:to-amber-950/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          animate={mounted ? {
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          } : {}}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-400/40 to-amber-400/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={mounted ? {
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          } : {}}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
        />
        
        {/* Floating Phone Icons */}
        {mounted && [1, 2, 3].map((i) => (
          <motion.div
            key={`phone-${i}`}
            className="absolute"
            style={{
              left: `${(i * 30) % 100}%`,
              top: `${(i * 25) % 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut"
            }}
          >
            <Smartphone className="w-8 h-8 text-orange-300/30" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 dark:bg-orange-900/30 backdrop-blur-sm"
            >
              <Smartphone className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Mobile App Available
              </span>
            </motion.div>

            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Learning,{' '}
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                  Anytime. Anywhere.
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Carry ancient wisdom in your pocket. Our mobile app brings the complete Shikshanam experience to your fingertips with enhanced features for learning on the go.
              </p>
            </div>

            {/* App Stats */}
            <div className="grid grid-cols-3 gap-4">
              {appStats.map((stat, index) => (
                <MotionDiv
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
                >
                  <stat.icon className="w-6 h-6 text-orange-500 mb-2" />
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                </MotionDiv>
              ))}
            </div>

            {/* App Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {appFeatures.map((feature, index) => (
                <MotionDiv
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full">
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-black text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Apple className="w-7 h-7 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <div className="text-xs text-white">Download on</div>
                  <div className="text-base font-bold text-blue-500">App Store</div>
                </div>
              </motion.a>
              
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4 px-6 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                <Play className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <div className="text-xs text-white">Get it on</div>
                  <div className="text-base font-bold text-white">Google Play</div>
                </div>
              </motion.a>
            </div>

            {/* Web Platform Link */}
            <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Globe className="w-4 h-4" />
              <span>Also available on</span>
              <motion.button
                whileHover={{ x: 3 }}
                className="font-semibold text-orange-600 dark:text-orange-400 inline-flex items-center gap-1"
              >
                Web Platform
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </MotionDiv>

          {/* Right Content - Enhanced Phone Mockup */}
          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Main Phone */}
              <MotionDiv 
                className="relative z-10"
                animate={mounted ? { 
                  y: [0, -8, 0],
                } : {}}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {/* Phone Frame */}
                <div className="w-[320px] h-[650px] bg-gray-900 dark:bg-gray-100 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white dark:bg-gray-800 rounded-[2.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="h-10 bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-between px-6 text-white text-xs">
                      <span className="font-semibold">9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="p-5 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 h-full">
                      {/* App Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <BookOpen className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 dark:text-white text-lg">Shikshanam</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Learn Ancient Wisdom</div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md">
                          <div className="text-2xl font-bold text-orange-600 mb-1">12</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Courses</div>
                        </div>
                        <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md">
                          <div className="text-2xl font-bold text-amber-600 mb-1">48h</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Learning</div>
                        </div>
                      </div>

                      {/* Course Cards */}
                      <div className="space-y-3">
                        <div className="bg-gradient-to-br from-orange-400 to-amber-500 rounded-xl p-4 shadow-lg text-white">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                              <BookOpen className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-bold">Sanskrit Basics</div>
                              <div className="text-xs opacity-90">Lesson 5 of 20</div>
                            </div>
                          </div>
                          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full w-1/4 bg-white rounded-full"></div>
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                              <Video className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">Live Class Today</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Starts in 2 hours</div>
                            </div>
                            <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>

                        <div className="bg-white dark:bg-gray-700 rounded-xl p-4 shadow-md">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                              <Trophy className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="flex-1">
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">Daily Goal</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">3/5 lessons complete</div>
                            </div>
                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Home Indicator */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                      <div className="w-32 h-1 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </MotionDiv>

              {/* Floating Badge 1 */}
              <MotionDiv
                animate={mounted ? { 
                  y: [0, -10, 0],
                  rotate: [0, 3, 0]
                } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl border-2 border-orange-200 dark:border-orange-800 z-20"
              >
                <div className="text-center">
                  <Star className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                  <div className="text-xl font-bold text-gray-900 dark:text-white">4.8</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Rating</div>
                </div>
              </MotionDiv>

              {/* Floating Badge 2 */}
              <MotionDiv
                animate={mounted ? { 
                  y: [0, 10, 0],
                  rotate: [0, -3, 0]
                } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl p-3 shadow-xl border-2 border-purple-200 dark:border-purple-800 z-20"
              >
                <div className="text-center">
                  <Users className="w-5 h-5 text-purple-500 mx-auto mb-1" />
                  <div className="text-xl font-bold text-gray-900 dark:text-white">50K+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Users</div>
                </div>
              </MotionDiv>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-purple-400/20 blur-3xl -z-10 scale-110"></div>
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}