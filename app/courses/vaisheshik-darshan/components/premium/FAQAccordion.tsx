'use client';

import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown, Search, Mail, Phone } from 'lucide-react';
import { CourseFAQ } from '../../../_shared/types/course.types';

interface FAQAccordionProps {
  faqs: CourseFAQ[];
  contactEmail?: string;
  contactPhone?: string;
}

export default function FAQAccordion({ faqs, contactEmail, contactPhone }: FAQAccordionProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-20 px-4" style={{ background: 'white' }}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="vaisheshik-heading-display text-3xl md:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="vaisheshik-body-text text-lg">
            Everything you need to know about the course
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--vaisheshik-muted-gray)]"
            size={20}
          />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[var(--vaisheshik-accent-saffron)] outline-none transition-colors"
          />
        </div>

        {/* Accordion */}
        <Accordion.Root type="multiple" className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <Accordion.Item
              key={index}
              value={`faq-${index}`}
              className="vaisheshik-faq-item"
            >
              <Accordion.Trigger className="vaisheshik-faq-trigger group">
                <span className="flex-1 text-left">{faq.question}</span>
                <ChevronDown className="transition-transform duration-300 group-data-[state=open]:rotate-180" size={20} />
              </Accordion.Trigger>

              <Accordion.Content className="vaisheshik-faq-content">
                {faq.answer}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--vaisheshik-muted-gray)]">
              No questions found. Try a different search term.
            </p>
          </div>
        )}

        {/* Support Section */}
        {(contactEmail || contactPhone) && (
          <div className="mt-12 p-8 bg-gradient-to-br from-[var(--vaisheshik-cream-light)] to-white rounded-2xl border-2 border-[var(--vaisheshik-accent-saffron)]/20">
            <h3 className="text-xl font-bold text-[var(--vaisheshik-primary-indigo)] mb-4 text-center">
              Still have questions?
            </h3>
            <p className="text-center text-[var(--vaisheshik-muted-gray)] mb-6">
              Our support team is here to help you
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {contactEmail && (
                <a
                  href={`mailto:${contactEmail}`}
                  className="flex items-center gap-2 px-6 py-3 bg-white rounded-lg border-2 border-[var(--vaisheshik-primary-indigo)] text-[var(--vaisheshik-primary-indigo)] hover:bg-[var(--vaisheshik-primary-indigo)] hover:text-white transition-colors"
                >
                  <Mail size={20} />
                  Email Support
                </a>
              )}
              {contactPhone && (
                <a
                  href={`tel:${contactPhone}`}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--vaisheshik-accent-saffron)] text-white rounded-lg hover:bg-[var(--vaisheshik-saffron-light)] transition-colors"
                >
                  <Phone size={20} />
                  Call Us
                </a>
              )}
            </div>

            {/* Refund Policy Reminder */}
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 text-center">
                <strong>Important:</strong> No refunds available. Please watch the free demo video before enrolling.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

