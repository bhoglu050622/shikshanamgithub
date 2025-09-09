'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Star, 
  Award, 
  BookOpen, 
  Clock, 
  Users, 
  MessageCircle, 
  Calendar,
  MapPin,
  CheckCircle,
  Mail,
  Video,
  Sparkles
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

// Guru profile data
const guruProfile = {
  name: 'Dr. Meera Patel',
  title: 'Spiritual Sanskrit Guide',
  sanskritName: 'मीरा पटेल',
  bio: 'Dr. Meera Patel is a renowned Sanskrit scholar with over 20 years of experience in teaching and research. She specializes in Vedic literature, classical Sanskrit poetry, and spiritual philosophy.',
  detailedBio: 'Dr. Meera Patel has dedicated her life to preserving and sharing the wisdom of Sanskrit literature. With a Ph.D. in Sanskrit from Banaras Hindu University and extensive research in Vedic texts, she brings both academic rigor and spiritual depth to her teachings.',
  location: 'Varanasi, India',
  experience: '20+ years',
  students: '2,500+',
  rating: 4.9,
  languages: ['Sanskrit', 'Hindi', 'English', 'Gujarati'],
  specializations: [
    'Vedic Literature',
    'Classical Sanskrit Poetry',
    'Spiritual Philosophy',
    'Sanskrit Grammar',
    'Mantra & Chanting',
    'Bhagavad Gita Studies'
  ]
}

// Stats for the page
const stats = [
  { number: '2,500+', label: 'Students Taught', icon: Users },
  { number: '20+', label: 'Years Experience', icon: Award },
  { number: '4.9', label: 'Average Rating', icon: Star },
  { number: '15+', label: 'Courses Created', icon: BookOpen }
]

