'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, MessageCircle, Users, ArrowRight, CheckCircle, Lock, Unlock, Sparkles, Clock, Star } from 'lucide-react'

const courses = [
  {
    id: 1,
    title: "Basic Sanskrit Grammar",
    titleDevanagari: "संस्कृत भाषा प्रज्ञा",
    subtitle: "Build a rock-solid foundation",
    description: "Master the fundamentals of Sanskrit grammar with structured lessons on Devanagari script, declensions, conjugations, and sentence formation.",
    icon: BookOpen,
    gradient: "from-blue-500 to-teal-600",
    bgGradient: "from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20",
    iconBg: "bg-gradient-to-br from-blue-500 to-teal-600",
    courseUrl: "/courses/sanskrit-basics",
    estimatedTime: "4-6 weeks",
    level: "Beginner",
    isUnlocked: false,
    order: 1
  },
  {
    id: 2,
    title: "Sanskrit Conversation Practice",
    titleDevanagari: "संस्कृत संभाषणम्",
    subtitle: "Daily phrases, greetings, introductions",
    description: "Develop conversational skills through guided practice sessions with common phrases, questions, and daily interactions.",
    icon: MessageCircle,
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    iconBg: "bg-gradient-to-br from-purple-500 to-pink-600",
    courseUrl: "/courses/sanskrit-conversation",
    estimatedTime: "6-8 weeks",
    level: "Intermediate",
    isUnlocked: false,
    order: 2
  },
  {
    id: 3,
    title: "Live Speaking Practice",
    titleDevanagari: "जीवन्त संस्कृतम्",
    subtitle: "Small groups + mentor feedback + recordings",
    description: "Advanced conversations and spiritual discourse with expert teachers in live interactive sessions.",
    icon: Users,
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    iconBg: "bg-gradient-to-br from-orange-500 to-red-600",
    courseUrl: "/courses/sanskrit-live-class",
    estimatedTime: "8-12 weeks",
    level: "Advanced",
    isUnlocked: false,
    order: 3
  }
]

interface SequentialPathProps {
  selectedLevel?: 'beginner' | 'intermediate' | null
}

