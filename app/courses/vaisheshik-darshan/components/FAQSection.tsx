'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, Mail, Phone } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Vaisheshika Darshan about?",
      answer: "Vaisheshika is one of the six classical schools of Indian philosophy that focuses on atomic realism, logical analysis, and the systematic study of reality through six fundamental categories (padārthas)."
    },
    {
      question: "How long do I have access to the course?",
      answer: "You get lifetime access to all course materials. There's no expiration date - you can revisit the content anytime, anywhere, as many times as you want."
    },
    {
      question: "Do I need prior knowledge of philosophy?",
      answer: "No prior knowledge required! This course is designed for beginners and intermediate learners. Basic understanding of Hindi is helpful but not mandatory."
    },
    {
      question: "What language is the course taught in?",
      answer: "The course is taught in Hindi with English explanations for technical terms, making it accessible to a wide range of learners."
    },
    {
      question: "Can I download the course materials?",
      answer: "Yes! You can download notes, summaries, and exercises for offline study. Video content is available for streaming with lifetime access."
    },
    {
      question: "What is the refund policy?",
      answer: "We offer a 7-day money-back guarantee. If you're not satisfied with the course content, you can request a full refund within 7 days of enrollment."
    },
    {
      question: "Is there community support available?",
      answer: "Yes! You'll have access to our community forum where you can ask questions, discuss concepts, and connect with fellow learners and instructors."
    },
    {
      question: "Will I receive a certificate?",
      answer: "Yes! Upon completion, you'll receive a downloadable certificate that you can share on LinkedIn and other professional platforms."
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
          Our support team is here to help you with any questions or concerns.
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
