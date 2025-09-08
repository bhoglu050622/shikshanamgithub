'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I sign up for the course?",
      answer: "Simply click the 'Enroll Now' button and follow the registration process. You'll receive instant access to all course materials upon successful payment."
    },
    {
      question: "What is the validity of the course?",
      answer: "You get lifetime access to the course materials. Once enrolled, you can access the content anytime, anywhere, forever."
    },
    {
      question: "Are there any prerequisites for this course?",
      answer: "No prerequisites required! This course is designed for beginners and is taught in Hindi with clear explanations. Basic understanding of Hindi is sufficient."
    },
    {
      question: "Can I download the course materials?",
      answer: "Yes, you can download the course notes, quizzes, and supplementary materials for offline study. The video content is available for streaming."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 7-day money-back guarantee. If you're not satisfied with the course content, you can request a full refund within 7 days of enrollment."
    },
    {
      question: "How can I get support if I have questions?",
      answer: "You can reach our support team at support@shikshanam.in or call +91-9910032165. We also have a community forum where you can interact with other students."
    },
    {
      question: "Is the certificate authentic?",
      answer: "Yes, the certificate is authentic and includes a verification code. You can share it on LinkedIn and other professional platforms."
    },
    {
      question: "Can I access the course on mobile devices?",
      answer: "Absolutely! The course is fully responsive and can be accessed on smartphones, tablets, and computers. Learn anywhere, anytime."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-saffron-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-saffron-700 max-w-2xl mx-auto">
            Get answers to common questions about the Isha Upanishad course
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-saffron-50 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:ring-opacity-50"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-saffron-800 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    <svg 
                      className={`w-5 h-5 text-saffron-600 transition-transform duration-200 ${
                        expandedFAQ === index ? 'rotate-180' : ''
                      }`}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"/>
                    </svg>
                  </div>
                </div>
              </button>

              {expandedFAQ === index && (
                <div className="px-6 pb-6">
                  <p className="text-saffron-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-saffron-100 to-saffron-200 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-saffron-800 mb-4">
            Still Have Questions?
          </h3>
          <p className="text-saffron-700 mb-6">
            Our support team is here to help you on your spiritual journey
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg">
              <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-saffron-800 mb-2">Email Support</h4>
              <p className="text-saffron-700 mb-2">support@shikshanam.in</p>
              <p className="text-sm text-saffron-600">Response within 24 hours</p>
            </div>

            <div className="bg-white p-6 rounded-lg">
              <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
              </div>
              <h4 className="font-semibold text-saffron-800 mb-2">Phone Support</h4>
              <p className="text-saffron-700 mb-2">+91-9910032165</p>
              <p className="text-sm text-saffron-600">Mon-Fri, 9 AM - 6 PM IST</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}