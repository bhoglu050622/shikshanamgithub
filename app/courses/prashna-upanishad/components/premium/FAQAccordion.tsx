'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MotionDiv } from '@/components/motion/MotionWrapper';
import { ChevronDown, Search } from 'lucide-react';
import { prashnaUpanishadCourseData } from '../../courseData';
import { accordionVariants, safeVariants } from '../../motion.config';

export default function FAQAccordion() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { faqs } = prashnaUpanishadCourseData;

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-[#FFF9F2]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0D3B4A] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about the Prashna Upanishad course
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#D97B2A] focus:outline-none transition-colors"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => {
              const isExpanded = expandedFaq === index;
              return (
                <div key={index} className="prashna-faq-item">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="prashna-faq-button"
                    aria-expanded={isExpanded}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="flex-1 text-left font-semibold text-[#0D3B4A]">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <MotionDiv
                        id={`faq-answer-${index}`}
                        variants={safeVariants(accordionVariants)}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="overflow-hidden"
                      >
                        <div className="prashna-faq-content">
                          {faq.answer}
                        </div>
                      </MotionDiv>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No FAQs found matching your search.</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#D97B2A] font-semibold hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-12 p-6 bg-gradient-to-br from-[#0D3B4A] to-[#1A5568] rounded-2xl text-white text-center">
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="mb-4 text-white/90">
            Our support team is here to help you make the right decision
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${prashnaUpanishadCourseData.enrollment.checkoutLink.includes('shikshanam') ? 'support@shikshanam.in' : ''}`}
              className="px-6 py-3 bg-white text-[#0D3B4A] font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Email Support
            </a>
            <a
              href="tel:+919910032165"
              className="px-6 py-3 bg-[#D97B2A] text-white font-semibold rounded-lg hover:bg-[#E89B5A] transition-colors"
            >
              Call: +91-9910032165
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

