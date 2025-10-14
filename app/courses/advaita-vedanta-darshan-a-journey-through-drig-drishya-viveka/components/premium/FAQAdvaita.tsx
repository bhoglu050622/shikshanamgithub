'use client';

import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, Search, Mail, Phone } from 'lucide-react';
import { advaitaVedantaCourseData, advaitaVedantaSupport } from '../../courseData';

export default function FAQAdvaita() {
  const { faqs } = advaitaVedantaCourseData;
  const support = advaitaVedantaSupport;
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="advaita-faq-section">
      <div className="advaita-section-header text-center">
        <h2>Frequently Asked Questions</h2>
        <p>Find answers to common questions about the course</p>
      </div>

      <div className="advaita-faq-container">
        {/* Search Bar */}
        <div className="advaita-faq-search">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <Accordion.Root type="multiple" className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`faq-${index}`}
              className="bg-white border-2 border-[#0D3B4A] rounded-2xl overflow-hidden"
            >
              <Accordion.Header>
                <Accordion.Trigger className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-[#FFF9F2] transition-colors group">
                  <span className="font-semibold text-[#0D3B4A] pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown className="w-5 h-5 text-[#0D3B4A] transition-transform duration-300 group-data-[state=open]:rotate-180 flex-shrink-0" />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="px-6 pb-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">
              No questions match your search. Try a different keyword.
            </p>
          </div>
        )}

        {/* Support Section */}
        <div className="mt-12 bg-gradient-to-br from-[#0D3B4A] to-[#1A5568] rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-3 text-white">Still have questions?</h3>
          <p className="mb-6 text-white text-center">
            Our support team is here to help you with any queries
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${support.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0D3B4A] font-semibold rounded-lg hover:bg-[#D97B2A] hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              {support.email}
            </a>
            <a
              href={`tel:${support.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0D3B4A] font-semibold rounded-lg hover:bg-[#D97B2A] hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              {support.phone}
            </a>
          </div>
          
          {/* Refund Policy Highlight */}
          <div className="mt-6 pt-6 border-t border-white/20 text-center">
            <p className="text-sm text-white/80">
              <strong className="text-white">Refund Policy:</strong> {support.refundPolicy}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


