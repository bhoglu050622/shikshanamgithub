'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Lightbulb, Heart, ArrowRight, Users, Star, Clock, Sparkles, BookMarked, Brain, Zap } from 'lucide-react'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'

// Background pattern components for each school
const SanskritPattern = () => (
  <div className="absolute inset-0 opacity-5">
    <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
      <defs>
        <pattern id="sanskrit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="2" fill="currentColor" opacity="0.3"/>
          <path d="M20,20 Q50,10 80,20 Q50,30 20,20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
          <path d="M20,80 Q50,90 80,80 Q50,70 20,80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sanskrit-pattern)"/>
    </svg>
  </div>
)

const DarshanaPattern = () => (
  <div className="absolute inset-0 opacity-5">
    <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
      <defs>
        <pattern id="darshana-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
          <circle cx="40" cy="40" r="8" fill="currentColor" opacity="0.1"/>
          <path d="M20,40 L60,40 M40,20 L40,60" stroke="currentColor" strokeWidth="0.3" opacity="0.15"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#darshana-pattern)"/>
    </svg>
  </div>
)

const LifeSkillsPattern = () => (
  <div className="absolute inset-0 opacity-5">
    <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0">
      <defs>
        <pattern id="lifeskills-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M30,10 L50,30 L30,50 L10,30 Z" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2"/>
          <circle cx="30" cy="30" r="3" fill="currentColor" opacity="0.1"/>
          <path d="M15,15 L45,45 M45,15 L15,45" stroke="currentColor" strokeWidth="0.3" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#lifeskills-pattern)"/>
    </svg>
  </div>
)

// Enhanced schools data with modern color palette and styling
const defaultSchools = [
  {
    id: 'school-of-sanskrit',
    title: 'Sanskrit School',
    subtitle: 'Learning Path',
    description: 'Master the language of the gods and ancient scriptures',
    icon: BookMarked,
    emoji: '📚',
    color: 'sanskrit',
    gradient: 'from-emerald-50/80 via-green-50/60 to-lime-50/50',
    hoverGradient: 'from-emerald-100/80 via-green-100/60 to-lime-100/50',
    borderColor: 'border-emerald-700/40',
    hoverBorderColor: 'border-emerald-700/50',
    iconBg: 'bg-gradient-to-br from-emerald-700 to-green-800',
    iconColor: 'text-white',
    titleColor: 'text-emerald-900',
    subtitleColor: 'text-emerald-700',
    descriptionColor: 'text-emerald-800',
    accentColor: 'from-emerald-700 to-green-800',
    href: '/schools/sanskrit',
    whatYoullLearn: 'Grammar, Communication, Shloka-Path, Live Q&A',
    features: [
      'Grammar & Literature',
      'Vedic Texts',
      'Classical Poetry',
      'Scripture Study'
    ],
    cta: 'Join School',
    stats: { students: 2500, courses: 12, rating: 4.9 }
  },
  {
    id: 'school-of-darshan',
    title: 'Darshana School',
    subtitle: 'Learning Path',
    description: 'Study the six classical schools of Indian philosophy',
    icon: Brain,
    emoji: '📚',
    color: 'darshana',
    gradient: 'from-rose-100/60 via-red-50/50 to-orange-50/40',
    hoverGradient: 'from-rose-100/70 via-red-50/60 to-orange-50/50',
    borderColor: 'border-rose-800/40',
    hoverBorderColor: 'border-rose-800/50',
    iconBg: 'bg-gradient-to-br from-rose-800 to-red-900',
    iconColor: 'text-white',
    titleColor: 'text-rose-900',
    subtitleColor: 'text-rose-700',
    descriptionColor: 'text-rose-800',
    accentColor: 'from-rose-800 to-red-900',
    href: '/schools/darshana',
    whatYoullLearn: 'Nyaya and Vaisheshika, Samkhya and Yoga, Mimamsa and Vedanta',
    features: [
      'Vedanta',
      'Yoga Philosophy',
      'Nyaya & Vaisheshika',
      'Samkhya & Mimamsa'
    ],
    cta: 'Join School',
    stats: { students: 1800, courses: 8, rating: 4.8 }
  },
  {
    id: 'school-of-life-skills',
    title: 'Self-Help School',
    subtitle: 'Learning Path',
    description: 'Apply ancient wisdom to modern life challenges',
    icon: Zap,
    emoji: '📚',
    color: 'life-skills',
    gradient: 'from-teal-50/70 via-cyan-50/50 to-blue-50/40',
    hoverGradient: 'from-teal-100/70 via-cyan-100/50 to-blue-100/40',
    borderColor: 'border-teal-700/40',
    hoverBorderColor: 'border-teal-700/50',
    iconBg: 'bg-gradient-to-br from-teal-700 to-cyan-800',
    iconColor: 'text-white',
    titleColor: 'text-teal-900',
    subtitleColor: 'text-teal-700',
    descriptionColor: 'text-teal-800',
    accentColor: 'from-teal-700 to-cyan-800',
    href: '/schools/self-help',
    whatYoullLearn: 'Entrepreneurship, Emotional Intelligence, Stress-Management, Purpose and Meaning',
    features: [
      'Life Management',
      'Relationship Wisdom',
      'Stress & Anxiety',
      'Purpose & Meaning'
    ],
    cta: 'Join School',
    stats: { students: 3200, courses: 15, rating: 4.9 }
  }
]

