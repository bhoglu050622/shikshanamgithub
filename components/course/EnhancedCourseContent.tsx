'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen,
  FileText,
  User,
  Star,
  Target,
  CheckCircle,
  Sparkles,
  Shield,
  Clock,
  Award,
  Play,
  Download,
  Users,
  Calendar,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import HydrationSafeMotion from '@/components/motion/HydrationSafeMotion'

interface CourseModule {
  week?: number
  title: string
  lessons: number
  duration: string
  description?: string
}

interface EnhancedCourseContentProps {
  whatYouWillLearn?: string[]
  features: string[]
  requirements?: string[]
  curriculum?: CourseModule[]
  instructor: string
  instructorBio?: string
  rating: number
  studentsCount: number
  longDescription?: string
}

export default function EnhancedCourseContent({
  whatYouWillLearn,
  features,
  requirements,
  curriculum,
  instructor,
  instructorBio,
  rating,
  studentsCount,
  longDescription
}: EnhancedCourseContentProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedModule, setExpandedModule] = useState<number | null>(null)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'curriculum', label: 'Curriculum', icon: FileText },
    { id: 'instructor', label: 'Instructor', icon: User },
    { id: 'reviews', label: 'Reviews', icon: Star }
  ]

  return (
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
                  flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105
                  ${activeTab === tab.id 
                    ? 'bg-white dark:bg-slate-700 text-orange-600 shadow-md transform scale-105' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700/50'
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
                {/* Long Description */}
                {longDescription && (
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 border border-gray-200 dark:border-gray-600">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-gray-600" />
                      About This Course
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {longDescription}
                    </p>
                  </div>
                )}

                {/* What You'll Learn */}
                {whatYouWillLearn && whatYouWillLearn.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <Target className="w-6 h-6 text-blue-600" />
                      What You'll Learn
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {whatYouWillLearn.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors duration-300"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300 font-medium">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Course Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-8 border border-orange-200 dark:border-orange-800"
                >
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-orange-600" />
                    Course Features
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-300 hover:scale-105"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Requirements */}
                {requirements && requirements.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                      <Shield className="w-6 h-6 text-gray-600" />
                      Requirements
                    </h3>
                    <ul className="space-y-3">
                      {requirements.map((req, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-white dark:bg-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors duration-300"
                        >
                          <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300">{req}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            )}

            {activeTab === 'curriculum' && curriculum && curriculum.length > 0 && (
              <div className="space-y-6">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center"
                >
                  Course Curriculum
                </motion.h3>
                
                <div className="space-y-4">
                  {curriculum.map((module, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div 
                        className="p-6 cursor-pointer"
                        onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                              {module.week || index + 1}
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{module.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className="flex items-center gap-1">
                                  <FileText className="w-4 h-4" />
                                  {module.lessons} lessons
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {module.duration}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {expandedModule === index ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        
                        <AnimatePresence>
                          {expandedModule === index && module.description && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
                            >
                              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {module.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'instructor' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg"
                  >
                    <User className="w-12 h-12 text-white" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    {instructor}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-gray-600 dark:text-gray-400 font-medium"
                  >
                    Course Instructor
                  </motion.p>
                </div>
                
                {instructorBio && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-gray-50 dark:bg-slate-700 rounded-xl p-6"
                  >
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
                      {instructorBio}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                </motion.div>
                
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-2xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Student Reviews
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-600 dark:text-gray-400 mb-8"
                >
                  Join {studentsCount.toLocaleString()} students who have rated this course {rating}/5 stars
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center justify-center gap-2 mb-8"
                >
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    >
                      <Star 
                        className={`w-8 h-8 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    </motion.div>
                  ))}
                  <span className="text-2xl font-bold text-gray-900 dark:text-white ml-2">{rating}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 border border-yellow-200 dark:border-yellow-800 max-w-md mx-auto"
                >
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <Users className="w-6 h-6 text-orange-600" />
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {studentsCount.toLocaleString()} Happy Students
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Join thousands of satisfied learners who have transformed their knowledge with this course.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
