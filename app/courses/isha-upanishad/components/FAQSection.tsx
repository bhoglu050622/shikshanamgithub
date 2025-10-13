'use client';

import { useState } from 'react';

export default function FAQSection() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I sign up?",
      answer: "Click login → signup; or use Google."
    },
    {
      question: "What is course validity?",
      answer: "Lifetime (or long access)"
    },
    {
      question: "Any prerequisites?",
      answer: "None"
    },
    {
      question: "How to access after purchase?",
      answer: "Via Dashboard, website / mobile app"
    },
    {
      question: "Can I download lectures?",
      answer: "Yes, via mobile app"
    },
    {
      question: "How to contact support?",
      answer: "support@shikshanam.in"
    },
    {
      question: "Issue accessing course?",
      answer: "Check email used, check Dashboard, contact support"
    },
    {
      question: "Refunds?",
      answer: "No refunds currently"
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
            Give us a call +91-9910032165 (Monday to Saturday 11 AM – 6 PM)
          </p>
          
          <div className="bg-white p-6 rounded-lg max-w-md mx-auto">
            <div className="w-12 h-12 bg-saffron-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-saffron-800 mb-2">Email Support</h4>
            <p className="text-saffron-700">support@shikshanam.in</p>
          </div>
        </div>
      </div>
    </section>
  );
}