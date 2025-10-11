'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  ArrowRight,
  Play,
  Download,
  Sparkles,
  CheckCircle,
  IndianRupee,
  Calendar,
  Video,
  Headphones,
  FileText,
  ChevronDown,
  ChevronUp,
  Quote,
  UserCheck,
  Languages,
  Book,
  Award,
  Target,
  Brain,
  Heart,
  Crown,
  Globe,
  User,
  Lightbulb,
  Shield,
  PlayCircle,
  Timer,
  GraduationCap,
  Zap,
  TrendingUp
} from 'lucide-react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'
import Button from '@/components/ui/button'

interface CourseData {
  id: string
  title: string
  subtitle?: string
  description: string
  longDescription?: string
  type: string
  status: 'available' | 'upcoming'
  price: string
  originalPrice?: string
  duration: string
  level: string
  language: string
  instructor: string
  rating: number
  studentsCount: number
  lastUpdated: string
  features: string[]
  curriculum?: Array<{
    week: number
    title: string
    lessons: number
    duration: string
  }>
  requirements?: string[]
  whatYouWillLearn?: string[]
  instructorBio?: string
  image?: string
  videoPreview?: string
}

interface ModernCourseLayoutProps {
  course: CourseData
  onEnroll?: () => void
}

export default function ModernCourseLayout({ course, onEnroll }: ModernCourseLayoutProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: FileText },
    { id: 'instructor', label: 'Instructor', icon: User },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ]

  const courseStats = [
    { icon: Users, label: 'Students', value: course.studentsCount.toLocaleString() },
    { icon: Clock, label: 'Duration', value: course.duration },
    { icon: Languages, label: 'Language', value: course.language },
    { icon: Award, label: 'Level', value: course.level }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-orange-200/10 to-blue-200/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <HydrationSafeMotion
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                {/* Course Type Badge */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  <Crown className="w-4 h-4" />
                  {course.type}
                </div>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                  {course.title}
                </h1>

                {/* Subtitle */}
                {course.subtitle && (
                  <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {course.subtitle}
                  </p>
                )}

                {/* Description */}
                <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
                  {course.description}
                </p>

                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
                  {courseStats.map((stat, index) => (
                    <HydrationSafeMotion
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <stat.icon className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
                      <div className="font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    </HydrationSafeMotion>
                  ))}
                </div>

                {/* Rating & Students */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">{course.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400">({course.studentsCount} students)</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    onClick={onEnroll}
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Enroll Now - {course.price}
                  </Button>
                  
                  {course.videoPreview && (
                    <Button
                      variant="outline"
                      onClick={() => setIsVideoPlaying(true)}
                      className="border-2 border-gray-300 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 py-4 px-8 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Play className="w-5 h-5" />
                      Preview Course
                    </Button>
                  )}
                </div>
              </div>
            </HydrationSafeMotion>

            {/* Right Column - Visual */}
            <HydrationSafeMotion
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Course Image/Video */}
                <div className="relative bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-8 shadow-2xl">
                  {course.image ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover"
                      />
                      {course.videoPreview && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={() => setIsVideoPlaying(true)}
                            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 hover:scale-110"
                          >
                            <Play className="w-8 h-8 text-white ml-1" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-white/70" />
                    </div>
                  )}
                </div>

                {/* Floating Elements */}
                <HydrationSafeMotion
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Trending</span>
                  </div>
                </HydrationSafeMotion>

                <HydrationSafeMotion
                  animate={{ 
                    y: [0, 10, 0],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Fast Track</span>
                  </div>
                </HydrationSafeMotion>
              </div>
            </HydrationSafeMotion>
          </div>
        </div>
      </section>

      {/* Enhanced Course Content */}
      <section className="py-16 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          {/* Tab Navigation */}
          <HydrationSafeMotion
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-100 dark:bg-slate-800 rounded-2xl max-w-2xl mx-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300
                    ${activeTab === tab.id 
                      ? 'bg-white dark:bg-slate-700 text-orange-600 shadow-md' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }
                  `}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </HydrationSafeMotion>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* What You'll Learn */}
                  {course.whatYouWillLearn && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <Target className="w-6 h-6 text-blue-600" />
                        What You'll Learn
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Course Features */}
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 border border-orange-200 dark:border-orange-800">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <Sparkles className="w-6 h-6 text-orange-600" />
                      Course Features
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700">
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900 dark:text-white">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Requirements */}
                  {course.requirements && (
                    <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <Shield className="w-6 h-6 text-gray-600" />
                        Requirements
                      </h3>
                      <ul className="space-y-3">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'curriculum' && course.curriculum && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Course Curriculum</h3>
                  {course.curriculum.map((week, index) => (
                    <div key={week.week} className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold">
                            {week.week}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{week.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <FileText className="w-4 h-4" />
                                {week.lessons} lessons
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {week.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                  <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{course.instructor}</h3>
                    <p className="text-gray-600 dark:text-gray-400">Course Instructor</p>
                  </div>
                  {course.instructorBio && (
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
                      {course.instructorBio}
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="text-center py-12">
                  <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Student Reviews</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Join {course.studentsCount.toLocaleString()} students who have rated this course {course.rating}/5 stars
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-8 h-8 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-2xl font-bold text-gray-900 dark:text-white ml-2">{course.rating}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoPlaying && course.videoPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsVideoPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full aspect-video bg-black rounded-xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <video
                src={course.videoPreview}
                controls
                autoPlay
                className="w-full h-full"
              />
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
