'use client'

import { motion } from 'framer-motion'
import MotionWrapper, { MotionDiv } from '@/components/motion/MotionWrapper'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'
import { BookOpen, Heart, Users, Globe, ArrowRight, Star, Award, Target, Lightbulb, Shield } from 'lucide-react'
import { useState, useEffect } from 'react'
import { usePopup } from '@/components/popups'

const contributionOptions = [
  {
    title: 'Through Knowledge',
    subtitle: 'Contribute Content / Become a Teacher',
    description: 'Share your wisdom and help preserve ancient knowledge for future generations.',
    icon: BookOpen,
    color: 'from-primary to-primary/90',
    hoverColor: 'from-primary/90 to-primary/80',
    features: [
      'Contribute original content and research',
      'Share traditional knowledge and practices',
      'Help translate ancient texts',
      'Create educational materials'
    ],
    ctaButtons: [
      {
        text: 'Contribute Content',
        icon: BookOpen,
        color: 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'
      },
      {
        text: 'Become a Teacher',
        icon: Users,
        color: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
      }
    ]
  },
  {
    title: 'Through Support',
    subtitle: 'Choose a Project / Become a Patron',
    description: 'Help us preserve and share ancient wisdom by supporting our various initiatives and projects.',
    icon: Heart,
    color: 'from-accent to-accent/90',
    hoverColor: 'from-accent/90 to-accent/80',
    features: [
      'Fund Sanskrit manuscript preservation',
      'Support teacher training programs',
      'Help develop mobile learning apps',
      'Contribute to scholarship programs'
    ],
    ctaButtons: [
      {
        text: 'Choose a Project',
        icon: Target,
        color: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
      },
      {
        text: 'Become a Patron',
        icon: Star,
        color: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'
      }
    ]
  }
]


export default function Contribute() {
  const mounted = useHydrationSafeAnimation()
  const { openPopup } = usePopup()
  const [contributeData, setContributeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Use mock data since CMS functionality is removed
  useEffect(() => {
    const fetchContributeData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Mock contribute data
        setContributeData({
          title: "Contribute to Ancient Wisdom",
          subtitle: "Share Your Knowledge",
          description: "Help preserve and share ancient wisdom by contributing your expertise and insights to our community.",
          waysToContribute: [
            {
              title: "Write Articles",
              description: "Share your insights on Sanskrit, philosophy, or spiritual practices",
              icon: "✍️"
            },
            {
              title: "Create Content",
              description: "Develop educational materials and course content",
              icon: "📚"
            },
            {
              title: "Translate Texts",
              description: "Help translate ancient texts into modern languages",
              icon: "🌐"
            }
          ]
        })
      } catch (error) {
        console.error('Failed to load contribute data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchContributeData()
  }, [])

  // Use CMS data or fallback to default
  const sectionTitle = contributeData?.title || "Contribute to Our Mission"
  const sectionSubtitle = contributeData?.subtitle || "Help us spread ancient wisdom"
  const sectionDescription = contributeData?.description || "Join our community of contributors and help preserve and share ancient knowledge."
  const ctaText = contributeData?.ctaText || "Get Involved"
  const ctaLink = contributeData?.ctaLink || "/contribute"

  return (
    <section id="contribute" className="section-padding bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full blur-3xl" />
        
        {/* Animated floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-400/20 to-amber-400/20 dark:from-orange-600/10 dark:to-amber-600/10 rounded-full blur-2xl"
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
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <MotionDiv
          initial={mounted ? { opacity: 0, y: 40 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.6 } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.h2
            initial={mounted ? { opacity: 0, y: 20 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.6, delay: 0.1 } : { duration: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-orange-900 via-amber-900 to-yellow-900 dark:from-orange-100 dark:via-amber-100 dark:to-yellow-100 bg-clip-text text-transparent"
          >
            Preserve Our Sacred Heritage
          </motion.h2>
          <motion.p
            initial={mounted ? { opacity: 0, y: 20 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.6, delay: 0.2 } : { duration: 0 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Be part of this movement — share knowledge, guide as a Guru, or support a project.
          </motion.p>
        </MotionDiv>

        {/* Contribution Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {contributionOptions.map((option, index) => (
            <MotionDiv
              key={option.title}
              initial={mounted ? { opacity: 0, y: 20 } : false}
              whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={mounted ? { duration: 0.6, delay: index * 0.1 } : { duration: 0 }}
              viewport={{ once: true }}
              whileHover={mounted ? { y: -5 } : {}}
              className="group relative"
            >
              <div className="relative h-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-amber-500/0 to-yellow-500/0 group-hover:from-orange-500/10 group-hover:via-amber-500/10 group-hover:to-yellow-500/10 transition-all duration-500 rounded-3xl" />
                
                {/* Decorative element */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-orange-400/20 to-amber-400/20 dark:from-orange-500/10 dark:to-amber-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500" />
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-amber-600 dark:from-orange-500 dark:to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <option.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{option.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mb-3">{option.subtitle}</p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{option.description}</p>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 dark:text-white mb-3">What you can do:</h4>
                    <ul className="space-y-2">
                      {option.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={mounted ? { opacity: 0, x: -10 } : false}
                          whileInView={mounted ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                          transition={mounted ? { duration: 0.4, delay: 0.3 + featureIndex * 0.05 } : { duration: 0 }}
                          viewport={{ once: true }}
                          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
                        >
                          <div className="w-1.5 h-1.5 bg-orange-600 dark:bg-orange-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    {option.ctaButtons.map((button, buttonIndex) => (
                      <motion.button
                        key={button.text}
                        whileHover={mounted ? { scale: 1.02 } : {}}
                        whileTap={mounted ? { scale: 0.98 } : {}}
                        onClick={() => {
                          if (button.text === 'Contribute Content') {
                            openPopup('contribute')
                          } else if (button.text === 'Become a Teacher') {
                            openPopup('teacher')
                          } else if (button.text === 'Choose a Project' || button.text === 'Become a Patron') {
                            window.location.href = '/support-us'
                          }
                        }}
                        className="w-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white py-3.5 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                      >
                        <button.icon className="w-5 h-5" />
                        <span>{button.text}</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>


      </div>
    </section>
  )
}
