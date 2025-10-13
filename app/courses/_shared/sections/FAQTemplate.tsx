'use client';

import { HelpCircle } from 'lucide-react';
import { CourseFAQ } from '../types/course.types';
import { CourseSectionHeader, CourseAccordion } from '../components';

interface FAQTemplateProps {
  faqs: CourseFAQ[];
  title?: string;
  subtitle?: string;
  description?: string;
  allowMultiple?: boolean;
  className?: string;
}

export default function FAQTemplate({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle = 'Got Questions?',
  description = 'Find answers to common questions about the course',
  allowMultiple = true,
  className = '',
}: FAQTemplateProps) {
  // Transform FAQs to accordion items
  const accordionItems = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <section className={`course-section bg-white ${className}`}>
      <div className="course-container">
        <CourseSectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          icon={HelpCircle}
          centered={true}
        />
        <div className="max-w-4xl mx-auto">
          <CourseAccordion
            items={accordionItems}
            allowMultiple={allowMultiple}
          />
        </div>
      </div>
    </section>
  );
}

