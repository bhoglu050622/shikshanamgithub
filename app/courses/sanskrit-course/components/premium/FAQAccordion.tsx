'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 devanagari-bg" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary-sanskrit)] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-[var(--text-secondary-sanskrit)] text-center">
            Everything you need to know about the course
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="card-sanskrit-premium overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus-sanskrit"
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-[var(--text-primary-sanskrit)] pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  className="flex-shrink-0"
                >
                  <svg
                    className={`w-6 h-6 transition-colors ${
                      expandedIndex === index
                        ? 'text-[var(--accent-sanskrit)]'
                        : 'text-[var(--text-muted-sanskrit)]'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div className="pt-2 border-t border-[var(--gold-sanskrit)]/20">
                        <p className="text-[var(--text-secondary-sanskrit)] leading-relaxed mt-3">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-[var(--text-secondary-sanskrit)] mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:support@shikshanam.in"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors focus-sanskrit [&_svg]:text-white"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[var(--accent-sanskrit)] text-[var(--accent-sanskrit)] rounded-lg font-semibold hover:bg-[var(--accent-sanskrit)] hover:text-white transition-colors focus-sanskrit"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

