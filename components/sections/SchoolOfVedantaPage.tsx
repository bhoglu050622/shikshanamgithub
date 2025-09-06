'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Lightbulb, 
  ArrowRight,
  MessageCircle,
  Instagram,
  Mail,
  Play,
  Users,
  BookOpen,
  Star,
  Sparkles,
  Heart,
  Brain,
  Eye,
  Target,
  Scale
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

export default function SchoolOfVedantaPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <div className="min-h-screen bg-off-white-500 dark:bg-wisdom-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section - Indigo Capsule */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-indigo-50/30 via-transparent to-teal-50/30 dark:from-indigo-900/10 dark:via-transparent dark:to-teal-900/10">
        <div className="container-custom relative z-10">
          <StaggerContainer className="text-center">
            <StaggerItem>
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4 text-indigo-500">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <Lightbulb className="w-8 h-8 animate-bounce" />
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 rounded-[40px] p-8 md:p-12 mx-auto max-w-2xl mb-8 shadow-2xl"
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
                  Welcome to School of Vedānta
                </h1>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                  "The ultimate reality that reveals the non-dual nature of existence"
                </p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* About The Darshana Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-teal-500 to-teal-600 dark:from-teal-400 dark:to-teal-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Lightbulb className="w-8 h-8" />
                <h2 className="text-2xl md:text-3xl font-bold">About The Darshana</h2>
              </div>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Vedānta, the "Ultimate Reality," is one of the six classical schools of Indian philosophy. 
                  Founded by Bādarāyaṇa, it provides the deepest understanding of the non-dual nature of existence.
                </p>
                <p>
                  This profound philosophy teaches you that the individual Self (Ātman) and the universal Absolute (Brahman) 
                  are one and the same, revealing the ultimate truth of non-duality and leading to liberation (Mokṣa).
                </p>
                <p>
                  Through Vedānta, you'll learn to transcend the illusion of separation, understand your true nature as 
                  pure consciousness, and realize the fundamental unity underlying all existence.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-white dark:bg-wisdom-800 rounded-3xl p-8 shadow-xl">
                <div className="w-32 h-32 bg-gradient-to-br from-indigo-500 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Lightbulb className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-2">
                  Bādarāyaṇa
                </h3>
                <p className="text-wisdom-600 dark:text-wisdom-400 mb-4">
                  Founder of Vedānta Philosophy
                </p>
                <p className="text-sm text-wisdom-500 dark:text-wisdom-400 leading-relaxed">
                  "The ancient sage who systematized the ultimate truth of non-duality, 
                  providing humanity with the deepest understanding of reality and the path to liberation."
                </p>
              </div>
            </motion.div>
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
            Realize Your True Nature!
          </motion.h2>
        </div>
      </section>

      {/* Sanskrit Quote Strip + Contact */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 rounded-2xl p-8 text-center mb-8"
          >
            <p className="text-2xl md:text-3xl font-devanagari text-white mb-2">
              तत्त्वमसि
            </p>
            <p className="text-white/80 text-lg">
              "You are That" - The ultimate truth of non-duality
            </p>
          </motion.div>

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

      <Footer />
    </div>
  )
}
