'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, MessageCircle } from 'lucide-react'
import { ClientMotionDiv } from '@/components/motion/ClientMotion'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'What makes this course unique compared to other business courses?',
    answer: 'This course combines 2000-year-old strategic wisdom from Chanakya\'s Arthashastra with modern business applications. Unlike generic business courses, you\'ll learn time-tested principles that have been proven effective across centuries, giving you a unique strategic advantage in negotiations, leadership, and decision-making.'
  },
  {
    question: 'How long is the course valid?',
    answer: 'You get 1-year access to all course materials from the date of enrollment. During this period, you can revisit the content anytime, anywhere, as many times as you want. This gives you ample time to implement the strategies and see real results.'
  },
  {
    question: 'Can I access the course after completion?',
    answer: 'Yes! As long as you\'re within the 1-year validity period, you can continue to access all course materials even after completing the course. This allows you to revisit specific modules when facing new business challenges.'
  },
  {
    question: 'What happens after 1 year?',
    answer: 'After 1 year, your access to the course materials will expire. However, any certificates earned, downloaded materials, and templates will remain with you permanently. You can also re-enroll at that time for updated content and continued access.'
  },
  {
    question: 'Do I need prior business experience to take this course?',
    answer: 'No prior business experience required! The course is designed for professionals at all levels - from entrepreneurs starting out to experienced executives looking to sharpen their strategic thinking. We start with fundamentals and build up to advanced applications.'
  },
  {
    question: 'How practical and applicable are these ancient principles?',
    answer: 'Extremely practical! Each lesson includes modern case studies, real-world examples, and actionable frameworks you can implement immediately. The principles are timeless because they address fundamental human psychology and strategic thinking that hasn\'t changed over centuries.'
  },
  {
    question: 'Will I receive a certificate?',
    answer: 'Yes! Upon successful completion of the course, you\'ll receive a certificate that you can add to your LinkedIn profile and resume. This demonstrates your expertise in strategic thinking and ancient business wisdom. The certificate is yours to keep permanently.'
  },
  {
    question: 'What format is the course delivered in?',
    answer: 'The course includes 16-20 comprehensive video lessons, downloadable workbooks, negotiation templates, strategic planning worksheets, and real-world case studies. All content is self-paced, allowing you to learn at your convenience.'
  },
  {
    question: 'Is there community support or Q&A?',
    answer: 'Yes! You\'ll have access to our exclusive business community where you can network with other professionals, ask questions, share experiences, and get insights from instructors. This community has been instrumental in helping students apply the principles successfully.'
  },
  {
    question: 'What if this course doesn\'t work for me?',
    answer: 'We offer a 7-day money-back guarantee. If you\'re not satisfied with the course content within the first 7 days, simply contact our support team for a full refund. We\'re confident in the value we provide, which is why we can offer this guarantee.'
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section-padding bg-gradient-to-br from-white to-saffron-50/30">
      <div className="container-custom">
        <div className="text-center mb-16">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-indigo-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-indigo-700 max-w-3xl mx-auto">
              Have questions about Chanakya's Code? Find detailed answers to help you make an informed decision.
            </p>
          </ClientMotionDiv>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <ClientMotionDiv
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-saffron-50/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-indigo-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`transform transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}>
                    {openIndex === index ? (
                      <Minus className="w-6 h-6 text-saffron-600" />
                    ) : (
                      <Plus className="w-6 h-6 text-saffron-600" />
                    )}
                  </div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <p className="text-wisdom-600 leading-relaxed pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ClientMotionDiv>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="text-center mt-16">
          <ClientMotionDiv
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-br from-saffron-50 to-amber-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-saffron-500 to-saffron-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-indigo-900 mb-4">
                Still Have Questions?
              </h3>
              <p className="text-wisdom-600 mb-6">
                Our support team is here to help! Reach out to us for any questions about the course content, enrollment process, or business applications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:support@shikshanam.in"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-saffron-600 to-saffron-700 hover:from-saffron-700 hover:to-saffron-800 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </a>
                <a 
                  href="tel:+919910032165"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-saffron-600 text-saffron-700 hover:bg-saffron-600 hover:text-white font-semibold rounded-2xl transition-all duration-300"
                >
                  Call Us: +91-991-003-2165
                </a>
              </div>
            </div>
          </ClientMotionDiv>
        </div>
      </div>
    </section>
  )
}

