'use client'

import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Heart, ArrowRight, Users, Star, Clock } from 'lucide-react'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'
import { API_CONFIG } from '@/lib/config/api'

// Default schools data (fallback)
const defaultSchools = [
  {
    id: 'school-of-sanskrit',
    title: 'School of Sanskrit',
    subtitle: 'Ancient Manuscript',
    description: 'Master the ancient language that holds the key to Vedic wisdom, classical literature, and spiritual texts.',
    icon: BookOpen,
    emoji: '📜',
    color: 'from-primary to-primary/90',
    hoverColor: 'from-primary/90 to-primary/80',
    href: '/schools/sanskrit',
    whatYoullLearn: 'Grammar, Communication, Shloka-Path, Live Q&A',
    features: [
      'Grammar & Literature',
      'Vedic Texts',
      'Classical Poetry',
      'Scripture Study'
    ],
    cta: 'Join Sanskrit School'
  },
  {
    id: 'school-of-darshan',
    title: 'School of Darshana',
    subtitle: 'Temple Meditation',
    description: 'Explore the six classical schools of Indian philosophy and discover the nature of reality, consciousness, and existence.',
    icon: Lightbulb,
    emoji: '🕉',
    color: 'from-secondary to-secondary/90',
    hoverColor: 'from-secondary/90 to-secondary/80',
    href: '/schools/darshana',
    whatYoullLearn: 'Nyaya and Vaisheshika, Samkhya and Yoga, Mimamsa and Vedanta',
    features: [
      'Vedanta',
      'Yoga Philosophy',
      'Nyaya & Vaisheshika',
      'Samkhya & Mimamsa'
    ],
    cta: 'Join Darshan School'
  },
  {
    id: 'school-of-life-skills',
    title: 'School of Life Skills',
    subtitle: 'Lotus & Sunrise',
    description: 'Discover practical wisdom from ancient texts to transform your life, relationships, and personal growth.',
    icon: Heart,
    emoji: '🌱',
    color: 'from-accent to-accent/90',
    hoverColor: 'from-accent/90 to-accent/80',
    href: '/schools/self-help',
    whatYoullLearn: 'Entrepreneurship, Emotional Intelligence, Stress-Management, Purpose and Meaning',
    features: [
      'Life Management',
      'Relationship Wisdom',
      'Stress & Anxiety',
      'Purpose & Meaning'
    ],
    cta: 'Join Life Skills School'
  }
]

