'use client';

import { BookOpen, Clock } from 'lucide-react';
import { CourseSyllabus } from '../types/course.types';
import { CourseSectionHeader, CourseAccordion } from '../components';

interface SyllabusTemplateProps {
  syllabus: CourseSyllabus[];
  title?: string;
  subtitle?: string;
  description?: string;
  allowMultiple?: boolean;
  defaultOpen?: number[];
  className?: string;
}

export default function SyllabusTemplate({
  syllabus,
  title = 'Course Syllabus',
  subtitle = 'What You\'ll Learn',
  description = 'Comprehensive breakdown of the course curriculum and learning path',
  allowMultiple = false,
  defaultOpen = [0],
  className = '',
}: SyllabusTemplateProps) {
  // Transform syllabus data to accordion items
  const accordionItems = syllabus.map((module, index) => ({
    id: `module-${index}`,
    title: (
      <div className="flex items-center justify-between w-full pr-8">
        <span>{module.title}</span>
        {module.duration && (
          <span className="course-badge course-badge-info ml-4">
            <Clock className="w-3 h-3" />
            {module.duration}
          </span>
        )}
      </div>
    ),
    content: (
      <div className="space-y-4">
        {module.subtitle && (
          <p className="course-body-lg font-semibold text-gray-700 mb-3">
            {module.subtitle}
          </p>
        )}
        {module.description && (
          <p className="course-body text-gray-600 mb-4">
            {module.description}
          </p>
        )}
        <div className="space-y-2">
          {module.topics.map((topic, topicIndex) => (
            <div key={topicIndex} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[var(--theme-primary-100)] text-[var(--theme-primary-600)] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                {topicIndex + 1}
              </div>
              <span className="course-body text-gray-700">{topic}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <section className={`course-section bg-gray-50 ${className}`}>
      <div className="course-container">
        <CourseSectionHeader
          subtitle={subtitle}
          title={title}
          description={description}
          icon={BookOpen}
          centered={true}
        />
        <div className="max-w-4xl mx-auto">
          <CourseAccordion
            items={accordionItems}
            allowMultiple={allowMultiple}
            defaultOpen={defaultOpen}
          />
        </div>
      </div>
    </section>
  );
}

