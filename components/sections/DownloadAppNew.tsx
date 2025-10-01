'use client'

import { motion } from 'framer-motion'
import MotionWrapper, { MotionDiv } from '@/components/motion/MotionWrapper'
import { Download, Smartphone, Play, Apple, Globe, Star, Users, BookOpen, ArrowRight } from 'lucide-react'

const appFeatures = [
  {
    icon: BookOpen,
    title: 'Offline Learning',
    description: 'Download courses and learn anywhere, even without internet'
  },
  {
    icon: Users,
    title: 'Live Classes',
    description: 'Join interactive sessions with teachers in real-time'
  },
  {
    icon: Star,
    title: 'Progress Tracking',
    description: 'Monitor your learning journey with detailed progress tracking'
  },
  {
    icon: Globe,
    title: 'Multi-language',
    description: 'Available in 8 languages for global accessibility'
  }
]

const appStats = [
  { number: '50K+', label: 'Downloads' },
  { number: '4.8', label: 'Rating' },
  { number: '100+', label: 'Countries' }
]

export default function DownloadApp() {
  return (
    <section id="download-app" className="section-padding bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Learning,{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Anytime. Anywhere.
              </span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Shikshanam is in your pocket. Access ancient Indian wisdom on the go with our comprehensive mobile app.
            </p>

            {/* App Features */}
            <div className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <MotionDiv
                  key={feature.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/90 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
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
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </MotionDiv>
              ))}
            </div>

            {/* Download Buttons with Hover Glow */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white text-foreground py-4 px-6 rounded-2xl font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center justify-center space-x-3 group"
              >
                <Apple className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-card text-foreground py-4 px-6 rounded-2xl font-semibold hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 flex items-center justify-center space-x-3 border border-border group"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </motion.button>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Also available on</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
              >
                <Globe className="w-4 h-4" />
                <span>Web Platform</span>
                <ArrowRight className="w-4 h-4" />
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

        {/* Bottom CTA */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-card rounded-3xl p-8 shadow-xl max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              Start Your Learning Journey Today
            </h3>
            <p className="text-muted-foreground mb-6 text-lg">
              Download the app and get instant access to ancient Indian wisdom, live classes, and a community of learners.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2 mx-auto"
            >
              <Download className="w-5 h-5" />
              <span>Download Now</span>
            </motion.button>
          </div>
        </MotionDiv>
      </div>
    </section>
  )
}