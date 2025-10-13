'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, HelpCircle, Mail, Phone } from 'lucide-react';
import MotionWrapper, { StaggerContainer, StaggerItem, MotionInView } from '@/components/motion/MotionWrapper';

const faqs = [
  {
    question: 'How do I sign up?',
    answer: 'Click login → signup; or use Google.'
  },
  {
    question: 'What is course validity?',
    answer: 'Lifetime (or long access)'
  },
  {
    question: 'Any prerequisites?',
    answer: 'None'
  },
  {
    question: 'How to access after purchase?',
    answer: 'Via Dashboard, website / mobile app'
  },
  {
    question: 'Can I download lectures?',
    answer: 'Yes, via mobile app'
  },
  {
    question: 'How to contact support?',
    answer: 'support@shikshanam.in'
  },
  {
    question: 'Issue accessing course?',
    answer: 'Check email used, check Dashboard, contact support'
  },
  {
    question: 'Refunds?',
    answer: 'No refunds currently'
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
              Get answers to common questions about the course
            </p>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <MotionInView
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
                        <ChevronUp className="w-5 h-5 text-gold-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gold-600" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <MotionInView
                        initial={{ height: 0, opacity: 0 }}
                        whileInView={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <p className="text-wisdom-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </MotionInView>
                    )}
                  </AnimatePresence>
                </MotionInView>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="mt-16 bg-gradient-to-r from-gold-50 to-teal-50 p-8 rounded-3xl border border-gold-200/30 shadow-sm">
            <div className="text-center">
              <h3 className="text-2xl font-display text-high-contrast mb-6">
                Still Have Questions?
              </h3>
              <p className="text-wisdom-600 mb-8 max-w-2xl mx-auto">
                Give us a call +91-9910032165 (Monday to Saturday 11 AM – 6 PM)
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="flex items-center justify-center space-x-4 p-6 bg-white rounded-2xl">
                  <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center shadow-md">
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
                    <p className="text-wisdom-600 text-sm">+91-9910032165</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="inline-flex items-center space-x-2 bg-white px-6 py-3 rounded-full">
                  <HelpCircle className="w-5 h-5 text-gold-600" />
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
