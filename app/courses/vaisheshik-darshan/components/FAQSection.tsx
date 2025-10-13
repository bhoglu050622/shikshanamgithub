'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, Mail, Phone } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How to sign up for the course?",
      answer: "Click on the 'Enroll Now' button, then click 'Login' to create an account or use Google login for quick signup. Follow the checkout process to complete your enrollment."
    },
    {
      question: "What is the validity of this course?",
      answer: "You get 1 year of access to all course materials. During this period, you can access all lectures, quizzes, notes, and community forums anytime."
    },
    {
      question: "Are there any prerequisites for this course?",
      answer: "None! This course is designed for beginners. No prior knowledge of philosophy is required. Basic understanding of Hindi is helpful as the course is taught in हिन्दी."
    },
    {
      question: "How do I access the course after purchase?",
      answer: "After purchase, you can access the course from your Dashboard on the website or through our mobile app. All lectures and materials will be available instantly."
    },
    {
      question: "Can I download the lectures for offline viewing?",
      answer: "Yes! You can download lectures via our mobile app for offline viewing on a single device. Notes and quizzes are also downloadable."
    },
    {
      question: "What if I need support or have questions?",
      answer: "You can reach our support team at support@shikshanam.in for any queries or assistance. We're here to help!"
    },
    {
      question: "I'm having issues accessing my course. What should I do?",
      answer: "First, check if you're logged in with the correct email ID used during purchase. Check your Dashboard on the website. If issues persist, contact our support team at support@shikshanam.in."
    },
    {
      question: "What is the refund policy?",
      answer: "Currently, we do not offer refunds. However, you can watch the free demo video before enrolling to ensure the course meets your expectations."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h2 className="vaisheshik-heading text-4xl mb-4">
        Frequently Asked Questions
      </h2>
      <p className="vaisheshik-subheading text-xl mb-12 max-w-3xl mx-auto">
        Got questions? We've got answers. Find everything you need to know about 
        the Vaisheshika Darshan course and enrollment process.
      </p>

      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="vaisheshik-accordion"
          >
            <div
              className="vaisheshik-accordion-header"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="vaisheshik-heading text-lg">{faq.question}</h3>
              {openIndex === index ? (
                <Minus className="w-6 h-6" />
              ) : (
                <Plus className="w-6 h-6" />
              )}
            </div>
            <div className={`vaisheshik-accordion-content ${openIndex === index ? 'active' : ''}`}>
              <p className="vaisheshik-subheading text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="mt-16 p-8 bg-gradient-to-r from-vaisheshik-light to-white rounded-2xl border border-vaisheshik-secondary/20"
      >
        <h3 className="vaisheshik-heading text-2xl mb-6">Still Have Questions?</h3>
        <p className="vaisheshik-subheading text-gray-700 mb-6">
          Call +91-9910032165, Monday–Saturday 11AM–6PM
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:support@shikshanam.in"
            className="flex items-center gap-2 vaisheshik-btn-secondary"
          >
            <Mail className="w-5 h-5" />
            support@shikshanam.in
          </a>
          <a
            href="tel:+919910032165"
            className="flex items-center gap-2 vaisheshik-btn-secondary"
          >
            <Phone className="w-5 h-5" />
            +91-9910032165
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
