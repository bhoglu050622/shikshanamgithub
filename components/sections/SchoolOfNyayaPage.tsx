'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  ArrowRight,
  Download,
  MessageCircle,
  Instagram,
  HelpCircle,
  Mail,
  ChevronDown,
  CheckCircle,
  Play,
  Users,
  BookOpen,
  Star,
  Sparkles,
  Flower,
  Award,
  Target,
  Clock,
  Globe,
  Zap,
  Scale,
  Lightbulb,
  Eye,
  Heart
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

export default function SchoolOfNyayaPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      
      {/* Hero Section - Purple Capsule */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-purple-50/30 via-transparent to-teal-50/30 dark:from-purple-900/10 dark:via-transparent dark:to-teal-900/10">
        {/* Background Ornaments */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-br from-purple-200/20 via-teal-200/15 to-indigo-200/20 dark:from-purple-400/10 dark:via-teal-400/8 dark:to-indigo-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-br from-teal-200/20 via-indigo-200/15 to-purple-200/20 dark:from-teal-400/10 dark:via-indigo-400/8 dark:to-purple-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-indigo-200/20 via-purple-200/15 to-teal-200/20 dark:from-indigo-400/10 dark:via-purple-400/8 dark:to-teal-400/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-gentle animation-delay-4000"></div>
          
          {/* Indian pattern overlay */}
          <div className="absolute inset-0 indian-pattern opacity-30 dark:opacity-20"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <StaggerContainer className="text-center">
            <StaggerItem>
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4 text-purple-500">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <Brain className="w-8 h-8 animate-bounce" />
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              {/* Purple Capsule Hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 rounded-[40px] p-8 md:p-12 mx-auto max-w-2xl mb-8 shadow-2xl"
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
                  Welcome to School of Nyaya
                </h1>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                  "The science of logic and reasoning that sharpens your mind and clarifies your thinking"
                </p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col items-center space-y-4">
                <span className="text-medium-contrast text-small font-medium tracking-wide uppercase">
                  Master the art of logical reasoning
                </span>
                
                <motion.div
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-7 h-12 border-2 border-purple-500 dark:border-purple-400 rounded-full flex justify-center relative group cursor-pointer tap-target"
                >
                  <motion.div
                    animate={{ y: [0, 18, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-1.5 h-4 bg-gradient-to-b from-purple-500 to-teal-500 dark:from-purple-400 dark:to-teal-400 rounded-full mt-2"
                  />
                </motion.div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* About The Darshana Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Teal Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="w-8 h-8" />
                <h2 className="text-2xl md:text-3xl font-bold">About The Darshana</h2>
              </div>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Nyaya, the "Science of Logic," is one of the six classical schools of Indian philosophy. 
                  Founded by Akshapada Gautama, it provides a systematic framework for clear thinking and valid reasoning.
                </p>
                <p>
                  This ancient wisdom teaches you to distinguish truth from falsehood, construct sound arguments, 
                  and engage in meaningful debate. It's the foundation of critical thinking that sharpens your mind 
                  and enhances your decision-making abilities.
                </p>
                <p>
                  Through Nyaya, you'll learn the art of logical inference, recognize fallacies, and develop 
                  the mental discipline needed for rigorous analysis in any field of study or profession.
                </p>
              </div>
            </motion.div>

            {/* Right: Guru Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white dark:bg-wisdom-800 rounded-3xl p-8 shadow-xl">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Brain className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-2">
                  Akshapada Gautama
                </h3>
                <p className="text-wisdom-600 dark:text-wisdom-400 mb-4">
                  Founder of Nyaya Philosophy
                </p>
                <p className="text-sm text-wisdom-500 dark:text-wisdom-400 leading-relaxed">
                  "The author of Nyaya Sūtra, who established the systematic study of logic, 
                  reasoning, and debate in ancient India."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How This Darshan Helps You in Life */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              How This Darshan Helps You in Life?
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Develop essential life skills through the systematic study of logic and reasoning
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Brain, label: 'Debate Skills', color: 'from-purple-500 to-purple-600' },
              { icon: Lightbulb, label: 'Clarity of Thought', color: 'from-teal-500 to-teal-600' },
              { icon: Scale, label: 'Argumentative Rigor', color: 'from-indigo-500 to-indigo-600' },
              { icon: Target, label: 'Exam Preparation', color: 'from-saffron-500 to-saffron-600' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.04, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-white dark:bg-wisdom-800 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 h-32 flex flex-col items-center justify-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-indigo-700 dark:text-soft-gold-500">
                    {item.label}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Tagline */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-8"
          >
            Become Sharp in Debates!
          </motion.h2>
        </div>
      </section>

      {/* Course Thumbnail & Primary CTA */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            {/* Course Thumbnail */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 rounded-3xl p-8 mb-8 shadow-2xl">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Complete Nyaya Course</h3>
              <p className="text-white/90">Master Logic & Reasoning</p>
            </div>

            {/* What you will get */}
            <h4 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-6">
              What you will get!
            </h4>

            {/* Benefit Chips */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                '24 Self-Paced Videos',
                '2 Weekly Live Classes',
                'Quizzes and Notes',
                'Community Access',
                'Certificate'
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  {benefit}
                </motion.div>
              ))}
            </div>

            {/* Enroll CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-coral-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus-ring"
            >
              Enroll Now
            </motion.button>

            <p className="text-sm text-wisdom-500 dark:text-wisdom-400 mt-4">
              Secure payment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Meet Your Gurus Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Meet Your Gurus
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Learn from expert teachers who have dedicated their lives to the study and practice of Nyaya philosophy
            </p>
          </motion.div>

          {/* Guru Avatars */}
          <div className="flex justify-center space-x-8 mb-12">
            {[
              { name: 'Dr. Rajesh Kumar', title: 'Nyaya Scholar' },
              { name: 'Prof. Meera Patel', title: 'Logic Expert' }
            ].map((guru, index) => (
              <motion.div
                key={guru.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-teal-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-1">
                  {guru.name}
                </h3>
                <p className="text-sm text-wisdom-600 dark:text-wisdom-400">
                  {guru.title}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Introduction Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 rounded-3xl p-8 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-110 transition-transform duration-300">
                  <Play className="w-10 h-10 ml-1" />
                </div>
                <h3 className="text-xl font-bold mb-2">Introduction Video</h3>
                <p className="text-white/90 mb-6">
                  Watch our gurus explain the fundamentals of Nyaya philosophy and what you'll learn in this course
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-200"
                >
                  Watch Introduction
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Secondary Enroll CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-coral-primary text-white px-6 py-3 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 focus-ring"
            >
              Start Learning Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* The School's Treasury: Dedicated Resources */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              The School's Treasury: Dedicated Resources
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Access comprehensive learning materials and resources to deepen your understanding of Nyaya philosophy
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto">
            {[
              { name: 'Blogs', icon: BookOpen, description: 'In-depth articles on Nyaya concepts' },
              { name: 'Glossaries', icon: BookOpen, description: 'Sanskrit terms and definitions' }
            ].map((resource, index) => (
              <motion.button
                key={resource.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus-ring flex items-center space-x-3"
              >
                <resource.icon className="w-6 h-6" />
                <span>{resource.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Syllabus Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Course Syllabus
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              A comprehensive curriculum covering all aspects of Nyaya philosophy and logical reasoning
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Introduction to Nyaya Philosophy',
              'Pramāṇa: Means of Knowledge',
              'Tarka: Logical Reasoning',
              'Vāda: Art of Debate',
              'Hetvābhāsa: Fallacies',
              'Nyaya Sūtra Study'
            ].map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="bg-white dark:bg-wisdom-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer flex items-center space-x-4"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <span className="text-wisdom-700 dark:text-wisdom-300 font-medium">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Mission */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Founder's Mission</h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <BookOpen className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Accessible</h3>
                  <p className="text-white/90 text-sm">
                    Complex logical concepts made simple and engaging
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Heart className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Practical</h3>
                  <p className="text-white/90 text-sm">
                    Ancient wisdom applied to modern life and decision-making
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <Zap className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Transformative</h3>
                  <p className="text-white/90 text-sm">
                    Develop sharp reasoning skills that change how you think
                  </p>
                </div>
              </div>
              
              <blockquote className="text-lg md:text-xl italic text-white/90 leading-relaxed">
                "Our mission is to make the profound wisdom of Nyaya philosophy accessible to everyone, 
                helping you develop the critical thinking skills needed for success in any field."
              </blockquote>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Join our Community!
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 mb-8">
              Connect with fellow learners, share insights, and grow together in your journey of logical reasoning
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus-ring flex items-center space-x-3 mx-auto"
              >
                <MessageCircle className="w-6 h-6" />
                <span>Join Telegram</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-400 dark:to-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus-ring flex items-center space-x-3 mx-auto"
              >
                <Instagram className="w-6 h-6" />
                <span>Follow Instagram</span>
              </motion.button>
            </div>
            
            <p className="text-sm text-wisdom-500 dark:text-wisdom-400 mt-4">
              2,500+ active members • Daily discussions & Q&A
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="section-padding bg-white/50 dark:bg-deep-indigo-500/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-display text-indigo-700 dark:text-soft-gold-500 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-body text-wisdom-600 dark:text-wisdom-400 max-w-3xl mx-auto">
              Common questions about our Nyaya philosophy course
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Do I need any prior knowledge of philosophy?",
                answer: "No prior knowledge is required. We start from the basics and build up systematically."
              },
              {
                question: "How long does the course take to complete?",
                answer: "The course is self-paced, but most students complete it in 6-8 weeks with 2-3 hours per week."
              },
              {
                question: "Are there live sessions?",
                answer: "Yes, we have 2 weekly live classes where you can interact with instructors and fellow students."
              },
              {
                question: "What if I'm not satisfied with the course?",
                answer: "Please review our demo content and course details before enrolling to ensure it meets your expectations."
              },
              {
                question: "Can I access the course materials offline?",
                answer: "Yes, all course materials are available for download and can be accessed offline."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-wisdom-800 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-indigo-700 dark:text-soft-gold-500 mb-3">
                  {faq.question}
                </h3>
                <p className="text-wisdom-600 dark:text-wisdom-400 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sanskrit Quote Strip + Contact */}
      <section className="section-padding">
        <div className="container-custom">
          {/* Sanskrit Quote Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 rounded-2xl p-8 text-center mb-8"
          >
            <p className="text-2xl md:text-3xl font-devanagari text-white mb-2">
              तर्कः सत्यस्य मार्गः
            </p>
            <p className="text-white/80 text-lg">
              "Logic is the path to truth"
            </p>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 focus-ring flex items-center space-x-3 mx-auto"
            >
              <Mail className="w-6 h-6" />
              <span>Contact Us</span>
            </motion.button>
            <p className="text-sm text-wisdom-500 dark:text-wisdom-400 mt-4">
              Replies within 24 hours
            </p>
          </motion.div>
        </div>
      </section>

    </>
  )
}
