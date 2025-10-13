'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { nyayaDarshanCourseData } from '../../courseData';
import * as Accordion from '@radix-ui/react-accordion';

export default function FAQAccordion() {
  const { faqs } = nyayaDarshanCourseData;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D3B4A] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about the course
          </p>
        </div>

        {/* Search Box */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#D97B2A] focus:outline-none transition-colors"
          />
        </div>

        {/* FAQ Accordion */}
        <Accordion.Root type="single" collapsible className="space-y-4">
          {filteredFaqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`item-${index}`}
              className="bg-[#FFF9F2] border-2 border-[#E5DDD5] rounded-xl overflow-hidden transition-colors hover:border-[#D97B2A]"
            >
              <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left group">
                <span className="text-lg font-semibold text-[#0D3B4A] pr-4">
                  {faq.question}
                </span>
                <ChevronDown className="w-5 h-5 text-[#D97B2A] transition-transform group-data-[state=open]:rotate-180 flex-shrink-0" />
              </Accordion.Trigger>
              <Accordion.Content className="px-6 pb-4 pt-2 text-gray-700 leading-relaxed">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No questions found matching your search.</p>
          </div>
        )}

        {/* Still have questions CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#0D3B4A] to-[#1A5568] rounded-2xl text-center">
          <h3 className="text-2xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-white/90 mb-4">
            Contact our support team at support@shikshanam.in or call +91-9910032165
          </p>
          <a
            href="mailto:support@shikshanam.in"
            className="inline-block px-6 py-3 bg-[#D97B2A] text-white font-semibold rounded-lg hover:bg-[#E89450] transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}

