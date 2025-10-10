'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Scale, 
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
  Lightbulb,
  Target
} from 'lucide-react'
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper'

export default function SchoolOfMimamsaPage() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      
      {/* Hero Section - Orange Capsule */}
      <section className="relative section-padding overflow-hidden bg-gradient-to-br from-orange-50/30 via-transparent to-teal-50/30 dark:from-orange-900/10 dark:via-transparent dark:to-teal-900/10">
        <div className="container-custom relative z-10">
          <StaggerContainer className="text-center">
            <StaggerItem>
              <div className="flex justify-center mb-8">
                <div className="flex items-center space-x-4 text-orange-500">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <Scale className="w-8 h-8 animate-bounce" />
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-500 dark:to-orange-600 rounded-[40px] p-8 md:p-12 mx-auto max-w-2xl mb-8 shadow-2xl"
              >
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 uppercase tracking-wide">
                  Welcome to School of Mīmāṁsā
                </h1>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                  "The science of dharma that guides you to right action and ethical living"
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
                <Scale className="w-8 h-8" />
                <h2 className="text-2xl md:text-3xl font-bold">About The Darshana</h2>
              </div>
              
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Mīmāṁsā, the "Science of Dharma," is one of the six classical schools of Indian philosophy. 
                  Founded by Jaimini, it provides a systematic approach to understanding right action and ethical living.
                </p>
                <p>
                  This profound philosophy teaches you to interpret sacred texts, understand the principles of duty (dharma), 
                  and apply ancient wisdom to modern ethical dilemmas through careful analysis and reasoning.
                </p>
                <p>
                  Through Mīmāṁsā, you'll learn to distinguish between right and wrong actions, understand the nature of duty, 
                  and develop the wisdom needed for ethical decision-making in all aspects of life.
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
                <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-teal-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Scale className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-xl font-bold text-indigo-700 dark:text-soft-gold-500 mb-2">
                  Jaimini
                </h3>
                <p className="text-wisdom-600 dark:text-wisdom-400 mb-4">
                  Founder of Mīmāṁsā Philosophy
                </p>
                <p className="text-sm text-wisdom-500 dark:text-wisdom-400 leading-relaxed">
                  "The ancient sage who systematized the interpretation of sacred texts, 
                  providing humanity with a method for understanding dharma and ethical living."
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
            Live Righteously and Ethically!
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
              धर्मो रक्षति रक्षितः
            </p>
            <p className="text-white/80 text-lg">
              "Dharma protects those who protect it"
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

    </>
  )
}