export default function SequentialPath({ selectedLevel }: SequentialPathProps) {
  const [coursesState, setCoursesState] = useState(courses)
  const [showUnlockAnimation, setShowUnlockAnimation] = useState<number | null>(null)
  
  // Unlock courses based on selected level
  useEffect(() => {
    if (selectedLevel) {
      setCoursesState(prev => prev.map((course, index) => {
        const shouldUnlock = 
          (selectedLevel === 'beginner' && index === 0) ||
          (selectedLevel === 'intermediate' && index <= 1)
        
        if (shouldUnlock && !course.isUnlocked) {
          setTimeout(() => {
            setShowUnlockAnimation(course.id)
            setTimeout(() => setShowUnlockAnimation(null), 2000)
          }, index * 300)
        }
        
        return { ...course, isUnlocked: shouldUnlock || course.isUnlocked }
      }))
    }
  }, [selectedLevel])

  return (
    <section className="section-padding bg-gradient-to-b from-parchment-ivory to-white dark:from-wisdom-900 dark:to-deep-indigo-500 relative overflow-hidden">
      {/* Unlock Animation Overlay */}
      <AnimatePresence>
        {showUnlockAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-12 py-8 rounded-3xl shadow-2xl"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: 2, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <Unlock className="w-full h-full" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-2">Course Unlocked!</h3>
                <p className="text-lg">You can now access this course</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display text-dark-text mb-4">
            Recommended Learning Path
          </h2>
          <p className="text-body text-muted-gray max-w-2xl mx-auto">
            {selectedLevel 
              ? `Perfect for ${selectedLevel === 'beginner' ? 'beginners' : 'intermediate learners'}! Follow this structured path to master Sanskrit.`
              : 'Choose your level above to unlock your personalized learning path.'}
          </p>
        </motion.div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {coursesState.map((course, index) => {
            const CardContent = (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={course.isUnlocked ? { y: -10, scale: 1.02 } : {}}
                className="relative group h-full"
              >
                <div className={`relative bg-white dark:bg-wisdom-800 rounded-3xl shadow-xl overflow-hidden h-full flex flex-col transition-all duration-500 ${
                  course.isUnlocked ? 'hover:shadow-2xl cursor-pointer' : 'opacity-70'
                }`}>
                  
                  {/* Lock Overlay */}
                  {!course.isUnlocked && (
                    <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm z-20 flex items-center justify-center rounded-3xl">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-white/95 dark:bg-wisdom-800/95 rounded-2xl p-8 text-center shadow-2xl max-w-xs"
                      >
                        <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-2 text-lg">Locked</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {index === 0 
                            ? 'Select "Beginner" above to unlock'
                            : 'Select "Intermediate" above to unlock'}
                        </p>
                      </motion.div>
                    </div>
                  )}

                  {/* Course Number Badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
                    viewport={{ once: true }}
                    className={`absolute -top-4 -right-4 w-12 h-12 ${course.iconBg} rounded-full flex items-center justify-center shadow-lg z-10`}
                  >
                    <span className="text-white font-bold text-lg">{course.order}</span>
                  </motion.div>

                  {/* Gradient Header with Icon */}
                  <div className={`relative bg-gradient-to-br ${course.bgGradient} p-8 border-b-4 border-gradient-to-r ${course.gradient}`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className={`w-full h-full bg-gradient-to-br ${course.gradient}`} />
                    </div>
                    
                    {/* Icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -90 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      whileHover={course.isUnlocked ? { scale: 1.1, rotate: 5 } : {}}
                      className={`w-20 h-20 ${course.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg relative z-10`}
                    >
                      <course.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    
                    {/* Level Badge */}
                    <div className="text-center relative z-10">
                      <span className={`inline-block px-4 py-1 rounded-full text-xs font-semibold ${
                        course.level === 'Beginner' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : course.level === 'Intermediate'
                            ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col relative z-10">
                    <h3 className="text-2xl font-bold text-dark-text dark:text-soft-gold-500 mb-2">
                      {course.title}
                    </h3>
                    
                    <div className="text-lg font-devanagari text-golden-olive dark:text-golden-olive/80 mb-3">
                      {course.titleDevanagari}
                    </div>
                    
                    <p className="text-sm text-deep-maroon dark:text-copper-orange font-semibold mb-3">
                      {course.subtitle}
                    </p>
                    
                    <p className="text-muted-gray dark:text-wisdom-400 mb-4 leading-relaxed flex-1">
                      {course.description}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center justify-center mb-4 p-3 bg-gray-50 dark:bg-wisdom-700 rounded-xl">
                      <Clock className="w-4 h-4 text-golden-olive mr-2" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {course.estimatedTime}
                      </span>
                    </div>
                    
                    {/* CTA Button */}
                    {course.isUnlocked && (
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-full bg-gradient-to-r ${course.gradient} text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2`}
                      >
                        <span>Start Course</span>
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>

                  {/* Decorative Corner */}
                  <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br ${course.gradient} opacity-10 rounded-full blur-2xl`} />
                </div>
              </motion.div>
            )

            // Wrap unlocked courses with Link
            if (course.isUnlocked) {
              return (
                <Link key={course.id} href={course.courseUrl}>
                  {CardContent}
                </Link>
              )
            }

            // Return locked courses without link
            return <div key={course.id}>{CardContent}</div>
          })}
        </div>

        {/* Progress Message */}
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-gradient-to-r from-golden-olive/10 to-deep-maroon/10 rounded-2xl px-8 py-4 border-2 border-golden-olive/20">
              <div className="flex items-center justify-center space-x-3">
                <Sparkles className="w-5 h-5 text-golden-olive" />
                <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                  {selectedLevel === 'beginner' 
                    ? '🎯 Start with Basic Grammar to build your foundation' 
                    : '🚀 Continue to Conversation Practice to enhance your skills'}
                </p>
                <Sparkles className="w-5 h-5 text-golden-olive" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Connecting Visual Flow (Desktop Only) */}
        <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl pointer-events-none">
          <svg className="w-full h-24 opacity-20" viewBox="0 0 1000 100">
            <motion.path
              d="M 100 50 Q 250 20, 400 50 T 700 50 Q 850 80, 1000 50"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-golden-olive"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
              viewport={{ once: true }}
            />
            {[200, 500, 800].map((x, i) => (
              <motion.circle
                key={i}
                cx={x}
                cy="50"
                r="8"
                fill="currentColor"
                className="text-deep-maroon"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
                viewport={{ once: true }}
              />
            ))}
          </svg>
        </div>

        {/* No Selection Message */}
        {!selectedLevel && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-saffron-100 to-deep-teal-100 dark:from-saffron-900/30 dark:to-deep-teal-900/30 rounded-2xl p-8 max-w-2xl mx-auto border-2 border-saffron-200 dark:border-saffron-800">
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-dark-text dark:text-soft-gold-500 mb-3">
                Select Your Level to Begin
              </h3>
              <p className="text-muted-gray dark:text-wisdom-400 mb-6">
                Choose Beginner or Intermediate in the hero section above to unlock your personalized course path.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="bg-gradient-to-r from-golden-olive to-deep-maroon text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center space-x-2"
              >
                <span>Go to Selection</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
