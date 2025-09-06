'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BookOpen, 
  Award, 
  Users, 
  Star, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Globe,
  GraduationCap,
  Languages,
  Clock,
  CheckCircle,
  Mail,
  Phone
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Image from 'next/image'

const guruProfile = {
  name: 'Dr. Priya Sharma',
  title: 'Sanskrit Grammar Expert',
  subtitle: 'Professor of Sanskrit Linguistics',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  rating: 4.9,
  students: 1200,
  courses: 8,
  experience: '15+ years',
  location: 'Varanasi, India',
  languages: ['Sanskrit', 'Hindi', 'English', 'Pali', 'Prakrit'],
  specializations: [
    'Sanskrit Grammar (Vyākaraṇa)',
    'Classical Sanskrit Literature',
    'Vedic Sanskrit',
    'Sanskrit Linguistics',
    'Paninian Grammar',
    'Sanskrit Pedagogy'
  ],
  bio: 'Dr. Priya Sharma is a distinguished Sanskrit grammarian with over 15 years of teaching experience. She specializes in Paninian grammar and has made significant contributions to Sanskrit linguistics.',
  teachingPhilosophy: 'I believe that Sanskrit grammar is not just a set of rules, but a living system that reflects the profound wisdom of ancient Indian thought.',
  upcomingSessions: [
    {
      title: 'Advanced Sandhi Rules',
      date: '2024-02-15',
      time: '7:00 PM IST',
      duration: '2 hours',
      level: 'Intermediate',
      price: '₹299'
    },
    {
      title: 'Paninian Grammar Fundamentals',
      date: '2024-02-22',
      time: '7:00 PM IST',
      duration: '2 hours',
      level: 'Beginner',
      price: '₹199'
    }
  ],
  testimonials: [
    {
      name: 'Rajesh Kumar',
      text: 'Dr. Sharma\'s explanation of complex grammar rules is simply outstanding. She makes Sanskrit accessible to everyone.',
      rating: 5
    },
    {
      name: 'Meera Patel',
      text: 'Her teaching methodology is unique and effective. I finally understood Paninian grammar after years of struggle.',
      rating: 5
    }
  ]
}

export default function PriyaSharmaPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showContactModal, setShowContactModal] = useState(false)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'testimonials', label: 'Testimonials', icon: MessageCircle }
  ]

  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-saffron-50 via-white to-deep-teal-50 dark:from-wisdom-900 dark:via-wisdom-800 dark:to-wisdom-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="relative inline-block mb-6">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={guruProfile.avatar}
                    alt={guruProfile.name}
                    fill
                    className="rounded-full border-4 border-white dark:border-wisdom-700 shadow-xl object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-saffron-500 text-white rounded-full p-2">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              
              <h1 className="text-hero bg-gradient-to-r from-saffron-600 via-deep-teal-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                {guruProfile.name}
          </h1>
              
              <p className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-2">
                {guruProfile.title}
              </p>
              
              <p className="text-lg text-wisdom-600 dark:text-wisdom-400 mb-6">
                {guruProfile.subtitle}
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-saffron-500" />
                  <span className="font-semibold text-wisdom-700 dark:text-wisdom-300">
                    {guruProfile.rating}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-deep-teal-500" />
                  <span className="font-semibold text-wisdom-700 dark:text-wisdom-300">
                    {guruProfile.students.toLocaleString()} students
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                  <span className="font-semibold text-wisdom-700 dark:text-wisdom-300">
                    {guruProfile.courses} courses
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-copper-orange-500" />
                  <span className="font-semibold text-wisdom-700 dark:text-wisdom-300">
                    {guruProfile.experience}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="btn-primary flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Dr. Sharma
                </button>
                <button className="btn-secondary flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book Session
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="section-padding bg-white dark:bg-wisdom-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-saffron-500 text-white'
                      : 'bg-wisdom-100 dark:bg-wisdom-700 text-wisdom-600 dark:text-wisdom-300 hover:bg-saffron-50 dark:hover:bg-wisdom-600'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="card-premium p-8">
                      <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                        About Dr. Sharma
                      </h3>
                      <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed mb-6">
                        {guruProfile.bio}
                      </p>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-saffron-500" />
                          <span className="text-wisdom-700 dark:text-wisdom-300">
                            {guruProfile.location}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Languages className="w-5 h-5 text-deep-teal-500" />
                          <span className="text-wisdom-700 dark:text-wisdom-300">
                            {guruProfile.languages.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="card-premium p-8">
                      <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                        Specializations
                      </h3>
                      <div className="space-y-3">
                        {guruProfile.specializations.map((spec, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                            <span className="text-wisdom-700 dark:text-wisdom-300">
                              {spec}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="card-premium p-8">
                    <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                      Teaching Philosophy
                    </h3>
                    <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed italic">
                      "{guruProfile.teachingPhilosophy}"
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'schedule' && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6 text-center">
                    Upcoming Sessions
                  </h3>
                  
                  <div className="space-y-4">
                    {guruProfile.upcomingSessions.map((session, index) => (
                      <div key={index} className="card-premium p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-2">
                              {session.title}
                            </h4>
                            <div className="flex flex-wrap gap-4 text-sm text-wisdom-600 dark:text-wisdom-400">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {new Date(session.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {session.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {session.duration}
                              </span>
                              <span className="px-2 py-1 bg-wisdom-100 dark:bg-wisdom-700 rounded-full">
                                {session.level}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-2xl font-bold text-indigo-700 dark:text-soft-gold-500">
                              {session.price}
                            </span>
                            <button className="btn-primary">
                              Book Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'testimonials' && (
                <motion.div
                  key="testimonials"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6 text-center">
                    Student Testimonials
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {guruProfile.testimonials.map((testimonial, index) => (
                      <div key={index} className="card-premium p-6">
                        <div className="flex items-center gap-1 mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-saffron-500 fill-current" />
                          ))}
                        </div>
                        <p className="text-wisdom-600 dark:text-wisdom-400 mb-4 italic">
                          "{testimonial.text}"
                        </p>
                        <p className="font-semibold text-indigo-700 dark:text-soft-gold-500">
                          - {testimonial.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-wisdom-800 rounded-2xl p-8 max-w-md w-full"
            >
              <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                Contact Dr. Priya Sharma
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-saffron-500" />
                  <span className="text-wisdom-700 dark:text-wisdom-300">
                    priya.sharma@shikshanam.com
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-deep-teal-500" />
                  <span className="text-wisdom-700 dark:text-wisdom-300">
                    +91 98765 43210
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-indigo-500" />
                  <span className="text-wisdom-700 dark:text-wisdom-300">
                    Available for online sessions
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="btn-secondary flex-1"
                >
                  Close
                </button>
                <button className="btn-primary flex-1">
                  Send Message
                </button>
      </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
