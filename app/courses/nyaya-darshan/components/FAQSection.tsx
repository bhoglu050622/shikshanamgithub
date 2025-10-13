'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Plus, Minus, Mail, Phone } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I enroll in this course?",
      answer: "Simply click the 'Enroll Now' button, complete the payment process, and you'll get immediate access to all course materials. You can start learning right away!"
    },
    {
      question: "How long is the course valid?",
      answer: "You get 1-year access to all course materials from the date of enrollment. During this period, you can revisit the content anytime, anywhere, as many times as you want."
    },
    {
      question: "Can I access the course after completion?",
      answer: "Yes! As long as you're within the 1-year validity period, you can continue to access all course materials even after completing the course. This allows you to revise and reinforce your learning."
    },
    {
      question: "What happens after 1 year?",
      answer: "After 1 year, your access to the course materials will expire. However, any certificates earned and downloaded materials will remain with you permanently. You can also re-enroll at that time if you wish to continue learning."
    },
    {
      question: "Are there any prerequisites?",
      answer: "No prerequisites required! This course is designed for beginners and intermediate learners. Basic understanding of Hindi is helpful but not mandatory."
    },
    {
      question: "How many sessions are included?",
      answer: "The course includes 20 comprehensive sessions covering all aspects of Nyaya Darshan philosophy, including logic, epistemology, and reasoning techniques."
    },
    {
      question: "Can I download the course materials?",
      answer: "Yes! You can download notes, summaries, and exercises for offline study during your 1-year access period. These materials remain with you even after the access period ends."
    },
    {
      question: "Will I receive a certificate?",
      answer: "Yes! Upon completion, you'll receive a downloadable certificate that you can share on LinkedIn and other professional platforms. The certificate is yours to keep permanently."
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
      <h2 className="nyaya-heading text-4xl mb-4 font-bold">
        Frequently Asked Questions
      </h2>
      <p className="nyaya-subheading text-xl mb-12 max-w-3xl mx-auto">
        Got questions? We've got answers. Find everything you need to know about 
        the Nyaya Darshan course and enrollment process.
      </p>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="nyaya-accordion"
          >
            <div
              className="nyaya-accordion-header cursor-pointer hover:bg-blue-100 transition-colors duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="nyaya-heading text-lg font-semibold">{faq.question}</h3>
              <div className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                {openIndex === index ? (
                  <Minus className="w-6 h-6 text-blue-600" />
                ) : (
                  <Plus className="w-6 h-6 text-blue-600" />
                )}
              </div>
            </div>
            <div className={`nyaya-accordion-content ${openIndex === index ? 'active' : ''}`}>
              <p className="nyaya-subheading text-gray-700 leading-relaxed">
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
        className="mt-16 p-10 bg-gradient-to-r from-blue-50 to-amber-50 rounded-3xl border-2 border-blue-200 shadow-lg"
      >
        <h3 className="nyaya-heading text-3xl mb-6 font-bold">Still Have Questions?</h3>
        <p className="nyaya-subheading text-gray-700 mb-8 text-lg">
          Our support team is here to help you with any questions or concerns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="mailto:support@shikshanam.in"
            className="flex items-center gap-2 nyaya-btn-secondary hover:shadow-lg transition-all"
          >
            <Mail className="w-5 h-5" />
            support@shikshanam.in
          </a>
          <a
            href="tel:+919910032165"
            className="flex items-center gap-2 nyaya-btn-secondary hover:shadow-lg transition-all"
          >
            <Phone className="w-5 h-5" />
            +91-9910032165
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
