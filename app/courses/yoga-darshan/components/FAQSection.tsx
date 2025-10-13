'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Mail, Phone } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem } from '@/components/motion/MotionWrapper';

const faqs = [
  {
    question: 'How do I enroll in the course?',
    answer: 'Simply click the "Enroll Now" button on this page. You\'ll be redirected to our secure payment gateway where you can complete your purchase and get immediate access to the course.'
  },
  {
    question: 'What is the course validity?',
    answer: 'You get 1-year access to all course materials from the date of enrollment. During this period, you can access all videos, notes, and resources anytime via dashboard on hyperquest.graphy.com or Android app, and learn at your own pace.'
  },
  {
    question: 'Can I access the course after completion?',
    answer: 'Yes! As long as you\'re within the 1-year validity period, you can continue to access all course materials even after completing the course. This allows you to revise and reinforce your learning.'
  },
  {
    question: 'What happens after 1 year?',
    answer: 'After 1 year, your access to the course materials will expire. However, any certificates earned and downloaded materials will remain with you permanently. You can also re-enroll at that time if you wish to continue learning.'
  },
  {
    question: 'Are there any prerequisites for this course?',
    answer: 'No prerequisites required! This course is designed for both beginners and intermediate learners. We start from the basics and gradually build up to advanced concepts.'
  },
  {
    question: 'Can I download the course material?',
    answer: 'Yes! Lectures are downloadable on the mobile app (link to Play Store present). You can download the comprehensive notes, quizzes, and supplementary materials during your 1-year access period. These materials remain with you even after the access period ends.'
  },
  {
    question: 'What is the refund policy?',
    answer: 'No refunds policy. We do not offer refunds for this course.'
  },
  {
    question: 'Is the course available in other languages?',
    answer: 'Currently, the course is available in Hindi. We\'re working on English subtitles and other language versions for future releases.'
  },
  {
    question: 'How long does it take to complete the course?',
    answer: 'The course contains 8+ hours of video content. Most students complete it within 2-4 weeks, but you can take as much time as you need within the 1-year access period.'
  },
  {
    question: 'Will I get a certificate after completion?',
    answer: 'Yes! Upon successful completion of all modules and assessments, you\'ll receive a downloadable certificate that you can share on LinkedIn and other professional platforms. The certificate is yours to keep permanently.'
  },
  {
    question: 'Is there any community support?',
    answer: 'Absolutely! You\'ll have access to our student community where you can ask questions, share insights, and connect with fellow learners on the spiritual path.'
  },
  {
    question: 'Can I access the course on mobile devices?',
    answer: 'Yes! The course is accessible via dashboard on hyperquest.graphy.com or Android app. You can learn anywhere, anytime at your convenience.'
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20">
      <StaggerContainer>
        <StaggerItem>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display text-high-contrast mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-wisdom-600 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about the Yoga Darshan course. Still have questions? We're here to help!
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="card-premium overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-wisdom-50 transition-colors duration-200"
                  >
                    <h3 className="text-lg font-semibold text-high-contrast pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      {openIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-saffron-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-saffron-600" />
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
                        <div className="px-6 pb-6">
                          <p className="text-wisdom-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 bg-gradient-to-r from-saffron-50 to-teal-50 p-8 rounded-3xl">
            <div className="text-center">
              <h3 className="text-2xl font-display text-high-contrast mb-6">
                Still Have Questions?
              </h3>
              <p className="text-wisdom-600 mb-8 max-w-2xl mx-auto">
                Our support team is here to help you with any questions about the course, enrollment, or technical issues.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-4 p-6 bg-white rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-saffron-500 to-saffron-600 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-high-contrast">Email Support</h4>
                    <p className="text-wisdom-600 text-sm">support@shikshanam.in</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-4 p-6 bg-white rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-semibold text-high-contrast">Phone Support</h4>
                    <p className="text-wisdom-600 text-sm">+91-9910032165 (Mon–Sat 11AM–6PM)</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full">
                  <HelpCircle className="w-5 h-5 text-saffron-600" />
                  <span className="text-wisdom-600 font-medium">Average response time: 2-4 hours</span>
                </div>
              </div>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  );
}