export default function Schools() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const mounted = useHydrationSafeAnimation()
  
  // CMS data state
  const [schoolsData, setSchoolsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  // Use mock data since CMS functionality is removed
  useEffect(() => {
    const fetchSchoolsData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Mock schools data
        setSchoolsData({
          title: "Choose Your School!",
          subtitle: "Explore Ancient Traditions",
          schools: [
            {
              id: "sanskrit",
              name: "Sanskrit School",
              description: "Master the language of the gods and ancient scriptures",
              whatYoullLearn: "Grammar, Communication, Shloka-Path, Live Q&A",
              courses: 12,
              students: 2500,
              image: "/assets/schools/sanskrit.jpg"
            },
            {
              id: "darshana",
              name: "Darshana School",
              description: "Study the six classical schools of Indian philosophy",
              whatYoullLearn: "Nyaya and Vaisheshika, Samkhya and Yoga, Mimamsa and Vedanta",
              courses: 8,
              students: 1800,
              image: "/assets/schools/darshana.jpg"
            },
            {
              id: "self-help",
              name: "Self-Help School",
              description: "Apply ancient wisdom to modern life challenges",
              whatYoullLearn: "Entrepreneurship, Emotional Intelligence, Stress-Management, Purpose and Meaning",
              courses: 15,
              students: 3200,
              image: "/assets/schools/self-help.jpg"
            }
          ]
        })
      } catch (error) {
        console.error('Failed to load schools data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchSchoolsData()
  }, [])
  
  // Transform CMS data to match component expectations
  const transformSchoolData = (school: any) => {
    // Get the corresponding default school for styling
    const defaultSchool = defaultSchools.find(ds => 
      ds.id === school.id || 
      ds.title === school.name || 
      ds.title === school.title
    ) || defaultSchools[0]

    return {
      id: school.id || school.name?.toLowerCase().replace(/\s+/g, '-'),
      title: school.name || school.title || 'School',
      subtitle: school.subtitle || school.tagline || 'Learning Path',
      description: school.description || 'Discover ancient wisdom',
      icon: school.icon || defaultSchool.icon,
      emoji: school.emoji || '📚',
      color: school.color || 'primary',
      hoverColor: school.color || 'primary',
      href: school.link || school.href || '#',
      whatYoullLearn: school.whatYoullLearn || school.curriculum || defaultSchool.whatYoullLearn,
      features: school.features || school.topics || ['Core Concepts', 'Practical Applications'],
      cta: school.cta || school.buttonText || 'Join School',
      // Add styling properties from default school
      gradient: defaultSchool.gradient,
      hoverGradient: defaultSchool.hoverGradient,
      borderColor: defaultSchool.borderColor,
      hoverBorderColor: defaultSchool.hoverBorderColor,
      iconBg: defaultSchool.iconBg,
      iconColor: defaultSchool.iconColor,
      titleColor: defaultSchool.titleColor,
      subtitleColor: defaultSchool.subtitleColor,
      descriptionColor: defaultSchool.descriptionColor,
      accentColor: defaultSchool.accentColor,
      stats: defaultSchool.stats
    }
  }

  // Use CMS data or fallback to default
  const schools = schoolsData?.schools || defaultSchools
  const sectionTitle = schoolsData?.title || "Choose Your School!"
  const sectionSubtitle = schoolsData?.subtitle || "Discover the ancient wisdom through our structured learning paths"
  const sectionDescription = schoolsData?.description || "From Language to Philosophy to Life, Begin your Quest!"

  // Ensure schools is always an array and transform data
  const safeSchools = Array.isArray(schools) 
    ? schools.map(transformSchoolData)
    : defaultSchools

  // Show loading state
  if (loading) {
    return (
      <section id="schools" className="py-6 sm:py-8 md:py-12 bg-gradient-to-br from-teal-50 via-emerald-50 via-purple-50 to-orange-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12">
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
    <section id="schools" className="py-20 sm:py-24 md:py-28 relative overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50/30 to-orange-50/20 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Traditional Background with Subtle Patterns */}
      <div className="absolute inset-0 -z-10">
        {/* Classical geometric pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2378350f' fill-opacity='1'%3E%3Cpath d='M0 0h80v80H0V0zm20 20v40h40V20H20zm5 5h30v30H25V25z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }} />
        
        {/* Subtle floating ornamental elements */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 opacity-[0.05] blur-2xl"
          style={{
            background: 'radial-gradient(circle, #92400e 0%, transparent 70%)'
          }}
          animate={mounted ? { 
            y: [0, -15, 0],
            x: [0, 8, 0],
            scale: [1, 1.05, 1]
          } : {}}
          transition={mounted ? { 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut" 
          } : { duration: 0 }}
        />
        <motion.div
          className="absolute top-40 right-20 w-20 h-20 opacity-[0.05] blur-2xl"
          style={{
            background: 'radial-gradient(circle, #78350f 0%, transparent 70%)'
          }}
          animate={mounted ? { 
            y: [0, 12, 0],
            x: [0, -6, 0],
            scale: [1, 0.95, 1]
          } : {}}
          transition={mounted ? { 
            duration: 9, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          } : { duration: 0 }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-16 h-16 opacity-[0.05] blur-2xl"
          style={{
            background: 'radial-gradient(circle, #b45309 0%, transparent 70%)'
          }}
          animate={mounted ? { 
            y: [0, -10, 0],
            x: [0, 5, 0],
            scale: [1, 1.08, 1]
          } : {}}
          transition={mounted ? { 
            duration: 11, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2
          } : { duration: 0 }}
        />
      </div>

      <div className="container-custom">
        {/* Enhanced Section Header */}
        <motion.div
          ref={ref}
          initial={mounted ? { opacity: 0, y: 60, scale: 0.9 } : false}
          animate={mounted && isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
          transition={mounted ? { duration: 1, delay: 0.2, ease: "easeOut" } : { duration: 0 }}
          className="text-center mb-20 sm:mb-24"
        >
          <motion.div
            initial={mounted ? { opacity: 0, scale: 0.8 } : false}
            animate={mounted && isInView ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={mounted ? { duration: 0.8, delay: 0.4 } : { duration: 0 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-amber-100/70 dark:from-amber-900/40 dark:to-yellow-900/40 border-2 border-amber-700/30 dark:border-amber-700/40 mb-10 shadow-lg backdrop-blur-sm"
          >
            <Sparkles className="w-5 h-5 text-amber-800 dark:text-amber-400" />
            <span className="text-sm font-serif font-semibold text-amber-900 dark:text-amber-300 tracking-wider uppercase">Schools of Wisdom</span>
          </motion.div>
          
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-amber-900 dark:text-gray-50 mb-8 tracking-tight leading-tight"
            initial={mounted ? { opacity: 0, y: 40 } : false}
            animate={mounted && isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 1, delay: 0.5 } : { duration: 0 }}
          >
            {sectionTitle}
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-amber-800 dark:text-gray-100 max-w-5xl mx-auto font-normal leading-relaxed"
            initial={mounted ? { opacity: 0, y: 30 } : false}
            animate={mounted && isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.8, delay: 0.7 } : { duration: 0 }}
          >
            From Language to Philosophy to Life, Begin your Quest!
          </motion.p>
        </motion.div>

        {/* Enhanced Schools Grid */}
        <div className="grid gap-12 max-w-6xl mx-auto">
          {safeSchools.map((school, index) => {
            // Get the appropriate background pattern component
            const BackgroundPattern = school.id === 'school-of-sanskrit' ? SanskritPattern :
                                    school.id === 'school-of-darshan' ? DarshanaPattern :
                                    LifeSkillsPattern;

            return (
              <div 
                key={school.id || school.title || index}
                className="block h-full group cursor-pointer"
                onClick={() => {
                  // Navigate to school page when card is clicked
                  window.location.href = school.href || '#';
                }}
              >
                <motion.div
                  id={school.id}
                  initial={mounted ? { opacity: 0, y: 80, scale: 0.9 } : false}
                  whileInView={mounted ? { opacity: 1, y: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 }}
                  transition={mounted ? { 
                    duration: 1, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  } : { duration: 0 }}
                  viewport={{ once: true }}
                  whileHover={mounted ? { 
                    scale: 1.02, 
                    y: -12,
                    transition: { duration: 0.4, ease: "easeOut" }
                  } : {}}
                  className="relative overflow-hidden h-full"
                >
                  {/* Card Container with Traditional Styling */}
                  <div className={`relative rounded-2xl shadow-xl border-2 ${school.borderColor} p-10 transition-all duration-500 group-hover:shadow-2xl bg-gradient-to-br ${school.gradient} dark:from-slate-800/80 dark:via-slate-700/60 dark:to-slate-900/80 group-hover:${school.hoverBorderColor}`}>
                    
                    {/* Background Pattern */}
                    <BackgroundPattern />
                    
                    {/* Traditional Corner Ornaments */}
                    <div className={`absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 ${school.borderColor} rounded-tl-2xl`} />
                    <div className={`absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 ${school.borderColor} rounded-tr-2xl`} />
                    <div className={`absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 ${school.borderColor} rounded-bl-2xl`} />
                    <div className={`absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 ${school.borderColor} rounded-br-2xl`} />
                    
                    {/* Traditional accent bar */}
                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${school.accentColor} opacity-60`} />

                    <div className="relative z-10">
                      {/* Header Section with Enhanced Icon */}
                      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 mb-8">
                        {/* Prominent Icon and Title */}
                        <div className="flex items-center gap-6">
                          <motion.div 
                            className={`w-20 h-20 rounded-xl flex items-center justify-center shadow-lg ${school.iconBg} group-hover:scale-105 transition-all duration-500 relative overflow-hidden border-2 border-white/30`}
                            whileHover={mounted ? { rotate: 3, scale: 1.05 } : {}}
                          >
                            <school.icon className={`w-10 h-10 ${school.iconColor} relative z-10`} />
                          </motion.div>
                          <div>
                            <h3 className={`text-3xl font-serif font-bold mb-3 ${school.titleColor} dark:text-gray-50`}>
                              {school.title}
                            </h3>
                            <span className={`text-sm font-serif font-medium px-5 py-2 rounded-lg bg-white/30 backdrop-blur-sm ${school.subtitleColor} dark:text-white border-2 ${school.borderColor}`}>
                              {school.subtitle}
                            </span>
                          </div>
                        </div>

                        {/* Enhanced Stats */}
                        {school.stats && (
                          <div className="flex gap-6 ml-auto">
                            <div className="text-center">
                              <div className="flex items-center gap-2 mb-1">
                                <Users className="w-5 h-5 text-slate-500" />
                                <div className="text-2xl font-bold text-slate-700 dark:text-gray-100">{school.stats.students.toLocaleString()}</div>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-gray-300 font-medium">Students</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-2 mb-1">
                                <BookOpen className="w-5 h-5 text-slate-500" />
                                <div className="text-2xl font-bold text-slate-700 dark:text-gray-100">{school.stats.courses}</div>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-gray-300 font-medium">Courses</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-2 mb-1">
                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                <span className="text-2xl font-bold text-slate-700 dark:text-gray-100">{school.stats.rating}</span>
                              </div>
                              <div className="text-xs text-slate-500 dark:text-gray-300 font-medium">Rating</div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Enhanced Description */}
                      <motion.p 
                        className={`text-xl leading-relaxed font-normal mb-8 ${school.descriptionColor} dark:text-gray-200`}
                        initial={mounted ? { opacity: 0 } : false}
                        whileInView={mounted ? { opacity: 1 } : { opacity: 1 }}
                        transition={mounted ? { duration: 0.6, delay: 0.3 } : { duration: 0 }}
                      >
                        {school.description}
                      </motion.p>

                      {/* What You'll Learn Section */}
                      <div className="mb-8">
                        <h4 className={`font-serif font-bold text-xl mb-4 ${school.titleColor} dark:text-white flex items-center gap-2`}>
                          <Lightbulb className="w-5 h-5" />
                          What You'll Learn:
                        </h4>
                        <p className={`text-lg leading-relaxed font-normal ${school.descriptionColor} dark:text-gray-200`}>
                          {school.whatYoullLearn}
                        </p>
                      </div>

                      {/* Enhanced Features Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {(school.features || []).map((feature: string, featureIndex: number) => (
                          <motion.div
                            key={featureIndex}
                            initial={mounted ? { opacity: 0, scale: 0.8 } : false}
                            whileInView={mounted ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                            transition={mounted ? { 
                              duration: 0.5, 
                              delay: 0.4 + (featureIndex * 0.1) 
                            } : { duration: 0 }}
                            className={`px-4 py-3 rounded-lg text-sm font-serif font-medium text-center bg-white/40 backdrop-blur-sm border-2 ${school.borderColor} ${school.descriptionColor} dark:text-gray-200 hover:bg-white/50 transition-all duration-300`}
                          >
                            {feature}
                          </motion.div>
                        ))}
                      </div>

                      {/* Enhanced CTA Section */}
                      <motion.div 
                        className={`pt-8 border-t-2 ${school.borderColor} opacity-40`}
                      >
                        <motion.button
                          className={`w-full group relative overflow-hidden bg-gradient-to-r ${school.accentColor} hover:shadow-xl text-white font-serif font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-3`}
                          whileHover={mounted ? { 
                            scale: 1.01,
                            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.12)"
                          } : {}}
                          whileTap={mounted ? { scale: 0.99 } : {}}
                          transition={{ duration: 0.2 }}
                          onClick={() => {
                            // Handle join school action
                            console.log(`Joining ${school.title}`)
                          }}
                        >
                          {/* Button content */}
                          <span className="relative z-10 text-lg font-serif font-bold">
                            {school.cta}
                          </span>
                          
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    </div>

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}