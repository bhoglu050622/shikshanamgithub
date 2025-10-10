'use client'

import { motion, AnimatePresence } from 'framer-motion'
import MotionWrapper, { MotionDiv } from '@/components/motion/MotionWrapper'
import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone, Sparkles, Star, Users, BookOpen } from 'lucide-react'
import { useHydrationSafeAnimation } from '@/lib/hooks/useHydrationSafeAnimation'

// Type definitions
interface FAQItem {
  id?: string;
  question: string;
  answer: string;
}

interface FAQData {
  title: string;
  subtitle: string;
  description?: string;
  questions: FAQItem[];
}

// Default FAQ data (fallback)
const defaultFaqs: FAQItem[] = [
  {
    question: 'How do I sign up?',
    answer: 'To signup simply click on Login. A popup will appear. Click on signup. The next screen will prompt you to enter your details such as name, email and password, fill all the details and click next. Your account will be created. Alternatively, you can also use your google account to signup on our platform.'
  },
  {
    question: 'What is the validity of the course?',
    answer: 'All of our courses come with lifetime validity. You just have to pay for them once and you can access them as long as you want.'
  },
  {
    question: 'Are there any prerequisites for taking this course?',
    answer: 'No, there are no prerequisites for enrolling in this course. Anyone with a curiosity for the Ancient Hindu Philosophy is welcome to join.'
  },
  {
    question: 'How can I access the courses after purchasing them?',
    answer: 'Courses once purchased can be accessed either through the Dashboard section. You will have to login on the platform first to get access to all your purchased courses. You can also use our android app to access all the courses.'
  },
  {
    question: 'Can I download course content?',
    answer: 'Yes, you can download course lectures on single device using our mobile app. Click here to download our mobile app.'
  },
  {
    question: 'How do I contact customer support?',
    answer: 'In case of any difficulties technical or non-technical our team can be reached out at support@shikshanam.in'
  },
  {
    question: 'I am unable to access the Course, what should I do?',
    answer: 'Please check whether you are using the same email, which was used for purchasing the course. Check for the course in your Dashboard section. If the course is still not available, please drop an email to support@shikshanam.in'
  },
  {
    question: 'After payments, can I get a refund?',
    answer: 'You can view our complimentary demo videos and thoroughly review all the provided information and reviews before making a purchase. We do not currently offer refunds.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [faqData, setFaqData] = useState<FAQData | null>(null)
  const [loading, setLoading] = useState(true)
  const mounted = useHydrationSafeAnimation()

  // Use mock data since CMS functionality is removed
  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 300))

        // Mock FAQ data
        setFaqData({
          title: "Frequently Asked Questions",
          subtitle: "Find answers to common questions about our courses and platform",
          questions: defaultFaqs
        })
      } catch (error) {
        console.error('Failed to load FAQ data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFaqData()
  }, [])

  // Use CMS data or fallback to default
  const faqs = faqData?.questions || defaultFaqs
  const sectionTitle = faqData?.title || "Frequently Asked Questions"
  const sectionSubtitle = faqData?.subtitle || "Find answers to common questions about our courses, platform, and learning experience."

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 sm:py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900">
      {/* Modern background pattern */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500/10 dark:bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Section Header */}
        <MotionDiv
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={mounted ? { opacity: 0, scale: 0.9 } : false}
            whileInView={mounted ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
            transition={mounted ? { duration: 0.5, delay: 0.1 } : { duration: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 border border-yellow-200 dark:border-yellow-700/50 mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
            <span className="text-xs font-semibold text-yellow-900 dark:text-yellow-200 tracking-widest uppercase">
              FAQ
            </span>
          </motion.div>

          <motion.h2
            initial={mounted ? { opacity: 0, y: 20 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.6, delay: 0.2 } : { duration: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-yellow-900 via-orange-900 to-amber-900 dark:from-yellow-100 dark:via-orange-100 dark:to-amber-100 bg-clip-text text-transparent"
          >
            {sectionTitle}
          </motion.h2>
          
          <motion.p
            initial={mounted ? { opacity: 0, y: 20 } : false}
            whileInView={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={mounted ? { duration: 0.6, delay: 0.3 } : { duration: 0 }}
            viewport={{ once: true }}
            className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {sectionSubtitle}
          </motion.p>
        </MotionDiv>

        {/* Enhanced FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq: FAQItem, index: number) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <div className="relative group">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300 overflow-hidden">
                  <motion.button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left flex items-center justify-between p-6 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200"
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                  >
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg pr-4 leading-relaxed">
                      {faq.question}
                    </h3>
                    <MotionDiv
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </MotionDiv>
                  </motion.button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <MotionDiv
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </MotionDiv>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>

      </div>
    </section>
  )
}
