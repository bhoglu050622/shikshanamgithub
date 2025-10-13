'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, Mail, Phone } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How to sign up?",
      answer: "Click on the 'Enroll Now' button, then you can sign up using your email or Google account. The process is quick and straightforward."
    },
    {
      question: "Validity of the course?",
      answer: "You get 1-year access to all course materials from the date of enrollment. This gives you ample time to complete the course at your own pace."
    },
    {
      question: "Prerequisites?",
      answer: "None! This course is designed for beginners. No prior knowledge of Advaita Vedanta is required. Basic understanding of Hindi is helpful but not mandatory."
    },
    {
      question: "How to access after purchase?",
      answer: "After purchase, you can access the course via your dashboard on the Shikshanam website or through the mobile app. All your enrolled courses will be visible there."
    },
    {
      question: "Download lectures?",
      answer: "Yes! Lecture downloads are available via the mobile app, allowing you to learn offline at your convenience."
    },
    {
      question: "Contact / Support?",
      answer: "For any queries or support, you can reach us at support@shikshanam.in. Our team is here to help you throughout your learning journey."
    },
    {
      question: "Refund policy?",
      answer: "We currently do not offer refunds. However, we're confident in the quality of our content and believe you'll find immense value in this course."
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
      <h2 className="advaita-heading text-4xl mb-4">
        Frequently Asked Questions
      </h2>
      <p className="advaita-subheading text-xl mb-12 max-w-3xl mx-auto">
        Got questions? We've got answers. Find everything you need to know about 
        the Advaita Vedanta Darshan course and enrollment process.
      </p>

      <div className="max-w-4xl mx-auto">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="advaita-accordion"
          >
            <div
              className="advaita-accordion-header"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="advaita-heading text-lg">{faq.question}</h3>
              {openIndex === index ? (
                <Minus className="w-6 h-6" />
              ) : (
                <Plus className="w-6 h-6" />
              )}
            </div>
            <div className={`advaita-accordion-content ${openIndex === index ? 'active' : ''}`}>
              <p className="advaita-subheading text-gray-700 leading-relaxed">
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
        className="mt-16 p-8 bg-gradient-to-r from-advaita-light to-white rounded-2xl border border-advaita-secondary/20"
      >
        <h3 className="advaita-heading text-2xl mb-6">Still Have Questions?</h3>
        <p className="advaita-subheading text-gray-700 mb-6">
          Our support team is here to help you with any questions or concerns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:support@shikshanam.in"
            className="flex items-center gap-2 advaita-btn-secondary"
          >
            <Mail className="w-5 h-5" />
            support@shikshanam.in
          </a>
          <a
            href="tel:+919910032165"
            className="flex items-center gap-2 advaita-btn-secondary"
          >
            <Phone className="w-5 h-5" />
            +91-9910032165
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
