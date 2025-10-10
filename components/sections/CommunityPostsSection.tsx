'use client'

import { motion } from 'framer-motion'
import MotionWrapper, { MotionDiv, MotionButton } from '@/components/motion/MotionWrapper'
import { Users, MessageCircle, Instagram, ExternalLink, Sparkles, Heart, Globe, Zap, Star, TrendingUp, Award, Clock, Shield } from 'lucide-react'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'
import { useState, useEffect } from 'react'

interface CommunitySectionProps {
  showHeader?: boolean
}

interface CommunityData {
  title: string;
  subtitle: string;
  description: string;
  stats: {
    members: number;
    countries: number;
    languages: number;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    telegram: string;
    whatsapp: string;
  };
}

export default function CommunityPostsSection({ 
  showHeader = true
}: CommunitySectionProps) {
  const mounted = useHydrationSafeAnimation()
  const [communityData, setCommunityData] = useState<CommunityData | null>(null)
  const [loading, setLoading] = useState(true)

  // Fetch CMS data
  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Mock data
        setCommunityData({
          title: 'Join Our Community',
          subtitle: 'Connect with Fellow Learners',
          description: 'Join thousands of students worldwide in our vibrant community of ancient wisdom seekers.',
          stats: {
            members: 15000,
            countries: 45,
            languages: 12
          },
          socialLinks: {
            facebook: 'https://facebook.com/shikshanam',
            instagram: 'https://instagram.com/shikshanam',
            twitter: 'https://twitter.com/shikshanam',
            youtube: 'https://youtube.com/shikshanam',
            telegram: 'https://t.me/shikshanam',
            whatsapp: 'https://wa.me/1234567890'
          }
        })
      } catch (error) {
        console.error('Failed to load community data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCommunityData()
  }, [])

  // Use CMS data or fallback to default
  const sectionTitle = communityData?.title || "Join Our Community"
  const sectionSubtitle = communityData?.subtitle || "Connect with Fellow Learners"
  const sectionDescription = communityData?.description || "Join thousands of students worldwide in our vibrant community of ancient wisdom seekers."
  const stats = communityData?.stats || { members: 15000, countries: 45, languages: 12 }
  const socialLinks = communityData?.socialLinks || { 
    facebook: 'https://facebook.com/shikshanam',
    instagram: 'https://instagram.com/shikshanam',
    twitter: 'https://twitter.com/shikshanam',
    youtube: 'https://youtube.com/shikshanam',
    telegram: 'https://t.me/shikshanam',
    whatsapp: 'https://wa.me/1234567890'
  }


  // Community benefits data
  const communityBenefits = [
    {
      icon: Zap,
      title: "Daily Wisdom",
      description: "Get ancient wisdom quotes and insights delivered daily"
    },
    {
      icon: Users,
      title: "Live Discussions",
      description: "Join interactive sessions with gurus and fellow learners"
    },
    {
      icon: Star,
      title: "Exclusive Content",
      description: "Access special workshops and premium learning materials"
    },
    {
      icon: Heart,
      title: "Supportive Community",
      description: "Connect with like-minded seekers on their spiritual journey"
    }
  ]

  return (
    <MotionWrapper>
      <section className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 -z-10">
          {/* Gradient orbs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-500/10 dark:bg-rose-500/5 rounded-full blur-3xl" />
          
          {/* Animated floating elements */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 dark:from-purple-600/10 dark:to-pink-600/10 rounded-full blur-2xl"
            animate={mounted ? { 
              y: [0, -20, 0],
              x: [0, 15, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={mounted ? { 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            } : { duration: 0 }}
          />
          <motion.div
            className="absolute bottom-32 right-20 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-rose-400/20 dark:from-pink-600/10 dark:to-rose-600/10 rounded-full blur-2xl"
            animate={mounted ? { 
              y: [0, 15, 0],
              x: [0, -10, 0],
              scale: [1, 0.9, 1]
            } : {}}
            transition={mounted ? { 
              duration: 9, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            } : { duration: 0 }}
          />
        </div>

        <div className="container-custom">
          {/* Enhanced Section Header */}
          <MotionDiv
            initial={mounted ? { opacity: 0, y: 40 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.6, delay: 0.1 } : { duration: 0 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={mounted ? { opacity: 0, scale: 0.9 } : false}
              animate={mounted ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              transition={mounted ? { duration: 0.5, delay: 0.2 } : { duration: 0 }}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 border border-purple-200 dark:border-purple-700/50 mb-6 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-semibold text-purple-900 dark:text-purple-200 tracking-widest uppercase">
                Join Our Sangha
              </span>
            </motion.div>

            <motion.h2
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={mounted ? { duration: 0.6, delay: 0.3 } : { duration: 0 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-purple-900 via-pink-900 to-rose-900 dark:from-purple-100 dark:via-pink-100 dark:to-rose-100 bg-clip-text text-transparent"
            >
              Connect With Us
            </motion.h2>

            <motion.p
              initial={mounted ? { opacity: 0, y: 20 } : false}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={mounted ? { duration: 0.6, delay: 0.4 } : { duration: 0 }}
              className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              Join our vibrant community of wisdom seekers and connect with fellow learners, 
              gurus, and spiritual practitioners from around the world.
            </motion.p>
          </MotionDiv>

          {/* Community Benefits Grid */}
          <MotionDiv
            initial={mounted ? { opacity: 0, y: 40 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.6, delay: 0.5 } : { duration: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
          >
            {communityBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={mounted ? { opacity: 0, y: 20 } : false}
                animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={mounted ? { duration: 0.5, delay: 0.6 + index * 0.1 } : { duration: 0 }}
                whileHover={mounted ? { y: -8, scale: 1.02 } : {}}
                className="relative group"
              >
                <div className="relative h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                  {/* Gradient accent on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-rose-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-rose-500/5 rounded-2xl transition-all duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      <benefit.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-900 dark:group-hover:text-purple-300 transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </MotionDiv>

          {/* Enhanced Social Links */}
          <MotionDiv
            initial={mounted ? { opacity: 0, y: 40 } : false}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.6, delay: 1.0 } : { duration: 0 }}
            className="text-center"
          >
            <div className="max-w-6xl mx-auto">
              <motion.h3
                initial={mounted ? { opacity: 0, y: 20 } : false}
                animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={mounted ? { duration: 0.6, delay: 1.1 } : { duration: 0 }}
                className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-900 via-pink-900 to-rose-900 dark:from-purple-100 dark:via-pink-100 dark:to-rose-100 bg-clip-text text-transparent mb-12"
              >
                Choose Your Platform
              </motion.h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* WhatsApp Card */}
                <motion.div
                  initial={mounted ? { opacity: 0, x: -20 } : false}
                  animate={mounted ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                  transition={mounted ? { duration: 0.6, delay: 1.2 } : { duration: 0 }}
                  whileHover={mounted ? { y: -5 } : {}}
                  className="group relative"
                >
                  <div className="relative h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-emerald-500/0 to-teal-500/0 group-hover:from-green-500/10 group-hover:via-emerald-500/10 group-hover:to-teal-500/10 transition-all duration-500 rounded-3xl" />
                    
                    {/* Decorative element */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-green-400/20 to-emerald-400/20 dark:from-green-500/10 dark:to-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            <MessageCircle className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">WhatsApp</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">15,000+ Members</p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        Join our WhatsApp group for daily wisdom quotes, live session reminders, 
                        study groups, and instant Q&A support from our community.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {['Daily Quotes', 'Live Sessions', 'Study Groups', 'Q&A Support'].map((feature) => (
                          <span key={feature} className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-semibold rounded-lg">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <motion.a
                        href={socialLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={mounted ? { scale: 1.02 } : {}}
                        whileTap={mounted ? { scale: 0.98 } : {}}
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Join WhatsApp Group</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>

                {/* Instagram Card */}
                <motion.div
                  initial={mounted ? { opacity: 0, x: 20 } : false}
                  animate={mounted ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                  transition={mounted ? { duration: 0.6, delay: 1.3 } : { duration: 0 }}
                  whileHover={mounted ? { y: -5 } : {}}
                  className="group relative"
                >
                  <div className="relative h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-rose-500/0 group-hover:from-pink-500/10 group-hover:via-purple-500/10 group-hover:to-rose-500/10 transition-all duration-500 rounded-3xl" />
                    
                    {/* Decorative element */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-purple-400/20 dark:from-pink-500/10 dark:to-purple-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-pink-600 to-purple-600 dark:from-pink-500 dark:to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                            <Instagram className="w-8 h-8 text-white" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">Instagram</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">25,000+ Followers</p>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        Follow us for visual wisdom content, daily inspiration, behind-the-scenes 
                        glimpses, and beautiful Sanskrit calligraphy.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {['Visual Content', 'Daily Inspiration', 'Behind Scenes', 'Sanskrit Art'].map((feature) => (
                          <span key={feature} className="px-3 py-1.5 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 text-xs font-semibold rounded-lg">
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      <motion.a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl"
                        whileHover={mounted ? { scale: 1.02 } : {}}
                        whileTap={mounted ? { scale: 0.98 } : {}}
                      >
                        <Instagram className="w-5 h-5" />
                        <span>Follow on Instagram</span>
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>
    </MotionWrapper>
  )
}
