'use client'

import { useState, useEffect } from 'react'
import { motion } from '@/components/motion/SimpleMotionWrapper'
import { useRouter } from 'next/navigation'
import { getAllQuizResults } from '@/lib/quiz-tracking'
import { getIntelligentRecommendations, EnhancedCourse, EnhancedPackage } from '@/lib/intelligent-course-matching'
import CourseRecommendationCard from './CourseRecommendationCard'
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  ArrowRight,
  Filter,
  Grid,
  List,
  ExternalLink,
  Package,
  TrendingUp,
  Award,
  Brain,
  Target,
  Lightbulb,
  ChevronDown
} from 'lucide-react'

interface RecommendedCoursesProps {
  isLoading?: boolean
}

export default function RecommendedCourses({ isLoading = false }: RecommendedCoursesProps) {
  const [recommendations, setRecommendations] = useState<{
    courses: EnhancedCourse[]
    packages: EnhancedPackage[]
  }>({ courses: [], packages: [] })
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [hasResults, setHasResults] = useState(false)
  const [expandedPackages, setExpandedPackages] = useState<Set<string>>(new Set())
  const router = useRouter()

  useEffect(() => {
    const quizResults = getAllQuizResults()
    setHasResults(!!(quizResults.gunaProfiler || quizResults.shivaAlignment))
    
    if (quizResults.gunaProfiler || quizResults.shivaAlignment) {
      const recs = getIntelligentRecommendations()
      setRecommendations(recs)
    }
  }, [])

  const handleCourseClick = (course: EnhancedCourse) => {
    router.push(course.link)
  }

  const handlePackageClick = (pkg: EnhancedPackage) => {
    router.push(pkg.ctaLink)
  }

  const filteredCourses = recommendations.courses.filter(course => {
    if (filter === 'all') {
      return course.priority === 'high' || course.priority === 'medium'
    }
    return course.priority === filter
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Language': return '📚'
      case 'Philosophy': return '🧘'
      case 'Scripture': return '📜'
      case 'Leadership': return '👑'
      default: return '📖'
    }
  }

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-lg p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 bg-muted rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!hasResults) {
    return (
      <div className="bg-card border border-border rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Personalized Recommendations</h3>
          <p className="text-muted-foreground mb-6">
            Complete your personality assessments to unlock personalized course recommendations.
          </p>
          <button
            onClick={() => router.push('/personality-test')}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Take Personality Tests
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Recommended Courses</h2>
            <p className="text-muted-foreground">Personalized based on your personality profile</p>
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                      <option value="all">All Recommendations</option>
                      <option value="high">Highly Recommended</option>
                      <option value="medium">Recommended</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      {recommendations.packages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
            <Package className="w-5 h-5 text-purple-500 mr-2" />
            Recommended Packages
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                        className="group bg-card border border-border rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-[1.02] hover:border-primary/20 cursor-pointer package-card"
                onClick={() => handlePackageClick(pkg)}
              >
                        {/* Header */}
                        <div className="relative p-6 pb-4">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Package className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getLevelColor(pkg.level)}`}>
                    {pkg.level}
                  </span>
                                  {pkg.matchScore && (
                                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                      {pkg.matchScore}% Match
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {pkg.matchScore !== undefined && (
                              <div className="relative w-16 h-16">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                                  <path
                                    className="text-gray-200 dark:text-gray-700"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeDasharray="100"
                                    strokeDashoffset="0"
                                  />
                                  <path
                                    className={`${pkg.matchScore >= 80 ? 'text-emerald-500' : pkg.matchScore >= 60 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000`}
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeDasharray={`${pkg.matchScore}, 100`}
                                    strokeDashoffset="0"
                                    strokeLinecap="round"
                                  />
                                  <text
                                    x="18"
                                    y="20.35"
                                    className={`text-xs font-bold ${pkg.matchScore >= 80 ? 'text-emerald-500' : pkg.matchScore >= 60 ? 'text-amber-500' : 'text-rose-500'}`}
                                    textAnchor="middle"
                                  >
                                    {pkg.matchScore}%
                                  </text>
                                </svg>
                              </div>
                            )}
                          </div>

                          <h4 className="text-xl font-bold text-foreground mb-3 line-clamp-2 leading-tight">{pkg.title}</h4>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">{pkg.description}</p>
                </div>
                
                        {/* Features */}
                        {pkg.features && pkg.features.length > 0 && (
                          <div className="px-6 pb-4">
                            <div className="flex flex-wrap gap-2">
                              {pkg.features.slice(0, 3).map((feature, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full border border-border/50"
                                >
                                  {feature}
                                </span>
                              ))}
                              {pkg.features.length > 3 && (
                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                                  +{pkg.features.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Package Details */}
                        <div className="px-6 pb-4 flex-grow">
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                            <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {pkg.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                                {pkg.features.length} features
                              </div>
                  </div>
                </div>
                
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex flex-col">
                              <span className="text-2xl font-bold text-primary">
                                {pkg.currentPrice}
                  </span>
                              <span className="text-xs text-muted-foreground">Complete package</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Award className="w-4 h-4 text-yellow-500" />
                              <span className="text-sm font-medium text-foreground">Premium</span>
                            </div>
                          </div>
                        </div>

                        {/* Why This Package Section */}
                        {pkg.reasoning && (
                          <div className="px-6 pb-4">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                const newExpanded = new Set(expandedPackages)
                                if (newExpanded.has(pkg.id)) {
                                  newExpanded.delete(pkg.id)
                                } else {
                                  newExpanded.add(pkg.id)
                                }
                                setExpandedPackages(newExpanded)
                              }}
                              className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 transition-all duration-300 border border-purple-200 dark:border-purple-800"
                            >
                              <div className="flex items-center">
                                <Brain className="w-4 h-4 text-purple-500 mr-2" />
                                <span className="text-sm font-semibold text-foreground">Why This Package?</span>
                              </div>
                              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedPackages.has(pkg.id) ? 'rotate-180' : ''}`} />
                            </button>
                            
                            {expandedPackages.has(pkg.id) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 p-4 bg-muted/50 rounded-lg border border-border/50"
                              >
                                <div className="space-y-4">
                                  {pkg.reasoning?.split('\n\n').map((section, index) => {
                                    const [title, content] = section.split(': ')
                                    return (
                                      <div key={index} className="space-y-2">
                                        <h4 className="font-semibold text-foreground text-sm">
                                          {title?.replace(/\*\*/g, '')}
                                        </h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                          {content}
                                        </p>
                                      </div>
                                    )
                                  })}
                                </div>
                                
                                {/* Additional Insights */}
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="flex items-center">
                                    <Target className="w-4 h-4 text-green-500 mr-2" />
                                    <span className="text-xs text-muted-foreground">Learning Goals</span>
                                  </div>
                                  <div className="flex items-center">
                                    <Lightbulb className="w-4 h-4 text-yellow-500 mr-2" />
                                    <span className="text-xs text-muted-foreground">Study Tips</span>
                                  </div>
                                  <div className="flex items-center">
                                    <TrendingUp className="w-4 h-4 text-blue-500 mr-2" />
                                    <span className="text-xs text-muted-foreground">Growth Path</span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        )}

                        {/* CTA */}
                        <div className="p-6 pt-0">
                          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                            <Package className="w-4 h-4" />
                            View Package Details
                            <ArrowRight className="w-4 h-4" />
                          </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Courses Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4 flex items-center">
          <BookOpen className="w-5 h-5 text-blue-500 mr-2" />
          Individual Courses
        </h3>
        
        {filteredCourses.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No courses found for the selected filter.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseRecommendationCard
                key={course.id}
                course={course}
                index={index}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* View All Courses CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl shadow-lg p-6 border border-blue-200"
      >
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
            <ExternalLink className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Explore All Courses
          </h3>
          <p className="text-muted-foreground mb-4">
            Discover our complete library of courses and find the perfect learning path for you.
          </p>
          <button
            onClick={() => router.push('/courses')}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Browse All Courses
          </button>
        </div>
      </motion.div>
    </div>
  )
}
