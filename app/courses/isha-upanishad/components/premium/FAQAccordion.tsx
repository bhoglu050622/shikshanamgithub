'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, Mail, Phone } from 'lucide-react';
import { ishaUpanishadCourseData, ishaUpanishadSupport } from '../../courseData';
import { fadeInUpVariants, safeVariants } from '../../motion.config';
import { useInView } from 'react-intersection-observer';
import * as Accordion from '@radix-ui/react-accordion';

export default function FAQAccordion() {
  const { faqs } = ishaUpanishadCourseData;
  const support = ishaUpanishadSupport;
  const [searchQuery, setSearchQuery] = useState('');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="isha-section-header"
          variants={safeVariants(fadeInUpVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="isha-section-subtitle">Got Questions?</p>
          <h2 className="isha-section-title">Frequently Asked Questions</h2>
          <p className="isha-section-description">
            Find answers to common questions about the Isha Upanishad course
          </p>
        </motion.div>

        {/* Search Input */}
        <motion.div
          ref={ref}
          className="mb-8"
          variants={safeVariants(fadeInUpVariants)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D97B2A] focus:outline-none transition-colors"
              aria-label="Search frequently asked questions"
            />
          </div>
        </motion.div>

        {/* FAQ Accordion */}
        <Accordion.Root type="multiple" className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`faq-${index}`}
              className="bg-[#FFF9F2] rounded-xl overflow-hidden border-2 border-transparent hover:border-[#D97B2A] transition-colors"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full px-6 py-4 flex justify-between items-center group text-left">
                  <span className="font-semibold text-[#0D3B4A] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#D97B2A] transition-transform group-data-[state=open]:rotate-180 flex-shrink-0" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No FAQs found matching your search.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[#D97B2A] font-medium hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Support Section */}
        {support && (
          <motion.div
            className="mt-12 p-8 bg-gradient-to-br from-[#0D3B4A] to-[#1A5568] rounded-2xl text-white"
            variants={safeVariants(fadeInUpVariants)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-white/80 mb-6">Our support team is here to help</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href={`mailto:${support.email}`}
                className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <div>
                  <p className="text-sm text-white/70">Email us</p>
                  <p className="font-medium">{support.email}</p>
                </div>
              </a>
              
              <a
                href={`tel:${support.phone}`}
                className="flex items-center gap-3 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                <Phone className="w-5 h-5" />
                <div>
                  <p className="text-sm text-white/70">Call us</p>
                  <p className="font-medium">{support.phone}</p>
                </div>
              </a>
            </div>

            {/* Refund Policy Note */}
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <p className="text-sm text-white/90">
                <strong>Refund Policy:</strong> We have a no refunds policy. Please watch our free demo videos before enrolling to ensure the course is right for you.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