export default function MeeraPatelPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showContactModal, setShowContactModal] = useState(false)

  return (
    <>
      
      {/* Hero Section */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-saffron-50/30 via-transparent to-deep-teal-50/30 dark:from-saffron-900/10 dark:via-transparent dark:to-deep-teal-900/10">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-saffron-200/20 via-deep-teal-200/15 to-indigo-200/20 dark:from-saffron-400/10 dark:via-deep-teal-400/8 dark:to-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-deep-teal-200/20 via-indigo-200/15 to-saffron-200/20 dark:from-deep-teal-400/10 dark:via-indigo-400/8 dark:to-saffron-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Guru Info */}
              <div>
                <StaggerContainer>
                  <StaggerItem>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-saffron-600 dark:text-saffron-400 font-medium">
                          Spiritual Sanskrit Guide
                        </div>
                        <div className="text-xs text-wisdom-500 dark:text-wisdom-400">
                          Verified Teacher
                        </div>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <h1 className="text-4xl md:text-5xl font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                      {guruProfile.name}
                    </h1>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="text-2xl font-devanagari text-saffron-600 dark:text-saffron-400 mb-6">
                      {guruProfile.sanskritName}
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <p className="text-lg text-wisdom-600 dark:text-wisdom-400 mb-8 leading-relaxed">
                      {guruProfile.bio}
                    </p>
                  </StaggerItem>

                  {/* Stats */}
                  <StaggerItem>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={`stat-${stat.label}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                          className="text-center"
                        >
                          <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-saffron-600 dark:from-saffron-400 dark:to-saffron-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                            <stat.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-xl font-bold text-high-contrast">{stat.number}</div>
                          <div className="text-sm text-wisdom-500 dark:text-wisdom-400">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </StaggerItem>

                  {/* CTA Buttons */}
                  <StaggerItem>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowContactModal(true)}
                        className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Contact Dr. Patel</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveTab('courses')}
                        className="flex items-center space-x-3 px-8 py-4 border-2 border-saffron-500 text-saffron-600 dark:text-saffron-400 rounded-xl hover:bg-saffron-50 dark:hover:bg-saffron-900/20 transition-all duration-200"
                      >
                        <BookOpen className="w-5 h-5" />
                        <span>View Courses</span>
                      </motion.button>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>

              {/* Guru Avatar */}
              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-saffron-200 to-deep-teal-200 dark:from-saffron-800/30 dark:to-deep-teal-800/30 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-72 h-72 bg-gradient-to-br from-indigo-100 to-saffron-100 dark:from-indigo-800/50 dark:to-saffron-800/50 rounded-full flex items-center justify-center">
                      <User className="w-32 h-32 text-indigo-600 dark:text-soft-gold-500" />
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Star className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-deep-teal-500 to-deep-teal-600 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Award className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'courses', label: 'Courses', icon: BookOpen },
                { id: 'testimonials', label: 'Testimonials', icon: MessageCircle },
                { id: 'schedule', label: 'Schedule', icon: Calendar }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-lg'
                      : 'bg-white dark:bg-wisdom-800 text-wisdom-700 dark:text-wisdom-300 hover:bg-saffron-50 dark:hover:bg-saffron-900/20'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid lg:grid-cols-2 gap-12"
                >
                  {/* Detailed Bio */}
                  <div className="card-premium p-8">
                    <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                      About Dr. Patel
                    </h3>
                    <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed mb-6">
                      {guruProfile.detailedBio}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                        <span className="text-wisdom-600 dark:text-wisdom-400">{guruProfile.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                        <span className="text-wisdom-600 dark:text-wisdom-400">{guruProfile.experience} of teaching experience</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Users className="w-5 h-5 text-saffron-600 dark:text-saffron-400" />
                        <span className="text-wisdom-600 dark:text-wisdom-400">{guruProfile.students} students taught</span>
                      </div>
                    </div>
                  </div>

                  {/* Specializations */}
                  <div className="space-y-8">
                    <div className="card-premium p-8">
                      <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                        Specializations
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {guruProfile.specializations.map((specialization, index) => (
                          <motion.div
                            key={specialization}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center space-x-2 p-3 bg-saffron-50 dark:bg-saffron-900/20 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-saffron-600 dark:text-saffron-400" />
                            <span className="text-wisdom-700 dark:text-wisdom-300 text-sm">{specialization}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="card-premium p-8">
                      <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                        Languages
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {guruProfile.languages.map((language, index) => (
                          <motion.span
                            key={language}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="px-4 py-2 bg-gradient-to-r from-deep-teal-100 to-deep-teal-200 dark:from-deep-teal-900/30 dark:to-deep-teal-800/30 text-deep-teal-700 dark:text-deep-teal-300 rounded-full text-sm font-medium"
                          >
                            {language}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'courses' && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                    Courses Coming Soon
                  </h3>
                  <p className="text-wisdom-600 dark:text-wisdom-400">
                    Dr. Patel's courses will be available soon. Contact her for more information.
                  </p>
                </motion.div>
              )}

              {activeTab === 'testimonials' && (
                <motion.div
                  key="testimonials"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                    Student Testimonials
                  </h3>
                  <p className="text-wisdom-600 dark:text-wisdom-400">
                    Testimonials will be available soon.
                  </p>
                </motion.div>
              )}

              {activeTab === 'schedule' && (
                <motion.div
                  key="schedule"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                    Upcoming Sessions
                  </h3>
                  <p className="text-wisdom-600 dark:text-wisdom-400">
                    Schedule information will be available soon.
                  </p>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white dark:bg-wisdom-800 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-saffron-200/30 dark:border-saffron-400/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-display text-indigo-700 dark:text-soft-gold-500 mb-4">
                  Contact Dr. Meera Patel
                </h3>
                <p className="text-wisdom-600 dark:text-wisdom-400">
                  Get in touch with Dr. Patel for personalized guidance and course inquiries.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-4 p-4 border-2 border-wisdom-200 dark:border-wisdom-700 rounded-xl hover:border-saffron-300 dark:hover:border-saffron-600 transition-all duration-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-indigo-700 dark:text-soft-gold-500">Email</div>
                      <div className="text-sm text-wisdom-600 dark:text-wisdom-400">meera.patel@shikshanam.com</div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-4 p-4 border-2 border-wisdom-200 dark:border-wisdom-700 rounded-xl hover:border-saffron-300 dark:hover:border-saffron-600 transition-all duration-200"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-deep-teal-500 to-deep-teal-600 rounded-xl flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-indigo-700 dark:text-soft-gold-500">Video Call</div>
                      <div className="text-sm text-wisdom-600 dark:text-wisdom-400">Schedule a consultation</div>
                    </div>
                  </motion.button>
                </div>

                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowContactModal(false)}
                    className="px-8 py-4 border-2 border-wisdom-300 dark:border-wisdom-600 text-wisdom-700 dark:text-wisdom-300 rounded-xl hover:bg-wisdom-50 dark:hover:bg-wisdom-700 transition-all duration-200"
                  >
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    Send Message
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  )
}
