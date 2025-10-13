'use client'

import { useState } from 'react'
import {
  BookOpen,
  Users,
  Star,
  ArrowRight,
  Sparkles,
  Brain,
  Award,
  Zap,
  Search,
  Package,
  CheckCircle,
  Heart,
  Clock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import type { CourseCategory, Course } from '@/lib/courses/types'

interface CoursesClientProps {
  categories: CourseCategory[]
  courseCount: number
}

export default function CoursesClient({ categories, courseCount }: CoursesClientProps) {
  const [searchQuery, setSearchQuery] = useState('')

  // Flatten all courses from categories
  const allCourses = categories.flatMap(cat => cat.courses)

  // Filter courses based on search
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  // Stats for the page
  const stats = [
    { number: `${courseCount}`, label: 'Courses Available', icon: BookOpen },
    { number: '10,000+', label: 'Active Students', icon: Users },
    { number: '4.8★', label: 'Average Rating', icon: Star }
  ]

  return (
    <div className="min-h-screen bg-parchment-ivory">
      {/* Hero Header Section */}
      <div className="bg-gradient-to-br from-saffron-50 to-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                Explore Our Courses
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Master Sanskrit, Philosophy, and Ancient Wisdom with expert-led courses designed for modern seekers
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 lg:gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-3 text-medium-contrast">
                  <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-slate-800">{stat.number}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative max-w-2xl mx-auto mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <Input
            placeholder="Search courses by name or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 text-lg border-slate-300 focus:border-saffron-400 focus:ring-saffron-400 rounded-xl"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.slug} course={course} index={index} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <div className="text-slate-500">
              <p className="text-lg font-semibold mb-2">No courses found</p>
              <p className="text-sm">Try adjusting your search terms</p>
            </div>
          </div>
        )}
      </div>

      {/* Bundle Promotion Section */}
      <section className="bg-gradient-to-br from-saffron-50 via-amber-50 to-orange-50 relative overflow-hidden py-20">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-saffron-300 to-orange-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-amber-300 to-saffron-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Savings Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
              <Sparkles className="w-5 h-5" />
              <span>SAVE UP TO 70% WITH BUNDLES</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-saffron-700 via-orange-600 to-amber-700 bg-clip-text text-transparent mb-6 leading-tight">
              Why Learn One When You Can Master Many?
            </h2>
            
            <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
              Unlock your full potential with our exclusive course bundles. Get multiple courses at a 
              <span className="font-bold text-saffron-700"> fraction of the price</span> and embark on a 
              comprehensive learning journey that transforms your understanding of ancient wisdom.
            </p>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-4 gap-6 mb-10">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-saffron-100">
                <div className="w-14 h-14 bg-gradient-to-br from-saffron-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Multiple Courses</h3>
                <p className="text-sm text-gray-600">2 to 7 courses combined in one comprehensive package</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-saffron-100">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Massive Savings</h3>
                <p className="text-sm text-gray-600">Save ₹5,000 to ₹12,000 on bundle purchases</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-saffron-100">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Complete Mastery</h3>
                <p className="text-sm text-gray-600">150+ to 200+ classes for comprehensive learning</p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-saffron-100">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Master Certificate</h3>
                <p className="text-sm text-gray-600">Earn prestigious certificates upon completion</p>
              </div>
            </div>

            {/* Pricing Examples */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-10 shadow-xl border-2 border-saffron-200">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-sm text-gray-500 mb-2">Individual Courses</div>
                  <div className="text-3xl font-bold text-gray-400 line-through mb-1">₹29,999</div>
                  <div className="text-xs text-gray-500">Buy separately</div>
                </div>
                <div className="flex items-center justify-center">
                  <ArrowRight className="w-8 h-8 text-saffron-600" />
                </div>
                <div>
                  <div className="text-sm text-green-600 font-semibold mb-2">Bundle Price</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-saffron-600 to-orange-600 bg-clip-text text-transparent mb-1">₹9,999</div>
                  <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    Save ₹20,000 (67% OFF)
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/packages"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-saffron-600 via-orange-600 to-amber-600 hover:from-saffron-700 hover:via-orange-700 hover:to-amber-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg"
              >
                <Package className="w-6 h-6" />
                <span>Explore All Bundles & Save Big</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-50 font-semibold px-8 py-4 rounded-2xl transition-all duration-300"
              >
                <Heart className="w-5 h-5" />
                <span>Need Help Choosing?</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-10 pt-8 border-t border-saffron-200">
              <p className="text-sm text-gray-600 mb-4">Trusted by 10,000+ students worldwide</p>
              <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>1-Year Access Period</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Certificates Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Expert Instructors</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Course Card Component (matching PackageCard style)
function CourseCard({ course, index }: { course: Course; index: number }) {
  const savings = course.originalPrice && course.price !== 'Free' 
    ? parseInt(course.originalPrice.replace(/[^0-9]/g, '')) - parseInt(course.price.replace(/[^0-9]/g, ''))
    : 0;

  return (
    <div className="group">
      <div className="bg-white hover:shadow-lg transition-all duration-300 border-2 hover:border-saffron-400 rounded-xl overflow-hidden h-full flex flex-col">
        {/* Course Image */}
        {course.thumbnail && (
          <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-saffron-100 to-peacock-green-100">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              {course.status === 'upcoming' ? (
                <Badge className="bg-orange-100 text-orange-700 font-semibold shadow-md">
                  Upcoming
                </Badge>
              ) : course.type.toLowerCase().includes('free') ? (
                <Badge className="bg-green-100 text-green-700 font-semibold shadow-md">
                  Free
                </Badge>
              ) : (
                <Badge className="bg-blue-100 text-blue-700 font-semibold shadow-md">
                  Available
                </Badge>
              )}
            </div>
            {/* Savings Badge */}
            {savings > 0 && (
              <Badge className="absolute top-3 left-3 bg-emerald-600 text-white font-semibold shadow-md">
                Save {course.savings}
              </Badge>
            )}
          </div>
        )}

        {/* Course Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Type Badge */}
          <div className="mb-3">
            <Badge variant="outline" className="text-xs border-saffron-400 text-saffron-700">
              {course.type}
            </Badge>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-saffron-600 transition-colors">
            {course.title}
          </h3>

          {/* Subtitle */}
          {course.subtitle && (
            <p className="text-sm text-saffron-600 mb-3">
              {course.subtitle}
            </p>
          )}

          {/* Description */}
          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
            {course.description}
          </p>

          {/* Course Details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 flex items-center gap-1">
                <Clock className="w-4 h-4" /> Duration:
              </span>
              <span className="font-medium text-slate-700">{course.duration}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Level:</span>
              <span className="font-medium text-slate-700">{course.level}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-saffron-600">
              {course.price}
            </span>
            {course.originalPrice && course.originalPrice !== course.price && (
              <span className="text-lg text-slate-400 line-through">
                {course.originalPrice}
              </span>
            )}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {course.features.slice(0, 3).map((feature, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {feature}
              </Badge>
            ))}
            {course.features.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{course.features.length - 3} more
              </Badge>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="mt-auto flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-saffron-400 text-saffron-600 hover:bg-saffron-50"
              onClick={() => window.location.href = course.link}
            >
              View Details
            </Button>
            <Button
              className="flex-1 bg-saffron-600 hover:bg-saffron-700 text-white"
              onClick={() => {
                // Check if it's a free course
                if (course.type.toLowerCase().includes('free')) {
                  window.location.href = course.link;
                } else {
                  // Redirect to checkout or course page
                  window.location.href = course.link;
                }
              }}
            >
              {course.type.toLowerCase().includes('free') ? 'Start Free' : 'Enroll Now'}
            </Button>
          </div>
        </div>

        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
      </div>
    </div>
  )
}
