'use client'

import { motion } from 'framer-motion'
import MotionWrapper, { MotionDiv } from '@/components/motion/MotionWrapper'
import { Download, Smartphone, Play, Apple, Globe, Star, Users, BookOpen, ArrowRight, MessageCircle } from 'lucide-react'

const appFeatures = [
  {
    icon: Download,
    title: 'Save Data',
    description: 'Download videos to learn offline anywhere anytime!'
  },
  {
    icon: Play,
    title: 'Playback Speed',
    description: 'Control playback speed to match your learning pace!'
  },
  {
    icon: Users,
    title: 'Live Classes',
    description: 'Join interactive sessions with teachers in real-time'
  },
  {
    icon: MessageCircle,
    title: 'Community Access',
    description: 'Access members only community for QnA and Discussions!'
  }
]

const appStats = [
  { number: '50K+', label: 'Downloads' },
  { number: '4.8', label: 'Rating' },
  { number: '100+', label: 'Countries' }
]

export default function DownloadApp() {
  return (
    <section id="download-app" className="section-padding bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 dark:from-blue-100 dark:via-indigo-100 dark:to-purple-100 bg-clip-text text-transparent">
              Learning, Anytime. Anywhere.
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              Shikshanam is in your pocket. Access ancient Indian wisdom on the go with our comprehensive mobile app.
            </p>

            {/* App Features */}
            <div className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <MotionDiv
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 group"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>

            {/* App Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {appStats.map((stat, index) => (
                <MotionDiv
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                </MotionDiv>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-black hover:bg-gray-900 text-white py-4 px-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 group"
              >
                <Apple className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <div className="text-xs text-white/80">Download on the</div>
                  <div className="text-base font-bold text-white">App Store</div>
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 px-6 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center space-x-3 group"
              >
                <Play className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <div className="text-xs text-white/80">Get it on</div>
                  <div className="text-base font-bold text-white">Google Play</div>
                </div>
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Also available on</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-bold text-lg"
              >
                <Globe className="w-5 h-5" />
                <span>Web Platform</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </MotionDiv>

          {/* Right Content - 3D Rotating Phone Mockup */}
          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex justify-center mt-8"
          >
            {/* 3D Rotating Phone Mockup */}
            <MotionDiv 
              className="relative"
              animate={{ 
                rotateY: [0, 10, -10, 0],
                rotateX: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-foreground/90 rounded-[3rem] p-3 shadow-2xl transform-gpu perspective-1000">
                <div className="w-full h-full bg-card rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-8 bg-gradient-to-r from-primary to-accent flex items-center justify-between px-6 text-primary-foreground text-xs">
                    <span>9:41</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                      <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                      <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="p-6">
                    {/* App Header */}
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="font-bold text-foreground">Shikshanam</div>
                        <div className="text-xs text-muted-foreground">Ancient Wisdom App</div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-primary/10 rounded-2xl p-4 text-center">
                        <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                        <div className="text-sm font-medium text-foreground">Courses</div>
                      </div>
                      <div className="bg-accent/10 rounded-2xl p-4 text-center">
                        <Users className="w-8 h-8 text-accent mx-auto mb-2" />
                        <div className="text-sm font-medium text-foreground">Live Classes</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-3 bg-muted rounded-xl">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">Sanskrit Basics</div>
                          <div className="text-xs text-muted-foreground">Continue learning...</div>
                        </div>
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center space-x-3 p-3 bg-muted rounded-xl">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-foreground">Live Session</div>
                          <div className="text-xs text-muted-foreground">In 30 minutes</div>
                        </div>
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-32 h-1 bg-border rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <MotionDiv
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-card rounded-2xl p-3 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-primary">4.8★</div>
                  <div className="text-xs text-muted-foreground">Rating</div>
                </div>
              </MotionDiv>

              <MotionDiv
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-card rounded-2xl p-3 shadow-lg"
              >
                <div className="text-center">
                  <div className="text-lg font-bold text-accent">50K+</div>
                  <div className="text-xs text-muted-foreground">Downloads</div>
                </div>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        </div>

      </div>
    </section>
  )
}