export default function Schools() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mounted = useHydrationSafeAnimation()
  
  // CMS data state
  const [schoolsData, setSchoolsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Fetch CMS data
  useEffect(() => {
    const fetchSchoolsData = async () => {
      try {
        const apiUrl = API_CONFIG.getCmsApiUrl('content')
        console.log('Fetching schools data from:', apiUrl)
        
        const response = await fetch(apiUrl)
        const result = await response.json()
        
        if (result.success && result.data.schools) {
          setSchoolsData(result.data.schools)
        } else if (result.success && result.data) {
          // Handle case where schools data is nested differently
          setSchoolsData(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch schools data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSchoolsData()
  }, [])
  
  // Transform CMS data to match component expectations
  const transformSchoolData = (school: any) => {
    return {
      id: school.id || school.name?.toLowerCase().replace(/\s+/g, '-'),
      title: school.name || school.title || 'School',
      subtitle: school.subtitle || school.tagline || 'Learning Path',
      description: school.description || 'Discover ancient wisdom',
      icon: school.icon || BookOpen,
      emoji: school.emoji || '📚',
      color: school.color ? `from-${school.color} to-${school.color}/90` : 'from-primary to-primary/90',
      hoverColor: school.color ? `from-${school.color}/90 to-${school.color}/80` : 'from-primary/90 to-primary/80',
      href: school.link || school.href || '#',
      whatYoullLearn: school.whatYoullLearn || school.curriculum || 'Comprehensive learning modules',
      features: school.features || school.topics || ['Core Concepts', 'Practical Applications'],
      cta: school.cta || school.buttonText || 'Join School'
    }
  }

  // Use CMS data or fallback to default
  const schools = schoolsData?.schools || defaultSchools
  const sectionTitle = schoolsData?.title || "Explore Our Schools"
  const sectionSubtitle = schoolsData?.subtitle || "Discover the ancient wisdom through our structured learning paths"
  const sectionDescription = schoolsData?.description || "Our schools offer comprehensive learning paths in Sanskrit, philosophy, and life skills."

  // Ensure schools is always an array and transform data
  const safeSchools = Array.isArray(schools) 
    ? schools.map(transformSchoolData)
    : defaultSchools

  // Show loading state
  if (loading) {
    return (
      <section id="schools" className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-6"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-3xl p-8 h-32"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="schools" className="py-8 sm:py-12 md:py-16 bg-background relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={mounted ? { 
            rotate: 360,
            scale: [1, 1.1, 1]
          } : {}}
          transition={mounted ? { 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          } : { duration: 0 }}
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={mounted ? { 
            rotate: -360,
            scale: [1, 1.2, 1]
          } : {}}
          transition={mounted ? { 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          } : { duration: 0 }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-accent/5 to-primary/5 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={mounted ? { opacity: 0, y: 50, scale: 0.9 } : false}
          animate={mounted && isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
          transition={mounted ? { duration: 0.8, delay: 0.2 } : { duration: 0 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"
            animate={mounted && isInView ? {
              textShadow: [
                '0 0 0px rgba(218, 165, 32, 0)',
                '0 0 20px rgba(218, 165, 32, 0.3)',
                '0 0 0px rgba(218, 165, 32, 0)'
              ]
            } : {}}
            transition={mounted ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
          >
            {sectionTitle}
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={mounted ? { opacity: 0, y: 20 } : false}
            animate={mounted && isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.6, delay: 0.4 } : { duration: 0 }}
          >
            <motion.span
              animate={mounted && isInView ? { opacity: [0.7, 1, 0.7] } : {}}
              transition={mounted ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
            >
              {sectionDescription}
            </motion.span>
          </motion.p>
        </motion.div>

        {/* Schools Vertical Layout */}
        <div className="flex flex-col gap-8 max-w-4xl mx-auto">
          {safeSchools.map((school, index) => (
            <Link 
              key={school.id || school.title || index}
              href={school.href || '#'} 
              className="no-underline block h-full"
              onClick={(e) => {
                // Ensure the navigation happens
                e.stopPropagation();
              }}
            >
              <motion.div
                id={school.id}
                initial={mounted ? { opacity: 0, y: 50, scale: 0.8 } : false}
                whileInView={mounted ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                transition={mounted ? { duration: 0.8, delay: index * 0.2 } : { duration: 0 }}
                viewport={{ once: true }}
                whileHover={mounted ? { 
                  scale: 1.05, 
                  y: -10,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                } : {}}
                className="group relative overflow-hidden h-full"
              >
                <div className={`bg-gradient-to-r ${school.color} hover:${school.hoverColor} rounded-3xl p-8 text-white transition-all duration-500 shadow-xl hover:shadow-2xl relative overflow-hidden`}>
                  {/* Enhanced Background Pattern */}
                  <motion.div 
                    className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"
                    animate={mounted ? { 
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360]
                    } : {}}
                    transition={mounted ? { 
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    } : { duration: 0 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"
                    animate={mounted ? { 
                      scale: [1, 1.3, 1],
                      rotate: [0, -180, -360]
                    } : {}}
                    transition={mounted ? { 
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    } : { duration: 0 }}
                  />
                  
                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                    {/* Left side - Icon and Title */}
                    <div className="flex items-center space-x-4 md:flex-shrink-0">
                      <motion.div 
                        className="w-20 h-20 bg-card/20 rounded-2xl flex items-center justify-center shadow-lg"
                        whileHover={mounted ? { 
                          scale: 1.2, 
                          rotate: 360,
                          boxShadow: "0 10px 30px rgba(255,255,255,0.3)"
                        } : {}}
                        transition={mounted ? { duration: 0.5 } : { duration: 0 }}
                      >
                        <motion.div 
                          className="text-4xl"
                          animate={mounted ? { 
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0]
                          } : {}}
                          transition={mounted ? { 
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5
                          } : { duration: 0 }}
                        >
                          {school.emoji}
                        </motion.div>
                      </motion.div>
                      <div>
                        <motion.h3 
                          className="text-2xl font-bold mb-2 text-white"
                          whileHover={mounted ? { scale: 1.05 } : {}}
                          transition={mounted ? { duration: 0.2 } : { duration: 0 }}
                        >
                          {school.title}
                        </motion.h3>
                        <motion.span 
                          className="text-primary-foreground/80 text-sm font-medium bg-primary/20 px-3 py-1 rounded-full"
                          whileHover={mounted ? { scale: 1.1 } : {}}
                          transition={mounted ? { duration: 0.2 } : { duration: 0 }}
                        >
                          {school.subtitle}
                        </motion.span>
                      </div>
                    </div>
                    
                    {/* Right side - Content */}
                    <div className="flex-1">
                      <p className="text-primary-foreground/90 mb-4 group-hover:text-primary-foreground transition-colors duration-300 leading-relaxed">
                        {school.description}
                      </p>
                      
                      <div className="mb-4">
                        <h4 className="text-primary-foreground font-semibold mb-2">What You'll Learn:</h4>
                        <p className="text-primary-foreground/90 text-sm leading-relaxed">
                          {school.whatYoullLearn}
                        </p>
                      </div>
                      
                      {/* CTA */}
                      <motion.div 
                        className="flex items-center justify-between"
                        whileHover={mounted ? { scale: 1.02 } : {}}
                        transition={mounted ? { duration: 0.2 } : { duration: 0 }}
                      >
                        <motion.span 
                          className="text-primary-foreground/90 font-medium"
                          animate={mounted ? { opacity: [0.9, 1, 0.9] } : {}}
                          transition={mounted ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
                        >
                          {school.cta}
                        </motion.span>
                        <motion.div
                          whileHover={mounted ? { x: 5, scale: 1.2 } : {}}
                          transition={mounted ? { duration: 0.2 } : { duration: 0 }}
                        >
                          <ArrowRight className="w-5 h-5 text-primary-foreground/80" />
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}