'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Star, Award, BookOpen, Clock, Users, MessageCircle, Calendar, MapPin, CheckCircle, Mail, Video } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

const guruProfile = {
  name: 'Acharya Rajesh Kumar',
  title: 'Sanskrit Conversation Specialist',
  sanskritName: 'आचार्य राजेश कुमार',
  bio: 'Acharya Rajesh Kumar is a distinguished Sanskrit conversation specialist with 12+ years of experience in pronunciation, spoken Sanskrit, and classical literature.',
  location: 'Varanasi, India',
  experience: '12+ years',
  students: '1,200+',
  rating: 4.8,
  languages: ['Sanskrit', 'Hindi', 'English', 'Pali'],
  specializations: ['Spoken Sanskrit', 'Pronunciation', 'Classical Literature', 'Vedic Chanting', 'Sanskrit Drama', 'Poetry Recitation']
}

const stats = [
  { number: '1,200+', label: 'Students Taught', icon: Users },
  { number: '12+', label: 'Years Experience', icon: Award },
  { number: '4.8', label: 'Average Rating', icon: Star },
  { number: '8+', label: 'Conversation Courses', icon: BookOpen }
]

export default function RajeshKumarPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showContactModal, setShowContactModal] = useState(false)

  return (
    <div className="min-h-screen bg-parchment-ivory transition-colors duration-300">
      <Header />
      
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-saffron-50/30 via-transparent to-deep-teal-50/30 dark:from-saffron-900/10 dark:via-transparent dark:to-deep-teal-900/10">
        <div className="container-custom relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <StaggerContainer>
                  <StaggerItem>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <div className="text-sm text-saffron-600 dark:text-saffron-400 font-medium">
                          Sanskrit Conversation Specialist
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

                  <StaggerItem>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowContactModal(true)}
                        className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-saffron-600 to-saffron-700 text-white rounded-xl hover:shadow-lg transition-all duration-200"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>Contact Acharya Kumar</span>
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

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-80 h-80 mx-auto bg-gradient-to-br from-saffron-200 to-deep-teal-200 dark:from-saffron-800/30 dark:to-deep-teal-800/30 rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-72 h-72 bg-gradient-to-br from-deep-teal-100 to-saffron-100 dark:from-deep-teal-800/50 dark:to-saffron-800/50 rounded-full flex items-center justify-center">
                      <User className="w-32 h-32 text-saffron-600 dark:text-soft-gold-500" />
                    </div>
                  </div>
                  
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

            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid lg:grid-cols-2 gap-12"
              >
                <div className="card-premium p-8">
                  <h3 className="text-2xl font-display text-indigo-700 dark:text-soft-gold-500 mb-6">
                    About Acharya Kumar
                  </h3>
                  <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed mb-6">
                    Acharya Rajesh Kumar specializes in spoken Sanskrit and pronunciation. His expertise in classical literature and Vedic chanting makes him a leading authority in Sanskrit conversation and oral traditions.
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
                  Acharya Kumar's courses will be available soon. Contact him for more information.
                </p>
              </motion.div>
            )}
        </div>
      </div>
      </section>

      <Footer />
    </div>
  )
}
