'use client'

import { motion } from 'framer-motion'
import MotionWrapper, { MotionDiv } from '@/components/motion/MotionWrapper'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'
import { BookOpen, Heart, Users, Globe, ArrowRight, Star, Award, Target, Lightbulb, Shield } from 'lucide-react'
import { API_CONFIG } from '@/lib/config/api'
import { useState, useEffect } from 'react'

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
        color: 'bg-primary hover:bg-primary/90'
      },
      {
        text: 'Become a Teacher',
        icon: Users,
        color: 'bg-secondary hover:bg-secondary/90'
      }
    ],
    stats: {
      contributors: '150+',
      content: '500+',
      languages: '8'
    }
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
        color: 'bg-secondary hover:bg-secondary/90'
      },
      {
        text: 'Become a Patron',
        icon: Star,
        color: 'bg-primary hover:bg-primary/90'
      }
    ],
    stats: {
      projects: '25+',
      funded: '₹50L+',
      supporters: '2000+'
    }
  }
]

const currentProjects = [
  {
    title: 'Sanskrit Manuscript Digitization',
    description: 'Preserving ancient texts through modern technology',
    progress: 75,
    target: '₹10L',
    raised: '₹7.5L',
    daysLeft: 15,
    category: 'Preservation'
  },
  {
    title: 'Rural Teacher Training',
    description: 'Empowering teachers in remote areas with traditional knowledge',
    progress: 45,
    target: '₹5L',
    raised: '₹2.25L',
    daysLeft: 30,
    category: 'Education'
  },
  {
    title: 'Mobile Learning App',
    description: 'Making ancient wisdom accessible on mobile devices',
    progress: 90,
    target: '₹8L',
    raised: '₹7.2L',
    daysLeft: 8,
    category: 'Technology'
  }
]

export default function Contribute() {
  const mounted = useHydrationSafeAnimation()
  const [contributeData, setContributeData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Fetch CMS data
  useEffect(() => {
    const fetchContributeData = async () => {
      try {
        const apiUrl = API_CONFIG.getCmsApiUrl('content')
        console.log('Fetching contribute data from:', apiUrl)
        
        const response = await fetch(apiUrl)
        const result = await response.json()
        
        if (result.success && result.data.contribute) {
          setContributeData(result.data.contribute)
        }
      } catch (error) {
        console.error('Failed to fetch contribute data:', error)
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
    <section id="contribute" className="section-padding bg-background relative overflow-hidden">
      {/* Background Animation - 3D Donation Box & Pen Writing */}
      <div className="absolute inset-0 -z-10">
        {/* 3D Donation Box Animation */}
        <div className="absolute top-20 right-20 opacity-20">
          <MotionDiv
            animate={{ 
              rotateY: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-20 bg-gradient-to-br from-accent to-accent/80 rounded-lg shadow-lg relative"
          >
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-accent/80 rounded-full"></div>
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-accent/60 rounded-full"></div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-14 h-1 bg-accent/60 rounded-full"></div>
          </MotionDiv>
        </div>
        
        {/* Pen Writing Animation */}
        <div className="absolute top-40 left-20 opacity-15">
          <MotionDiv
            animate={{ 
              rotate: [0, 5, -5, 0],
              x: [0, 20, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-8 h-1 bg-gradient-to-r from-secondary to-secondary/80 rounded-full relative"
          >
            <div className="absolute -top-2 left-0 w-1 h-4 bg-secondary rounded-full"></div>
            <div className="absolute -top-1 left-1 w-1 h-2 bg-secondary/80 rounded-full"></div>
          </MotionDiv>
        </div>
        
        {/* Floating Mantra Text */}
        <div className="absolute bottom-20 right-20 opacity-10">
          <MotionDiv
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-2xl font-display text-primary"
          >
            दानं परमं धर्मः
          </MotionDiv>
        </div>
        
        {/* Subtle gradient overlays */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-primary/10 to-secondary/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-secondary/10 to-accent/8 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <MotionDiv
          initial={mounted ? { opacity: 0, y: 30 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.8 } : { duration: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Keep the Indian{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Wisdom Alive!
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Be part of this movement — share knowledge, guide as a Guru, or support a project.
          </p>
        </MotionDiv>

        {/* Contribution Options Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          {contributionOptions.map((option, index) => (
            <MotionDiv
              key={option.title}
              initial={mounted ? { opacity: 0, y: 30 } : false}
              whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={mounted ? { duration: 0.8, delay: index * 0.2 } : { duration: 0 }}
              viewport={{ once: true }}
              whileHover={mounted ? { scale: 1.02, y: -5 } : {}}
              className="group"
            >
              <div className={`bg-gradient-to-br ${option.color} hover:${option.hoverColor} rounded-3xl p-8 text-primary-foreground transition-all duration-300 shadow-xl hover:shadow-2xl h-full`}>
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-primary-foreground/20 rounded-3xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <option.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{option.title}</h3>
                  <p className="text-primary-foreground font-medium mb-4">{option.subtitle}</p>
                  <p className="text-primary-foreground/90 leading-relaxed">{option.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-primary-foreground">What you can do:</h4>
                  <ul className="space-y-2">
                    {option.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={mounted ? { opacity: 0, x: -20 } : false}
                        whileInView={mounted ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                        transition={mounted ? { duration: 0.5, delay: 0.3 + featureIndex * 0.1 } : { duration: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-primary-foreground/90"
                      >
                        <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full"></div>
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-6 p-3 bg-primary-foreground/10 rounded-2xl">
                  {Object.entries(option.stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-lg font-bold">{value}</div>
                      <div className="text-xs text-primary-foreground/90 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  {option.ctaButtons.map((button, buttonIndex) => (
                    <motion.button
                      key={button.text}
                      whileHover={mounted ? { scale: 1.05 } : {}}
                      whileTap={mounted ? { scale: 0.95 } : {}}
                      className={`w-full ${button.color} text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 group-hover:shadow-lg`}
                    >
                      <button.icon className="w-5 h-5" />
                      <span>{button.text}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>

        {/* Current Projects Section */}
        <MotionDiv
          initial={mounted ? { opacity: 0, y: 30 } : false}
          whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={mounted ? { duration: 0.8, delay: 0.4 } : { duration: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-6">
            Current Projects You Can Support
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {currentProjects.map((project, index) => (
              <MotionDiv
                key={project.title}
                initial={mounted ? { opacity: 0, y: 30 } : false}
                whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={mounted ? { duration: 0.6, delay: 0.5 + index * 0.1 } : { duration: 0 }}
                viewport={{ once: true }}
                whileHover={mounted ? { scale: 1.02, y: -3 } : {}}
                className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-border"
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{project.daysLeft} days left</span>
                </div>
                
                <h4 className="font-bold text-foreground mb-3 text-xl">{project.title}</h4>
                <p className="text-muted-foreground text-base mb-4 leading-relaxed">{project.description}</p>
                
                {/* Progress Bar */}
                <div className="mb-5">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Funding Info */}
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <div className="text-xs text-muted-foreground">Raised</div>
                    <div className="font-bold text-foreground">{project.raised}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Target</div>
                    <div className="font-bold text-foreground">{project.target}</div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={mounted ? { scale: 1.05 } : {}}
                  whileTap={mounted ? { scale: 0.95 } : {}}
                  className="btn-primary w-full py-4 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 text-base"
                >
                  Support This Project
                </motion.button>
              </MotionDiv>
            ))}
          </div>
        </MotionDiv>

      </div>
    </section>
  )
}
